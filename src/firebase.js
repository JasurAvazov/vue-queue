import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.FIREBASE_API_KEY,
  authDomain: import.meta.FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.FIREBASE_PROJECT_ID,
  storageBucket: import.meta.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.FIREBASE_APP_ID,
  measurementId: import.meta.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
