const admin = require("firebase-admin");
const db = admin.firestore();

const registrarUsuario = async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Método no permitido");

  const { nombre, correo, rol } = req.body;
  if (!nombre || !correo || !rol) {
    return res.status(400).send("Faltan datos obligatorios");
  }

  try {
    const nuevoUsuario = {
      nombre,
      correo,
      rol,
      estado: rol === "conductor" ? "pendiente" : "activo",
      creadoEn: new Date()
    };

    const docRef = await db.collection("usuarios").add(nuevoUsuario);
    return res.status(201).send({ mensaje: "Usuario registrado", id: docRef.id });
  } catch (error) {
    console.error("ERROR registrarUsuario:", error);
    return res.status(500).send("Error al registrar usuario");
  }
};

const obtenerBusesPorRuta = async (req, res) => {
  if (req.method !== "GET") return res.status(405).send("Método no permitido");

  const rutaID = req.query.rutaID;
  if (!rutaID) return res.status(400).send("rutaID es obligatorio");

  try {
    const snapshot = await db.collection("buses")
      .where("rutaID", "==", rutaID)
      .where("activo", "==", true)
      .get();

    const buses = [];
    snapshot.forEach(doc => {
      buses.push({ id: doc.id, ...doc.data() });
    });

    return res.status(200).json(buses);
  } catch (error) {
    console.error("ERROR obtenerBusesPorRuta:", error);
    return res.status(500).send("Error al obtener buses");
  }
};

const obtenerUbicacionBus = async (req, res) => {
  if (req.method !== "GET") return res.status(405).send("Método no permitido");

  const busID = req.query.busID;
  if (!busID) return res.status(400).send("busID es obligatorio");

  try {
    const doc = await db.collection("ubicaciones").doc(busID).get();

    if (!doc.exists) {
      return res.status(404).send("Ubicación no encontrada");
    }

    return res.status(200).json(doc.data());
  } catch (error) {
    console.error("ERROR obtenerUbicacionBus:", error);
    return res.status(500).send("Error al obtener ubicación");
  }
};

module.exports = {
  registrarUsuario,
  obtenerBusesPorRuta,
  obtenerUbicacionBus
};
