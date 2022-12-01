import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { AlertDescription } from "./AlertDescription"
import apiInstance from '../AxiosConect';
import { ESTUDIANTES_ENDPOINTS } from "./GlobalConstants"

export const FilaEstudiante = (props) => {

  function borrarEstudiante(){
    // Aqui se debe implementar el llamado a eliminar estudiante en API REST
    apiInstance
      .delete(ESTUDIANTES_ENDPOINTS.ELIMINAR_ESTUDIANTE + "/" + props.obj._id)
      .then((res)=>{
        AlertDescription('Correcto', 'Estudiante eliminado exitosamente', 'success');
      })
      .catch((error)=>{
        AlertDescription("Upps!","Problemas al eliminar el estudiante","error");
        console.log(error);
      });

    props.RData();
  }

  function editarEstudiante(e){
    e.preventDefault();
    props.handleOpenModal(props.obj);
  }

  return (
    <>
    <tr>
        <td>{props.obj.nombre}</td>
        <td>{props.obj.email}</td>
        <td>{props.obj.cedula}</td>
        <td>
            <Link className="edit-link" onClick={editarEstudiante} >Editar</Link>
            &nbsp;
            <Button onClick={borrarEstudiante} size="sm" variant="danger">Borrar</Button>
        </td>
    </tr>

    </>
  )
}

