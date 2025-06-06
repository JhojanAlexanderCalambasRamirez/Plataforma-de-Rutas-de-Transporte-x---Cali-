const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.registrarUsuario = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Método no permitido");
  }

  const { nombre, correo, rol } = req.body;

  if (!nombre || !correo || !rol) {
    return res.status(400).send("Faltan datos obligatorios");
  }

  try {
    const nuevoUsuario = {
      nombre,
      correo,
      rol,
      creadoEn: new Date() // ← ESTA línea reemplaza completamente el error
    };

    const docRef = await db.collection("usuarios").add(nuevoUsuario);
    return res.status(201).send({ mensaje: "Usuario registrado", id: docRef.id });
  } catch (error) {
    console.error("ERROR DETALLE:", error);
    return res.status(500).send("Error al registrar usuario");
  }
});
