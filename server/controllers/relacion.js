var model = require("../models/relacion");

module.exports = {
    getProveedores: getProveedores,
    getProductos: getProductos,
    getUsuarios: getUsuarios,
    setRelacion: setRelacion
};

function getProveedores() {
    return new Promise(function (resolve, reject) {
        model.getProveedores()
        .then(function (res) {
            resolve(res)
        })
    })
}

function getProductos(d) {
    return new Promise(function(resolve, reject){
        var data = d;
        model.getProductos(data)
            .then(function(res){
                resolve(res)
            })
    })
}

function getUsuarios() {
    return new Promise(function (resolve, reject) {
        model.getUsuarios()
        .then(function (res) {
            resolve(res)
        })
    })
}

function setRelacion(d) {
    return new Promise(function(resolve, reject){
        var data = d;
        var i = {
            nViaje: parseInt(d.nViaje),
            fecha: d.fecha,
            chofer: d.chofer,
            flete: parseInt(d.flete),
            proveedor: parseInt(d.proveedor),
            tipo: parseInt(d.tipo),
            cantidad: parseInt(d.cantidad),
            recibe: parseInt(d.recibe),
            destinatario: 'Pati Casas',
            direccion: 'Bodega P146',
            ciudad: 'Mexico'
          }
        console.log(i)
        model.setRelacion(i)
            .then(function(res){
                resolve(res)
            })
    })
}