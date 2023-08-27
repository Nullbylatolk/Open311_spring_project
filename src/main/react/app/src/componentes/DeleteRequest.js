import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function DeleteRequest(props) {
  const { resourceId } = props;
  const navigate = useNavigate(); // Usa useNavigate para acceder a la función de navegación

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleDelete = () => {
    // Realizar la solicitud DELETE a la API utilizando el ID del recurso
    fetch(`/api/v2/requests/${resourceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          console.log('Solicitud de eliminación exitosa');
          window.location.reload();
        } else {
          console.error('Error en la solicitud de eliminación');
        }
      })
      .catch(error => {
        console.error('Error en la solicitud de eliminación', error);
      });

    toggle();
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/v2/requests/${resourceId}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos del recurso');
      }
      const data = await response.json();
      // Redirigir a la página de edición con los datos del recurso
      navigate('/request/edit', { state: { data } });
    } catch (error) {
      console.error('Error al obtener los datos del recurso', error);
    }
  };

  return (
    <div>
      <ButtonGroup>
        <Button color="info" onClick={handleEdit}>
          Editar
        </Button>
        <Button color="danger" onClick={toggle}>
          Eliminar
        </Button>
      </ButtonGroup>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>Delete Request</ModalHeader>
        <ModalBody>Are you sure you want to delete this request?</ModalBody>
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

export default DeleteRequest;