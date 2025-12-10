import db from "../config/conexion.js";
// Crear nueva cita
export const crearCita = async (usuario_id, mascota_id, servicios, fecha, hora) => {
  try {
    const serviciosStr = Array.isArray(servicios) ? servicios.join(", ") : servicios;
    const sql = `
      INSERT INTO citas (usuario_id, mascota_id, servicios, fecha, hora)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [usuario_id, mascota_id, serviciosStr, fecha, hora]);
    return result;
  } catch (error) {
    console.error("Error en crearCita:", error);
    throw error;
  }
};
// Obtener citas
export const obtenerCitas = async () => {
  try {
    const sql = "SELECT * FROM citas";
    const [rows] = await db.query(sql);
    return rows || [];
  } catch (error) {
    console.error("Error en obtenerCitas:", error);
    throw error;
  }
};
// Eliminar cita por id
export const eliminarCitaPorId = async (id) => {
  try {
    const sql = "DELETE FROM citas WHERE id = ?";
    const [result] = await db.query(sql, [id]);
    return result;
  } catch (error) {
    console.error("Error en eliminarCitaPorId:", error);
    throw error;
  }
};