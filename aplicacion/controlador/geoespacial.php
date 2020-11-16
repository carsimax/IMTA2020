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

require_once(__DIR__ . "/../modelo/organismo.php");
require_once(__DIR__ . "/../modelo/estado.php");
require_once(__DIR__ . "/../modelo/acuifero.php");
require_once(__DIR__ . "/../modelo/municipio.php");
require_once(__DIR__ . "/../modelo/presa.php");
require_once(__DIR__ . "/../modelo/distritoriego.php");
require_once(__DIR__ . "/../modelo/dtt.php");
require_once(__DIR__ . "/../modelo/region.php");
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
    case 'jsonOC':
        try {
            jsonOC(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'jsonEST':
        try {
            jsonEST(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'jsonACU':
        try {
            jsonACU(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'jsonMun':
        try {
            jsonMun(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'jsonPresa':
        try {
            jsonPresa(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'jsonDR':
        try {
            jsonDR(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'jsonDTT':
        try {
            jsonDTT(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'jsonRH':
        try {
            jsonRH(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

function jsonOC($query)
{
    $Organismo = new Organismo();
    /**
     * Regresa los acuiferos de un municipio
     */
    echo json_encode($Organismo->getJson($query));
}
function jsonEST($query)
{
    $Estado = new Estado();
    /**
     * Regresa los acuiferos de un municipio
     */
    echo json_encode($Estado->getJson($query));
}
function jsonACU($query)
{
    $Acuifero = new Acuifero();
    /**
     * Regresa los acuiferos de un municipio
     */
    echo json_encode($Acuifero->getJson($query));
}
function jsonMun($query)
{
    $Municipio = new Municipio();
    /**
     * Regresa los acuiferos de un municipio
     */
    echo json_encode($Municipio->getJson($query));
}
function jsonPresa($query)
{
    $Presa = new Presa();
    /**
     * Regresa los acuiferos de un municipio
     */
    echo json_encode($Presa->getJson($query));
}
function jsonDR($query)
{
    $DistritoRiego = new DistritoRiego();
    /**
     * Regresa los acuiferos de un municipio
     */
    echo json_encode($DistritoRiego->getJson($query));
}
function jsonDTT($query)
{
    $DTT = new DTT();
    /**
     * Regresa los acuiferos de un municipio
     */
    echo json_encode($DTT->getJson($query));
}

function jsonRH($query)
{
    $DTT = new RegionHidrologica();
    echo json_encode($DTT->getJson($query));
}
