'use strict'

// Importamos el modelado
//var Auto = require('../models/currency')
var mongoose = require('mongoose')


function getCurrency(req, res) {
    res.status(200).send({metodo: "getCurrency"})
}

function getCurrencies(req, res) {
    res.status(200).send({metodo: "getCurrencies"})
}

function saveCurrency(req, res) {
    res.status(200).send({metodo: "saveCurrency"})
}

function updateCurrency(req, res) {
    res.status(200).send({metodo: "updateCurrency"})
}


function deleteCurrency(req, res) {
    res.status(200).send({metodo: "deleteCurrency"})
}
  


// definimos los metodos que pueden ser alcanzables
module.exports = { getCurrency, getCurrencies, saveCurrency, updateCurrency, deleteCurrency }
