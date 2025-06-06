// index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// Importar controladores
const { registrarUsuario, obtenerBusesPorRuta, obtenerUbicacionBus } = require("./controllers/usuarioController");
const { registrarConductor, actualizarUbicacion, publicarRuta } = require("./controllers/conductorController");
const { obtenerRutas, eliminarRuta, eliminarUsuario, eliminarConductor } = require("./controllers/adminController");

// Registrar funciones
exports.registrarUsuario = functions.https.onRequest(registrarUsuario);
exports.registrarConductor = functions.https.onRequest(registrarConductor);
exports.actualizarUbicacion = functions.https.onRequest(actualizarUbicacion);
exports.publicarRuta = functions.https.onRequest(publicarRuta);
exports.obtenerBusesPorRuta = functions.https.onRequest(obtenerBusesPorRuta);
exports.obtenerUbicacionBus = functions.https.onRequest(obtenerUbicacionBus);
exports.obtenerRutas = functions.https.onRequest(obtenerRutas);
exports.eliminarRuta = functions.https.onRequest(eliminarRuta);
exports.eliminarUsuario = functions.https.onRequest(eliminarUsuario);
exports.eliminarConductor = functions.https.onRequest(eliminarConductor);
