// O SDK Client do Firebase é normalmente usado no frontend.
// Mas para algumas simulações de login (Email/Senha) puro no backend, ele é necessário.
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

let app;
let authClient;

try {
  app = initializeApp(firebaseConfig);
  authClient = getAuth(app);
  console.log("🔥 Firebase Client SDK inicializado.");
} catch (error) {
  console.error("Aviso: Configurações do Firebase Client SDK incompletas ou inválidas.");
}

export { app, authClient };
