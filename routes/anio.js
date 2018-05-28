'use strict'

var express = require('express')

// Importamos el controlador
var anioController = require('../controllers/anio')

// INstanciamos un objeto Router
var api = express.Router()

// Definimos el recurso GET con url : /api/auto/:id?, 
// recibe un parametro y se procesa con el metodo prueba del 
// controlador autoController
api.get('/anio/:id?',anioController.getAnio);
api.get('/anios/',anioController.getAnios);
api.get('/anios/:id?',anioController.getAniosPorModelo);
api.post('/anio',anioController.saveAnio);
api.put('/anio/:id?',anioController.updateAnio);
api.delete('/anio/:id?',anioController.deleteAnio);

// Para utilizarla en otros ficheros e importar
module.exports = api;