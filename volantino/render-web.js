// Genera la versione WEB del volantino (A5 trim 148x210mm, RGB, PDF nativo Chrome = valido per Acrobat).
// Niente bleed/crocini: stesso layout del trim, padding ridotti di 2mm per togliere l'abbondanza.
const path = require('path');
const puppeteer = require('C:/workspace/social-image-generator/node_modules/puppeteer-core');
const DIR = __dirname;
const HTML = 'file:///' + path.join(DIR, 'volantino.html').split(path.sep).join('/');

const OVERRIDE = `
@page{size:148mm 210mm;margin:0}
.page{width:148mm !important;height:210mm !important}
.wrap{padding:9mm 11mm !important}
#fronte .wrap{padding-bottom:11mm !important}
#retro .wrap{padding-bottom:10mm !important}
`;

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new', args: ['--no-sandbox', '--force-color-profile=srgb']
  });
  const page = await browser.newPage();
  await page.goto(HTML, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.addStyleTag({ content: OVERRIDE });
  await page.evaluate(async () => { await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 600));
  await page.pdf({
    path: path.join(DIR, 'Volantino-EMC-Digital-Solutions.pdf'),
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  await browser.close();
  console.log('OK: Volantino-EMC-Digital-Solutions.pdf (148x210, nativo Chrome)');
})().catch(e => { console.error(e); process.exit(1); });
