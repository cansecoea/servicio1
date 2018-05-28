'use strict'

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Representa el tipo de documentos en la BD
var VersionSchema = new Schema (
    {
        version: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta version del anio por favor',
            index: {
                unique: false,
                dropDups: true
            }
        },
        id_anio: {
            type: Schema.ObjectId,
            required: 'Inserta Id a la version, que será el del anio'
        }
    },
        
    {
        timestamps: true
    }
);


var Version = mongoose.model('Version',VersionSchema);

// Podrá ser accedido desde cualquier parte si se importa
module.exports = Version;