// services/firebase.js
const admin = require("firebase-admin");

const serviceAccount = require("../ruta-valle-service-account.json"); // Asegúrate de tener tu key aquí

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db };
