import './App.css';
import { useState, useEffect } from "react"
import Axios from "axios";
import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2';
import { ListGroupItem } from 'react-bootstrap';


function Asigna() {

  const[nombret, setNombreT] = useState();
      
  
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
  const[deposito, setDeposito] = useState("");
  const[fechallegada, setFechaLlegada] = useState("");
  const[feescarrier, setFeesCarrier] = useState("");
  const[fechaasignacarrier, setFechaAsignaCarrier] = useState("");
  const[nombrecarrier, setNombreCarrier] = useState("");
    

  const[select, setSelect] = useState(false);
  

  const [asignaList,setAsigna] = useState([]);
  const [transportistasList,setTransportistas] = useState([]);
  const [filteredAsigna, setFilteredAsigna] = useState([]);
  const [filteredTransportistas, setFilteredTransportistas] = useState([]);

  
  useEffect(() => {
    getAsigna();
  }, [])

      
  const update = ()=> {
    Axios.put("http://localhost:3001/asigna",{

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
      fechafinal:fechafinal,
      deposito:deposito,
      fechallegada:fechallegada,
      feescarrier:feescarrier,
      fechaasignacarrier:fechaasignacarrier,
      nombrecarrier:nombrecarrier

    }).then(()=>{
        getAsigna();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualización Exitosa!!!</strong>",
          html: "<i>Los Lotes <strong>"+lot+"</strong> fueron asignados con Exito!!!</i>",
          icon: 'success',
          timer:3000
        });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se lograron Aasingar los Lotes!",
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
  setDeposito("");
  setFechaLlegada("");
  setFeesCarrier("");
  setFechaAsignaCarrier("");
  setNombreCarrier("");
  setSelect(false);
  }

    
  const selectAsigna = (val)=>{
  setSelect(true);

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
  setDeposito(val.deposito);
  setFechaLlegada(val.fechallegada);
  setFeesCarrier(val.feescarrier);
  setFechaAsignaCarrier(val.fechaasignacarrier);
  setNombreCarrier(val.nombrecarrier);
  
 
  
}

  const getAsigna = ()=> {
    Axios.get("http://localhost:3001/asigna").then((response)=>{
        setAsigna(response.data);
        setFilteredAsigna(response.data);
    });

  } 

    const onAsignaSubasta = (subastaValue) => {
    const filteredItems =asignaList.filter((client) => {
      return client.subasta.includes(subastaValue)
    })
    setFilteredAsigna(filteredItems)
  }
  
    return (
      <div className="container"> 
             
    <div className="card text-center">
     <div className="card-header">
      ASIGNACION DE VEHICULOS a TRANSPORTISTAS
    </div>
    <div className="card-body">
      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Subasta:</span>
         <input type="text" 
         maxLength={45}
         onChange={(event)=>{
          onAsignaSubasta(event.target.value);
          setSubasta(event.target.value);
          }}
         className="form-control" value={subasta} placeholder="Subasta" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>
      <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1">Fecha de Asignación:</span>
         <input type="date" 
         onChange={(event)=>{
          setFechaAsignaCarrier(event.target.value);
          }}
         className="form-control" value={fechaasignacarrier} placeholder="Fecha Asignación" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>
      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre del Transportista:</span>
         <input type="text" 
         maxLength={45}
         onChange={(event)=>{
          setTransportistas(event.target.value);
          }}
         className="form-control" value={nombret} placeholder="Nombre del Transportista" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>
      
    <div className="card-footer text-muted">
          
              <div>
               <button className='btn btn-warning m-2' onClick={update}>Asignar</button> 
               <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
             </div>
    </div>
  </div>

<table className="table table-striped" style={{overflowY: 'scroll', maxHeight: '400px', display: 'inline-block', paddingLeft: '80px'}}>
    <thead>
        <tr>
          <th scope="col">Subasta</th>
          <th scope="col">Lote</th>
          <th scope="col">Nombre</th>
          <th scope="col">Buyer</th>
          <th scope="col">PIN</th>
          <th scope="col">Tipo de Auto</th>
          <th scope="col">Fecha Pedido</th>
        </tr>
      </thead>
      <tbody>

    {
      filteredAsigna.map((val,key)=>{
                return <tr key={val.id}>
                        <th scope="row">{val.subasta}</th>
                        <td>{val.lot}</td>
                        <td>{val.nombre}</td>
                        <td>{val.buyer}</td>
                        <td>{val.pin}</td>
                        <td>{val.marca}</td>
                        <td>{moment(val.fecha).format("MMM Do YY")}</td>
                    <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" 
                          onClick={()=>{
                            selectAsigna(val);
                            }}   
                          className="btn btn-info">Select</button>
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

export default Asigna;

