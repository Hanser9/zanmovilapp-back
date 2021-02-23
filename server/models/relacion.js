var mssql = require("mssql")
var config = {
};

module.exports = {
    getProveedores: getProveedores,
    getProductos: getProductos,
    getUsuarios: getUsuarios,
    setRelacion: setRelacion
};

function getProveedores () {
    return new Promise(function(resolve, reject) {
        mssql.connect(config, function (err) {
            if (err){
                console.log(err);
            }else {
                var request = new mssql.Request();
                request.query(
                    `
                        select ProvedorID, CONCAT(Direccion, '(', Nombre, ')') nombre from Provedores;
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
                    select ProductoID, CONCAT(Tipo, ' (', Descripcion, ')') nombre from Productos where ProvedorID = ${d.ProvedorID};
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

function getUsuarios () {
    return new Promise(function(resolve, reject) {
        mssql.connect(config, function (err) {
            if (err){
                console.log(err);
            }else {
                var request = new mssql.Request();
                request.query(
                    `
                        select UsuarioID, Nombre from Usuario;
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

function setRelacion(d){
    return new Promise(function(resolve, reject) {
        console.log(`
        INSERT INTO Nota
            (UsuarioID, ProvedoresID, Chofer, FleteMonto, Direccion, Cantidad, NumNota, Ciudad, Destinatario, ProductoID, CantidadExis, Fecha)
        VALUES
            (${d.recibe}, ${d.proveedor}, '${d.chofer}', ${d.flete}, '${d.direccion}', ${d.cantidad}, ${d.nViaje}, '${d.ciudad}', '${d.destinatario}', ${d.tipo}, ${d.cantidad}, '${d.fecha}');
                  `)
        mssql.connect(config, function (err) {
            if (err){
                console.log(err);
            }else {
                var request = new mssql.Request();                
                request.query(
                    `
                    INSERT INTO Nota
                        (UsuarioID, ProvedoresID, Chofer, FleteMonto, Direccion, Cantidad, NumNota, Ciudad, Destinatario, ProductoID, CantidadExis, Fecha)
                    VALUES
                        (${d.recibe}, ${d.proveedor}, '${d.chofer}', ${d.flete}, '${d.direccion}', ${d.cantidad}, ${d.nViaje}, '${d.ciudad}', '${d.destinatario}', ${d.tipo}, ${d.cantidad}, '${d.fecha}');
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