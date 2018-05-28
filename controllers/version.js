'use strict'

// Importamos el modelado
var Version = require('../models/version')
var mongoose = require('mongoose')

function getVersion(req, res) {
    //Obtenemos el id que llega como parametro
    var versionId = req.params.id;
    // Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(versionId);
    if(!idValido) {
        res.status(409).send({ message: 'Id invalido.' });
    } else {
        // Buscaremos un documento por el Id Proporcionado
        Version.findById(versionId, function(err,version){
            if(err) {
                console.log(err)
                res.status(500).send( { message: 'Error al obtener version', error:err} )
            } else {
                if(!version) {
                    res.status(404).send({ message: 'No existe version con el Id dado', error:err} );
                } else {
                    res.status(200).send({data: version});
                }
            }        
        });
    }
}

function getVersions(req, res) {
    Version.find({}).sort('version').exec(function(err,versions) {
        if(err) {
            console.log(err)
            res.status(500).send( { message: 'Error al obtener versions', error:err} )
        } else {
            res.status(200).send({data: versions})
        }                 
    });
}

function getVersionsPorAnio(req, res) {
    //Obtenemos el id que llega como parametro
    var anioId = req.params.id;
    // Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(anioId);
    if(!idValido) {
        res.status(409).send({ message: 'Id de la anio invalido.' });
    } else {
        Version.find({id_anio: anioId}).sort('version').exec(function(err,versions) {
            if(err) {
                console.log(err)
                res.status(500).send( { message: 'Error al obtener versions', error:err} )
            } else {
                res.status(200).send({data: versions})
            }                 
        });
    }
}

function saveVersion(req, res) {
    // definimos el objeto a guardar como documento
    var version = new Version(req.body);

    version.save(function(err, versionSaved) {
        if(err) {
            console.log(err)
            res.status(500).send( { message: 'Error al guardar el version', error:err} )
        } else {
            res.status(200).send({ data: versionSaved })
        }
    });
}

function updateVersion(req, res) {
    //Obtenemos el id que llega como parametro
    var versionId = req.params.id;
    // Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(versionId);
    if(!idValido) {
        res.status(409).send({ message: 'Id invalido.' });
    } else {
        Version.findByIdAndUpdate(versionId, req.body,{new:true},function(err,versionUpdate){
            if(err) {
                console.log(err)
                    res.status(500).send( { message: 'Error al actualizar version', error:err} )
            } else {
                    res.status(200).send({data: versionUpdate});
            }
        });
    }
}

//Version 1: Más elegante y concisa
function deleteVersion(req, res) {
    //Obtenemos el id que llega como parametro
    var versionId = req.params.id;
    // Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(versionId);
    if(!idValido) {
        res.status(409).send({ message: 'Id invalido.' });
    } else {
        // Primero buscamos el auto a eliminar por su Id
        Version.findByIdAndRemove(versionId, (err, version) => {
            if(err) {
                console.log(err)
                res.status(500).send( { message: 'Error al eliminar version', error:err} )
            } else {
                if(!version) {
                    res.status(404).send({ message: 'No existe version con el Id dado para eliminar', error:err} );
                } else {
                    res.status(200).send({message: "Version eliminado OK"});
                }
            }
        })
    }
}


// definimos los metodos que pueden ser alcanzables
module.exports = { getVersion, getVersions, getVersionsPorAnio, saveVersion, updateVersion, deleteVersion }