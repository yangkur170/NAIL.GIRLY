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
- Firebase Firestore — real-time products & orders shared across all devices
- Static server: `server.js` (Node, no dependencies)

## Firebase

Config lives in `firebase-config.js`. Products and customer orders are stored in
Firestore collections (`products`, `orders`), so orders placed by any customer
appear instantly in the admin dashboard on any device. Receipt and product
images are compressed in the browser before being saved.

> Firestore is in **test mode** (open for 30 days). Before going fully live,
> tighten the security rules in the Firebase console.
