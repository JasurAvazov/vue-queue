import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	// apiKey: import.meta.FIREBASE_API_KEY,
	// authDomain: import.meta.FIREBASE_AUTH_DOMAIN,
	// projectId: import.meta.FIREBASE_PROJECT_ID,
	// storageBucket: import.meta.FIREBASE_STORAGE_BUCKET,
	// messagingSenderId: import.meta.FIREBASE_MESSAGING_SENDER_ID,
	// appId: import.meta.FIREBASE_APP_ID,
	// measurementId: import.meta.FIREBASE_MEASUREMENT_ID
	apiKey: "AIzaSyDCz1NhKC_CZ5EGQMt5_dmIFrGkl5YKoC4",
	authDomain: "queue-3a33b.firebaseapp.com",
	projectId: "queue-3a33b",
	storageBucket: "queue-3a33b.appspot.com",
	messagingSenderId: "897089143186",
	appId: "1:897089143186:web:5002a6f35ed73a18fbc14b",
	measurementId: "G-1BPNDQKR1B",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
