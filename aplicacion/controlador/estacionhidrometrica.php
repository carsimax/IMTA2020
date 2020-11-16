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
require_once (__DIR__ . "/../modelo/estacionhidrometrica.php");
require_once (__DIR__ . "/../modelo/estado.php");
require_once (__DIR__ . "/../modelo/municipio.php");

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
    case 'getInfoMap':
        try {
            getInfoMap();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'getEstados':
        try {
            getEstados();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'getMunicipios':
        try {
            getMunicipios();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

/**
 * Funcion para insertar un nuevo cultivo a la base de datos
 */
function Nuevo() {
    /**
     * Crear instancia de EstacionHidrometrica
     */
    $EstacionHidrometrica = new EstacionHidrometrica();
    /**
     * Colocar los datos del POST por medio de los metodos SET
     */
    $EstacionHidrometrica->setIdEstacion(filter_input(INPUT_GET, 'clave'));
    $EstacionHidrometrica->setNombre(filter_input(INPUT_GET, 'nombre'));
    $EstacionHidrometrica->setCuenca_id(filter_input(INPUT_GET, 'cuenca_id'));
    $EstacionHidrometrica->setCorriente(filter_input(INPUT_GET, 'corriente'));
    $EstacionHidrometrica->setRegion_id(filter_input(INPUT_GET, 'id_reg_hidrologica'));
    $EstacionHidrometrica->setEstado_id(filter_input(INPUT_GET, 'estado_id'));
    $EstacionHidrometrica->setLatitud(filter_input(INPUT_GET, 'latitud'));
    $EstacionHidrometrica->setLongitud(filter_input(INPUT_GET, 'longitud'));
    if ($EstacionHidrometrica->Insert() != null) {
        echo 'OK';
    } else {
        echo 'Algo salío mal :(';
    }
}

/**
 * Funcion para insertar un nuevo cultivo a la base de datos
 */
function Actualizar() {
    /**
     * Crear instancia de EstacionHidrometrica
     */
    $EstacionHidrometrica = new EstacionHidrometrica();
    /**
     * Colocar los datos del POST por medio de los metodos SET
     */
    $EstacionHidrometrica->setIdEstacion(filter_input(INPUT_GET, 'clave'));
    $EstacionHidrometrica->setNombre(filter_input(INPUT_GET, 'nombre'));
    $EstacionHidrometrica->setCuenca_id(filter_input(INPUT_GET, 'cuenca_id'));
    $EstacionHidrometrica->setCorriente(filter_input(INPUT_GET, 'corriente'));
    $EstacionHidrometrica->setRegion_id(filter_input(INPUT_GET, 'region_id'));
    $EstacionHidrometrica->setEstado_id(filter_input(INPUT_GET, 'estado_id'));
    $EstacionHidrometrica->setLatitud(filter_input(INPUT_GET, 'latitud'));
    $EstacionHidrometrica->setLongitud(filter_input(INPUT_GET, 'longitud'));
    if ($EstacionHidrometrica->Update() != null) {
        echo 'OK';
    } else {
        echo 'Algo salío mal :(';
    }
}

function Eliminar() {
    $EstacionHidrometrica = new EstacionHidrometrica();
    $EstacionHidrometrica->setIdEstacion(filter_input(INPUT_GET, "ID"));
    echo $EstacionHidrometrica->delete();
}

//Obtiene todas las estaciones hidrometricas
function getTodos() {
    $Estaciones = new EstacionHidrometrica();
    echo json_encode($Estaciones->getEstaciones());
}

//Obtiene los estados pertenecientes a las regiones hidrológicas seleccionadas
function getEstados() {
    $Estaciones = new EstacionHidrometrica();
    echo json_encode($Estaciones->getEstados(filter_input(INPUT_POST, "query")));
}

//Obtiene los municipios pertenecientes a los estados seleccionadas
function getMunicipios() {
    $Estaciones = new EstacionHidrometrica();
    echo json_encode($Estaciones->getMunicipios(filter_input(INPUT_POST, "query")));
}


//Obtiene la información que se colocará en el mapa
function getInfoMap() {
    $Estaciones = new EstacionHidrometrica();
    echo json_encode($Estaciones->getEstacionesMap(filter_input(INPUT_POST, "query")));
}
