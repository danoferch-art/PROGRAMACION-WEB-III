import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import jsPDF from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const DashboardCitas = () => {
  const [usuarioId, setUsuarioId] = useState("");
  const [mascotas, setMascotas] = useState([]);
  const [citas, setCitas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [nuevaMascota, setNuevaMascota] = useState({ nombre: "", especie: "", raza: "" });
  const [citaForm, setCitaForm] = useState({ mascota_id: "", servicios: [], fecha: "", hora: "" });
  const serviciosDisponibles = ["Baño", "Peluquería", "Vacunación", "Consulta general"];

  const fetchMascotas = async () => {
    if (!usuarioId) return;
    try {
      const res = await axios.get("http://localhost:4000/api/mascotas");
      setMascotas((res.data.mascotas || []).filter((m) => m.usuario_id === parseInt(usuarioId)));
    } catch (error) {
      console.error("Error al cargar mascotas:", error);
      setMensaje("No se pudieron cargar las mascotas.");
    }
  };
  
  const fetchCitas = async () => {
    if (!usuarioId) return;
    try {
      const res = await axios.get("http://localhost:4000/api/citas");
      setCitas((res.data.citas || []).filter((c) => c.usuario_id === parseInt(usuarioId)));
    } catch (error) {
      console.error("Error al cargar citas:", error);
      setMensaje("No se pudieron cargar las citas.");
    }
  };

  useEffect(() => {
    if (usuarioId) {
      fetchMascotas();
      fetchCitas();
    }
  }, [usuarioId]);
  
  const handleMascotaChange = (e) => {
    const { name, value } = e.target;
    setNuevaMascota({ ...nuevaMascota, [name]: value });
  };
  const handleCitaChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let servicios = [...citaForm.servicios];
      if (checked) servicios.push(value);
      else servicios = servicios.filter((s) => s !== value);
      setCitaForm({ ...citaForm, servicios });
    } else {
      setCitaForm({ ...citaForm, [name]: value });
    }
  };

  const handleCrearMascota = async (e) => {
    e.preventDefault();
    if (!usuarioId || !nuevaMascota.nombre || !nuevaMascota.especie || !nuevaMascota.raza) {
      setMensaje("Por favor completa todos los campos, incluyendo el ID de usuario.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:4000/api/mascotas", {
        usuario_id: parseInt(usuarioId),
        ...nuevaMascota,
      });
      setMensaje(res.data.message || "Mascota creada correctamente.");
      setNuevaMascota({ nombre: "", especie: "", raza: "" });
      fetchMascotas();
    } catch (error) {
      console.error("Error al crear mascota:", error);
      setMensaje(error.response?.data?.message || "Ocurrió un error al crear la mascota.");
    }
  };
  
  const handleCrearCita = async (e) => {
    e.preventDefault();
    if (!usuarioId || !citaForm.mascota_id || citaForm.servicios.length === 0 || !citaForm.fecha || !citaForm.hora) {
      setMensaje("Por favor completa todos los campos de la cita, incluyendo el ID de usuario.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:4000/api/citas", {
        usuario_id: parseInt(usuarioId),
        ...citaForm,
      });
      setMensaje(res.data.message || "Cita creada correctamente.");
      setCitaForm({ mascota_id: "", servicios: [], fecha: "", hora: "" });
      fetchCitas();
    } catch (error) {
      console.error("Error al crear cita:", error);
      setMensaje(error.response?.data?.message || "Ocurrió un error al crear la cita.");
    }
  };
  
  const handleEliminarMascota = async (id) => {
    if (!window.confirm("¿Deseas eliminar esta mascota?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/mascotas/${id}`);
      setMensaje("Mascota eliminada correctamente.");
      fetchMascotas();
      fetchCitas();
    } catch (error) {
      console.error("Error al eliminar mascota:", error);
      setMensaje(error.response?.data?.message || "Ocurrió un error al eliminar la mascota.");
    }
  };
  
  const handleEliminarCita = async (id) => {
    if (!window.confirm("¿Deseas eliminar esta cita?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/citas/${id}`);
      setMensaje("Cita eliminada correctamente.");
      fetchCitas();
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
      setMensaje(error.response?.data?.message || "Ocurrió un error al eliminar la cita.");
    }
  };

  const datosGrafico = () => {
    const counts = {};
    citas.forEach((c) => {
      let serviciosArray = Array.isArray(c.servicios)
        ? c.servicios
        : c.servicios.split(",").map((s) => s.trim());
      serviciosArray.forEach((s) => {
        counts[s] = (counts[s] || 0) + 1;
      });
    });
    return {
      labels: Object.keys(counts),
      datasets: [
        {
          label: "Cantidad de Servicios",
          data: Object.values(counts),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };
  };
  // crea pdf
  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Reporte de Citas", 14, 22);
    doc.setFontSize(12);
    let y = 30;
    citas.forEach((c) => {
      const mascota = mascotas.find((m) => m.id === c.mascota_id);
      doc.text(`Mascota: ${mascota ? mascota.nombre : "Desconocida"}`, 14, y);
      doc.text(`Servicios: ${Array.isArray(c.servicios) ? c.servicios.join(", ") : c.servicios}`, 14, y + 6);
      doc.text(`Fecha: ${c.fecha}  Hora: ${c.hora}`, 14, y + 12);
      y += 20;
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save("reporte_citas.pdf");
  };
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard de Mascotas y Citas</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      <div className="card mb-4">
        <div className="card-header">ID de Usuario</div>
        <div className="card-body">
          <input
            type="number"
            placeholder="Ingresa tu ID de usuario"
            className="form-control"
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}
          />
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-header">Agregar Nueva Mascota</div>
        <div className="card-body">
          <form onSubmit={handleCrearMascota}>
            <input type="text" name="nombre" placeholder="Nombre" className="form-control mb-2" value={nuevaMascota.nombre} onChange={handleMascotaChange} />
            <input type="text" name="especie" placeholder="Especie" className="form-control mb-2" value={nuevaMascota.especie} onChange={handleMascotaChange} />
            <input type="text" name="raza" placeholder="Raza" className="form-control mb-2" value={nuevaMascota.raza} onChange={handleMascotaChange} />
            <button className="btn btn-primary">Crear Mascota</button>
          </form>
        </div>
      </div>

      <h4>Mis Mascotas</h4>
      <div className="row mb-4">
        {mascotas.map((m) => (
          <div key={m.id} className="col-md-3 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{m.nombre}</h5>
                <p className="card-text">Especie: {m.especie}</p>
                <p className="card-text">Raza: {m.raza}</p>
                <button className="btn btn-danger btn-sm mt-2" onClick={() => handleEliminarMascota(m.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="card mb-4">
        <div className="card-header">Reservar Cita</div>
        <div className="card-body">
          <form onSubmit={handleCrearCita}>
            <select name="mascota_id" className="form-select mb-2" value={citaForm.mascota_id} onChange={handleCitaChange}>
              <option value="">Selecciona una mascota</option>
              {mascotas.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre} ({m.especie})
                </option>
              ))}
            </select>
            {serviciosDisponibles.map((s) => (
              <div className="form-check" key={s}>
                <input className="form-check-input" type="checkbox" value={s} checked={citaForm.servicios.includes(s)} onChange={handleCitaChange} />
                <label className="form-check-label">{s}</label>
              </div>
            ))}
            <input type="date" name="fecha" className="form-control my-2" value={citaForm.fecha} onChange={handleCitaChange} />
            <input type="time" name="hora" className="form-control mb-2" value={citaForm.hora} onChange={handleCitaChange} />
            <button className="btn btn-success">Reservar Cita</button>
          </form>
        </div>
      </div>
      
      <h4>Mis Citas</h4>
      <div className="row mb-4">
        {citas.map((c) => {
          const mascota = mascotas.find((m) => m.id === c.mascota_id);
          return (
            <div key={c.id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{mascota ? mascota.nombre : "Mascota desconocida"}</h5>
                  <p className="card-text">Servicios: {Array.isArray(c.servicios) ? c.servicios.join(", ") : c.servicios}</p>
                  <p className="card-text">Fecha: {c.fecha}</p>
                  <p className="card-text">Hora: {c.hora}</p>
                  <button className="btn btn-danger btn-sm mt-2" onClick={() => handleEliminarCita(c.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="btn btn-warning mb-4" onClick={generarPDF}>Descargar Reporte PDF</button>
      
      <div className="card mb-4">
        <div className="card-header">Gráfico de Servicios</div>
        <div className="card-body">
          <Bar data={datosGrafico()} />
        </div>
      </div>
    </div>
  );
};
export default DashboardCitas;