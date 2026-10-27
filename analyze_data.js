const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join('C:', 'Users', 'lenovo', '.trae-cn', 'attachments', '24c3ef0c-33f2-4c0e-b673-030f71bcea74_query_device_by_imei_261026112109.xlsx');
const wb = XLSX.readFile(filePath);
const ws = wb.Sheets[wb.SheetNames[0]];
const raw = XLSX.utils.sheet_to_json(ws, {header:1});

const headers = raw[0];
console.log('Headers:', headers);

const rows = raw.slice(1); // skip header
console.log('\nTotal records:', rows.length);

// Build array of objects
const data = rows.map(r => {
  const obj = {};
  headers.forEach((h, i) => obj[h] = r[i] !== undefined ? r[i] : null);
  return obj;
});

// Stats for each field
console.log('\n========== 字段统计 ==========\n');

// 1. 终端型号分布
const modelCount = {};
data.forEach(d => {
  const m = d['终端型号'] || '(空)';
  modelCount[m] = (modelCount[m] || 0) + 1;
});
console.log('【终端型号分布】');
Object.entries(modelCount).sort((a,b) => b[1]-a[1]).forEach(([k,v]) => console.log(`  ${k}: ${v}`));

// 2. 版本分布
const versionCount = {};
data.forEach(d => {
  const v = d['版本'] || '(空)';
  versionCount[v] = (versionCount[v] || 0) + 1;
});
console.log('\n【版本分布】');
Object.entries(versionCount).sort((a,b) => b[1]-a[1]).forEach(([k,v]) => console.log(`  ${k}: ${v}`));

// 3. 是否绑定用户
const bindCount = {};
data.forEach(d => {
  const b = d['是否绑定用户'] || '(空)';
  bindCount[b] = (bindCount[b] || 0) + 1;
});
console.log('\n【是否绑定用户】');
Object.entries(bindCount).sort((a,b) => b[1]-a[1]).forEach(([k,v]) => console.log(`  ${k}: ${v}`));

// 4. 车型分布（只统计非空）
const carCount = {};
data.forEach(d => {
  const c = d['车型'];
  if (c && c !== '(空)') {
    carCount[c] = (carCount[c] || 0) + 1;
  }
});
console.log('\n【车型分布 - 仅非空】');
Object.entries(carCount).sort((a,b) => b[1]-a[1]).forEach(([k,v]) => console.log(`  ${k}: ${v}`));

// 5. 蓝牙MAC是否有值
const hasBt = data.filter(d => d['蓝牙MAC'] && d['蓝牙MAC'].toString().trim()).length;
const noBt = data.length - hasBt;
console.log('\n【蓝牙MAC状态】');
console.log(`  有蓝牙MAC: ${hasBt}`);
console.log(`  无蓝牙MAC: ${noBt}`);

// 6. 版本是否有值
const hasVer = data.filter(d => d['版本'] && d['版本'].toString().trim()).length;
const noVer = data.length - hasVer;
console.log('\n【版本状态】');
console.log(`  有版本号: ${hasVer}`);
console.log(`  无版本号: ${noVer}`);

// 7. 绑定用户的设备中，有多少有版本/蓝牙
const boundDevices = data.filter(d => d['是否绑定用户'] === '是');
const unboundDevices = data.filter(d => d['是否绑定用户'] !== '是');
console.log('\n【绑定设备详情】');
console.log(`  已绑定: ${boundDevices.length}`);
console.log(`  未绑定: ${unboundDevices.length}`);
const boundWithVer = boundDevices.filter(d => d['版本'] && d['版本'].toString().trim()).length;
console.log(`  已绑定且有版本: ${boundWithVer}`);

// 8. 各终端型号下的绑定情况
console.log('\n【各型号绑定情况】');
const modelBind = {};
data.forEach(d => {
  const m = d['终端型号'] || '(空)';
  if (!modelBind[m]) modelBind[m] = { total: 0, bound: 0, unbound: 0 };
  modelBind[m].total++;
  if (d['是否绑定用户'] === '是') modelBind[m].bound++;
  else modelBind[m].unbound++;
});
Object.entries(modelBind).sort((a,b) => b[1].total-a[1].total).forEach(([k,v]) => {
  const pct = v.total > 0 ? (v.bound/v.total*100).toFixed(1) : 0;
  console.log(`  ${k}: 总数${v.total}, 已绑定${v.bound}(${pct}%), 未绑定${v.unbound}`);
});

// 9. 各车型的设备数量和绑定率
console.log('\n【各车型设备数量】');
const carStats = {};
data.forEach(d => {
  const c = d['车型'] || '未分配车型';
  if (!carStats[c]) carStats[c] = { total: 0, bound: 0 };
  carStats[c].total++;
  if (d['是否绑定用户'] === '是') carStats[c].bound++;
});
Object.entries(carStats).sort((a,b) => b[1].total-a[1].total).forEach(([k,v]) => {
  const pct = v.total > 0 ? (v.bound/v.total*100).toFixed(1) : 0;
  console.log(`  ${k}: 总数${v.total}, 已绑定${v.bound}(${pct}%)`);
});
