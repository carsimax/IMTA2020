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
 * Class Municipio
 */
class Municipio {

    /**
     * @var
     */
    private $id_municipio;
    private $local;
    private $nombre;
    private $estado_id;

    /**
     * Municipio constructor.
     */
    public function __construct()
    {
        
    }

    /**
     * @return mixed
     */
    public function getIdMunicipio()
    {
        return $this->id_municipio;
    }

    /**
     * @param mixed $id_municipio
     */
    public function setIdMunicipio($id_municipio)
    {
        $this->id_municipio = $id_municipio;
    }

    /**
     * @return mixed
     */
    public function getLocal()
    {
        return $this->local;
    }

    /**
     * @param mixed $local
     */
    public function setLocal($local)
    {
        $this->local = $local;
    }

    /**
     * @return mixed
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * @param mixed $nombre
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    /**
     * @return mixed
     */
    public function getEstadoId()
    {
        return $this->estado_id;
    }

    /**
     * @param mixed $estado_id
     */
    public function setEstadoId($estado_id)
    {
        $this->estado_id = $estado_id;
    }

    /**
     * @return array|null
     */
    public function getTodos()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM municipio ORDER BY nombre ASC');
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
     * Obtiene el id del municipio buscando por el id del estado y el nombre del municipio
     * @param $id
     * @param $Municipio
     * @return mixed|null
     */
    public function getMunicipio($id, $Municipio)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM municipio WHERE estado_id=:estado_id AND nombre=:nombre ORDER BY nombre ASC');
            $select->bindValue('estado_id', $id, PDO::PARAM_INT);
            $select->bindValue('nombre', $Municipio, PDO::PARAM_STR);
            $select->execute();
            return $select->fetch();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    //Retorna el resultado de la busqueda por el id del municipio de estado y municipio 
    public function getMuniId($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT  municipio.nombre as municipio, estado.nombre AS estado from municipio, estado where id_municipio=:id_municipio and estado.id_estado=municipio.estado_id ORDER BY municipio ASC');
            $select->bindValue('id_municipio', $id, PDO::PARAM_INT);
            $select->execute();
            return $select->fetch();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    public function getMunicipioid($id, $Municipio)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM municipio WHERE estado_id=:estado_id AND local=:local ORDER BY nombre ASC');
            $select->bindValue('estado_id', $id, PDO::PARAM_INT);
            $select->bindValue('local', $Municipio, PDO::PARAM_INT);
            $select->execute();
            return $select->fetch();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @param $query
     * @return array|null
     */
    public function getMuni($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT municipio.id_municipio,municipio.nombre as nombre_mun,estado.nombre as nombre_est FROM municipio  INNER JOIN estado on estado.id_estado=municipio.estado_id WHERE ' . $query. 'ORDER BY nombre_mun ASC';
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
    public function getJson($query){
        $pdo = new DBConnectionGeoespacial();
     $db = $pdo->DBConnect();
     try {
         $db->beginTransaction();
         //Realizamos la consulta
         $sql='SELECT municipio_json as json FROM sig_municipio WHERE ' . $query;
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
}
