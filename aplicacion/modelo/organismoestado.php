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
 * Class OrganismoEstado
 */
class OrganismoEstado {

    /**
     * @var
     */
    private $organismo_id;
    private $estado_id;

    /**
     * OrganismoEstado constructor.
     */
    public function __construct()
    {
        
    }

    /**
     * @return mixed
     */
    public function getOrganismoId()
    {
        return $this->organismo_id;
    }

    /**
     * @param mixed $organismo_id
     */
    public function setOrganismoId($organismo_id)
    {
        $this->organismo_id = $organismo_id;
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
     * @param $query
     * @return array|null
     */
    public function getEstadoOrganismo($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT * FROM vorg_est WHERE ' . $query . 'GROUP BY id_estado';   
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
     * @param $query
     * @return array|null
     */
    public function getEstadoOrganismoDTT($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT 
            organismo.id_organismo,
            organismo.numero,
            organismo.nombre as Organismo,
            estado.id_estado,
            estado.nombre AS Estado 
            FROM distrito_temporal_tecnificado
            INNER JOIN organismo on organismo.id_organismo=distrito_temporal_tecnificado.organismo_id
            INNER JOIN estado on estado.id_estado=distrito_temporal_tecnificado.estado_id WHERE ' . $query . ' GROUP BY id_estado';   
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
