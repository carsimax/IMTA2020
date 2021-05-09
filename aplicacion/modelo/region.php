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
 * Class Region
 */
class RegionHidrologica {

    /**
     * @var
     */
    private $id_reg_hidrologica;
    private $nombre;

    /**
     * Region constructor.
     */
    public function __construct()
    {
        
    }

    /**
     * @return mixed
     */
    public function getIdRegHidrologica()
    {
        return $this->id_reg_hidrologica;
    }

    /**
     * @param mixed $id_reg_hidrologica
     */
    public function setIdRegHidrologica($id_reg_hidrologica)
    {
        $this->id_reg_hidrologica = $id_reg_hidrologica;
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
     * @return array|null
     */
    public function getEstados()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('select id_estado, estado.nombre from estado, reg_hidrologica_estado where reg_hidrologica_estado.estado_id=estado.id_estado AND reg_hidrologica_id=:reg_hidrologica_id');
            $select->bindValue('reg_hidrologica_id', $this->getIdRegHidrologica(), PDO::PARAM_INT);                      
            $select->execute();
            return $select->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }
    
     public function getTodos(){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM reg_hidrologica ORDER BY nombre');
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
    
    public function getRegion($nombre){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT id_reg_hidrologica FROM reg_hidrologica where nombre=:nombre');
            $select->bindValue('nombre', $nombre, PDO::PARAM_STR);                      
            $select->execute();
            $registro = $select->fetch();            
            return $registro['id_reg_hidrologica'];
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    public function getRH($id){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql='SELECT * FROM reg_hidrologica WHERE id_reg_hidrologica=' . $id;
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

    /**
     * @param $query
     * @return array|null
     */
    public function getRegOrg($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT * FROM vOrg_Reg WHERE ' . $query . 'GROUP BY id_reg_hidrologica';
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

    //Obtiene un json con las regiones hidrologicas
    public function getJson($query)
    {
        $pdo = new DBConnectionGeoespacial();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql='SELECT region_hidrologica_json as json FROM sig_region_hidrologica WHERE ' . $query;
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
