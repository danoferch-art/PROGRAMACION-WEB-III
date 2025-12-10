import express from "express";
import { agregarMascota, listarMascotas, eliminarUnaMascota } from "../controladores/mascotaControlador.js";
const router = express.Router();
router.post("/", agregarMascota);         
router.get("/", listarMascotas);          
router.delete("/:id", eliminarUnaMascota);
export default router;
