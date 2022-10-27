const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const mongoose = require('mongoose')
const router = express.Router();
// se importa el model
const UserSchema = require('./models/User.js')
// CONEXIÓN CON LA BASE DE DATOS

// Cadena de conexión
mongoose.connect("")

// codificación de la información para los servicios web
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// **INICIO DE SERVICIOS WEB....

/*
// SERVICIO PARA SALUDAR
router.get('/saludar/:nombre', (req, res) => {
    var nombre = req.params.nombre;

    res.send("Hola " + nombre + ", bienvenido a tu API");
});

// SERVICIO VALIDACION CONDICIONALES
router.get('/validar_edad/:edad', (req, res) => {
    var edad = req.params.edad;
    var respuesta = '';
    if(edad >= 18){
        respuesta ="Mayor de edad";
    }else{
        respuesta = "Menor de edad";
    }
    res.send(respuesta);
});

// SERVICIO PARA DESPEDIR
router.get('/despedir', (req, res) => {
    res.send("Adiós, regresa pronto!!!");
});
*/

// SERVICIO PARA PRUEBA
router.get('/', (req, res) => {
    res.send("Prueba, conexión OK!!!");
});


// servicio: para traer la información de los usuarios registrados en la base de datos
router.get('/user', (req, res) => {
    UserSchema.find(function(err, data){
        if(err){
            console.log(err)
        }else{
            res.send(data)
        }
    })
});

//  Servicio WEB para guardar información:
router.post('/user', (req, res) => {
    let newUser = new UserSchema({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        telefono: req.body.telefono,
        password: req.body.password,
    })

    newUser.save(function(err, data){
        if(err){
            console.log(err)
        }else{
        res.send("saved successfully " + newUser)
        }
    });
})



//... TÉRMINO DE SERVICIOS WEB**. 


// Configuración para la ejecución de nuestro servidor
app.use(router)
app.listen(port,() => {
    console.log('Listening on '+port)
})

