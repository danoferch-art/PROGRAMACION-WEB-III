import { crearCita, obtenerCitas, eliminarCitaPorId } from "../modelos/Cita.js";
import db from "../config/conexion.js";
// POST crear cita
export const agregarCita = async (req, res) => {
  try {
    const { usuario_id, mascota_id, servicios, fecha, hora } = req.body;
    // Validación de campos
    const camposFaltantes = [];
    if (!usuario_id) camposFaltantes.push("usuario_id");
    if (!mascota_id) camposFaltantes.push("mascota_id");
    if (!servicios) camposFaltantes.push("servicios");
    if (!fecha) camposFaltantes.push("fecha");
    if (!hora) camposFaltantes.push("hora");
    if (camposFaltantes.length > 0) {
      return res.status(400).json({
        message: `Faltan los siguientes campos obligatorios: ${camposFaltantes.join(", ")}`
      });
    }
    // Verificacion que la mascota exista y pertenezca al usuario
    const [mascota] = await db.query(
      "SELECT * FROM mascotas WHERE id = ? AND usuario_id = ?",
      [mascota_id, usuario_id]
    );
    if (mascota.length === 0) {
      return res.status(404).json({ message: "La mascota no existe o no pertenece a este usuario" });
    }
    // Asegurar que servicios sea string
    const serviciosStr = Array.isArray(servicios) ? servicios.join(", ") : servicios;
    // Crear cita
    const result = await crearCita(usuario_id, mascota_id, serviciosStr, fecha, hora);
    // Respuesta al cliente
    res.status(201).json({
      message: "Cita creada correctamente",
      cita: {
        id: result.insertId,
        usuario_id,
        mascota_id,
        servicios: serviciosStr,
        fecha,
        hora,
      },
    });
  } catch (error) {
    console.error("Error al crear la cita:", error);
    res.status(500).json({ message: "Ocurrió un error al crear la cita", error: error.message });
  }
};
// GET mostrar citas
export const listarCitas = async (req, res) => {
  try {
    const citas = await obtenerCitas();
    if (!citas || citas.length === 0) {
      return res.status(404).json({ message: "No hay citas registradas" });
    }
    res.json({ message: "Lista de citas", citas });
  } catch (error) {
    console.error("Error al listar citas:", error);
    res.status(500).json({ message: "Ocurrió un error al obtener las citas", error: error.message });
  }
};
// DELETE Eliminar cita
export const eliminarCita = async (req, res) => {
  try {
    const { id } = req.params;
    // Verificar si la cita existe
    const [cita] = await db.query("SELECT * FROM citas WHERE id = ?", [id]);
    if (cita.length === 0) {
      return res.status(404).json({ message: "La cita no existe" });
    }
    // Eliminar cita
    await eliminarCitaPorId(id);
    res.json({ message: "Cita eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la cita:", error);
    res.status(500).json({ message: "Ocurrió un error al eliminar la cita", error: error.message });
  }
};