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
  const[deposito, setDeposito] = useState("");
  const[fechallegada, setFechaLlegada] = useState("");
  const[feescarrier, setFeesCarrier] = useState("");
  const[fechaasignacarrier, setFechaAsignaCarrier] = useState("");
  const[nombrecarrier, setNombreCarrier] = useState("");
  const[editar, setEditar] = useState(false);
  const [llegadaList,setLlegada] = useState([]);
  const [filteredLlegadas, setFilteredLlegadas] = useState([]);
 
 
  const handleDateChange = (date) =>{
    console.log(date)
    setFechaLlegada(date);

  };
  const CalendarContainer = ({ children }) => {
    const el = document.getElementById("calendar-portal");
  
    return <Portal container={el}>{children}</Portal>;
  };

  useEffect(() => {
    getLlegada();
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
      nombrecarrier:nombrecarrier
    }
    Axios.put(`https://krriers.moveurads.com/llegada`,bodyCarga).then(()=>{
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

    const params = {
      id: id,
      buyer: buyer,
      name: nombre,
      lote: lot,
      telefono: telefono
    }

    
    Axios.post("https://hook.us1.make.com/nl8sklk32huiwa4t688obebfceaofjj3", 
      params
    ).then(() => {
      console.log('Success')
    }).catch((err) => {
      console.error('Error hook', err)
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
  handleDateChange("");
  setEditar(false);
  }

const editarLlegada = (val)=>{
  setEditar(true);

  setId(val.id);
  setTelefono(val.telefono);
  setNombre(val.nombre);
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

  const getLlegada = ()=> {
    Axios.get(`https://krriers.moveurads.com/llegada`).then((response)=>{
        setLlegada(response.data);
        setFilteredLlegadas(response.data);
    });

  } 
  
  const onLlegadasChange = (lotValue) => {
    lotValue = lotValue.toLowerCase();
    const filteredItems =llegadaList.filter((client) => {
      return client.lot.toLowerCase().includes(lotValue)
    })
    setFilteredLlegadas(filteredItems)
  }
  

    return (
      <div className="container"> 
             
    <div className="card text-center">
     <div className="card-header">
      CAPTURA DE LLEGADA DE VEHICULOS KRRIERS
    </div>
    <div className="card-body">
      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Lote:</span>
         <input type="text" 
         maxLength={12}
         onChange={(event)=>{
          onLlegadasChange(event.target.value);
          setLot(event.target.value);
          }}
         className="form-control" value={lot} placeholder="Numero de Lote" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1">Extra Fees: $</span>
         <input type="text" 
         maxLength={10}
         onChange={(event)=>{
          setFee(event.target.value);
          }}
         className="form-control" value={fees} placeholder="Extra Fees" aria-label="Username" aria-describedby="basic-addon1"/>
     
         <span className="input-group-text" id="basic-addon1">Fees pagado por Transportista: $</span>
         <input type="text" 
         maxLength={10}
         onChange={(event)=>{
          setFeesCarrier(event.target.value);
          }}
         className="form-control" value={feescarrier} placeholder="Fees pagados por Transportista" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>
      
      <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1">Notas:</span>
         <input type="text" 
         maxLength={100}
         onChange={(event)=>{
          setNotas(event.target.value);
          }}
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
        <div className="custom-control custom-radio my-auto">
          <input type="radio" id="customRadioInline2" name="customRadioInline1" className="custom-control-input" value="N"
                  onChange={(event)=>{
                    setTitulo(event.target.value);
                  }}/>
          <label className="custom-control-label" htmlFor="customRadioInline2">No</label>
         </div>
        </div>
      </div>

      <div  className="input-group my-auto mx-auto">

         <span className="input-group-text" id="basic-addon5">Fecha de llegada:</span>
        <div className="input-group-text">

                    
          <div>
             <DatePicker
              closeOnScroll={true}
              showIcon
              toggleCalendarOnIconClick 
              placeholderText='Enter Date here' 
              selected={fechallegada}
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
   </div>
      
    <div className="card-footer text-muted">
          
              <div>
                <button className='btn btn-outline-warning m-2' onClick={update}>Actualizar</button> 
              <button className='btn btn-outline-dark m-2' onClick={limpiarCampos}>Cancelar</button>
                </div>
              
          
           
  </div>
    
<table className="table table-borderless table-hover" style={{overflowY: 'scroll', maxHeight: '310px', display: 'inline-block', paddingLeft: '15px'}}>
    <thead class="sticky-top">
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Buyer</th>
          <th scope="col">Lote</th>
          <th scope="col">Subasta</th>
          <th scope="col">Fecha</th>
          <th scope="col">Precio</th>
          <th scope="col">Fees Krriers</th>
          <th scope="col">Titulo</th>
          <th scope="col">Fees Transportista</th>
          <th scope="col">Fecha Llegada</th>
          <th scope="col">Notas</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>

    {
      filteredLlegadas.map((val,key)=>{
                return <tr key={val.id}>
                        <th scope="row">{val.nombre}</th>
                        <td>{val.buyer}</td>
                        <td>{val.lot}</td>
                        <td>{val.direccion}</td>
                        <td>{moment(val.fecha).format("LL")}</td>
                        <td>$ {val.precio}</td>
                        <td>{val.fees}</td>
                        <td>{val.titulo}</td>
                        <td>$ {val.feescarrier}</td>
                        <td>{moment(val.fechallegada).format("LL")}</td>
                        <td>{val.notas}</td>
                        <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" 
                          onClick={()=>{
                            editarLlegada(val);
                            if (val.subasta == 'Copart')  {
                              window.open(`https://www.copart.com/lot/`+val.lot, '_blank', 'width = 650, height = 800');
                            }  else if (val.subasta == 'Iaai') { window.open(`https://www.iaai.com/VehicleDetail/`+val.lot+'~US', '_blank', 'width = 700, height = 800'); }
                            }}   
                          className="btn btn-outline-primary">Editar</button>
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

