const Categoria = require("../modelos/categoria");
const db = require("../config/db");

const CategoriaControlador = {
  //ejercicio 1
    crear: (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) return res.status(400).json({ mensaje: "Nombre y descripcion obligatorios" });

    Categoria.crear({ nombre, descripcion }, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: "Categoría creada", id: result.insertId });
    });
    },

  //ejercicio 2
    obtenerTodas: (req, res) => {
    Categoria.obtenerTodas((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
    },

  //ejercicio 3
    obtenerPorId: (req, res) => {
    const id = req.params.id;
    Categoria.obtenerPorId(id, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ mensaje: "Categoría no encontrada" });
      db.query("SELECT * FROM productos WHERE categoria_id = ?", [id], (err2, productos) => {
        if (err2) return res.status(500).json(err2);
        res.json({ categoria: results[0], productos });
        });
    });
    },

  //ejercicio 4
    actualizar: (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) return res.status(400).json({ mensaje: "Nombre y descripcion obligatorios" });

    Categoria.actualizar(id, { nombre, descripcion }, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Categoría no encontrada" });
        res.json({ mensaje: "Categoría actualizada" });
    });
    },

  //ejercicio 5
    eliminar: (req, res) => {
    const id = req.params.id;
    Categoria.eliminar(id, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Categoría no encontrada" });
        res.json({ mensaje: "Categoría y productos eliminados" });
    });
    }
};

module.exports = CategoriaControlador;
