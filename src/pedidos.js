import './App.css';
import { useState, useEffect } from "react"
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


import Swal from 'sweetalert2';



function Pedidos() {

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

    const[select, setSelect] = useState(false);
      
    const [pedidosList,setPedidos] = useState([]);
    const [filteredPedidos, setFilteredPedidos] = useState([]);

    const [anioList, setAnioList] = useState([]);
    const [marcaList,setMarcaList] = useState([]);
   

   

   
    function InputWIthSearchAnio(){
        const [val,setVal]=useState('')
        const data=[anio]
       
        return(
            <div className="main">
                <getAnio>
                <input list="dataanio" onChange={(e)=>setVal(e.target.value)} placeholder="Año" />
                <datalist id="dataanio">
                    {data.map((op)=><option>{op}</option>)}
                </datalist>
                </getAnio>
            </div>
        );
    }

    function InputWIthSearchMarca(){
        const [val,setVal]=useState('')
        const data=[marca]

        return(
            <div className="main">
                <input list="datamarca" onChange={(e)=>setVal(e.target.value)} placeholder="Marca" />
                <datalist id="datamarca">
                    {data.map((op)=><option>{op}</option>)}
                </datalist>
            </div>
        );
    }

    function InputWIthSearchModelo(){
        const [val,setVal]=useState('')
        const data=[modelo]

        return(
            <div className="main">
                <input list="datamodelo" onChange={(e)=>setVal(e.target.value)} placeholder="Modelo" />
                <datalist id="datamodelo">
                    {data.map((op)=><option>{op}</option>)}
                </datalist>
            </div>
        );
    }

    function InputWIthSearchSubasta(){
        const [val,setVal]=useState('')
        const data=[subasta]

        return(
            <div className="main">
                <input list="datasubasta" onChange={(e)=>setVal(e.target.value)} placeholder="Subasta" />
                <datalist id="datasubasta">
                    {data.map((op)=><option>{op}</option>)}
                </datalist>
            </div>
        );
    }

    function InputWIthSearchDireccion(){
        const [val,setVal]=useState('')
        const data=[direccion]

        return(
            <div className="main">
                <input list="datadireccion" onChange={(e)=>setVal(e.target.value)} placeholder="Direccion Subasta" />
                <datalist id="datadireccion">
                    {data.map((op)=><option>{op}</option>)}
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



  const add = ()=> {
    if (!telefono || !nombre || !buyer || !lot || !pin || !anio || !marca || !modelo || !subasta || !fecha || !direccion){
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

      
      
    Axios.post(`https://krriers.moveurads.com/pedidosabc`,{

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
        getPedidos();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro Existo!!!</strong>",
          html: "<i>El Lote <strong>"+lot+"</strong> fue Registrado con Exito!!!</i>",
          icon: 'success',
          timer:3000
        });
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
    Axios.put(`https://krriers.moveurads.com/pedidosabc`,{

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
        getPedidos();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualización Exitosa!!!</strong>",
          html: "<i>El Cliente <strong>"+nombre+"</strong> fue Actualizado con Exito!!!</i>",
          icon: 'success',
          timer:3000
        });
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
            timer: 2000
          });
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
    setFechaFinal(val.fechafinal);
    setDeposito(val.deposito);
    setFechaLlegada(val.fechallegada);
    setFeesCarrier(val.feescarrier);
    setFechaAsignaCarrier(val.fechaasignacarrier);
    setNombreCarrier(val.nombrecarrier);
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

//   const getModelo = (val) => {
//     Axios.get(`https://krriers.moveurads.com/modeloautos/${val.modelo}`).then((response)=>{
//         setModeloList(response.data);
//     });

//   } 
 
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
     MANTENIMIENTO DE BASE DE DATOS DE PEDIDOS de KRRIERS
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
         
      </div>

        
      <div className="input-group mb-2">
          <span className="input-group-text" id="basic-addon1">Año:</span>
          <InputWIthSearchAnio
            value={anio} onChange={setAnio}
            ></InputWIthSearchAnio>
                                          
         <span className="input-group-text" id="basic-addon1">Marca:</span>
         <InputWIthSearchMarca
            value={marca} onChange={setMarca}
            ></InputWIthSearchMarca>

         <span className="input-group-text" id="basic-addon1">Modelo:</span>
         <InputWIthSearchModelo
            value={modelo} onChange={setModelo}
            ></InputWIthSearchModelo>
        </div>

      <div className="input-group mb-2">
          <span className="input-group-text" id="basic-addon1">Subasta:</span>
          <InputWIthSearchSubasta
            value={subasta} onChange={setSubasta}
            ></InputWIthSearchSubasta>
      </div>

      <div  className="input-group my-auto mx-auto">

        <span className="input-group-text" id="basic-addon5">Fecha de pedido:</span>
        <div className="input-group-text">

                
        <div>
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
        </div>

      <div className="input-group mb-2">
          <span className="input-group-text" id="basic-addon1">Ciudad Subasta:</span>
          <InputWIthSearchDireccion
            value={direccion} onChange={setDireccion}
            ></InputWIthSearchDireccion>
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
    <thead class="sticky-top">
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

