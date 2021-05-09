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
 * Class AcuiferoTotal
 */
class AcuiferoTotal {

    /**
     * @var
     */
    private $acuifero_id;
    private $ejidales;
    private $pequenos_propietarios;
    private $volumen_anual;
    private $total_usuario;

    /**
     * AcuiferoTotal constructor.
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
    public function getEjidales()
    {
        return $this->ejidales;
    }

    /**
     * @param mixed $ejidales
     */
    public function setEjidales($ejidales)
    {
        $this->ejidales = $ejidales;
    }

    /**
     * @return mixed
     */
    public function getPequenosPropietarios()
    {
        return $this->pequenos_propietarios;
    }

    /**
     * @param mixed $pequenos_propietarios
     */
    public function setPequenosPropietarios($pequenos_propietarios)
    {
        $this->pequenos_propietarios = $pequenos_propietarios;
    }

    /**
     * @return mixed
     */
    public function getVolumenAnual()
    {
        return $this->volumen_anual;
    }

    /**
     * @param mixed $volumen_anual
     */
    public function setVolumenAnual($volumen_anual)
    {
        $this->volumen_anual = $volumen_anual;
    }

    /**
     * @return mixed
     */
    public function getTotalUsuario()
    {
        return $this->total_usuario;
    }

    /**
     * @param mixed $total_usuario
     */
    public function setTotalUsuario($total_usuario)
    {
        $this->total_usuario = $total_usuario;
    }

    /**
     * @param $id
     * @return $this|null
     */
    public function getTotal($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM acuifero_total WHERE acuifero_id=:acuifero_id');
            $select->bindValue('acuifero_id', $id, PDO::PARAM_INT);
            $select->execute();
            
            $registro = $select->fetch();
            if (!empty($registro)) {
            $this->setAcuiferoId($registro['acuifero_id']);
            $this->setEjidales($registro['ejidales']);
            $this->setPequenosPropietarios($registro['pequenos_propietarios']);
            $this->setVolumenAnual($registro['volumen_anual']);
            $this->setTotalUsuario($registro['total_usuario']);
            }
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
        $select = $db->prepare('UPDATE acuifero_total SET 
        ejidales=:ejidales,
        pequenos_propietarios=:pequenos_propietarios,
        volumen_anual=:volumen_anual,
        total_usuario=:total_usuario WHERE acuifero_id=:acuifero_id');
        //Colocamos los datos
        $select->bindValue('acuifero_id', $this->getAcuiferoId(), PDO::PARAM_INT);
        $select->bindValue('ejidales', $this->getEjidales(), PDO::PARAM_STR);
        $select->bindValue('pequenos_propietarios', $this->getPequenosPropietarios(), PDO::PARAM_STR);
        $select->bindValue('volumen_anual', $this->getVolumenAnual(), PDO::PARAM_STR);
        $select->bindValue('total_usuario', $this->getTotalUsuario(), PDO::PARAM_STR);
        if ($select->execute())
        {
            $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
            $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Actualizó el total del acuífero " . $this->getAcuiferoId() . " en la tabla acuifero_total";
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

            $select = $db->prepare('INSERT INTO acuifero_total values (:acuifero_id, :ejidales, :pequenos_propietarios, :volumen_anual, :total_usuario)');
            //Colocamos los datos
            $select->bindValue('acuifero_id', $this->getAcuiferoId(), PDO::PARAM_INT);
            $select->bindValue('ejidales', $this->getEjidales(), PDO::PARAM_STR);
            $select->bindValue('pequenos_propietarios', $this->getPequenosPropietarios(), PDO::PARAM_STR);
            $select->bindValue('volumen_anual', $this->getVolumenAnual(), PDO::PARAM_STR);
            $select->bindValue('total_usuario', $this->getTotalUsuario(), PDO::PARAM_STR);
            if ($select->execute())
            {
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Insertó el total del acuífero " . $this->getAcuiferoId() . " en la tabla acuifero_total";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            return null;
        }
    }

}
