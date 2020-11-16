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
require_once(__DIR__ . "/../modelo/sitiomonitoreosuperficial.php");
require_once(__DIR__ . "/../modelo/estado.php");

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
    case 'getSitiosConsulta':
        try {
            getSitiosConsulta();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'distribucionDBO5':
        try {
            distribucionDBO5();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'distribucionDBO5Estaciones':
        try {
            distribucionDBO5Estaciones();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'puntoSitio':
        try {
            puntoSitio();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /*********************/
    case 'distribucionDQO':
        try {
            distribucionDQO();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'distribucionDQOEstaciones':
        try {
            distribucionDQOEstaciones();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'puntoSitioDQO':
        try {
            puntoSitioDQO();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /*********************/
    case 'distribucionSST':
        try {
            distribucionSST();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'distribucionSSTEstaciones':
        try {
            distribucionSSTEstaciones();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'puntoSitioSST':
        try {
            puntoSitioSST();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /*********************/
    case 'distribucionCF':
        try {
            distribucionCF();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'distribucionCFEstaciones':
        try {
            distribucionCFEstaciones();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'puntoSitioCF':
        try {
            puntoSitioCF();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /**
     * Funcion para obtener los estados
     */
    case 'Estados':
        try {
            getEstados(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /**
     * Funcion para obtener los municipios
     */
    case 'Municipios':
        try {
            getMuni(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}


function getSitiosConsulta()
{
    $SitioMonitoreoSuperficial = new SitioMonitoreoSuperficial();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($SitioMonitoreoSuperficial->getSitiosConsulta(filter_input(INPUT_POST, "query")));
}
function distribucionDBO5()
{
    $SitioMonitoreoSuperficial = new SitioMonitoreoSuperficial();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($SitioMonitoreoSuperficial->distribucionDBO5(filter_input(INPUT_POST, "query")));
}
function distribucionDBO5Estaciones()
{
    $SitioMonitoreoSuperficial = new SitioMonitoreoSuperficial();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($SitioMonitoreoSuperficial->distribucionDBO5Estaciones(filter_input(INPUT_POST, "query")));
}
function puntoSitio()
{
    $SitioMonitoreoSuperficial = new SitioMonitoreoSuperficial();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($SitioMonitoreoSuperficial->puntoSitio(filter_input(INPUT_POST, "query")));
}

/****************************************************** */
function distribucionDQO()
{
    $SitioMonitoreoSuperficial = new SitioMonitoreoSuperficial();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($SitioMonitoreoSuperficial->distribucionDQO(filter_input(INPUT_POST, "query")));
}
function distribucionDQOEstaciones()
{
    $SitioMonitoreoSuperficial = new SitioMonitoreoSuperficial();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($SitioMonitoreoSuperficial->distribucionDQOEstaciones(filter_input(INPUT_POST, "query")));
}
function puntoSitioDQO()
{
    $SitioMonitoreoSuperficial = new SitioMonitoreoSuperficial();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($SitioMonitoreoSuperficial->puntoSitioDQO(filter_input(INPUT_POST, "query")));
}

/****************************************************** */
function distribucionSST()
{
    $SitioMonitoreoSuperficial = new SitioMonitoreoSuperficial();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($SitioMonitoreoSuperficial->distribucionSST(filter_input(INPUT_POST, "query")));
}
function distribucionSSTEstaciones()
{
    $SitioMonitoreoSuperficial = new SitioMonitoreoSuperficial();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($SitioMonitoreoSuperficial->distribucionSSTEstaciones(filter_input(INPUT_POST, "query")));
}
function puntoSitioSST()
{
    $SitioMonitoreoSuperficial = new SitioMonitoreoSuperficial();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($SitioMonitoreoSuperficial->puntoSitioSST(filter_input(INPUT_POST, "query")));
}

/****************************************************** */
function distribucionCF()
{
    $SitioMonitoreoSuperficial = new SitioMonitoreoSuperficial();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($SitioMonitoreoSuperficial->distribucionCF(filter_input(INPUT_POST, "query")));
}
function distribucionCFEstaciones()
{
    $SitioMonitoreoSuperficial = new SitioMonitoreoSuperficial();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($SitioMonitoreoSuperficial->distribucionCFEstaciones(filter_input(INPUT_POST, "query")));
}
function puntoSitioCF()
{
    $SitioMonitoreoSuperficial = new SitioMonitoreoSuperficial();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($SitioMonitoreoSuperficial->puntoSitioCF(filter_input(INPUT_POST, "query")));
}

/**
 * @param $query
 * Funcion para obtener los estados pertenecientes a un organimos
 */
function getEstados($query) {

    $SitioMonitoreoSuperficial = new SitioMonitoreoSuperficial();
    /**
     * Regresa los registros de los estados
     */
    echo json_encode($SitioMonitoreoSuperficial->getEstadoOrganismo($query));
}
/**
 * @param $query
 * Funcion para obtener los estados pertenecientes a un organimos
 */
function getMuni($query) {

    $SitioMonitoreoSuperficial = new SitioMonitoreoSuperficial();
    /**
     * Regresa los registros de los estados
     */
    echo json_encode($SitioMonitoreoSuperficial->getMuni($query));
}
