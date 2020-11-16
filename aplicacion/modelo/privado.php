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
 * Class Privado
 */
class Privado {

    /**
     * @var
     */
    private $usuario_id;
    private $empresa;
    private $direccion;
    private $giro;

    /**
     * Privado constructor.
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
    public function getEmpresa()
    {
        return $this->empresa;
    }

    /**
     * @param mixed $empresa
     */
    public function setEmpresa($empresa)
    {
        $this->empresa = $empresa;
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
        $select = $db->prepare('INSERT INTO usuario_privado VALUES (:usuario_id, :empresa, :direccion, :giro)');
        $select->bindValue('usuario_id', $this->getUsuarioID(), PDO::PARAM_INT);
        $select->bindValue('empresa', $this->getEmpresa(), PDO::PARAM_STR);
        $select->bindValue('direccion', $this->getDireccion(), PDO::PARAM_STR);
        $select->bindValue('giro', $this->getGiro(), PDO::PARAM_STR);
        return $select->execute();
    }
    
    public function getTodos(){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT usuario_privado.empresa FROM usuario_privado GROUP BY empresa');
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
