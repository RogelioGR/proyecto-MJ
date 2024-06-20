import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { User } from './user';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  user: User | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, user, onInputChange }) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={user?.nombre || ''}
              onChange={onInputChange}
              placeholder="Ingrese su nombre"
            />
          </Form.Group>
          <Form.Group controlId="formCorreo">
            <Form.Label>nombre de usuario</Form.Label>
            <Form.Control
              type="email"
              name="user"
              value={user?.user || ''}
              onChange={onInputChange}
              placeholder="usuario"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={onSave}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
