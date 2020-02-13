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
    tabla_target: 'ciudadano_problema_spclat',
    pk_tabla: 'pk_ciupro',
    sp_crud_tabla: 'sp_spc_lat_crud_problemas_ciudadano'
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

//Rutas
// ==========================================
// Obtener todos los registros TODOS x PADRE
// ========================================== 
app.get('/resumen', (req, res, next) => {

    var consulta;
    consulta = `SELECT * FROM sp_spc_lat_getResumenProblemas()`;

    crud.getAll(datos_tabla.tabla_target, consulta, res);
});



// ==========================================
// Obtener registro por ID
// ========================================== 
app.get('/:id', (req, res) => {
    //con req.params.PARAMETRO .. recibe el parametro que envio en la peticion PUT con el campo id (/:id) que es igual al nombre del modelo
    var id = req.params.id;
    //consulta si existen un registro del existente
    consulta = `SELECT * FROM ${ datos_tabla.tabla_target } WHERE ${datos_tabla.pk_tabla}= ${ id }`;
    //LLamo al archivo CRUD OPERACIONES
    crud.getID(datos_tabla.tabla_target, id, consulta, res);

});

// ==========================================
// Ejecutar Crud acorde a parametro 
// ========================================== 
app.post('/', (req, res) => {

    //Recibo los datos en el body y con el body parser me lo transforma a JSON
    var body = req.body;
    consulta = `SELECT * FROM ${datos_tabla.sp_crud_tabla} ($1,$2)`;
    crud.crudBasico(datos_tabla.tabla_target, consulta, body, res);

});


module.exports = app;