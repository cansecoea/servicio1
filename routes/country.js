'use strict'

var express = require('express')

// Importamos el controlador
var countryController = require('../controllers/country')

// INstanciamos un objeto Router
var api = express.Router()

// Definimos el recurso GET con url : /api/auto/:id?, 
// recibe un parametro y se procesa con el metodo prueba del 
// controlador autoController
api.get('/country/:id?',countryController.getCountry);
api.get('/countries/',countryController.getCountries);
api.post('/country',countryController.saveCountry);
api.put('/country/:id?',countryController.updateCountry);
api.delete('/country/:id?',countryController.deleteCountry);

// Para utilizarla en otros ficheros e importar
module.exports = api;