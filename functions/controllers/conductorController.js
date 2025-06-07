// controllers/conductorController.js
const { db } = require("../services/firebase");

// ✅ Registrar conductor con ubicación y ruta
const registrarConductor = async (req, res) => {
  try {
    const { nombre, placa, rutaAsignada, latitud, longitud } = req.body;

    if (!nombre || !placa || !rutaAsignada || !latitud || !longitud) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const timestamp = new Date();

    // Guardar documento en "publicaciones"
    await db.collection("publicaciones").doc(placa).set({
      nombre,
      placa,
      rutaAsignada,
      latitud,
      longitud,
      timestamp
    });

    // Guardar ubicación en "ubicaciones" (placa como ID)
    await db.collection("ubicaciones").doc(placa).set({
      latitud,
      longitud,
      timestamp
    });

    res.status(201).json({ mensaje: "Publicación registrada correctamente", placa });
  } catch (error) {
    console.error("❌ ERROR registrarConductor:", error);
    res.status(500).json({ error: "Error al registrar publicación" });
  }
};

// ✅ Actualizar ubicación (usado en seguimiento real)
const actualizarUbicacion = async (req, res) => {
  try {
    const { placa, latitud, longitud } = req.body;

    if (!placa || !latitud || !longitud) {
      return res.status(400).json({ error: "Faltan datos de ubicación" });
    }

    await db.collection("ubicaciones").doc(placa).set({
      latitud,
      longitud,
      timestamp: new Date()
    });

    res.status(200).json({ mensaje: "Ubicación actualizada correctamente" });
  } catch (error) {
    console.error("❌ ERROR actualizarUbicacion:", error);
    res.status(500).json({ error: "Error al actualizar ubicación" });
  }
};

module.exports = {
  registrarConductor,
  actualizarUbicacion
};
