const { db } = require("../services/firebase");

const visualizarPublicaciones = async (req, res) => {
  try {
    const snapshot = await db.collection("publicaciones").get();
    const publicaciones = [];

    snapshot.forEach(doc => {
      const data = doc.data();

      publicaciones.push({
        id: doc.id,
        nombre: data.nombre,
        placa: data.placa,
        rutaAsignada: data.rutaAsignada,
        fechaPublicacion: new Date(data.timestamp._seconds * 1000).toLocaleString("es-CO", {
          dateStyle: "short",
          timeStyle: "short"
        })
      });
    });

    res.status(200).json(publicaciones);
  } catch (error) {
    console.error("❌ ERROR visualizarPublicaciones:", error);
    res.status(500).json({ error: "Error al cargar publicaciones" });
  }
};

module.exports = {
  visualizarPublicaciones
};


const eliminarPublicacion = async (req, res) => {
  const { busID } = req.params;
  if (!busID) return res.status(400).json({ error: "busID requerido" });

  try {
    await db.collection("publicaciones").doc(busID).delete();
    res.status(200).json({ mensaje: "Publicación eliminada" });
  } catch (error) {
    console.error("❌ ERROR eliminarPublicacion:", error);
    res.status(500).json({ error: "Error al eliminar publicación" });
  }
};

module.exports = {
  visualizarPublicaciones,
  eliminarPublicacion
};
