var mssql = require("mssql")
var config = {   
};

module.exports = {
    setGastos: setGastos
};

function setGastos(d){
    return new Promise(function(resolve, reject) {    
        console.log(`
        INSERT INTO Gastos
        (TipoGasto, Descripcion, Monto, Fecha, Color, Compra)
        VALUES('${d.tipoGasto}', '${d.descripcion}', ${d.monto}, '${d.fecha}', '-16776961', 0);
                  `);
        mssql.connect(config, function (err) {
            if (err){
                console.log(err);
            }else {
                var request = new mssql.Request();                
                request.query(
                    `
                    INSERT INTO Gastos
                    (TipoGasto, Descripcion, Monto, Fecha, Color, Compra)
                    VALUES('${d.tipoGasto}', '${d.descripcion}', ${d.monto}, '${d.fecha}', '-16776961', 0);
                              `,
                    function (err, recordset) {
                        if (err) {
                            console.log(err, 'err')
                        }else {
                            console.log(recordset.recordset)
                            resolve(recordset.recordset)
                        }
                    });
            }
        });
    })
}