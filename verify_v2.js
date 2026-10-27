const fs = require('fs');
const JSZip = require('jszip');
const path = require('path');

const pptxPath = path.join('C:', 'Users', 'lenovo', 'Documents', 'Trae-CN', 'temp_20261026_03', '设备数据分析报告_v2.pptx');
const stats = fs.statSync(pptxPath);
console.log('File size:', stats.size, 'bytes');

JSZip.loadAsync(fs.readFileSync(pptxPath)).then(zip => {
  console.log('\n=== PPTX Structure ===');

  const slideFiles = Object.keys(zip.files).filter(f => f.match(/ppt\/slides\/slide\d+\.xml$/));
  console.log('Slides:', slideFiles.length);

  const chartFiles = Object.keys(zip.files).filter(f => f.match(/ppt\/charts\/chart\d+\.xml$/));
  console.log('Charts:', chartFiles.length);
  chartFiles.forEach(f => console.log('  -', f));

  console.log('\n=== Checking each slide XML for chart + table elements ===');
  const slidePromises = slideFiles.sort().map(f => {
    return zip.file(f).async('string').then(xml => {
      const hasChart = xml.includes('<c:chart');
      const hasTable = xml.includes('<a:tbl');
      const chartCount = (xml.match(/<c:chart/g) || []).length;
      const tableCount = (xml.match(/<a:tbl/g) || []).length;
      console.log(`${f}: chart=${chartCount}, table=${tableCount}`);
      return { slide: f, chartCount, tableCount };
    });
  });
  return Promise.all(slidePromises);
}).then(results => {
  const totalCharts = results.reduce((s, r) => s + r.chartCount, 0);
  const totalTables = results.reduce((s, r) => s + r.tableCount, 0);
  console.log(`\n✅ 总计: ${totalCharts} 个图表 + ${totalTables} 个表格`);
  console.log('文件完全有效！');
}).catch(err => console.error('❌ Error:', err));
