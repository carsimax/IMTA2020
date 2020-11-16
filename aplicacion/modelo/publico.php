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
 * Class Publico
 */
class Publico {

    /**
     * @var
     */
    private $usuario_id;
    private $institucion;
    private $direccion;
    private $giro;

    /**
     * Publico constructor.
     */
    public function __construct()
    {
        
    }

    /**
     * @return mixed
     */
    public function getUsuarioId()
    {
        return $this->usuario_id;
    }

    /**
     * @param mixed $usuario_id
     */
    public function setUsuarioId($usuario_id)
    {
        $this->usuario_id = $usuario_id;
    }

    /**
     * @return mixed
     */
    public function getInstitucion()
    {
        return $this->institucion;
    }

    /**
     * @param mixed $institucion
     */
    public function setInstitucion($institucion)
    {
        $this->institucion = $institucion;
    }

    /**
     * @return mixed
     */
    public function getDireccion()
    {
        return $this->direccion;
    }

    /**
     * @param mixed $direccion
     */
    public function setDireccion($direccion)
    {
        $this->direccion = $direccion;
    }

    /**
     * @return mixed
     */
    public function getGiro()
    {
        return $this->giro;
    }

    /**
     * @param mixed $giro
     */
    public function setGiro($giro)
    {
        $this->giro = $giro;
    }

    /**
     * @return bool
     */
    public function insert()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('INSERT INTO usuario_publico VALUES (:usuario_id,:institucion,:direccion,:giro)');
        $select->bindValue('usuario_id', $this->getUsuarioID(), PDO::PARAM_INT);
        $select->bindValue('institucion', $this->getInstitucion(), PDO::PARAM_STR);
        $select->bindValue('direccion', $this->getDireccion(), PDO::PARAM_STR);
        $select->bindValue('giro', $this->getGiro(), PDO::PARAM_STR);
        return $select->execute();
    }
    
    public function getTodos(){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT usuario_publico.institucion FROM usuario_publico GROUP BY institucion');
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
