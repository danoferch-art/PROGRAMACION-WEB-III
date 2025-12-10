import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import usuarioRutas from "./rutas/usuarioRutas.js";
import mascotaRutas from "./rutas/mascotaRutas.js";
import citaRutas from "./rutas/citaRutas.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
// Rutas
app.use("/api/usuarios", usuarioRutas);
app.use("/api/mascotas", mascotaRutas);
app.use("/api/citas", citaRutas);
app.get("/", (req, res) => {
  res.json({ message: "¡Backend de PetFamily funcionando!" });
});
// mensaje de error ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
