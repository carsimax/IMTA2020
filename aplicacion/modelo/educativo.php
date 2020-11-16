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
 * Class Educativo
 */
class Educativo {

    /**
     * @var
     */
    private $usuario_ID;
    private $escuela;
    private $direccion;
    private $carrera;
    private $grado;
    private $grupo;
    private $nivel;

    /**
     * Educativo constructor.
     */
    public function __construct()
    {
        
    }

    /**
     * @return mixed
     */
    public function getUsuarioID()
    {
        return $this->usuario_ID;
    }

    /**
     * @param mixed $usuario_ID
     */
    public function setUsuarioID($usuario_ID)
    {
        $this->usuario_ID = $usuario_ID;
    }

    /**
     * @return mixed
     */
    public function getEscuela()
    {
        return $this->escuela;
    }

    /**
     * @param mixed $escuela
     */
    public function setEscuela($escuela)
    {
        $this->escuela = $escuela;
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
    public function getCarrera()
    {
        return $this->carrera;
    }

    /**
     * @param mixed $carrera
     */
    public function setCarrera($carrera)
    {
        $this->carrera = $carrera;
    }

    /**
     * @return mixed
     */
    public function getGrado()
    {
        return $this->grado;
    }

    /**
     * @param mixed $grado
     */
    public function setGrado($grado)
    {
        $this->grado = $grado;
    }

    /**
     * @return mixed
     */
    public function getGrupo()
    {
        return $this->grupo;
    }

    /**
     * @param mixed $grupo
     */
    public function setGrupo($grupo)
    {
        $this->grupo = $grupo;
    }

    /**
     * @return mixed
     */
    public function getNivel()
    {
        return $this->nivel;
    }

    /**
     * @param mixed $nivel
     */
    public function setNivel($nivel)
    {
        $this->nivel = $nivel;
    }

    /**
     * @return bool
     */
    public function insert()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('INSERT INTO usuario_educativo(usuario_id, escuela, direccion, carrera, grado, grupo, nivel) 
        VALUES (:usuario_id,:escuela,:direccion,:carrera,:grado,:grupo,:nivel)');
        $select->bindValue('usuario_id', $this->getUsuarioID(), PDO::PARAM_INT);
        $select->bindValue('escuela', $this->getEscuela(), PDO::PARAM_STR);
        $select->bindValue('direccion', $this->getDireccion(), PDO::PARAM_STR);
        $select->bindValue('carrera', $this->getCarrera(), PDO::PARAM_STR);
        $select->bindValue('grado', $this->getGrado(), PDO::PARAM_INT);
        $select->bindValue('grupo', $this->getGrupo(), PDO::PARAM_STR);
        $select->bindValue('nivel', $this->getNivel(), PDO::PARAM_STR);
        return $select->execute();
    }
public function getTodos(){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT usuario_educativo.escuela FROM usuario_educativo GROUP BY escuela');
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
