// Render del volantino A5 EMC: PDF di stampa (154x216mm con bleed) + PNG anteprima fronte/retro.
const path = require('path');
const puppeteer = require('C:/workspace/social-image-generator/node_modules/puppeteer-core');

const DIR = __dirname;
const HTML = 'file:///' + path.join(DIR, 'volantino.html').split(path.sep).join('/');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--force-color-profile=srgb']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 620, height: 880, deviceScaleFactor: 2.6 });
  await page.goto(HTML, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(async () => { await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 700));

  // PDF di stampa: dimensione pagina da CSS (@page 154x216mm), 2 pagine
  await page.pdf({
    path: path.join(DIR, '_volantino_rgb.pdf'),
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  // PNG anteprima per lato
  const f = await page.$('#fronte');
  const r = await page.$('#retro');
  await f.screenshot({ path: path.join(DIR, 'anteprima-fronte.png') });
  await r.screenshot({ path: path.join(DIR, 'anteprima-retro.png') });

  await browser.close();
  console.log('OK: _volantino_rgb.pdf + anteprima-fronte/retro.png');
})().catch(e => { console.error(e); process.exit(1); });
