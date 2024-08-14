import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB1jdSAqgBCUaDc93d8DdekeoEIIpNeIy8",
  authDomain: "chatter-9ecf3.firebaseapp.com",
  projectId: "chatter-9ecf3",
  storageBucket: "chatter-9ecf3.appspot.com",
  messagingSenderId: "341917462498",
  appId: "1:341917462498:web:91b0bdd31cd6c16fcd93bb",
  measurementId: "G-X3KJ3XLTMQ",
};

export const app = initializeApp(firebaseConfig);


export const auth = getAuth();
export const db = getFirestore(app);

export {onAuthStateChanged}

