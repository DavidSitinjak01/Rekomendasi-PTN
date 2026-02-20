/**
 * ValidationEngine - Modul untuk validasi data
 */
class ValidationEngine {
  /**
   * Mengembalikan posisi cell kosong per kolom
   * @param {Dataset} dataset - Dataset object
   * @returns {Object} Object with column names as keys and arrays of row indices as values
   */
  static findEmptyCells(dataset) {
    const emptyCells = {};
    const columnNames = dataset.getColumnNames();
    
    columnNames.forEach(col => {
      emptyCells[col] = [];
    });
    
    dataset.getData().forEach((row, index) => {
      columnNames.forEach(col => {
        const value = row[col];
        if (value === null || value === undefined || value === '') {
          emptyCells[col].push(index);
        }
      });
    });
    
    return emptyCells;
  }

  /**
   * Menghitung persentase kelengkapan per kolom
   * @param {Dataset} dataset - Dataset object
   * @returns {Object} Object with column names as keys and percentages as values
   */
  static calculateCompleteness(dataset) {
    const completeness = {};
    const totalRows = dataset.getRowCount();
    
    if (totalRows === 0) return completeness;
    
    const emptyCells = this.findEmptyCells(dataset);
    
    Object.keys(emptyCells).forEach(col => {
      const emptyCount = emptyCells[col].length;
      const filledCount = totalRows - emptyCount;
      completeness[col] = (filledCount / totalRows) * 100;
    });
    
    return completeness;
  }

  /**
   * Mengembalikan index baris dengan data tidak lengkap
   * @param {Dataset} dataset - Dataset object
   * @returns {Array<number>} Array of row indices
   */
  static findIncompleteRows(dataset) {
    const incompleteRows = new Set();
    const emptyCells = this.findEmptyCells(dataset);
    
    Object.values(emptyCells).forEach(rowIndices => {
      rowIndices.forEach(index => incompleteRows.add(index));
    });
    
    return Array.from(incompleteRows).sort((a, b) => a - b);
  }

  /**
   * Mengidentifikasi baris dengan tipe data tidak sesuai
   * @param {Dataset} dataset - Dataset object
   * @returns {Object} Object with column names as keys and arrays of row indices as values
   */
  static validateDataTypes(dataset) {
    const invalidRows = {};
    const columnNames = dataset.getColumnNames();
    
    columnNames.forEach(col => {
      invalidRows[col] = [];
      const expectedType = dataset.getColumnType(col);
      
      if (expectedType === 'unknown' || expectedType === 'empty') {
        return;
      }
      
      dataset.getData().forEach((row, index) => {
        const value = row[col];
        
        // Skip null/undefined/empty
        if (value === null || value === undefined || value === '') {
          return;
        }
        
        if (!this._matchesType(value, expectedType)) {
          invalidRows[col].push(index);
        }
      });
    });
    
    return invalidRows;
  }

  /**
   * Check if value matches expected type
   * @private
   */
  static _matchesType(value, expectedType) {
    switch (expectedType) {
    case 'number':
      return !isNaN(parseFloat(value));
    case 'boolean':
      return typeof value === 'boolean' || 
               value === 'true' || value === 'false' ||
               value === 'TRUE' || value === 'FALSE';
    case 'date':
      return !isNaN(new Date(value).getTime());
    case 'text':
      return true; // Any value can be text
    default:
      return true;
    }
  }
}

module.exports = ValidationEngine;
