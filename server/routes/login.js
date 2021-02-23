var express = require("express");
var router = express.Router();
var ctrl = require('../controllers/login');

router.post('/validateUser', validateUser);

function validateUser(req, res) {
    var data = req.body
    ctrl.validateUser(data)
        .then(function(result) {
            res.json({res: result});
        });
};

module.exports = router;
