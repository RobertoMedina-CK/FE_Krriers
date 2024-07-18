import './App.css';
import { useState, useEffect } from "react"
import Axios from "axios";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2';


function Transportistas() {

  const[telefono, setTelefono] = useState("");
  const[nombre, setNombre] = useState();
  const[dot, setDot] = useState("");
  const[id, setId] = useState();
    

  const[editar, setEditar] = useState(false);

  const [transportistasList,setTransportistas] = useState([]);

  useEffect(() => {
    getTransportistas();
  }, [])

  const add = ()=> {
    if (!telefono || !nombre || !dot){
      return;
    }
    Axios.post("http://localhost:3001/transportistas",{

      telefono:telefono,
      nombre:nombre,
      dot:dot
    }).then(()=>{
        getTransportistas();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro Existo!!!</strong>",
          html: "<i>El Transportista <strong>"+nombre+"</strong> fue Registrado con Exito!!!</i>",
          icon: 'success',
          timer:3000
        });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró Dar de Alta al transportista!",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
        timer: 3000
      });

    });

  }

  const update = ()=> {
    Axios.put("http://localhost:3001/transportistas",{

      id:id,
      telefono:telefono,
      nombre:nombre,
      dot:dot
      
    }).then(()=>{
        getTransportistas();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualización Exitosa!!!</strong>",
          html: "<i>El Transportista <strong>"+nombre+"</strong> fue Actualizado con Exito!!!</i>",
          icon: 'success',
          timer:3000
        });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró Actualizar al transportista!",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
        timer: 3000
      });

    })

  }

  const deleteTransportista = (val)=> {

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
        Axios.delete(`http://localhost:3001/transportistas/${val.id}`).then(()=>{
          getTransportistas();
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
          text: "No se logró Eliminar al transportista!",
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
          timer: 3000
        });

      })
        
      }
    });
   
  }

  const limpiarCampos = ()=> {
    setNombre("");
    setDot("");
    setTelefono("");
    setEditar(false);
  }

const editarTransportista = (val)=>{
  setEditar(true);

  setId(val.id);
  setTelefono(val.telefono);
  setNombre(val.nombre);
  setDot(val.dot);
  
    

}

  const getTransportistas = ()=> {
    Axios.get("http://localhost:3001/transportistas").then((response)=>{
        setTransportistas(response.data);
    });

  } 
  
    return (
      <div className="container"> 
             
    <div className="card text-center">
     <div className="card-header">
     MANTENIMIENTO DE BASE DE DATOS DE TRANSPORTISTAS de KRRIERS
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
          <span className="input-group-text" id="basic-addon1">Dot:</span>
         <input type="text" 
         maxLength={15}
         onChange={(event)=>{
          setDot(event.target.value);
          }}
         className="form-control" value={dot} placeholder="Ingrese Numero de DOT" aria-label="Username" aria-describedby="basic-addon1"/>
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
          <td>{''}</td>
          <th scope="col">Telefono</th>
          <td>{''}</td>
          <td>{''}</td>
          <td>{''}</td>
          <th scope="col">Nombre</th>
          <td>{''}</td>
          <td>{''}</td>
          <td>{''}</td>
          <td>{''}</td>
          <td>{''}</td>
          <td>{''}</td>
          <td>{''}</td>
          <td>{''}</td>
          <th scope="col">Dot</th>
                    
        </tr>
      </thead>
      <tbody>

    {
      transportistasList.map((val,key)=>{
                return <tr key={val.id}>
                        <td>{''}</td>
                        <th scope="row">{val.telefono}</th>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{val.nombre}</td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td>{val.dot}</td>
                        <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" 
                          onClick={()=>{
                            editarTransportista(val);
                            }}   
                          className="btn btn-info">Editar</button>
                          <button type="button" onClick={()=>{
                            deleteTransportista(val);
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

export default Transportistas;

