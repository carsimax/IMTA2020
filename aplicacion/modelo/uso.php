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
require_once(__DIR__ . "/../controlador/sesion.php");

class Uso {

    private $id_uso;
    private $uso;

    /**
     * Uso constructor.
     */
    public function __construct()
    {
        
    }

    /**
     * @return mixed
     */
    public function getIdUso()
    {
        return $this->id_uso;
    }

    /**
     * @param mixed $id_uso
     */
    public function setIdUso($id_uso)
    {
        $this->id_uso = $id_uso;
    }

    /**
     * @return mixed
     */
    public function getUso()
    {
        return $this->uso;
    }

    /**
     * @param mixed $uso
     */
    public function setUso($uso)
    {
        $this->uso = $uso;
    }

    /**
     * @return array|null
     */
    public function getTodos()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM uso');
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

    public function getUs($uso)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM uso WHERE uso=:uso');
            $select->bindValue('uso', $uso, PDO::PARAM_STR);
            $select->execute();
            return $select->fetch();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

}
