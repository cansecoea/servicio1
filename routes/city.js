'use strict'

var express = require('express')

// Importamos el controlador
var cityController = require('../controllers/city')

// INstanciamos un objeto Router
var api = express.Router()

// Definimos el recurso GET con url : /api/auto/:id?, 
// recibe un parametro y se procesa con el metodo prueba del 
// controlador autoController
api.get('/city/:id?',cityController.getCity);
api.get('/cities/',cityController.getCities);
api.post('/city',cityController.saveCity);
api.put('/city/:id?',cityController.updateCity);
api.delete('/city/:id?',cityController.deleteCity);

// Para utilizarla en otros ficheros e importar
module.exports = api;