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
 * Class MunicipioDistrito
 */
class MunicipioDistrito {

    /**
     * @var
     */
    private $municipio_id;
    private $distrito_id;

    /**
     * Municipio constructor.
     */
    public function __construct()
    {
        
    }

    /**
     * @return mixed
     */
    public function getMunicipioId()
    {
        return $this->municipio_id;
    }

    /**
     * @param mixed $municipio_id
     */
    public function setMunicipioId($municipio_id)
    {
        $this->municipio_id = $municipio_id;
    }

    /**
     * @return mixed
     */
    public function getDistritoId()
    {
        return $this->distrito_id;
    }

    /**
     * @param mixed $distrito_id
     */
    public function setDistritoId($distrito_id)
    {
        $this->distrito_id = $distrito_id;
    }

    /**
     * @return array|null
     */
    public function insert()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('INSERT INTO municipio_distrito values (:municipio_id, :distrito_id)');
            //Colocamos los datos
            $select->bindValue('municipio_id', $this->getMunicipioId(), PDO::PARAM_INT);
            $select->bindValue('distrito_id', $this->getDistritoId(), PDO::PARAM_STR);
            return $select->execute();
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }

    public function update($oldMuni, $oldDistrito)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('UPDATE municipio_distrito SET municipio_id=:municipio_id, distrito_id=:distrito_id WHERE municipio_id=:oldMuni AND distrito_id=:oldDistrito');
            $select->bindValue('municipio_id', $this->getMunicipioId(), PDO::PARAM_INT);
            $select->bindValue('distrito_id', $this->getDistritoId(), PDO::PARAM_STR);
            $select->bindValue('oldMuni', $oldMuni, PDO::PARAM_INT);
            $select->bindValue('oldDistrito', $oldDistrito, PDO::PARAM_STR);
            return $select->execute();
        } catch (PDOException $exc) {
            echo $exc->getMessage() . '\nHOLA\n';
            return null;
        }
    }

    public function buscarRegistro()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('SELECT * from municipio_distrito WHERE municipio_id=:municipio_id AND distrito_id=:distrito_id');
            $select->bindValue('municipio_id', $this->getMunicipioId(), PDO::PARAM_INT);
            $select->bindValue('distrito_id', $this->getDistritoId(), PDO::PARAM_STR);
            $select->execute();
            return $select->fetch();
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }

}
