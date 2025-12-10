import imagen8 from "../imagenes/imagen8.jpg";
export default function BanoPeluqueria() {
    return (
        <div className="container mt-4 text-center">
        <h2 className="text-center mb-4">Baño y Peluquería</h2>
        <img
            src={imagen8}
            className="img-fluid rounded shadow mb-4"
            style={{ width: "100%", maxWidth: "900px" }}
            alt="Baño y Peluquería"
        />
        <p className="text-center mb-4">
            Servicios profesionales para mantener a tu mascota limpia y con estilo.
        </p>
        <div className="row justify-content-center">
            {/* Servicio 1 */}
            <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="card shadow-sm h-100 text-center">
                <div className="card-body">
                <h5>🛁Baño Completo </h5>
                <p>Limpieza total con productos profesionales.</p>
                <p className="fw-bold">Precio: 80 Bs</p>
                </div>
            </div>
            </div>
        {/* Servicio 2 */}
            <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="card shadow-sm h-100 text-center">
                <div className="card-body">
                <h5>Corte de Pelo </h5>
                <p>Estilo personalizado según la raza y tamaño.</p>
                <p className="fw-bold">Precio: 100 Bs</p>
                </div>
            </div>
            </div>
        {/* Servicio 3 */}
            <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="card shadow-sm h-100 text-center">
                <div className="card-body">
                <h5>Limpieza de Orejas </h5>
                <p>Prevención de infecciones y cuidado del oído.</p>
                <p className="fw-bold">Precio: 50 Bs</p>
                </div>
            </div>
            </div>
        {/* Servicio 4 */}
            <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="card shadow-sm h-100 text-center">
                <div className="card-body">
                <h5>Corte de Uñas</h5>
                <p>Cuidado de uñas para mayor comodidad y seguridad.</p>
                <p className="fw-bold">Precio: 30 Bs</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
