import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
export default function Footer() {
  return (
    <footer
      className="text-white mt-4 p-4"
      style={{
        background: "linear-gradient(90deg, #0d6efd, #6c63ff)",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-4 text-center text-md-start mb-3 mb-md-0">
            <a
              href="https://www.facebook.com/login/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://www.instagram.com/accounts/login/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://web.whatsapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
            >
              <FaWhatsapp size={24} />
            </a>
          </div>
          <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
            <h5 className="mb-0">PetFamily</h5>
          </div>
          <div className="col-12 col-md-4 text-center text-md-end">
            © 2025 PetFamily - Todos los derechos reservados
          </div>
        </div>
      </div>
    </footer>
  );
}
