import './App.css';
import { useState, useEffect } from "react"
import Axios from "axios";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2';


function Subastas() {

  const[telefono, setTelefono] = useState("");
  const[nombre, setNombre] = useState();
  const[direccion, setDireccion] = useState("");
  const[subasta, setSubasta] = useState("");
  const[precio, setPrecio] = useState();
  const[id, setId] = useState();
    

  const[editar, setEditar] = useState(false);

  const [subastasList,setSubastas] = useState([]);

  useEffect(() => {
    getSubastas();
  }, [])

  const add = ()=> {
    if (!telefono || !nombre || !direccion || !subasta || !precio){
      return;
    }
    Axios.post("http://localhost:3001/subastas",{

      telefono:telefono,
      nombre:nombre,
      direccion:direccion,
      subasta:subasta,
      precio:precio

    }).then(()=>{
        getSubastas();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro Existo!!!</strong>",
          html: "<i>La Subasta <strong>"+nombre+"</strong> fue Registrada con Exito!!!</i>",
          icon: 'success',
          timer:3000
        });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró Dar de Alta la subasta!",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
        timer: 3000
      });

    });

  }

  const update = ()=> {
    Axios.put("http://localhost:3001/subastas",{

      id:id,
      telefono:telefono,
      nombre:nombre,
      direccion:direccion,
      subasta:subasta,
      precio:precio
      
    }).then(()=>{
        getSubastas();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualización Exitosa!!!</strong>",
          html: "<i>La subasta <strong>"+nombre+"</strong> fue Actualizada con Exito!!!</i>",
          icon: 'success',
          timer:3000
        });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró Actualizar la subasta!",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
        timer: 3000
      });

    })

  }

  const deleteSubasta = (val)=> {

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
        Axios.delete(`http://localhost:3001/subastas/${val.id}`).then(()=>{
          getSubastas();
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
          text: "No se logró Eliminar la subasta!",
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
          timer: 3000
        });

      })
        
      }
    });
   
  }

  const limpiarCampos = ()=> {
    setNombre("");
    setDireccion("");
    setSubasta("");
    setPrecio("");
    setTelefono("");
    setId("");
    setEditar(false);
  }

const editarSubasta = (val)=>{
  setEditar(true);

  setId(val.id);
  setTelefono(val.telefono);
  setNombre(val.nombre);
  setDireccion(val.direccion);
  setSubasta(val.subasta);
  setPrecio(val.precio);
  
    

}

  const getSubastas = ()=> {
    Axios.get("http://localhost:3001/subastas").then((response)=>{
        setSubastas(response.data);
    });

  } 
  
    return (
      <div className="container"> 
             
    <div className="card text-center">
     <div className="card-header">
     MANTENIMIENTO DE BASE DE DATOS DE SUBASTAS de KRRIERS
    </div>
    <div className="card-body">
      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Telefono:</span>
         <input type="text" 
         maxLength={14}
         onChange={(event)=>{
          setTelefono(event.target.value);
          }}
         className="form-control" value={telefono} placeholder="Teléfono" aria-label="Username" aria-describedby="basic-addon1"/>
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
          <span className="input-group-text" id="basic-addon1">Direccion:</span>
         <input type="text" 
         maxLength={100}
         onChange={(event)=>{
          setDireccion(event.target.value);
          }}
         className="form-control" value={direccion} placeholder="Direccion Calle, Ciudad, Estado, C.P." aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Subasta:</span>
         <input type="text" 
         maxLength={12}
         onChange={(event)=>{
          setSubasta(event.target.value);
          }}
         className="form-control" value={subasta} placeholder="Tipo de Subasta Copart, IAAI, Manheim" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Precio:</span>
         <input type="number" 
         maxLength={4}
         onChange={(event)=>{
          setPrecio(event.target.value);
          }}
         className="form-control" value={precio} placeholder="Precio de Venta" aria-label="Username" aria-describedby="basic-addon1"/>
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
    
<table className="table table-striped" style={{overflowY: 'scroll', maxHeight: '400px', display: 'inline-block'}}> 
    <thead>
        <tr>
          <th scope="col">Telefono</th>
          <th scope="col">Nombre</th>
          <th scope="col">Direccion</th>
          <th scope="col">Subasta</th>
          <th scope="col">Precio</th>
                    
        </tr>
      </thead>
      <tbody>

    {
      subastasList.map((val,key)=>{
                return <tr key={val.id}>
                        <th scope="row">{val.telefono}</th>
                        <td>{val.nombre}</td>
                        <td>{val.direccion}</td>
                        <td>{val.subasta}</td>
                        <td>{val.precio}</td>
                        <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" 
                          onClick={()=>{
                            editarSubasta(val);
                            }}   
                          className="btn btn-info">Editar</button>
                          <button type="button" onClick={()=>{
                            deleteSubasta(val);
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

export default Subastas;

