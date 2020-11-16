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
require_once (__DIR__ . "/../modelo/log.php");
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
     * Funcion para realizar el registro de una presa
     */
    case 'Todo':
        try {
            Todo();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Fecha':
        try {
            Fecha();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

/**
 * Funcion para insertar una nueva presa a la base de datos
 */
function Todo()
{
    $Log = new Log();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Log->getTodos());
}

function Fecha()
{
    $Log = new Log();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Log->getLogFecha(filter_input(INPUT_POST, "Inicio"), filter_input(INPUT_POST, "Fin")));
}
