const { Parser } = require('json2csv');
const fs = require('fs')
const manifest = fs.readFileSync('./lhci_reports/manifest.json')

const fields = ['url', 'summary.performance', 'summary.seo', 'summary.accessibility', 'summary.best-practices'];

const json2csvParser = new Parser({ fields });
const csv = json2csvParser.parse(JSON.parse(manifest));

fs.writeFileSync('./lhci_reports/summary.csv', csv)
console.log(csv);