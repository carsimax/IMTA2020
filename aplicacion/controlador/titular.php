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
ini_set('memory_limit', '512M');

/**
 * Para que el controlador funcione de forma correcta, es necesario la llamada a los modelos necesarios en el mismo.
 */
require_once(__DIR__ . "/../modelo/titular.php");
require_once(__DIR__ . "/../modelo/estado.php");
require_once(__DIR__ . "/../modelo/municipio.php");
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
     * Funcion para realizar el registro del propietario
     */
    case 'Nuevo':
        try {
            Nuevo();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    /**
     * Si es el caso de actualizar
     */
    case 'Actualizar':
        try {
            Actualizar();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    /**
     * Funcion para Borrar
     */
    case 'Delete':
        try {
            Delete();
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
}

/**
 * Funcion para registrar un nuevo propietario
 */
function Nuevo()
{
    /**
     * Crear instancia de Propietatio
     */
    $Titular = new Titular();
    /**
     * Colocar los datos del POST por medio de los metodos SET
     */
    $Titular->setTitular(filter_input(INPUT_GET, "titular"));
    if ($Titular->Insert() != null)
    {
        echo 'OK';
    }
    else
    {
        echo 'Ya se encuentra en la Base de Datos';
    }
}

/**
 * Funcion para actualizar a un propietario
 */
function Actualizar()
{
    /**
     * Crear instancia de Propietatio
     */
    $Titular = new Titular();
    /**
     * Colocar los datos del POST por medio de los metodos SET
     */
    $Titular->setIdTitular(filter_input(INPUT_GET, "id_titular"));
    $Titular->setTitular(filter_input(INPUT_GET, "titular"));
    if ($Titular->Update())
    {
        echo 'OK';
    }
    else
    {
        echo 'Algo Salío Mal :(';
    }
}

/**
 * Funcion para Eliminar un propietario
 */
function Delete()
{
    /**
     * Se crea una instanica a acuifero
     */
    $Titular = new Titular();
    /*
     * Se coloca el Id del acuifero a eliminar por medio del metodo SET
     */
    $Titular->setIdTitular(filter_input(INPUT_GET, "ID"));
    /**
     * Se manda a llamar a la funcion de eliminar.
     */
    echo $Titular->delete();
}

function getTodos()
{

    $Titular = new Titular();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Titular->getTodos());
}
