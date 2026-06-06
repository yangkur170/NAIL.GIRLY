// Reassign clean premium Unsplash nail photos to every product, by category.
// Run: node update-images.mjs
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';

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

const url = (id) =>
  `https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop&q=80&auto=format`;

// Verified real nail photos, grouped to match each category's vibe.
const byCategory = {
  'Cyber Chrome': [
    '1604654894610-df63bc536371', // black + tortoise (dark)
    '1607779097040-26e80aa78e66', // grey/silver glitter
    '1571290274554-6a2eaa771e5f'  // bold abstract art
  ],
  'Milk Creamy': [
    '1610992015732-2449b76344bc', // nude natural
    '1607779097040-26e80aa78e66', // soft grey/white
    '1632345031435-8727f6897d53'  // clean salon look
  ],
  'Pink Butterfly': [
    '1522337660859-02fbefca4702', // pink + polish
    '1604902396830-aca29e19b067', // pink matte
    '1571290274554-6a2eaa771e5f'  // colourful art
  ]
};

const counters = { 'Cyber Chrome': 0, 'Milk Creamy': 0, 'Pink Butterfly': 0 };

async function run() {
  const snap = await getDocs(collection(db, 'products'));
  console.log(`Updating ${snap.size} products...`);
  let n = 0;
  for (const d of snap.docs) {
    const cat = d.data().category;
    const pool = byCategory[cat] || byCategory['Cyber Chrome'];
    const id = pool[counters[cat] % pool.length];
    counters[cat] = (counters[cat] || 0) + 1;
    await updateDoc(doc(db, 'products', d.id), { img: url(id) });
    n++;
    console.log(`(${n}/${snap.size}) ${d.data().name} -> ${cat}`);
  }
  console.log('\nDone! All product images updated.');
  process.exit(0);
}

run().catch((e) => { console.error(e); process.exit(1); });
