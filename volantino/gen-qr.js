const QR = require('C:/workspace/sortino/node_modules/qrcode');
const fs = require('fs');
const opts = { type:'svg', errorCorrectionLevel:'M', margin:1, color:{ dark:'#15306b', light:'#ffffff' } };
const jobs = [
  ['qr-schizzo.svg', 'https://www.emcdigitalsolutions.it/?utm_source=volantino&utm_medium=qr&utm_campaign=schizzo-gratis#contatti'],
  ['qr-sito.svg',    'https://www.emcdigitalsolutions.it/?utm_source=volantino&utm_medium=qr&utm_campaign=brochure#portfolio'],
];
(async () => {
  for (const [file, url] of jobs) {
    const svg = await QR.toString(url, opts);
    fs.writeFileSync(file, svg);
    console.log('OK', file, '->', url);
  }
})().catch(e => { console.error(e); process.exit(1); });
