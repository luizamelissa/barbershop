const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

// Since you might not have the private key string in .env exactly parsed with newlines locally, 
// we parse it carefully or you can use a serviceAccount.json approach.
// Using env variables per your request:

let privateKey = process.env.FIREBASE_PRIVATE_KEY;
if (privateKey) {
  privateKey = privateKey.replace(/\\n/g, '\n');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    })
  });
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
