import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configure Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyAW-OPcCv0nHBejXZmHs86OvJboparZa9s",
  authDomain: "djawn-d8dbf.firebaseapp.com",
  projectId: "djawn-d8dbf",
  storageBucket: "djawn-d8dbf.appspot.com",
  messagingSenderId: "502069656055",
  appId: "1:502069656055:web:324b402bb83b6b676bd6f2",
  measurementId: "G-SSDLMWRJ9F"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 
// const analytics = getAnalytics(app);
