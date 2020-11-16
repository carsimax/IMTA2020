<?php

/**
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */
//Variables para depurar y ver los errores de ejecución dentro del servidor apache.
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/**
 * Para que el controlador funcione de forma correcta, es necesario la llamada a los modelos necesarios en el mismo.
 */
require_once(__DIR__ . "/../modelo/municipiomarginacion.php");
require_once(__DIR__ . "/../modelo/estado.php");
require_once(__DIR__ . "/../modelo/municipio.php");

/**
 * La variable acción almacena la función que recibimos desde la vista.
 */
$accion = filter_input(INPUT_POST, "Accion");

//Si no se recibió nada por post, intentara recibirlo por get.
if (filter_input(INPUT_POST, "Accion") == NULL) {
    $accion = filter_input(INPUT_GET, "Accion");
}

/**
 * Este switch es la controladora de las funciones que contiene el controlador,
 * Desde aquí se determina a que función del controlador llamar.
 */
switch ($accion) {
        /*
     * Funcion para realizar el registro del propietario
     */
    case 'Nuevo':
        try {
            Nuevo();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /*
     * Si es el caso de actualizar
     */
    case 'Actualizar':
        try {
            Actualizar();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /*
     * Funcion para Borrar
     */
    case 'Delete':
        try {
            Eliminar();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Todos':
        try {
            getTodos();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Municipios':
        try {
            getMunicipios();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'consultaMunicipio':
        try {
            consultaMunicipio();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'getInfoMunicipioMapa':
        try {
            getInfoMunicipioMapa();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

/**
 * Funcion para insertar un registro de indice de marginacion a la base de datos
 */
function Nuevo()
{
    /**
     * Crear instancia de municipiomarginacion
     */
    $registro = new MunicipioMarginacion();
    /**
     * Colocar los datos del GET por medio de los metodos SET
     */
    $registro->setPob_tot(filter_input(INPUT_GET, "pob_tot"));
    $registro->setAnalf(filter_input(INPUT_GET, "analf"));
    $registro->setSprim(filter_input(INPUT_GET, "sprim"));
    $registro->setOvsde(filter_input(INPUT_GET, "ovsde"));
    $registro->setOvsee(filter_input(INPUT_GET, "ovsee"));
    $registro->setOvsae(filter_input(INPUT_GET, "ovsae"));
    $registro->setVhac(filter_input(INPUT_GET, "vhac"));
    $registro->setOvpt(filter_input(INPUT_GET, "ovpt"));
    $registro->setPl_5000(filter_input(INPUT_GET, "pl_5000"));
    $registro->setPo2sm(filter_input(INPUT_GET, "po2sm"));
    $registro->setIm(filter_input(INPUT_GET, "im"));
    $registro->setGm(filter_input(INPUT_GET, "gm"));
    $registro->setAnio_id(filter_input(INPUT_GET, "anio_id"));
    $Estado = new Estado();
    //Instancia de Municipio
    $Municipio = new Municipio();
    //Extraer el Id del estado
    $id_Estado = $Estado->getEstado(filter_input(INPUT_GET, "estado"));
    //Obtener el Municipio
    $id_municipio = $Municipio->getMunicipio($id_Estado['id_estado'], filter_input(INPUT_GET, "municipio"));
    $registro->setMunicipio_id($id_municipio['id_municipio']);
    if ($registro->Insert() != null) {
        echo 'OK';
    } else {
        echo 'Ya se encuentra en la Base de Datos';
    }
}

/**
 * Funcion para insertar un nuevo cultivo a la base de datos
 */
function Actualizar()
{
    /**
     * Crear instancia de MunicipioMarginacion
     */
    $registro = new MunicipioMarginacion();
    /**
     * Colocar los datos del GET por medio de los metodos SET
     */
    $registro->setId_registro(filter_input(INPUT_GET, "id_registro"));
    $registro->setPob_tot(filter_input(INPUT_GET, "pob_tot"));
    $registro->setAnalf(filter_input(INPUT_GET, "analf"));
    $registro->setSprim(filter_input(INPUT_GET, "sprim"));
    $registro->setOvsde(filter_input(INPUT_GET, "ovsde"));
    $registro->setOvsee(filter_input(INPUT_GET, "ovsee"));
    $registro->setOvsae(filter_input(INPUT_GET, "ovsae"));
    $registro->setVhac(filter_input(INPUT_GET, "vhac"));
    $registro->setOvpt(filter_input(INPUT_GET, "ovpt"));
    $registro->setPl_5000(filter_input(INPUT_GET, "pl_5000"));
    $registro->setPo2sm(filter_input(INPUT_GET, "po2sm"));
    $registro->setIm(filter_input(INPUT_GET, "im"));
    $registro->setGm(filter_input(INPUT_GET, "gm"));
    $registro->setAnio_id(filter_input(INPUT_GET, "anio_id"));
    $Estado = new Estado();
    //Instancia de Municipio
    $Municipio = new Municipio();
    //Extraer el Id del estado
    $id_Estado = $Estado->getEstado(filter_input(INPUT_GET, "estado"));
    //Obtener el Municipio
    $id_municipio = $Municipio->getMunicipio($id_Estado['id_estado'], filter_input(INPUT_GET, "municipio"));
    $registro->setMunicipio_id($id_municipio['id_municipio']);
    if ($registro->Update() != null) {
        echo 'OK';
    } else {
        echo 'Algo salío mal :(';
    }
}

/**
 * Funcion para Eliminar un cultivo
 */
function Eliminar()
{
    $registro = new MunicipioMarginacion();
    $registro->setId_registro(filter_input(INPUT_GET, "ID"));
    echo $registro->delete();
}

function getTodos()
{

    $registros = new MunicipioMarginacion();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($registros->getRegistros());
}

function getMunicipios()
{
    $registros = new MunicipioMarginacion();
    echo json_encode($registros->getMunicipios(filter_input(INPUT_POST, "query")));
}


function consultaMunicipio()
{
    $QUERY = filter_input(INPUT_POST, "query");
    $registros = new MunicipioMarginacion();
    echo json_encode($registros->getConsulta($QUERY));
}

function getInfoMunicipioMapa(){
    $id=filter_input(INPUT_POST, "id");
    $info = new MunicipioMarginacion();
    echo json_encode($info->getInfoMunicipioMapa($id));
}
