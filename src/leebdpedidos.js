import './App.css';
import { useState, useEffect } from "react"
import Axios from "axios";
import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2';

function Leepedido() {
    
    const [clientesList,setPedidos] = useState([]);

    useEffect(() => {
        getPedidos();
      }, [])

      const getPedidos = ()=> {
        Axios.get(`https://krriers.moveurads.com/pedidos`).then((response)=>{
            setPedidos(response.data);
        });
    
      } 

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      db.connect((err) => {
        if (err) {
          console.error('Error de conexión:', err);
          return;
        }
        console.log('Conexión exitosa a la base de datos MySQL');
      
        rl.question('Ingresa el teléfono a buscar: ', (telefonoABuscar) => {
          const query = `SELECT * FROM pedidos WHERE telefono = ${db.escape(telefonoABuscar)}`;
      
          db.query(query, (err, results) => {
            if (err) {
              console.error('Error al ejecutar la consulta:', err);
              return;
            }
            if (results.length > 0) {
              console.log('Resultado de la consulta:', results[0]);
            } else {
              console.log('Teléfono no encontrado en la base de datos.');
            }
      
            rl.close();
            // Cierra la conexión después de realizar la consulta
          });
        });
      });  


}

export default Leepedido;

