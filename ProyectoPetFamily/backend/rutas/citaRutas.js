import express from "express";
import { agregarCita, listarCitas, eliminarCita } from "../controladores/citaControlador.js";
import { eliminarCitaPorId } from "../modelos/Cita.js";
const router = express.Router();
router.get("/", listarCitas);
router.post("/", agregarCita);
router.delete("/:id", eliminarCita);
export default router;
