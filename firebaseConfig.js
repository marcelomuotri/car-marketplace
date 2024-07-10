// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import { getFirestore } from 'firebase/firestore'
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from 'firebase/auth'

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";npm
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAJa5-Nu5r-izN80fjBfzhgKmck2NuD9_4',
  authDomain: 'marketplace-f65c0.firebaseapp.com',
  databaseURL:
    'https://marketplace-f65c0-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'marketplace-f65c0',
  storageBucket: 'marketplace-f65c0.appspot.com',
  messagingSenderId: '33038217968',
  appId: '1:33038217968:web:4bcdb54c208b93cb5c4835',
  measurementId: 'G-LZZXTCJH2M',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const auth = getAuth(app);
const db = getFirestore(app)

const auth = getAuth()
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(auth, email, password)
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code
    const errorMessage = error.message
  })

export { auth, db }
