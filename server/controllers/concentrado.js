var model = require("../models/concentrado");

module.exports = {
    getNumeroViaje: getNumeroViaje,
    getProductos: getProductos,
    getClientes: getClientes,
    setConcentrado: setConcentrado
};

function getNumeroViaje() {
    return new Promise(function (resolve, reject) {
        model.getNumeroViaje()
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

function getClientes() {
    return new Promise(function (resolve, reject) {
        model.getClientes()
        .then(function (res) {
            resolve(res)
        })
    })
}

function setConcentrado(d) {
    return new Promise(function(resolve, reject){
        var data = d;
        console.log(data);

        var p1 = model.updateNota(data);
        var p2 = model.setConcentrado(data);
    
        Promise.all([p1, p2]).then(function(res) {

          resolve(res[0], res[1])
        })

    })
}