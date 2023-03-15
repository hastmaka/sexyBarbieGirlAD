import {initializeApp} from "firebase/app";
import {getFirestore, connectFirestoreEmulator} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// connectFirestoreEmulator(db, 'localhost', 8080);
export const storage = getStorage(app);

// work with local emulator
// if (window.location.hostname.includes("localhost")) {
//     connectFirestoreEmulator(db, 'localhost', 8080);
//     connectAuthEmulator(auth, "http://localhost:9099");
//     connectFunctionsEmulator(functions, "localhost", 5001)
// }