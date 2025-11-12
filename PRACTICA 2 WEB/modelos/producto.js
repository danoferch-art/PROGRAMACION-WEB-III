const db = require("../config/db");

const Producto = {
    //ejercicio 6, 7, 8, 9, 10
    obtenerTodos: (callback) => {
    const sql = `
        SELECT p.id, p.nombre, p.precio, p.stock, p.categoria_id, c.nombre AS categoria_nombre, p.fecha_alta, p.fecha_act
        FROM productos p
        JOIN categorias c ON p.categoria_id = c.id
    `;
    db.query(sql, callback);
    },

    obtenerPorId: (id, callback) => {
    const sql = `
        SELECT p.id, p.nombre, p.precio, p.stock, p.categoria_id, c.nombre AS categoria_nombre, p.fecha_alta, p.fecha_act
        FROM productos p
        JOIN categorias c ON p.categoria_id = c.id
        WHERE p.id = ?
    `;
    db.query(sql, [id], callback);
    },

    crear: (data, callback) => {
    db.query(
        "INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES (?, ?, ?, ?)",
        [data.nombre, data.precio, data.stock, data.categoria_id],
        callback
    );
    },

    actualizar: (id, data, callback) => {
    db.query(
        "UPDATE productos SET nombre = ?, precio = ?, stock = ?, categoria_id = ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?",
        [data.nombre, data.precio, data.stock, data.categoria_id, id],
        callback
    );
    },

    actualizarStock: (id, cantidad, callback) => {
    db.query(
        "UPDATE productos SET stock = stock + ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?",
        [cantidad, id],
        callback
    );
    },

    eliminar: (id, callback) => {
    db.query("DELETE FROM productos WHERE id = ?", [id], callback);
    }
};

module.exports = Producto;
