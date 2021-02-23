var mssql = require("mssql")
var config = {
};

module.exports = {
    validateUser: validateUser,
    validateAdmin: validateAdmin
};

function validateUser (data) {
    return new Promise(function(resolve, reject) {
        mssql.connect(config, function (err) {
            if (err){
                console.log(err);
            }else {
                var request = new mssql.Request();
                request.query(
                    `
                                select 
                                    * 
                                 from 
                                    usuario
                                 where
                                    Nombre = '${data.usuario}'
                              `,
                    function (err, recordset) {
                        if (err) {
                            console.log(err)
                        }else {
                            console.log(recordset.recordset)
                            resolve(recordset.recordset)
                        }
                    });
            }
        });
    })
}

function validateAdmin (data) {
    return new Promise(function(resolve, reject) {
        mssql.connect(config, function (err) {
            if (err){
                console.log(err);
            }else {
                var request = new mssql.Request();
                request.query(
                    `
                                select 
                                    * 
                                 from 
                                    Administrador
                                 where
                                    Nombre = '${data.usuario}'
                              `,
                    function (err, recordset) {
                    if (err) {
                        console.log(err)
                    }else {
                        console.log(recordset.recordset)
                        resolve(recordset.recordset)
                    }
                });
            }
        });
    })
}