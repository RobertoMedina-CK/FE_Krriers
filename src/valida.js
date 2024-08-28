import './App.css';
import { useState, useEffect } from "react"
import Axios from "axios";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {login, getCurrentUser} from './authService';
import {useNavigate} from 'react-router-dom'

import Swal from 'sweetalert2';


function Valida() {

  const[nombre, setNombre] = useState("");
  const[password, setPassword] = useState("");
  const[id, setId] = useState();
  const navigate = useNavigate();
    

  const[editar, setEditar] = useState(false);

  const [cajerosList,setCajeros] = useState([]);
  const [filteredCajeros, setFilteredCajeros] = useState([]);


  useEffect(() => {
    getCajeros();
  }, [])

    
  
const limpiarCampos = ()=> {
    setNombre("");
    setPassword("");
    setId("");
    setEditar(false);
}

const editarCajero = (val)=>{
  setEditar(true);
  setId(val.id);
  setNombre(val.nombre);
  setPassword(val.password);  
}

const bodyCarga = {
 
    nombre:nombre,
    password:password
  }


const getCajeros = ()=> {

    Axios.get(`https://krriers.moveurads.com/cajerosauth`, bodyCarga).then((response)=>{
        setCajeros(response.data);
        setFilteredCajeros(response.data);
    });

} 

const valida = ()=> {
    login(nombre, password);
    getCajeros(nombre, password);
    const user = getCurrentUser();
    window.location.reload();
    if(user?.user) {
        navigate('/');
    }
}


const onClientCajerosChange = (NombreValue) => {
    NombreValue = NombreValue.toLowerCase();
    const filteredItems =cajerosList.filter((client) => {
      return client.nombre.toLowerCase().includes(NombreValue)
    })
    setFilteredCajeros(filteredItems)
}

return (
  <div className="container"> 
           
    <div className="card text-center">
      
        <div className="card-header">
        INICIAR SESION APP KRRIERS
        </div>

        <div className="card-body">
          
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Usuario:</span>
                <input type="text" 
                maxLength={45}
                onChange={(event)=>{
                  onClientCajerosChange(event.target.value);
                  setNombre(event.target.value);
                  }}
                className="form-control" value={nombre} placeholder="Usuario" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Password:</span>
                <input type="password" 
                maxLength={8}
                onChange={(event)=>{
                  setPassword(event.target.value);
                  }}
                className="form-control" value={password} placeholder="Contraseña min 6 max 8 caracteres" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
            
        </div>

        <div className="card-footer text-muted">
              {
                   <div>
                      <button className='btn btn-outline-warning m-2' onClick={() => {valida()
                        window.location.href = '/';
                      }}>Validar</button> 
                      <button className='btn btn-outline-dark m-2' onClick={limpiarCampos}>Cancelar</button>
                  </div>
              }
        </div>
      </div>
  </div>



// 


);
}

export default Valida;

