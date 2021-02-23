var model = require("../models/login");
var cryptoJs = require('crypto-js');
var token = require('token')

module.exports = {
    validateUser: validateUser
};

function validateUser(data) {
    return new Promise(function (resolve, reject) {
        var pass = cryptoJs.AES.decrypt(data.password, 'cochis');
        pass = pass.toString(cryptoJs.enc.Utf8);
        var d = {
            usuario: data.usuario,
            password: pass,
            tipoUsuario: data.tipoUsuario
        };
        console.log(d);
        if (d.tipoUsuario === 1) {
            model.validateUser(d)
                .then(function (res) {
                    if (res[0] === undefined || res[0] === null){
                        resolve({err: true, rason: 'Usuario no encontrado'})
                    }else if (res[0].Nombre.toUpperCase() === d.usuario.toUpperCase() && res[0].Contraseña === d.password){
                        token.defaults.secret = 'cochis';
                        token.defaults.timeStep = 28800; //TODO 8 horas de vida para el token
                        var tok = token.generate(res[0].Nombre); //TODO para validar token se Nombre (Usuario)
                        console.log(tok, '<-------------------')
                        var r = res[0]
                        var i = {
                            usuarioId: r.UsuarioID,
                            nombre: r.Nombre,
                            apellidoP: r.ApellidoP,
                            apellidoM: r.ApellidoM,
                            token: tok,
                            err: false
                        }
                        resolve(i)
                    }else {
                        resolve({err: true, rason: 'Usuario o contraseña incorrectas'})
                    }
                })
        }else{
            model.validateAdmin(d)
                .then(function (res) {
                    console.log(res[0], "<-------------------")
                    if (res[0] === undefined || res[0] === null){
                        resolve({err: true, rason: 'Usuario no encontrado'})
                    }else if (res[0].Nombre.toUpperCase() === d.usuario.toUpperCase() && res[0].Contraseña === d.password){
                        token.defaults.secret = 'cochis';
                        token.defaults.timeStep = 28800; //TODO 8 horas de vida para el token
                        var tok = token.generate(res[0].Nombre); //TODO para validar token se Nombre (Usuario)
                        console.log(tok, '<-------------------')
                        var r = res[0]
                        var i = {
                            usuarioId: r.AdministradorID,
                            nombre: r.Nombre,
                            apellidoP: r.ApellidoP,
                            apellidoM: r.ApellidoM,
                            token: tok,
                            err: false
                        }
                        resolve(i)
                    }else {
                        resolve({err: true, rason: 'Usuario o contraseña incorrectas'})
                    }
                })
        }
    })
}