import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate



function DeleteService(props) {
  const { resourceId } = props; // Obtén el ID del recurso desde las props
  const navigate = useNavigate(); // Usa useNavigate para acceder a la función de navegación
  
  

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleDelete = () => {
    // Realizar la solicitud DELETE a la API utilizando el ID del recurso
    fetch(`/api/v2/services/${resourceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Agrega los encabezados adicionales según tus necesidades
      },
    })
      .then(response => {
        if (response.ok) {
          // Realizar cualquier acción necesaria después de la eliminación
          console.log('Solicitud de eliminación exitosa');
           window.location.reload();
        } else {
          console.error('Error en la solicitud de eliminación');
        }
      })
      .catch(error => {
        console.error('Error en la solicitud de eliminación', error);
      });

    toggle(); // Cerrar el modal después de la eliminación (ajusta según tus necesidades)
  };
  
  
  
    const handleEdit = async () => {
    try {
      const response = await fetch(`/api/v2/services/${resourceId}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos del recurso');
      }
      const data = await response.json();
      // Redirigir a la página de edición con los datos del recurso
      navigate('/services/edit', { state: { data } });
    } catch (error) {
      console.error('Error al obtener los datos del recurso', error);
    }
  };
  
  return (
    <div>
      <ButtonGroup>
        <Button color="info" onClick={handleEdit}>Editar</Button>
        <Button color="danger" onClick={toggle}>
          Eliminar
        </Button>
      </ButtonGroup>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>Delete Request</ModalHeader>
        <ModalBody>Are you sure you want to delete this service?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleDelete}>
            Yes
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteService;