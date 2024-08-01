import './App.css';
import { useState, useEffect } from "react"
import Axios from "axios";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2';

function capitalizarPrimeraLetra (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function Autos() {

  const[marca, setMarca] = useState("");
  const[modelo, setModelo] = useState("");
  const[anio, setAnio] = useState("");
  const[fee, setFee] = useState("");
  const[tipo, setTipo] = useState("");
  const[id, setId] = useState();

  const[editar, setEditar] = useState(false);

  const [autosList,setAutos] = useState([]);
  const [filteredAutos, setFilteredAutos] = useState([]);

  useEffect(() => {
    getAutos();
  }, [])

 
  const add = ()=> {
    if (!marca || !modelo || !anio || !fee || !tipo){
      return;
     } 

      let marcaL = marca.toLowerCase();
      let modeloL = modelo.toLowerCase();
      
     
    Axios.post(`https://krriers.moveurads.com/autos`,{

      marca:marca,
      modelo:modelo,
      anio:anio,
      fee:fee,
      tipo:tipo,
      }).then(()=>{
        getAutos();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro Existo!!!</strong>",
          html: "<i>El Auto <strong>"+marcaL+"</strong> fue Registrado con Exito!!!</i>",
          icon: 'success',
          timer:3000
        });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró Dar de Alta el Auto!",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
        timer: 3000
      });

    });

  }

  const update = ()=> {
    Axios.put(`https://krriers.moveurads.com/autos`,{

      id:id,
      marca:marca,
      modelo:modelo,
      anio:anio,
      fee:fee,
      tipo:tipo
    }).then(()=>{
        getAutos();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualización Exitosa!!!</strong>",
          html: "<i>El Auto <strong>"+marca+"</strong> fue Actualizado con Exito!!!</i>",
          icon: 'success',
          timer:3000
        });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró Actualizar el Auto!",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
        timer: 3000
      });

    })

  }

  const deleteAuto = (val)=> {

    Swal.fire({
      title: "Confirmar Eliminar?",
      html: "<i>Realmente desea eliminar a <strong>"+val.marca+"</strong></i>",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`https://krriers.moveurads.com/autos/${val.id}`).then(()=>{
          getAutos();
          limpiarCampos();
          Swal.fire({
            icon: "success",
            title: val.marca+ ' fue eliminado',
            showConfirmButton: false,
            timer: 2000
          });
      }).catch(function(error){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se logró Eliminar el Auto!",
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
          timer: 3000
        });

      })
        
      }
    });
   
  }

  const limpiarCampos = ()=> {
    setMarca("");
    setModelo("");
    setAnio("");
    setFee("");
    setId("");
    setTipo("");
    setEditar(false);
  }

const editarAuto = (val)=>{
  setEditar(true);

  setId(val.id);
  setMarca(val.marca);
  setModelo(val.modelo);
  setAnio(val.anio);
  setFee(val.fee);
  setTipo(val.tipo);
 
  
  

}

  const getAutos = ()=> {
    Axios.get(`https://krriers.moveurads.com/autos`).then((response)=>{
        setAutos(response.data);
        setFilteredAutos(response.data);
    });

  } 
  
  const onAutosMarcaChange = (marcaValue) => {
    marcaValue = marcaValue.toLowerCase();
    const filteredItems = autosList.filter((client) => {
      return client.marca.toLowerCase().includes(marcaValue)
    })
    setFilteredAutos(filteredItems)
  }
  

    return (
      <div className="container"> 
             
    <div className="card text-center">
     <div className="card-header">
      MANTENIMIENTO DE BASE DE DATOS DE AUTOS de KRRIERS
    </div>
    <div className="card-body">
      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Marca:</span>
         <input type="text" 
         maxLength={30}
         onChange={(event)=>{
          onAutosMarcaChange(event.target.value);
          setMarca(event.target.value);
          }}
         className="form-control" value={marca} placeholder="Marca" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Modelo:</span>
         <input type="text" 
         maxLength={45}
         onChange={(event)=>{
          setModelo(event.target.value);
          }}
         className="form-control" value={modelo} placeholder="Modelo" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Año:</span>
         <input type="text" 
         maxLength={45}
         onChange={(event)=>{
          setAnio(event.target.value);
          }}
         className="form-control" value={anio} placeholder="Año" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Sobre Peso?:</span>
         <input type="text" 
         maxLength={1}
         onChange={(event)=>{
          setFee(event.target.value);
          }}
         className="form-control" value={fee} placeholder="Sobre Peso (S/N)" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Tipo de Auto:</span>
         <input type="text" 
         maxLength={45}
         onChange={(event)=>{
          setTipo(event.target.value);
          }}
         className="form-control" value={tipo} placeholder="Tipo de Auto" aria-label="Username" aria-describedby="basic-addon1"/>
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
    

<table className="table table-borderless table-hover" style={{overflowY: 'scroll', maxHeight: '400px', display: 'inline-block', paddingLeft: '100px'}}>
    <thead  class="sticky-top">
        <tr>
          <th scope="col">Marca</th>
          <th scope="col">Modelo</th>
          <th scope="col">Año</th>
          <th scope="col">Sobre Peso</th>
          <th scope="col">Tipo</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>

    {
      filteredAutos.map((val,key)=>{
                return <tr key={val.id}>
                        <th scope="row">{val.marca}</th>
                        <td>{val.modelo}</td>
                        <td>{val.anio}</td>
                        <td>{val.fee}</td>
                        <td>{val.tipo}</td>
                        <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" 
                          onClick={()=>{
                            editarAuto(val);
                            }}   
                          className="btn btn-info">Editar</button>
                          <button type="button" onClick={()=>{
                            deleteAuto(val);
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

export default Autos;

