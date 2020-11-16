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
 * Class GrupoCultivo
 */
class GrupoCultivo {

    /**
     * @var
     */
    private $id_grupo_cultivo;
    private $nombre;

    /**
     * GrupoCultivo constructor.
     */
    public function __construct()
    {
        
    }

    /**
     * @return mixed
     */
    public function getIdGrupoCultivo()
    {
        return $this->id_grupo_cultivo;
    }

    /**
     * @param mixed $id_grupo_cultivo
     */
    public function setIdGrupoCultivo($id_grupo_cultivo)
    {
        $this->id_grupo_cultivo = $id_grupo_cultivo;
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
     * @return array|null
     */
    public function getGrupos()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM grupo_cultivo');
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
     * @return bool|null
     */
    public function Insert()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('INSERT INTO grupo_cultivo values (:id_grupo_cultivo, :nombre)');
            //Colocamos los datos
            $select->bindValue('id_grupo_cultivo', 0, PDO::PARAM_INT);
            $select->bindValue('nombre', $this->getNombre(), PDO::PARAM_STR);
            return $select->execute();
        } catch (PDOException $exc) {
            return null;
        }
    }

    /**
     * @return bool|null
     */
    public function Update()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('UPDATE grupo_cultivo SET nombre=:nombre WHERE id_grupo_cultivo=:id_grupo_cultivo');
            //Colocamos los datos
            $select->bindValue('id_grupo_cultivo', $this->getIdGrupoCultivo(), PDO::PARAM_INT);
            $select->bindValue('nombre', $this->getNombre(), PDO::PARAM_STR);
            return $select->execute();
        } catch (PDOException $exc) {
            return null;
        }
    }

    /**
     * @param $id
     * @return $this|null
     */
    public function getGrupo($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM grupo_cultivo WHERE id_grupo_cultivo=:id_grupo_cultivo');
            $select->bindValue('id_grupo_cultivo', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setIdGrupoCultivo($registro['id_grupo_cultivo']);
            $this->setNombre($registro['nombre']);
            return $this;
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @return bool|null
     */
    public function delete()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('DELETE FROM grupo_cultivo WHERE id_grupo_cultivo=:id_grupo_cultivo');
            //Colocamos los datos
            $select->bindValue('id_grupo_cultivo', $this->getIdGrupoCultivo(), PDO::PARAM_INT);
            return $select->execute();
        } catch (PDOException $exc) {
            return null;
        }
    }

}
