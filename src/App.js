import './App.css';
import { useState, useEffect } from "react"
import Axios from "axios";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const[nombre, setNombre] = useState("");
  const[edad, setEdad] = useState();
  const[pais, setPais] = useState("");
  const[cargo, setCargo] = useState("");
  const[anios, setAnios] = useState();
  const[id, setId] = useState();

  const[editar, setEditar] = useState(false);

  const [empleadosList,setEmpleados] = useState([]);

  useEffect(() => {
    getEmpleados();
  }, [])

  const add = ()=> {
    if (!nombre || !edad || !pais || !cargo || !anios){
      return;
    }
    Axios.post("http://localhost:3001/create",{

      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
        getEmpleados();
      alert("Empleado Registrado");
    });

  }

  const update = ()=> {
    Axios.put("http://localhost:3001/update",{

      id:id,
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
        getEmpleados();
        alert("Empleado Actualizado");
    });

  }
const editarEmpleado = (val)=>{
  setEditar(true);

  setId(val.id);
  setNombre(val.nombre);
  setEdad(val.edad);
  setCargo(val.cargo);
  setPais(val.pais);
  setAnios(val.anios);
  

}

  const getEmpleados = ()=> {
    Axios.get("http://localhost:3001/empleados").then((response)=>{
        setEmpleados(response.data);
    });

  } 
  
    return (
      <div className="container"> 
             
    <div className="card text-center">
     <div className="card-header">
      MODULO DE GESTIÓN DE CAJEROS
    </div>
    <div className="card-body">
      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
         <input type="text" 
         onChange={(event)=>{
          setNombre(event.target.value);
          }}
         className="form-control" value={nombre} placeholder="Ingrese Un Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Edad:</span>
         <input type="number" 
         onChange={(event)=>{
          setEdad(event.target.value);
          }}
         className="form-control" value={edad} placeholder="Ingrese la Edad" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Pais:</span>
         <input type="text" 
         onChange={(event)=>{
          setPais(event.target.value);
          }}
         className="form-control" value={pais} placeholder="Ingrese el País" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Cargo:</span>
         <input type="text" 
         onChange={(event)=>{
          setCargo(event.target.value);
          }}
         className="form-control" value={cargo} placeholder="Ingrese Cargo" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>
      
      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Años de Experiencia:</span>
         <input type="number" 
         onChange={(event)=>{
          setAnios(event.target.value);
          }}
         className="form-control" value={anios} placeholder="Ingrese los años" aria-label="Username" aria-describedby="basic-addon1"/>
      </div>

               
    </div>
    <div className="card-footer text-muted">
          {
              editar? 
              <div>
                <button className='btn btn-warning m-2' onClick={update}>Actualizar</button> 
              <button className='btn btn-info m-2' onClick={add}>Cancelar</button>
                </div>
              :<button className='btn btn-success' onClick={add}>Registrar</button>
          }

    
  </div>
  
<table className="table table-striped">
    <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Nombre</th>
          <th scope="col">Edad</th>
          <th scope="col">País</th>
          <th scope="col">Cargos</th>
          <th scope="col">Experiencia</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>

    {
      empleadosList.map((val,key)=>{
                return <tr key={val.id}>
                        <th scope="row">{val.id}</th>
                        <td>{val.nombre}</td>
                        <td>{val.edad}</td>
                        <td>{val.pais}</td>
                        <td>{val.cargo}</td>
                        <td>{val.anios}</td>
                        <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" 
                          onClick={()=>{
                            editarEmpleado(val);


                          }}   
                          className="btn btn-info">Editar</button>
                          <button type="button" className="btn btn-danger">Eliminar</button>
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

export default App;

