export default function Contacto() {
    return (
        <div className="container mt-4">
        <h2 className="text-center mb-4">Contáctanos</h2>
        <div className="text-center mb-4">
            <p>
            <strong>Teléfono:</strong> 73216519
            </p>
            <p>
            <strong>Dirección:</strong> Agustin Iturricha #1234
            </p>
            <p>
            ✉️ <strong>Email:</strong> pet69family@gmail.com
            </p>
        </div>
        <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="card shadow h-100 text-center p-3">
                <h4>🩺 Veterinario</h4>
                <h5 className="mt-2">Danilo Fernandez Chipana</h5>
                <p className="text-muted">Atención médica y vacunación</p>
            </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="card shadow h-100 text-center p-3">
                <h4>💻 Soporte Web</h4>
                <h5 className="mt-2">Jhamil Freddy Aruquipa Torrez</h5>
                <p className="text-muted">Desarrollo y mantenimiento del sitio</p>
            </div>
            </div>
        </div>
        </div>
    );
}