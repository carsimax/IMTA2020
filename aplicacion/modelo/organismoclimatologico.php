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
 * Class Organismo
 */
class OrganismoClimatologico {

    /**
     * @var
     */
    private $id_organismo;
    private $nombre;
    

    /**
     * Organismo constructor.
     */
    public function __construct()
    {
        
    }
    function getId_organismo() {
        return $this->id_organismo;
    }

    function getNombre() {
        return $this->nombre;
    }

    function setId_organismo($id_organismo) {
        $this->id_organismo = $id_organismo;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
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
            $select = $db->prepare('SELECT * FROM organismo_climatologico');
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

    public function getIdOrganismoClimatologicoNombre($nombre)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT id_organismo FROM organismo_climatologico WHERE nombre=:nombre');
            $select->bindValue('nombre', $nombre, PDO::PARAM_STR);
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
