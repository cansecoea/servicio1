'use strict'

var express = require('express')

// Importamos el controlador
var languageController = require('../controllers/language')

// INstanciamos un objeto Router
var api = express.Router()

// Definimos el recurso GET con url : /api/auto/:id?, 
// recibe un parametro y se procesa con el metodo prueba del 
// controlador autoController
api.get('/language/:id?',languageController.getLanguage);
api.get('/languages/',languageController.getLanguages);
api.post('/language',languageController.saveLanguage);
api.put('/language/:id?',languageController.updateLanguage);
api.delete('/language/:id?',languageController.deleteLanguage);

// Para utilizarla en otros ficheros e importar
module.exports = api;