'use strict'

// Importamos el modelado
var Anio = require('../models/anio')
var mongoose = require('mongoose')

function getAnio(req, res) {
    //Obtenemos el id que llega como parametro
    var anioId = req.params.id;
    // Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(anioId);
    if(!idValido) {
        res.status(409).send({ message: 'Id invalido.' });
    } else {
        // Buscaremos un documento por el Id Proporcionado
        Anio.findById(anioId, function(err,anio){
            if(err) {
                console.log(err)
                res.status(500).send( { message: 'Error al obtener anio', error:err} )
            } else {
                if(!anio) {
                    res.status(404).send({ message: 'No existe anio con el Id dado', error:err} );
                } else {
                    res.status(200).send({data: anio});
                }
            }        
        });
    }
}

function getAnios(req, res) {
    Anio.find({}).sort('anio').exec(function(err,anios) {
        if(err) {
            console.log(err)
            res.status(500).send( { message: 'Error al obtener anios', error:err} )
        } else {
            res.status(200).send({data: anios})
        }                 
    });
}

function getAniosPorModelo(req, res) {
    //Obtenemos el id que llega como parametro
    var modeloId = req.params.id;
    // Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(modeloId);
    if(!idValido) {
        res.status(409).send({ message: 'Id de la modelo invalido.' });
    } else {
        Anio.find({id_modelo: modeloId}).sort('anio').exec(function(err,anios) {
            if(err) {
                console.log(err)
                res.status(500).send( { message: 'Error al obtener anios', error:err} )
            } else {
                res.status(200).send({data: anios})
            }                 
        });
    }
}

function saveAnio(req, res) {
    // definimos el objeto a guardar como documento
    var anio = new Anio(req.body);

    anio.save(function(err, anioSaved) {
        if(err) {
            console.log(err)
            res.status(500).send( { message: 'Error al guardar el anio', error:err} )
        } else {
            res.status(200).send({ data: anioSaved })
        }
    });
}

function updateAnio(req, res) {
    //Obtenemos el id que llega como parametro
    var anioId = req.params.id;
    // Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(anioId);
    if(!idValido) {
        res.status(409).send({ message: 'Id invalido.' });
    } else {
        Anio.findByIdAndUpdate(anioId, req.body,{new:true},function(err,anioUpdate){
            if(err) {
                console.log(err)
                    res.status(500).send( { message: 'Error al actualizar anio', error:err} )
            } else {
                    res.status(200).send({data: anioUpdate});
            }
        });
    }
}

//Version 1: Más elegante y concisa
function deleteAnio(req, res) {
    //Obtenemos el id que llega como parametro
    var anioId = req.params.id;
    // Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(anioId);
    if(!idValido) {
        res.status(409).send({ message: 'Id invalido.' });
    } else {
        // Primero buscamos el auto a eliminar por su Id
        Anio.findByIdAndRemove(anioId, (err, anio) => {
            if(err) {
                console.log(err)
                res.status(500).send( { message: 'Error al eliminar anio', error:err} )
            } else {
                if(!anio) {
                    res.status(404).send({ message: 'No existe anio con el Id dado para eliminar', error:err} );
                } else {
                    res.status(200).send({message: "Anio eliminado OK"});
                }
            }
        })
    }
}


// definimos los metodos que pueden ser alcanzables
module.exports = { getAnio, getAnios, getAniosPorModelo, saveAnio, updateAnio, deleteAnio }