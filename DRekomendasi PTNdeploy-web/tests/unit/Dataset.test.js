const Dataset = require('../../src/Dataset');

describe('Dataset', () => {
  const sampleData = [
    { Nama: 'Alice', Umur: 25, Kota: 'Jakarta' },
    { Nama: 'Bob', Umur: 30, Kota: 'Bandung' },
    { Nama: 'Charlie', Umur: 35, Kota: 'Surabaya' }
  ];

  const metadata = {
    columnTypes: { Nama: 'text', Umur: 'number', Kota: 'text' },
    sourceFile: 'test.xlsx',
    sourceWorksheet: 'Sheet1'
  };

  describe('constructor', () => {
    test('should create dataset with data and metadata', () => {
      const dataset = new Dataset(sampleData, metadata);
      
      expect(dataset.data).toEqual(sampleData);
      expect(dataset.columnTypes).toEqual(metadata.columnTypes);
      expect(dataset.sourceFile).toBe('test.xlsx');
      expect(dataset.sourceWorksheet).toBe('Sheet1');
    });

    test('should handle empty data', () => {
      const dataset = new Dataset([]);
      
      expect(dataset.data).toEqual([]);
      expect(dataset.getRowCount()).toBe(0);
      expect(dataset.getColumnCount()).toBe(0);
    });

    test('should work without metadata', () => {
      const dataset = new Dataset(sampleData);
      
      expect(dataset.data).toEqual(sampleData);
      expect(dataset.sourceFile).toBe('');
    });
  });

  describe('getColumn', () => {
    test('should return column data', () => {
      const dataset = new Dataset(sampleData, metadata);
      const names = dataset.getColumn('Nama');
      
      expect(names).toEqual(['Alice', 'Bob', 'Charlie']);
    });

    test('should throw error for non-existent column', () => {
      const dataset = new Dataset(sampleData, metadata);
      
      expect(() => {
        dataset.getColumn('NonExistent');
      }).toThrow('tidak ditemukan');
    });
  });

  describe('getRow', () => {
    test('should return row data', () => {
      const dataset = new Dataset(sampleData, metadata);
      const row = dataset.getRow(0);
      
      expect(row).toEqual({ Nama: 'Alice', Umur: 25, Kota: 'Jakarta' });
    });

    test('should throw error for invalid index', () => {
      const dataset = new Dataset(sampleData, metadata);
      
      expect(() => {
        dataset.getRow(10);
      }).toThrow('di luar range');
    });

    test('should throw error for negative index', () => {
      const dataset = new Dataset(sampleData, metadata);
      
      expect(() => {
        dataset.getRow(-1);
      }).toThrow('di luar range');
    });
  });

  describe('getColumnNames', () => {
    test('should return all column names', () => {
      const dataset = new Dataset(sampleData, metadata);
      const names = dataset.getColumnNames();
      
      expect(names).toEqual(['Nama', 'Umur', 'Kota']);
    });

    test('should return empty array for empty dataset', () => {
      const dataset = new Dataset([]);
      const names = dataset.getColumnNames();
      
      expect(names).toEqual([]);
    });
  });

  describe('getRowCount', () => {
    test('should return correct row count', () => {
      const dataset = new Dataset(sampleData, metadata);
      
      expect(dataset.getRowCount()).toBe(3);
    });

    test('should return 0 for empty dataset', () => {
      const dataset = new Dataset([]);
      
      expect(dataset.getRowCount()).toBe(0);
    });
  });

  describe('getColumnCount', () => {
    test('should return correct column count', () => {
      const dataset = new Dataset(sampleData, metadata);
      
      expect(dataset.getColumnCount()).toBe(3);
    });

    test('should return 0 for empty dataset', () => {
      const dataset = new Dataset([]);
      
      expect(dataset.getColumnCount()).toBe(0);
    });
  });

  describe('getColumnType', () => {
    test('should return column type', () => {
      const dataset = new Dataset(sampleData, metadata);
      
      expect(dataset.getColumnType('Nama')).toBe('text');
      expect(dataset.getColumnType('Umur')).toBe('number');
    });

    test('should return unknown for unspecified type', () => {
      const dataset = new Dataset(sampleData);
      
      expect(dataset.getColumnType('Nama')).toBe('unknown');
    });

    test('should throw error for non-existent column', () => {
      const dataset = new Dataset(sampleData, metadata);
      
      expect(() => {
        dataset.getColumnType('NonExistent');
      }).toThrow('tidak ditemukan');
    });
  });

  describe('createFiltered', () => {
    test('should create new dataset with filtered data', () => {
      const dataset = new Dataset(sampleData, metadata);
      const filtered = dataset.createFiltered([sampleData[0]]);
      
      expect(filtered.getRowCount()).toBe(1);
      expect(filtered.columnTypes).toEqual(dataset.columnTypes);
      expect(filtered.sourceFile).toBe(dataset.sourceFile);
    });
  });

  describe('getMetadata', () => {
    test('should return complete metadata', () => {
      const dataset = new Dataset(sampleData, metadata);
      const meta = dataset.getMetadata();
      
      expect(meta.sourceFile).toBe('test.xlsx');
      expect(meta.sourceWorksheet).toBe('Sheet1');
      expect(meta.rowCount).toBe(3);
      expect(meta.columnCount).toBe(3);
      expect(meta.columnNames).toEqual(['Nama', 'Umur', 'Kota']);
    });
  });
});
