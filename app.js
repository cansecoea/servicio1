'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var app = express()

var apiAuto = require('./routes/auto')
var apiCity = require('./routes/city')
var apiCountry = require('./routes/country')
var apiCurrency = require('./routes/currency')
var apiLanguage = require('./routes/language')

var apiMarca = require('./routes/marca')
var apiModelo = require('./routes/modelo')
var apiAnio = require('./routes/anio')
var apiVersion = require('./routes/version')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req,res,next) {
    // Puede ser consumida desde cualquier lugar
    res.header('Access-Control-Allow-Origin','*');
    // Cabeceras permitidas
    res.header('Access-Control-Allow-Headers','X-API-KEY,Origin,X-Requested-With,Content-Type,Accept,Access-Control-Request-Method');
    // Métodos permitidos
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Allow', 'GET, POST, PUT, DELETE');
    next();
});

// URL de la API
app.use('/api',apiAuto)
app.use('/api',apiCity)
app.use('/api',apiCountry)
app.use('/api',apiCurrency)
app.use('/api',apiLanguage)

app.use('/api',apiMarca)
app.use('/api',apiModelo)
app.use('/api',apiAnio)
app.use('/api',apiVersion)

// Para utilizarlos en otros ficheros e importar
module.exports = app;
