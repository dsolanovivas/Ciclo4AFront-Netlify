import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CrearEstudiante } from './CrearEstudiante'
import { ListarEstudiantes } from './ListarEstudiantes'

export const Menu = (props) => {

  const getUsuario = () => {
    var Localsesion = localStorage.getItem("UserSesion");
    var sesion = sessionStorage.getItem("UserSesion");

    if (Localsesion){
      return JSON.parse(Localsesion).nombre + "-" + JSON.parse(Localsesion).email;
    }
    else if (sesion) {
      return JSON.parse(sesion).nombre + "-" + JSON.parse(sesion).email;
    }
    else {
      return "";
    }

  }

  const [usu] = useState(getUsuario());
  const [option, setOption] = useState("");

  function OnClickRegistrar(){
    setOption("CrearEstudiante")
  }

  function OnClickListar(){
    setOption("ListarEstudiantes")
  }

  function cerrarSesion(){
    localStorage.removeItem("UserSesion");
    sessionStorage.removeItem('UserSesion');
    document.getElementById("caja_menu").style.display = "none";
    document.getElementById("form_login").style.display = "block";
    document.getElementById("txtusu").value = "";
    document.getElementById("txtpass").value = "";
    document.getElementById("txtusu").focus();
  }

  return (
    <>
    <div id="caja_menu" style={{textAlign:"left"}}>
        <strong className='h3'>
          Bienvenido Usuario : {usu.toUpperCase()}
        </strong>

        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <div className='container-fluid'>
            <label className='navbar-brand h4'>Menú Principal</label>
            <button className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNavAltMarkup" 
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle Navigation">
                  <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <NavLink className="nav-link h5 text-center" onClick={OnClickRegistrar}>Registrar Estudiante</NavLink>
                <NavLink className="nav-link h5 text-center" onClick={OnClickListar}>Listar Estudiantes</NavLink>
                <a className="nav-link h5 text-center" style={{color:"blue"}} href=" " onClick={cerrarSesion}>Cerrar Sesión</a>
              </div>
            </div>
          </div>
        </nav>
    </div>
    
    <br/>

    { option === "CrearEstudiante" && <CrearEstudiante /> }
    { option === "ListarEstudiantes" && <ListarEstudiantes /> }

    </>
  )
}
