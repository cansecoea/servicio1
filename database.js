'use strict'

// Importamos mongoose
var mongoose = require('mongoose')

// Archivo de configuración
var config = require('./config.js')


var database = config.database_dev;
var pwdDatabase = "****";

// Para determinar el tipo de base de datos a usar:
// db=local (-> la de la lap) o db=produccion (-> la de mLab) y
// el password pwddb en caso de la db=produccion
process.argv.forEach((arg) => {
    if(arg.toUpperCase() == "-HELP") {
        console.log("Uso Local: $node index.js [db=[local,produccion]] [pwddb=****]")
        console.log("      AWS: $pm2 start index.js db=produccion pwddb=****")
        console.log("    Ayuda: $node index.js -help")

        process.exit(0)
    }

    var arg_db = arg.split("=",2);

    if(arg_db[0].trim().toUpperCase() == "DB" && arg_db[1].trim().toUpperCase() == "PRODUCCION")
        database = config.database_prd;

    if(arg_db[0].trim().toUpperCase() == "PWDDB")
        pwdDatabase = arg_db[1].trim();

    if(database == config.database_prd && pwdDatabase != "****") {
        arg_db = database.split("*",2);
        database = arg_db[0] + pwdDatabase + arg_db[1];
    }
})

var connection = mongoose.connect(database, function(err) {
    if(err) {
        console.log("Error al conectar a la BD: " + ((database == config.database_dev) ? database : config.database_prd));
    } else {
        console.log("OK conectado a la BD: " + ((database == config.database_dev) ? database : config.database_prd));
    }
});