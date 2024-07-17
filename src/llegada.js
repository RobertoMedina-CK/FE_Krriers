import './App.css';
import { useState, useEffect } from "react"
import Axios from "axios";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2';


function Llegada() {

  const[marca, setMarca] = useState("");
  const[modelo, setModelo] = useState("");
  const[anio, setAnio] = useState("");
  const[fees, setFee] = useState("");
  const[buyer, setBuyer] = useState("");
  const[telefono, setTelefono] = useState("");
  const[nombre, setNombre] = useState("");
  const[lot, setLot] = useState("");
  const[pin, setPin] = useState("");
  const[subasta, setSubasta] = useState("");
  const[direccion, setDireccion] = useState("");
  const[fecha, setFecha] = useState("");
  const[precio, setPrecio] = useState("");
  const[titulo, setTitulo] = useState("");
  const[notas, setNotas] = useState("");
  const[fechafinal, setFechaFinal] = useState("");
  const[id, setId] = useState();

  const[editar, setEditar] = useState(false);

  const [llegadaList,setLlegada] = useState([]);

  useEffect(() => {
    getLlegada();
  }, [])

    
  const update = ()=> {
    Axios.put("http://localhost:3001/llegada",{

      id:id,
      telefono:telefono,
      nombre:nombre,
      buyer:buyer,
      lot:lot,
      pin:pin,
      marca:marca,
      modelo:modelo,
      anio:anio,
      subasta:subasta,
      direccion:direccion,
      fecha:fecha,
      precio:precio,
      fees:fees,
      titulo:titulo,
      notas:notas,
      fechafinal:fechafinal
    }).then(()=>{
        getLlegada();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualización Exitosa!!!</strong>",
          html: "<i>El Lote <strong>"+lot+"</strong> fue Actualizado con Exito!!!</i>",
          icon: 'success',
          timer:3000
        });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró Actualizar el Lote!",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
        timer: 3000
      });

    })

  }

const limpiarCampos = ()=> {
    
  setId("");
  setTelefono("");
  setNombre("");
  setBuyer("");
  setLot("");
  setPin("");
  setMarca("");
  setModelo("");
  setAnio("");
  setSubasta("");
  setDireccion("");
  setFecha("");
  setPrecio("");
  setFee("");
  setTitulo("");
  setNotas("");
  setFechaFinal("");
  setEditar(false);
  }

const editarLlegada = (val)=>{
  setEditar(true);

  setId(val.id);
  setTelefono(val.telefono);
  setNombre(val.Nombre);
  setBuyer(val.buyer);
  setLot(val.lot);
  setPin(val.pin);
  setMarca(val.Marca);
  setModelo(val.modelo);
  setAnio(val.anio);
  setSubasta(val.subasta);
  setDireccion(val.direccion);
  setFecha(val.fecha);
  setPrecio(val.precio);
  setFee(val.fees);
  setTitulo(val.titulo);
  setNotas(val.notas);
  setFechaFinal(val.fechafinal);
 
  
}

  const getLlegada = ()=> {
    Axios.get("http://localhost:3001/llegada").then((response)=>{
        setLlegada(response.data);
    });

  } 
  
    return (
      <div className="container"> 
             
    <div className="card text-center">
     <div className="card-header">
      CAPTURA DE LLEGADA DE VEHICULOS de KRRIERS
    </div>
    <div className="card-body">
      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Lote:</span>
         <input type="text" 
         maxLength={12}
         onChange={(event)=>{
          setLot(event.target.value);
          }}
         className="form-control" value={lot} placeholder="Ingrese el Lote" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1">Extra Fees:</span>
         <input type="text" 
         maxLength={10}
         onChange={(event)=>{
          setFee(event.target.value);
          }}
         className="form-control" value={fees} placeholder="Ingrese Extra Fees" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>
      
      <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1">Notas:</span>
         <input type="text" 
         maxLength={100}
         onChange={(event)=>{
          setNotas(event.target.value);
          }}
         className="form-control" value={notas} placeholder="Ingrese Notas de Llegada" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1">Tiene Titulo:</span>
         <input type="text" 
         maxLength={1}
         onChange={(event)=>{
          setTitulo(event.target.value);
          }}
         className="form-control" value={titulo} placeholder="Titulo (0/1)" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>
                     
    </div>
    <div className="card-footer text-muted">
          
              <div>
                <button className='btn btn-warning m-2' onClick={update}>Actualizar</button> 
              <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
                </div>
              
          
           
  </div>
    
<table className="table table-striped">
    <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Buyer</th>
          <th scope="col">Lote</th>
          <th scope="col">Subasta</th>
          <th scope="col">Fecha</th>
          <th scope="col">Precio</th>
          <th scope="col">Fees</th>
          <th scope="col">Titulo</th>
          <th scope="col">Notas</th>
        </tr>
      </thead>
      <tbody>

    {
      llegadaList.map((val,key)=>{
                return <tr key={val.id}>
                        <th scope="row">{val.nombre}</th>
                        <td>{val.buyer}</td>
                        <td>{val.lot}</td>
                        <td>{val.subasta}</td>
                        <td>{val.fecha}</td>
                        <td>{val.precio}</td>
                        <td>{val.fees}</td>
                        <td>{val.titulo}</td>
                        <td>{val.notas}</td>
                        <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" 
                          onClick={()=>{
                            editarLlegada(val);
                            }}   
                          className="btn btn-info">Editar</button>
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

export default Llegada;
