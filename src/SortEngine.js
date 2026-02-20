/**
 * SortEngine - Modul untuk mengurutkan data
 */
class SortEngine {
  /**
   * Mengurutkan dataset berdasarkan kolom
   * @param {Dataset} dataset - Dataset object
   * @param {string} column - Column name
   * @param {boolean} ascending - Sort direction (true = ascending, false = descending)
   * @returns {Dataset} New sorted dataset
   */
  static sortByColumn(dataset, column, ascending = true) {
    const columnType = dataset.getColumnType(column);
    const data = [...dataset.getData()];
    
    data.sort((a, b) => {
      const valA = a[column];
      const valB = b[column];
      
      // Handle null/undefined values
      if (valA === null || valA === undefined) return ascending ? 1 : -1;
      if (valB === null || valB === undefined) return ascending ? -1 : 1;
      
      let comparison = 0;
      
      if (columnType === 'number') {
        comparison = this._compareNumeric(valA, valB);
      } else if (columnType === 'date') {
        comparison = this._compareDate(valA, valB);
      } else {
        comparison = this._compareText(valA, valB);
      }
      
      return ascending ? comparison : -comparison;
    });
    
    return dataset.createFiltered(data);
  }

  /**
   * Compare numeric values
   * @private
   */
  static _compareNumeric(a, b) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    
    if (isNaN(numA) && isNaN(numB)) return 0;
    if (isNaN(numA)) return 1;
    if (isNaN(numB)) return -1;
    
    return numA - numB;
  }

  /**
   * Compare text values alphabetically
   * @private
   */
  static _compareText(a, b) {
    const strA = a.toString().toLowerCase();
    const strB = b.toString().toLowerCase();
    
    return strA.localeCompare(strB);
  }

  /**
   * Compare date values chronologically
   * @private
   */
  static _compareDate(a, b) {
    const dateA = new Date(a);
    const dateB = new Date(b);
    
    if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
    if (isNaN(dateA.getTime())) return 1;
    if (isNaN(dateB.getTime())) return -1;
    
    return dateA.getTime() - dateB.getTime();
  }
}

module.exports = SortEngine;
