const express = require("express");
const app = express();
const categoriaRutas = require("./rutas/categoriaRutas");
const productoRutas = require("./rutas/productoRutas");

app.use(express.json());

// Rutas
app.use("/categorias", categoriaRutas);
app.use("/productos", productoRutas);

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});
