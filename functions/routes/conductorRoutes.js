// routes/conductorRoutes.js
const express = require("express");
const router = express.Router();

const { registrarConductor } = require("../controllers/conductorController");

// Ruta: POST /conductor/registrar
router.post("/registrar", registrarConductor);

module.exports = router;
