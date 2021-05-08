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
require_once("dbconnection.php");


/**
 * Class AnioAgricola
 */
class AnioAgricola {

    /**
     * @var
     */
    private $id_anioagricola;
    private $anio_agricola;

    /**
     * Cultivo constructor.
     */
    public function __construct()
    {
        
    }

    /**
     * @return mixed
     */
    public function getIdAnioAgricola()
    {
        return $this->id_anioagricola;
    }

    /**
     * @param mixed $id_anio_agricola
     */
    public function setIdAnioAgricola($id_anioagricola)
    {
        $this->id_anioagricola = $id_anioagricola;
    }

    /**
     * @return mixed
     */
    public function getAnioAgricola()
    {
        return $this->anio_agricola;
    }

    /**
     * @param mixed $anio_agricola
     */
    public function setAnioAgricola($anio_agricola)
    {
        $this->anio_agricola = $anio_agricola;
    }

    /**
     * @return array|null
     * funcion para obetener todos las presas
     */
    public function getAniosAgricolas()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM anio_agricola');
            $select->execute();
            $registros = $select->fetchAll(PDO::FETCH_ASSOC);
            return $registros;
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    public function getAnio()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM anio_agricola WHERE anio_agricola=:anio_agricola');
            $select->bindValue('anio_agricola', $this->getAnioAgricola(), PDO::PARAM_STR);
            $select->execute();
            return $select->fetch();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @param $anio
     * @return mixed|null
     */
}
