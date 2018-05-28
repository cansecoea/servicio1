'use strict'

// Importamos app.js
var app = require('./app');
var database = require('./database');

// Puerto
var port = process.env.PORT || 7070

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    app.listen(port,function() {
        console.log('OK Node escuchando por el puerto: ' + port + ", IP: " + add)
    });
});