import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { User } from './user';

interface CreateUserModalProps {
  open: boolean;
  user: User;
  onClose: () => void;
  onSave: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ open, user, onClose, onSave, onChange }) => {
  return (
    <Modal show={open} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Crear Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={user.nombre}
              onChange={onChange}
              placeholder="Ingrese su nombre"
            />
          </Form.Group>
          <Form.Group controlId="formCorreo">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              name="user"
              value={user.user}
              onChange={onChange}
              placeholder="Ingrese su correo"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={user.password}
              onChange={onChange}
              placeholder="Ingrese su contraseña"
            />
          </Form.Group>
          <Form.Group controlId="formRol">
            <Form.Label>Rol</Form.Label>
            <Form.Control
              type="text"
              name="fkRol"
              value={user.fkRol}
              onChange={onChange}
              placeholder="Ingrese su rol"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={onSave}>Crear</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUserModal;
