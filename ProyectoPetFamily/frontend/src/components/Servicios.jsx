import { Link } from "react-router-dom";
import imagen4 from "../imagenes/imagen4.jpg";
import imagen5 from "../imagenes/imagen5.jpg";
import imagen6 from "../imagenes/imagen6.jpg";
export default function Servicios() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Servicios</h2>
      <div className="row">
        {/* targeta general */}
        <div className="col-12 col-md-6 col-lg-4">
          <Link to="/" className="text-decoration-none">
            <div className="card mb-4 h-100 shadow-sm">
              <img
                src={imagen4}
                className="card-img-top"
                alt="Consulta General"
              />
              <div className="card-body text-center">
                <h5 className="card-title">Consultas generales</h5>
                <p className="card-text">Cuidamos de la salud de tu mascota.</p>
              </div>
            </div>
          </Link>
        </div>
        {/* tarjeta vacunas */}
        <div className="col-12 col-md-6 col-lg-4">
          <Link to="/vacunas" className="text-decoration-none">
            <div className="card mb-4 h-100 shadow-sm">
              <img src={imagen5} className="card-img-top" alt="Vacunas" />
              <div className="card-body text-center">
                <h5 className="card-title">Vacunas</h5>
                <p className="card-text">
                  Aplicamos todas las vacunas necesarias.
                </p>
              </div>
            </div>
          </Link>
        </div>
        {/* tarjeta baño y peluquería */}
        <div className="col-12 col-md-6 col-lg-4">
          <Link to="/bano-peluqueria" className="text-decoration-none">
            <div className="card mb-4 h-100 shadow-sm">
              <img
                src={imagen6}
                className="card-img-top"
                alt="Baño y Peluquería"
              />
              <div className="card-body text-center">
                <h5 className="card-title">Baño y Peluquería</h5>
                <p className="card-text">Estilo y cuidado profesional.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
