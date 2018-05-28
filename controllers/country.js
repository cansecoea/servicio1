'use strict'

// Importamos el modelado
//var Auto = require('../models/country')
var mongoose = require('mongoose')


function getCountry(req, res) {
    res.status(200).send({metodo: "getCountry"})
}

function getCountries(req, res) {
    res.status(200).send({metodo: "getCountries"})
}

function saveCountry(req, res) {
    res.status(200).send({metodo: "saveCountry"})
}

function updateCountry(req, res) {
    res.status(200).send({metodo: "updateCountry"})
}


function deleteCountry(req, res) {
    res.status(200).send({metodo: "deleteCountry"})
}
  


// definimos los metodos que pueden ser alcanzables
module.exports = { getCountry, getCountries, saveCountry, updateCountry, deleteCountry }
