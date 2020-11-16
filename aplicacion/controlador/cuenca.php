
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
require_once (__DIR__ . "/../modelo/cuenca.php");
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
 * Funcion para insertar una nueva cuneca a la base de datos
 */
function Nuevo(){
   
    $Cuenca = new Cuenca();
    /**
     * Colocar los datos del POST por medio de los metodos SET
     */
    $Cuenca->setIdCuenca(filter_input(INPUT_GET, "id_cuenca"));
    $Cuenca->setNombre(filter_input(INPUT_GET, "nombre"));
    $Cuenca->setRegHidrologicaId(filter_input(INPUT_GET, "reg_hidrologica_id"));
    
    
    if ($Cuenca->Insert() != null)
    {
        echo 1;
    }
    else
    {
        echo 'Ya se encuentra en la Base de Datos';
    }
}

/**
 * Funcion para actualizar una nueva cuneca a la base de datos
 */
function Actualizar()
{
    $Cuenca = new Cuenca();
    /**
     * Colocar los datos del GET por medio de los metodos SET
     */
    $Cuenca->setIdCuenca(filter_input(INPUT_GET, "id_cuenca"));
    $Cuenca->setNombre(filter_input(INPUT_GET, "nombre"));
    $Cuenca->setRegHidrologicaId(filter_input(INPUT_GET, "reg_hidrologica_id"));
    if ($Cuenca->Update() != null)
    {
        echo 1;
    }
    else
    {
        echo 'No se pudo actualizar la información';
    }
}

/**
 * Funcion para Eliminar un Cuenca
 */
function Eliminar()
{
    /**
     * Se crea una instanica a acuifero
     */
    $Cuenca = new Cuenca();
    /**
     * Se coloca el Id del acuifero a eliminar por medio del metodo SET
     */
    $Cuenca->setIdCuenca(filter_input(INPUT_GET, "ID"));
    /**
     * Se manda a llamar a la funcion de eliminar.
     */
    echo $Cuenca->delete();
}

function getTodos()
{

    $Cuenca = new Cuenca();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Cuenca->getCuencas());
}
