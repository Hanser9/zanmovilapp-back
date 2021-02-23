var express = require("express");
var router = express.Router();
var ctrl = require('../controllers/proveedor');

router.post('/nuevoProovedor', nuevoProovedor);

function nuevoProovedor(req, res) {
    var data = req.body
    ctrl.validateUser(data)
        .then(function(result) {
            res.json({res: result});
        });
};

module.exports = router;
