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
require_once("dbconnectionGeoespacial.php");
require_once(__DIR__ . "/../controlador/sesion.php");

/**
 * Class Estado
 */
class Estado {

    /**
     * @var
     */
    private $id_estado;
    private $nombre;
    private $abreviatura;

    /**
     * Estado constructor.
     */
    public function __construct()
    {
        
    }

    /**
     * @return mixed
     */
    public function getIdEstado()
    {
        return $this->id_estado;
    }

    /**
     * @param mixed $id_estado
     */
    public function setIdEstado($id_estado)
    {
        $this->id_estado = $id_estado;
    }

    /**
     * @return mixed
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * @param mixed $nombre
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    /**
     * @return mixed
     */
    public function getAbreviatura()
    {
        return $this->abreviatura;
    }

    /**
     * @param mixed $abreviatura
     */
    public function setAbreviatura($abreviatura)
    {
        $this->abreviatura = $abreviatura;
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
            $select = $db->prepare('SELECT * FROM estado');
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

    /**
     * @param $Estado
     * @return mixed|null
     */
    public function getEstado($Estado)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM estado WHERE nombre=:nombre');
            $select->bindValue('nombre', $Estado, PDO::PARAM_STR);
            $select->execute();            
            return $select->fetch();            
        } catch (PDOException $exc) {            
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    public function getEstadoid($Estado)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM estado WHERE id_estado=:id_estado');
            $select->bindValue('id_estado', $Estado, PDO::PARAM_INT);
            $select->execute();
            return $select->fetch();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    public function getEstado2($Estado)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM estado WHERE abreviatura=:abreviatura');
            $select->bindValue('abreviatura', $Estado, PDO::PARAM_STR);
            $select->execute();
            return $select->fetch();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }
    
   public function getJson($query){
    $pdo = new DBConnectionGeoespacial();
    $db = $pdo->DBConnect();
    try {
        $db->beginTransaction();
        //Realizamos la consulta
        $sql='SELECT estado_json json FROM sig_estado WHERE ' . $query;
        $select = $db->prepare($sql);       
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
    
    public function getMunicipios(){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('Select id_municipio, nombre from municipio where estado_id=:estado_id ORDER BY nombre ASC');
            $select->bindValue('estado_id', $this->getIdEstado(), PDO::PARAM_INT);
            $select->execute();
            $registros = $select->fetchAll(PDO::FETCH_ASSOC);
            return $registros;
        } catch (PDOException $exc) {            
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    public function getNamesAndIDs(){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = "SELECT id_estado, REPLACE (LOWER(nombre),' ','') AS nombre FROM estado ORDER BY nombre";
            $select = $db->prepare($sql);
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
}
