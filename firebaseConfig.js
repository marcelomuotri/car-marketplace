// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import { getFirestore } from 'firebase/firestore'
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserLocalPersistence,
} from 'firebase/auth'

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";npm
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Your web app's Firebase configuration
console.log('API Key:', import.meta.env.VITE_FIREBASE_API_KEY)
console.log('Auth Domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN)
console.log('Database URL:', import.meta.env.VITE_FIREBASE_DATABASE_URL)
console.log('Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID)
console.log('Storage Bucket:', import.meta.env.VITE_FIREBASE_STORAGE_BUCKET)
console.log(
  'Messaging Sender ID:',
  import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
)
console.log('App ID:', import.meta.env.VITE_FIREBASE_APP_ID)
console.log('Measurement ID:', import.meta.env.VITE_FIREBASE_MEASUREMENT_ID)

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const auth = getAuth(app);
const db = getFirestore(app)

const auth = getAuth()
setPersistence(auth, browserLocalPersistence)

export { auth, db }
