'use strict'

// Importamos el modelado
//var Auto = require('../models/language')
var mongoose = require('mongoose')


function getLanguage(req, res) {
    res.status(200).send({metodo: "getLanguage"})
}

function getLanguages(req, res) {
    res.status(200).send({metodo: "getLanguages"})
}

function saveLanguage(req, res) {
    res.status(200).send({metodo: "saveLanguage"})
}

function updateLanguage(req, res) {
    res.status(200).send({metodo: "updateLanguage"})
}


function deleteLanguage(req, res) {
    res.status(200).send({metodo: "deleteLanguage"})
}
  


// definimos los metodos que pueden ser alcanzables
module.exports = { getLanguage, getLanguages, saveLanguage, updateLanguage, deleteLanguage }
