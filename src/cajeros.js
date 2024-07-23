import './App.css';
import { useState, useEffect } from "react"
import Axios from "axios";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2';


function Cajeros() {

  const[nombre, setNombre] = useState("");
  const[password, setPassword] = useState("");
  const[id, setId] = useState();
    

  const[editar, setEditar] = useState(false);

  const [cajerosList,setCajeros] = useState([]);
  const [filteredCajeros, setFilteredCajeros] = useState([]);


  useEffect(() => {
    getCajeros();
  }, [])

  const add = ()=> {
    if (!nombre || !password){
      return;
    }
    if (password.length < 6){
        return;
      }
    Axios.post("http://localhost:3001/cajeros",{

      nombre:nombre,
      password:password
      

    }).then(()=>{
        getCajeros();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro Existo!!!</strong>",
          html: "<i>El Cajero <strong>"+nombre+"</strong> fue Registrado con Exito!!!</i>",
          icon: 'success',
          timer:3000
        });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró Dar de Alta al cajero!",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
        timer: 3000
      });

    });

  }

  const update = ()=> {
    Axios.put("http://localhost:3001/cajeros",{

      id:id,
      nombre:nombre,
      password:password
      
    }).then(()=>{
        getCajeros();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualización Exitosa!!!</strong>",
          html: "<i>El cajero <strong>"+nombre+"</strong> fue Actualizado con Exito!!!</i>",
          icon: 'success',
          timer:3000
        });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró Actualizar al cajero!",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
        timer: 3000
      });

    })

  }

  const deleteCajero = (val)=> {

    Swal.fire({
      title: "Confirmar Eliminar?",
      html: "<i>Realmente desea eliminar a <strong>"+val.nombre+"</strong></i>",
      text: "No Podremos deshacer esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/cajeros/${val.id}`).then(()=>{
          getCajeros();
          limpiarCampos();
          Swal.fire({
            icon: "success",
            title: val.nombre+ ' fue eliminado',
            showConfirmButton: false,
            timer: 2000
          });
      }).catch(function(error){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se logró Eliminar al cajero",
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
          timer: 3000
        });

      })
        
      }
    });
   
  }

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

  const getCajeros = ()=> {
    Axios.get("http://localhost:3001/cajeros").then((response)=>{
        setCajeros(response.data);
        setFilteredCajeros(response.data);
    });

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
   MANTENIMIENTO DE BASE DE DATOS DE USUARIOS de KRRIERS
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
            editar? 
            <div>
              <button className='btn btn-warning m-2' onClick={update}>Actualizar</button> 
            <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
              </div>
            :<button className='btn btn-success' onClick={add}>Registrar</button>
        }
        

  
</div>

<table className="table table-borderless table-hover" style={{overflowY: 'scroll', maxHeight: '600px', display: 'inline-block', paddingLeft: '450px'}}> 
  <thead class="sticky-top">
      <tr>
      <th scope="col">Usuario</th>
      <th scope="col">Acción</th>
      </tr>
    </thead>
    <tbody>

  {
    filteredCajeros.map((val,key)=>{
              return <tr key={val.id}>
                      
                      <th scope="row">{val.nombre}</th>
                      <td>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" 
                        onClick={()=>{
                          editarCajero(val);
                          }}   
                        className="btn btn-info">Editar</button> 
                        <button type="button" onClick={()=>{
                          deleteCajero(val);
                        }} className="btn btn-danger">Eliminar</button>
                      </div>
                        </td>
              </tr>
                   
            })

          }

                 
    </tbody>
</table>


</div>




  </div>



// 


);
}

export default Cajeros;

