import './App.css';
import { useState, useEffect } from "react"
import Axios from "axios";
import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  useEffect(() => {
    getLlegada();
  }, [])

    
  const update = ()=> {
    Axios.put(`https://krriers.moveurads.com/llegada`,{

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

    console.log(params)

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
  setFechaLlegada(null);
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
      CAPTURA DE LLEGADA DE VEHICULOS de KRRIERS
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
         <span className="input-group-text" id="basic-addon1">Extra Fees:</span>
         <input type="text" 
         maxLength={10}
         onChange={(event)=>{
          setFee(event.target.value);
          }}
         className="form-control" value={fees} placeholder="Extra Fees" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>
      <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1">Fees pagado por Transportista:</span>
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

      <div class="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Tiene Titulo:</span>
        <div class="input-group-text">
       
        <div class="custom-control custom-radio my-auto mx-3">
        <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input" value="Si"
                  onChange={(event)=>{
                    setTitulo("S");
                    }}
                  
                 />
           <label class="custom-control-label" for="customRadioInline1">Si</label>
           </div>
        <div class="custom-control custom-radio my-auto">
          <input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" value="No"
                  onChange={(event)=>{
                    setTitulo("N");
                  }}/>
          <label class="custom-control-label" for="customRadioInline2">No</label>
         </div>
        </div>
      </div>

      <div class="input-group my-auto mx-auto">
         <span className="input-group-text" id="basic-addon1">Fecha de llegada:</span>
         <div class="input-group-text">
         <input type="date" class="input-control" placeholder="Fecha Llegada"

         onChange={(event)=>{
          setFechaLlegada(event.target.value);
          }}/>
        {/* //  className="form-control" value={fechallegada} placeholder="Fecha Llegada" aria-label="Username" aria-describedby="basic-addon1"/> */}
      </div>
    </div>
   </div>
      
    <div className="card-footer text-muted">
          
              <div>
                <button className='btn btn-warning m-2' onClick={update}>Actualizar</button> 
              <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
                </div>
              
          
           
  </div>
    
<table className="table table-borderless table-hover" style={{overflowY: 'scroll', maxHeight: '400px', display: 'inline-block', paddingLeft: '15px'}}>
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
                        <td>{val.subasta}</td>
                        <td>{moment(val.fecha).format("MMM Do YY")}</td>
                        <td>$ {val.precio}</td>
                        <td>{val.fees}</td>
                        <td>{val.titulo}</td>
                        <td>$ {val.feescarrier}</td>
                        <td>{moment(val.fechallegada).format("MMM Do YY")}</td>
                        <td>{val.notas}</td>
                        <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" 
                          onClick={()=>{
                            editarLlegada(val);

                            }}   
                          className="btn btn-info">Editar</button>
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

