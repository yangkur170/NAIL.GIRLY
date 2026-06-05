// Firebase configuration (shared by index.html and admin.html)
const firebaseConfig = {
  apiKey: "AIzaSyCcZ5kszqu_EQgHHkzpCS_S35stdK1wkQU",
  authDomain: "nail-girly.firebaseapp.com",
  projectId: "nail-girly",
  storageBucket: "nail-girly.firebasestorage.app",
  messagingSenderId: "787455615511",
  appId: "1:787455615511:web:7ccdb6875eaf13f478f252",
  measurementId: "G-2WXQ9K6N8M"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Shrink an image file to keep it small enough to store in Firestore.
// Returns a compressed JPEG as a base64 data URL.
function compressImage(file, maxSize = 800, quality = 0.6) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxSize) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else if (height > maxSize) {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
