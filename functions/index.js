// index.js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const adminRoutes = require("./routes/adminRoutes");
const conductorRoutes = require("./routes/conductorRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Montar rutas
app.use("/admin", adminRoutes);
app.use("/conductor", conductorRoutes);
app.use("/usuario", usuarioRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
