import './App.css';
import { useState, useEffect } from "react"
import Axios from "axios";
import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';


function Asigna() {
    
  // AUTOS PEDIDO

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
  const[pagocarrier, setPagoCarrier] = useState();
  const[pagadocarrier, setPagadoCarrier] = useState("");
  const[pagocarrier2, setPagoCarrier2] = useState();
  const[color, setColor] = useState("");
  
  
  const [subastaList,setSubastaList] = useState([]);

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
  setColor("");
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
  setNombre(val.nombre);
  setBuyer(val.buyer);
  setLot(val.lot);
  setPin(val.pin);
  setMarca(val.marca);
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
  setColor(val.color);
  setDeposito(val.deposito);
  setFechaLlegada(val.fechallegada);
  setFeesCarrier(val.feescarrier);
  if (val.fechaasignacarrier) {
    setFechaAsignaCarrier(val.fechaasignacarrier);
  }
  setNombreCarrier(val.nombrecarrier);
  setPagoCarrier(val.pagocarrier);
  setPagadoCarrier(val.pagadocarrier);
  
 
  
}


const selectTransportista = (val)=>{
  
  setIdTransportista(val.id);
  setTelefonoTransportista(val.telefono);
  setNombreTransportista(val.nombre);
  setDot(val.dot);
  setMargen(val.margen);
  setPagoCarrier2(1-(Number(val.margen/100)));
  
    

}


  const agregarElementoSubasta = ()=> {
    var datossubasta;
    window.onload = function(){
     window.datossubasta = [];
    }
    let datosubasta = document.getElementById('texto').value;

     datossubasta.push(datosubasta);

}

const agregarElementoTransportista = ()=> {
  var datostransportista;
  window.onload = function(){
   window.datostransportista = [];
  }
  let datotransportista = document.getElementById('texto').value;

   datostransportista.push(datotransportista);

}


  const getAsigna = ()=> {
    Axios.get(`https://krriers.moveurads.com/asigna`).then((response)=>{
        const res = response.data;
        const mutatedRes = res.map((item) => {
          return {...item, disabled: false}
        })
        setAsigna(mutatedRes)
        setFilteredAsigna(mutatedRes);
    });

  } 

    const onAsignaSubasta = (subastaValue) => {
      subastaValue = subastaValue.toLowerCase();
    const filteredItems =asignaList.filter((client) => {
      return client.direccion?.toLowerCase().includes(subastaValue)
    })
    setFilteredAsigna(filteredItems)
  }

  const getTransportistas = ()=> {
    Axios.get(`https://krriers.moveurads.com/transportistas`).then((response)=>{
        const res = response.data;
        const mutatedRes = res.map((item) => {
          return {...item, disabled: false}
        })
        setTransportistas(mutatedRes);
        setFilteredTransportistas(mutatedRes);
    });

  } 
  
  const onTransportistasChange = (transportistasValue) => {
    transportistasValue = transportistasValue.toLowerCase();
    const filteredItemsTransportista =transportistasList.filter((client) => {
      return client.nombre.toLowerCase().includes(transportistasValue)
    })
    setFilteredTransportistas(filteredItemsTransportista)
  }

  const generapdf = ()=> {
   
    const doc = new jsPDF({orientation: 'l'});
    var logo = new Image();
    logo.src = 'logo.png';
    doc.addImage(logo, 'PNG', 190,5,60,18);
    doc.text(`Pedidos asignados al Transportista`, 100, 50);
    doc.text(`${nombretransportista}`, 110, 60);
    
    autoTable(doc, {html: '#pedidos-seleccionados',
       margin:{top: 70, right: 30, },
       columns: [{header:'Subasta', dataKey:'subasta'},{header:'Lote', dataKey:'lot'},{header:'Buyer', dataKey:'buyer'},{header:'Pin', dataKey:'pin'},{header:'Marca', dataKey:'marca'}
        ,{header:'Modelo', dataKey:'modelo'},{header:'Año', dataKey:'anio'},{header:'Color', dataKey:'color'},{header:'Fecha Pedido', dataKey:'fechapedido'}]
      })
    var tTB = document.getElementById("pedidos-seleccionados");
    var atTB = doc.autoTableHtmlToJson(tTB, true);
    var cols =atTB.columns;
    cols.splice(9,1)
   
    doc.save(`${nombretransportista}.pdf`);
    doc.autoPrint({variant: 'non-conform'});
    doc.output('dataurlnewwindow');

  }

  const asignarCarga = () => {
    Swal.fire({
      title: `<strong>Estas seguro de asignar esta carga a ${nombretransportista}?</strong>`,
      html: [`<style>

      table {border-collapse: collapse;
            width:100%;
      }
      th, td {padding: 8px;
            text-align: left;
      }
      tr:hover {background-color: #D6EEEE;} >
      </style>
      <table id="pedido-asignado">
        <thead className="sticky-top">
          <tr>
            <th scope="col">Subasta</th>
            <th scope="col">Lote</th>
            <th scope="col">Buyer</th>
            <th scope="col">PIN</th>
            <th scope="col">Marca</th>
            <th scope="col">Modelo</th>
            <th scope="col">Año</th>
            <th scope="col">Color</th>
            <th scope="col">Fecha Pedido</th>
          </tr>
        </thead>
        <tbody>
          ${
            subastaList.map((val,index)=>{
              return `<tr key=${val.id}>
                <th scope="row">${val.direccion}</th>
                <td>${val.lot}</td>
                <td>${val.buyer}</td>
                <td>${val.pin}</td>
                <td>${val.marca}</td>
                <td>${val.modelo}</td>
                <td>${val.anio}</td>
                <td>${val.color}</td>
                <td>${moment(val.fecha).format("LL")}</td>
              </tr>`
            })
          }         
        </tbody>
      </table>
      `],
      width: '60%',
      padding: '10em',
      grow: 'row',
      position: 'center',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Asignar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
          const bodyCarga = {
            fechaasignacarrier: fechaasignacarrier,
            nombrecarrier: nombretransportista,
            subastaList: subastaList
          }
          Axios.put(`https://krriers.moveurads.com/asigna`, bodyCarga).then((res) => {
            getAsigna();
            getTransportistas();
            generapdf();
            Swal.fire({
              title: "<strong>Carga asignada exitosamente!</strong>",
              html: "<i>La carga fue asignada con Exito!</i>",
              icon: 'success',
              timer:3000
            });
          }).catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se logró asignar la carga!",
              footer: JSON.parse(JSON.stringify(err)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(err)).message,
              timer: 3000
            });
          })
      }
    })
  }

    return (
      <div className="container"> 
             
  <div className="card text-center">
     <div className="card-header">
      ASIGNACION DE VEHICULOS A TRANSPORTISTAS
    </div>
    <div className="card-body">
      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Subasta:</span>
         <input type="text" 
         maxLength={45}
         onChange={(event)=>{
          onAsignaSubasta(event.target.value);
          setDireccion(event.target.value);
          }}
         className="form-control" value={direccion} placeholder="Subasta" aria-label="Username" aria-describedby="basic-addon1"/>
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
    
         <span className="input-group-text" id="basic-addon1">Fecha de Asignación:</span>
         <div className="input-group-text">
         <input type="date" className="input-control" placeholder="Fecha Asignacion"

         onChange={(event)=>{
          setFechaAsignaCarrier(event.target.value);
          }}/>
        </div>
      </div>

    <div className="card-footer text-muted">Transportistas Registrados</div>

  </div>

          <table id="tabla-transportistas" className="table table-hover" style={{overflowY: 'scroll', maxHeight: '150px', display: 'inline-block', paddingLeft: '325px'}}> 
            <thead className = "sticky-top">
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
                                  <button type="button" disabled={val.disabled}
                                    onClick={()=>{
                                      selectTransportista(val);
                                      const deselectTransportistas = filteredTransportistas.map((el) =>{
                                        return el.disabled ? {...el, disabled: false} : el
                                      })
                                    const transportistaElement = deselectTransportistas.map((el) =>{
                                      return el.id === val.id ? {...el, disabled: true} : el
                                    })
                                    setFilteredTransportistas(transportistaElement)
                                    setTransportistas(transportistaElement)
                                    }}   
                                  className="btn btn-outline-success">Select</button>
                                </div>
                                  </td>
                        </tr>
                            
                      })

                    }

                          
              </tbody>

        </table>
        <div className="card-footer text-muted">Pedidos disponibles</div>
        <table id="tabla-pedidos-no-seleccionados" className="table  table-hover" style={{overflowY: 'scroll', maxHeight: '300px', display: 'inline-block', paddingLeft: '10px'}}>
            <thead className="sticky-top">
                <tr>
                  <th scope="col">Subasta</th>
                  <th scope="col">Lote</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Buyer</th>
                  <th scope="col">PIN</th>
                  <th scope="col">Marca</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">Año</th>
                  <th scope="col">Color</th>                  
                  <th scope="col">Fecha Pedido</th>
                  <th scope="col">Acción</th>
                </tr>
              </thead>
              <tbody>

            {
              filteredAsigna.map((val,key)=>{
                        return <tr key={val.id}>
                                <th scope="row">{val.direccion}</th>
                                <td>{val.lot}</td>
                                <td>{val.nombre}</td>
                                <td>{val.buyer}</td>
                                <td>{val.pin}</td>
                                <td>{val.marca}</td>
                                <td>{val.modelo}</td>
                                <td>{val.anio}</td>
                                <td>{val.color}</td>
                                <td>{moment(val.fecha).format("LL")}</td>
                            <td>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                  <button type="button" 
                                  disabled={val.disabled}
                                  onClick={()=>{
                                    selectAsigna(val); 
                                    let newSubastaList = subastaList;
                                    newSubastaList = [...newSubastaList, {...val, pagocarrier: ((Number(val.precio)*pagocarrier2) + Number(val.feescarrier))}]
                                    console.log(newSubastaList)
                                    console.log(val.precio, pagocarrier2, val.feescarrier)
                                    setSubastaList(newSubastaList);
                                    const asignaElement = filteredAsigna.map((el) =>{
                                      return el.id === val.id ? {...el, disabled: true} : el
                                    })
                                    setFilteredAsigna(asignaElement)
                                    const asignaElement2 = asignaList.map((el) =>{
                                      return el.id === val.id ? {...el, disabled: true} : el
                                    })
                                    setAsigna(asignaElement2)
                                    }}   
                                  className="btn btn-outline-success">Select</button>
                                  </div>
                            </td>
                        </tr>
                            
                      })

                    }

                          
              </tbody>
          </table>
          <div className="card-footer text-muted">Pedidos Seleccionados</div>

          <table id='pedidos-seleccionados' className="table table-hover" style={{overflowY: 'scroll', maxHeight: '300px', display: 'inline-block', paddingLeft: '90px'}}>
              <thead className="sticky-top">
                  <tr>
                    <th scope="col">Subasta</th>
                    <th scope="col">Lote</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">PIN</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Modelo</th>
                    <th scope="col">Año</th>
                    <th scope="col">Color</th>
                    <th scope="col">Fecha Pedido</th>
                    <th scope="col">Acción</th>
                  </tr>
                </thead>
                <tbody>

              {
                subastaList.map((val,index)=>{
                          return <tr key={val.id}>
                                  <th scope="row">{val.direccion}</th>
                                  <td>{val.lot}</td>
                                  <td>{val.nombre}</td>
                                  <td>{val.buyer}</td>
                                  <td>{val.pin}</td>
                                  <td>{val.marca}</td>
                                  <td>{val.modelo}</td>
                                  <td>{val.anio}</td>
                                  <td>{val.color}</td>
                                  <td>{moment(val.fecha).format('LLL')}</td>
                              <td>
                                  <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" 
                                    onClick={()=>{
                                      //setFilteredAsigna(val);
                                      let newSubastaList = subastaList;
                                      newSubastaList.splice(index, 1)
                                      setSubastaList(newSubastaList);
                                      const asignaElement = filteredAsigna.map((el) =>{
                                        return el.id === val.id ? {...el, disabled: false} : el
                                      })
                                      setFilteredAsigna(asignaElement)
                                      const asignaElement2 = asignaList.map((el) =>{
                                        return el.id === val.id ? {...el, disabled: false} : el
                                      })
                                      setAsigna(asignaElement2)
                                      }}   
                                    className="btn btn-outline-danger">Quitar</button>
                                    </div>
                              </td>
                          </tr>
                              
                        })

                      }

                            
                </tbody>
          </table>
    
          <div className='btn-group' style={{width: '120%', margin: 'auto', paddingRight: '18em', paddingLeft: '5em'}}>
            <button type='button' className='btn btn-outline-dark' onClick={() => asignarCarga()} disabled={subastaList.length < 1 || !idTransportista || !fechaasignacarrier}>Asignar Carga</button>
          </div>
        <div className="card-footer text-muted"></div>
      </div>

    </div>
// 




);
}

export default Asigna;

