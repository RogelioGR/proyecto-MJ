import React, { useState, useEffect } from 'react';
import { Button, Table, Container } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';


/*Componentes */
import Header from './Componente/Header';
import Footer from './Componente/Footer';
import CreateUserModal from './Componente/Modals/USERcreate';
import EditModal from './Componente/Modals/USERedit';
import DeleteUserModal from './Componente/Modals/USERdelete';

const APP: React.FC = () => {

  const BASE_URL = "https://localhost:7278/UsuarioControlador";

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newUser, setNewUser] = useState<User>({ pkUsuario: 0, nombre: '', user: '', password:'', fkRol:0 });
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);


  interface User {
    pkUsuario: number;
    nombre: string;
    user: string;
    password: string;
    fkRol: number;
  }

  interface ApiResponse {
    succeded: boolean;
    message: string | null;
    result: User[];
  }

  useEffect(() => {
    axios.get<ApiResponse>(BASE_URL)
      .then(response => {
        if (response.data.succeded) {
          setUsers(response.data.result);
        } else {
          setError('Error: API request was not successful');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const handleEditOpen = (user: User) => {
    setEditUser(user);
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setEditUser(null);
  };

  const handleDeleteOpen = (id: number) => {
    setSelectedUserId(id);
    setIsDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
    setSelectedUserId(null);
  };

  const handleCreateOpen = () => {
    setIsCreateOpen(true);
  };

  const handleCreateClose = () => {
    setIsCreateOpen(false);
    setNewUser({ pkUsuario: 0, nombre: '', user: '', password:'', fkRol:0 });
  };

  const handleEditSave = () => {
    if (editUser) {
      axios.put(`${BASE_URL}/${editUser.pkUsuario}`, editUser)
        .then(response => {
          if (response.data.succeded) {
            setUsers(users.map(user => user.pkUsuario === editUser.pkUsuario ? editUser : user));
            handleEditClose();
          } else {
            setError('Error: Failed to update user');
          }
        })
        .catch(error => {
          setError(error.message);
        });
    }
  };

  const handleDelete = () => {
    if (selectedUserId) {
      axios.delete(`${BASE_URL}/${selectedUserId}`)
        .then(response => {
          if (response.data.succeded) {
            setUsers(users.filter(user => user.pkUsuario !== selectedUserId));
            handleDeleteClose();
          } else {
            setError('Error: Failed to delete user');
          }
        })
        .catch(error => {
          setError(error.message);
        });
    }
  };

  const handleCreateSave = () => {
    axios.post(BASE_URL, newUser)
      .then(response => {
        if (response.data.succeded) {
          setUsers([...users, response.data.result]);
          handleCreateClose();
        } else {
          setError('Error: Failed to create user');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isEditOpen && editUser) {
      setEditUser({ ...editUser, [name]: value });
    } else if (isCreateOpen) {
      setNewUser({ ...newUser, [name]: value });
    }
  };
  if (error) return <p>Error: {error}</p>;


 

  return (
    <>
   
        <div className="d-flex vh-100">
     
          <div className="flex-grow-1 d-flex flex-column">
            <Header />
            <Container className="mt-5">
              <h1 className="mb-4">Bienvenido</h1>
              <div className="d-flex justify-content-end align-items-center mt-4">
                <Button variant="success" className="mb-3" onClick={handleCreateOpen}>
                <i className="bi bi-plus-lg"></i> Agregar usuario
                  
                </Button>
              </div>
              <Table striped bordered hover className="mt-4">
                <thead className="text-center">
                  <tr>
                  
                    <th>id</th>
                    <th>nombre </th>
                    <th>nombre de usuario</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                {users.map(user => (
                      <tr key={user.pkUsuario}>
                      
                        <td>{user.pkUsuario}</td>
                        <td>{user.nombre}</td>
                        <td>{user.user}</td>
                        <td>
                          <div className="d-flex justify-content-center m-1">
                            <Button variant="warning" className="me-2"  onClick={() => handleEditOpen(user)}>
                            <i className="bi bi-pencil-fill"></i>
                            </Button>
                            <Button variant="danger" className="me-2" onClick={() => handleDeleteOpen(user.pkUsuario)}>
                            <i className="bi bi-trash"></i>
                            </Button>
                          
                         
                          </div>
                        </td>
                      </tr>
                    ))}
                   
                </tbody>
              </Table>
              
            </Container>
            <Footer />
          </div>
        </div>
      
      {/* Modals */}
      <CreateUserModal
        open={isCreateOpen}
        user={newUser}
        onClose={handleCreateClose}
        onSave={handleCreateSave}
        onChange={handleInputChange}
      />
      <EditModal
        isOpen={isEditOpen}
        user={editUser}
        onClose={handleEditClose}
        onSave={handleEditSave}
        onInputChange={handleInputChange}
      />
         <DeleteUserModal
        open={isDeleteOpen}
        onClose={handleDeleteClose}
        onDelete={handleDelete}
      />
     
    </>
  );
};

export default APP;
