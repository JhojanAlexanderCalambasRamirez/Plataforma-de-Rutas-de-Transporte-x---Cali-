const admin = require("firebase-admin");
const db = admin.firestore();

// ✅ Registrar conductor y activar seguimiento GPS
const registrarConductor = async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Método no permitido");

  const { nombre, placa, rutaAsignada, latitud, longitud } = req.body;
  if (!nombre || !placa || !rutaAsignada || !latitud || !longitud) {
    return res.status(400).send("Faltan datos obligatorios");
  }

  try {
    // 1. Crear el usuario como conductor
    const userRef = await db.collection("usuarios").add({
      nombre,
      correo: "",
      rol: "conductor",
      estado: "activo",
      creadoEn: new Date()
    });

    // 2. Crear el documento del conductor
    const conductorRef = await db.collection("conductores").add({
      userRef,
      placa,
      rutaAsignada,
      activo: true
    });

    // 3. Crear el bus asociado al conductor
    await db.collection("buses").doc(conductorRef.id).set({
      conductorID: conductorRef.id,
      placa,
      rutaID: rutaAsignada,
      activo: true
    });

    // 4. Registrar ubicación inicial
    await db.collection("ubicaciones").doc(conductorRef.id).set({
      latitud,
      longitud,
      timestamp: new Date()
    });

    return res.status(201).send({ mensaje: "Conductor, bus y ubicación registrados", busID: conductorRef.id });
  } catch (error) {
    console.error("❌ ERROR registrarConductor:", error);
    return res.status(500).send("Error al registrar conductor");
  }
};

module.exports = {
  registrarConductor
};
