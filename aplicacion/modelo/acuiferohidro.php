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
require_once(__DIR__ . "/../controlador/sesion.php");

/**
 * Class AcuiferoHidro
 */
class AcuiferoHidro {

    /**
     * @var
     */
    private $acuifero_id;
    private $p_nestatico_min;
    private $p_nestaticomax;
    private $p_ndinamicomin;
    private $p_ndinamicomax;

    /**
     * AcuiferoHidro constructor.
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
    public function getPNestaticoMin()
    {
        return $this->p_nestatico_min;
    }

    /**
     * @param mixed $p_nestatico_min
     */
    public function setPNestaticoMin($p_nestatico_min)
    {
        $this->p_nestatico_min = $p_nestatico_min;
    }

    /**
     * @return mixed
     */
    public function getPNestaticomax()
    {
        return $this->p_nestaticomax;
    }

    /**
     * @param mixed $p_nestaticomax
     */
    public function setPNestaticomax($p_nestaticomax)
    {
        $this->p_nestaticomax = $p_nestaticomax;
    }

    /**
     * @return mixed
     */
    public function getPNdinamicomin()
    {
        return $this->p_ndinamicomin;
    }

    /**
     * @param mixed $p_ndinamicomin
     */
    public function setPNdinamicomin($p_ndinamicomin)
    {
        $this->p_ndinamicomin = $p_ndinamicomin;
    }

    /**
     * @return mixed
     */
    public function getPNdinamicomax()
    {
        return $this->p_ndinamicomax;
    }

    /**
     * @param mixed $p_ndinamicomax
     */
    public function setPNdinamicomax($p_ndinamicomax)
    {
        $this->p_ndinamicomax = $p_ndinamicomax;
    }

    /**
     * @param $id
     * @return $this|null
     * funcion para obtener informacion hidrologica
     */
    public function getHidro($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM acuifero_hidrogeologica WHERE acuifero_id=:ID');
            $select->bindValue('ID', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setAcuiferoId($registro['acuifero_id']);
            $this->setPNestaticoMin($registro['p_nestatico_min']);
            $this->setPNestaticomax($registro['p_nestaticomax']);
            $this->setPNdinamicomin($registro['p_ndinamicomin']);
            $this->setPNdinamicomax($registro['p_ndinamicomax']);
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
     * Funcion para actualizar la informacion hidrologico
     */
    public function update()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('UPDATE acuifero_hidrogeologica SET 
        p_nestatico_min=:p_nestatico_min,
        p_nestaticomax=:p_nestaticomax,
        p_ndinamicomin=:p_ndinamicomin,
        p_ndinamicomax=:p_ndinamicomax WHERE acuifero_id=:acuifero_id');
        //Colocamos los datos
        $select->bindValue('acuifero_id', $this->getAcuiferoId(), PDO::PARAM_INT);
        $select->bindValue('p_nestatico_min', $this->getPNestaticoMin(), PDO::PARAM_STR);
        $select->bindValue('p_nestaticomax', $this->getPNestaticomax(), PDO::PARAM_STR);
        $select->bindValue('p_ndinamicomin', $this->getPNdinamicomin(), PDO::PARAM_STR);
        $select->bindValue('p_ndinamicomax', $this->getPNdinamicomax(), PDO::PARAM_STR);
        if ($select->execute())
        {
            $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
            $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Actualizó la información hidrogeológica del acuífero " . $this->getAcuiferoId() . " en la tabla acuifero_hidrogeologica";
            $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
            return $select->execute();
        }
    }

    /**
     * @return bool|null
     * Funcion para insertar infromacion hidrogeologica
     */
    public function Insert()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('INSERT INTO acuifero_hidrogeologica values (:acuifero_id, :p_nestatico_min, :p_nestaticomax, :p_ndinamicomin, :p_ndinamicomax)');
            //Colocamos los datos
            $select->bindValue('acuifero_id', $this->getAcuiferoId(), PDO::PARAM_INT);
            $select->bindValue('p_nestatico_min', $this->getPNestaticoMin(), PDO::PARAM_INT);
            $select->bindValue('p_nestaticomax', $this->getPNestaticomax(), PDO::PARAM_INT);
            $select->bindValue('p_ndinamicomin', $this->getPNdinamicomin(), PDO::PARAM_INT);
            $select->bindValue('p_ndinamicomax', $this->getPNdinamicomax(), PDO::PARAM_INT);
            if ($select->execute())
            {
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Insertó la información hidrogeológica del acuífero " . $this->getAcuiferoId() . " en la tabla acuifero_hidrogeologica";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            return null;
        }
    }

}
