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
  const [color, setColor] = useState("");
 
 
 
  
  const handleDateChange = (date) =>{
    console.log(date)
    setFechaFinal(date);

  };
  const CalendarContainer = ({ children }) => {
    const el = document.getElementById("calendar-portal");
  
    return <Portal container={el}>{children}</Portal>;
  };

  useEffect(() => {
    getCaja();
  }, [])

    
  const update = ()=> {
    const bodyCarga = {
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
      preciofinal:preciofinal,
      color:color
    }
    Axios.put(`https://krriers.moveurads.com/caja`,bodyCarga).then(()=>{
        getCaja();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualización Exitosa!!!</strong>",
          html: "<i>El Lote <strong>"+lot+"</strong> fue Actualizado con Exito!!!</i>",
          icon: 'success',
          timer:3000
        });
        window.location.reload()
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
    doc.addImage(logo, 'PNG', 135,5,60,16);
    doc.text('Invoice', 160, 35,);

    const columna1 = ['Nombre', 'Telefono', 'Lote', 'Subasta'];
    const columna2 = ['Modelo', 'Marca', 'Año', 'Color', 'Titulo', 'Notas'];
    const columna3 = ['Precio Base'];
    const columna5 = ['Extra Fees' ];
    const columna6 = ['Storage'];
    const columna7 = ['Deposito'];
    const columna4 = ['Total a pagar:'];
    const columna11 = ['Krriers 956, LLC.'];
    const columna8 = ['3407 E. US Highway 281, Hidalgo, TX. 78577'];
    const columna9 = ['Phone (956) 627-1318 Whatsapp (956) 961-1991'];
    const columna10 = ['No nos hacemos responsables por catalizadores, títulos, llaves y/o partes sueltas que la subasta no entregue, daños ocasionados por el uso de Montacargas en la maniobra de carga y descarga, tampoco por daños presentes en el vehículo al momento de la carga o partes que se vuelen en el traslado Se requiere el pago total en los próximos 5 días hábiles posteriores a la llegada a nuestras instalaciones, posterior a los 5 días se cobrará multa de $ 150.00 USD mas $ 5.00 USD diarios por concepto de Storage, Al undécimo día hábil posterior el vehículo serña retirado de nuestras instalaciones con un Cargo adicional de $ 150.00 mas $ 20.00 dólares díarios'];
    const columna16 = ['Customer Signature'];
    const columna20 = ['Signature'];
    const columna17 = ['Keys Yes [   ]  No  [   ]'];
    const columna18 = ['Title Yes [   ]  No  [   ]  Correo [   ]  Pendiente  [   ]'];
    const columna19 = ['Entregado Yes [   ]  No  [   ]'];

    const datos1= [[`${nombre}`,`${telefono}`,`${lot}`,`${direccion}` ]];

    const datos2 = [[`${modelo}`,`${marca}`,`${anio}`,`${color}`,`${titulo}`,`${notas}`]];

    const datos3 = [["$ "+`${precio}`]];
    const datos5 = [["$ "+`${fees}`,]];
    const datos6 = [["$ "+`${storage}`]];
    const datos7 = [["$ -"+`${deposito}`]];
    
    var total = (Number(`${precio}`)+Number(`${fees}`)+Number(`${storage}`)-Number(`${deposito}`));
    const datos4= [["$ "+total]];

    const copart = `https://www.copart.com/lot/55108684`;
    
    autoTable(doc, {
        startY:40,
        theme: 'grid',
        head: [columna1],
        body: datos1
        
    })

    autoTable(doc, {
        startY:60,
        theme: 'grid',
        head: [columna2],
        body: datos2
    })

    autoTable(doc, {
        startY:90,
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
        startY:110,                
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
        startY:130,                
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
        startY:150,                
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
        startY:170,                
        
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

    autoTable(doc, {
      startY:200,                
      
      head: [columna10],
      margin:{left:25},
      headerStyles:{
          cellPadding: 2, // a number, array or object (see margin below)
          fontSize: 7,
          font: "helvetica", // helvetica, times, courier
          lineColor:0,
          fontStyle: 'normal', // normal, bold, italic, normal
          fillColor: false, // false for transparent or a color as described below
          textColor: 0,
          halign: 'center', // left, center, right
          valign: 'top', // top, middle, bottom
      },
    })

    

    autoTable(doc, {
      startY:230,                
      
      head: [columna16],
      margin:{left:140},
      headerStyles:{
          cellPadding: 2, // a number, array or object (see margin below)
          fontSize: 10,
          font: "helvetica", // helvetica, times, courier
          lineColor:0,
          fontStyle: 'normal', // normal, bold, italic, normal
          fillColor: false, // false for transparent or a color as described below
          textColor: 0,
          halign: 'left', // left, center, right
          valign: 'top', // top, middle, bottom
      },
    })

    autoTable(doc, {
      startY:120,                
      
      head: [columna17],
      theme: 'grid',
      margin:{left:25, right:130},
      headerStyles:{
          cellPadding: 2, // a number, array or object (see margin below)
          fontSize: 10,
          font: "helvetica", // helvetica, times, courier
          lineColor:0,
          fontStyle: 'normal', // normal, bold, italic, normal
          fillColor: 120, // false for transparent or a color as described below
          textColor: 255,
          halign: 'left', // left, center, right
          valign: 'top', // top, middle, bottom
      },
    })

    autoTable(doc, {
      startY:130,                
      
      head: [columna18],
      theme: 'grid',
      margin:{left:25, right:130},
      headerStyles:{
          cellPadding: 2, // a number, array or object (see margin below)
          fontSize: 10,
          font: "helvetica", // helvetica, times, courier
          lineColor:0,
          fontStyle: 'normal', // normal, bold, italic, normal
          fillColor: 200, // false for transparent or a color as described below
          textColor: 0,
          halign: 'left', // left, center, right
          valign: 'top', // top, middle, bottom
      },
    })

    autoTable(doc, {
      startY:144,                
      
      head: [columna19],
      theme: 'grid',
      margin:{left:25, right:130},
      headerStyles:{
          cellPadding: 2, // a number, array or object (see margin below)
          fontSize: 10,
          font: "helvetica", // helvetica, times, courier
          lineColor:0,
          fontStyle: 'normal', // normal, bold, italic, normal
          fillColor: 120, // false for transparent or a color as described below
          textColor: 255,
          halign: 'left', // left, center, right
          valign: 'top', // top, middle, bottom
      },
    })

    autoTable(doc, {
      startY:230,                
      
      head: [columna20],
      margin:{left:60},
      headerStyles:{
          cellPadding: 2, // a number, array or object (see margin below)
          fontSize: 10,
          font: "helvetica", // helvetica, times, courier
          lineColor:0,
          fontStyle: 'normal', // normal, bold, italic, normal
          fillColor: false, // false for transparent or a color as described below
          textColor: 0,
          halign: 'left', // left, center, right
          valign: 'top', // top, middle, bottom
      },
    })

    autoTable(doc, {
      startY:245,                
      
      head: [columna11],
      margin:{left:25},
      headerStyles:{
          cellPadding: 2, // a number, array or object (see margin below)
          fontSize: 13,
          font: "helvetica", // helvetica, times, courier
          lineColor:0,
          fontStyle: 'bold', // normal, bold, italic, normal
          fillColor: false, // false for transparent or a color as described below
          textColor: 0,
          halign: 'center', // left, center, right
          valign: 'top', // top, middle, bottom
      },
    })


    autoTable(doc, {
      startY:250,                
      
      head: [columna8],
      margin:{left:25},
      headerStyles:{
          cellPadding: 2, // a number, array or object (see margin below)
          fontSize: 10,
          font: "helvetica", // helvetica, times, courier
          lineColor:0,
          fontStyle: 'normal', // normal, bold, italic, normal
          fillColor: false, // false for transparent or a color as described below
          textColor: 0,
          halign: 'center', // left, center, right
          valign: 'top', // top, middle, bottom
      },
    })

    autoTable(doc, {
      startY:255,                
      
      head: [columna9],
      margin:{left:25},
      headerStyles:{
          cellPadding: 2, // a number, array or object (see margin below)
          fontSize: 10,
          font: "helvetica", // helvetica, times, courier
          lineColor:0,
          fontStyle: 'normal', // normal, bold, italic, normal
          fillColor: false, // false for transparent or a color as described below
          textColor: 0,
          halign: 'center', // left, center, right
          valign: 'top', // top, middle, bottom
      },
    })
    
    doc.autoPrint({variant: 'non-conform'});
    // doc.output('dataurlnewwindow');
    doc.save(`facturaNo.${lot}.pdf`);
    doc.autoPrint({variant: 'non-conform'});

    if (subasta === 'Copart')  {
      window.open(`https://www.copart.com/lot/`+lot, '_blank', 'width = 650, height = 800');
    }  else if (subasta === 'Iaai') { window.open(`https://www.iaai.com/VehicleDetail/`+lot+'~US', '_blank', 'width = 700, height = 850'); }
    


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
  setColor("");
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
  setColor(val.color);
  setStorage(val.storage);
  var total = (Number(`${val.precio}`)+Number(`${val.fees}`)+Number(`${val.storage}`)-Number(`${val.deposito}`));
  setPrecioFinal(total);
 
  
}

  const getCaja = ()=> {
    Axios.get(`https://krriers.moveurads.com/caja`).then((response)=>{
        setCaja(response.data);
        setFilteredCaja(response.data);
        var total = (Number(`${precio}`)+Number(`${fees}`)+Number(`${storage}`)-Number(`${deposito}`));
        setPrecioFinal(total);
    });

  } 
  
  const onCajaChange = (lotValue) => {
    lotValue = lotValue.toLowerCase();
    const filteredItems =cajaList.filter((client) => {
      return client.lot.toLowerCase().includes(lotValue)
    })
    setFilteredCaja(filteredItems)
  }
  

    return (
      <div className="container"> 
             
    <div className="card text-center">
     <div className="card-header">
    CAJA KRRIERS
    </div>
    <div className="card-body">
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Lote:</span>
        <input type="number" 
         maxLength={14}
         onChange={(event)=>{
          onCajaChange(event.target.value);
          setLot(event.target.value);
          }}
         className="form-control" value={lot} placeholder="Numero de Lote" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>
  
      <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1">Extra Fees: $</span>
         <input type="number" 
         maxLength={10}
         onChange={(event)=>{
          setFee(event.target.value);
          setPrecioFinal(Number(`${preciofinal}`)-Number(`${fees}`)+Number(`${event.target.value}`));
          }}
         className="form-control" value={fees} placeholder="Extra Fees" aria-label="Username" aria-describedby="basic-addon1"/>
         
         <span className="input-group-text" id="basic-addon1">Precio flete: $</span>
         <input type="number" 
          maxLength={10}
          onChange={(event)=>{
          setPrecio(event.target.value);
          setPrecioFinal(Number(`${preciofinal}`)-Number(`${precio}`)+Number(`${event.target.value}`));
          }}

         className="form-control" value={precio} placeholder="Precio de flete" aria-label="Username" aria-describedby="basic-addon1"/>
      
         <span className="input-group-text" id="basic-addon1">Storage fees: $</span>
         <input type="number" 
         maxLength={10}
         onChange={(event)=>{
          setStorage(event.target.value);
          setPrecioFinal(Number(`${preciofinal}`)-Number(`${storage}`)+Number(`${event.target.value}`));
          }}
         className="form-control" value={storage} placeholder="Storage" aria-label="Username" aria-describedby="basic-addon1"/>
      
         <span className="input-group-text" id="basic-addon1">Deposito: $-</span>
         <input type="number" 
         maxLength={10}
         onChange={(event)=>{
          setDeposito(event.target.value);
          setPrecioFinal(Number(`${preciofinal}`)+Number(`${deposito}`)-Number(`${event.target.value}`));
          }}
         className="form-control" value={deposito} placeholder="Deposito" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>
      
      <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1">Notas:</span>
         <input type="text" 

         className="form-control" value={notas} placeholder="Notas de Llegada" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon4">Tiene Titulo:</span>
          <div className="input-group-text">
        
            <div className="custom-control custom-radio my-auto mx-3">
              <input type="radio" id="customRadioInline1" name="customRadioInline1" className="custom-control-input" value="S"
                        onChange={(event)=>{
                          setTitulo(event.target.value);
                          }}
                        
                      />
                <label className="custom-control-label" htmlFor="customRadioInline1">Si</label>
            </div>

            <div className="custom-control custom-radio my-auto mx-3">
              <input type="radio" id="customRadioInline2" name="customRadioInline1" className="custom-control-input" value="N"
                      onChange={(event)=>{
                        setTitulo(event.target.value);
                      }}/>
              <label className="custom-control-label" htmlFor="customRadioInline2">No</label>
            </div>
            <div className="custom-control custom-radio my-autom mx-3">
          <input type="radio" id="customRadioInline2" name="customRadioInline1" className="custom-control-input" value="M"
                  onChange={(event)=>{
                    setTitulo(event.target.value);
                  }}/>
          <label className="custom-control-label" htmlFor="customRadioInline2">Mail</label>
         </div>
         <div className="custom-control custom-radio my-auto mx-3">
          <input type="radio" id="customRadioInline3" name="customRadioInline1" className="custom-control-input" value="P"
                  onChange={(event)=>{
                    setTitulo(event.target.value);
                  }}/>
          <label className="custom-control-label" htmlFor="customRadioInline3">Pending</label>
         </div>
         <div className="custom-control custom-radio my-auto mx-3">
          <input type="radio" id="customRadioInline4" name="customRadioInline1" className="custom-control-input" value="B"
                  onChange={(event)=>{
                    setTitulo(event.target.value);
                  }}/>
          <label className="custom-control-label" htmlFor="customRadioInline4">BOS</label>
         </div>
          </div>
      </div>
      
      <div className="input-group mb-3">
         
         <span className="input-group-text" id="basic-addon5">Fecha de cierre pedido:</span>
         <div className="input-group-text">
            
          
             <DatePicker
              closeOnScroll={true}
              showIcon
              toggleCalendarOnIconClick 
              placeholderText='Coloque la fecha aquí' 
              selected={fechafinal}
              onChange={handleDateChange}
              dateFormat="MM/dd/YYYY"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              popperPlacement="top-start"
              popperContainer={CalendarContainer}

              />
          
        </div>
        <span className="input-group-text" id="basic-addon1">Precio Final: $</span>
         <input type="number" disabled 
          className="form-control" value={preciofinal} placeholder="Precio Final" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
    </div>
   
      
    <div className="card-footer text-muted">
          
              <div>
                <button className='btn btn-outline-success m-2' onClick={generapdf}>Cobrar</button> 
                <button className='btn btn-outline-dark m-2' onClick={update} disabled={!fechafinal}>Finalizar Cobro</button> 
                <button className='btn btn-outline-danger m-2' onClick={limpiarCampos}>Cancelar</button>
                </div>
              
                </div>
           
    </div>
    
<table className="table table-borderless table-hover" style={{overflowY: 'scroll', maxHeight: '300px', display: 'inline-block', paddingLeft: '60px', }}>
    <thead className="sticky-top">
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Buyer</th>
          <th scope="col">Lote</th>
          <th scope="col">Subasta</th>
          <th scope="col">Fecha Llegada</th>
          <th scope="col">Extra fees</th>
          <th scope="col">Deposito</th>
          <th scope="col">Notas</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>

    {
      filteredCaja.map((val,key)=>{
                return <tr key={val.id}>
                        <th scope="row">{val.nombre}</th>
                        <td>{val.buyer}</td>
                        <td>{val.lot}</td>
                        <td>{val.subasta}</td>
                        <td>{moment(val.fechallegada).format("LL")}</td>
                        <td>$ {val.fees}</td>
                        <td>$ {val.deposito}</td>
                        <td>{val.notas}</td>
                        <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" 
                          onClick={()=>{
                            editarCaja(val);

                            }}   
                          className="btn btn-outline-primary">Seleccionar</button>
                          </div>
                          </td>
                </tr>
                     
              })

            }

                   
      </tbody>
</table>
</div>

// 


);
}

export default Caja;

