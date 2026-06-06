// One-time script to fill Firestore with ~40 dark / Y2K modern nail products.
// Run: npm install firebase  &&  node seed-products.mjs
import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, addDoc, getDocs, serverTimestamp
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCcZ5kszqu_EQgHHkzpCS_S35stdK1wkQU',
  authDomain: 'nail-girly.firebaseapp.com',
  projectId: 'nail-girly',
  storageBucket: 'nail-girly.firebasestorage.app',
  messagingSenderId: '787455615511',
  appId: '1:787455615511:web:7ccdb6875eaf13f478f252'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Real nail photos from loremflickr, stable per product via the lock seed.
const img = (seed) => `https://loremflickr.com/600/600/manicure,nailart,nails?lock=${seed}`;

// name, price, category, desc  — dark / chrome / Y2K modern aesthetic
const items = [
  ['Midnight Chrome', 28, 'Cyber Chrome', 'Mirror dark chrome finish'],
  ['Onyx Aura', 26, 'Cyber Chrome', 'Deep black with smoky aura'],
  ['Cyber Steel', 24, 'Cyber Chrome', 'Brushed metallic steel'],
  ['Galaxy Holo', 30, 'Cyber Chrome', 'Holographic galaxy shimmer'],
  ['Dark Matter', 27, 'Cyber Chrome', 'Matte black with star flecks'],
  ['Neon Void', 25, 'Cyber Chrome', 'Black base, neon outline'],
  ['Liquid Mercury', 32, 'Cyber Chrome', 'Flowing silver chrome'],
  ['Obsidian Glaze', 29, 'Cyber Chrome', 'Glossy volcanic black'],
  ['Titanium Frost', 26, 'Cyber Chrome', 'Cold titanium gradient'],
  ['Phantom Smoke', 24, 'Cyber Chrome', 'Smoke swirl on charcoal'],
  ['Electric Eclipse', 31, 'Cyber Chrome', 'Eclipse ring chrome art'],
  ['Gunmetal Glam', 23, 'Cyber Chrome', 'Industrial gunmetal shine'],
  ['Hologram Y2K', 30, 'Cyber Chrome', 'Retro futuristic hologram'],
  ['Black Diamond', 34, 'Cyber Chrome', 'Crystal studs on black'],
  ['Aurora Tech', 28, 'Cyber Chrome', 'Iridescent tech gradient'],

  ['Milk Noir', 22, 'Milk Creamy', 'Creamy off-white with black tips'],
  ['Smoky Latte', 21, 'Milk Creamy', 'Soft mocha cream blend'],
  ['Pearl Shadow', 25, 'Milk Creamy', 'Pearl base, shadow french'],
  ['Velvet Cream', 23, 'Milk Creamy', 'Matte velvet milk tone'],
  ['Moonstone Milk', 27, 'Milk Creamy', 'Glowing moonstone finish'],
  ['Ghost White', 20, 'Milk Creamy', 'Sheer ghostly milk coat'],
  ['Ivory Chrome', 26, 'Milk Creamy', 'Ivory with chrome accent'],
  ['Café Cloud', 22, 'Milk Creamy', 'Cloudy cream coffee swirl'],
  ['Silk Bone', 24, 'Milk Creamy', 'Silky bone matte'],
  ['Frosted Glass', 25, 'Milk Creamy', 'Frosted translucent glass'],
  ['Vanilla Smoke', 23, 'Milk Creamy', 'Vanilla cream, smoke tip'],
  ['Pale Moon', 21, 'Milk Creamy', 'Pale glowing moon shade'],
  ['Cream Aura', 24, 'Milk Creamy', 'Soft creamy aura blush'],

  ['Pink Venom', 26, 'Pink Butterfly', 'Hot pink with dark wings'],
  ['Butterfly Noir', 28, 'Pink Butterfly', '3D black butterfly art'],
  ['Cyber Rose', 27, 'Pink Butterfly', 'Chrome rose pink shift'],
  ['Magenta Glitch', 25, 'Pink Butterfly', 'Glitch magenta Y2K vibe'],
  ['Pink Eclipse', 24, 'Pink Butterfly', 'Dark pink eclipse fade'],
  ['Holo Heart', 29, 'Pink Butterfly', 'Holographic heart charms'],
  ['Bubblegum Chrome', 26, 'Pink Butterfly', 'Glossy bubblegum chrome'],
  ['Fairy Goth', 27, 'Pink Butterfly', 'Goth fairy pink & black'],
  ['Rose Mercury', 30, 'Pink Butterfly', 'Liquid rose metallic'],
  ['Neon Petal', 23, 'Pink Butterfly', 'Neon pink petal tips'],
  ['Sugar Skull', 28, 'Pink Butterfly', 'Pink sugar skull art'],
  ['Crystal Blossom', 31, 'Pink Butterfly', 'Crystal pink blossom studs']
];

async function run() {
  const existing = await getDocs(collection(db, 'products'));
  console.log(`Existing products: ${existing.size}`);

  let n = 0;
  for (const [name, price, category, desc] of items) {
    await addDoc(collection(db, 'products'), {
      name,
      price,
      category,
      desc,
      img: img(1000 + n),
      createdAt: serverTimestamp()
    });
    n++;
    console.log(`Added (${n}/${items.length}): ${name}`);
  }
  console.log(`\nDone! Added ${n} products.`);
  process.exit(0);
}

run().catch((e) => { console.error(e); process.exit(1); });
