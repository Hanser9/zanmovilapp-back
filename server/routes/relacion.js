var express = require("express");
var router = express.Router();
var ctrl = require('../controllers/relacion');

router.get('/proveedores', getProveedores);
router.post('/productos', getProductos);
router.get('/usuarios', getUsuarios);
router.post('/setRelacion', setRelacion);

function getProveedores(req, res) {
    ctrl.getProveedores()
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

function getUsuarios(req, res) {
    ctrl.getUsuarios()
        .then(function(result) {
            res.json({res: result});
        });
};

function setRelacion(req, res){
    var data = req.body;
    ctrl.setRelacion(data)
        .then(function(result){
            res.json({res: result});
        });
};

module.exports = router;
