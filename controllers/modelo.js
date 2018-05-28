'use strict'

// Importamos el modelado
var Modelo = require('../models/modelo')
var mongoose = require('mongoose')

function getModelo(req, res) {
    //Obtenemos el id que llega como parametro
    var modeloId = req.params.id;
    // Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(modeloId);
    if(!idValido) {
        res.status(409).send({ message: 'Id invalido.' });
    } else {
        // Buscaremos un documento por el Id Proporcionado
        Modelo.findById(modeloId, function(err,modelo){
            if(err) {
                console.log(err)
                res.status(500).send( { message: 'Error al obtener modelo', error:err} )
            } else {
                if(!modelo) {
                    res.status(404).send({ message: 'No existe modelo con el Id dado', error:err} );
                } else {
                    res.status(200).send({data: modelo});
                }
            }        
        });
    }
}

function getModelos(req, res) {
    Modelo.find({}).sort('nombre').exec(function(err,modelos) {
        if(err) {
            console.log(err)
            res.status(500).send( { message: 'Error al obtener modelos', error:err} )
        } else {
            res.status(200).send({data: modelos})
        }                 
    });
}

function getModelosPorMarca(req, res) {
    //Obtenemos el id que llega como parametro
    var marcaId = req.params.id;
    // Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(marcaId);
    if(!idValido) {
        res.status(409).send({ message: 'Id de la marca invalido.' });
    } else {
        Modelo.find({id_marca: marcaId}).sort('nombre').exec(function(err,modelos) {
            if(err) {
                console.log(err)
                res.status(500).send( { message: 'Error al obtener modelos', error:err} )
            } else {
                res.status(200).send({data: modelos})
            }                 
        });
    }
}

function saveModelo(req, res) {
    // definimos el objeto a guardar como documento
    var modelo = new Modelo(req.body);

    modelo.save(function(err, modeloSaved) {
        if(err) {
            console.log(err)
            res.status(500).send( { message: 'Error al guardar el modelo', error:err} )
        } else {
            res.status(200).send({ data: modeloSaved })
        }
    });
}

function updateModelo(req, res) {
    //Obtenemos el id que llega como parametro
    var modeloId = req.params.id;
    // Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(modeloId);
    if(!idValido) {
        res.status(409).send({ message: 'Id invalido.' });
    } else {
        Modelo.findByIdAndUpdate(modeloId, req.body,{new:true},function(err,modeloUpdate){
            if(err) {
                console.log(err)
                    res.status(500).send( { message: 'Error al actualizar modelo', error:err} )
            } else {
                    res.status(200).send({data: modeloUpdate});
            }
        });
    }
}

//Version 1: Más elegante y concisa
function deleteModelo(req, res) {
    //Obtenemos el id que llega como parametro
    var modeloId = req.params.id;
    // Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(modeloId);
    if(!idValido) {
        res.status(409).send({ message: 'Id invalido.' });
    } else {
        // Primero buscamos el auto a eliminar por su Id
        Modelo.findByIdAndRemove(modeloId, (err, modelo) => {
            if(err) {
                console.log(err)
                res.status(500).send( { message: 'Error al eliminar modelo', error:err} )
            } else {
                if(!modelo) {
                    res.status(404).send({ message: 'No existe modelo con el Id dado para eliminar', error:err} );
                } else {
                    res.status(200).send({message: "Modelo eliminado OK"});
                }
            }
        })
    }
}


// definimos los metodos que pueden ser alcanzables
module.exports = { getModelo, getModelos, getModelosPorMarca, saveModelo, updateModelo, deleteModelo }