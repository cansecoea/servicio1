'use strict'

// Importamos el modelado
//var Auto = require('../models/city')
var mongoose = require('mongoose')


function getCity(req, res) {
    res.status(200).send({metodo: "getCity"})
}

function getCities(req, res) {
    res.status(200).send({metodo: "getCities"})
}

function saveCity(req, res) {
    res.status(200).send({metodo: "saveCity"})
}

function updateCity(req, res) {
    res.status(200).send({metodo: "updateCity"})
}


function deleteCity(req, res) {
    res.status(200).send({metodo: "deleteCity"})
}
  


// definimos los metodos que pueden ser alcanzables
module.exports = { getCity, getCities, saveCity, updateCity, deleteCity }
