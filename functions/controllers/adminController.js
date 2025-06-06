const admin = require("firebase-admin");
const db = admin.firestore();

// Obtener todas las rutas
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

// Eliminar ruta por ID
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

// Eliminar usuario por ID
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

// Eliminar conductor por ID
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

// Listar usuarios por rol
const listarUsuariosPorRol = async (req, res) => {
  if (req.method !== "GET") return res.status(405).send("Método no permitido");

  const { rol } = req.query;
  if (!rol) return res.status(400).send("Rol requerido");

  try {
    const roles = rol.split(",");
    const usuarios = [];

    for (const r of roles) {
      const snapshot = await db.collection("usuarios").where("rol", "==", r.trim()).get();
      snapshot.forEach(doc => usuarios.push({ id: doc.id, ...doc.data() }));
    }

    return res.status(200).json(usuarios);
  } catch (error) {
    console.error("ERROR listarUsuariosPorRol:", error);
    return res.status(500).send("Error al listar usuarios");
  }
};

// Listar conductores con nombre resuelto
const listarConductores = async (req, res) => {
  if (req.method !== "GET") return res.status(405).send("Método no permitido");

  try {
    const snapshot = await db.collection("conductores").get();
    const conductores = [];

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const usuarioDoc = await data.userRef.get();
      const usuarioData = usuarioDoc.data();

      conductores.push({
        id: doc.id,
        nombre: usuarioData?.nombre || "Sin nombre",
        placa: data.placa,
        rutaAsignada: data.rutaAsignada
      });
    }

    return res.status(200).json(conductores);
  } catch (error) {
    console.error("ERROR listarConductores:", error);
    return res.status(500).send("Error al listar conductores");
  }
};

module.exports = {
  obtenerRutas,
  eliminarRuta,
  eliminarUsuario,
  eliminarConductor,
  listarUsuariosPorRol,
  listarConductores
};
