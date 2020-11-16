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
require_once (__DIR__ . "/../modelo/cultivo.php");

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
    case 'CultivosConsulta':
        try {
            getCultivoConsulta();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'CultivosDTT':
        try {
            getCultivoDTT();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

/**
 * Funcion para insertar un nuevo cultivo a la base de datos
 */
function Nuevo()
{
    /**
     * Crear instancia de Cultivo
     */
    $Cultivo = new Cultivo();
    /**
     * Colocar los datos del POST por medio de los metodos SET
     */
    $Cultivo->setNombre(filter_input(INPUT_GET, "nombre"));
    $Cultivo->setNombreCientifico(filter_input(INPUT_GET, "nombre_cientifico"));
    $Cultivo->setGrupoCultivoId(filter_input(INPUT_GET, "grupo_cultivo_id"));
    if ($Cultivo->Insert() != null)
    {
        echo 'OK';
    }
    else
    {
        echo 'Ya se encuentra en la Base de Datos';
    }
}

/**
 * Funcion para insertar un nuevo cultivo a la base de datos
 */
function Actualizar(){
    /**
     * Crear instancia de Cultivo
     */
    $Cultivo = new Cultivo();
    /**
     * Colocar los datos del POST por medio de los metodos SET
     */
    $Cultivo->setIdCultivo(filter_input(INPUT_GET, "id_cultivo"));
    $Cultivo->setNombre(filter_input(INPUT_GET, "nombre"));
    $Cultivo->setNombreCientifico(filter_input(INPUT_GET, "nombre_cientifico"));
    $Cultivo->setGrupoCultivoId(filter_input(INPUT_GET, "grupo_cultivo_id"));
    if ($Cultivo->Update() != null)
    {
        echo 'OK';
    }
    else
    {
        echo 'Algo salío mal :(';
    }
}

/**
 * Funcion para Eliminar un cultivo
 */
function Eliminar()
{
    /**
     * Se crea una instanica a un grupo de cultivo
     */
    $Cultivo = new Cultivo();
    /**
     * Se coloca el Id del acuifero a eliminar por medio del metodo SET
     */
    $Cultivo->setIdCultivo(filter_input(INPUT_GET, "ID"));
    /**
     * Se manda a llamar a la funcion de eliminar.
     */
    echo $Cultivo->delete();
}

function getTodos(){
    $Cultivos = new Cultivo();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Cultivos->getCultivos());
}

function getCultivoConsulta()
{
    $Cultivos = new Cultivo();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Cultivos->getCultivosConsulta(filter_input(INPUT_POST, "query")));
}
function getCultivoDTT()
{
    $Cultivos = new Cultivo();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Cultivos->getCultivoDTT(filter_input(INPUT_POST, "query")));
}
