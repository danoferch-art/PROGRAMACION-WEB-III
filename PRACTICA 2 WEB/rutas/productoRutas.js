const express = require("express");
const router = express.Router();
const ProductoControlador = require("../controladores/productoControlador");

router.post("/", ProductoControlador.crear);                       //ejercicio 6
router.get("/", ProductoControlador.obtenerTodos);                 //ejercicio 7
router.get("/:id", ProductoControlador.obtenerPorId);              //ejercicio 8
router.put("/:id", ProductoControlador.actualizar);                //ejercicio 9
router.patch("/:id/stock", ProductoControlador.actualizarStock);   //ejercicio 10
router.delete("/:id", ProductoControlador.eliminar);               //borrar

module.exports = router;
