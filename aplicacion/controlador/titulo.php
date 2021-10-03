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
require_once(__DIR__ . "/../modelo/titulo.php");
require_once(__DIR__ . "/../modelo/estado.php");
require_once(__DIR__ . "/../modelo/municipio.php");

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
    case 'TituloAcu':
        try {
            TituloAcu();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'TituloAcu2':
        try {
            TituloAcu2();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'TituloAcu3':
        try {
            TituloAcu3();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'TituloAcu4':
        try {
            TituloAcu2();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

/**
 * Funcion para insertar una nueva concesion
 */
function Nuevo()
{
    /**
     * Crear instancia de concesion
     */
    $Titlulo = new Titulo();
    /**
     * Colocar los datos del GET por medio de los metodos SET
     */
    $Titlulo->setId_titulo(filter_input(INPUT_GET, "id_titulo"));
    $Titlulo->setUso_id(filter_input(INPUT_GET, "uso_id"));
    $Titlulo->setTitular(filter_input(INPUT_GET, "titular"));
    $Titlulo->setVol_amparado_total(filter_input(INPUT_GET, "vol_amparado_total"));
    $Titlulo->setNum_aprov_superf(filter_input(INPUT_GET, "num_aprov_superf"));
    $Titlulo->setVol_aprov_superf(filter_input(INPUT_GET, "vol_aprov_superf"));
    $Titlulo->setNum_aprov_subt(filter_input(INPUT_GET, "num_aprov_subt"));
    $Titlulo->setVol_aprov_subt(filter_input(INPUT_GET, "vol_aprov_subt"));
    $Titlulo->setPuntos_desc(filter_input(INPUT_GET, "puntos_desc"));
    $Titlulo->setVol_desc_diario(filter_input(INPUT_GET, "vol_desc_diario"));
    $Titlulo->setZonas_fed_amp_titulo(filter_input(INPUT_GET, "zonas_fed_amp_titulo"));
    $Titlulo->setSupeficie(filter_input(INPUT_GET, "supeficie"));
    $Titlulo->setFecha_reg(filter_input(INPUT_GET, "fecha_reg"));
    if ($Titlulo->Insert() != null) {
        echo 'OK';
    } else {
        echo 'Ya se encuentra en la Base de Datos';
    }
}

/**
 * Funcion para actualizar a un propietario
 */
function Actualizar()
{
    /**
     * Crear instancia de concesion
     */
    $Titlulo = new Titulo();
    /**
     * Colocar los datos del GET por medio de los metodos SET
     */
    $Titlulo->setId_titulo(filter_input(INPUT_GET, "id_titulo"));
    $Titlulo->setUso_id(filter_input(INPUT_GET, "uso_id"));
    $Titlulo->setTitular(filter_input(INPUT_GET, "titular"));
    $Titlulo->setVol_amparado_total(filter_input(INPUT_GET, "vol_amparado_total"));
    $Titlulo->setNum_aprov_superf(filter_input(INPUT_GET, "num_aprov_superf"));
    $Titlulo->setVol_aprov_superf(filter_input(INPUT_GET, "vol_aprov_superf"));
    $Titlulo->setNum_aprov_subt(filter_input(INPUT_GET, "num_aprov_subt"));
    $Titlulo->setVol_aprov_subt(filter_input(INPUT_GET, "vol_aprov_subt"));
    $Titlulo->setPuntos_desc(filter_input(INPUT_GET, "puntos_desc"));
    $Titlulo->setVol_desc_diario(filter_input(INPUT_GET, "vol_desc_diario"));
    $Titlulo->setZonas_fed_amp_titulo(filter_input(INPUT_GET, "zonas_fed_amp_titulo"));
    $Titlulo->setSupeficie(filter_input(INPUT_GET, "supeficie"));
    $Titlulo->setFecha_reg(filter_input(INPUT_GET, "fecha_reg"));
    if ($Titlulo->Update()) {
        echo 'OK';
    } else {
        echo 'No se ha podido actualizar el registro en la base de datos';
    }
}

/**
 * Funcion para Eliminar un concesion
 */
function Eliminar()
{
    /**
     * Se crea una instanica a Concesion
     */
    $Concesion = new Titulo();
    /**
     * Se coloca el Id del acuifero a eliminar por medio del metodo SET
     */
    $Concesion->setId_titulo(filter_input(INPUT_GET, "ID"));
    /**
     * Se manda a llamar a la funcion de eliminar.
     */
    echo $Concesion->delete();
}

function getTodos()
{
    $Concesion = new Titulo();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Concesion->getTodos(filter_input(INPUT_POST, "query")));
}

function TituloAcu()
{
    $Concesion = new Titulo();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Concesion->getQuery(filter_input(INPUT_POST, "query")));
}

function TituloAcu2()
{
    $Concesion = new Titulo();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Concesion->getQuery2(filter_input(INPUT_POST, "query")));
}

function TituloAcu3()
{
    $Concesion = new Titulo();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Concesion->getQuery3(filter_input(INPUT_POST, "query")));
}
