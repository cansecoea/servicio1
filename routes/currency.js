'use strict'

var express = require('express')

// Importamos el controlador
var currencyController = require('../controllers/currency')

// INstanciamos un objeto Router
var api = express.Router()

// Definimos el recurso GET con url : /api/auto/:id?, 
// recibe un parametro y se procesa con el metodo prueba del 
// controlador autoController
api.get('/currency/:id?',currencyController.getCurrency);
api.get('/currencies/',currencyController.getCurrencies);
api.post('/currency',currencyController.saveCurrency);
api.put('/currency/:id?',currencyController.updateCurrency);
api.delete('/currency/:id?',currencyController.deleteCurrency);

// Para utilizarla en otros ficheros e importar
module.exports = api;