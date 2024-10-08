import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Swal from 'sweetalert2';


function Clientes() {

  const[telefono, setTelefono] = useState("");
  const[nombre, setNombre] = useState();
  const[buyer, setBuyer] = useState("");
  const[foldernum, setFoldernum] = useState("");
  const[id, setId] = useState();
  

  const[editar, setEditar] = useState(false);

  const [clientesList,setClientes] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);

  useEffect(() => {
    getClientes();
  }, [])

  const add = ()=> {
    if (!telefono || !nombre || !buyer || !foldernum){
      return;
    }
// Validar cliente existente por telefono

    getClientes();
    const telefonoExiste = clientesList.find(val => {
      return val.telefono === telefono
    })
    if (telefonoExiste) {
      limpiarCampos();
        Swal.fire({
          title: "<strong>El Cliente ya Existe!</strong>",
          html: "<i>El Telefono <strong>"+telefono+"</strong> ya está Registrado!</i>",
          icon: 'error',
          timer:5000
        });
      return;
    }
      
      
    const bodyCarga = {
 
      telefono:telefono,
      nombre:nombre,
      buyer:buyer,
      foldernum:foldernum
    }

    Axios.post(`https://krriers.moveurads.com/clientes`,bodyCarga).then(()=>{
        getClientes();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro Existo!!!</strong>",
          html: "<i>El Cliente <strong>"+nombre+"</strong> fue Registrado con Exito!!!</i>",
          icon: 'success',
          timer:3000
        });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró Dar de Alta al cliente!",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
        timer: 3000
      });

    });

  }

  const update = ()=> {
    const bodyCargaPut = {
      id:id,
      telefono:telefono,
      nombre:nombre,
      buyer:buyer,
      foldernum:foldernum
    }
    Axios.put(`https://krriers.moveurads.com/clientes`,bodyCargaPut).then(()=>{
        getClientes();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualización Exitosa!!!</strong>",
          html: "<i>El Cliente <strong>"+nombre+"</strong> fue Actualizado con Exito!!!</i>",
          icon: 'success',
          timer:3000
        });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró Actualizar al cliente!",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
        timer: 3000
      });

    })

  }

  const deleteCliente = (val)=> {

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
        Axios.delete(`https://krriers.moveurads.com/clientes/${val.id}`).then(()=>{
          getClientes();
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
          text: "No se logró Eliminar al cliente!",
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
          timer: 3000
        });

      })
        
      }
    });
   
  }

  const limpiarCampos = ()=> {
    setNombre("");
    setBuyer("");
    setFoldernum("");
    setTelefono("");
    setId("");
    setEditar(false);
  }

const editarCliente = (val)=>{
  setEditar(true);

  setId(val.id);
  setTelefono(val.telefono);
  setNombre(val.nombre);
  setBuyer(val.buyer);
  setFoldernum(val.foldernum);
    

}

  const getClientes = ()=> {
    Axios.get(`https://krriers.moveurads.com/clientes`).then((response)=>{
        setClientes(response.data);
        setFilteredClients(response.data);
    });

  } 


  useEffect(() => {
    console.log(telefono)
    const filteredItems = clientesList.filter((client) => {
      return client.telefono.includes(telefono)
    })
    setFilteredClients(filteredItems)
  }, [telefono])
  
    return (
      <div className="container"> 
             
    <div className="card text-center">
     <div className="card-header">
     MANTENIMIENTO BASE DE DATOS CLIENTES KRRIERS
    </div>
    <div className="card-body">
      <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1">Telefono:</span>
         <PhoneInput
         placeholder="Telefono" value={telefono} onChange={setTelefono} defaultCountry='US' international
          ></PhoneInput>


      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
         <input type="text" 
         maxLength={45}
         onChange={(event)=>{
          setNombre(event.target.value);
          }}
         className="form-control" value={nombre} placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Buyer:</span>
         <input type="text" 
         maxLength={10}
         onChange={(event)=>{
          setBuyer(event.target.value);
          }}
         className="form-control" value={buyer} placeholder="Numero de Buyer" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Numero de Folder:</span>
         <input type="text" 
         maxLength={4}
         onChange={(event)=>{
          setFoldernum(event.target.value);
          }}
         className="form-control" value={foldernum} placeholder="Numero de Folder" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>
      
                     
    </div>
    <div className="card-footer text-muted">
          {
              editar? 
              <div>
                <button className='btn btn-outline-warning m-2' onClick={update}>Actualizar</button> 
              <button className='btn btn-outline-dark m-2' onClick={limpiarCampos}>Cancelar</button>
                </div>
              :<button className='btn btn-outline-success' onClick={add}>Registrar</button>
          }
          

    
  </div>
    
<table className="table table-borderless table-hover" style={{overflowY: 'scroll', maxHeight: '310px', display: 'inline-block', paddingLeft: '260px'}}>
    <thead class="sticky-top">
        <tr>
          <th scope="col">Telefono</th>
          <th scope="col">Nombre</th>
          <th scope="col">Numero de Buyer</th>
          <th scope="col">Numero de Folder</th>
          <th scope="col">Acción</th>
          
        </tr>
      </thead>
      <tbody>

    {
      filteredClients.map((val,key)=>{
                return <tr key={val.id}>
                        <th scope="row">{val.telefono}</th>
                        <td>{val.nombre}</td>
                        <td>{val.buyer}</td>
                        <td>{val.foldernum}</td>
                        <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" 
                          onClick={()=>{
                            editarCliente(val);
                            }}   
                          className="btn btn-outline-primary">Editar</button>
                          <button type="button" onClick={()=>{
                            deleteCliente(val);
                          }} className="btn btn-outline-danger">Eliminar</button>
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

export default Clientes;

