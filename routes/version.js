'use strict'

var express = require('express')

// Importamos el controlador
var versionController = require('../controllers/version')

// INstanciamos un objeto Router
var api = express.Router()

// Definimos el recurso GET con url : /api/auto/:id?, 
// recibe un parametro y se procesa con el metodo prueba del 
// controlador autoController
api.get('/version/:id?',versionController.getVersion);
api.get('/versions/',versionController.getVersions);
api.get('/versions/:id?',versionController.getVersionsPorAnio);
api.post('/version',versionController.saveVersion);
api.put('/version/:id?',versionController.updateVersion);
api.delete('/version/:id?',versionController.deleteVersion);

// Para utilizarla en otros ficheros e importar
module.exports = api;