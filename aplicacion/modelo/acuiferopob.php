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
 * Class AcuiferoPob
 */
class AcuiferoPob {

    /**
     * @var
     */
    private $acuifero_id;
    private $num_habitantes;
    private $num_habitantes_rural;
    private $rum_habitantes_urbana;

    /**
     * AcuiferoPob constructor.
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
    public function getNumHabitantes()
    {
        return $this->num_habitantes;
    }

    /**
     * @param mixed $num_habitantes
     */
    public function setNumHabitantes($num_habitantes)
    {
        $this->num_habitantes = $num_habitantes;
    }

    /**
     * @return mixed
     */
    public function getNumHabitantesRural()
    {
        return $this->num_habitantes_rural;
    }

    /**
     * @param mixed $num_habitantes_rural
     */
    public function setNumHabitantesRural($num_habitantes_rural)
    {
        $this->num_habitantes_rural = $num_habitantes_rural;
    }

    /**
     * @return mixed
     */
    public function getRumHabitantesUrbana()
    {
        return $this->rum_habitantes_urbana;
    }

    /**
     * @param mixed $rum_habitantes_urbana
     */
    public function setRumHabitantesUrbana($rum_habitantes_urbana)
    {
        $this->rum_habitantes_urbana = $rum_habitantes_urbana;
    }

    /**
     * @param $id
     * @return $this|null
     * Funcion para obtener poblacion
     */
    public function getPoblacion($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM acuifero_poblacion WHERE acuifero_id=:acuifero_id');
            $select->bindValue('acuifero_id', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setAcuiferoId($registro['acuifero_id']);
            $this->setNumHabitantes($registro['num_habitantes']);
            $this->setNumHabitantesRural($registro['num_habitantes_rural']);
            $this->setRumHabitantesUrbana($registro['rum_habitantes_urbana']);
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
     */
    public function update()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('UPDATE acuifero_poblacion SET 
        num_habitantes=:num_habitantes,
        num_habitantes_rural=:num_habitantes_rural,
        rum_habitantes_urbana=:rum_habitantes_urbana WHERE acuifero_id=:acuifero_id');
        //Colocamos los datos
        $select->bindValue('acuifero_id', $this->getAcuiferoId(), PDO::PARAM_INT);
        $select->bindValue('num_habitantes', $this->getNumHabitantes(), PDO::PARAM_INT);
        $select->bindValue('num_habitantes_rural', $this->getNumHabitantesRural(), PDO::PARAM_INT);
        $select->bindValue('rum_habitantes_urbana', $this->getRumHabitantesUrbana(), PDO::PARAM_INT);
        if ($select->execute())
        {
            $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
            $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Actualizó la población del acuífero " . $this->getAcuiferoId() . " en la tabla acuifero_poblacion";
            $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
            return $select->execute();
        }
    }

    /**
     * @return bool|null
     */
    public function Insert()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('INSERT INTO acuifero_poblacion values (:acuifero_id, :num_habitantes, :num_habitantes_rural, :rum_habitantes_urbana)');
            //Colocamos los datos
            $select->bindValue('acuifero_id', $this->getAcuiferoId(), PDO::PARAM_INT);
            $select->bindValue('num_habitantes', $this->getNumHabitantes(), PDO::PARAM_INT);
            $select->bindValue('num_habitantes_rural', $this->getNumHabitantesRural(), PDO::PARAM_INT);
            $select->bindValue('rum_habitantes_urbana', $this->getRumHabitantesUrbana(), PDO::PARAM_INT);
            if ($select->execute())
            {
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Insertó la población del acuífero " . $this->getAcuiferoId() . " en la tabla acuifero_poblacion";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            return null;
        }
    }

}
