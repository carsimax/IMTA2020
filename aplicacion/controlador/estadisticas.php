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
require_once (__DIR__ . "/../modelo/estadistica.php");
/**
 * La variable acción almacena la función que recibimos desde la vista.
 */
$accion = filter_input(INPUT_POST, "Accion");

//Si no se recibió nada por post, intentara recibirlo por get.
if (filter_input(INPUT_POST, "Accion") == NULL)
{
    $accion = filter_input(INPUT_GET, "Accion");
}

/**
 * Este switch es la controladora de las funciones que contiene el controlador,
 * Desde aquí se determina a que función del controlador llamar.
 */
switch ($accion)
{
    /**
     * Funcion Para obtener todas las estadisticas
     */
    case 'Toda':
        try {
            Toda();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    /**
     * Funcion para obtener la estadistica por sector y fecha
     */
    case 'TodaFecha':
        try {
            TodaFecha();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    /**
     * Funcion para la estadistica Educativo
     */
    case 'Educativo':
        try {
            Educativo();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    /**
     * Funcion para la estadistica publica
     */
    case 'Publico':
        try {
            Publico();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    /**
     * Funcion para la estadistica privada
     */
    case 'Privado':
        try {
            Privado();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    /**
     * Funcion de la estadistica sin especificar
     */
    case 'SE':
        try {
            SE();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    /**
     * Funcion de estadistica a nivel educativo
     */
    case 'NE':
        try {
            NE();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

/**
 * Funcion que saca los sectores
 */
function Toda()
{
    $Consuta = new Estadistica();
    echo json_encode($Consuta->Toda());
}

function TodaFecha()
{
    $FI = filter_input(INPUT_GET, "FI");
    $FF = filter_input(INPUT_GET, "FF");
    $Consuta = new Estadistica();
    echo json_encode($Consuta->TodaFecha($FI, $FF));
}

function Educativo()
{
    $FI = filter_input(INPUT_GET, "FI");
    $FF = filter_input(INPUT_GET, "FF");
    $Consuta = new Estadistica();
    echo json_encode($Consuta->Educativo($FI, $FF));
}

function Publico()
{
    $FI = filter_input(INPUT_GET, "FI");
    $FF = filter_input(INPUT_GET, "FF");
    $Consuta = new Estadistica();
    echo json_encode($Consuta->Publico($FI, $FF));
}

function Privado()
{
    $FI = filter_input(INPUT_GET, "FI");
    $FF = filter_input(INPUT_GET, "FF");
    $Consuta = new Estadistica();
    echo json_encode($Consuta->Privado($FI, $FF));
}

function SE()
{
    $FI = filter_input(INPUT_GET, "FI");
    $FF = filter_input(INPUT_GET, "FF");
    $Consuta = new Estadistica();
    echo json_encode($Consuta->SE($FI, $FF));
}

function NE()
{
    $FI = filter_input(INPUT_GET, "FI");
    $FF = filter_input(INPUT_GET, "FF");
    $Consuta = new Estadistica();
    echo json_encode($Consuta->NE($FI, $FF));
}
