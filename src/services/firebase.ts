import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAZELRn6RfO2KPuXB9ygPViEnIVlQuuD78",
  authDomain: "ammvmt-8e5ca.firebaseapp.com",
  projectId: "ammvmt-8e5ca",
  storageBucket: "ammvmt-8e5ca.firebasestorage.app",
  messagingSenderId: "940647778707",
  appId: "1:940647778707:web:0f83b067fb29fdde954066"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 