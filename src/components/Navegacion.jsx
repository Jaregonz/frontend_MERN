import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Navegacion = ({isAuthenticated}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div>
      {/* Navbar de Bootstrap con logo y nombre */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <span className="ms-2">API MERN</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/CrearUsuario">
                  Registrar Usuario
                </Link>
              </li>
              
              {
                isAuthenticated ? (
                  <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Lista de Usuarios
                  </Link>
                </li>
                ): ""
              }

              {
                isAuthenticated ? (
                  <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={(e) => {
                      e.preventDefault(); 
                      handleLogout();
                  }}>
                    Cerrar Sesión
                  </Link>
                </li>
                ) : ""
              } 
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navegacion;
