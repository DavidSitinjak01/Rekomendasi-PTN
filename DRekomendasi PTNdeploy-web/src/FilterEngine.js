/**
 * FilterEngine - Modul untuk memfilter data
 */
class FilterEngine {
  /**
   * Filter baris dimana kolom sama dengan nilai
   * @param {Dataset} dataset - Dataset object
   * @param {string} column - Column name
   * @param {*} value - Value to match
   * @returns {Dataset} New filtered dataset
   */
  static filterEquals(dataset, column, value) {
    const filtered = dataset.getData().filter(row => {
      return row[column] == value; // Use == for loose equality
    });
    return dataset.createFiltered(filtered);
  }

  /**
   * Filter baris dimana kolom lebih besar dari nilai
   * @param {Dataset} dataset - Dataset object
   * @param {string} column - Column name
   * @param {number} value - Numeric value
   * @returns {Dataset} New filtered dataset
   */
  static filterGreaterThan(dataset, column, value) {
    const filtered = dataset.getData().filter(row => {
      const cellValue = parseFloat(row[column]);
      return !isNaN(cellValue) && cellValue > value;
    });
    return dataset.createFiltered(filtered);
  }

  /**
   * Filter baris dimana kolom lebih kecil dari nilai
   * @param {Dataset} dataset - Dataset object
   * @param {string} column - Column name
   * @param {number} value - Numeric value
   * @returns {Dataset} New filtered dataset
   */
  static filterLessThan(dataset, column, value) {
    const filtered = dataset.getData().filter(row => {
      const cellValue = parseFloat(row[column]);
      return !isNaN(cellValue) && cellValue < value;
    });
    return dataset.createFiltered(filtered);
  }

  /**
   * Filter baris dimana kolom mengandung teks
   * @param {Dataset} dataset - Dataset object
   * @param {string} column - Column name
   * @param {string} text - Text to search for
   * @returns {Dataset} New filtered dataset
   */
  static filterContains(dataset, column, text) {
    const searchText = text.toString().toLowerCase();
    const filtered = dataset.getData().filter(row => {
      const cellValue = row[column];
      if (cellValue === null || cellValue === undefined) return false;
      return cellValue.toString().toLowerCase().includes(searchText);
    });
    return dataset.createFiltered(filtered);
  }

  /**
   * Menerapkan multiple filter dengan AND logic
   * @param {Dataset} dataset - Dataset object
   * @param {Array<Object>} filters - Array of filter objects
   * @returns {Dataset} New filtered dataset
   */
  static applyMultipleFilters(dataset, filters) {
    let result = dataset;
    
    filters.forEach(filter => {
      const { column, operator, value } = filter;
      
      switch (operator) {
      case 'equals':
        result = this.filterEquals(result, column, value);
        break;
      case 'gt':
      case 'greaterThan':
        result = this.filterGreaterThan(result, column, value);
        break;
      case 'lt':
      case 'lessThan':
        result = this.filterLessThan(result, column, value);
        break;
      case 'contains':
        result = this.filterContains(result, column, value);
        break;
      default:
        throw new Error(`Operator '${operator}' tidak didukung.`);
      }
    });
    
    return result;
  }
}

module.exports = FilterEngine;
