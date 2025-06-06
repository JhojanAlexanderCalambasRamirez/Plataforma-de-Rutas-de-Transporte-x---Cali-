const admin = require("firebase-admin");
const db = admin.firestore();

// 1. Obtener todas las rutas
const obtenerRutas = async (req, res) => {
  if (req.method !== "GET") return res.status(405).send("Método no permitido");

  try {
    const snapshot = await db.collection("rutas").get();
    const rutas = [];
    snapshot.forEach(doc => rutas.push({ id: doc.id, ...doc.data() }));
    return res.status(200).json(rutas);
  } catch (error) {
    console.error("ERROR obtenerRutas:", error);
    return res.status(500).send("Error al obtener rutas");
  }
};

// 2. Eliminar ruta por ID
const eliminarRuta = async (req, res) => {
  if (req.method !== "DELETE") return res.status(405).send("Método no permitido");

  const { rutaID } = req.query;
  if (!rutaID) return res.status(400).send("rutaID es obligatorio");

  try {
    await db.collection("rutas").doc(rutaID).delete();
    return res.status(200).send("Ruta eliminada");
  } catch (error) {
    console.error("ERROR eliminarRuta:", error);
    return res.status(500).send("Error al eliminar ruta");
  }
};

// 3. Eliminar usuario por ID
const eliminarUsuario = async (req, res) => {
  if (req.method !== "DELETE") return res.status(405).send("Método no permitido");

  const { usuarioID } = req.query;
  if (!usuarioID) return res.status(400).send("usuarioID es obligatorio");

  try {
    await db.collection("usuarios").doc(usuarioID).delete();
    return res.status(200).send("Usuario eliminado");
  } catch (error) {
    console.error("ERROR eliminarUsuario:", error);
    return res.status(500).send("Error al eliminar usuario");
  }
};

// 4. Eliminar conductor por ID
const eliminarConductor = async (req, res) => {
  if (req.method !== "DELETE") return res.status(405).send("Método no permitido");

  const { conductorID } = req.query;
  if (!conductorID) return res.status(400).send("conductorID es obligatorio");

  try {
    await db.collection("conductores").doc(conductorID).delete();
    return res.status(200).send("Conductor eliminado");
  } catch (error) {
    console.error("ERROR eliminarConductor:", error);
    return res.status(500).send("Error al eliminar conductor");
  }
};

module.exports = {
  obtenerRutas,
  eliminarRuta,
  eliminarUsuario,
  eliminarConductor
};
