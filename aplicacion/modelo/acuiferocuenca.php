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
 * Class AcuiferoCuenca
 */
class AcuiferoCuenca {

    /**
     * @var
     * Variables
     */
    private $acuifero_id;
    private $cuenca_id;
    private $subcuenca;

    /**
     * AcuiferoCuenca constructor.
     */
    public function __construct()
    {
        
    }

    /**
     * @return mixed
     */
    public function getAcuiferoId()
    {
        return $this->acuifero_id;
    }

    /**
     * @param mixed $acuifero_id
     */
    public function setAcuiferoId($acuifero_id)
    {
        $this->acuifero_id = $acuifero_id;
    }

    /**
     * @return mixed
     */
    public function getCuencaId()
    {
        return $this->cuenca_id;
    }

    /**
     * @param mixed $cuenca_id
     */
    public function setCuencaId($cuenca_id)
    {
        $this->cuenca_id = $cuenca_id;
    }

    /**
     * @return mixed
     */
    public function getSubcuenca()
    {
        return $this->subcuenca;
    }

    /**
     * @param mixed $subcuenca
     */
    public function setSubcuenca($subcuenca)
    {
        $this->subcuenca = $subcuenca;
    }

    /**
     * @param $id
     * @return $this|null
     * Funcion para obtener cuenca por id
     */
    public function getCuenca($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM acuifero_cuenca WHERE acuifero_id=:acuifero_id');
            $select->bindValue('acuifero_id', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setAcuiferoId($registro['acuifero_id']);
            $this->setCuencaId($registro['cuenca_id']);
            $this->setSubcuenca($registro['subcuenca']);
            return $this;
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @return bool
     * Funcion para actualizar acuifero cuenca
     */
    public function update()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('UPDATE acuifero_cuenca SET 
        cuenca_id=:cuenca_id,
        subcuenca=:subcuenca WHERE acuifero_id=:acuifero_id');
        //Colocamos los datos
        $select->bindValue('acuifero_id', $this->getAcuiferoId(), PDO::PARAM_INT);
        $select->bindValue('cuenca_id', $this->getCuencaId(), PDO::PARAM_STR);
        $select->bindValue('subcuenca', $this->getSubcuenca(), PDO::PARAM_STR);
        if ($select->execute())
        {
            $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
            $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Actualizó la Cuenca " . $this->getCuencaId() . " del acuífero " . $this->getAcuiferoId() . " en la tabla acuifero_cuenca";
            $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
            return $select->execute();
        }
    }

    /**
     * @return bool|null
     * funcion para insertar una relacion de acuifero cuenca
     */
    public function Insert()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('INSERT INTO acuifero_cuenca values (:acuifero_id, :cuenca_id, :subcuenca)');
            //Colocamos los datos
            $select->bindValue('acuifero_id', $this->getAcuiferoId(), PDO::PARAM_INT);
            $select->bindValue('cuenca_id', $this->getCuencaId(), PDO::PARAM_INT);
            $select->bindValue('subcuenca', $this->getSubcuenca(), PDO::PARAM_STR);
            if ($select->execute())
            {
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Insertó la Cuenca " . $this->getCuencaId() . " del acuífero " . $this->getAcuiferoId() . " en la tabla acuifero_cuenca";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }

}
