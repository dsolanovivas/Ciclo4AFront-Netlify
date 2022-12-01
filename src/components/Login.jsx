import React, { useState } from 'react'
import { Menu } from './Menu'
import { ToastEstudiante } from "./ToastEstudiante"
import apiInstance from '../AxiosConect';
import { USER_ENDPOINTS } from "./GlobalConstants"
import { AlertDescription } from "./AlertDescription"

export const Login = () => {

  const comprobarSesion = () => {
    var Localsesion = localStorage.getItem("UserSesion");
    var sesion = sessionStorage.getItem("UserSesion");

    if (Localsesion || sesion) {
        return true;
    }
    else{
        return false;
    }
  }

  const [miLogin, setMiLogin] = useState(comprobarSesion());
  const [miUser, setMiUser] = useState("");
  const [miPass, setMiPass] = useState("");

  function iniciarSesion(e){
    e.preventDefault();
    let usuario = document.getElementById("txtusu").value;
    let contrasena = document.getElementById("txtpass").value;
    if (usuario.length === 0 || contrasena.length === 0){
        alert("Complete los datos de manera correcta");
    }
    else{
        apiInstance.post(USER_ENDPOINTS.LOGIN,{
            email: miUser,
            password: miPass
        })
        .then((res)=>{
            AlertDescription("Correcto", "Inicio de Sesion Exitoso", "success");
            document.getElementById("form_login").style.display = "none";

            let data = {
                nombre : res.data.usuario.nombre,
                email : res.data.usuario.email,
                token : res.data.token,
                expiredAt : CalcularExpiredAt()
            }

            setMiLogin(JSON.stringify(data));
            let valueCheck = document.getElementById("keep").checked;
            (valueCheck === true) ?  localStorage.setItem("UserSesion", JSON.stringify(data)) : sessionStorage.setItem("UserSesion", JSON.stringify(data))

        })
        .catch((error)=>{
            AlertDescription("Upps!", "Usuario o contraseña incorrectos", "error");
            document.getElementById("txtusu").value = "";
            document.getElementById("txtpass").value = "";
            document.getElementById("txtusu").focus();
        });
    }
  }

  function CalcularExpiredAt(){
    var currenDate = new Date();
    var time = currenDate.getTime();
    var addMlSeconds = 1000 * 60 * 55;
    var newDate = new Date(time + addMlSeconds);
    console.log(currenDate);
    console.log(newDate);
    return newDate;
  }


  return (
    <div className="container" style={{background: "ligthgray", marginTop:20, padding:20}}>
        
        {<ToastEstudiante Title={"Bienvenido"} Msg={"Ingrese a nuestro sistema de estudiantes"} duracion={4000}></ToastEstudiante>}
        
        { miLogin === false ?

        <form id="form_login" style={{paddingLeft: 500, paddingRight: 500}} >
            <div>
                <h1>Login</h1>
                <label>Username:  </label>
                <input type="text" id="txtusu" style={{textAling:"center"}} onBlur={(e) => setMiUser(e.target.value)} className="form-control" required />
            </div>
            <div>
                <label>Password:  </label>
                <input type="password" id="txtpass" style={{textAling:"center"}} onBlur={(e) => setMiPass(e.target.value)} className="form-control" required />
            </div>
            <br/>
            <input type="submit" className="btn btn-primary" value="Ingresar" onClick={iniciarSesion}></input>
            <br/>
            <br/>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="keep" value=""></input>
                <label className="form-check-label">¿Desea mantener sesion?</label>
            </div>
        </form>

        : <Menu usuario={miUser} /> }
        
    </div>
  )
}
