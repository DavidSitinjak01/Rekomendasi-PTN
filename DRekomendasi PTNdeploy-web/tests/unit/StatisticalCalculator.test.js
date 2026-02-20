const StatisticalCalculator = require('../../src/StatisticalCalculator');

describe('StatisticalCalculator', () => {
  const sampleData = [10, 20, 30, 40, 50];
  const dataWithDuplicates = [1, 2, 2, 3, 3, 3, 4];

  describe('calculateMean', () => {
    test('should calculate mean correctly', () => {
      const mean = StatisticalCalculator.calculateMean(sampleData);
      expect(mean).toBe(30);
    });

    test('should handle single value', () => {
      const mean = StatisticalCalculator.calculateMean([42]);
      expect(mean).toBe(42);
    });

    test('should throw error for empty array', () => {
      expect(() => {
        StatisticalCalculator.calculateMean([]);
      }).toThrow('Tidak ada nilai numerik');
    });

    test('should filter out non-numeric values', () => {
      const mean = StatisticalCalculator.calculateMean([10, 20, null, 30, undefined, '']);
      expect(mean).toBe(20);
    });
  });

  describe('calculateMedian', () => {
    test('should calculate median for odd length array', () => {
      const median = StatisticalCalculator.calculateMedian([1, 2, 3, 4, 5]);
      expect(median).toBe(3);
    });

    test('should calculate median for even length array', () => {
      const median = StatisticalCalculator.calculateMedian([1, 2, 3, 4]);
      expect(median).toBe(2.5);
    });

    test('should handle unsorted array', () => {
      const median = StatisticalCalculator.calculateMedian([5, 1, 4, 2, 3]);
      expect(median).toBe(3);
    });

    test('should throw error for empty array', () => {
      expect(() => {
        StatisticalCalculator.calculateMedian([]);
      }).toThrow('Tidak ada nilai numerik');
    });
  });

  describe('calculateMode', () => {
    test('should calculate mode correctly', () => {
      const mode = StatisticalCalculator.calculateMode(dataWithDuplicates);
      expect(mode).toEqual([3]);
    });

    test('should return multiple modes', () => {
      const mode = StatisticalCalculator.calculateMode([1, 1, 2, 2, 3]);
      expect(mode).toHaveLength(2);
      expect(mode).toContain(1);
      expect(mode).toContain(2);
    });

    test('should return empty array when no mode', () => {
      const mode = StatisticalCalculator.calculateMode([1, 2, 3, 4, 5]);
      expect(mode).toEqual([]);
    });

    test('should throw error for empty array', () => {
      expect(() => {
        StatisticalCalculator.calculateMode([]);
      }).toThrow('Tidak ada nilai numerik');
    });
  });

  describe('calculateStdDev', () => {
    test('should calculate standard deviation correctly', () => {
      const stdDev = StatisticalCalculator.calculateStdDev([2, 4, 4, 4, 5, 5, 7, 9]);
      expect(stdDev).toBeCloseTo(2, 0);
    });

    test('should return 0 for single value', () => {
      const stdDev = StatisticalCalculator.calculateStdDev([42]);
      expect(stdDev).toBe(0);
    });

    test('should return 0 for identical values', () => {
      const stdDev = StatisticalCalculator.calculateStdDev([5, 5, 5, 5]);
      expect(stdDev).toBe(0);
    });

    test('should throw error for empty array', () => {
      expect(() => {
        StatisticalCalculator.calculateStdDev([]);
      }).toThrow('Tidak ada nilai numerik');
    });
  });

  describe('calculateMinMax', () => {
    test('should calculate min and max correctly', () => {
      const result = StatisticalCalculator.calculateMinMax(sampleData);
      expect(result.min).toBe(10);
      expect(result.max).toBe(50);
    });

    test('should handle single value', () => {
      const result = StatisticalCalculator.calculateMinMax([42]);
      expect(result.min).toBe(42);
      expect(result.max).toBe(42);
    });

    test('should handle negative numbers', () => {
      const result = StatisticalCalculator.calculateMinMax([-10, -5, 0, 5, 10]);
      expect(result.min).toBe(-10);
      expect(result.max).toBe(10);
    });

    test('should throw error for empty array', () => {
      expect(() => {
        StatisticalCalculator.calculateMinMax([]);
      }).toThrow('Tidak ada nilai numerik');
    });
  });

  describe('calculateSum', () => {
    test('should calculate sum correctly', () => {
      const sum = StatisticalCalculator.calculateSum(sampleData);
      expect(sum).toBe(150);
    });

    test('should handle single value', () => {
      const sum = StatisticalCalculator.calculateSum([42]);
      expect(sum).toBe(42);
    });

    test('should handle negative numbers', () => {
      const sum = StatisticalCalculator.calculateSum([-10, 5, 15]);
      expect(sum).toBe(10);
    });

    test('should throw error for empty array', () => {
      expect(() => {
        StatisticalCalculator.calculateSum([]);
      }).toThrow('Tidak ada nilai numerik');
    });
  });

  describe('getDescriptiveStats', () => {
    test('should return all statistics', () => {
      const stats = StatisticalCalculator.getDescriptiveStats(sampleData);
      
      expect(stats).toHaveProperty('count');
      expect(stats).toHaveProperty('mean');
      expect(stats).toHaveProperty('median');
      expect(stats).toHaveProperty('mode');
      expect(stats).toHaveProperty('stdDev');
      expect(stats).toHaveProperty('min');
      expect(stats).toHaveProperty('max');
      expect(stats).toHaveProperty('sum');
      
      expect(stats.count).toBe(5);
      expect(stats.mean).toBe(30);
      expect(stats.median).toBe(30);
      expect(stats.min).toBe(10);
      expect(stats.max).toBe(50);
      expect(stats.sum).toBe(150);
    });

    test('should throw error for empty array', () => {
      expect(() => {
        StatisticalCalculator.getDescriptiveStats([]);
      }).toThrow('Tidak ada nilai numerik');
    });

    test('should handle array with null values', () => {
      const stats = StatisticalCalculator.getDescriptiveStats([10, null, 20, undefined, 30]);
      expect(stats.count).toBe(3);
      expect(stats.mean).toBe(20);
    });
  });

  describe('edge cases', () => {
    test('should handle string numbers', () => {
      const mean = StatisticalCalculator.calculateMean(['10', '20', '30']);
      expect(mean).toBe(20);
    });

    test('should throw error for non-array input', () => {
      expect(() => {
        StatisticalCalculator.calculateMean('not an array');
      }).toThrow('Input harus berupa array');
    });

    test('should handle mixed valid and invalid values', () => {
      const mean = StatisticalCalculator.calculateMean([10, 'abc', 20, null, 30]);
      expect(mean).toBe(20);
    });
  });
});
