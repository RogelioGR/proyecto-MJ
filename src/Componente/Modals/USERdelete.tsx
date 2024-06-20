import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface DeleteUserModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ open, onClose, onDelete }) => {
  return (
    <Modal show={open} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>¿Estás seguro de que deseas eliminar este usuario?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="danger" onClick={onDelete}>Eliminar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserModal;
