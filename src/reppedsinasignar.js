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


function ReportePedidosTransportisas() {

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
    
      
  const generapdf = ()=> {
   
    const doc = new jsPDF({orientation: 'l'});
    var logo = new Image();
    logo.src = 'logo.png';
    doc.addImage(logo, 'PNG', 185,5,60,18);
    doc.text('REPORTE DE PEDIDOS SIN ASIGNAR de KRRIERS', 80, 35);

    autoTable(doc, {html: '#pedidos-table', margin:{top: 45, right: 50, left: 40}})
    
    doc.autoPrint({variant: 'non-conform'});
    doc.output('dataurlnewwindow');

  }
   
return (
    <div className="container"> 
             
        <div className="card text-center">

            <div className="card-header">
              REPORTE DE PEDIDOS POR TRANSPORTISTA KRRIERS
            </div>
                <div className="card-body">
                  <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Transportista:</span>
                            <input type="text" 
                            maxLength={45}
                            onChange={(event)=>{
                              onTransportistasChange(event.target.value);
                              setNombre(event.target.value);
                              }}
                            className="form-control" value={nombre} placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>
                    
                  <div className="card-footer text-muted">
                        
                            <div>
                              <button className='btn btn-outline-success m-2' onClick={generapdf}>Imprimir Reporte</button> 
                            </div>
                            
                  </div>
                      
                </div>

        </div>

    
    
          
<table className="table table-borderless table-hover" style={{overflowY: 'scroll', maxHeight: '310px', display: 'inline-block', paddingLeft: '280px'}}> 
    <thead class="sticky-top">
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
                       </tr>
                     
              })

            }

                   
      </tbody>
</table>

    </div>
      );
}

export default ReportePedidosTransportisas;

