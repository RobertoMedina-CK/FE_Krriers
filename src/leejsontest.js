import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';




function Leejson() {

const usuarios = `[
  
  {
      "nombre": "Fernando Medina",
      "telefono": 19564376620,
      "buyer": 123456
  
    },
    {
      "nombre": "Renata Medina",
      "telefono": 19564376621,
      "buyer": 12346
  
    },
    {
      "nombre": "Roberto Medina",
      "telefono": 19564376622,
      "buyer": 12344
  
    }
    ]
`;


const jsonData = JSON.parse(usuarios);


const usuariosNuevos = jsonData.filter(
    (usuarios) => usuarios.buyer === 123456 && usuarios.nombre === 'Fernando Medina'
);
console.log(usuariosNuevos);

const newUsers = JSON.stringify(usuariosNuevos);
console.log(typeof newUsers);


}

export default Leejson;


