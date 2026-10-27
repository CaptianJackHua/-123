const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join('C:', 'Users', 'lenovo', '.trae-cn', 'attachments', '24c3ef0c-33f2-4c0e-b673-030f71bcea74_query_device_by_imei_261026112109.xlsx');
const wb = XLSX.readFile(filePath);

console.log('Sheets:', wb.SheetNames);

wb.SheetNames.forEach(name => {
  const ws = wb.Sheets[name];
  const data = XLSX.utils.sheet_to_json(ws, {header:1});
  console.log('\n=== Sheet:', name, '===');
  console.log('Total rows:', data.length);
  data.slice(0, 25).forEach((row, i) => console.log(i + ':', JSON.stringify(row)));
});
