var express = require('express');
var app = express();
var rows = require('../config/config').ROWS_POR_PAG;
var mdAuthenticationJWT = require('../middlewares/authentication');
//variable de conexion a postgres
const pool = require('../config/db');

//datos de funcion crud general
var crud = require('../funciones/crud_operaciones');
//DATOS DE LA TABLA
var datos_tabla = {
    tabla_target: 'ciudad_spclat',
    pk_tabla: 'pk_ciudad',
    sp_crud_tabla: ''
}

//Rutas
// ==========================================
// Obtener todos los registros TODOS x PADRE
// ========================================== 
app.get('/', (req, res, next) => {

    var consulta;
    consulta = `SELECT * FROM ${ datos_tabla.tabla_target }`;

    crud.getAll(datos_tabla.tabla_target, consulta, res);
});


// ==========================================
// Obtener registro por ID
// ========================================== 
app.get('/verificar_cedula/:cedula', (req, res) => {
    //con req.params.PARAMETRO .. recibe el parametro que envio en la peticion PUT con el campo id (/:id) que es igual al nombre del modelo
    var cedula = req.params.cedula;
    //consulta si existen un registro del existente
    consulta = `SELECT * FROM sp_verificar_cedula(${cedula});`;
    //LLamo al archivo CRUD OPERACIONES
    crud.getID(datos_tabla.tabla_target, cedula, consulta, res);

});

// ==========================================
// Ejecutar Crud acorde a parametro 
// ========================================== 
app.get('/verificar_ciudadano/:cedula', (req, res) => {
    //con req.params.PARAMETRO .. recibe el parametro que envio en la peticion PUT con el campo id (/:id) que es igual al nombre del modelo
    var cedula = req.params.cedula;
    //consulta si existen un registro del existente
    consulta = `SELECT count(*) as numero_ciu FROM ciudadano_spclat WHERE cedula_ciu='${cedula}';`;
    //LLamo al archivo CRUD OPERACIONES
    crud.getID(datos_tabla.tabla_target, cedula, consulta, res);

});



module.exports = app;