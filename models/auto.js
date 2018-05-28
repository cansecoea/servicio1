'use strict'

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Representa el tipo de documentos en la BD
var AutoSchema = new Schema (
    {
        marca: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta una marca por favor',
            index: {
                unique: false,
                dropDups: true
            }
        },
        modelo: {
            type: String,
            required: 'Inserta un modelo por favor',
            default: '',
            index: {
                unique: false,
                dropDups: true
            }
        },
        anio: {
            type: Number,
            required: 'Inserta un año por favor',
            default: '',
            index: {
                unique: false,
                dropDups: true
            }
        },
        version: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta una version por favor',
            index: {
                unique: false,
                dropDups: true
            }
        },

        colores: [String],
        serialVersion: {
            type: String,
            trim: true,
            required: 'Inserta un serialVersion por favor',
            index: {
                unique: false,
                dropDups: true
            }
        },

        motorInfo: {
            transmision: {
                type: String,
                required: 'Inserta una transmision por favor',
                default: '',
                index: {
                    unique: false,
                    dropDups: true
                },
                enum: [
                    'manual',
                    'automatico'
                ]
            }
        }
    },
    {
        timestamps: true
    }
);

// Definiremos que nuestro esquema se podrá llamar Auto
// en las operaciones de nuestro controlador
var Auto = mongoose.model('Auto',AutoSchema);

// Podrá ser accedido desde cualquier parte si se importa
module.exports = Auto;

