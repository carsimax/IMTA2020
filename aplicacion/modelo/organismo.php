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
 * Class Organismo
 */
class Organismo {

    /**
     * @var
     */
    private $id_organismo;
    private $nombre;
    private $numero;

    /**
     * Organismo constructor.
     */
    public function __construct()
    {
        
    }

    /**
     * @return mixed
     */
    public function getIdOrganismo()
    {
        return $this->id_organismo;
    }

    /**
     * @param mixed $id_organismo
     */
    public function setIdOrganismo($id_organismo)
    {
        $this->id_organismo = $id_organismo;
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
    public function getNumero()
    {
        return $this->numero;
    }

    /**
     * @param mixed $numero
     */
    public function setNumero($numero)
    {
        $this->numero = $numero;
    }

    /**
     * @return array|null
     */
    public function getTodos(){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM organismo');
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
     * @return array|null
     */
    public function getTodosDTT()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT 
            organismo.id_organismo,
            organismo.numero,
            organismo.nombre as Organismo
            FROM distrito_temporal_tecnificado
            INNER JOIN organismo on organismo.id_organismo=distrito_temporal_tecnificado.organismo_id
            GROUP BY id_organismo');
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

    public function getRHA($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT nombre FROM organismo WHERE id_organismo=:id_organismo');
            $select->bindValue('id_organismo', $id, PDO::PARAM_INT);
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
    public function getJson($query)
    {
        $pdo = new DBConnectionGeoespacial();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            //Realizamos la consulta
            $sql='SELECT organismo_json as json FROM sig_organismo WHERE ' . $query;
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

    public function getOC($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql='SELECT * FROM organismo WHERE id_organismo=' . $id;
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
