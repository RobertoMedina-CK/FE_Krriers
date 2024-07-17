import './App.css';
import { useState, useEffect } from "react"
import Axios from "axios";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2';


function Autos() {

  const[marca, setMarca] = useState("");
  const[modelo, setModelo] = useState("");
  const[anio, setAnio] = useState("");
  const[fee, setFee] = useState("");
  const[id, setId] = useState();

  const[editar, setEditar] = useState(false);

  const [autosList,setAutos] = useState([]);

  useEffect(() => {
    getAutos();
  }, [])

  const add = ()=> {
    if (!marca || !modelo || !anio || !fee){
      return;
    }
    Axios.post("http://localhost:3001/autos",{

      marca:marca,
      modelo:modelo,
      anio:anio,
      fee:fee,
      }).then(()=>{
        getAutos();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro Existo!!!</strong>",
          html: "<i>El Auto <strong>"+marca+"</strong> fue Registrado con Exito!!!</i>",
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
    Axios.put("http://localhost:3001/autos",{

      id:id,
      marca:marca,
      modelo:modelo,
      anio:anio,
      fee:fee
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
        Axios.delete(`http://localhost:3001/autos/${val.id}`).then(()=>{
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
    setEditar(false);
  }

const editarAuto = (val)=>{
  setEditar(true);

  setId(val.id);
  setMarca(val.marca);
  setModelo(val.modelo);
  setAnio(val.anio);
  setFee(val.fee);
 
  
  

}

  const getAutos = ()=> {
    Axios.get("http://localhost:3001/autos").then((response)=>{
        setAutos(response.data);
    });

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
          setMarca(event.target.value);
          }}
         className="form-control" value={marca} placeholder="Ingrese la Marca" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Modelo:</span>
         <input type="text" 
         maxLength={45}
         onChange={(event)=>{
          setModelo(event.target.value);
          }}
         className="form-control" value={modelo} placeholder="Ingrese el Modelo" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Año:</span>
         <input type="text" 
         maxLength={45}
         onChange={(event)=>{
          setAnio(event.target.value);
          }}
         className="form-control" value={anio} placeholder="Ingrese el Año" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Extra Fees:</span>
         <input type="text" 
         maxLength={10}
         onChange={(event)=>{
          setFee(event.target.value);
          }}
         className="form-control" value={fee} placeholder="Ingrese Extra Fees" aria-label="Username" aria-describedby="basic-addon1"/>
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
          <th scope="col">Marca</th>
          <th scope="col">Modelo</th>
          <th scope="col">Año</th>
          <th scope="col">Fees</th>
        </tr>
      </thead>
      <tbody>

    {
      autosList.map((val,key)=>{
                return <tr key={val.id}>
                        <th scope="row">{val.id}</th>
                        <td>{val.marca}</td>
                        <td>{val.modelo}</td>
                        <td>{val.anio}</td>
                        <td>{val.fee}</td>
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
