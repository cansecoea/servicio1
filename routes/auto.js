'use strict'

var express = require('express')

// Importamos el controlador
var autoController = require('../controllers/auto')

// INstanciamos un objeto Router
var api = express.Router()

// Definimos el recurso GET con url : /api/auto/:id?, 
// recibe un parametro y se procesa con el metodo prueba del 
// controlador autoController
api.get('/auto/:id?',autoController.getAuto);
api.get('/autos/',autoController.getAutos);
api.post('/auto',autoController.saveAuto);
api.put('/auto/:id?',autoController.updateAuto);
api.delete('/auto/:id?',autoController.deleteAuto);
api.put('/auto/colores/:id?',autoController.updateAutoColores);

// Para utilizarla en otros ficheros e importar
module.exports = api;