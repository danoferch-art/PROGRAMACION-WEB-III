const express = require("express");
const router = express.Router();
const CategoriaControlador = require("../controladores/categoriaControlador");

router.post("/", CategoriaControlador.crear);          //ejercicio 1
router.get("/", CategoriaControlador.obtenerTodas);    //ejercicio 2
router.get("/:id", CategoriaControlador.obtenerPorId); //ejercicio 3
router.put("/:id", CategoriaControlador.actualizar);   //ejercicio 4
router.delete("/:id", CategoriaControlador.eliminar);  //ejercicio 5
module.exports = router;
