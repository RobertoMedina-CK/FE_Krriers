import './App.css';
import { useState, useEffect } from "react"
import Axios from "axios";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PhoneInput from 'react-phone-number-input';
import Swal from 'sweetalert2';


function Transportistas() {

  const[telefono, setTelefono] = useState("");
  const[nombre, setNombre] = useState();
  const[dot, setDot] = useState("");
  const[id, setId] = useState();
  const[margen, setMargen] = useState("");
    

  const[editar, setEditar] = useState(false);

  const [transportistasList,setTransportistas] = useState([]);
  const [filteredTransportistas, setFilteredTransportistas] = useState([]);

  useEffect(() => {
    getTransportistas();
  }, [])

  const add = ()=> {
    if (!telefono || !nombre || !dot || !margen){
      return;
    }

    getTransportistas();
    const telefonoExiste = transportistasList.find(val => {
      return val.telefono === telefono
    })
    if (telefonoExiste) {
      limpiarCampos();
        Swal.fire({
          title: "<strong>El Cliente ya Existe!</strong>",
          html: "<i>El Telefono <strong>"+telefono+"</strong> ya está Registrado!</i>",
          icon: 'error',
          timer:5000
        });
      return;
    }
    const bodyCarga = {
      telefono:telefono,
      nombre:nombre,
      dot:dot,
      margen:margen
    }
    Axios.post(`https://krriers.moveurads.com/transportistas`,bodyCarga).then(()=>{
        getTransportistas();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro Existo!!!</strong>",
          html: "<i>El Transportista <strong>"+nombre+"</strong> fue Registrado con Exito!!!</i>",
          icon: 'success',
          timer:3000
        });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró Dar de Alta al transportista!",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
        timer: 3000
      });

    });

  }

  const update = ()=> {
    console.log(id);
    const bodyCargaPut = {
      id:id,
      telefono:telefono,
      nombre:nombre,
      dot:dot,
      margen:margen
    }
    Axios.put(`https://krriers.moveurads.com/transportistas`,bodyCargaPut).then(()=>{
        getTransportistas();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualización Exitosa!!!</strong>",
          html: "<i>El Transportista <strong>"+nombre+"</strong> fue Actualizado con Exito!!!</i>",
          icon: 'success',
          timer:3000
        });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró Actualizar al transportista!",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
        timer: 3000
      });

    })

  }

  const deleteTransportista = (val)=> {

    Swal.fire({
      title: "Confirmar Eliminar?",
      html: "<i>Realmente desea eliminar a <strong>"+val.nombre+"</strong></i>",
      text: "No Podremos deshacer esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`https://krriers.moveurads.com/transportistas/${val.id}`).then(()=>{
          getTransportistas();
          limpiarCampos();
          Swal.fire({
            icon: "success",
            title: val.nombre+ ' fue eliminado',
            showConfirmButton: false,
            timer: 2000
          });
      }).catch(function(error){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se logró Eliminar al transportista!",
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error de Servidor":JSON.parse(JSON.stringify(error)).message,
          timer: 3000
        });

      })
        
      }
    });
   
  }

  const limpiarCampos = ()=> {
    setNombre("");
    setDot("");
    setTelefono("");
    setMargen("");
    setEditar(false);
  }

const editarTransportista = (val)=>{
  setEditar(true);

  setId(val.id);
  setTelefono(val.telefono);
  setNombre(val.nombre);
  setDot(val.dot);
  setMargen(val.margen);
  
    

}

  const getTransportistas = ()=> {
    Axios.get(`https://krriers.moveurads.com/transportistas`).then((response)=>{
        setTransportistas(response.data);
        setFilteredTransportistas(response.data);
    });

  } 
  
  const onTransportistasChange = (transportistasValue) => {
    transportistasValue = transportistasValue.toLowerCase();
    const filteredItems =transportistasList.filter((client) => {
      return client.nombre.toLowerCase().includes(transportistasValue)
    })
    setFilteredTransportistas(filteredItems)
  }

    return (
      <div className="container"> 
             
    <div className="card text-center">
     <div className="card-header">
     MANTENIMIENTO BASE DE DATOS TRANSPORTISTAS KRRIERS
    </div>
    <div className="card-body">
      
    <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
         <input type="text" 
         maxLength={45}
         onChange={(event)=>{
          onTransportistasChange(event.target.value);
          setNombre(event.target.value);
          }}
         className="form-control" value={nombre} placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1">Telefono:</span>
         <PhoneInput
         placeholder="Telefono" value={telefono} onChange={setTelefono} defaultCountry='US' international
          ></PhoneInput>


      </div>


      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Dot:</span>
         <input type="text" 
         maxLength={15}
         onChange={(event)=>{
          setDot(event.target.value);
          }}
         className="form-control" value={dot} placeholder="Numero de DOT" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Margen:</span>
         <input type="text" 
         maxLength={2}
         onChange={(event)=>{
          setMargen(event.target.value);
          }}
         className="form-control" value={margen} placeholder="Margen de Krriers" aria-label="Username" aria-describedby="basic-addon1"/>
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
    
<table className="table table-borderless table-hover" style={{overflowY: 'scroll', maxHeight: '310px', display: 'inline-block', paddingLeft: '280px'}}> 
    <thead class="sticky-top">
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Numero Interno</th>
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
                        <td>{val.id}</td>
                        <td>{val.telefono}</td>
                        <td>{val.dot}</td>
                        <td>{val.margen}</td>
                        <td>

                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" 
                          onClick={()=>{
                            editarTransportista(val);
                            }}   
                          className="btn btn-outline-primary">Editar</button>
                          <button type="button" onClick={()=>{
                            deleteTransportista(val);
                          }} className="btn btn-outline-danger">Eliminar</button>
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

export default Transportistas;

