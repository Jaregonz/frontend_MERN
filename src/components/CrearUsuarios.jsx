import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const CrearUsuario = ({isAuthenticated}) => {
  const valorInicial = {
    nombre: "",
    apellido: "",
    edad: 18,
    telefono: 6,
    correo: "",
    foto: "",
  };

  let { id } = useParams();

  const [usuario, setUsuario] = useState(valorInicial);
  const [foto, setFoto] = useState(null);
  const [subId, setSubId] = useState(id); 

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const capturarFoto = (e) => {
    setFoto(e.target.files[0]);
  };

  const guardarDatos = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", usuario.nombre);
    formData.append("apellido", usuario.apellido);
    formData.append("edad", usuario.edad);
    formData.append("telefono", usuario.telefono);
    formData.append("correo", usuario.correo);
    formData.append("password", usuario.password);
    if (foto) {
      formData.append("foto", foto);
    }

    try {
      await axios.post("https://backend-mern-yr4j.onrender.com/api/usuarios", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUsuario({ ...valorInicial });
      setFoto(null);
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  
  const actualizarUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", usuario.nombre);
    formData.append("apellido", usuario.apellido);
    formData.append("edad", usuario.edad);
    formData.append("telefono", usuario.telefono);
    formData.append("correo", usuario.correo);
    if (foto) {
      formData.append("foto", foto);
    }

    try {
      await axios.put(`https://backend-mern-yr4j.onrender.com/usuarios/${subId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });

      setUsuario({ ...valorInicial });
      setFoto(null); 
      setSubId("");
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    }
  };

  const obtUno = async (id) => {
    try {
      const res = await axios.get(`https://backend-mern-yr4j.onrender.com/api/usuarios/${id}`);
      setUsuario({
        nombre: res.data.nombre,
        apellido: res.data.apellido,
        edad: res.data.edad,
        telefono: res.data.telefono,
        correo: res.data.correo,
      });
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  };

  useEffect(() => {
    if (subId) {
      obtUno(subId);
    }
  }, [subId]);

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <form onSubmit={guardarDatos}>
          <h2 className="text-center mb-3">Nuevo Usuario</h2>
          <div className="mb-3">
            <label>Nombre:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa el nombre del socio"
              required
              name="nombre"
              value={usuario.nombre}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Apellido:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa el apellido del socio"
              required
              name="apellido"
              value={usuario.apellido}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Edad:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Ingresa la edad del socio"
              required
              name="edad"
              value={usuario.edad}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Teléfono:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Ingresa el teléfono del socio"
              required
              name="telefono"
              value={usuario.telefono}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Correo:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa el correo del socio"
              required
              name="correo"
              value={usuario.correo}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Contraseña:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              required
              name="password"
              value={usuario.password}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Foto del socio:</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={capturarFoto}
            />
          </div>
          <div className="text-center">
            <button className="btn btn-dark">Guardar</button>
          </div>
        </form>
        {
          isAuthenticated && (
            <form onSubmit={actualizarUser} className="text-center">
              <button className="btn btn-dark mt-2">Actualizar</button>
            </form>
          )
        }
      </div>
    </div>
  );
};

export default CrearUsuario;
