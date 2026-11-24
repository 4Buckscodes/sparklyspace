// node render.js [flyer-1-corporate ...]  → PNG (2x) + PDF (A4) next to each HTML file
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
(async () => {
  const names = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(__dirname).filter(f => /^flyer-.*\.html$/.test(f)).map(f => f.replace('.html', ''));
  const b = await chromium.launch(); 
  for (const n of names) {
    const p = await b.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 });
    await p.goto('file://' + path.join(__dirname, n + '.html')); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
    await p.locator('.page').screenshot({ path: path.join(__dirname, n + '.png') });
    await p.pdf({ path: path.join(__dirname, n + '.pdf'), width: '210mm', height: '297mm', printBackground: true, pageRanges: '1' });
    console.log('rendered', n); await p.close();
  }
  await b.close();
})();
