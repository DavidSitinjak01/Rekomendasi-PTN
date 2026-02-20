/**
 * SearchEngine - Modul untuk mencari data
 */
class SearchEngine {
  /**
   * Mencari keyword di semua kolom
   * @param {Dataset} dataset - Dataset object
   * @param {string} keyword - Keyword to search
   * @returns {Object} SearchResult object
   */
  static search(dataset, keyword) {
    const searchText = keyword.toString().toLowerCase();
    const matchingRows = [];
    const highlightedData = [];
    
    dataset.getData().forEach((row, index) => {
      let found = false;
      const highlightedRow = {};
      
      Object.keys(row).forEach(col => {
        const cellValue = row[col];
        if (cellValue === null || cellValue === undefined) {
          highlightedRow[col] = cellValue;
          return;
        }
        
        const cellStr = cellValue.toString();
        if (cellStr.toLowerCase().includes(searchText)) {
          found = true;
          highlightedRow[col] = this.highlightMatches(cellStr, keyword);
        } else {
          highlightedRow[col] = cellValue;
        }
      });
      
      if (found) {
        matchingRows.push(index);
        highlightedData.push(highlightedRow);
      }
    });
    
    return {
      matchingRows,
      totalMatches: matchingRows.length,
      highlightedData
    };
  }

  /**
   * Mencari keyword di kolom tertentu
   * @param {Dataset} dataset - Dataset object
   * @param {string} column - Column name
   * @param {string} keyword - Keyword to search
   * @returns {Object} SearchResult object
   */
  static searchInColumn(dataset, column, keyword) {
    const searchText = keyword.toString().toLowerCase();
    const matchingRows = [];
    const highlightedData = [];
    
    dataset.getData().forEach((row, index) => {
      const cellValue = row[column];
      if (cellValue === null || cellValue === undefined) return;
      
      const cellStr = cellValue.toString();
      if (cellStr.toLowerCase().includes(searchText)) {
        matchingRows.push(index);
        const highlightedRow = { ...row };
        highlightedRow[column] = this.highlightMatches(cellStr, keyword);
        highlightedData.push(highlightedRow);
      }
    });
    
    return {
      matchingRows,
      totalMatches: matchingRows.length,
      highlightedData
    };
  }

  /**
   * Menyorot keyword dalam teks
   * @param {string} text - Text to highlight
   * @param {string} keyword - Keyword to highlight
   * @returns {string} Text with highlighted keyword
   */
  static highlightMatches(text, keyword) {
    const textStr = text.toString();
    const keywordStr = keyword.toString();
    
    // Case-insensitive replace with highlight markers
    const regex = new RegExp(`(${keywordStr})`, 'gi');
    return textStr.replace(regex, '>>$1<<');
  }
}

module.exports = SearchEngine;
