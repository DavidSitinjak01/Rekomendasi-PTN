const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

/**
 * ExcelWriter - Modul untuk menulis file Excel
 */
class ExcelWriter {
  /**
   * Menulis dataset ke file Excel
   * @param {Dataset} dataset - Dataset object
   * @param {string} filePath - Path to output file
   * @returns {boolean} Success status
   */
  static writeDataset(dataset, filePath) {
    try {
      // Create workbook
      const wb = XLSX.utils.book_new();
      
      // Convert dataset to worksheet
      const ws = XLSX.utils.json_to_sheet(dataset.getData());
      
      // Add worksheet to workbook
      const sheetName = dataset.sourceWorksheet || 'Data';
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
      
      // Ensure directory exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Write file
      XLSX.writeFile(wb, filePath);
      
      return true;
    } catch (error) {
      throw new Error(`Gagal menyimpan file ke '${filePath}': ${error.message}`);
    }
  }

  /**
   * Menulis hasil statistik ke file CSV
   * @param {Object} stats - Statistics object
   * @param {string} filePath - Path to output file
   * @returns {boolean} Success status
   */
  static writeStatistics(stats, filePath) {
    try {
      let content = 'Statistik,Nilai\n';
      
      Object.keys(stats).forEach(key => {
        const value = stats[key];
        if (Array.isArray(value)) {
          content += `${key},"${value.join(', ')}"\n`;
        } else {
          content += `${key},${value}\n`;
        }
      });
      
      // Ensure directory exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(filePath, content, 'utf8');
      
      return true;
    } catch (error) {
      throw new Error(`Gagal menyimpan file ke '${filePath}': ${error.message}`);
    }
  }

  /**
   * Export dataset ke format CSV
   * @param {Dataset} dataset - Dataset object
   * @param {string} filePath - Path to output file
   * @returns {boolean} Success status
   */
  static exportToCSV(dataset, filePath) {
    try {
      const data = dataset.getData();
      
      if (data.length === 0) {
        throw new Error('Dataset kosong, tidak ada data untuk di-export.');
      }
      
      // Get column names
      const columns = dataset.getColumnNames();
      
      // Create CSV header
      let csv = columns.join(',') + '\n';
      
      // Add data rows
      data.forEach(row => {
        const values = columns.map(col => {
          const value = row[col];
          if (value === null || value === undefined) return '';
          
          // Escape values containing comma or quotes
          const strValue = value.toString();
          if (strValue.includes(',') || strValue.includes('"')) {
            return `"${strValue.replace(/"/g, '""')}"`;
          }
          return strValue;
        });
        csv += values.join(',') + '\n';
      });
      
      // Ensure directory exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(filePath, csv, 'utf8');
      
      return true;
    } catch (error) {
      throw new Error(`Gagal menyimpan file ke '${filePath}': ${error.message}`);
    }
  }
}

module.exports = ExcelWriter;
