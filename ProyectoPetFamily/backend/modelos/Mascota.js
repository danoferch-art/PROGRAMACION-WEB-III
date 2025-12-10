import pool from "../config/conexion.js";
// Crear una nueva mascota
export const crearMascota = async (usuario_id, nombre, especie, raza) => {
  try {
    const sql = "INSERT INTO mascotas (usuario_id, nombre, especie, raza) VALUES (?, ?, ?, ?)";
    const [result] = await pool.query(sql, [usuario_id, nombre, especie, raza]);
    return result;
  } catch (error) {
    console.error("Error en crearMascota:", error);
    throw error;
  }
};
// obtener mascotas
export const obtenerMascotas = async () => {
  try {
    const sql = "SELECT * FROM mascotas";
    const [rows] = await pool.query(sql);
    return rows || [];
  } catch (error) {
    console.error("Error en obtenerMascotas:", error);
    throw error;
  }
};
//eliminar una mascota por id
export const eliminarMascota = async (id) => {
  try {
    const sql = "DELETE FROM mascotas WHERE id = ?";
    const [result] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    console.error("Error en eliminarMascota:", error);
    throw error;
  }
};
