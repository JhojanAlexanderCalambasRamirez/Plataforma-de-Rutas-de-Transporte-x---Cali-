const admin = require("firebase-admin");
const db = admin.firestore();

const registrarConductor = async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Método no permitido");

  const { usuarioID, placa, rutaAsignada } = req.body;
  if (!usuarioID || !placa || !rutaAsignada) {
    return res.status(400).send("Faltan datos obligatorios");
  }

  try {
    const userRef = db.collection("usuarios").doc(usuarioID);
    const userDoc = await userRef.get();

    if (!userDoc.exists) return res.status(404).send("Usuario no encontrado");
    const data = userDoc.data();
    if (data.rol !== "conductor") {
      return res.status(403).send("El usuario no es conductor");
    }

    const nuevoConductor = {
      userRef,
      placa,
      rutaAsignada,
      activo: false
    };

    const ref = await db.collection("conductores").add(nuevoConductor);
    return res.status(201).send({ mensaje: "Conductor registrado", id: ref.id });
  } catch (error) {
    console.error("ERROR registrarConductor:", error);
    return res.status(500).send("Error al registrar conductor");
  }
};

const actualizarUbicacion = async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Método no permitido");

  const { busID, latitud, longitud } = req.body;
  if (!busID || !latitud || !longitud) {
    return res.status(400).send("Faltan datos obligatorios");
  }

  try {
    const ubicacion = {
      latitud,
      longitud,
      timestamp: new Date()
    };

    await db.collection("ubicaciones").doc(busID).set(ubicacion);
    return res.status(200).send({ mensaje: "Ubicación actualizada" });
  } catch (error) {
    console.error("ERROR actualizarUbicacion:", error);
    return res.status(500).send("Error al actualizar ubicación");
  }
};

const publicarRuta = async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Método no permitido");

  const { busID, rutaID } = req.body;
  if (!busID || !rutaID) return res.status(400).send("Faltan datos");

  try {
    await db.collection("buses").doc(busID).set({
      rutaID,
      activo: true
    }, { merge: true });

    return res.status(200).send({ mensaje: "Ruta publicada" });
  } catch (error) {
    console.error("ERROR publicarRuta:", error);
    return res.status(500).send("Error al publicar ruta");
  }
};

module.exports = {
  registrarConductor,
  actualizarUbicacion,
  publicarRuta
};
