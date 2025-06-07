const { db } = require("../services/firebase");

const listarPublicacionesActivas = async (req, res) => {
  try {
    const snapshot = await db.collection("conductores")
      .where("activo", "==", true)
      .get();

    const publicaciones = [];

    for (const doc of snapshot.docs) {
      const data = doc.data();

      const ubicacionDoc = await db.collection("ubicaciones").doc(data.placa).get();
      const ubicacion = ubicacionDoc.exists ? ubicacionDoc.data() : null;

      publicaciones.push({
        id: doc.id,
        nombre: data.nombre || "Sin nombre",
        placa: data.placa,
        ruta: data.rutaAsignada,
        fechaCreacion: data.creadoEn?.toDate() || null,
        ubicacion
      });
    }

    res.status(200).json(publicaciones);
  } catch (error) {
    console.error("❌ ERROR listarPublicacionesActivas:", error);
    res.status(500).json({ error: "Error al obtener publicaciones" });
  }
};

const obtenerUbicacionBus = async (req, res) => {
  const { busID } = req.query;
  if (!busID) return res.status(400).json({ error: "busID es obligatorio" });

  try {
    const doc = await db.collection("publicaciones").doc(busID).get();
    if (!doc.exists) return res.status(404).json({ error: "Ubicación no encontrada" });

    const { latitud, longitud } = doc.data();
    res.status(200).json({ latitud, longitud });
  } catch (error) {
    console.error("❌ ERROR obtenerUbicacionBus:", error);
    res.status(500).json({ error: "Error al obtener ubicación" });
  }
};

module.exports = {
  listarPublicacionesActivas,
  obtenerUbicacionBus
};