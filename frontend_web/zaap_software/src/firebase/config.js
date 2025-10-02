import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "123456",
  appId: "1:123456:web:xxxxxx"
};

// Inicial la app
const app = initializeApp(firebaseConfig);

// EExporta solo lo que se usa 
export const auth = getAuth(app);
export const db = getFirestore(app);
