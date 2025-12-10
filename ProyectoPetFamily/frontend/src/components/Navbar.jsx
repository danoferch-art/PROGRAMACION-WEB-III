import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setHideNavbar(true); 
      } else {
        setHideNavbar(false);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleLinkClick = () => setMenuOpen(false);
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark header-gradient shadow-sm 
      ${hideNavbar ? "-translate-y-full" : "top-0"}`}
    >
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={handleLinkClick}>
          PetFamily
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Menú responsive */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLinkClick}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/servicios" onClick={handleLinkClick}>
                Servicios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vacunas" onClick={handleLinkClick}>
                Vacunas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bano-peluqueria" onClick={handleLinkClick}>
                Baño y Peluquería
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto" onClick={handleLinkClick}>
                Contacto
              </Link>
            </li>
            {/* Login / Dashboard */}
            {!user ? (
              <li className="nav-item">
                <Link
                  className="nav-link btn btn-warning text-dark ms-2"
                  to="/login"
                  onClick={handleLinkClick}
                >
                  Iniciar Sesion
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link btn btn-success text-dark ms-2"
                    to="/dashboard"
                    onClick={handleLinkClick}
                  >
                    Reservar Cita
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-danger text-white ms-2"
                    onClick={() => { onLogout(); handleLinkClick(); }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
