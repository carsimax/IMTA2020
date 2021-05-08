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
 * Class Consulta
 */
class Consulta {

    /**
     * @var
     */
    private $id_consulta;
    private $sector;
    private $grado;
    private $institucion;
    private $modulo;
    private $fecha;

    /**
     * Consulta constructor.
     */
    public function __construct()
    {
        
    }

    /**
     * @return mixed
     */
    public function getIdConsulta()
    {
        return $this->id_consulta;
    }

    /**
     * @param mixed $id_consulta
     */
    public function setIdConsulta($id_consulta)
    {
        $this->id_consulta = $id_consulta;
    }

    /**
     * @return mixed
     */
    public function getSector()
    {
        return $this->sector;
    }

    /**
     * @param mixed $sector
     */
    public function setSector($sector)
    {
        $this->sector = $sector;
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
    public function getModulo()
    {
        return $this->modulo;
    }

    /**
     * @param mixed $modulo
     */
    public function setModulo($modulo)
    {
        $this->modulo = $modulo;
    }

    /**
     * @return mixed
     */
    public function getFecha()
    {
        return $this->fecha;
    }

    /**
     * @param mixed $fecha
     */
    public function setFecha($fecha)
    {
        $this->fecha = $fecha;
    }

    /**
     * @return bool|null
     */
    public function Insert()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('INSERT INTO consulta VALUES (0, :sector,:grado,:institucion,:modulo , CURDATE())');
            //Colocamos los datos
            $select->bindValue('sector', $this->getSector(), PDO::PARAM_STR);
            $select->bindValue('grado', $this->getGrado(), PDO::PARAM_STR);
            $select->bindValue('institucion', $this->getInstitucion(), PDO::PARAM_STR);
            $select->bindValue('modulo', $this->getModulo(), PDO::PARAM_STR);
            return $select->execute();
        } catch (PDOException $exc) {
            return null;
        }
    }

}
