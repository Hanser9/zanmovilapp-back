var express = require("express");
var cors = require('cors');
var app = express();
app.use(cors());
var bodyParser = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser");
var server = null;
var http = require("http");
var produccion = false;

produccion ?  console.log("Ambiente productivo") : console.log("Ambiente desarrollo");
server = require("http").createServer(app);

app.use(bodyParser.json());
app.use(bodyParser());
app.use(cookieParser());

app.use(function (req,res,next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
});

produccion ? PUERTO = 190910 : PUERTO = 3005  // EL DIA QUE LE DIJE xxx

app.use(express.static(__dirname + '/public'));

//var navRoute = require("./server/routes/nav");
//app.use('/', navRoute); TODO PARA DESPLEGAR HTML

var loginRoute = require("./server/routes/login");
app.use('/login', loginRoute);

var proveedorRoute = require("./server/routes/proveedor");
app.use('/proveedor', proveedorRoute);

var relacionViajeRoute = require("./server/routes/relacion");
app.use('/relacion', relacionViajeRoute);

var concentradoRoute = require("./server/routes/concentrado");
app.use('/concentrado', concentradoRoute);

var gastosRoute = require("./server/routes/gastos");
app.use('/gastos', gastosRoute);


app.set('port', PUERTO);
app.start = app.listen = function (){
  console.log("Escuchando desde el puerto " + PUERTO);
  return server.listen.apply(server, arguments)
};

app.start(app.get('port'));
