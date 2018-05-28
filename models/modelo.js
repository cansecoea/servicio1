'use strict'

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Representa el tipo de documentos en la BD
var ModeloSchema = new Schema (
    {
        nombre: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta nombre de modelo por favor',
            index: {
                unique: false,
                dropDups: true
            }
        },
        id_marca: {
            type: Schema.ObjectId,
            required: 'Inserta Id al modelo, que será el de la marca'
        }
    },
        
    {
        timestamps: true
    }
);


var Modelo = mongoose.model('Modelo',ModeloSchema);

// Podrá ser accedido desde cualquier parte si se importa
module.exports = Modelo;