import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navegacion from './components/Navegacion';
import CrearUsuarios from './components/CrearUsuarios';
import ListaUsuarios from './components/ListaUsuarios';
import LoginPage from './components/PaginaLogin';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  return (
    <>
      {<Navegacion isAuthenticated={isAuthenticated} />} 

      <div className='container p-4'>
        <Routes>
          <Route path="/" element={isAuthenticated ? <ListaUsuarios /> : <Navigate to="/login" />} />
          <Route path="/CrearUsuario" element={<CrearUsuarios isAuthenticated={isAuthenticated} />} />
          <Route path="/edit/:id" element={isAuthenticated ? <CrearUsuarios isAuthenticated={isAuthenticated} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage setAuth={setIsAuthenticated} />} />
        </Routes>
      </div>
      
    </>
  );
}

export default App;
