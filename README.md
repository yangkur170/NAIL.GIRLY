# NAIL.GIRLY 💅

Y2K Aesthetic Nails — Online shop frontend (`index.html`) and staff admin panel (`admin.html`).

## Run locally

```bash
npm start
```

Then open http://localhost:3000

- Shop: http://localhost:3000/
- Admin: http://localhost:3000/admin.html

## Deploy on Railway

1. Push this repo to GitHub.
2. On Railway: **New Project → Deploy from GitHub repo → select NAIL.GIRLY**.
3. Railway auto-detects Node and runs `npm start`. No extra config needed.
4. Open the generated public URL.

## Tech

- Plain HTML + Tailwind (CDN)
- Data stored in browser `localStorage` (no database)
- Static server: `server.js` (Node, no dependencies)

## Note

Products and orders are saved in the **browser's localStorage**, so data is
per-device/per-browser. For a real multi-user shop you will later need a backend
database so that customer orders reach the admin on any device.
