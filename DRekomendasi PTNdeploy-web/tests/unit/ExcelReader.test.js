const ExcelReader = require('../../src/ExcelReader');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

describe('ExcelReader', () => {
  const testDataDir = path.join(__dirname, '../test-data');
  const testFilePath = path.join(testDataDir, 'test-sample.xlsx');

  beforeAll(() => {
    // Create test data directory
    if (!fs.existsSync(testDataDir)) {
      fs.mkdirSync(testDataDir, { recursive: true });
    }

    // Create a test Excel file
    const wb = XLSX.utils.book_new();
    
    // Sheet 1: Sample data with mixed types
    const data1 = [
      { Nama: 'Alice', Umur: 25, Kota: 'Jakarta', Aktif: true },
      { Nama: 'Bob', Umur: 30, Kota: 'Bandung', Aktif: false },
      { Nama: 'Charlie', Umur: 35, Kota: 'Surabaya', Aktif: true }
    ];
    const ws1 = XLSX.utils.json_to_sheet(data1);
    XLSX.utils.book_append_sheet(wb, ws1, 'Data1');

    // Sheet 2: Empty sheet
    const ws2 = XLSX.utils.json_to_sheet([]);
    XLSX.utils.book_append_sheet(wb, ws2, 'Empty');

    // Write file
    XLSX.writeFile(wb, testFilePath);
  });

  afterAll(() => {
    // Cleanup test file
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  describe('readFile', () => {
    test('should read Excel file successfully', () => {
      const result = ExcelReader.readFile(testFilePath);
      
      expect(result).toHaveProperty('filePath');
      expect(result).toHaveProperty('workbook');
      expect(result).toHaveProperty('sheetNames');
      expect(result.filePath).toBe(testFilePath);
    });

    test('should throw error for non-existent file', () => {
      expect(() => {
        ExcelReader.readFile('non-existent-file.xlsx');
      }).toThrow('tidak ditemukan');
    });

    test('should load all worksheets', () => {
      const result = ExcelReader.readFile(testFilePath);
      expect(result.sheetNames).toContain('Data1');
      expect(result.sheetNames).toContain('Empty');
    });
  });

  describe('getWorksheets', () => {
    test('should return list of worksheet names', () => {
      const workbookObj = ExcelReader.readFile(testFilePath);
      const sheets = ExcelReader.getWorksheets(workbookObj);
      
      expect(Array.isArray(sheets)).toBe(true);
      expect(sheets.length).toBeGreaterThan(0);
      expect(sheets).toContain('Data1');
    });
  });

  describe('readWorksheet', () => {
    test('should read worksheet data correctly', () => {
      const workbookObj = ExcelReader.readFile(testFilePath);
      const data = ExcelReader.readWorksheet(workbookObj, 'Data1');
      
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(3);
      expect(data[0]).toHaveProperty('Nama');
      expect(data[0]).toHaveProperty('Umur');
    });

    test('should throw error for non-existent worksheet', () => {
      const workbookObj = ExcelReader.readFile(testFilePath);
      
      expect(() => {
        ExcelReader.readWorksheet(workbookObj, 'NonExistent');
      }).toThrow('tidak ditemukan');
    });

    test('should handle empty worksheet', () => {
      const workbookObj = ExcelReader.readFile(testFilePath);
      const data = ExcelReader.readWorksheet(workbookObj, 'Empty');
      
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(0);
    });
  });

  describe('detectColumnTypes', () => {
    test('should detect column types correctly', () => {
      const workbookObj = ExcelReader.readFile(testFilePath);
      const data = ExcelReader.readWorksheet(workbookObj, 'Data1');
      const types = ExcelReader.detectColumnTypes(data);
      
      expect(types).toHaveProperty('Nama');
      expect(types).toHaveProperty('Umur');
      expect(types.Nama).toBe('text');
      expect(types.Umur).toBe('number');
    });

    test('should return empty object for empty data', () => {
      const types = ExcelReader.detectColumnTypes([]);
      expect(types).toEqual({});
    });

    test('should handle null values', () => {
      const data = [
        { Col1: 'text', Col2: null },
        { Col1: 'more', Col2: null }
      ];
      const types = ExcelReader.detectColumnTypes(data);
      
      expect(types.Col1).toBe('text');
      expect(types.Col2).toBe('empty');
    });
  });
});
