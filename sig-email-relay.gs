/**
 * EMC Digital Solutions — Social Image Generator: Email Relay via Google Apps Script
 *
 * Bypassa il blocco SMTP outbound di Hetzner Cloud usando MailApp di Google
 * (HTTPS porta 443, sempre raggiungibile). Supporta destinatario custom +
 * allegati base64 (necessario per i PDF report mensili).
 *
 * ====== DEPLOY ======
 * 1. Vai su https://script.google.com → Nuovo progetto
 * 2. Incolla TUTTO questo codice
 * 3. Esegui una volta `testSelf()` per autorizzare i permessi MailApp
 *    (Google ti chiederà accesso al tuo account Gmail)
 * 4. Deploy → Nuova distribuzione → Web App
 *    - Esegui come: "Me" (il tuo account Gmail)
 *    - Chi ha accesso: "Chiunque"
 * 5. Copia l'URL della web app
 * 6. Incollalo nel campo "Google Apps Script Email URL" in Impostazioni del SIG
 *
 * ====== PAYLOAD ATTESO (POST JSON) ======
 *   {
 *     "secret": "STRINGA_SEGRETA",          // anti-abuso, deve match SHARED_SECRET
 *     "to": "destinatario@example.it",
 *     "cc": "emcdigitalsolution@gmail.com",  // opzionale (EMC sempre in copia)
 *     "subject": "Oggetto email",
 *     "html": "<html>...</html>",
 *     "attachment": {                        // opzionale
 *       "filename": "report.pdf",
 *       "contentType": "application/pdf",
 *       "data": "BASE64_STRING"
 *     }
 *   }
 *
 * ====== QUOTA GMAIL ======
 *   Account standard: 500 email/giorno
 *   Google Workspace: 2000 email/giorno
 */

// ====== CONFIGURAZIONE ======
// CAMBIA questo valore con una stringa lunga e segreta (32+ caratteri).
// Deve essere identica al campo `gas_email_secret` in Impostazioni del SIG.
var SHARED_SECRET = '0*1!9=dc=a09-3*9=5C4-75*e!6-98=7*7-aB6f=1=56!fa!a4*702';

// Mittente "from" mostrato all'utente (deve essere il tuo account Gmail
// o un alias verificato in MailApp).
var FROM_NAME = 'EMC Digital Solutions';


// ====== ENDPOINT ======

function doPost(e) {
  var response = function(payload, code) {
    return ContentService.createTextOutput(JSON.stringify(payload))
      .setMimeType(ContentService.MimeType.JSON);
  };

  try {
    var body;
    try { body = JSON.parse(e.postData.contents); }
    catch (err) { return response({ ok: false, error: 'invalid_json' }); }

    if (body.secret !== SHARED_SECRET) {
      return response({ ok: false, error: 'unauthorized' });
    }

    if (!body.to || !body.subject || (!body.html && !body.text)) {
      return response({ ok: false, error: 'missing fields: to, subject, html|text' });
    }

    var mailOpts = {
      to: String(body.to).trim(),
      subject: String(body.subject),
      htmlBody: body.html || undefined,
      body: body.text || stripHtml(body.html || ''),
      name: FROM_NAME
    };

    if (body.replyTo) mailOpts.replyTo = String(body.replyTo);
    // CC: EMC owner sempre in copia sulle mail ai clienti (regola EMC).
    if (body.cc) mailOpts.cc = String(body.cc).trim();

    if (body.attachment && body.attachment.data) {
      // base64 → byte[] per MailApp
      var att = body.attachment;
      var bytes = Utilities.base64Decode(att.data);
      var blob = Utilities.newBlob(bytes, att.contentType || 'application/octet-stream', att.filename || 'attachment');
      mailOpts.attachments = [blob];
    }

    MailApp.sendEmail(mailOpts);
    return response({ ok: true, sent_to: mailOpts.to });

  } catch (err) {
    return response({ ok: false, error: err.toString() });
  }
}

function doGet(e) {
  // Ping per verificare che il GAS sia raggiungibile
  return ContentService.createTextOutput(JSON.stringify({
    ok: true,
    service: 'sig-email-relay',
    quotaRemaining: MailApp.getRemainingDailyQuota()
  })).setMimeType(ContentService.MimeType.JSON);
}


// ====== UTILITY ======

function stripHtml(html) {
  return String(html).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

// Test: invia un'email a te stesso per autorizzare permessi MailApp.
// Esegui questa funzione la prima volta per dare il consenso a MailApp.
function testSelf() {
  var myEmail = Session.getActiveUser().getEmail();
  MailApp.sendEmail({
    to: myEmail,
    subject: '[SIG email-relay] Test funzionamento',
    htmlBody: '<h2>Test OK</h2><p>Il relay GAS funziona. Quota restante: ' + MailApp.getRemainingDailyQuota() + ' email.</p>',
    name: FROM_NAME
  });
  Logger.log('Email di test inviata a ' + myEmail);
}
