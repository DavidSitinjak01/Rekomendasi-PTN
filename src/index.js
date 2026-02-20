const ExcelReader = require('./ExcelReader');
const Dataset = require('./Dataset');
const StatisticalCalculator = require('./StatisticalCalculator');
const FilterEngine = require('./FilterEngine');
const SortEngine = require('./SortEngine');
const SearchEngine = require('./SearchEngine');
const ValidationEngine = require('./ValidationEngine');
const ExcelWriter = require('./ExcelWriter');
const readline = require('readline');

/**
 * Excel Data Analyzer - Aplikasi CLI
 */
class ExcelDataAnalyzer {
  constructor() {
    this.dataset = null;
    this.workbookObj = null;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  /**
   * Start aplikasi
   */
  async start() {
    console.log('='.repeat(60));
    console.log('   APLIKASI ANALISIS DATA EXCEL');
    console.log('='.repeat(60));
    console.log();
    
    await this.mainMenu();
  }

  /**
   * Main menu
   */
  async mainMenu() {
    while (true) {
      console.log('\n--- MENU UTAMA ---');
      console.log('1. Buka File Excel');
      console.log('2. Lihat Data');
      console.log('3. Analisis Statistik');
      console.log('4. Filter Data');
      console.log('5. Sort Data');
      console.log('6. Cari Data');
      console.log('7. Validasi Data');
      console.log('8. Export Data');
      console.log('0. Keluar');
      
      const choice = await this.question('\nPilih menu (0-8): ');
      
      try {
        switch (choice) {
        case '1':
          await this.openFile();
          break;
        case '2':
          await this.viewData();
          break;
        case '3':
          await this.analyzeStatistics();
          break;
        case '4':
          await this.filterData();
          break;
        case '5':
          await this.sortData();
          break;
        case '6':
          await this.searchData();
          break;
        case '7':
          await this.validateData();
          break;
        case '8':
          await this.exportData();
          break;
        case '0':
          console.log('\nTerima kasih telah menggunakan aplikasi ini!');
          this.rl.close();
          process.exit(0);
          break;
        default:
          console.log('\nPilihan tidak valid!');
        }
      } catch (error) {
        console.error(`\n❌ Error: ${error.message}`);
      }
    }
  }

  /**
   * Buka file Excel
   */
  async openFile() {
    const filePath = await this.question('\nMasukkan path file Excel: ');
    
    console.log('\n⏳ Membaca file...');
    this.workbookObj = ExcelReader.readFile(filePath);
    
    const sheets = ExcelReader.getWorksheets(this.workbookObj);
    console.log(`\n✓ File berhasil dibuka!`);
    console.log(`Worksheet yang tersedia: ${sheets.join(', ')}`);
    
    const sheetName = await this.question('\nPilih worksheet: ');
    const data = ExcelReader.readWorksheet(this.workbookObj, sheetName);
    const columnTypes = ExcelReader.detectColumnTypes(data);
    
    this.dataset = new Dataset(data, {
      columnTypes,
      sourceFile: filePath,
      sourceWorksheet: sheetName
    });
    
    console.log(`\n✓ Data berhasil dimuat!`);
    console.log(`Total baris: ${this.dataset.getRowCount()}`);
    console.log(`Total kolom: ${this.dataset.getColumnCount()}`);
  }

  /**
   * Lihat data
   */
  async viewData() {
    if (!this.dataset) {
      console.log('\n⚠ Belum ada data. Silakan buka file terlebih dahulu.');
      return;
    }
    
    console.log('\n--- DATA ---');
    console.log(`Sumber: ${this.dataset.sourceFile} - ${this.dataset.sourceWorksheet}`);
    console.log(`Total: ${this.dataset.getRowCount()} baris, ${this.dataset.getColumnCount()} kolom`);
    console.log();
    
    const data = this.dataset.getData();
    const limit = 20;
    
    if (data.length > 0) {
      console.table(data.slice(0, limit));
      
      if (data.length > limit) {
        console.log(`\n... dan ${data.length - limit} baris lainnya`);
      }
    } else {
      console.log('Dataset kosong.');
    }
  }

  /**
   * Analisis statistik
   */
  async analyzeStatistics() {
    if (!this.dataset) {
      console.log('\n⚠ Belum ada data. Silakan buka file terlebih dahulu.');
      return;
    }
    
    const columns = this.dataset.getColumnNames();
    console.log(`\nKolom yang tersedia: ${columns.join(', ')}`);
    
    const column = await this.question('\nPilih kolom untuk analisis: ');
    
    if (!columns.includes(column)) {
      console.log('\n❌ Kolom tidak ditemukan!');
      return;
    }
    
    const columnType = this.dataset.getColumnType(column);
    if (columnType !== 'number') {
      console.log(`\n⚠ Kolom '${column}' bukan kolom numerik (tipe: ${columnType}).`);
      console.log('Statistik hanya dapat dihitung untuk kolom numerik.');
      return;
    }
    
    const values = this.dataset.getColumn(column);
    const stats = StatisticalCalculator.getDescriptiveStats(values);
    
    console.log(`\n--- STATISTIK DESKRIPTIF: ${column} ---`);
    console.log(`Jumlah data: ${stats.count}`);
    console.log(`Rata-rata: ${stats.mean.toFixed(2)}`);
    console.log(`Median: ${stats.median.toFixed(2)}`);
    console.log(`Modus: ${stats.mode.length > 0 ? stats.mode.join(', ') : 'Tidak ada'}`);
    console.log(`Standar Deviasi: ${stats.stdDev.toFixed(2)}`);
    console.log(`Minimum: ${stats.min}`);
    console.log(`Maksimum: ${stats.max}`);
    console.log(`Jumlah: ${stats.sum.toFixed(2)}`);
  }

  /**
   * Filter data
   */
  async filterData() {
    if (!this.dataset) {
      console.log('\n⚠ Belum ada data. Silakan buka file terlebih dahulu.');
      return;
    }
    
    const columns = this.dataset.getColumnNames();
    console.log(`\nKolom yang tersedia: ${columns.join(', ')}`);
    
    const column = await this.question('\nPilih kolom untuk filter: ');
    
    if (!columns.includes(column)) {
      console.log('\n❌ Kolom tidak ditemukan!');
      return;
    }
    
    console.log('\nOperator yang tersedia:');
    console.log('1. equals (sama dengan)');
    console.log('2. gt (lebih besar dari)');
    console.log('3. lt (lebih kecil dari)');
    console.log('4. contains (mengandung teks)');
    
    const op = await this.question('\nPilih operator (1-4): ');
    const value = await this.question('Masukkan nilai: ');
    
    let operator;
    switch (op) {
    case '1': operator = 'equals'; break;
    case '2': operator = 'gt'; break;
    case '3': operator = 'lt'; break;
    case '4': operator = 'contains'; break;
    default:
      console.log('\n❌ Operator tidak valid!');
      return;
    }
    
    const filtered = FilterEngine.applyMultipleFilters(this.dataset, [
      { column, operator, value: operator === 'gt' || operator === 'lt' ? parseFloat(value) : value }
    ]);
    
    console.log(`\n✓ Filter diterapkan!`);
    console.log(`Hasil: ${filtered.getRowCount()} baris dari ${this.dataset.getRowCount()} baris`);
    
    if (filtered.getRowCount() > 0) {
      console.table(filtered.getData().slice(0, 10));
    }
    
    const save = await this.question('\nSimpan hasil filter sebagai dataset aktif? (y/n): ');
    if (save.toLowerCase() === 'y') {
      this.dataset = filtered;
      console.log('✓ Dataset aktif diperbarui!');
    }
  }

  /**
   * Sort data
   */
  async sortData() {
    if (!this.dataset) {
      console.log('\n⚠ Belum ada data. Silakan buka file terlebih dahulu.');
      return;
    }
    
    const columns = this.dataset.getColumnNames();
    console.log(`\nKolom yang tersedia: ${columns.join(', ')}`);
    
    const column = await this.question('\nPilih kolom untuk sort: ');
    
    if (!columns.includes(column)) {
      console.log('\n❌ Kolom tidak ditemukan!');
      return;
    }
    
    const direction = await this.question('Urutan (asc/desc): ');
    const ascending = direction.toLowerCase() !== 'desc';
    
    const sorted = SortEngine.sortByColumn(this.dataset, column, ascending);
    
    console.log(`\n✓ Data berhasil diurutkan!`);
    console.table(sorted.getData().slice(0, 10));
    
    const save = await this.question('\nSimpan hasil sort sebagai dataset aktif? (y/n): ');
    if (save.toLowerCase() === 'y') {
      this.dataset = sorted;
      console.log('✓ Dataset aktif diperbarui!');
    }
  }

  /**
   * Cari data
   */
  async searchData() {
    if (!this.dataset) {
      console.log('\n⚠ Belum ada data. Silakan buka file terlebih dahulu.');
      return;
    }
    
    const keyword = await this.question('\nMasukkan kata kunci pencarian: ');
    
    console.log('\n⏳ Mencari...');
    const result = SearchEngine.search(this.dataset, keyword);
    
    console.log(`\n✓ Pencarian selesai!`);
    console.log(`Ditemukan: ${result.totalMatches} hasil`);
    
    if (result.totalMatches > 0) {
      console.log('\nHasil pencarian (dengan highlight >>keyword<<):');
      console.table(result.highlightedData.slice(0, 10));
      
      if (result.totalMatches > 10) {
        console.log(`\n... dan ${result.totalMatches - 10} hasil lainnya`);
      }
    }
  }

  /**
   * Validasi data
   */
  async validateData() {
    if (!this.dataset) {
      console.log('\n⚠ Belum ada data. Silakan buka file terlebih dahulu.');
      return;
    }
    
    console.log('\n⏳ Memvalidasi data...');
    
    const emptyCells = ValidationEngine.findEmptyCells(this.dataset);
    const completeness = ValidationEngine.calculateCompleteness(this.dataset);
    const incompleteRows = ValidationEngine.findIncompleteRows(this.dataset);
    
    console.log('\n--- HASIL VALIDASI ---');
    console.log(`\nTotal baris tidak lengkap: ${incompleteRows.length}`);
    
    console.log('\nKelengkapan per kolom:');
    Object.keys(completeness).forEach(col => {
      const pct = completeness[col].toFixed(1);
      const empty = emptyCells[col].length;
      console.log(`  ${col}: ${pct}% (${empty} cell kosong)`);
    });
  }

  /**
   * Export data
   */
  async exportData() {
    if (!this.dataset) {
      console.log('\n⚠ Belum ada data. Silakan buka file terlebih dahulu.');
      return;
    }
    
    console.log('\nFormat export:');
    console.log('1. Excel (.xlsx)');
    console.log('2. CSV (.csv)');
    
    const format = await this.question('\nPilih format (1-2): ');
    const filePath = await this.question('Masukkan path file output: ');
    
    console.log('\n⏳ Menyimpan file...');
    
    try {
      if (format === '1') {
        ExcelWriter.writeDataset(this.dataset, filePath);
      } else if (format === '2') {
        ExcelWriter.exportToCSV(this.dataset, filePath);
      } else {
        console.log('\n❌ Format tidak valid!');
        return;
      }
      
      console.log(`\n✓ File berhasil disimpan ke: ${filePath}`);
    } catch (error) {
      console.error(`\n❌ Gagal menyimpan file: ${error.message}`);
    }
  }

  /**
   * Helper: Ask question
   */
  question(prompt) {
    return new Promise(resolve => {
      this.rl.question(prompt, answer => {
        resolve(answer);
      });
    });
  }
}

// Start aplikasi
if (require.main === module) {
  const app = new ExcelDataAnalyzer();
  app.start().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = ExcelDataAnalyzer;
