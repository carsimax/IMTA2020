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
 * Class Estadistica
 */
class Estadistica {

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
     * Estadistica constructor.
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
     * @return array|null
     */
    public function Toda()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = '	SELECT consulta.sector, consulta.modulo, COUNT(consulta.id_consulta) as consultas FROM consulta 
	GROUP BY sector,modulo';
            $select = $db->prepare($sql);
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

    /**
     * @param $FI
     * @param $FF
     * @return array|null
     */
    public function TodaFecha($FI, $FF)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('	SELECT consulta.sector, consulta.modulo, COUNT(consulta.id_consulta) as consultas FROM consulta
	        WHERE DATE(consulta.fecha) BETWEEN :FI and :FF
	        GROUP BY sector,modulo');
            $select->bindValue('FI', $FI, PDO::PARAM_STR);
            $select->bindValue('FF', $FF, PDO::PARAM_STR);
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

    /**
     * @param $FI
     * @param $FF
     * @return array|null
     */
    public function Educativo($FI, $FF)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT consulta.sector,consulta.institucion, consulta.modulo, COUNT(consulta.id_consulta) as consultas FROM consulta 
            WHERE (DATE(consulta.fecha) BETWEEN :FI AND :FF) AND sector=\'Educativo\'
            GROUP BY institucion,modulo');
            $select->bindValue('FI', $FI, PDO::PARAM_STR);
            $select->bindValue('FF', $FF, PDO::PARAM_STR);
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

    /**
     * @param $FI
     * @param $FF
     * @return array|null
     */
    public function Publico($FI, $FF)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT consulta.sector,consulta.institucion, consulta.modulo, COUNT(consulta.id_consulta) as consultas FROM consulta 
            WHERE (DATE(consulta.fecha) BETWEEN :FI AND :FF) AND sector=\'Público\'
            GROUP BY institucion,modulo');
            $select->bindValue('FI', $FI, PDO::PARAM_STR);
            $select->bindValue('FF', $FF, PDO::PARAM_STR);
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

    /**
     * @param $FI
     * @param $FF
     * @return array|null
     */
    public function Privado($FI, $FF)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT consulta.sector,consulta.institucion, consulta.modulo, COUNT(consulta.id_consulta) as consultas FROM consulta 
            WHERE (DATE(consulta.fecha) BETWEEN :FI AND :FF) AND sector=\'Privado\'
            GROUP BY institucion,modulo');
            $select->bindValue('FI', $FI, PDO::PARAM_STR);
            $select->bindValue('FF', $FF, PDO::PARAM_STR);
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

    /**
     * @param $FI
     * @param $FF
     * @return array|null
     */
    public function SE($FI, $FF)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT consulta.sector,consulta.institucion, consulta.modulo, COUNT(consulta.id_consulta) as consultas FROM consulta 
            WHERE (DATE(consulta.fecha) BETWEEN :FI AND :FF) AND sector=\'Sin Especificar\'
            GROUP BY institucion,modulo');
            $select->bindValue('FI', $FI, PDO::PARAM_STR);
            $select->bindValue('FF', $FF, PDO::PARAM_STR);
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

    /**
     * @param $FI
     * @param $FF
     * @return array|null
     */
    public function NE($FI, $FF)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT consulta.sector,consulta.institucion,consulta.grado, consulta.modulo, COUNT(consulta.id_consulta) as consultas FROM consulta 
            WHERE (DATE(consulta.fecha) BETWEEN :FI AND :FF) AND sector=\'Educativo\'
            GROUP BY grado,modulo');
            $select->bindValue('FI', $FI, PDO::PARAM_STR);
            $select->bindValue('FF', $FF, PDO::PARAM_STR);
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
