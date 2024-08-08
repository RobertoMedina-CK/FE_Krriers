import './App.css';
import { useState, useEffect } from "react"
import Axios from "axios";
import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import { Portal } from "react-overlays";
import { jsPDF } from 'jspdf';

import autoTable from 'jspdf-autotable';

import Swal from 'sweetalert2';


function ReportePedidosSinAsignar() {

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
  const[editar, setEditar] = useState(false);
  const [cajaList,setCaja] = useState([]);
  const [filteredCaja, setFilteredCaja] = useState([]);
  const [storage, setStorage] = useState("");
  const [preciofinal, setPrecioFinal] = useState("");


  const [fechainicial, setFechaInicial] = useState("");
  const [fechafinalreporte, setFechaFinalReporte] = useState("");
 
  
  const handleDateChange = (date) =>{
    console.log(date)
    setFechaInicial(date);

  };

  const handleDateChange2 = (date) =>{
    console.log(date)
    setFechaFinalReporte(date);

  };
  const CalendarContainer = ({ children }) => {
    const el = document.getElementById("calendar-portal");
  
    return <Portal container={el}>{children}</Portal>;
  };
  const onAsignaSubasta = (subastaValue) => {
    subastaValue = subastaValue.toLowerCase();
  const filteredItems =cajaList.filter((client) => {
    return client.direccion?.toLowerCase().includes(subastaValue)
  })
  setFilteredCaja(filteredItems)
}

  useEffect(() => {
    getCaja();
  }, [])

    
  const update = ()=> {
    Axios.put(`https://krriers.moveurads.com/caja`,{

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
      nombrecarrier:nombrecarrier,
      storage:storage,
      preciofinal:preciofinal

    }).then(()=>{
        getCaja();
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

  const generapdf = ()=> {
   
    const doc = new jsPDF({orientation: 'l'});
    var logo = new Image();
    logo.src = 'logo.png';
    doc.addImage(logo, 'PNG', 185,5,60,18);
    doc.text('REPORTE DE PEDIDOS SIN ASIGNAR de KRRIERS', 80, 35);

    autoTable(doc, {html: '#pedidos-table', margin:{top: 45}})
    
    doc.autoPrint({variant: 'non-conform'});
    doc.output('dataurlnewwindow');

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
  handleDateChange("");
  setStorage("");
  setPrecioFinal("");
  setEditar(false);
  }

const editarCaja = (val)=>{
  setEditar(true);

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
  setDeposito(val.deposito);
  setFechaLlegada(val.fechallegada);
  setFeesCarrier(val.feescarrier);
  setFechaAsignaCarrier(val.fechaasignacarrier);
  setNombreCarrier(val.nombrecarrier);
  setStorage(val.storage);
  var total = (Number(`${val.precio}`)+Number(`${val.fees}`)+Number(`${val.storage}`)-Number(`${val.deposito}`));
  setPrecioFinal(total);
 
  
}

  const getCaja = ()=> {
    Axios.get(`https://krriers.moveurads.com/reppedsinasignar`).then((response)=>{
        setCaja(response.data);
        setFilteredCaja(response.data);
      });

  } 
  
  const onCajaChange = (lotValue) => {
      const filteredItems =cajaList.filter((client) => {
      return lotValue
    })
    setFilteredCaja(filteredItems)
    
  }
  
  const onCajaChange2 = (lotValue) => {
    const filteredItems =cajaList.filter((client) => {
    return lotValue
  })
  setFilteredCaja(filteredItems)
  
}


    return (
      <div className="container"> 
             
    <div className="card text-center">
     <div className="card-header">
      REPORTE DE PEDIDOS SIN ASIGNAR de KRRIERS
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
      
    <div className="card-footer text-muted">
          
              <div>
                <button className='btn btn-outline-success m-2' onClick={generapdf}>Imprimir Reporte</button> 
              </div>
              
                </div>
           
    </div>

    </div>

    
    
<table id='pedidos-table' className="table table-borderless table-hover" style={{overflowY: 'scroll', maxHeight: '450px', display: 'inline-block', paddingLeft: '120px', }}>
    <thead className="sticky-top">
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Telefono</th>
          <th scope="col">Buyer</th>
          <th scope="col">Lote</th>
          <th scope="col">Subasta</th>
          <th scope="col">Fecha Pedido</th>
          <th scope="col">Modelo</th>
          
        </tr>
      </thead>
    <tbody>


    {
      filteredCaja.map((val,key)=>{
                         return <tr key={val.id}>
                        <th scope="row">{val.nombre}</th>
                        <td>{val.telefono}</td>
                        <td>{val.buyer}</td>
                        <td>{val.lot}</td>
                        <td>{val.direccion}</td>
                        <td>{moment(val.fecha).format("LL")}</td>
                        <td>{val.modelo}</td>
                        </tr>
                    
              }
            )

            }

                   
      </tbody>
</table>
</div>



);
}

export default ReportePedidosSinAsignar;


