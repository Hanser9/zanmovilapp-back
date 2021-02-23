var model = require("../models/gastos");

module.exports = {
    setGastos: setGastos
};

function setGastos(d) {
    return new Promise(function(resolve, reject){        
        model.setGastos(d)
        .then(function (res) {
            resolve(res)
        })
    })
}