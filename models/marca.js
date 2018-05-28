'use strict'

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

//var Modelo = require('./Modelo')

// Representa el tipo de documentos en la BD
var MarcaSchema = new Schema (
    {
        nombre: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta nombre de marca por favor',
            index: {
                unique: false,
                dropDups: true
            }
        },
        pais: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta pais de la marca por favor',
            index: {
                unique: false,
                dropDups: true
            }
        },
        fechaCreacion: {
            type: Date,
            trim: true,
            default: '',
            required: 'Inserta fecha de creación de la marca por favor',
            index: {
                unique: false,
                dropDups: true
            }
        },

        // Comentado para hacer relación en documentos separados
        //modelos: [Modelo.schema]
    },
        
    {
        timestamps: true
    }
);


var Marca = mongoose.model('Marca',MarcaSchema);

// Podrá ser accedido desde cualquier parte si se importa
module.exports = Marca;