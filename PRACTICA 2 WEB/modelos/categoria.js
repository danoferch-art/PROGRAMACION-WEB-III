const db = require("../config/db");

const Categoria = {
  //ejercicio 1, 2, 3, 4, 5
    obtenerTodas: (callback) => {
    db.query("SELECT * FROM categorias", callback);
    },

    obtenerPorId: (id, callback) => {
    db.query("SELECT * FROM categorias WHERE id = ?", [id], callback);
    },

    crear: (data, callback) => {
    db.query(
        "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)",
        [data.nombre, data.descripcion],
        callback
    );
    },

    actualizar: (id, data, callback) => {
    db.query(
        "UPDATE categorias SET nombre = ?, descripcion = ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?",
        [data.nombre, data.descripcion, id],
        callback
    );
    },

    eliminar: (id, callback) => {
    db.query("DELETE FROM categorias WHERE id = ?", [id], callback);
    }
};

module.exports = Categoria;
