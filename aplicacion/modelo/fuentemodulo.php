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

class FuenteModulo
{
    private $id_fuente;
    private $aprovechameinto;
    private $tipo;
    private $aprov_tipo;

    /**
     * FuenteModulo constructor.
     */
    public function __construct()
    {
    }

    /**
     * @return mixed
     */
    public function getIdFuente()
    {
        return $this->id_fuente;
    }

    /**
     * @param mixed $id_fuente
     */
    public function setIdFuente($id_fuente)
    {
        $this->id_fuente = $id_fuente;
    }

    /**
     * @return mixed
     */
    public function getAprovechameinto()
    {
        return $this->aprovechameinto;
    }

    /**
     * @param mixed $aprovechameinto
     */
    public function setAprovechameinto($aprovechameinto)
    {
        $this->aprovechameinto = $aprovechameinto;
    }

    /**
     * @return mixed
     */
    public function getTipo()
    {
        return $this->tipo;
    }

    /**
     * @param mixed $tipo
     */
    public function setTipo($tipo)
    {
        $this->tipo = $tipo;
    }

    /**
     * @return mixed
     */
    public function getAprovTipo()
    {
        return $this->aprov_tipo;
    }

    /**
     * @param mixed $aprov_tipo
     */
    public function setAprovTipo($aprov_tipo)
    {
        $this->aprov_tipo = $aprov_tipo;
    }

    public function getFuentes()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM fuente_modulo');
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