// Quick test script untuk aplikasi
const ExcelReader = require('./src/ExcelReader');
const Dataset = require('./src/Dataset');
const StatisticalCalculator = require('./src/StatisticalCalculator');

console.log('Testing aplikasi dengan file Rekomendasi PTN.xlsx...\n');

try {
  // 1. Baca file
  console.log('1. Membaca file...');
  const workbookObj = ExcelReader.readFile('Rekomendasi PTN.xlsx');
  console.log('   ✓ File berhasil dibaca');
  
  // 2. Lihat worksheets
  console.log('\n2. Worksheets yang tersedia:');
  const sheets = ExcelReader.getWorksheets(workbookObj);
  sheets.forEach(sheet => console.log(`   - ${sheet}`));
  
  // 3. Baca worksheet pertama
  console.log(`\n3. Membaca worksheet: ${sheets[0]}`);
  const data = ExcelReader.readWorksheet(workbookObj, sheets[0]);
  const columnTypes = ExcelReader.detectColumnTypes(data);
  
  const dataset = new Dataset(data, {
    columnTypes,
    sourceFile: 'Rekomendasi PTN.xlsx',
    sourceWorksheet: sheets[0]
  });
  
  console.log(`   ✓ Data berhasil dimuat`);
  console.log(`   Total baris: ${dataset.getRowCount()}`);
  console.log(`   Total kolom: ${dataset.getColumnCount()}`);
  
  // 4. Tampilkan kolom
  console.log('\n4. Kolom yang tersedia:');
  const columns = dataset.getColumnNames();
  columns.forEach(col => {
    const type = dataset.getColumnType(col);
    console.log(`   - ${col} (${type})`);
  });
  
  // 5. Tampilkan sample data
  console.log('\n5. Sample data (5 baris pertama):');
  console.table(dataset.getData().slice(0, 5));
  
  // 6. Coba analisis statistik jika ada kolom numerik
  const numericColumns = columns.filter(col => dataset.getColumnType(col) === 'number');
  if (numericColumns.length > 0) {
    console.log(`\n6. Analisis statistik kolom: ${numericColumns[0]}`);
    const values = dataset.getColumn(numericColumns[0]);
    const stats = StatisticalCalculator.getDescriptiveStats(values);
    console.log(`   Jumlah data: ${stats.count}`);
    console.log(`   Rata-rata: ${stats.mean.toFixed(2)}`);
    console.log(`   Median: ${stats.median.toFixed(2)}`);
    console.log(`   Min: ${stats.min}, Max: ${stats.max}`);
  }
  
  console.log('\n✓ Semua test berhasil!');
  console.log('\nAplikasi siap digunakan. Jalankan dengan: npm start');
  
} catch (error) {
  console.error('\n❌ Error:', error.message);
}
