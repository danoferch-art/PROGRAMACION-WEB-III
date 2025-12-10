import imagen9 from "../imagenes/imagen9.jpg";
export default function Vacunas() {
  return (
    <div className="container mt-4 text-center">
      <h2 className="text-center mb-4">Vacunación</h2>
      <img
        src={imagen9}
        className="img-fluid rounded shadow mb-4"
        style={{ width: "100%", maxWidth: "900px" }}
        alt="Vacunación"
      />
      <h4 className="mb-3">Vacunas Disponibles</h4>
      <div className="row justify-content-center">
        {/* tarjeta 1 */}
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5>🐶 Antirrábica</h5>
              <p>Protege contra la rabia. Obligatoria y anual.</p>
            </div>
          </div>
        </div>
        {/* tarjeta 2 */}
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5>🦠 Parvovirus</h5>
              <p>
                Vacuna esencial para cachorros. Previene enfermedades graves.
              </p>
            </div>
          </div>
        </div>
        {/* tarjeta 3 */}
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5>🐾 Moquillo</h5>
              <p>Protección contra virus altamente contagioso.</p>
            </div>
          </div>
        </div>
        {/* tarjeta 4 */}
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5>Triple Felina</h5>
              <p>Previene rinotraqueítis, calicivirus y panleucopenia.</p>
            </div>
          </div>
        </div>
        {/* tarjeta 5 */}
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5>Leucemia Felina</h5>
              <p>Protección contra una enfermedad viral muy peligrosa.</p>
            </div>
          </div>
        </div>
      </div>
      {/* recomendacion */}
      <div className="alert alert-primary mt-4">
        📅 <strong>Recomendación:</strong> Las vacunas deben aplicarse según la
        edad y el historial médico de la mascota. Consulta con nuestro
        veterinario para un plan personalizado.
      </div>
    </div>
  );
}
