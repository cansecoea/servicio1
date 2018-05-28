'use strict'

var express = require('express')

// Importamos el controlador
var marcaController = require('../controllers/marca')

// INstanciamos un objeto Router
var api = express.Router()

// Definimos el recurso GET con url : /api/auto/:id?, 
// recibe un parametro y se procesa con el metodo prueba del 
// controlador autoController
api.get('/marca/:id?',marcaController.getMarca);
api.get('/marcas/',marcaController.getMarcas);
api.post('/marca',marcaController.saveMarca);
api.put('/marca/:id?',marcaController.updateMarca);
api.delete('/marca/:id?',marcaController.deleteMarca);

// Para utilizarla en otros ficheros e importar
module.exports = api;