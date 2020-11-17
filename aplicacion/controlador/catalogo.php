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
require_once(__DIR__ . "/../modelo/catalogo.php");
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
    case 'Editar':
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
    case 'ConsultaAcuifero':
        try {
            getCitaConsultaAcuifero();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'ConsultaAgricola':
        try {
            getCitaConsultaAgricola();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'getCitaConsultaAnio':
        //Se extrae la cita de un modulo y un año nada más.
        try {
            getCitaConsultaAnio();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'ConsultaAgricolaHistorica':
        try {
            getCitaConsultaAgricolaHistorica();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'ConsultaPozo':
        try {
            getCitaConsultaPozo();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'getCitaConsulta':
        try {
            getCitaConsulta();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'ConsultaEstacionClimatologica':
        try {
            getCitaEstClimatologica();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'ConsultaEstacionHidrometrica':
        try {
            getCitaEstClimatologica();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'ConsultaIndiceMarginacion':
        try {
            getCitaConsultaIndice();
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
     * Creamos la instancia a ciclo
     */
    $Catalogo = new Catalogo();

    /**
     * Colocamos los datos obtenidos desde el GET
     */
    $Catalogo->setUrl(filter_input(INPUT_GET, "url"));
    $Catalogo->setFuente(filter_input(INPUT_GET, "fuente"));
    $Catalogo->setDescripcion(filter_input(INPUT_GET, "descripcion"));
    $Catalogo->setFecha(filter_input(INPUT_GET, "fecha"));
    $Catalogo->setCita(filter_input(INPUT_GET, "cita"));
    $Catalogo->setModulo_id(filter_input(INPUT_GET, "modulo_id"));
    $Catalogo->setAnio_id(filter_input(INPUT_GET, "anio_id"));

    /*
     * Si se inserto de forma correcta
     */
    if ($Catalogo->Insert() != null) {
        echo 'OK';
    } else {
        /**
         * Si no Se retorna el error.
         */
        echo 'Ya se encuentra en la Base de Datos';
    }
}

/**
 * Funcion para actualizar un ciclo a la base de datos
 */
function Actualizar()
{
    /**
     * Crear instancia de Cuenca
     */
    $Catalogo = new Catalogo();
    /**
     * Colocar los datos del GET por medio de los metodos SET
     */
    $Catalogo->setIdRegistro(filter_input(INPUT_GET, "idRegistro"));
    $Catalogo->setUrl(filter_input(INPUT_GET, "url"));
    $Catalogo->setFuente(filter_input(INPUT_GET, "fuente"));
    $Catalogo->setDescripcion(filter_input(INPUT_GET, "descripcion"));
    $Catalogo->setFecha(filter_input(INPUT_GET, "fecha"));
    $Catalogo->setCita(filter_input(INPUT_GET, "cita"));
    $Catalogo->setModulo_id(filter_input(INPUT_GET, "modulo_id"));
    $Catalogo->setAnio_id(filter_input(INPUT_GET, "anio_id"));
    /**
     * Si se actualizó correctamente
     */
    if ($Catalogo->Update() != null) {
        echo 'OK';
    } else {
        echo 'Algo salío mal :(';
    }
}

function Eliminar()
{
    /**
     * Se crea una instanica a un grupo de cultivo
     */
    $Catalogo = new Catalogo();
    /**
     * Se coloca el Id del acuifero a eliminar por medio del metodo SET
     */
    $Catalogo->setIdRegistro(filter_input(INPUT_GET, "ID"));
    /**
     * Se manda a llamar a la funcion de eliminar.
     */
    echo $Catalogo->delete();
}

function getTodos()
{
    $Catalogo = new Catalogo();
    echo json_encode($Catalogo->getCatalogo());
}

function getCitaConsultaAcuifero()
{
    $Catalogo = new Catalogo();
    $Catalogo->setModulo_id(filter_input(INPUT_GET, "modulo_id"));
    echo json_encode($Catalogo->getCitaConsultaMasReciente());
}

function getCitaConsultaAgricolaHistorica()
{
    $Catalogo = new Catalogo();
    $Catalogo->setModulo_id(filter_input(INPUT_GET, "modulo_id"));
    echo json_encode($Catalogo->getConsultaVariosAnios(filter_input(INPUT_GET, "anios")));
}

function getCitaConsultaAgricola()
{
    $Catalogo = new Catalogo();
    $Catalogo->setModulo_id(filter_input(INPUT_GET, "modulo_id"));
    echo json_encode($Catalogo->getCitaConsultaAgricola(filter_input(INPUT_GET, "anios")));
}
function getCitaConsultaAnio()
{
    $Catalogo = new Catalogo();
    $Catalogo->setModulo_id(filter_input(INPUT_GET, "modulo_id"));
    echo json_encode($Catalogo->getCitaConsultaAnio(filter_input(INPUT_GET, "anios")));
}


function getCitaConsultaPozo()
{
    $Catalogo = new Catalogo();
    $Catalogo->setModulo_id(filter_input(INPUT_GET, "modulo_id"));
    echo json_encode($Catalogo->getCitaConsultaMasReciente());
}



function getCitaConsulta()
{
    $Catalogo = new Catalogo();
    $Catalogo->setModulo_id(filter_input(INPUT_GET, "modulo_id"));
    echo json_encode($Catalogo->getCitaConsulta());
}


function getCitaEstClimatologica()
{
    $Catalogo = new Catalogo();
    $Catalogo->setModulo_id(filter_input(INPUT_GET, "modulo_id"));

    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Catalogo->getCitaConsulta());
}

function getCitaConsultaIndice()
{
    $Catalogo = new Catalogo();
    $Catalogo->setModulo_id(filter_input(INPUT_GET, "modulo_id"));
    echo json_encode($Catalogo->getCitaConsultaIndice(filter_input(INPUT_GET, "Filtro"), filter_input(INPUT_GET, "Anio")));
}
