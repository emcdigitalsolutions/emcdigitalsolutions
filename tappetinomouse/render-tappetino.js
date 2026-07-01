// Render tappetino mouse EMC: anteprima PNG + immagini VistaPrint 300 DPI (JPG+PNG) + PDF CMYK.
// Documento full-bleed 242x202mm.
const path = require('path');
const puppeteer = require('C:/workspace/social-image-generator/node_modules/puppeteer-core');
const sharp = require('C:/workspace/social-image-generator/node_modules/sharp');

const DIR = __dirname;
const HTML = 'file:///' + path.join(DIR, 'tappetino.html').split(path.sep).join('/');
const MODE = process.argv[2] || 'preview'; // preview | full
const DPI = 300;
const DSF = DPI / 96;
const TARGET = { w: Math.round(242 / 25.4 * DPI), h: Math.round(202 / 25.4 * DPI) }; // ~2858 x 2386

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new', args: ['--no-sandbox', '--force-color-profile=srgb']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 860, deviceScaleFactor: MODE === 'full' ? DSF : 1.4 });
  await page.goto(HTML, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(async () => { await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 700));

  const el = await page.$('.mat');

  if (MODE === 'preview') {
    await el.screenshot({ path: path.join(DIR, 'anteprima-tappetino.png') });
    console.log('OK preview: anteprima-tappetino.png');
  } else {
    const buf = await el.screenshot({ type: 'png' });
    const base = sharp(buf).resize(TARGET.w, TARGET.h, { fit: 'fill' }).withMetadata({ density: DPI });
    await base.clone().jpeg({ quality: 100, chromaSubsampling: '4:4:4' }).toFile(path.join(DIR, 'EMC-Tappetino-vistaprint.jpg'));
    await base.clone().png({ compressionLevel: 9 }).toFile(path.join(DIR, 'EMC-Tappetino-vistaprint.png'));
    const m = await sharp(path.join(DIR, 'EMC-Tappetino-vistaprint.jpg')).metadata();
    console.log(`OK full: ${m.width}x${m.height}px @${m.density}dpi (JPG+PNG)`);

    // PDF di stampa (dimensione da @page CSS = 242x202mm)
    await page.pdf({ path: path.join(DIR, '_tappetino_rgb.pdf'), printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    console.log('OK: _tappetino_rgb.pdf');
  }

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
