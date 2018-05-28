'use strict'

// Importamos el modelado
var Auto = require('../models/auto')
var mongoose = require('mongoose')

// Definimos el metodo a ser consumido
// desde el archivo de rutas
function prueba(req, res) {
    if(req.params.id) {
        var id = req.params.id
    } else {
        var id = "SIN ID"
    }

    res.status(200).send({
        message : "Este es el id " + id
    })
}


function getAuto(req, res) {
    //Obtenemos el id que llega como parametro
    var autoId = req.params.id;
    // Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(autoId);
    if(!idValido) {
        res.status(409).send({ message: 'Id invalido.' });
    } else {
        // Buscaremos un documento por el Id Proporcionado
        Auto.findById(autoId, function(err,auto){
            if(err) {
                console.log(err)
                res.status(500).send( { message: 'Error al obtener el Auto', error:err} )
            } else {
                if(!auto) {
                    res.status(404).send({ message: 'No existe el auto con el Id dado', error:err} );
                } else {
                    res.status(200).send({data: auto});
                }
            }        
        });
    }
}

function getAutos(req, res) {
    //Auto.find({}, function(arr,autos) {
    //para ordenar de manera descendente agregar -anio
    Auto.find({}).sort('anio').exec(function(err,autos) {
        if(err) {
            console.log(err)
            res.status(500).send( { message: 'Error al obtener los Autos', error:err} )
        } else {
            res.status(200).send({data: autos})
        }                 
    });
}

function saveAuto(req, res) {
    // definimos el objeto a guardar como documento
    var auto = new Auto(req.body);

    auto.save(function(err, autoSaved) {
        if(err) {
            console.log(err)
            res.status(500).send( { message: 'Error al guardar el Auto', error:err} )
        } else {
            res.status(200).send({ data: autoSaved })
        }
    });
}

function updateAuto(req, res) {
    //Obtenemos el id que llega como parametro
    var autoId = req.params.id;
    // Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(autoId);
    if(!idValido) {
        res.status(409).send({ message: 'Id invalido.' });
    } else {
        // Utilizamos la funcion de mongoose findByIdAndUpdate, 
        // busca un documento por Id y lo actualiza
        // Esta forma no debe usarse, por eso está comentada
        /*Auto.findByIdAndUpdate(autoId, req.body, function(err,autoUpdate){
            if(err) {
                console.log(err)
                res.status(500).send( { message: 'Error al actualizar el Auto', error:err} )
            } else {
                if(!autoUpdate) {
                    res.status(404).send({ message: 'No existe el auto con el Id dado para actualizar', error:err} );
                } else {
                    // Si se actualiza corrrectamente buscamos nuevamente en la BD, ya que el callback retorna
                    // un objeto, pero es el viejo no el nuevo actualizado
                    Auto.findById(autoId, function(err, autoNuevo){
                        //Buscamos por Id y retornamos el auto nuevo y viejo
                        res.status(200).send({viejo: autoUpdate, nuevo: autoNuevo});
                    })
                }
            }        
        });*/

        Auto.findByIdAndUpdate(autoId, req.body,{new:true},function(err,autoUpdate){
            if(err) {
                console.log(err)
                res.status(500).send( { message: 'Error al actualizar el Auto', error:err} )
            } else {
                res.status(200).send({data: autoUpdate});
            }
        })
    }
}


//Version 1: Más elegante y concisa
function deleteAuto(req, res) {
    //Obtenemos el id que llega como parametro
    var autoId = req.params.id;
    // Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(autoId);
    if(!idValido) {
        res.status(409).send({ message: 'Id invalido.' });
    } else {
        // Primero buscamos el auto a eliminar por su Id
        Auto.findByIdAndRemove(autoId, (err, auto) => {
            if(err) {
                console.log(err)
                res.status(500).send( { message: 'Error al eliminar auto', error:err} )
            } else {
                if(!auto) {
                    res.status(404).send({ message: 'No existe el auto con el Id dado para eliminar', error:err} );
                } else {
                    res.status(200).send({message: "Auto eliminado OK"});
                }
            }
        })
    }
}
  
/* Versión 2: Más rebuscada, pero funciona también.
function deleteAuto(req, res) {
    //Obtenemos el id que llega como parametro
    var autoId = req.params.id;
    // Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(autoId);
    if(!idValido) {
        res.status(409).send({ message: 'Id invalido.' });
    } else {
        // Primero buscamos el auto a eliminar por su Id
        Auto.findById(autoId, function(err,auto){
            if(err) {
                console.log(err)
                res.status(500).send( { message: 'Error al obtener auto para eliminarlo', error:err} )
            } else {
                if(!auto) {
                    res.status(404).send({ message: 'No existe el auto con el Id dado para eliminar', error:err} );
                } else {
                    // Eliminamos el auto
                    auto.remove(function(err){
                        if(err) {
                            res.status(500).send( { message: 'Error al eliminar el Auto', error:err} )
                        } else {
                            res.status(200).send({message: "Auto eliminado OK"});
                        }
                    })
                }
            }        
        });
    }
}
*/

function updateAutoColores(req, res) {
    //Obtenemos el id que llega como parametro
    var autoId = req.params.id;
    // Verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(autoId);
    if(!idValido) {
        res.status(409).send({ message: 'Id invalido.' });
    } else {
        Auto.findByIdAndUpdate(autoId,
            {$push: {"colores": req.body.colores}},
            {safe: true, upsert: true, new: true},
            (err, autoUpdate) => {
                if(!autoUpdate) {
                    res.status(404).send({ message: 'No existe el auto con el Id proporcionado' });
                } else {
                    res.status(200).send(autoUpdate)
                }
            }
        );
    }
}


// definimos los metodos que pueden ser alcanzables
module.exports = { prueba, getAuto, getAutos, saveAuto, updateAuto, deleteAuto, updateAutoColores }
