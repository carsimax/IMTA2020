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
require_once (__DIR__ . "/../modelo/pozo.php");
require_once (__DIR__ . "/../modelo/estado.php");
require_once (__DIR__ . "/../modelo/municipio.php");
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
    case 'Titulo':
        try {
            Titulo();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Pozo':
        try {
            Pozo();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'PozoQ':
        try {
            PozoQ();
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
    $Pozo = new Pozo();
    $Pozo->setTitulo_id(filter_input(INPUT_GET, "titulo_id"));
    $Pozo->setRegion_id(filter_input(INPUT_GET, "rh_id"));
    $Estado = new Estado();
    //Instancia de Municipio
    $Municipio = new Municipio();
    //Extraer el Id del estado
    $id_Estado = $Estado->getEstado(filter_input(INPUT_GET, "estado"));
    //Obtener el Municipio
    $id_municipio = $Municipio->getMunicipio($id_Estado['id_estado'], filter_input(INPUT_GET, "municipio"));
    $Pozo->setMunicipio_id($id_municipio['id_municipio']);
    $Pozo->setEstado_Id($id_Estado['id_estado']);
    $Pozo->setCuenca_id(filter_input(INPUT_GET, "cuenca_id"));
    $Pozo->setSup(filter_input(INPUT_GET, "superficie"));
     $Pozo->setCorriente(filter_input(INPUT_GET, "corriente"));
     $Pozo->setVol_anual(filter_input(INPUT_GET, "volumen"));
     $Pozo->setVol_diario(filter_input(INPUT_GET, "vol_diario"));
     $Pozo->setAcuifero_id(filter_input(INPUT_GET, "acuifero_id"));
     $Pozo->setProcedencia(filter_input(INPUT_GET, "procedencia"));
     $Pozo->setReceptor(filter_input(INPUT_GET, "receptor"));
     $Pozo->setUso(filter_input(INPUT_GET, "uso"));
     $Pozo->setFuente(filter_input(INPUT_GET, "fuente"));
     $Pozo->setAfluente(filter_input(INPUT_GET, "afluente"));
     $Pozo->setForma_desc(filter_input(INPUT_GET, "forma_desc"));
     $Pozo->setAnexo(filter_input(INPUT_GET, "anexo"));
     $Pozo->setLat(filter_input(INPUT_GET, "latitud"));
     $Pozo->setLon(filter_input(INPUT_GET, "longitud"));
     $Pozo->setTipo_id(filter_input(INPUT_GET, "tipo_id"));
    /**
     * Si se inserta correctamente
     */
    if ($Pozo->insert() != null)
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
function Actualizar()
{
    /**
     * Creamos una instancia a tenencia
     */
    $Pozo = new Pozo();
    $Pozo->setID_pozo(filter_input(INPUT_GET, "id_pozo"));
    $Pozo->setTitulo_id(filter_input(INPUT_GET, "titulo_id"));
    $Pozo->setRegion_id(filter_input(INPUT_GET, "rh_id"));
    $Estado = new Estado();
    //Instancia de Municipio
    $Municipio = new Municipio();
    //Extraer el Id del estado
    $id_Estado = $Estado->getEstado(filter_input(INPUT_GET, "estado"));
    //Obtener el Municipio
    $id_municipio = $Municipio->getMunicipio($id_Estado['id_estado'], filter_input(INPUT_GET, "municipio"));
    $Pozo->setMunicipio_id($id_municipio['id_municipio']);
    $Pozo->setEstado_Id($id_Estado['id_estado']);
    $Pozo->setCuenca_id(filter_input(INPUT_GET, "cuenca_id"));
    $Pozo->setSup(filter_input(INPUT_GET, "superficie"));
     $Pozo->setCorriente(filter_input(INPUT_GET, "corriente"));
     $Pozo->setVol_anual(filter_input(INPUT_GET, "volumen"));
     $Pozo->setVol_diario(filter_input(INPUT_GET, "vol_diario"));
     $Pozo->setAcuifero_id(filter_input(INPUT_GET, "acuifero_id"));
     $Pozo->setProcedencia(filter_input(INPUT_GET, "procedencia"));
     $Pozo->setReceptor(filter_input(INPUT_GET, "receptor"));
     $Pozo->setUso(filter_input(INPUT_GET, "uso"));
     $Pozo->setFuente(filter_input(INPUT_GET, "fuente"));
     $Pozo->setAfluente(filter_input(INPUT_GET, "afluente"));
     $Pozo->setForma_desc(filter_input(INPUT_GET, "forma_desc"));
     $Pozo->setAnexo(filter_input(INPUT_GET, "anexo"));
     $Pozo->setLat(filter_input(INPUT_GET, "latitud"));
     $Pozo->setLon(filter_input(INPUT_GET, "longitud"));
     $Pozo->setTipo_id(filter_input(INPUT_GET, "tipo_id"));
    /**
     * Si se inserta correctamente
     */
    if ($Pozo->update() != null)
    {
        echo 'OK';
    }
    else
    {
        echo 'Algo salío mal :(';
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
    $Pozo = new Pozo();
    /**
     * Se coloca el Id del tenencia a eliminar por medio del metodo SET
     */
    $Pozo->setID_pozo(filter_input(INPUT_GET, "ID"));
    //Se manda a llamar a la funcion de eliminar.
    echo $Pozo->delete();
}

function getTodos()
{

    $Pozos = new Pozo();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Pozos->getPozos());
}

function Titulo()
{
    $Pozos = new Pozo();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Pozos->getPozosT(filter_input(INPUT_POST, "query")));
}

function Pozo()
{
    $Pozos = new Pozo();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Pozos->getPozoQuery(filter_input(INPUT_POST, "ID")));
}

function PozoQ()
{
    $Pozos = new Pozo();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Pozos->getPozoQuery2(filter_input(INPUT_POST, "query")));
}
