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
require_once(__DIR__ . "/../modelo/estadomarginacion.php");
require_once(__DIR__ . "/../modelo/estado.php");


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
    case 'ConsultaEstado':
        try {
            consultaEstado();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'getInfoEstadoMapa':
        try {
            getInfoEstadoMapa();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

/**
 * Funcion para insertar un registro de indice de marginacion a la base de datos
 */
function Nuevo()
{
    /**
     * Crear instancia de municipiomarginacion
     */
    $registro = new EstadoMarginacion();
    /**
     * Colocar los datos del GET por medio de los metodos SET
     */
    $registro->setPob_tot(filter_input(INPUT_GET, "pob_tot"));
    $registro->setAnalf(filter_input(INPUT_GET, "analf"));
    $registro->setSprim(filter_input(INPUT_GET, "sprim"));
    $registro->setOvsde(filter_input(INPUT_GET, "ovsde"));
    $registro->setOvsee(filter_input(INPUT_GET, "ovsee"));
    $registro->setOvsae(filter_input(INPUT_GET, "ovsae"));
    $registro->setVhac(filter_input(INPUT_GET, "vhac"));
    $registro->setOvpt(filter_input(INPUT_GET, "ovpt"));
    $registro->setPl_5000(filter_input(INPUT_GET, "pl_5000"));
    $registro->setPo2sm(filter_input(INPUT_GET, "po2sm"));
    $registro->setIm(filter_input(INPUT_GET, "im"));
    $registro->setGm(filter_input(INPUT_GET, "gm"));
    $registro->setAnio_id(filter_input(INPUT_GET, "anio_id"));
    $registro->setEstado_id(filter_input(INPUT_GET, "estado_id"));
    $validar = validarInsert($registro);
    if ($validar == 1) { //El los datos nos se repiten entonces se registra en a base de datos
        $registro->insert();
        echo "OK";
    } else {
        echo "Se encontró un registro en la base de datos del mismo año y estado"; //La funcion de validar encontró un registro igual en la base
    }
}

function validarInsert($marginacionEstado)
{
    //Se valida si es que hay un registro con el mismo año
    try {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('SELECT COUNT(estado_id) AS num FROM marginacion_estado WHERE anio_id=:anio_id AND estado_id=:estado_id');
        $select->bindValue('estado_id', $marginacionEstado->getEstado_id(), PDO::PARAM_INT);
        $select->bindValue('anio_id', $marginacionEstado->getAnio_id(), PDO::PARAM_INT);
        $select->execute();
        $resul = $select->fetch();
        if ($resul['num'] == 0) { //No se encontró un registro igual entonces no se puede insertar
            return 1;
        } else {
            return 0; //Se encontró un registro
        }
    } catch (PDOException $exc) {
        echo $exc->getMessage();
        return null;
    }
}

function validarUpdate($marginacionEstado)
{
    //Se valida si es que hay un registro con el mismo año
    try {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('SELECT COUNT(estado_id) AS num FROM marginacion_estado WHERE anio_id=:anio_id AND estado_id=:estado_id');
        $select->bindValue('estado_id', $marginacionEstado->getEstado_id(), PDO::PARAM_INT);
        $select->bindValue('anio_id', $marginacionEstado->getAnio_id(), PDO::PARAM_INT);
        $select->execute();
        $resul = $select->fetch();
        if ($resul['num'] == 0) { //No se encontró un registro igual entonces no se puede insertar
            return 1;
        } else {
            $select = $db->prepare('SELECT estado_id, anio_id FROM marginacion_estado WHERE id_registro_estado=:id_registro_estado');
            $select->bindValue('id_registro_estado', $marginacionEstado->getId_registro(), PDO::PARAM_INT);
            $select->execute();
            $resul = $select->fetch();
            if ($resul['estado_id'] == $marginacionEstado->getEstado_id() && $resul['anio_id'] == $marginacionEstado->getAnio_id()) {
                return 1; //Si es la misma info se puede actualizar
            } else {
                return 0; //Se encontró un registro diferente ;
            }
        }
    } catch (PDOException $exc) {
        echo $exc->getMessage();
        return null;
    }
}

/**
 * Funcion para insertar un nuevo cultivo a la base de datos
 */
function Actualizar()
{
    /**
     * Crear instancia de EstadoMarginacion
     */
    $registro = new EstadoMarginacion();
    /**
     * Colocar los datos del GET por medio de los metodos SET
     */
    $registro->setId_registro(filter_input(INPUT_GET, "id_registro"));
    $registro->setPob_tot(filter_input(INPUT_GET, "pob_tot"));
    $registro->setAnalf(filter_input(INPUT_GET, "analf"));
    $registro->setSprim(filter_input(INPUT_GET, "sprim"));
    $registro->setOvsde(filter_input(INPUT_GET, "ovsde"));
    $registro->setOvsee(filter_input(INPUT_GET, "ovsee"));
    $registro->setOvsae(filter_input(INPUT_GET, "ovsae"));
    $registro->setVhac(filter_input(INPUT_GET, "vhac"));
    $registro->setOvpt(filter_input(INPUT_GET, "ovpt"));
    $registro->setPl_5000(filter_input(INPUT_GET, "pl_5000"));
    $registro->setPo2sm(filter_input(INPUT_GET, "po2sm"));
    $registro->setIm(filter_input(INPUT_GET, "im"));
    $registro->setGm(filter_input(INPUT_GET, "gm"));
    $registro->setAnio_id(filter_input(INPUT_GET, "anio_id"));
    $registro->setEstado_id(filter_input(INPUT_GET, "estado_id"));
    $validar = validarUpdate($registro);
    if ($validar == 1) { //El los datos nos se repiten entonces se registra en a base de datos
        if ($registro->Update() == 1) {
            echo "OK";
        } else {
            echo "No se ha podido actualizar la información, espere  un momento y vuelva a intentar";
        }
    } else {
        echo "Se encontró un registro con el mismo año y estado"; //La funcion de validar encontró un registro igual en la base
    }
}

function Eliminar()
{
    $registro = new EstadoMarginacion();
    $registro->setId_registro(filter_input(INPUT_GET, "ID"));
    echo $registro->delete();
}

function getTodos()
{
    $registros = new EstadoMarginacion();
    $registros->getRegistrosEstado();
    echo json_encode($registros->getRegistrosEstado());
}

function consultaEstado()
{
    $QUERY = filter_input(INPUT_POST, "query");
    $registros = new EstadoMarginacion();
    echo json_encode($registros->getConsulta($QUERY));
}

function getInfoEstadoMapa(){
    $id=filter_input(INPUT_POST, "id");
    $estado = new EstadoMarginacion();
    echo json_encode($estado->getInfoEstadoMapa($id));
}