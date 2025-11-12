const Producto = require("../modelos/producto");

const ProductoControlador = {
  //ejercicio 6
    crear: (req, res) => {
    const { nombre, precio, stock, categoria_id } = req.body;
    if (!nombre || !precio || !stock || !categoria_id)
        return res.status(400).json({ mensaje: "Todos los campos obligatorios" });

    Producto.crear({ nombre, precio, stock, categoria_id }, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: "Producto creado", id: result.insertId });
    });
    },

  //ejercicio 7
    obtenerTodos: (req, res) => {
    Producto.obtenerTodos((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
    },

  //ejercicio 8
    obtenerPorId: (req, res) => {
    const id = req.params.id;
    Producto.obtenerPorId(id, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ mensaje: "Producto no encontrado" });
        res.json(results[0]);
    });
    },

  //ejercicio 9
    actualizar: (req, res) => {
    const id = req.params.id;
    const { nombre, precio, stock, categoria_id } = req.body;
    if (!nombre || !precio || !stock || !categoria_id)
        return res.status(400).json({ mensaje: "Todos los campos obligatorios" });

    Producto.actualizar(id, { nombre, precio, stock, categoria_id }, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Producto no encontrado" });
        res.json({ mensaje: "Producto actualizado" });
    });
    },

  //ejercicio 10
    actualizarStock: (req, res) => {
    const id = req.params.id;
    const { cantidad } = req.body;
    if (cantidad === undefined || isNaN(cantidad))
        return res.status(400).json({ mensaje: "Cantidad inválida" });

    Producto.actualizarStock(id, cantidad, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Producto no encontrado" });
        res.json({ mensaje: `Stock actualizado (cantidad: ${cantidad})` });
    });
    },

  //borrar
    eliminar: (req, res) => {
    const id = req.params.id;
    Producto.eliminar(id, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Producto no encontrado" });
        res.json({ mensaje: "Producto eliminado" });
    });
    }
};

module.exports = ProductoControlador;
