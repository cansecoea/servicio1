'use strict'

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Representa el tipo de documentos en la BD
var AnioSchema = new Schema (
    {
        anio: {
            type: Number,
            default: '',
            required: 'Inserta anio de modelo por favor',
            index: {
                unique: false,
                dropDups: true
            }
        },
        id_modelo: {
            type: Schema.ObjectId,
            required: 'Inserta Id al anio, que será el del modelo'
        }
    },
        
    {
        timestamps: true
    }
);


var Anio = mongoose.model('Anio',AnioSchema);

// Podrá ser accedido desde cualquier parte si se importa
module.exports = Anio;