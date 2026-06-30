// Misura overflow del contenuto rispetto alla pagina, per fronte e retro.
const path = require('path');
const puppeteer = require('C:/workspace/social-image-generator/node_modules/puppeteer-core');
const HTML = 'file:///' + path.join(__dirname, 'volantino.html').split(path.sep).join('/');
(async () => {
  const b = await puppeteer.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: 'new', args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.goto(HTML, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { await document.fonts.ready; });
  const r = await p.evaluate(() => {
    const out = {};
    for (const id of ['fronte', 'retro']) {
      const w = document.querySelector('#' + id + ' .wrap');
      out[id] = { scroll: Math.round(w.scrollHeight * 100) / 100, client: Math.round(w.clientHeight * 100) / 100, overflowPx: Math.round((w.scrollHeight - w.clientHeight) * 100) / 100 };
    }
    return out;
  });
  console.log(JSON.stringify(r, null, 2));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
