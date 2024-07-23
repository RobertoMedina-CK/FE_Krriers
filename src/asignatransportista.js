import './App.css';
import { useState, useEffect } from "react"
import Axios from "axios";
import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2';
import { ListGroupItem } from 'react-bootstrap';
import Transportistas from './transportistas';


function Asigna() {
    
  
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
  const [filteredAsigna, setFilteredAsigna] = useState([]);
  const [filteredAsigna2, setFilteredAsigna2] = useState([]);


  //Transportistas

  const[telefonotransportista, setTelefonoTransportista] = useState("");
  const[nombretransportista, setNombreTransportista] = useState();
  const[dot, setDot] = useState("");
  const[idTransportista, setIdTransportista] = useState();
  const[margen, setMargen] = useState("");
  const [transportistasList,setTransportistas] = useState([]);
  const [filteredTransportistas, setFilteredTransportistas] = useState([]);

  useEffect(() => {
    getTransportistas();
  }, [])


  useEffect(() => {
    getAsigna();
  }, [])



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

  const limpiarCamposTransportista = ()=> {
    setNombreTransportista("");
    setDot("");
    setTelefonoTransportista("");
    setMargen("");
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

const selectAsigna2 = (val)=>{
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

const selectTransportista = (val)=>{
  
  setIdTransportista(val.id);
  setTelefonoTransportista(val.telefono);
  setNombreTransportista(val.nombre);
  setDot(val.dot);
  setMargen(val.margen);
  
    

}


  const getAsigna = ()=> {
    Axios.get("http://localhost:3001/asigna").then((response)=>{
        setAsigna(response.data);
        setFilteredAsigna(response.data);
    });

  } 

    const onAsignaSubasta = (subastaValue) => {
      subastaValue = subastaValue.toLowerCase();
    const filteredItems =asignaList.filter((client) => {
      return client.subasta.toLowerCase().includes(subastaValue)
    })
    setFilteredAsigna(filteredItems)
  }

  const getTransportistas = ()=> {
    Axios.get("http://localhost:3001/transportistas").then((response)=>{
        setTransportistas(response.data);
        setFilteredTransportistas(response.data);
    });

  } 
  
  const onTransportistasChange = (transportistasValue) => {
    transportistasValue = transportistasValue.toLowerCase();
    const filteredItemsTransportista =transportistasList.filter((client) => {
      return client.nombre.toLowerCase().includes(transportistasValue)
    })
    setFilteredTransportistas(filteredItemsTransportista)
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

      <div class="input-group mb-3">
         <span className="input-group-text" id="basic-addon1">Fecha de Asignación:</span>
         <div class="input-group-text">
         <input type="date" class="input-control" placeholder="Fecha Asignacion"

         onChange={(event)=>{
          setFechaAsignaCarrier(event.target.value);
          }}/>
        </div>
      </div>
    
    <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre Transportista:</span>
         <input type="text" 
         maxLength={45}
         onChange={(event)=>{
          onTransportistasChange(event.target.value);
          setNombreTransportista(event.target.value);
          }}
         className="form-control" value={nombretransportista} placeholder="Nombre Transportista" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>

     
    <div className="card-footer text-muted">
          

    </div>
  </div>

  <table className="table table-borderless table-hover" style={{overflowY: 'scroll', maxHeight: '150px', display: 'inline-block', paddingLeft: '280px'}}> 
    <thead class = "sticky-top">
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Telefono</th>
          <th scope="col">Dot</th>
          <th scope="col">Margen</th>
          <th scope="col">Acción</th>

                    
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
                            selectTransportista(val);
                            }}   
                          className="btn btn-info">Select</button>
                        </div>
                          </td>
                </tr>
                     
              })

            }

                   
      </tbody>
</table>
<table className="table table-borderless table-hover" style={{overflowY: 'scroll', maxHeight: '400px', display: 'inline-block', paddingLeft: '200px'}}>
    <thead class="sticky-top">
        <tr>
          <th scope="col">Subasta</th>
          <th scope="col">Lote</th>
          <th scope="col">Nombre</th>
          <th scope="col">Buyer</th>
          <th scope="col">PIN</th>
          <th scope="col">Tipo de Auto</th>
          <th scope="col">Fecha Pedido</th>
          <th scope="col">Acción</th>
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

