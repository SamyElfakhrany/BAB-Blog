// @ts-nocheck -- @oai/artifact-tool does not publish TypeScript declarations.
import fs from 'node:fs/promises';
import path from 'node:path';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const projectRoot = path.resolve(new URL('..', import.meta.url).pathname.replace(/^\/(?:([A-Za-z]):)/, '$1:'));
const catalogPath = path.join(projectRoot, 'src', 'data', 'template-catalog.json');
const outputDir = path.join(projectRoot, 'outputs', '01a0df83-b4b1-7dd1-ad9b-5ee35e1b1ed4', 'templates');
const previewDir = path.join(outputDir, 'previews');
const publicDir = path.join(projectRoot, 'public', 'downloads', 'templates');
const catalog = JSON.parse(await fs.readFile(catalogPath, 'utf8'));

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });
await fs.mkdir(publicDir, { recursive: true });

const categoryColors = { business: '#F7C948', technical: '#77A6D3', ai: '#7DD3A8' };
const navy = '#102A43';
const line = '#D9E2EC';
const paper = '#F7F9FB';
const input = '#FFF8E1';

function colName(index) {
  let value = index + 1;
  let output = '';
  while (value > 0) {
    const remainder = (value - 1) % 26;
    output = String.fromCharCode(65 + remainder) + output;
    value = Math.floor((value - 1) / 26);
  }
  return output;
}

function writeSection(sheet, startRow, copy, kind, language) {
  const headers = copy.headers;
  const columnCount = headers.length;
  const lastColumn = colName(columnCount - 1);
  const bodyRows = kind === 'fields' ? copy.items.map((item) => [item, '']) : Array.from({ length: 10 }, () => Array(columnCount).fill(''));
  const endRow = startRow + 2 + bodyRows.length;

  sheet.getRange(`A${startRow}`).values = [[copy.title]];
  sheet.getRange(`A${startRow + 1}`).values = [[copy.description]];
  sheet.getRange(`A${startRow + 2}:${lastColumn}${startRow + 2}`).values = [headers];
  sheet.getRange(`A${startRow + 3}:${lastColumn}${endRow}`).values = bodyRows;

  sheet.getRange(`A${startRow}`).format.font = { name: 'Arial', size: 15, bold: true, color: navy };
  sheet.getRange(`A${startRow + 1}:${lastColumn}${startRow + 1}`).format.font = { name: 'Arial', size: 10, italic: true, color: '#486581' };
  sheet.getRange(`A${startRow + 2}:${lastColumn}${startRow + 2}`).format = {
    fill: navy,
    font: { name: 'Arial', size: 10, bold: true, color: '#FFFFFF' },
    horizontalAlignment: 'center',
    verticalAlignment: 'center',
    wrapText: true,
    borders: { preset: 'all', style: 'thin', color: '#FFFFFF' },
  };
  sheet.getRange(`A${startRow + 3}:${lastColumn}${endRow}`).format = {
    fill: input,
    font: { name: 'Arial', size: 10, color: navy },
    verticalAlignment: 'top',
    wrapText: true,
    borders: { preset: 'all', style: 'thin', color: line },
  };

  if (kind === 'fields') {
    sheet.getRange(`A${startRow + 3}:A${endRow}`).format = {
      fill: paper,
      font: { name: 'Arial', size: 10, bold: true, color: navy },
      verticalAlignment: 'top',
      wrapText: true,
      borders: { preset: 'all', style: 'thin', color: line },
    };
  }
  if (language === 'ar') {
    sheet.getRange(`A${startRow}:${lastColumn}${endRow}`).format.horizontalAlignment = 'right';
    sheet.getRange(`A${startRow + 2}:${lastColumn}${startRow + 2}`).format.horizontalAlignment = 'center';
  }
  return { endRow, lastColumn, columnCount };
}

const manifest = [];
for (const template of catalog) {
  const workbook = Workbook.create();
  const sheet = workbook.worksheets.add('Template');
  sheet.showGridLines = false;
  sheet.tabColor = categoryColors[template.category];

  const english = writeSection(sheet, 2, template.en, template.kind, 'en');
  const arabicStart = english.endRow + 4;
  const arabic = writeSection(sheet, arabicStart, template.ar, template.kind, 'ar');
  const maxColumns = Math.max(english.columnCount, arabic.columnCount);
  const maxColumn = colName(maxColumns - 1);
  const used = sheet.getRange(`A1:${maxColumn}${arabic.endRow}`);
  used.format.verticalAlignment = 'center';

  if (template.kind === 'fields') {
    sheet.getRange(`A1:A${arabic.endRow}`).format.columnWidth = 42;
    sheet.getRange(`B1:B${arabic.endRow}`).format.columnWidth = 68;
  } else {
    for (let col = 0; col < maxColumns; col += 1) {
      sheet.getRange(`${colName(col)}1:${colName(col)}${arabic.endRow}`).format.columnWidth = col === 0 ? 27 : 21;
    }
  }
  sheet.getRange(`A1:${maxColumn}${arabic.endRow}`).format.rowHeight = 27;
  sheet.getRange(`A${english.endRow + 1}:${maxColumn}${arabicStart - 1}`).format.fill = '#FFFFFF';
  sheet.freezePanes.freezeRows(4);

  workbook.recalculate();
  const inspectRange = `Template!A1:${maxColumn}${Math.min(arabic.endRow, 28)}`;
  const inspection = await workbook.inspect({ kind: 'table', range: inspectRange, include: 'values,formulas', tableMaxRows: 28, tableMaxCols: 12 });
  const errors = await workbook.inspect({
    kind: 'match',
    searchTerm: '#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',
    options: { useRegex: true, maxResults: 50 },
    summary: `formula error scan: ${template.id}`,
  });

  const preview = await workbook.render({ sheetName: 'Template', autoCrop: 'all', scale: 0.8, format: 'png' });
  const fileName = path.basename(template.download);
  const previewPath = path.join(previewDir, fileName.replace(/\.xlsx$/i, '.png'));
  await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));

  const output = await SpreadsheetFile.exportXlsx(workbook);
  const outputPath = path.join(outputDir, fileName);
  const publicPath = path.join(publicDir, fileName);
  await output.save(outputPath);
  await output.save(publicPath);
  await fs.rm(`${outputPath}.inspect.ndjson`, { force: true });
  await fs.rm(`${publicPath}.inspect.ndjson`, { force: true });
  manifest.push({ id: template.id, outputPath, publicPath, previewPath, inspection: inspection.ndjson, errors: errors.ndjson });
}

await fs.writeFile(path.join(outputDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`Created ${manifest.length} bilingual BAB template workbooks.`);
