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
  const[margen, setMargen] = useState("");
    

  const[editar, setEditar] = useState(false);

  const [transportistasList,setTransportistas] = useState([]);
  const [filteredTransportistas, setFilteredTransportistas] = useState([]);

  useEffect(() => {
    getTransportistas();
  }, [])

  const add = ()=> {
    if (!telefono || !nombre || !dot || !margen){
      return;
    }
    Axios.post("http://localhost:3001/transportistas",{

      telefono:telefono,
      nombre:nombre,
      dot:dot,
      margen:margen

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
      dot:dot,
      margen:margen
      
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
    setMargen("");
    setEditar(false);
  }

const editarTransportista = (val)=>{
  setEditar(true);

  setId(val.id);
  setTelefono(val.telefono);
  setNombre(val.nombre);
  setDot(val.dot);
  setMargen(val.margen);
  
    

}

  const getTransportistas = ()=> {
    Axios.get("http://localhost:3001/transportistas").then((response)=>{
        setTransportistas(response.data);
        setFilteredTransportistas(response.data);
    });

  } 
  
  const onTransportistasChange = (transportistasValue) => {
    const filteredItems =transportistasList.filter((client) => {
      return client.nombre.includes(transportistasValue)
    })
    setFilteredTransportistas(filteredItems)
  }

    return (
      <div className="container"> 
             
    <div className="card text-center">
     <div className="card-header">
     LOS VEHICULOS LISTADOS HAN SIDO ASIGNADOS AL SIGUIENTE TRANSPORTISTA
    </div>
    <div className="card-body">
      
    <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
         <input type="text" 
         maxLength={45}
         onChange={(event)=>{
          onTransportistasChange(event.target.value);
          setNombre(event.target.value);
          }}
         className="form-control" value={nombre} placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

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
          <span className="input-group-text" id="basic-addon1">Dot:</span>
         <input type="text" 
         maxLength={15}
         onChange={(event)=>{
          setDot(event.target.value);
          }}
         className="form-control" value={dot} placeholder="Numero de DOT" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Margen:</span>
         <input type="text" 
         maxLength={2}
         onChange={(event)=>{
          setMargen(event.target.value);
          }}
         className="form-control" value={margen} placeholder="Margen de Krriers" aria-label="Username" aria-describedby="basic-addon1"/>
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
    
<table className="table table-striped" style={{overflowY: 'scroll', maxHeight: '400px', display: 'inline-block', paddingLeft: '280px'}}> 
    <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Telefono</th>
          <th scope="col">Dot</th>
          <th scope="col">Margen</th>

                    
        </tr>
      </thead>
      <tbody>

    {
      filteredTransportistas.map((val,key)=>{
                return <tr key={val.id}>
                        <th scope="row">{val.nombre}</th>
                        <td>{val.telefono}</td>
                        <td>{val.dot}</td>
                        <td>{val.margen}</td>
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

