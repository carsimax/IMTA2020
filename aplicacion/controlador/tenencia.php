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
require_once (__DIR__ . "/../modelo/tenencia.php");
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
     * Funcion para realizar el registro de una tenencia
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
 * Funcion para insertar un nueva tenencia a la base de datos
 */
function Nuevo()
{
    /**
     * Creamos una instancia a tenencia
     */
    $Tenencia = new Tenencia();
    $Tenencia->setNombre(filter_input(INPUT_GET, "nombre"));
    /**
     * Si se inserta correctamente
     */
    if ($Tenencia->insert() != null)
    {
        echo 'OK';
    }
    else
    {
        echo 'Ya se encuentra en la Base de Datos';
    }
}

/**
 * Funcion para actualizar una tenencia
 */
function Actualizar(){
    $Tenencia = new Tenencia();
     $Tenencia->setIdTenencia(filter_input(INPUT_GET, "id_tenencia"));
    $Tenencia->setNombre(filter_input(INPUT_GET, "nombre"));
    if ($Tenencia->update() != null)
    {
        echo 'OK';
    }
    else
    {
        echo 'No se pudo actualizar el registro.';
    }
}

/**
 * Funcion para Eliminar una tenencia
 */
function Eliminar()
{
    /**
     * Se crea una instanica a tenencia
     */
    $Tenencia = new Tenencia();
    /**
     * Se coloca el Id del tenencia a eliminar por medio del metodo SET
     */
    $Tenencia->setIdTenencia(filter_input(INPUT_GET, "ID"));
    //Se manda a llamar a la funcion de eliminar.
    echo $Tenencia->delete();
}

function getTodos()
{

    $Tenencia = new Tenencia();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Tenencia->getTenencias());
}
