import './App.css';
import { useState, useEffect, useMemo } from "react"
import Axios from "axios";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import { Portal } from "react-overlays";
import moment from 'moment';
import Select, { createFilter } from 'react-select';
import { jsPDF } from 'jspdf';

import autoTable from 'jspdf-autotable';


import Swal from 'sweetalert2';



function Pedidos() {

    const[marca, setMarca] = useState("");
    const[modelo, setModelo] = useState("");
    const[anio, setAnio] = useState("");
    const[fees, setFee] = useState("");
    const[storage, setStorage] = useState("");    
    const[buyer, setBuyer] = useState("");
    const[telefono, setTelefono] = useState("");
    const[nombre, setNombre] = useState("");
    const[estado, setEstado] = useState("");
    const[lot, setLot] = useState("");
    const[color, setColor] = useState("");
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
    const[pagocarrier, setPagoCarrier] = useState();
    const[editar, setEditar] = useState(false);
      
    const [pedidosList,setPedidos] = useState([]);
    const [filteredPedidos, setFilteredPedidos] = useState([]);

    const [anioList, setAnioList] = useState([]);
    const [marcaList,setMarcaList] = useState([]);
    const [modeloList, setModeloList] = useState([]);
    const [subastaList, setSubastaList] = useState([]);
    const [subastaSelectList, setSubastaSelectList] = useState([]);
    const [subastaDirList, setSubastaDirList] = useState([]);

    //const [marcaCompleted, setMarcaCompleted] = useState(false);
  
   
    function InputWIthSearchAnio({value, onChange, clear}){
        return(
            <div className="main mx-2">
                <div style={{display: 'flex', borderWidth: 1, borderColor: 'GrayText', borderStyle: 'solid'}} className='py-2'>
                  <input style={{borderStyle: 'none'}} type="dataanio" autoComplete="on" list="dataanio" onChange={onChange} placeholder="Año" value={value}/>
                  {value && <button className='btn py-0 my-0' type='button' onClick={clear}>x</button>}
                </div>
                <datalist id="dataanio">
                    {anioList.map((op, i)=><option key={i} value={op.anio}></option>)}
                </datalist>
            </div>
        );
    }

    const getModeloFromMarca = (value) => {
      const completed = marcaList.some(d => d.marca === value)
      if(completed){

        getModelo(value)
      }
    }

    const disabled = useMemo(() => {
      return !marcaList.some(d => d.marca === marca)
    }, [marca])

    // useEffect(() => {
    //   const completed = marcaList.some(d => d.marca === marca)
    //   setMarcaCompleted(completed)
    // }, [marca])

    function InputWIthSearchMarca({value, onChange, clear}){
        return(
            <div className="main mx-2">
              <div style={{display: 'flex', borderWidth: 1, borderColor: 'GrayText', borderStyle: 'solid'}} className='py-2'>
                <input style={{borderStyle: 'none'}} type="datamarca" autoComplete="on" list="datamarca" onChange={onChange} placeholder="Marca" value={value} />
                {value && <button className='btn py-0 my-0' type='button' onClick={clear}>x</button>}
              </div>
              <datalist id="datamarca">
                  {marcaList.map((op, i)=><option key={i} value={op.marca}></option>)}
              </datalist>
            </div>
        );
    }

    function InputWIthSearchModelo({value, onChange, disabled, clear}){
        const data=[modelo]

        return(
            <div className="main mx-2">
              <div style={{display: 'flex', borderWidth: 1, borderColor: 'GrayText', borderStyle: 'solid'}} className='py-2'>
                <input style={{borderStyle: 'none'}} list="datamodelo" onChange={onChange} placeholder="Modelo" value={value} disabled={disabled} />
                {value && <button className='btn py-0 my-0' type='button' onClick={clear}>x</button>}
              </div>
                <datalist id="datamodelo">
                    {modeloList.map((op, i)=><option key={i} value={op.modelo}></option>)}
                </datalist>
            </div>
        );
    }

    function InputWIthSearchSubasta({value, onChange, clear}){
        const data=[subasta]

        return(
            <div className="main">
              <div style={{display: 'flex', borderWidth: 1, borderColor: 'GrayText', borderStyle: 'solid'}} className='py-2'>
                <input style={{borderStyle: 'none'}} list="datasubasta" onChange={onChange} placeholder="Subasta" value={value} />
                {value && <button className='btn py-0 my-0' type='button' onClick={clear}>x</button>}
              </div>
                <datalist id="datasubasta">
                    {subastaSelectList.map((op, i)=><option key={i} value={op.subasta}></option>)}
                </datalist>
            </div>
        );
    }

    function InputWIthSearchDireccion({value, onChange, clear}){
        const data=[direccion]
        
        return(
            <div className="main">
              <div style={{display: 'flex', borderWidth: 1, borderColor: 'GrayText', borderStyle: 'solid'}} className='py-2'>
                <input style={{borderStyle: 'none'}} list="datadireccion" onChange={onChange} placeholder="Direccion Subasta" value={value} />
                {value && <button className='btn py-0 my-0' type='button' onClick={clear}>x</button>}
              </div>
                <datalist id="datadireccion">
                    {subastaDirList.map((op, i)=><option key={i} value={op.direccion}></option>)}
                </datalist>
            </div>
        );
    }




  const handleDateChange = (date) =>{
    console.log(date)
    setFecha(date);

  };
  const CalendarContainer = ({ children }) => {
    const el = document.getElementById("calendar-portal");
  
    return <Portal container={el}>{children}</Portal>;
  };

    useEffect(() => {
    getPedidos();
  }, [])

  useEffect(() => {
    getAnio();
  }, [])

  useEffect(() => {
    getMarca();
  }, [])

//   useEffect(() => {
//     getModelo();
//   }, [])

  useEffect(() => {
    getSubastas();
  }, [])

  useEffect(() => {
    getSubastasDireccion();
  }, [])

  useEffect(() => {
    getSubastaPedidos();
  }, [])

  const add = ()=> {
    if (!telefono || !nombre || !buyer || !lot || !pin || !anio || !marca || !modelo || !subasta || !fecha || !direccion || !precio || !color){
      return;
    }
// Validar pedido existente por lote

    getPedidos();
    const lotExiste = pedidosList.find(val => {
      return val.lot === lot
    })
    if (lotExiste) {
      limpiarCampos();
        Swal.fire({
          title: "<strong>El Lote ya Existe!</strong>",
          html: "<i>El Lote <strong>"+telefono+"</strong> ya está Registrado!</i>",
          icon: 'error',
          timer:5000
        });
      return;
    }
    
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
      color:color,
      deposito:deposito,
      fechallegada:fechallegada,
      feescarrier:feescarrier,
      fechaasignacarrier:fechaasignacarrier,
      nombrecarrier:nombrecarrier,
      estado: estado
    }

      
      
    Axios.post(`https://krriers.moveurads.com/pedidosabc`,bodyCarga).then(()=>{
        getPedidos();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro Existo!!!</strong>",
          html: "<i>El Pedido <strong>"+lot+"</strong> fue Registrado con Exito!!!</i>",
          icon: 'success',
          timer:5000
        });
        generapdf();
        window.location.reload()
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró Dar de Alta el pedido!",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
        timer: 3000
      });

    });

  }

  const update = ()=> {
    const bodyCargaPut = {
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
      color:color,
      fechafinal:fechafinal,
      deposito:deposito,
      fechallegada:fechallegada,
      feescarrier:feescarrier,
      fechaasignacarrier:fechaasignacarrier,
      nombrecarrier:nombrecarrier,
      estado: estado
    }

    Axios.put(`https://krriers.moveurads.com/pedidosabc`,bodyCargaPut).then(()=>{
        getPedidos();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualización Exitosa!!!</strong>",
          html: "<i>El Cliente <strong>"+nombre+"</strong> fue Actualizado con Exito!!!</i>",
          icon: 'success',
          timer:5000
        });
        window.location.reload()
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró Actualizar al cliente!",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
        timer: 3000
      });

    })

  }

  const deletePedidos = (val)=> {

      Swal.fire({
        title: "Confirmar Eliminar?",
        html: "<i>Realmente desea eliminar el lote No. <strong>"+val.lot+"</strong></i>",
        text: "No Podremos deshacer esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminarlo!"
      }).then((result) => {
        if (result.isConfirmed) {
          Axios.delete(`https://krriers.moveurads.com/pedidosabc/${val.id}`).then(()=>{
            getPedidos();
            limpiarCampos();
            Swal.fire({
              icon: "success",
              title: val.lot+ ' fue eliminado',
              showConfirmButton: false,
              timer: 5000
            });
            window.location.reload()
        }).catch(function(error){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se logró Eliminar el pedido!",
            footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
            timer: 3000
              });
            })
          }
        });
      }

  const limpiarCampos = ()=> {
 
  setId();
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
  setColor("");
  setFee("");
  setTitulo("");
  setNotas("");
  setFechaFinal("");
  setStorage("");
  setDeposito("");
  setFechaLlegada("");
  setFeesCarrier("");
  setEstado("");
  setFechaAsignaCarrier("");
  setNombreCarrier("");
  setEditar(false);
  }


const editarPedidos = (val)=>{
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
    setColor(val.color);
    setStorage(val.storage);
    setFechaFinal(val.fechafinal);
    setDeposito(val.deposito);
    setFechaLlegada(val.fechallegada);
    setFeesCarrier(val.feescarrier);
    setFechaAsignaCarrier(val.fechaasignacarrier);
    setNombreCarrier(val.nombrecarrier);
    setEstado(val.estado);
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

  
  const getPedidos = ()=> {
    Axios.get(`https://krriers.moveurads.com/pedidosabc`).then((response)=>{
        setPedidos(response.data);
        setFilteredPedidos(response.data);
    });

  } 

  const getAnio = ()=> {
    Axios.get(`https://krriers.moveurads.com/anioautos`).then((response)=>{
        setAnioList(response.data);
     });

  } 

  const getMarca = ()=> {
    Axios.get(`https://krriers.moveurads.com/marcaautos`).then((response)=>{
        setMarcaList(response.data);
    });

  } 

  const getModelo = (value) => {
      Axios.get(`https://krriers.moveurads.com/modeloautos/${value}`).then((response)=>{
          setModeloList(response.data);
      });

  }

  const getSubastas = () => {
    Axios.get(`https://krriers.moveurads.com/subastas`).then((response)=>{
      setSubastaList(response.data);
  });
  }

  const getSubastasDireccion = () => {
    Axios.get(`https://krriers.moveurads.com/direccionpedidos`).then((response)=>{
      setSubastaDirList(response.data);
  });
  }

  const getSubastaPedidos = () => {
    Axios.get(`https://krriers.moveurads.com/subastaspedidos`).then((response)=>{
      setSubastaSelectList(response.data);
  });
  }
 
   useEffect(() => {
    const filteredItems = pedidosList.filter((client) => {
      return client.lot.includes(lot)
    })
    setFilteredPedidos(filteredItems)
  }, [lot,pedidosList])

    return (
      <div className="container"> 
             
    <div className="card text-center">
     <div className="card-header">
     MANTENIMIENTO BASE DE DATOS PEDIDOS KRRIERS
    </div>
    <div className="card-body">
      
    <div className="input-group mb-2">
          <span className="input-group-text" id="basic-addon1">Lote:</span>
         <input type="number" 
         maxLength={12}
         onChange={(event)=>{
          setLot(event.target.value);
          }}
         className="form-control" value={lot} placeholder="Numero de Lote" aria-label="Username" aria-describedby="basic-addon1"/>
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
         <input type="text" 
         maxLength={45}
         onChange={(event)=>{
          setNombre(event.target.value);
          }}
         className="form-control" value={nombre} placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>
       
       <div className="input-group mb-2">
         <span className="input-group-text" id="basic-addon1">Telefono:</span>
         <PhoneInput
         placeholder="Telefono" value={telefono} onChange={setTelefono} defaultCountry='US' international
          ></PhoneInput>
          
        </div>

      <div className="input-group mb-2">
          <span className="input-group-text" id="basic-addon1">Buyer:</span>
         <input type="number" 
         maxLength={10}
         onChange={(event)=>{
          setBuyer(event.target.value);
          }}
         className="form-control" value={buyer} placeholder="Buyer" aria-label="Username" aria-describedby="basic-addon1"/>
         <span className="input-group-text" id="basic-addon1">Numero de Pin:</span>
         <input type="text" 
         maxLength={10}
         onChange={(event)=>{
          setPin(event.target.value);
          }}
         className="form-control" value={pin} placeholder="Numero de PIN" aria-label="Username" aria-describedby="basic-addon1"/>
         <span className="input-group-text" id="basic-addon1">Precio Flete $</span>
         <input type="text" 
         maxLength={10}
         onChange={(event)=>{
          setPrecio(event.target.value);
          }}
         className="form-control" value={precio} placeholder="Precio de Flete" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        
      <div className="input-group mb-2">
          <span className="input-group-text" id="basic-addon1">Año:</span>
          <InputWIthSearchAnio
            value={anio} onChange={(e)=>setAnio(e.target.value)} clear={() => {setAnio("")}}
            ></InputWIthSearchAnio>
                                          
         <span className="input-group-text" id="basic-addon1">Marca:</span>
         <InputWIthSearchMarca
            value={marca} onChange={(e)=>{
              setMarca(e.target.value)
              getModeloFromMarca(e.target.value)
            }}
            clear={() => {setMarca("")}}
            ></InputWIthSearchMarca>

         <span className="input-group-text" id="basic-addon1">Modelo:</span>
         <InputWIthSearchModelo
            value={modelo} onChange={(e)=>setModelo(e.target.value)} disabled={disabled} clear={() => {setModelo("")}}
            ></InputWIthSearchModelo>
            <span className="input-group-text" id="basic-addon1">Deposito $</span>
             <input type="text" 
             maxLength={10}
             onChange={(event)=>{
             setDeposito(event.target.value);
             }}
         className="form-control" value={deposito} placeholder="Deposito" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

      <div className="input-group mb-2">
          <span className="input-group-text" id="basic-addon1">Subasta:</span>
          <InputWIthSearchSubasta
            value={subasta} onChange={(e)=>{
              setSubasta(e.target.value) 
             }} 
            clear={() => {setSubasta("")}}
          ></InputWIthSearchSubasta>
          <span className="input-group-text" id="basic-addon1">Estado:</span>
         <input type="text" 
         maxLength={45}
         onChange={(event)=>{
          setEstado(event.target.value);
          }}
         className="form-control" value={estado} placeholder="Estado" aria-label="Username" aria-describedby="basic-addon1"/>
          <span className="input-group-text" id="basic-addon1">Notas:</span>
         <input type="text" 
         maxLength={100}
         onChange={(event)=>{
          setNotas(event.target.value);
          }}
         className="form-control" value={notas} placeholder="Notas" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      

      <div className="input-group mb-2">
          <span className="input-group-text" id="basic-addon1">Ciudad Subasta:</span>
          <InputWIthSearchDireccion
             value={direccion} onChange={(e)=>setDireccion(e.target.value)} clear={() => {setDireccion("")}}
          ></InputWIthSearchDireccion>

          <span className="input-group-text" id="basic-addon1">Color</span>
             <input type="text" 
             maxLength={15}
             onChange={(event)=>{
             setColor(event.target.value);
             }}
         className="form-control" value={color} placeholder="Color" aria-label="Username" aria-describedby="basic-addon1"/>
        

        <span className="input-group-text mx-3" id="basic-addon5">Fecha de pedido:</span>
           <DatePicker
            closeOnScroll={true}
            showIcon
            toggleCalendarOnIconClick 
            placeholderText='Coloque la fecha aquí' 
            selected={fecha}
            onChange={handleDateChange}
            dateFormat="MM/dd/YYYY"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            popperPlacement="top-start"
            popperContainer={CalendarContainer}
          />     
        </div>
       
                           
    </div>
    <div className="card-footer text-muted">
          {
              editar? 
              <div>
                <button className='btn btn-outline-warning m-2' onClick={update}>Actualizar</button> 
              <button className='btn btn-outline-dark m-2' onClick={limpiarCampos}>Cancelar</button>
                </div>
              :<button className='btn btn-outline-success' onClick={add}>Registrar</button>
          }
          
    
  </div>
    
<table className="table table-borderless table-hover" style={{overflowY: 'scroll', maxHeight: '290px', display: 'inline-block', paddingLeft: '1px'}}>
    <thead className="sticky-top">
        <tr>
          <th scope="col">Lote</th>
          <th scope="col">Nombre</th>
          <th scope="col">Telefono</th>
          <th scope="col">Buyer</th>
          <th scope="col">Año</th>
          <th scope="col">Marca</th>
          <th scope="col">Modelo</th>
          <th scope="col">Subasta</th>
          <th scope="col">Fecha</th>
          <th scope="col">Lote Subasta</th>
          <th scope="col">Acción</th>
              
        </tr>
      </thead>
      <tbody>

    {
      filteredPedidos.map((val,key)=>{
                return <tr key={val.id}>
                        <th scope="row">{val.lot}</th>
                        <td>{val.nombre}</td>
                        <td>{val.telefono}</td>
                        <td>{val.buyer}</td>
                        
                        
                        <td>{val.anio}</td>
                        <td>{val.marca}</td>
                        <td>{val.modelo}</td>
                        <td>{val.subasta}</td>
                        <td>{moment(val.fecha).format("LL")}</td>
                        <td>{val.direccion}</td>
                        <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" 
                          onClick={()=>{
                            editarPedidos(val);
                            }}   
                          className="btn btn-outline-primary btn-sm">Edita</button>
                          <button type="button" onClick={()=>{
                            deletePedidos(val);
                          }} className="btn btn-outline-danger btn-sm">Elimina</button>
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

export default Pedidos;

