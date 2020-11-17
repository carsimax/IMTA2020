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
 * Class Anio
 */
class Anio {

    /**
     * @var
     */
    private $id_anio;
    private $anio;
    private $anio_agricola;

    /**
     * Cultivo constructor.
     */
    public function __construct()
    {

    }

    /**
     * @return mixed
     */
    public function getIdAnio()
    {
        return $this->id_anio;
    }

    /**
     * @param mixed $id_anio
     */
    public function setIdAnio($id_anio)
    {
        $this->id_anio = $id_anio;
    }

    /**
     * @return mixed
     */
    public function getAnio()
    {
        return $this->anio;
    }

    /**
     * @param mixed $anio
     */
    public function setAnio($anio)
    {
        $this->anio = $anio;
    }


    /**
     * @return mixed
     */
    public function getAnioAgricola()
    {
        return $this->anio_agricola;
    }

    public function setAnioAgricola($anio_agricola)
    {
        $this->anio_agricola = $anio_agricola;
    }
    /**
     * @return array|null
     * funcion para obetener todos los anios
     */
    public function getAnios()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM anio where anio NOT IN("2019") AND anio NOT IN("2018") order by anio desc;');
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

    public function getAll()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM anio order by anio desc;');
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
    public function getAnioSiembraDistrito()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT 
            anio.id_anio,
            anio.anio,
            anio.anio_agricola
            FROM siembra_distrito
            INNER JOIN anio on anio.id_anio=siembra_distrito.anio_id
            where anio NOT IN("2019") AND anio NOT IN("2018")
            GROUP BY anio ORDER BY anio DESC');
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
    public function getAnioVolDistrito()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT 
            anio.id_anio,
            anio.anio,
            anio.anio_agricola
            FROM volumen_distrito
            INNER JOIN anio on anio.id_anio=volumen_distrito.anio_id
            where anio NOT IN("2019") AND anio NOT IN("2018")
            GROUP BY anio ORDER BY anio DESC');
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
     * @return array|null
     * funcion para obetener todos los anios
     */
    public function getAnios2()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM anio order by anio desc;');
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
     * @return array|null
     * funcion para obetener todos los anios
     */
    public function getAniosDTT()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT 
            anio.id_anio,
            anio.anio,
            anio.anio_agricola
            FROM produccion_dtt
            INNER JOIN anio on anio.id_anio=produccion_dtt.anioagricola_id
            where anio NOT IN("2019") AND anio NOT IN("2018")
            GROUP BY anio order by anio desc;');
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

    public function getAniosUR()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT 
            anio.id_anio,
            anio.anio,
            anio.anio_agricola
            FROM produccion_ur
            INNER JOIN anio on anio.id_anio=produccion_ur.anio_id
            where anio NOT IN("2019")
            GROUP BY anio order by anio desc;');
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
     * @param $anio
     * @return mixed|null
     */
    public function getAnnio($anio)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM anio WHERE anio=:anio');
            $select->bindValue('anio', $anio, PDO::PARAM_STR);
            $select->execute();
            return $select->fetch();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }
    

    public function getAnnio2($anio)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT anio FROM anio WHERE id_anio=:id_anio');
            $select->bindValue('id_anio', $anio, PDO::PARAM_INT);
            $select->execute();
            return $select->fetch();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }


}
