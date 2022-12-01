import React, { useState, useEffect } from 'react'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export const ToastEstudiante = (props) => {

  const [showToast, setShowToast] = useState(false);

  useEffect(() => { 
    setShowToast(true)

    setTimeout(() => setShowToast(false),props.duracion)
  }, []);

  return (
    <div>
    {showToast === true && 
    <ToastContainer position="top-end" className="p-3">
    <Toast onClose={() => setShowToast(false)}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">{props.Title}</strong>
      </Toast.Header>
      <Toast.Body>{props.Msg}</Toast.Body>
    </Toast>
    </ToastContainer>
    }
    
    </div>
  )
}
