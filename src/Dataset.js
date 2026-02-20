/**
 * Dataset - Class untuk menyimpan dan mengelola data
 */
class Dataset {
  /**
   * Inisialisasi dataset dengan data dan metadata
   * @param {Array<Object>} data - Array of objects representing rows
   * @param {Object} metadata - Metadata about the dataset
   */
  constructor(data, metadata = {}) {
    this.data = data || [];
    this.columnNames = this._extractColumnNames();
    this.columnTypes = metadata.columnTypes || {};
    this.sourceFile = metadata.sourceFile || '';
    this.sourceWorksheet = metadata.sourceWorksheet || '';
  }

  /**
   * Extract column names from data
   * @private
   */
  _extractColumnNames() {
    if (this.data.length === 0) {
      return [];
    }
    return Object.keys(this.data[0]);
  }

  /**
   * Mengembalikan data dari kolom tertentu
   * @param {string} columnName - Nama kolom
   * @returns {Array} Array of values from the column
   * @throws {Error} Jika kolom tidak ditemukan
   */
  getColumn(columnName) {
    if (!this.columnNames.includes(columnName)) {
      throw new Error(`Kolom '${columnName}' tidak ditemukan.`);
    }
    return this.data.map(row => row[columnName]);
  }

  /**
   * Mengembalikan data dari baris tertentu
   * @param {number} rowIndex - Index baris (0-based)
   * @returns {Object} Row data as object
   * @throws {Error} Jika index di luar range
   */
  getRow(rowIndex) {
    if (rowIndex < 0 || rowIndex >= this.data.length) {
      throw new Error(`Index baris ${rowIndex} di luar range.`);
    }
    return this.data[rowIndex];
  }

  /**
   * Mengembalikan daftar nama kolom
   * @returns {Array<string>} Array of column names
   */
  getColumnNames() {
    return [...this.columnNames];
  }

  /**
   * Mengembalikan jumlah baris
   * @returns {number} Number of rows
   */
  getRowCount() {
    return this.data.length;
  }

  /**
   * Mengembalikan jumlah kolom
   * @returns {number} Number of columns
   */
  getColumnCount() {
    return this.columnNames.length;
  }

  /**
   * Mengembalikan tipe data kolom
   * @param {string} columnName - Nama kolom
   * @returns {string} Type of the column
   * @throws {Error} Jika kolom tidak ditemukan
   */
  getColumnType(columnName) {
    if (!this.columnNames.includes(columnName)) {
      throw new Error(`Kolom '${columnName}' tidak ditemukan.`);
    }
    return this.columnTypes[columnName] || 'unknown';
  }

  /**
   * Set column types
   * @param {Object} columnTypes - Object with column names as keys and types as values
   */
  setColumnTypes(columnTypes) {
    this.columnTypes = columnTypes;
  }

  /**
   * Get all data
   * @returns {Array<Object>} All data
   */
  getData() {
    return this.data;
  }

  /**
   * Create a new Dataset with filtered data
   * @param {Array<Object>} filteredData - Filtered data
   * @returns {Dataset} New Dataset instance
   */
  createFiltered(filteredData) {
    return new Dataset(filteredData, {
      columnTypes: this.columnTypes,
      sourceFile: this.sourceFile,
      sourceWorksheet: this.sourceWorksheet
    });
  }

  /**
   * Get metadata
   * @returns {Object} Metadata object
   */
  getMetadata() {
    return {
      sourceFile: this.sourceFile,
      sourceWorksheet: this.sourceWorksheet,
      rowCount: this.getRowCount(),
      columnCount: this.getColumnCount(),
      columnNames: this.getColumnNames(),
      columnTypes: this.columnTypes
    };
  }
}

module.exports = Dataset;
