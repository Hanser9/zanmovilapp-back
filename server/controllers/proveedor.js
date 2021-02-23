var model = require("../models/proveedor");
var cryptoJs = require('crypto-js');
var token = require('token')

module.exports = {
    nuevoProovedor: nuevoProovedor
};

function nuevoProovedor(data) {
    return new Promise(function (resolve, reject) {
        var d = data
        if(d.nombre === "" || d.apellido === "" || d.direccion === "" || d.telefono === "" || d.correo === "" || d.color === "" || d.relleno === "") {
            resolve({err: true, codigo: "Todos los datos son requeridos"})
        }else{
            
            model.nuevoProovedor(d)
            .then(function (res) {
                resolve(res)
            })
        }
    })
}