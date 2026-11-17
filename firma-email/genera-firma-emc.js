// Firma email EMC Digital Solutions · navy e oro
// Uso: node genera-firma-emc.js            → scrive firma-emc.html
//      node genera-firma-emc.js --immagini → anche logo-emc-firma.png e le anteprime
// (le immagini richiedono puppeteer-core + Edge)
const fs = require('fs');
const path = require('path');
const qui = __dirname;

const SITO = 'https://www.emcdigitalsolutions.it';
const LOGO_URL = `${SITO}/firma-email/logo-emc-firma.png`;

const P = {
  navy: '#0c1120', navy2: '#16213b', navy3: '#080d1a', bordo: '#1e2a45',
  oro: '#f5c542', oroChiaro: '#f9e3a1', oroScuro: '#c9971f', testo: '#e8ecf4', grigio: '#8e98ad',
};
const SANS = "'Inter','Segoe UI','Helvetica Neue',Arial,sans-serif";
const SERIF = "'Fraunces',Georgia,'Times New Roman',serif";

// Logo EMC: forma canonica (vedi emc-logo-standard), palette oro su navy
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" width="396" height="132">
  <defs>
    <linearGradient id="emcFirmaBar" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${P.oroChiaro}"/><stop offset="100%" stop-color="${P.oroScuro}"/>
    </linearGradient>
    <linearGradient id="emcFirmaTxt" x1="0" y1="0" x2="120" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff"/><stop offset="45%" stop-color="${P.oroChiaro}"/><stop offset="100%" stop-color="${P.oro}"/>
    </linearGradient>
  </defs>
  <path d="M4,4 H24 L32,8 L24,12 H4 A4,4 0 0,1 4,4Z" fill="url(#emcFirmaBar)"/>
  <path d="M4,15 H20 L28,19 L20,23 H4 A4,4 0 0,1 4,15Z" fill="url(#emcFirmaBar)" opacity="0.85"/>
  <path d="M4,26 H24 L32,30 L24,34 H4 A4,4 0 0,1 4,26Z" fill="url(#emcFirmaBar)"/>
  <text x="46" y="27" font-family="'Inter','Segoe UI','Helvetica Neue',Arial,sans-serif"
        font-size="20" font-weight="700" fill="url(#emcFirmaTxt)" letter-spacing="3">EMC</text>
</svg>`;

const riga = (etichetta, href, testo, colore = P.testo) => `
                <tr>
                  <td width="60" style="width:60px;padding:2px 10px 2px 0;font-family:${SANS};font-size:9px;line-height:20px;letter-spacing:1.8px;text-transform:uppercase;color:${P.oro};vertical-align:middle;white-space:nowrap;">${etichetta}</td>
                  <td style="padding:2px 0;font-family:${SANS};font-size:14px;line-height:20px;vertical-align:middle;white-space:nowrap;"><a href="${href}" style="color:${colore};text-decoration:none;">${testo}</a></td>
                </tr>`;

const firma = `<!-- Firma EMC Digital Solutions -->
<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:separate;width:100%;max-width:560px;">
  <tr>
    <td bgcolor="${P.navy}" style="background-color:${P.navy};background-image:linear-gradient(135deg,${P.navy2} 0%,${P.navy} 52%,${P.navy3} 100%);border:1px solid ${P.bordo};border-radius:18px;overflow:hidden;padding:0;">
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%" style="border-collapse:collapse;">
        <tr>
          <td height="3" bgcolor="${P.oro}" style="height:3px;line-height:3px;font-size:0;background-color:${P.oro};background-image:linear-gradient(90deg,${P.oroScuro},${P.oroChiaro} 45%,${P.oro} 70%,${P.oroScuro});border-radius:18px 18px 0 0;">&nbsp;</td>
        </tr>
        <tr>
          <td style="padding:22px 22px 20px 22px;">
            <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;">
              <tr>
                <td width="132" style="width:132px;vertical-align:middle;padding:0 20px 0 0;text-align:left;">
                  <a href="${SITO}" style="text-decoration:none;"><img src="${LOGO_URL}" width="132" height="44" alt="EMC" style="display:block;width:132px;height:44px;border:0;outline:none;text-decoration:none;"></a>
                  <div style="padding-top:8px;font-family:${SANS};font-size:9px;line-height:12px;letter-spacing:3px;text-transform:uppercase;color:${P.oro};white-space:nowrap;">Digital Solutions</div>
                </td>
                <td style="vertical-align:middle;padding:2px 0 2px 20px;border-left:1px solid #5a4a22;">
                  <div style="font-family:${SANS};font-size:24px;line-height:30px;font-weight:700;letter-spacing:-0.4px;color:#ffffff;white-space:nowrap;">Enrico Maria Caruso</div>
                  <div style="padding-top:2px;font-family:${SERIF};font-style:italic;font-size:14px;line-height:20px;color:${P.oroChiaro};">Founder &amp; Software Developer</div>
                  <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;margin:11px 0 9px 0;">
                    <tr><td width="34" height="2" bgcolor="${P.oro}" style="width:34px;height:2px;line-height:2px;font-size:0;background-color:${P.oro};background-image:linear-gradient(90deg,${P.oroChiaro},${P.oroScuro});border-radius:2px;">&nbsp;</td></tr>
                  </table>
                  <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;">${riga('Tel', 'tel:+393294348075', '+39 329 434 8075')}${riga('Email', 'mailto:emcdigitalsolution@gmail.com', 'emcdigitalsolution@gmail.com')}${riga('Web', SITO, 'www.emcdigitalsolutions.it', P.oroChiaro)}
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="${P.navy3}" style="background-color:${P.navy3};border-top:1px solid ${P.bordo};padding:12px 18px 12px 22px;border-radius:0 0 18px 18px;">
            <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%" style="border-collapse:collapse;">
              <tr>
                <td style="font-family:${SANS};font-size:11.5px;line-height:17px;color:#c9cfdc;vertical-align:middle;padding-right:12px;"><span style="white-space:nowrap;">Siti web</span> <span style="color:${P.oro};">·</span> <span style="white-space:nowrap;">Gestionali</span> <span style="color:${P.oro};">·</span> <span style="white-space:nowrap;">App</span> <span style="color:${P.oro};">·</span> <span style="white-space:nowrap;">IoT</span> <span style="color:${P.oro};">·</span> <span style="white-space:nowrap;">Social</span></td>
                <td align="right" style="vertical-align:middle;white-space:nowrap;">
                  <a href="https://calendly.com/emcdigitalsolution/30min" style="display:inline-block;background-color:${P.oro};background-image:linear-gradient(135deg,${P.oroChiaro} 0%,${P.oro} 55%,${P.oroScuro} 100%);color:${P.navy};font-family:${SANS};font-size:12px;line-height:16px;font-weight:700;text-decoration:none;padding:8px 16px;border-radius:999px;mso-padding-alt:0;">Prenota una call&nbsp;&rarr;</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:10px 4px 0 4px;font-family:${SANS};font-size:10.5px;line-height:15px;color:${P.grigio};">Le informazioni contenute in questo messaggio e negli eventuali allegati sono riservate e destinate solo al destinatario. Se lo hai ricevuto per errore, avvisa il mittente e cancellalo. Grazie. &nbsp;·&nbsp; EMC Digital Solutions, Sicilia.</td>
  </tr>
</table>
<!-- Fine firma -->`;

const pagina = (sfondo) => `<!DOCTYPE html>
<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Firma EMC · Enrico</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@1,500&family=Inter:wght@400;700&display=swap" rel="stylesheet"></head>
<body style="margin:0;padding:24px;background:${sfondo};">
${firma}
</body></html>
`;

fs.writeFileSync(path.join(qui, 'firma-emc.html'), pagina('#ffffff'));
console.log('firma-emc.html scritta');

if (process.argv.includes('--immagini')) (async () => {
  const puppeteer = require('C:/workspace/rtindustry-core/node_modules/puppeteer-core');
  const b = await puppeteer.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: 'new' });
  const t = await b.newPage();
  // logo trasparente 396x132 (mostrato a 132x44: nitido sugli schermi ad alta densità)
  await t.setViewport({ width: 396, height: 132, deviceScaleFactor: 1 });
  await t.setContent(`<html><body style="margin:0;background:transparent;">${logoSvg}</body></html>`, { waitUntil: 'load' });
  await t.screenshot({ path: path.join(qui, 'logo-emc-firma.png'), omitBackground: true, clip: { x: 0, y: 0, width: 396, height: 132 } });
  // anteprime: logo locale al posto di quello online
  const locale = 'data:image/png;base64,' + fs.readFileSync(path.join(qui, 'logo-emc-firma.png')).toString('base64');
  for (const [file, w, dpr] of [['firma-emc-anteprima.png', 640, 2], ['firma-emc-telefono.png', 390, 2]]) {
    await t.setViewport({ width: w, height: 400, deviceScaleFactor: dpr });
    await t.setContent(pagina('#ffffff').replace(LOGO_URL, locale), { waitUntil: 'domcontentloaded' }); await new Promise(r => setTimeout(r, 1500));
    await t.screenshot({ path: path.join(qui, file), fullPage: true });
  }
  await b.close();
  console.log('immagini scritte');
})();
