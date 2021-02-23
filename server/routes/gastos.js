var express = require("express");
var router = express.Router();
var ctrl = require('../controllers/gastos');

router.post('/setGastos', setGastos);


function setGastos(req, res){
    var data = req.body;
    ctrl.setGastos(data)
        .then(function(result){
            res.json({res: result});
        });
};

module.exports = router;
