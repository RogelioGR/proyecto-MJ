import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header : React.FC = () => {
  return (
    <header className="d-flex justify-content-end align-items-center p-2 border-bottom">

      <div className="user-info d-flex align-items-center">
      <span className="fw-bold">Gestor de Usuario</span>
        <div className="ms-2">
          <br />
        </div>
      </div>
    </header>
  );
};

export default Header;
