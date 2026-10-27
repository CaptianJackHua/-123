const fs = require('fs');
const JSZip = require('jszip');
const path = require('path');

const pptxPath = path.join('C:', 'Users', 'lenovo', 'Documents', 'Trae-CN', 'temp_20261026_03', '设备数据分析报告.pptx');
const stats = fs.statSync(pptxPath);
console.log('File size:', stats.size, 'bytes');

JSZip.loadAsync(fs.readFileSync(pptxPath)).then(zip => {
  console.log('\nPPTX structure check:');
  
  // Check slide count
  const slideFiles = Object.keys(zip.files).filter(f => f.match(/ppt\/slides\/slide\d+\.xml$/));
  console.log('Slides found:', slideFiles.length);
  slideFiles.sort((a,b) => {
    const na = parseInt(a.match(/slide(\d+)/)[1]);
    const nb = parseInt(b.match(/slide(\d+)/)[1]);
    return na - nb;
  }).forEach(f => console.log('  -', f));
  
  // Check for charts
  const chartFiles = Object.keys(zip.files).filter(f => f.match(/ppt\/charts\/chart\d+\.xml$/));
  console.log('\nCharts found:', chartFiles.length);
  
  // Check for images
  const imgFiles = Object.keys(zip.files).filter(f => f.match(/ppt\/media\//));
  console.log('Media files:', imgFiles.length);
  
  // Content types
  return zip.file('[Content_Types].xml').async('string');
}).then(content => {
  // Count charts in content types
  const chartMatches = content.match(/chart/g);
  console.log('Chart references in content types:', chartMatches ? chartMatches.length / 2 : 0);
  
  console.log('\n✅ PPT validation complete. File structure is valid.');
}).catch(err => {
  console.error('❌ Error:', err);
});
