// Genera le immagini FRONTE/RETRO per il caricamento su VistaPrint.
// Full-bleed 152x214mm (A5 148x210 + 2mm/lato), 300 DPI, RGB.
// Output: JPG qualita' 100 senza sottocampionamento (testo/linee nitidi) + PNG lossless.
const path = require('path');
const puppeteer = require('C:/workspace/social-image-generator/node_modules/puppeteer-core');
const sharp = require('C:/workspace/social-image-generator/node_modules/sharp');

const DIR = __dirname;
const HTML = 'file:///' + path.join(DIR, 'volantino.html').split(path.sep).join('/');
const DPI = 300;
const DSF = DPI / 96; // 3.125 -> 300 DPI a partire dai 96 CSS dpi
const TARGET = { w: Math.round(152 / 25.4 * DPI), h: Math.round(214 / 25.4 * DPI) }; // ~1795 x 2528

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new', args: ['--no-sandbox', '--force-color-profile=srgb']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 640, height: 920, deviceScaleFactor: DSF });
  await page.goto(HTML, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(async () => { await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 700));

  for (const [id, label] of [['fronte', 'FRONTE'], ['retro', 'RETRO']]) {
    const el = await page.$('#' + id);
    const buf = await el.screenshot({ type: 'png' });
    const base = sharp(buf).resize(TARGET.w, TARGET.h, { fit: 'fill' }).withMetadata({ density: DPI });
    await base.clone().jpeg({ quality: 100, chromaSubsampling: '4:4:4' }).toFile(path.join(DIR, `EMC-Volantino-${label}-vistaprint.jpg`));
    await base.clone().png({ compressionLevel: 9 }).toFile(path.join(DIR, `EMC-Volantino-${label}-vistaprint.png`));
    const meta = await sharp(path.join(DIR, `EMC-Volantino-${label}-vistaprint.jpg`)).metadata();
    console.log(`${label}: ${meta.width}x${meta.height}px @${meta.density}dpi`);
  }

  await browser.close();
  console.log('OK: immagini VistaPrint generate (JPG + PNG)');
})().catch(e => { console.error(e); process.exit(1); });
