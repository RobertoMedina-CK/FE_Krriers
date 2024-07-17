import './App.css';
import { useState, useEffect } from "react"
import Axios from "axios";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2';


function Clientes() {

  const[telefono, setTelefono] = useState("");
  const[nombre, setNombre] = useState();
  const[buyer, setBuyer] = useState("");
  const[foldernum, setFoldernum] = useState("");
  const[id, setId] = useState();
  

  const[editar, setEditar] = useState(false);

  const [clientesList,setClientes] = useState([]);

  useEffect(() => {
    getClientes();
  }, [])

  const add = ()=> {
    if (!telefono || !nombre || !buyer || !foldernum){
      return;
    }
    Axios.post("http://localhost:3001/clientes",{

      telefono:telefono,
      nombre:nombre,
      buyer:buyer,
      foldernum:foldernum
    }).then(()=>{
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
    Axios.put("http://localhost:3001/clientes",{

        id:id,
        telefono:telefono,
        nombre:nombre,
        buyer:buyer,
        foldernum:foldernum
    }).then(()=>{
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
        Axios.delete(`http://localhost:3001/clientes/${val.id}`).then(()=>{
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
    Axios.get("http://localhost:3001/clientes").then((response)=>{
        setClientes(response.data);
    });

  } 
  
    return (
      <div className="container"> 
             
    <div className="card text-center">
     <div className="card-header">
     MANTENIMIENTO DE BASE DE DATOS DE CLIENTES de KRRIERS
    </div>
    <div className="card-body">
      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Telefono:</span>
         <input type="text" 
         maxLength={14}
         onChange={(event)=>{
          setTelefono(event.target.value);
          }}
         className="form-control" value={telefono} placeholder="Ingrese Teléfono" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
         <input type="text" 
         maxLength={45}
         onChange={(event)=>{
          setNombre(event.target.value);
          }}
         className="form-control" value={nombre} placeholder="Ingrese Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Buyer:</span>
         <input type="text" 
         maxLength={10}
         onChange={(event)=>{
          setBuyer(event.target.value);
          }}
         className="form-control" value={buyer} placeholder="Ingrese Numero de Buyer" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Numero de Folder:</span>
         <input type="text" 
         maxLength={4}
         onChange={(event)=>{
          setFoldernum(event.target.value);
          }}
         className="form-control" value={foldernum} placeholder="Ingrese Numero de Folder" aria-label="Username" aria-describedby="basic-addon1"/>
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
    
<table className="table table-striped">
    <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Telefono</th>
          <th scope="col">Nombre</th>
          <th scope="col">Numero de Buyer</th>
          <th scope="col">Numero de Folder</th>
          
        </tr>
      </thead>
      <tbody>

    {
      clientesList.map((val,key)=>{
                return <tr key={val.id}>
                        <th scope="row">{val.id}</th>
                        <td>{val.telefono}</td>
                        <td>{val.nombre}</td>
                        <td>{val.buyer}</td>
                        <td>{val.foldernum}</td>
                        <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" 
                          onClick={()=>{
                            editarCliente(val);
                            }}   
                          className="btn btn-info">Editar</button>
                          <button type="button" onClick={()=>{
                            deleteCliente(val);
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

export default Clientes;
