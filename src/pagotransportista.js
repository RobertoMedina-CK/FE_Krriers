import './App.css';
import { useState, useEffect } from "react"
import Axios from "axios";
import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'dates-of-today';



function PagoTransportista() {

  // AUTOS PEDIDO

  // const[marca, setMarca] = useState("");
  // const[modelo, setModelo] = useState("");
  // const[anio, setAnio] = useState("");
  // const[fees, setFee] = useState("");
  // const[buyer, setBuyer] = useState("");
  // const[telefono, setTelefono] = useState("");
  // const[nombre, setNombre] = useState("");
  // const[lot, setLot] = useState("");
  // const[pin, setPin] = useState("");
  // const[subasta, setSubasta] = useState("");
  // const[direccion, setDireccion] = useState("");
  // const[fecha, setFecha] = useState("");
  // const[precio, setPrecio] = useState("");
  // const[titulo, setTitulo] = useState("");
  // const[notas, setNotas] = useState("");
  // const[fechafinal, setFechaFinal] = useState("");
  // const[id, setId] = useState();
  // const[deposito, setDeposito] = useState("");
  const[fechallegada, setFechaLlegada] = useState("");
  // const[feescarrier, setFeesCarrier] = useState("");
  // const[fechaasignacarrier, setFechaAsignaCarrier] = useState("");
  // const[nombrecarrier, setNombreCarrier] = useState("");
  // const[select, setSelect] = useState(false);
  const [asignaList, setAsigna] = useState([]);
  const [filteredAsigna, setFilteredAsigna] = useState([]);
  const[pagocarrier, setPagoCarrier] = useState("");
  const[pagadocarrier, setPagadoCarrier] = useState(false);


  const [subastaList,setSubastaList] = useState([]);

  //Transportistas

  const[telefonotransportista, setTelefonoTransportista] = useState("");
  const[nombretransportista, setNombreTransportista] = useState("");
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

  const limpiarCamposTransportista = ()=> {
    setNombreTransportista("");
    setDot("");
    setTelefonoTransportista("");
    setMargen("");
  }
const selectTransportista = (val)=>{

  setIdTransportista(val.id);
  setTelefonoTransportista(val.telefono);
  setNombreTransportista(val.nombre);
  setDot(val.dot);
  setMargen(val.margen);
  setPagoCarrier(1-(1/Number(val.margen)));
  setPagadoCarrier("S");

}

  const getAsigna = ()=> {
    Axios.get(`https://krriers.moveurads.com/asignacompletado`).then((response)=>{
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
    const filteredItems = asignaList.filter((client) => {
      return client.nombrecarrier?.toLowerCase().includes(subastaValue)
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

  const prefix = (val) => {
    if (val.length < 2) return '0' + val
    return val
  }

  const datesOfToday = () => {
    const ret = {}
  
    ret.year = String(new Date().getFullYear())
    ret.month = prefix(String(new Date().getMonth()))
    ret.day = prefix(String(new Date().getDate()))
    ret.date = [ret.year, ret.month, ret.day].join('-')
    
    return ret
    
  }

    const onTransportistasChange = (transportistasValue) => {
    transportistasValue = transportistasValue.toLowerCase();
    const filteredItemsTransportista =transportistasList.filter((client) => {
      return client.nombre.toLowerCase().includes(transportistasValue)
    })
    setFilteredTransportistas(filteredItemsTransportista)
  }


  const generaPdf = ()=> {

    const doc = new jsPDF({orientation: 'l'});
    const total = filteredAsigna.reduce((acc, val) => {
      return acc += Number(val.pagocarrier);
    }, 0)
   
    const datos4= [["$ "+total]];
    const columna1 = ['Total a Pagar:'];
    const columna5 = ['Recibimos la cantidad descrita en el total de este recibo como pago TOTAL de los servicios que nuestra compañia prestó de transporte de autos, no quedando adeudo alguno por ningún otro concepto. Liberamos a Krriers 956, LLC de cualquier responsabilidad pasada, presente o futura por el servicio que nuestra compañia presta'];
    const columna6 = ['Transportista Signature                                              Krriers Signature'];
    const columna8 = ['Pagado con Efectivo [   ]  Cheque  [   ] Zelle [   ]  CashApp  [   ]'];
    
    const hoy = moment(new Date()).format("LL");
   

    var logo = new Image();
    logo.src = 'logo.png';
    doc.addImage(logo, 'PNG', 190,5,60,18);
    doc.text(`Liquidacion de servicios del transportista`, 100, 30);
    doc.text(`${nombretransportista}`, 110, 40);
    doc.text(`${hoy}`, 210, 50);
    
    autoTable(doc, {html: '#pedidos-apagar', 
      theme:'grid',
      margin:{top: 60}})

      autoTable(doc, {
        // startY:120,
        theme: 'grid',
        head: [columna1],
        body: datos4,
        margin:{left:50, right:65},
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
      // startY:120,
      theme: 'grid',
      head: [columna5],
      margin:{left:25, right:50},
      headerStyles:{
          cellPadding: 2, // a number, array or object (see margin below)
          fontSize: 7,
          font: "times", // helvetica, times, courier
          fontStyle: 'normal', // normal, bold, italic, normal
          halign: 'center', // left, center, right
          valign: 'top', // top, middle, bottom
      },
     })

     autoTable(doc, {
      // startY:220,                
      
      head: [columna6],
      margin:{left:5},
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
      // startY:230,                
      
      head: [columna8],
      margin:{left:5},
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
    doc.save(`${nombretransportista}_fecha_${fechallegada}.pdf`);
    // doc.output('dataurlnewwindow');

  }

  const asignarCarga = () => {
    Swal.fire({
      title: `<strong>Estas seguro de liquidar los servicios a ${nombretransportista}?</strong>`,
      html: [`<style>

      table {border-collapse: collapse;
            width:100%;
      }
      th, td {padding: 8px;
            text-align: left;
      }
      tr:hover {background-color: #D6EEEE;} >
      </style>
      <table id="pedidos-a-pagar">
        <thead className="sticky-top">
            <tr>
              <th scope="col">Lote</th>
              <th scope="col">Transportista</th>
              <th scope="col">Fecha Asignacion</th>
              <th scope="col">Pago</th>
            </tr>
        </thead>
        <tbody>
          ${
            filteredAsigna.map((val,index)=>{
              return `<tr key=${val.id}>
                  <th scope="row">${val.lot}</th>
                  <td>${val.nombrecarrier}</td>
                  <td>${moment(val.fechaasignacarrier).format("LL")}</td>
                  <td>${val.pagocarrier}</td>
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
      confirmButtonText: 'Pagar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
          const bodyCarga = {
            
            pagadocarrier:'S',
            filteredAsigna:filteredAsigna
          }
          Axios.put(`https://krriers.moveurads.com/cierrepedido`, bodyCarga).then((res) => {
            getAsigna();
            console.log(bodyCarga);
            getTransportistas();
            generaPdf();
            Swal.fire({
              title: "<strong>Carga asignada exitosamente!</strong>",
              html: "<i>La carga fue asignada con Exito!</i>",
              icon: 'success',
              timer:3000
            });
            window.location.reload()
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
          LIQUIDACION TRANSPORTISTAS
        </div>
        <div className="card-body">

                  <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">Nombre Transportista:</span>
                    <input type="text"
                    maxLength={45}
                    onChange={(event)=>{
                      onTransportistasChange(event.target.value);
                      //onAsignaSubasta(event.target.value)


                      }}
                    className="form-control" value={nombretransportista} placeholder="Nombre Transportista" aria-label="Username" aria-describedby="basic-addon1"/>

                  </div>

                  


 <div className="card-footer text-muted">Transportistas Registrados</div>
        </div>

              <table id="tabla-transportistas" className="table table-hover" style={{overflowY: 'scroll', maxHeight: '350px', display: 'inline-block', paddingLeft: '225px'}}>
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
                              const deselectTransportistas = transportistasList.map((el) =>{
                                return el.disabled ? {...el, disabled: false} : el
                              })
                            const transportistaElement = deselectTransportistas.map((el) =>{
                              return el.id === val.id ? {...el, disabled: true} : el
                            })
                            const filteredItemsTransportista =transportistaElement.filter((client) => {
                              return client.nombre.includes(val.nombre)
                            })
                            selectTransportista(val);
                            setFilteredTransportistas(filteredItemsTransportista)
                            setTransportistas(transportistaElement)
                            onAsignaSubasta(val.nombre)
                            }}
                          className="btn btn-outline-success">Select</button>
                          <button type="button" className='btn btn-outline-danger' disabled={!val.disabled}
                            onClick={() => {
                              const deselectTransportistas = transportistasList.map((el) =>{
                                return el.disabled ? {...el, disabled: false} : el
                              })
                            const transportistaElement = deselectTransportistas.map((el) =>{
                              return el.id === val.id ? {...el, disabled: false} : el
                            })
                            setFilteredTransportistas(transportistaElement)
                            setTransportistas(transportistaElement)
                            setFilteredAsigna(asignaList)
                            limpiarCamposTransportista()
                            }}
                          >
                            Remove
                          </button>
                        </div>
                          </td>
                </tr>

              })

            }
      </tbody>
    </table>

        <div className='btn-group' style={{width: '120%', margin: 'auto', paddingRight: '18em', paddingLeft: '5em'}}>
            <button type='button' className='btn btn-outline-dark' onClick={() => asignarCarga()} disabled={!idTransportista }>Pagar</button>
        </div>
            <table id="pedidos-apagar" className="table table-hover" style={{overflowY: 'scroll', maxHeight: '300px', display: 'inline-block', paddingLeft: '325px'}}>
                <thead className="sticky-top">
                    <tr>

                      <th scope="col">Lote</th>
                      <th scope="col">Transportista</th>
                      <th scope="col">Fecha Asignacion</th>
                      <th scope="col">Pago a Carrier</th>
                      
                      </tr>
                </thead>
                  <tbody>
                      {
                        filteredAsigna.map((val,key)=>{
                          // console.log(val.nombrecarrier);
                          // if (val.nombrecarrier === ""){
                                return <tr key={val.id}>
                                      <th scope="row">{val.lot}</th>
                                      <td>{val.nombrecarrier}</td>
                                      <td>{moment(val.fechaasignacarrier).format("LL")}</td>
                                      <td>$ {val.pagocarrier}</td>
                                    <td>

                                  </td>
                              </tr>
                            })
                          }
                  </tbody>
            </table>
        <div className="card-footer text-muted"></div>
     </div>
</div>
);
}

export default PagoTransportista;

