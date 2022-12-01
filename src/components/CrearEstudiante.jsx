import React, { useState } from 'react'
import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button'
import { AlertDescription } from "./AlertDescription"
import apiInstance from '../AxiosConect';
import { ESTUDIANTES_ENDPOINTS } from "./GlobalConstants"


export const CrearEstudiante = () => {

  const [myName, setMyName] = useState("");
  const [myEmail, setMyEmail] = useState("");
  const [myId, setMyId] = useState("");

  function enviarRegistro(e){
    e.preventDefault();
    //Aqui Se envian los datos al servidor (API REST)
    apiInstance
      .post(ESTUDIANTES_ENDPOINTS.CREAR_ESTUDIANTE,{
        nombre: myName,
        email: myEmail,
        cedula: myId
      })
      .then((res) =>{
        AlertDescription('Correcto', 'Estudiante creado exitosamente', 'success');
        console.log(res);
      })
      .catch((error)=>{
        AlertDescription("Upps!","Problemas al crear estudiante","error");
        console.log(error);
      });

      document.getElementById("Name").value = "";
      document.getElementById("Email").value = "";
      document.getElementById("Id").value = "";
  }

  return (
    <div className="form-wrapper">
      <Form id="form_crearEstudiante" onSubmit={enviarRegistro}>
        <Form.Group controlId="Name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" onBlur={(e) => setMyName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" onBlur={(e) => setMyEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId="Id">
          <Form.Label>Cedula</Form.Label>
          <Form.Control type="text" onBlur={(e) => setMyId(e.target.value)}></Form.Control>
        </Form.Group>

        <Button size="lg" block="block" type="submit" className="mt-4">Crear Estudiante</Button>

      </Form>
    </div>
  )
}
