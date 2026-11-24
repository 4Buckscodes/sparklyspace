// node capture-dom.js <page.html> <width> <height> <outDir>   (page must expose window.renderFrame(t), window.DURATION)
const { chromium } = require('playwright'); const http = require('http'), fs = require('fs'), path = require('path');
const [page_, W, H, out] = [process.argv[2], +process.argv[3], +process.argv[4], process.argv[5]];
const root = __dirname; const mime = { '.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp' };
const server = http.createServer((q, r) => { const f = path.join(root, decodeURIComponent(q.url.split('?')[0])); if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': mime[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); });
(async () => {
  await new Promise(r => server.listen(0, r)); const port = server.address().port;
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: H } });
  p.on('pageerror', e => console.log('PAGEERR', e.message)); p.on('console', m => m.type()==='error' && console.log('ERR', m.text()));
  await p.goto(`http://localhost:${port}/${page_}?capture`); await p.waitForFunction('window.ready', null, { timeout: 60000 });
  fs.mkdirSync(out, { recursive: true });
  const stills = process.env.STILLS; const fps = 30;
  if (stills) { for (const t of stills.split(',')) { await p.evaluate(t => window.renderFrame(t), +t); await p.screenshot({ path: `${out}/still_${t}.png` }); } }
  else { const n = Math.round((await p.evaluate('window.DURATION')) * fps); for (let i = 0; i < n; i++) { await p.evaluate(t => window.renderFrame(t), i / fps); await p.screenshot({ path: `${out}/f_${String(i).padStart(4,'0')}.png` }); if (i % 90 === 0) console.log(i, '/', n); } }
  await b.close(); server.close();
})();
