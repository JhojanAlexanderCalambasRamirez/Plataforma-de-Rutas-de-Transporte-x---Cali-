const express = require("express");
const router = express.Router();
const {
  listarPublicacionesActivas,
  obtenerUbicacionBus
} = require("../controllers/usuarioController");

router.get("/publicaciones", listarPublicacionesActivas);
router.get("/ubicacion", obtenerUbicacionBus);

module.exports = router;
