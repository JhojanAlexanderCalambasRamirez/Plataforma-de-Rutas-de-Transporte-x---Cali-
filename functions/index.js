const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const adminRoutes = require("./routes/adminRoutes");
const conductorRoutes = require("./routes/conductorRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ✅ Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API
app.use("/admin", adminRoutes);
app.use("/conductor", conductorRoutes);
app.use("/usuario", usuarioRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
