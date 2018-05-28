'use strict'

var express = require('express')

// Importamos el controlador
var modeloController = require('../controllers/modelo')

// INstanciamos un objeto Router
var api = express.Router()

// Definimos el recurso GET con url : /api/auto/:id?, 
// recibe un parametro y se procesa con el metodo prueba del 
// controlador autoController
api.get('/modelo/:id?',modeloController.getModelo);
api.get('/modelos/',modeloController.getModelos);
api.get('/modelos/:id?',modeloController.getModelosPorMarca);
api.post('/modelo',modeloController.saveModelo);
api.put('/modelo/:id?',modeloController.updateModelo);
api.delete('/modelo/:id?',modeloController.deleteModelo);

// Para utilizarla en otros ficheros e importar
module.exports = api;