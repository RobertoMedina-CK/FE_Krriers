const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "riderarmour-do-user-17269276-0.e.db.ondigitalocean.com",
    user: "doadmin",
    password: "AVNS_BlosgjkTIrb16Qnd1lh",
    database:"krriers",
    port:25060,
    ssl:{rejectUnauthorized:false}    

});
db.connect((err)=>{
   if (err) {console.error("Error de Conexion", err); return}
   console.log("Conectado a la base de datos");
})

app.post("/webhook", (req,res)=>(
    console.log(req.body)
))

app.post("/autos", (req,res)=>{
    const marca = req.body.marca;
    const modelo = req.body.modelo;
    const anio = req.body.anio;
    const fee = req.body.fee;
    
    
    
    db.query('INSERT INTO autos(marca,modelo,anio,fee) VALUES (?,?,?,?)', [marca,modelo,anio,fee],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});

app.post("/cajeros", (req,res)=>{
    const nombre = req.body.nombre;
    const password = req.body.password;
    
    
    
    db.query('INSERT INTO cajeros(nombre,password) VALUES (?,?)', [nombre,password],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});

app.post("/clientes", (req,res)=>{
    const telefono = req.body.telefono;
    const nombre = req.body.nombre;
    const buyer = req.body.buyer;
    const foldernum = req.body.foldernum;
       
    
    db.query('INSERT INTO clientes(telefono,nombre,buyer,foldernum) VALUES (?,?,?,?)', [telefono,nombre,buyer,foldernum],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});

app.post("/subastas", (req,res)=>{
    const telefono = req.body.telefono;
    const nombre = req.body.nombre;
    const direcion = req.body.direccion;
    const subasta = req.body.subasta;
    const precio = req.body.precio;

       
    
    db.query('INSERT INTO subastas(telefono,nombre,direccion,subasta,precio) VALUES (?,?,?,?,?)', [telefono,nombre,direcion,subasta,precio],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});

app.post("/transportistas", (req,res)=>{
    const telefono = req.body.telefono;
    const nombre = req.body.nombre;
    const dot = req.body.dot;
    const margen = req.body.margen;
    
       
    
    db.query('INSERT INTO transportistas(telefono,nombre,dot,margen) VALUES (?,?,?,?)', [telefono,nombre,dot,margen],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});

app.get("/autos", (req,res)=>{
    db.query('SELECT * FROM autos', 
                (err,result)=>{
            if(err){
                console.log(err);9
             } else {
                res.send(result);
             }
        }
    );
});

app.get("/clientes", (req,res)=>{
    db.query('SELECT * FROM clientes', 
                (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});


app.get("/llegada", (req,res)=>{
    db.query('SELECT * FROM pedidos', 
                (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});

app.get("/cajeros", (req,res)=>{
    db.query('SELECT * FROM cajeros', 
                (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});

app.get("/subastas", (req,res)=>{
    db.query('SELECT * FROM subastas', 
                (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});

app.get("/transportistas", (req,res)=>{
    db.query('SELECT * FROM transportistas', 
                (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});


app.put("/autos", (req,res)=>{
    const id = req.body.id;
    const marca = req.body.marca;
    const modelo = req.body.modelo;
    const anio = req.body.anio
    const fee = req.body.fee;
        
    
    db.query('UPDATE autos SET marca=?,modelo=?,anio=?,fee=? WHERE id=?',[marca,modelo,anio,fee,id],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});

app.put("/llegada", (req,res)=>{
    const id = req.body.id;
    const lot = req.body.lot;
    const fees = req.body.fees;
    const notas = req.body.notas;
    const titulo = req.body.titulo;
    const telefono = req.body.telefono;
    const nombre = req.body.nombre;
    const buyer = req.body.buyer;
    const pin = req.body.pin;
    const marca = req.body.marca;   
    const modelo = req.body.modelo;   
    const anio = req.body.anio;   
    const subasta = req.body.subasta;   
    const direccion = req.body.direccion;   
    const fecha = req.body.fecha;   
    const precio = req.body.precio;     
    const fechafinal = req.body.fechafinal; 
    const deposito = req.body.deposito;
    const fechallegada = req.body.fechallegada;
    const feescarrier = req.body.feescarrier;
    const fechaasignacarrier = req.body.fechaasignacarrier;
    const nombrecarrier = req.body.nombrecarrier;
        
    
    db.query('UPDATE pedidos SET fees=?,titulo=?,notas=?,feescarrier=?,fechallegada=? WHERE id=?',[fees,titulo,notas,feescarrier,fechallegada,id],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});


app.put("/clientes", (req,res)=>{
    const id = req.body.id;
    const telefono = req.body.telefono;
    const nombre = req.body.nombre;
    const buyer = req.body.buyer;
    const foldernum = req.body.foldernum;
       
    
    db.query('UPDATE clientes SET telefono=?,nombre=?,buyer=?,foldernum=? WHERE id=?',[telefono,nombre,buyer,foldernum,id],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});


app.put("/cajeros", (req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const password = req.body.password;
       
    
    db.query('UPDATE cajeros SET nombre=?,password=? WHERE id=?',[nombre,password,id],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});

app.put("/subastas", (req,res)=>{
    const id = req.body.id;
    const telefono = req.body.telefono;
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;
    const subasta = req.body.subasta;
    const precio = req.body.precio;

       
    
    db.query('UPDATE subastas SET telefono=?,nombre=?,direccion=?,subasta=?,precio=? WHERE id=?',[telefono,nombre,direccion,subasta,precio,id],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});

app.put("/transportistas", (req,res)=>{
    const id = req.body.id;
    const telefono = req.body.telefono;
    const nombre = req.body.nombre;
    const dot = req.body.dot;
    const margen = req.body.margen;
        
    db.query('UPDATE transportistas SET telefono=?,nombre=?,dot=?,margen=? WHERE id=?',[telefono,nombre,dot,margen,id],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});


app.delete("/autos/:id", (req,res)=>{
    const id = req.params.id;
    
    
    
    db.query('DELETE FROM autos WHERE id=?',id,
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});


app.delete("/cajeros/:id", (req,res)=>{
    const id = req.params.id;
    
    
    
    db.query('DELETE FROM cajeros WHERE id=?',id,
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});

app.delete("/clientes/:id", (req,res)=>{
    const id = req.params.id;
    
    
    
    db.query('DELETE FROM clientes WHERE id=?',id,
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});

app.delete("/subastas/:id", (req,res)=>{
    const id = req.params.id;
    
    
    
    db.query('DELETE FROM subastas WHERE id=?',id,
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});

app.delete("/transportistas/:id", (req,res)=>{
    const id = req.params.id;
    
    
    
    db.query('DELETE FROM transportistas WHERE id=?',id,
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});

app.listen(3001,()=> {
    console.log("Corriendo Digital Ocean")
})