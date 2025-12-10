import { useEffect } from "react";
import * as bootstrap from "bootstrap";
import imagen1 from "../imagenes/imagen1.jpg";
import imagen2 from "../imagenes/imagen2.jpg";
import imagen3 from "../imagenes/imagen3.jpg";
export default function Home() {
  useEffect(() => {
    const carouselElement = document.getElementById("carouselExample");
    if (carouselElement) {
      new bootstrap.Carousel(carouselElement, {
        interval: 3000,
        ride: "carousel",
      });
    }
  }, []);
  return (
    <div className="container mt-4">
      <div id="carouselExample" className="carousel slide mb-4">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={imagen1} className="d-block w-100" alt="Mascota 1" />
          </div>
          <div className="carousel-item">
            <img src={imagen2} className="d-block w-100" alt="Mascota 2" />
          </div>
          <div className="carousel-item">
            <img src={imagen3} className="d-block w-100" alt="Mascota 3" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
      <h2 className="text-center mb-3">Bienvenido a PetFamily</h2>
      <p className="text-center">
        Cuidamos de tus mascotas con amor y profesionalismo.
      </p>
    </div>
  );
}
