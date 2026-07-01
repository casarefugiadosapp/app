[README.md](https://github.com/user-attachments/files/29110590/README.md)
# Casa Refugiados — Information & Support

An anonymous, offline-capable, multilingual progressive web app (PWA) that gives
people seeking asylum and refuge in Mexico clear information about the support
available to them: guidance and resources, legal services, housing, community
programs at La Casita, and medical care.

Built for **Casa Refugiados**, a nonprofit humanitarian organization and UNHCR
implementing partner in Mexico City. The goal is simple: put reliable, verified
information directly in people's hands so they can navigate their own path with
dignity.

This is a free, public-good project. It is not a commercial product.

## Features

- **Five languages:** Spanish, English, French, Haitian Creole, and Arabic
  (with full right-to-left layout for Arabic). The app auto-detects the phone's
  language on first open.
- **Works offline:** a service worker caches the app so it opens with no signal,
  important for users with limited connectivity and data.
- **Installable:** can be added to a phone's home screen like a native app.
- **Anonymous by design:** no accounts, no logins, and no collection or storage
  of any personal data.
- **Live schedule:** the La Casita weekly schedule reads from a published Google
  Sheet, so non-technical staff can keep it current without touching code.
- **Built-in assistant:** a retrieval-based helper that answers questions only
  from the app's own verified content — it never generates answers, so it cannot
  provide unverified information.

## How it works

The entire app is a single static `index.html` file with no backend. All content
lives in a clearly commented data object near the top of the script, organized by
language. Icons are inline SVG and fonts are system fonts, so the app has zero
network dependencies and runs entirely offline once loaded.

## Running and deploying

No build step is required. Open `index.html` in a browser to run it locally, or
deploy the folder to any static host (Netlify, Cloudflare Pages, or GitHub Pages).
Keep all files together:

- `index.html` — the app
- `manifest.json` — enables home-screen installation
- `sw.js` — service worker for offline use
- `logo-full.png`, `logo-emblem.png` — Casa Refugiados logo
- `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` — app icons

To connect the live schedule, publish a Google Sheet to the web as CSV and paste
the link into the `SHEET_CSV_URL` constant in `index.html`. The expected column
format is documented in a comment directly above that constant.

## Privacy

The app asks for nothing and stores nothing about the people who use it. This is
a deliberate safeguard for a vulnerable population, not an incidental choice.

## License

Released under the MIT License. See [LICENSE](LICENSE).

## Hosting

This site is powered by Netlify.

## Contact

contacto@casarefugiados.org
