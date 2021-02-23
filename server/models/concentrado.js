var mssql = require("mssql")
var config = {   
};

module.exports = {
    getNumeroViaje: getNumeroViaje,
    getProductos: getProductos,
    getClientes: getClientes,
    setConcentrado: setConcentrado,
    updateNota: updateNota
};

function getNumeroViaje () {
    return new Promise(function(resolve, reject) {
        mssql.connect(config, function (err) {
            if (err){
                console.log(err);
            }else {
                var request = new mssql.Request();
                request.query(
                    `
                    select DISTINCT NumNota from Nota where CantidadExis <> 0;
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

function getProductos(d){
    return new Promise(function(resolve, reject) {
        mssql.connect(config, function (err) {
            if (err){
                console.log(err);
            }else {
                var request = new mssql.Request();                
                request.query(
                    `
                    select 
                        a1.NotaID, a1.Cantidad, a2.ProductoID, CONCAT(a2.Tipo, ' (', a2.Descripcion, ')') productoNombre, a1.CantidadExis 
                    from 
                        nota a1
                    inner join
                        Productos a2
                    on 
                        a1.ProductoID = a2.ProductoID 
                    where 
                        CantidadExis <> 0
                    and
                        a1.NumNota = ${d.NumNota};
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

function getClientes () {
    return new Promise(function(resolve, reject) {
        mssql.connect(config, function (err) {
            if (err){
                console.log(err);
            }else {
                var request = new mssql.Request();
                request.query(
                    `
                        select ClienteID , NombreCli from Clientes order by NombreCli ASC;
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

function setConcentrado(d){
    return new Promise(function(resolve, reject) {
        console.log(
            `
                    INSERT INTO Concentrados
                    (UsuarioID, NotaID, ProductoID, Cantidad, CienteID, Reparto, PrecioReparto, Existencia, Importe, Efectivo, Credito, DGustavo, Fecha, RestaImporte, Comentarios)
                    VALUES(${d.usuario}, ${d.viaje}, ${d.producto}, ${d.cantidad}, ${d.cliente}, ${d.reparto}, ${d.precioReparto}, ${d.existenciaFinal}, ${parseInt(d.reparto) * parseInt(d.precioReparto)}, ${(d.pago == 1) ? parseInt(d.reparto) * parseInt(d.precioReparto) : null}, ${(d.pago == 2) ? parseInt(d.reparto) * parseInt(d.precioReparto) : null}, '${d.nombreCliente}', '${d.fecha}', ${parseInt(d.reparto) * parseInt(d.precioReparto)}, '${(d.comentarios === "") ? '' : d.comentarios}');
                              `
        );
        mssql.connect(config, function (err) {
            if (err){
                console.log(err);
            }else {
                var request = new mssql.Request();                
                request.query(
                    `
                    INSERT INTO Concentrados
                    (UsuarioID, NotaID, ProductoID, Cantidad, CienteID, Reparto, PrecioReparto, Existencia, Importe, Efectivo, Credito, DGustavo, Fecha, RestaImporte, Comentarios)
                    VALUES(${d.usuario}, ${d.viaje}, ${d.producto}, ${d.existencia}, ${d.cliente}, ${d.reparto}, ${d.precioReparto}, ${d.existenciaFinal}, ${parseInt(d.reparto) * parseInt(d.precioReparto)}, ${(d.pago == 1) ? parseInt(d.reparto) * parseInt(d.precioReparto) : null}, ${(d.pago == 2) ? parseInt(d.reparto) * parseInt(d.precioReparto) : null}, '${d.nombreCliente}', '${d.fecha}', ${parseInt(d.reparto) * parseInt(d.precioReparto)}, '${(d.comentarios === "") ? '' : d.comentarios}');
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

function updateNota(d){
    return new Promise(function(resolve, reject) {
        mssql.connect(config, function (err) {
            if (err){
                console.log(err);
            }else {
                var request = new mssql.Request();                
                request.query(
                    `
                    UPDATE Nota
                    SET CantidadExis = ${d.existenciaFinal}
                    WHERE NotaID = ${d.notaId};
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