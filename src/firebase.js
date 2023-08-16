import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDCz1NhKC_CZ5EGQMt5_dmIFrGkl5YKoC4",
  authDomain: "queue-3a33b.firebaseapp.com",
  projectId: "queue-3a33b",
  storageBucket: "queue-3a33b.appspot.com",
  messagingSenderId: "897089143186",
  appId: "1:897089143186:web:5002a6f35ed73a18fbc14b",
  measurementId: "G-1BPNDQKR1B"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);