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


function Caja() {

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
   
    const doc = new jsPDF();
    var logo = new Image();
    logo.src = 'logo.png';
    doc.addImage(logo, 'PNG', 135,5,60,18);
    doc.text('Factura', 40, 15);

    const columna1 = ['Nombre', 'Telefono', 'Lote', 'Subasta'];
    const columna2 = ['Modelo', 'Marca', 'Año', 'Titulo', 'Notas'];
    const columna3 = ['Precio Base'];
    const columna5 = ['Extra Fees' ];
    const columna6 = ['Storage'];
    const columna7 = ['Deposito'];
    const columna4 = ['Total a pagar:'];

    const datos1= [[`${nombre}`,`${telefono}`,`${lot}`,`${direccion}` ]];

    const datos2 = [[`${modelo}`,`${marca}`,`${anio}`,`${titulo}`,`${notas}`]];

    const datos3 = [["$ "+`${precio}`]];
    const datos5 = [["$ "+`${fees}`,]];
    const datos6 = [["$ "+`${storage}`]];
    const datos7 = [["$ -"+`${deposito}`]];
    var total = (Number(`${precio}`)+Number(`${fees}`)+Number(`${storage}`)-Number(`${deposito}`));
    const datos4= [["$ "+total]];

    const copart = `https://www.copart.com/lot/55108684`;
    
    autoTable(doc, {
        startY:30,
        theme: 'grid',
        head: [columna1],
        body: datos1
        
    })

    autoTable(doc, {
        startY:50,
        theme: 'grid',
        head: [columna2],
        body: datos2
    })

    autoTable(doc, {
        startY:70,
        theme: 'grid',
        head: [columna3],
        body: datos3,
        margin:{left:160},
        headerStyles:{
            cellPadding: 2, // a number, array or object (see margin below)
            fontSize: 14,
            font: "times", // helvetica, times, courier
            fontStyle: 'normal', // normal, bold, italic, normal
            halign: 'right', // left, center, right
            valign: 'top', // top, middle, bottom


        },
        bodyStyles:{
            cellPadding: 2, // a number, array or object (see margin below)
            fontSize: 14,
            font: "courier", // helvetica, times, courier
            lineColor: 200,

            fontStyle: 'normal', // normal, bold, italic, normal
            fillColor: 200, // false for transparent or a color as described below
            textColor: 0,
            halign: 'right', // left, center, right
            valign: 'middle', // top, middle, bottom
            columnWidth: 'auto' // 'auto', 'wrap' or a number
        }
    })
    autoTable(doc, {
        startY:90,                
        theme: 'grid',
        head: [columna5],
        body: datos5,
        margin:{left:160},
        headerStyles:{
            cellPadding: 2, // a number, array or object (see margin below)
            fontSize: 14,
            font: "times", // helvetica, times, courier
            fontStyle: 'normal', // normal, bold, italic, normal
            halign: 'right', // left, center, right
            valign: 'top', // top, middle, bottom


        },
        bodyStyles:{
            cellPadding: 2, // a number, array or object (see margin below)
            fontSize: 14,
            font: "courier", // helvetica, times, courier
            lineColor: 200,

            fontStyle: 'normal', // normal, bold, italic, normal
            fillColor: 200, // false for transparent or a color as described below
            textColor: 0,
            halign: 'right', // left, center, right
            valign: 'middle', // top, middle, bottom
            columnWidth: 'auto' // 'auto', 'wrap' or a number
        }
    })
    autoTable(doc, {
        startY:110,                
        theme: 'grid',
        head: [columna6],
        body: datos6,
        margin:{left:160},
        headerStyles:{
            cellPadding: 2, // a number, array or object (see margin below)
            fontSize: 14,
            font: "times", // helvetica, times, courier
            fontStyle: 'normal', // normal, bold, italic, normal
            halign: 'right', // left, center, right
            valign: 'top', // top, middle, bottom


        },
        bodyStyles:{
            cellPadding: 2, // a number, array or object (see margin below)
            fontSize: 14,
            font: "courier", // helvetica, times, courier
            lineColor: 200,

            fontStyle: 'normal', // normal, bold, italic, normal
            fillColor: 200, // false for transparent or a color as described below
            textColor: 0,
            halign: 'right', // left, center, right
            valign: 'middle', // top, middle, bottom
            columnWidth: 'auto' // 'auto', 'wrap' or a number
        }

    })
    autoTable(doc, {
        startY:130,                
        theme: 'grid',
        head: [columna7],
        body: datos7,
        margin:{left:160},
        headerStyles:{
            cellPadding: 2, // a number, array or object (see margin below)
            fontSize: 14,
            font: "times", // helvetica, times, courier
            fontStyle: 'normal', // normal, bold, italic, normal
            halign: 'right', // left, center, right
            valign: 'top', // top, middle, bottom


        },
        bodyStyles:{
            cellPadding: 2, // a number, array or object (see margin below)
            fontSize: 14,
            font: "courier", // helvetica, times, courier
            lineColor: 200,

            fontStyle: 'normal', // normal, bold, italic, normal
            fillColor: 200, // false for transparent or a color as described below
            textColor: 0,
            halign: 'right', // left, center, right
            valign: 'middle', // top, middle, bottom
            columnWidth: 'auto' // 'auto', 'wrap' or a number
        }

    })


    autoTable(doc, {
        startY:150,                
        
        head: [columna4],
        body: datos4,
        margin:{left:160},
        headerStyles:{
            cellPadding: 2, // a number, array or object (see margin below)
            fontSize: 14,
            font: "helvetica", // helvetica, times, courier
            lineColor:0,
            fontStyle: 'normal', // normal, bold, italic, normal
            fillColor: 0, // false for transparent or a color as described below
            textColor: 255,
            halign: 'center', // left, center, right
            valign: 'top', // top, middle, bottom


        },
        bodyStyles:{
            cellPadding: 2, // a number, array or object (see margin below)
            fontSize: 25,
            font: "helvetica", // helvetica, times, courier
            lineColor:[0, 163, 108],

            fontStyle: 'bold', // normal, bold, italic, normal
            fillColor: 120, // false for transparent or a color as described below
            textColor: 0,
            halign: 'right', // left, center, right
            valign: 'middle', // top, middle, bottom
            columnWidth: 'auto' // 'auto', 'wrap' or a number
        }

    })
    
    doc.autoPrint({variant: 'non-conform'});
    doc.output('dataurlnewwindow');
    doc.autoPrint({variant: 'non-conform'});

    if (subasta == 'Copart')  {
      window.open(`https://www.copart.com/lot/`+lot, '_blank', 'width = 650, height = 800');
    }  else if (subasta == 'Iaai') { window.open(`https://www.iaai.com/VehicleDetail/`+lot+'~US', '_blank', 'width = 700, height = 850'); }
    


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
    Axios.get(`https://krriers.moveurads.com/caja`).then((response)=>{
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
      REPORTE DE PEDIDOS POR FECHA de KRRIERS
    </div>
    <div className="card-body">
      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Fecha Inicial del Reporte:</span>
          <input type="date" 
         maxLength={10}
         onChange={(event)=>{
          setFechaInicial(event.target.value);
          onCajaChange(event.target.value);
          }}
         className="form-control" value={fechainicial} placeholder="Fecha Inicial" aria-label="Username" aria-describedby="basic-addon1"/>

        <span className="input-group-text" id="basic-addon1">Fecha Final del Reporte:</span>
          <input type="date" 
         maxLength={10}
         onChange={(event)=>{
          setFechaFinalReporte(event.target.value);
          onCajaChange2(event.target.value);
          
          }}
         className="form-control" value={fechafinalreporte} placeholder="Fecha Final Reporte" aria-label="Username" aria-describedby="basic-addon1"/>
   </div>
   
      
    <div className="card-footer text-muted">
          
              <div>
                <button className='btn btn-outline-success m-2' onClick={generapdf}>Imprimir Reporte</button> 
              </div>
              
                </div>
           
    </div>

    </div>

    
    
<table className="table table-borderless table-hover" style={{overflowY: 'scroll', maxHeight: '450px', display: 'inline-block', paddingLeft: '15px', }}>
    <thead className="sticky-top">
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Telefono</th>
          <th scope="col">Buyer</th>
          <th scope="col">Lote</th>
          <th scope="col">Subasta</th>
          <th scope="col">Fecha Pedido</th>
          <th scope="col">Extra fees</th>
          <th scope="col">Deposito</th>
          <th scope="col">Modelo</th>
          <th scope="col">Transportista</th>
          <th scope="col">Cobro Final</th>


        </tr>
      </thead>
    <tbody>


    {
      filteredCaja.map((val,key)=>{
     if (fechainicial === "" && fechafinalreporte === ""){ 
                  return <tr key={val.id}>
                        <th scope="row">{val.nombre}</th>
                        <td>{val.telefono}</td>
                        <td>{val.buyer}</td>
                        <td>{val.lot}</td>
                        <td>{val.subasta}</td>
                        <td>{moment(val.fecha).format("LL")}</td>
                        <td>$ {val.fees}</td>
                        <td>$ {val.deposito}</td>
                        <td>{val.modelo}</td>
                        <td>{val.nombrecarrier}</td>
                        <td>{val.preciofinal}</td>
                      </tr>
                     
                } else if (val.fecha >= fechainicial && val.fecha <= fechafinalreporte){ 
                  return <tr key={val.id}>
                        <th scope="row">{val.nombre}</th>
                        <td>{val.telefono}</td>
                        <td>{val.buyer}</td>
                        <td>{val.lot}</td>
                        <td>{val.subasta}</td>
                        <td>{moment(val.fecha).format("LL")}</td>
                        <td>$ {val.fees}</td>
                        <td>$ {val.deposito}</td>
                        <td>{val.modelo}</td>
                        <td>{val.nombrecarrier}</td>
                        <td>$ {val.preciofinal}</td>
                      </tr>
                     
                }
              }
            )

            }

                   
      </tbody>
</table>
</div>



);
}

export default Caja;

