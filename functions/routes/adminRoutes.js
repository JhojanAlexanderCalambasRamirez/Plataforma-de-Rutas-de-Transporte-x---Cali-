const express = require("express");
const router = express.Router();

const {
  visualizarPublicaciones,
  eliminarPublicacion // 👈 asegúrate de incluir esto
} = require("../controllers/adminController");

// Rutas
router.get("/publicaciones", visualizarPublicaciones);
router.delete("/eliminar-publicacion/:busID", eliminarPublicacion); // ✅ Esta línea funciona si has definido la función

module.exports = router;
