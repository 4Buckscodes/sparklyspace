// Usage: node capture.js still <t1,t2,...>   |  node capture.js video
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.png': 'image/png', '.json': 'application/json' };
const server = http.createServer((q, r) => {
  const f = path.join(root, decodeURIComponent(q.url.split('?')[0]));
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'Content-Type': mime[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r);
});
(async () => {
  await new Promise(r => server.listen(0, r));
  const port = server.address().port;
  const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', m => m.type() === 'error' && console.log('ERR', m.text()));
  page.on('pageerror', e => console.log('PAGEERR', e.message));
  await page.goto(`http://localhost:${port}/marketing/index.html?capture`);
  await page.waitForFunction('window.ready', null, { timeout: 60000 });
  const mode = process.argv[2], out = process.env.OUT || '/tmp/frames'; fs.mkdirSync(out, { recursive: true });
  const shoot = async (t, file) => { await page.evaluate(t => window.renderFrame(t), t); await page.screenshot({ path: file }); };
  if (mode === 'still') for (const t of process.argv[3].split(',')) await shoot(+t, `${out}/still_${t}.png`);
  else { const fps = 30, n = Math.round(23 * fps); for (let i = +(process.env.START||0); i < n; i++) { await shoot(i / fps, `${out}/f_${String(i).padStart(4, '0')}.png`); if (i % 60 === 0) console.log(i, '/', n); } }
  await browser.close(); server.close();
})();
