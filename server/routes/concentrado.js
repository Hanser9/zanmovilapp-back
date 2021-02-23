var express = require("express");
var router = express.Router();
var ctrl = require('../controllers/concentrado');

router.get('/numeroViaje', getNumeroViaje);
router.post('/productos', getProductos);
router.get('/clientes', getClientes);
router.post('/setConcentrado', setConcentrado);

function getNumeroViaje(req, res) {
    ctrl.getNumeroViaje()
        .then(function(result) {
            res.json({res: result});
        });
};

function getProductos(req, res){
    var data = req.body;
    ctrl.getProductos(data)
        .then(function(result){
            res.json({res: result});
        });
};

function getClientes(req, res) {
    ctrl.getClientes()
        .then(function(result) {
            res.json({res: result});
        });
};

function setConcentrado(req, res){
    var data = req.body;
    ctrl.setConcentrado(data)
        .then(function(result){
            res.json({res: result});
        });
};

module.exports = router;
