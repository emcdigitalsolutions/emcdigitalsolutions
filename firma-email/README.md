# Firma Email — EMC Digital Solutions

Firma email professionale pronta da incollare su Gmail.

## File

| File | Scopo |
|------|-------|
| `firma.html` | Pagina con anteprima + bottone "Copia" + istruzioni installazione |
| `logo-emc.svg` | Logo sorgente vettoriale (per modifiche future) |
| `logo-emc.png` | Logo rasterizzato 360×360px usato nella firma email |

## Installazione (step-by-step)

### 1. Pubblica il logo sul sito

Il logo deve essere accessibile pubblicamente perché Gmail carica le immagini esterne. URL atteso:

```
https://www.emcdigitalsolutions.it/firma-email/logo-emc.png
```

Da terminale, dalla root del progetto `emcdigitalsolutions/`:

```bash
git add firma-email/
git commit -m "add: firma email + logo"
git push
```

GitHub Pages deploya in 1-2 min. Verifica aprendo l'URL sopra in un browser.

### 2. Genera la firma

Apri **`firma.html`** nel browser (doppio click sul file). Vedrai:
- L'anteprima rendered della firma
- Un bottone **"📋 Copia firma negli appunti"**
- Le istruzioni dettagliate per Gmail

### 3. Incolla in Gmail

1. Clicca **"📋 Copia firma negli appunti"** in `firma.html`
2. Apri Gmail web → ⚙ → **Visualizza tutte le impostazioni**
3. Scorri fino a **Firma** → **Crea nuova** (o seleziona quella esistente)
4. Incolla con **Ctrl+V** (Mac: ⌘V) dentro il riquadro
5. Imposta **Predefiniti firma**: scegli per "NUOVA EMAIL" e "RISPOSTA/INOLTRO"
6. **Salva modifiche** in fondo

## Anatomia della firma

```
┌──────────┬─────────────────────────────────┐
│          │ Enrico Maria Caruso             │
│  [LOGO]  │ FOUNDER & SOFTWARE DEVELOPER    │
│   EMC    │ EMC Digital Solutions           │
│          │                                 │
│          │ ☎ +39 329 4348075              │
│          │ ✉ info@emcdigitalsolutions.it  │
│          │ 🌐 www.emcdigitalsolutions.it   │
│          │ ────────────                    │
│          │ Sviluppo Web · SaaS · Social    │
│          │ Facebook | Instagram | LinkedIn │
└──────────┴─────────────────────────────────┘
Disclaimer riservatezza
```

## Personalizzazione

### Cambiare i contatti
Modifica direttamente `firma.html` cercando i blocchi di testo:
- Nome: `Enrico Maria Caruso`
- Telefono: `+39 329 4348075`
- Email: `info@emcdigitalsolutions.it`

### Cambiare il logo
1. Modifica `logo-emc.svg`
2. Rigenera il PNG (richiede Node + sharp installato in social-image-generator):
   ```bash
   cd C:/workspace/social-image-generator
   node -e "const sharp=require('sharp');const fs=require('fs');sharp(fs.readFileSync('C:/workspace/emcdigitalsolutions/firma-email/logo-emc.svg'),{density:288}).resize(360,360).png({quality:95}).toFile('C:/workspace/emcdigitalsolutions/firma-email/logo-emc.png').then(()=>console.log('OK'))"
   ```
3. Push sul sito

### Aggiungere/rimuovere social
Cerca la sezione `<!-- Tagline + Social -->` in `firma.html` e modifica i link `<a>`.

## Note tecniche

- **Compatibilità**: Gmail web/mobile, Outlook 2019+, Apple Mail, Thunderbird, Yahoo Mail
- **Larghezza max**: 520px (responsive su mobile per come è strutturata in tabella)
- **Font fallback**: Helvetica Neue → Helvetica → Arial (web-safe, non richiede Google Fonts che Gmail strippa)
- **Immagini esterne**: i client email bloccano per privacy al primo arrivo. Il destinatario clicca "Mostra immagini" → il logo appare. Comportamento normale e atteso.
- **Larghezza riga sito**: i client mobile potrebbero ridimensionare il logo. La cella tabella si adatta.

## Troubleshooting

**"Vedo solo testo, niente logo"** → Il PNG non è ancora pubblico. Verifica `https://www.emcdigitalsolutions.it/firma-email/logo-emc.png` direttamente nel browser. Aspetta 1-2 min dal push GitHub Pages.

**"Quando incollo in Gmail, vengono fuori solo testi senza stile"** → Stai usando Ctrl+Shift+V (incolla senza formattazione). Usa solo Ctrl+V.

**"Il logo è gigante / minuscolo"** → Le dimensioni `width="92" height="92"` sono inline nell'`<img>`. Se vuoi cambiare, modifica entrambi gli attributi mantenendo il rapporto 1:1.
