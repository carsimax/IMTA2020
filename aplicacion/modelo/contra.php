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
 * Class Contra
 */
class Contra {

    /**
     * @var
     */
    private $usuario_id;
    private $contra;

    /**
     * Contra constructor.
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
    public function getContra()
    {
        return $this->contra;
    }

    /**
     * @param mixed $contra
     */
    public function setContra($contra)
    {
        $this->contra = $contra;
    }

    /**
     * @return bool
     */
    public function insert()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('INSERT INTO contra VALUES (:usuario_id,:contra)');
        $select->bindValue('usuario_id', $this->getUsuarioID(), PDO::PARAM_INT);
        $select->bindValue('contra', $this->getContra(), PDO::PARAM_STR);
        return $select->execute();
    }

    /**
     * @return bool
     */
    public function update()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('UPDATE contra SET contra=:contra WHERE usuario_id=:usuario_id');
        $select->bindValue('usuario_id', $this->getUsuarioID(), PDO::PARAM_INT);
        $select->bindValue('contra', $this->getContra(), PDO::PARAM_STR);
        return $select->execute();
    }

}
