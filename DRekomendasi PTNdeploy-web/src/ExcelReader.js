const XLSX = require('xlsx');
const fs = require('fs');

/**
 * ExcelReader - Modul untuk membaca file Excel
 */
class ExcelReader {
  /**
   * Membaca file Excel dan mengembalikan objek Workbook
   * @param {string} filePath - Path ke file Excel
   * @returns {Object} Workbook object
   * @throws {Error} Jika file tidak ditemukan atau tidak dapat dibaca
   */
  static readFile(filePath) {
    try {
      // Cek apakah file exists
      if (!fs.existsSync(filePath)) {
        throw new Error(`File '${filePath}' tidak ditemukan. Pastikan path file benar.`);
      }

      // Baca file Excel
      const workbook = XLSX.readFile(filePath);
      
      return {
        filePath: filePath,
        workbook: workbook,
        sheetNames: workbook.SheetNames
      };
    } catch (error) {
      if (error.message.includes('tidak ditemukan')) {
        throw error;
      }
      throw new Error(`Gagal membaca file '${filePath}': ${error.message}`);
    }
  }

  /**
   * Mengembalikan daftar nama worksheet
   * @param {Object} workbookObj - Workbook object dari readFile
   * @returns {Array<string>} Daftar nama worksheet
   */
  static getWorksheets(workbookObj) {
    return workbookObj.sheetNames || [];
  }

  /**
   * Membaca worksheet tertentu dan mengembalikan data dalam bentuk array of objects
   * @param {Object} workbookObj - Workbook object dari readFile
   * @param {string} sheetName - Nama worksheet yang akan dibaca
   * @returns {Array<Object>} Data worksheet dalam bentuk array of objects
   * @throws {Error} Jika worksheet tidak ditemukan
   */
  static readWorksheet(workbookObj, sheetName) {
    const { workbook } = workbookObj;
    
    if (!workbook.SheetNames.includes(sheetName)) {
      throw new Error(`Worksheet '${sheetName}' tidak ditemukan.`);
    }

    const worksheet = workbook.Sheets[sheetName];
    
    // Convert worksheet ke JSON (array of objects)
    const data = XLSX.utils.sheet_to_json(worksheet, { 
      defval: null,  // Set empty cells to null
      raw: false     // Convert dates and numbers to strings for consistency
    });

    return data;
  }

  /**
   * Mendeteksi tipe data untuk setiap kolom
   * @param {Array<Object>} data - Data dari readWorksheet
   * @returns {Object} Object dengan key = column name, value = type
   */
  static detectColumnTypes(data) {
    if (!data || data.length === 0) {
      return {};
    }

    const columnTypes = {};
    const firstRow = data[0];
    
    // Get all column names
    const columnNames = Object.keys(firstRow);

    columnNames.forEach(colName => {
      columnTypes[colName] = this._detectColumnType(data, colName);
    });

    return columnTypes;
  }

  /**
   * Helper: Deteksi tipe data untuk satu kolom
   * @private
   */
  static _detectColumnType(data, columnName) {
    const values = data
      .map(row => row[columnName])
      .filter(val => val !== null && val !== undefined && val !== '');

    if (values.length === 0) {
      return 'empty';
    }

    let numericCount = 0;
    let dateCount = 0;
    let booleanCount = 0;
    let textCount = 0;

    values.forEach(val => {
      // Check if boolean
      if (typeof val === 'boolean' || val === 'true' || val === 'false' || 
          val === 'TRUE' || val === 'FALSE') {
        booleanCount++;
      }
      // Check if number
      else if (!isNaN(val) && !isNaN(parseFloat(val))) {
        numericCount++;
      }
      // Check if date (simple check for date patterns)
      else if (this._isDateString(val)) {
        dateCount++;
      }
      // Otherwise it's text
      else {
        textCount++;
      }
    });

    const total = values.length;
    
    // Determine type based on majority (>50%)
    if (numericCount / total > 0.5) return 'number';
    if (dateCount / total > 0.5) return 'date';
    if (booleanCount / total > 0.5) return 'boolean';
    return 'text';
  }

  /**
   * Helper: Check if string is a date
   * @private
   */
  static _isDateString(str) {
    if (typeof str !== 'string') return false;
    
    // Common date patterns
    const datePatterns = [
      /^\d{4}-\d{2}-\d{2}$/,           // YYYY-MM-DD
      /^\d{2}\/\d{2}\/\d{4}$/,         // DD/MM/YYYY or MM/DD/YYYY
      /^\d{2}-\d{2}-\d{4}$/,           // DD-MM-YYYY
      /^\d{4}\/\d{2}\/\d{2}$/          // YYYY/MM/DD
    ];

    return datePatterns.some(pattern => pattern.test(str));
  }
}

module.exports = ExcelReader;
