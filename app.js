var express = require('express');
var bodyParser = require('body-parser');

var ciudadano_route = require('./rutas/spclat_ciudadano.route');
var problema_ciudadano_route = require('./rutas/spclat_problemas_ciudadano.route');
var ciudad_route = require('./rutas/spclat_ciudad.route');
var etnia_route = require('./rutas/spclat_etnia.route');
var parroquia_route = require('./rutas/spclat_parroquia.route');
var nacionalidad_route = require('./rutas/spclat_nacionalidad.route');
var consultas_varias_route = require('./rutas/spclat_consultas_varias.route');
var problema_route = require('./rutas/spclat_problemas.route');





//Inicializar variables 
var app = express();

//Habilitar CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,token");
    res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTIONS", );
    next();
});

//Configuracion Body-Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/ciudadano', ciudadano_route);
app.use('/problema_ciudadano', problema_ciudadano_route);
app.use('/ciudad', ciudad_route);
app.use('/etnia', etnia_route);
app.use('/parroquia', parroquia_route);
app.use('/nacionalidad', nacionalidad_route);
app.use('/consultas_varias', consultas_varias_route);
app.use('/problemas', problema_route);



//Configuracion 2 ->Escuchar peticiones
app.listen(3000, () => {
    console.log('Express Server corriendo en el puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});