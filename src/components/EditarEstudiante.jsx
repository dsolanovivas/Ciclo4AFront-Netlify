import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form"
import { AlertDescription } from "./AlertDescription"
import apiInstance from '../AxiosConect';
import { ESTUDIANTES_ENDPOINTS } from "./GlobalConstants"


export const EditarEstudiante = (props) => {

  const [myName, setMyName] = useState("");
  const [myEmail, setMyEmail] = useState("");
  const [myId, setMyId] = useState("");

  useEffect(()=>{
    setMyName(props.obj.nombre);
    setMyEmail(props.obj.email);
    setMyId(props.obj.cedula);
  }, [props.obj.nombre, props.obj.email, props.obj.cedula])

  function editarRegistro(e){
    e.preventDefault();
    //Aqui Se envian los datos al servidor (API REST)
    apiInstance.put(ESTUDIANTES_ENDPOINTS.ACTUALIZAR_ESTUDIANTE + "/" + props.obj._id,{
      nombre:myName,
      email:myEmail,
      cedula:myId,
    }).then((res)=>{
      AlertDescription('Correcto', 'Se Registro el estudiante', 'success');
    }).catch((error)=>{
      AlertDescription("Upps!","problemas al actualizar el estudiante","error");
    });
    props.RData();
    props.handleCloseModal();
  }

  function cerrarEdicion(){
    alert("Cerro la edicion")
    props.handleCloseModal();
  }

  return (
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={true}>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Editar Estudiante
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="form-wrapper">
                <Form id="form_editarEstudiante">
                    <Form.Group controlId="Name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" defaultValue={props.obj.nombre} onBlur={(e) => setMyName(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Email">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control type="email" defaultValue={props.obj.email} onBlur={(e) => setMyEmail(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Id">
                    <Form.Label>Cedula</Form.Label>
                    <Form.Control type="text" defaultValue={props.obj.cedula} onBlur={(e) => setMyId(e.target.value)}></Form.Control>
                    </Form.Group>
                </Form>
            </div>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" size="lg" block="block" onClick={cerrarEdicion} className="mt-4"> Close</Button>
            <Button size="lg" block="block" type="submit" onClick={editarRegistro} className="mt-4">Editar</Button>
        </Modal.Footer>
        
        
    </Modal>
  )
}
