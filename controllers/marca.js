'use strict'

// Importamos el modelado
var Marca = require('../models/marca')
var mongoose = require('mongoose')

function getMarca(req, res) {
    //Obtenemos el id que llega como parametro
    var marcaId = req.params.id;
    // Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(marcaId);
    if(!idValido) {
        res.status(409).send({ message: 'Id invalido.' });
    } else {
        // Buscaremos un documento por el Id Proporcionado
        Marca.findById(marcaId, function(err,marca){
            if(err) {
                console.log(err)
                res.status(500).send( { message: 'Error al obtener la marca', error:err} )
            } else {
                if(!marca) {
                    res.status(404).send({ message: 'No existe la marca con el Id dado', error:err} );
                } else {
                    res.status(200).send({data: marca});
                }
            }        
        });
    }
}

function getMarcas(req, res) {
    Marca.find({}).sort('fechaCreacion').exec(function(err,marcas) {
        if(err) {
            console.log(err)
            res.status(500).send( { message: 'Error al obtener las marcas', error:err} )
        } else {
            res.status(200).send({data: marcas})
        }                 
    });
}

function saveMarca(req, res) {
    // definimos el objeto a guardar como documento
    var marca = new Marca(req.body);

    // Creamos la fecha
    var parts = req.body.fechaCreacion.split('-')
    marca.fechaCreacion = new Date(parts[0], parts[1]-1, parts[2])

    marca.save(function(err, marcaSaved) {
        if(err) {
            console.log(err)
            res.status(500).send( { message: 'Error al guardar la Marca', error:err} )
        } else {
            res.status(200).send({ data: marcaSaved })
        }
    });
}

function updateMarca(req, res) {
    //Obtenemos el id que llega como parametro
    var marcaId = req.params.id;
    // Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(marcaId);
    if(!idValido) {
        res.status(409).send({ message: 'Id invalido.' });
    } else {
        Marca.findByIdAndUpdate(marcaId, req.body,{new:true},function(err,marcaUpdate){
            if(err) {
                console.log(err)
                res.status(500).send( { message: 'Error al actualizar la marca', error:err} )
            } else {
                res.status(200).send({data: marcaUpdate});
            }
        })
    }
}


//Version 1: Más elegante y concisa
function deleteMarca(req, res) {
    //Obtenemos el id que llega como parametro
    var marcaId = req.params.id;
    // Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(marcaId);
    if(!idValido) {
        res.status(409).send({ message: 'Id invalido.' });
    } else {
        // Primero buscamos el auto a eliminar por su Id
        Marca.findByIdAndRemove(marcaId, (err, marca) => {
            if(err) {
                console.log(err)
                res.status(500).send( { message: 'Error al eliminar la marca', error:err} )
            } else {
                if(!marca) {
                    res.status(404).send({ message: 'No existe la marca con el Id dado para eliminar', error:err} );
                } else {
                    res.status(200).send({message: "Marca eliminada OK"});
                }
            }
        })
    }
}


// definimos los metodos que pueden ser alcanzables
module.exports = { getMarca, getMarcas, saveMarca, updateMarca, deleteMarca }


