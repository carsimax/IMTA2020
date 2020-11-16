<?php

//Variables para depurar y ver los errores de ejecución dentro del servidor apache.
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/**
 * Para que el controlador funcione de forma correcta, es necesario la llamada a los modelos necesarios en el mismo.
 */
require_once (__DIR__ . "/../modelo/estado.php");

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
switch ($accion){
    
    case 'getMunicipios':
        try {
            getMunicipios();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'getEstadoid':
        try {
            getEstadoid(filter_input(INPUT_POST, "id"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

//Obtiene los municipios de un estado y retorna un json
function getMunicipios(){
    $estado = new Estado();
    $estado->setIdEstado(filter_input(INPUT_GET, "estado"));
    echo json_encode($estado->getMunicipios());
}

function getEstadoid($id){
    $estado = new Estado();
    echo json_encode($estado->getEstadoid($id));
}