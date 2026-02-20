/**
 * StatisticalCalculator - Modul untuk menghitung statistik deskriptif
 */
class StatisticalCalculator {
  /**
   * Menghitung rata-rata (mean)
   * @param {Array<number>} values - Array of numeric values
   * @returns {number} Mean value
   * @throws {Error} Jika array kosong atau berisi non-numeric values
   */
  static calculateMean(values) {
    const numericValues = this._validateAndFilterNumeric(values);
    
    if (numericValues.length === 0) {
      throw new Error('Tidak ada nilai numerik untuk dihitung.');
    }

    const sum = numericValues.reduce((acc, val) => acc + val, 0);
    return sum / numericValues.length;
  }

  /**
   * Menghitung median
   * @param {Array<number>} values - Array of numeric values
   * @returns {number} Median value
   * @throws {Error} Jika array kosong atau berisi non-numeric values
   */
  static calculateMedian(values) {
    const numericValues = this._validateAndFilterNumeric(values);
    
    if (numericValues.length === 0) {
      throw new Error('Tidak ada nilai numerik untuk dihitung.');
    }

    const sorted = [...numericValues].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      return sorted[mid];
    }
  }

  /**
   * Menghitung modus (bisa lebih dari satu)
   * @param {Array<number>} values - Array of numeric values
   * @returns {Array<number>} Array of mode values
   * @throws {Error} Jika array kosong atau berisi non-numeric values
   */
  static calculateMode(values) {
    const numericValues = this._validateAndFilterNumeric(values);
    
    if (numericValues.length === 0) {
      throw new Error('Tidak ada nilai numerik untuk dihitung.');
    }

    // Count frequency of each value
    const frequency = {};
    numericValues.forEach(val => {
      frequency[val] = (frequency[val] || 0) + 1;
    });

    // Find maximum frequency
    const maxFreq = Math.max(...Object.values(frequency));

    // If all values appear once, no mode
    if (maxFreq === 1) {
      return [];
    }

    // Get all values with maximum frequency
    const modes = Object.keys(frequency)
      .filter(key => frequency[key] === maxFreq)
      .map(key => parseFloat(key));

    return modes;
  }

  /**
   * Menghitung standar deviasi
   * @param {Array<number>} values - Array of numeric values
   * @returns {number} Standard deviation
   * @throws {Error} Jika array kosong atau berisi non-numeric values
   */
  static calculateStdDev(values) {
    const numericValues = this._validateAndFilterNumeric(values);
    
    if (numericValues.length === 0) {
      throw new Error('Tidak ada nilai numerik untuk dihitung.');
    }

    if (numericValues.length === 1) {
      return 0;
    }

    const mean = this.calculateMean(numericValues);
    const squaredDiffs = numericValues.map(val => Math.pow(val - mean, 2));
    const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / numericValues.length;
    
    return Math.sqrt(variance);
  }

  /**
   * Menghitung nilai minimum dan maksimum
   * @param {Array<number>} values - Array of numeric values
   * @returns {Object} Object with min and max properties
   * @throws {Error} Jika array kosong atau berisi non-numeric values
   */
  static calculateMinMax(values) {
    const numericValues = this._validateAndFilterNumeric(values);
    
    if (numericValues.length === 0) {
      throw new Error('Tidak ada nilai numerik untuk dihitung.');
    }

    return {
      min: Math.min(...numericValues),
      max: Math.max(...numericValues)
    };
  }

  /**
   * Menghitung jumlah total (sum)
   * @param {Array<number>} values - Array of numeric values
   * @returns {number} Sum of all values
   * @throws {Error} Jika array kosong atau berisi non-numeric values
   */
  static calculateSum(values) {
    const numericValues = this._validateAndFilterNumeric(values);
    
    if (numericValues.length === 0) {
      throw new Error('Tidak ada nilai numerik untuk dihitung.');
    }

    return numericValues.reduce((acc, val) => acc + val, 0);
  }

  /**
   * Mengembalikan semua statistik deskriptif
   * @param {Array<number>} values - Array of numeric values
   * @returns {Object} Object containing all statistics
   * @throws {Error} Jika array kosong atau berisi non-numeric values
   */
  static getDescriptiveStats(values) {
    const numericValues = this._validateAndFilterNumeric(values);
    
    if (numericValues.length === 0) {
      throw new Error('Tidak ada nilai numerik untuk dihitung.');
    }

    const minMax = this.calculateMinMax(numericValues);
    
    return {
      count: numericValues.length,
      mean: this.calculateMean(numericValues),
      median: this.calculateMedian(numericValues),
      mode: this.calculateMode(numericValues),
      stdDev: this.calculateStdDev(numericValues),
      min: minMax.min,
      max: minMax.max,
      sum: this.calculateSum(numericValues)
    };
  }

  /**
   * Validate and filter numeric values
   * @private
   * @param {Array} values - Array of values
   * @returns {Array<number>} Array of numeric values
   */
  static _validateAndFilterNumeric(values) {
    if (!Array.isArray(values)) {
      throw new Error('Input harus berupa array.');
    }

    // Filter out null, undefined, empty strings, and convert to numbers
    const numericValues = values
      .filter(val => val !== null && val !== undefined && val !== '')
      .map(val => {
        const num = typeof val === 'number' ? val : parseFloat(val);
        return isNaN(num) ? null : num;
      })
      .filter(val => val !== null);

    return numericValues;
  }
}

module.exports = StatisticalCalculator;
