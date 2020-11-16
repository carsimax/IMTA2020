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
set_time_limit(300);

/**
 * Para que el controlador funcione de forma correcta, es necesario la llamada a los modelos necesarios en el mismo.
 */
require_once(__DIR__ . "/../modelo/organismoestado.php");
require_once(__DIR__ . "/../modelo/dtt.php");
require_once(__DIR__ . "/../modelo/siembradtt.php");
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
    /**
     * Funcion para obtener los estados
     */
    case 'EstadosDTT':
        try {
            getEstadosDTT(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
         /**
     * Funcion para obtener los estados
     */
    case 'DTT':
        try {
            getDTT(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'DTTTabla':
        try {
            DTTTabla(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'DTTs':
        try {
            getDTTs(filter_input(INPUT_POST, "id"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

/**
 * @param $query
 * Funcion para obtener los estados pertenecientes a un organimos
 */
function getEstadosDTT($query) {
    $OrganismoEstado = new OrganismoEstado();
    /**
     * Regresa los registros de los estados
     */
    echo json_encode($OrganismoEstado->getEstadoOrganismoDTT($query));
}
/**
 * @param $query
 * Funcion para obtener los estados pertenecientes a un organimos
 */
function getDTT($query) {
    $DTT = new DTT();
    /**
     * Regresa los registros de los estados
     */
    echo json_encode($DTT->getDTTEstado($query));
}
/**
 * @param $query
 * Funcion para obtener los estados pertenecientes a un organimos
 */
function DTTTabla($query) {
    $DTT = new SiembraDTT();
    /**
     * Regresa los registros de los estados
     */
    echo json_encode($DTT->DTTTabla($query));
}
function getDTTs($query) {
    $DTT = new DTT();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($DTT->getDTTI($query));
}

