import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Autos from './autos'
import Clientes from './clientes'
import Subastas from './subastas'
import Transportistas from './transportistas.js'
import Cajeros from './cajeros.js'
import Llegada from './llegada.js'
import Asigna from './asignatransportista.js'
// import Wasa from './wasa.js'
import { FaHome} from "react-icons/fa";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Outlet,
} from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
function GFGHome() {
  const logoUrl = './truck.png'; 
  return (
       <div className="page">
          <h2><center>Sistema para Automatizar las operaciones de Krriers</center></h2>
          <img src={logoUrl}  
          width="1500" height="650" 
          alt="Logo" /> 
      </div>
  );
}

function NotFound() {
  return (
      <div>
          <h2>404 Not Found</h2>
          <p>Sorry, the page you are looking for does not exist.</p>
      </div>
  );
}

function App() {
  const logoUrl = './logo.png'; 
  return (
<Router>
<Navbar bg="dark" expand="lg" 
                variant="dark" 
                className="container-fluid"> 
                <Navbar.Brand href="#home"> 
                <img src={logoUrl}  
                     width="120" height="50" 
                     alt="Logo" /> 
                </Navbar.Brand> 
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/" className="nav-link">
                        <FaHome /> Home
                        </Nav.Link>
                        <NavDropdown title="Clientes">
                            <NavDropdown.Item as={Link} to="/caja">
                               Caja
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/llegada">
                                Llegada de Autos
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="https://whatsform.com/webhooktest" target="_blank" rel="noreferrer noopener">
                                Captura Pedidos
                            </NavDropdown.Item>
                            </NavDropdown>
                        <NavDropdown title="Transportistas">
                            <NavDropdown.Item as={Link} to="/asigna">
                                Asignación a Transportistas
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/pago">
                                Pago a Transportistas
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Reportes">
                            <NavDropdown.Item as={Link} to="/wasa">
                                Whatsapp Mensaje
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/pagotransportistas">
                                Pago a Transportistas
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/pedidosfecha">
                                Pedidos por fecha
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/pedidossinasignar">
                                Pedidos sin Asignar
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Mantenimiento a BD">
                            <NavDropdown.Item as={Link} to="/clientes">
                                Clientes
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/transportistas">
                                Transportistas
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/subastas">
                                Subastas
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/autos">
                                Autos
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/cajeros">
                                Usuarios
                            </NavDropdown.Item>
                            </NavDropdown>
                      </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Outlet />}>
                        <Route index element={<GFGHome />} />
                        <Route path="/autos" element={<Autos />} />
                        <Route path="/clientes" element={<Clientes />} />
                        <Route path="/transportistas" element={<Transportistas />} />
                        <Route path="/subastas" element={<Subastas />} />
                        <Route path="/cajeros" element={<Cajeros />} />
                        <Route path="/llegada" element={<Llegada />} />
                        <Route path="/asigna" element={<Asigna />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </div>
        </Router>

  )
}
export default App;


