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
require_once (__DIR__ . "/../modelo/fuente.php");
/**
 * La variable acción almacena la función que recibimos desde la vista.
 */
$accion = filter_input(INPUT_POST, "Accion");
/*
 * Si no se recibió nada por post, intentara recibirlo por get.
 */
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
     * Funcion para realizar el registro del ciclo
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
}

/**
 * Funcion para insertar un nuevo ciclo a la base de datos
 */
function Nuevo()
{
    /**
     * Creamos una instancia a fuente
     */
    $Fuente = new Fuente();
    $Fuente->setNombre(filter_input(INPUT_GET, "nombre"));
    /**
     * Si se inserta correctamente
     */
    if ($Fuente->insert() != null)
    {
        echo 'OK';
    }
    else
    {
        echo 'Ya se encuentra en la Base de Datos';
    }
}

/**
 * Funcion para actualizar un ciclo a la base de datos
 */
function Actualizar(){
    $Fuente = new Fuente();
    $Fuente->setIdFuente(filter_input(INPUT_GET, "id_fuente"));
    $Fuente->setNombre(filter_input(INPUT_GET, "nombre"));
    if ($Fuente->update() != null)
    {
        echo 'OK';
    }
    else
    {
        echo 'Algo salío mal :(';
    }
}

/**
 * Funcion para Eliminar una fuente
 */
function Eliminar(){
    
    $Fuente = new Fuente();
    $Fuente->setIdFuente(filter_input(INPUT_GET, "ID"));
    //Se manda a llamar a la funcion de eliminar.
    echo $Fuente->delete();
}

function getTodos(){

    $Fuente = new Fuente();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Fuente->getFuentes());
}

