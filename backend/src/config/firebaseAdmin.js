import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
let serviceAccount = null;

try {
  const jsonPath = join(__dirname, 'serviceAccountKey.json');
  const contents = readFileSync(jsonPath, 'utf8');
  serviceAccount = JSON.parse(contents);
} catch (error) {
  serviceAccount = null;
}

const createCredential = () => {
  if (serviceAccount && serviceAccount.project_id) {
    return cert(serviceAccount);
  }

  if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PROJECT_ID) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
    return cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    });
  }

  throw new Error('Firebase Admin credentials não foram configuradas corretamente.');
};

if (!getApps().length) {
  initializeApp({
    credential: createCredential(),
  });
}

const auth = getAuth();
const db = getFirestore();

export { auth, db };