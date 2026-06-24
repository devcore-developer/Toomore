import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBaUuCmqwmzG5f9SIFc3nUe5ylSoY9RcAk",
  authDomain: "toomore-c0619.firebaseapp.com",
  projectId: "toomore-c0619",
  storageBucket: "toomore-c0619.firebasestorage.app",
  messagingSenderId: "497221917407",
  appId: "1:497221917407:web:4eda743c199f59bc6c676a"
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)