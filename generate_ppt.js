const PptxGenJS = require('pptxgenjs');
const XLSX = require('xlsx');
const path = require('path');

// ============================================================
// SLIDE DIMENSIONS
// ============================================================
const SLIDE_W = 10;
const SLIDE_H = 5.625;

// ============================================================
// COLOR PALETTE - Ocean Gradient
// ============================================================
const C = {
  primary: '065A82',
  secondary: '1C7293',
  accent: '21295C',
  bg: 'F0F7FA',
  light: 'E8F4F8',
  white: 'FFFFFF',
  text: '21295C',
  muted: '6B7280',
  success: '16A34A',
  warning: 'F59E0B',
  danger: 'DC2626',
};
const CHART_COLORS = [C.primary, C.secondary, C.accent, '4A90A4', '2D5A6B', '7AA3BB', 'A8C5D6'];
const FONT = 'Microsoft YaHei';

// ============================================================
// CREATE PRESENTATION
// ============================================================
const pres = new PptxGenJS();
pres.layout = 'LAYOUT_16x9';
pres.title = '终端设备数据分析报告';

// ============================================================
// READ DATA
// ============================================================
const filePath = path.join('C:', 'Users', 'lenovo', '.trae-cn', 'attachments', '24c3ef0c-33f2-4c0e-b673-030f71bcea74_query_device_by_imei_261026112109.xlsx');
const wb = XLSX.readFile(filePath);
const ws = wb.Sheets[wb.SheetNames[0]];
const raw = XLSX.utils.sheet_to_json(ws, {header:1});
const headers = raw[0];
const rows = raw.slice(1);
const data = rows.map(r => {
  const obj = {};
  headers.forEach((h, i) => obj[h] = r[i] !== undefined && r[i] !== null ? String(r[i]).trim() : '');
  return obj;
});

// Compute statistics
const total = data.length;
const bound = data.filter(d => d['是否绑定用户'] === '是').length;
const unbound = total - bound;
const boundRate = ((bound / total) * 100).toFixed(1);

const modelCount = {};
const versionCount = {};
const carCount = {};
const modelBind = {};
const carBind = {};

data.forEach(d => {
  const model = d['终端型号'] || '(空)';
  const ver = d['版本'] || '(空)';
  const car = d['车型'] || '未分配车型';
  modelCount[model] = (modelCount[model] || 0) + 1;
  versionCount[ver] = (versionCount[ver] || 0) + 1;
  carCount[car] = (carCount[car] || 0) + 1;
  if (!modelBind[model]) modelBind[model] = { total: 0, bound: 0 };
  modelBind[model].total++;
  if (d['是否绑定用户'] === '是') modelBind[model].bound++;
  if (!carBind[car]) carBind[car] = { total: 0, bound: 0 };
  carBind[car].total++;
  if (d['是否绑定用户'] === '是') carBind[car].bound++;
});

const modelLabels = Object.keys(modelCount);
const modelValues = Object.values(modelCount);
const versionLabels = Object.keys(versionCount).sort((a,b) => versionCount[b] - versionCount[a]);
const versionValues = versionLabels.map(k => versionCount[k]);
const carLabels = Object.keys(carCount).sort((a,b) => carCount[b] - carCount[a]);
const carValues = carLabels.map(k => carCount[k]);
const carBoundValues = carLabels.map(k => carBind[k].bound);

console.log('Data parsed. Total:', total);

// ============================================================
// SLIDE 1: COVER
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.accent };
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: SLIDE_W, h: SLIDE_H, fill: { color: C.primary, transparency: 30 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.8, w: 0.15, h: 2.2, fill: { color: C.secondary } });
  slide.addText('终端设备数据分析报告', {
    x: 1.2, y: 1.8, w: 8, h: 1.2,
    fontSize: 44, fontFace: FONT, bold: true, color: C.white, charSpacing: 2.5,
  });
  slide.addText('Device Data Analysis Report', {
    x: 1.2, y: 3.1, w: 8, h: 0.6,
    fontSize: 20, fontFace: FONT, italic: true, color: C.light, charSpacing: 1.5,
  });
  slide.addText(`生成日期：${new Date().toLocaleDateString('zh-CN')}`, {
    x: 1.2, y: 4.5, w: 6, h: 0.4, fontSize: 12, color: C.white, transparency: 30,
  });
}

// ============================================================
// SLIDE 2: TOC
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: SLIDE_W, h: 1.0, fill: { color: C.primary } });
  slide.addText('目 录  Contents', {
    x: 0.6, y: 0.2, w: 8, h: 0.6, fontSize: 26, fontFace: FONT, bold: true, color: C.white, charSpacing: 1.5,
  });
  const items = [
    { num: '01', title: '数据概览与关键指标', desc: 'Overview & KPIs' },
    { num: '02', title: '终端型号分布', desc: 'Device Model Distribution' },
    { num: '03', title: '版本分布分析', desc: 'Firmware Version Analysis' },
    { num: '04', title: '用户绑定分析', desc: 'User Binding Status' },
    { num: '05', title: '车型分布分析', desc: 'Vehicle Model Distribution' },
  ];
  items.forEach((item, i) => {
    const yPos = 1.2 + i * 0.85;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.6, y: yPos, w: 8.8, h: 0.7,
      fill: { color: C.white }, line: { color: C.light, pt: 1 },
    });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: yPos, w: 0.15, h: 0.7, fill: { color: C.secondary } });
    slide.addText(item.num, { x: 1.0, y: yPos + 0.1, w: 0.8, h: 0.5, fontSize: 20, fontFace: FONT, bold: true, color: C.primary });
    slide.addText(item.title, { x: 1.9, y: yPos + 0.1, w: 4, h: 0.5, fontSize: 16, bold: true, color: C.text, fontFace: FONT });
    slide.addText(item.desc, { x: 6.0, y: yPos + 0.15, w: 3.4, h: 0.4, fontSize: 11, italic: true, color: C.muted, fontFace: FONT });
  });
}

// ============================================================
// SLIDE 3: KPI OVERVIEW with DATA TABLE
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: SLIDE_W, h: 0.8, fill: { color: C.primary } });
  slide.addText('数据概览  Overview & KPIs', {
    x: 0.5, y: 0.1, w: 8, h: 0.6, fontSize: 22, fontFace: FONT, bold: true, color: C.white, charSpacing: 1.5,
  });

  // KPI cards row
  const kpis = [
    { label: '设备总数', value: total.toLocaleString(), unit: '台', color: C.primary },
    { label: '已绑定', value: bound.toString(), unit: '台', color: C.success },
    { label: '未绑定', value: unbound.toString(), unit: '台', color: C.warning },
    { label: '绑定率', value: boundRate, unit: '%', color: C.accent },
  ];
  kpis.forEach((kpi, i) => {
    const cardW = 2.2;
    const xPos = 0.4 + i * (cardW + 0.13);
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.0, w: cardW, h: 1.5,
      fill: { color: C.white }, line: { color: kpi.color, pt: 2 },
    });
    slide.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 1.0, w: cardW, h: 0.1, fill: { color: kpi.color } });
    slide.addText([
      { text: kpi.value, options: { fontSize: 28, fontFace: FONT, bold: true, color: kpi.color } },
      { text: ' ' + kpi.unit, options: { fontSize: 14, color: C.muted, fontFace: FONT } },
    ], { x: xPos + 0.1, y: 1.15, w: cardW - 0.2, h: 0.7, align: 'center', valign: 'middle' });
    slide.addText(kpi.label, { x: xPos + 0.1, y: 1.85, w: cardW - 0.2, h: 0.5, fontSize: 12, color: C.muted, align: 'center', fontFace: FONT });
  });

  // DATA TABLE - Key dimensions summary
  slide.addText('关键维度汇总表', { x: 0.5, y: 2.75, w: 4, h: 0.35, fontSize: 14, bold: true, color: C.primary, fontFace: FONT });

  const tableRows = [
    // Header
    [
      { text: '维度', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
      { text: '分类', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
      { text: '数量(台)', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
      { text: '占比', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
    ],
    // Model rows
    [
      { text: '终端型号', options: { bold: true, fill: { color: C.light }, align: 'center', fontFace: FONT } },
      { text: modelLabels[0], options: { align: 'center', fontFace: FONT } },
      { text: modelValues[0].toString(), options: { align: 'right', fontFace: FONT } },
      { text: ((modelValues[0]/total)*100).toFixed(1) + '%', options: { align: 'right', fontFace: FONT } },
    ],
    [
      { text: '', options: { fill: { color: C.light }, align: 'center', fontFace: FONT } },
      { text: modelLabels[1], options: { align: 'center', fontFace: FONT } },
      { text: modelValues[1].toString(), options: { align: 'right', fontFace: FONT } },
      { text: ((modelValues[1]/total)*100).toFixed(1) + '%', options: { align: 'right', fontFace: FONT } },
    ],
    // Binding rows
    [
      { text: '绑定状态', options: { bold: true, fill: { color: C.light }, align: 'center', fontFace: FONT } },
      { text: '已绑定', options: { align: 'center', fontFace: FONT } },
      { text: bound.toString(), options: { align: 'right', fontFace: FONT } },
      { text: boundRate + '%', options: { align: 'right', fontFace: FONT } },
    ],
    [
      { text: '', options: { fill: { color: C.light }, align: 'center', fontFace: FONT } },
      { text: '未绑定', options: { align: 'center', fontFace: FONT } },
      { text: unbound.toString(), options: { align: 'right', fontFace: FONT } },
      { text: ((unbound/total)*100).toFixed(1) + '%', options: { align: 'right', fontFace: FONT } },
    ],
    // Car model rows
    [
      { text: '车型数量', options: { bold: true, fill: { color: C.light }, align: 'center', fontFace: FONT } },
      { text: carLabels.length.toString() + '种', options: { align: 'center', fontFace: FONT } },
      { text: total.toString(), options: { align: 'right', fontFace: FONT } },
      { text: '100%', options: { align: 'right', fontFace: FONT } },
    ],
  ];

  slide.addTable(tableRows, {
    x: 0.5, y: 3.15, w: 9.0, h: 2.2,
    colW: [1.6, 2.0, 2.5, 1.5],
    fontSize: 11,
    border: { type: 'solid', color: 'CCCCCC', pt: 0.5 },
    rowH: 0.32,
  });
}

// ============================================================
// SLIDE 4: TERMINAL MODEL - CHART + TABLE
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: SLIDE_W, h: 0.8, fill: { color: C.primary } });
  slide.addText('终端型号分布  Device Model Distribution', {
    x: 0.5, y: 0.1, w: 8, h: 0.6, fontSize: 22, fontFace: FONT, bold: true, color: C.white, charSpacing: 1.5,
  });

  // PIE CHART - Left side
  slide.addChart(pres.charts.pie, [
    { name: '设备数量', labels: modelLabels, values: modelValues }
  ], {
    x: 0.3, y: 1.0, w: 4.5, h: 3.5,
    showLegend: true, legendPos: 'r', showValue: true, showPercent: true,
    dataLabelColor: C.text, dataLabelFontSize: 12,
    colors: CHART_COLORS,
  });

  // DATA TABLE - Right side
  slide.addText('型号详情表', { x: 5.0, y: 1.0, w: 4.5, h: 0.35, fontSize: 13, bold: true, color: C.primary, fontFace: FONT });

  const modelTable = [
    [
      { text: '终端型号', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
      { text: '数量(台)', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
      { text: '占比', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
      { text: '已绑定', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
      { text: '绑定率', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
    ],
    ...modelLabels.map((lbl, i) => {
      const m = modelBind[lbl];
      return [
        { text: lbl, options: { align: 'center', fontFace: FONT } },
        { text: modelValues[i].toString(), options: { align: 'right', fontFace: FONT } },
        { text: ((modelValues[i]/total)*100).toFixed(1) + '%', options: { align: 'right', fontFace: FONT } },
        { text: m.bound.toString(), options: { align: 'right', fontFace: FONT } },
        { text: ((m.bound/m.total)*100).toFixed(1) + '%', options: { align: 'right', fontFace: FONT, bold: true, color: C.success } },
      ];
    })
  ];

  slide.addTable(modelTable, {
    x: 5.0, y: 1.4, w: 4.5, h: 1.3,
    colW: [1.2, 0.9, 0.9, 0.8, 0.8],
    fontSize: 11,
    border: { type: 'solid', color: 'CCCCCC', pt: 0.5 },
    rowH: 0.28,
  });

  // INSIGHT
  slide.addText([
    { text: '📊 洞察：', options: { bold: true, color: C.primary, fontFace: FONT } },
    { text: 'SKERT 型号占比 63.7%，为当前主力终端，绑定率 18.4% 显著高于 D23 的 3.5%。', options: { color: C.text, fontFace: FONT } },
  ], { x: 0.5, y: 4.65, w: 9, h: 0.5, fontSize: 11, valign: 'middle' });
}

// ============================================================
// SLIDE 5: VERSION - CHART + TABLE
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: SLIDE_W, h: 0.8, fill: { color: C.primary } });
  slide.addText('版本分布分析  Firmware Version Analysis', {
    x: 0.5, y: 0.1, w: 8, h: 0.6, fontSize: 22, fontFace: FONT, bold: true, color: C.white, charSpacing: 1.5,
  });

  const topN = 10;
  const topLabels = versionLabels.slice(0, topN);
  const topValues = versionValues.slice(0, topN);
  const othersVal = versionValues.slice(topN).reduce((a,b) => a+b, 0);

  // BAR CHART - Left
  slide.addChart(pres.charts.bar, [
    { name: '设备数量', labels: [...topLabels, '其他'], values: [...topValues, othersVal] }
  ], {
    x: 0.3, y: 1.0, w: 5.0, h: 3.2,
    showLegend: false, showValue: true,
    valueAxisLabel: '设备数量',
    catAxisLabelFontSize: 8,
    catAxisLabelColor: C.text,
    valueAxisLabelColor: C.text,
    showTitle: false,
    colors: [C.primary],
    barDir: 'col',
    valAxisMin: 0,
  });

  // DATA TABLE - Right
  slide.addText('版本分布详情', { x: 5.5, y: 1.0, w: 4.3, h: 0.35, fontSize: 13, bold: true, color: C.primary, fontFace: FONT });

  const verTable = [
    [
      { text: '版本号', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
      { text: '数量', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
      { text: '占比', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
    ],
    ...versionLabels.slice(0, 8).map((lbl, i) => [
      { text: lbl.length > 18 ? lbl.slice(0, 16) + '…' : lbl, options: { align: 'left', fontFace: FONT, fontSize: 10 } },
      { text: versionValues[i].toString(), options: { align: 'right', fontFace: FONT } },
      { text: ((versionValues[i]/total)*100).toFixed(1) + '%', options: { align: 'right', fontFace: FONT } },
    ]),
    [
      { text: '其他版本', options: { align: 'left', fontFace: FONT, italic: true, color: C.muted } },
      { text: othersVal.toString(), options: { align: 'right', fontFace: FONT } },
      { text: ((othersVal/total)*100).toFixed(1) + '%', options: { align: 'right', fontFace: FONT } },
    ],
    [
      { text: '无版本信息', options: { align: 'left', fontFace: FONT, bold: true, color: C.danger } },
      { text: versionCount['(空)'].toString(), options: { align: 'right', fontFace: FONT, bold: true, color: C.danger } },
      { text: ((versionCount['(空)']/total)*100).toFixed(1) + '%', options: { align: 'right', fontFace: FONT, bold: true, color: C.danger } },
    ],
  ];

  slide.addTable(verTable, {
    x: 5.5, y: 1.4, w: 4.3, h: 2.8,
    colW: [2.5, 0.9, 0.9],
    fontSize: 11,
    border: { type: 'solid', color: 'CCCCCC', pt: 0.5 },
    rowH: 0.3,
  });

  // INSIGHT
  slide.addText([
    { text: '⚠️ 注意：', options: { bold: true, color: C.danger, fontFace: FONT } },
    { text: '632台设备（23.2%）无版本信息，建议排查更新；主力版本 M9.3.0_B9.3.0 占 73.2%。', options: { color: C.text, fontFace: FONT } },
  ], { x: 0.5, y: 4.4, w: 9, h: 0.5, fontSize: 11, valign: 'middle' });
}

// ============================================================
// SLIDE 6: BINDING - DOUGHNUT + BAR + TABLE
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: SLIDE_W, h: 0.8, fill: { color: C.primary } });
  slide.addText('用户绑定分析  User Binding Status', {
    x: 0.5, y: 0.1, w: 8, h: 0.6, fontSize: 22, fontFace: FONT, bold: true, color: C.white, charSpacing: 1.5,
  });

  // DOUGHNUT - Top Left
  slide.addText('整体绑定状态', { x: 0.3, y: 1.0, w: 4, h: 0.35, fontSize: 12, bold: true, color: C.text, fontFace: FONT });

  slide.addChart(pres.charts.doughnut, [
    { name: '绑定状态', labels: ['已绑定', '未绑定'], values: [bound, unbound] }
  ], {
    x: 0.2, y: 1.35, w: 4.3, h: 2.8,
    showLegend: true, legendPos: 'b', showValue: true, showPercent: true, showCategoryName: true,
    dataLabelColor: C.text,
    colors: [C.success, C.muted],
    holeSize: 55,
  });

  // BAR CHART - Top Right
  slide.addText('各型号绑定情况', { x: 4.8, y: 1.0, w: 5, h: 0.35, fontSize: 12, bold: true, color: C.text, fontFace: FONT });

  const modelBindLbls = Object.keys(modelBind);
  slide.addChart(pres.charts.bar, [
    { name: '已绑定', labels: modelBindLbls, values: modelBindLbls.map(k => modelBind[k].bound) },
    { name: '未绑定', labels: modelBindLbls, values: modelBindLbls.map(k => modelBind[k].total - modelBind[k].bound) }
  ], {
    x: 4.7, y: 1.35, w: 5.0, h: 2.8,
    showLegend: true, legendPos: 'b', showValue: true,
    valueAxisLabel: '设备数', catAxisLabel: '型号',
    catAxisLabelColor: C.text, valueAxisLabelColor: C.text,
    showTitle: false,
    colors: [C.success, C.muted],
    barDir: 'col',
  });

  // SUMMARY TABLE - Bottom
  const bindTable = [
    [
      { text: '型号', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
      { text: '总数', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
      { text: '已绑定', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
      { text: '未绑定', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
      { text: '绑定率', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
    ],
    ...modelBindLbls.map(lbl => {
      const m = modelBind[lbl];
      return [
        { text: lbl, options: { align: 'center', fontFace: FONT } },
        { text: m.total.toString(), options: { align: 'right', fontFace: FONT } },
        { text: m.bound.toString(), options: { align: 'right', fontFace: FONT, color: C.success } },
        { text: (m.total - m.bound).toString(), options: { align: 'right', fontFace: FONT, color: C.muted } },
        { text: ((m.bound/m.total)*100).toFixed(1) + '%', options: { align: 'center', fontFace: FONT, bold: true, color: parseFloat(((m.bound/m.total)*100).toFixed(1)) > 10 ? C.success : C.warning } },
      ];
    }),
  ];

  slide.addTable(bindTable, {
    x: 1.5, y: 4.3, w: 7.0, h: 1.1,
    colW: [1.5, 1.3, 1.3, 1.3, 1.6],
    fontSize: 11,
    border: { type: 'solid', color: 'CCCCCC', pt: 0.5 },
    rowH: 0.32,
  });
}

// ============================================================
// SLIDE 7: CAR MODEL - CHART + TABLE
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: SLIDE_W, h: 0.8, fill: { color: C.primary } });
  slide.addText('车型分布分析  Vehicle Model Distribution', {
    x: 0.5, y: 0.1, w: 8, h: 0.6, fontSize: 22, fontFace: FONT, bold: true, color: C.white, charSpacing: 1.5,
  });

  // BAR CHART - Top
  slide.addChart(pres.charts.bar, [
    { name: '设备总数', labels: carLabels, values: carValues },
    { name: '已绑定', labels: carLabels, values: carBoundValues }
  ], {
    x: 0.3, y: 1.0, w: 9.4, h: 2.8,
    showLegend: true, legendPos: 'b', showValue: true,
    valueAxisLabel: '设备数量',
    catAxisLabelFontSize: 8,
    catAxisLabelColor: C.text, valueAxisLabelColor: C.text,
    showTitle: false,
    colors: [C.primary, C.success],
    barDir: 'col',
  });

  // DATA TABLE - Bottom
  const carTable = [
    [
      { text: '车型', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
      { text: '设备总数', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
      { text: '已绑定', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
      { text: '未绑定', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
      { text: '绑定率', options: { bold: true, fill: { color: C.primary }, color: C.white, align: 'center', fontFace: FONT } },
    ],
    ...carLabels.map(lbl => {
      const c = carBind[lbl];
      const rate = ((c.bound/c.total)*100).toFixed(1);
      return [
        { text: lbl.length > 15 ? lbl.slice(0, 13) + '…' : lbl, options: { align: 'left', fontFace: FONT } },
        { text: c.total.toString(), options: { align: 'right', fontFace: FONT } },
        { text: c.bound.toString(), options: { align: 'right', fontFace: FONT, color: C.success } },
        { text: (c.total - c.bound).toString(), options: { align: 'right', fontFace: FONT, color: C.muted } },
        { text: rate + '%', options: { align: 'center', fontFace: FONT, bold: true, color: parseFloat(rate) >= 30 ? C.success : (parseFloat(rate) >= 10 ? C.warning : C.danger) } },
      ];
    }),
  ];

  slide.addTable(carTable, {
    x: 0.5, y: 4.0, w: 9.0, h: 1.5,
    colW: [3.0, 1.5, 1.5, 1.5, 1.5],
    fontSize: 11,
    border: { type: 'solid', color: 'CCCCCC', pt: 0.5 },
    rowH: 0.35,
  });
}

// ============================================================
// SLIDE 8: CLOSING
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.accent };
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: SLIDE_W, h: SLIDE_H, fill: { color: C.primary, transparency: 40 } });
  slide.addText('谢谢观看', {
    x: 0, y: 1.8, w: SLIDE_W, h: 1.2,
    fontSize: 48, fontFace: FONT, bold: true, color: C.white, align: 'center', charSpacing: 2.5,
  });
  slide.addText('Thank You', {
    x: 0, y: 3.0, w: SLIDE_W, h: 0.7,
    fontSize: 24, fontFace: FONT, italic: true, color: C.light, align: 'center', charSpacing: 1.5,
  });
  slide.addShape(pres.shapes.RECTANGLE, { x: SLIDE_W/2 - 1.5, y: 3.9, w: 3, h: 0.04, fill: { color: C.secondary } });
}

// ============================================================
// SAVE
// ============================================================
const outputPath = path.join('C:', 'Users', 'lenovo', 'Documents', 'Trae-CN', 'temp_20261026_03', '设备数据分析报告_v2.pptx');

pres.writeFile({ fileName: outputPath })
  .then(() => {
    console.log('PPT generated:', outputPath);
  })
  .catch(err => {
    console.error('Error:', err);
  });
