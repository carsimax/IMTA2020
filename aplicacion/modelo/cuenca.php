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
 * Class Cuenca
 */
class Cuenca {

    /**
     * @var
     */
    private $id_cuenca;
    private $nombre;
    private $reg_hidrologica_id;

    /**
     * Cuenca constructor.
     */
    public function __construct()
    {
        
    }

    /**
     * @return mixed
     */
    public function getIdCuenca()
    {
        return $this->id_cuenca;
    }

    /**
     * @param mixed $id_cuenca
     */
    public function setIdCuenca($id_cuenca)
    {
        $this->id_cuenca = $id_cuenca;
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
    public function getRegHidrologicaId()
    {
        return $this->reg_hidrologica_id;
    }

    /**
     * @param mixed $reg_hidrologica_id
     */
    public function setRegHidrologicaId($reg_hidrologica_id)
    {
        $this->reg_hidrologica_id = $reg_hidrologica_id;
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
            $select = $db->prepare('SELECT * FROM cuenca');
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
     */
    public function getCuencas()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT cuenca.id_cuenca, cuenca.nombre, reg_hidrologica.nombre as region
            FROM cuenca INNER JOIN reg_hidrologica ON cuenca.reg_hidrologica_id=reg_hidrologica.id_reg_hidrologica');
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
     * @param $id
     * @return $this|null
     */
    public function getCuenca($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM cuenca WHERE id_cuenca=:id_cuenca');
            $select->bindValue('id_cuenca', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setIdCuenca($registro['id_cuenca']);
            $this->setNombre($registro['nombre']);
            $this->setRegHidrologicaId($registro['reg_hidrologica_id']);
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
    public function Insert()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('INSERT INTO cuenca VALUES (:id_cuenca, :nombre, :reg_hidrologica_id)');
            //Colocamos los datos
            $select->bindValue('id_cuenca', $this->getIdCuenca(), PDO::PARAM_INT);
            $select->bindValue('nombre', $this->getNombre(), PDO::PARAM_STR);
            $select->bindValue('reg_hidrologica_id', $this->getRegHidrologicaId(), PDO::PARAM_INT);
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
            $select = $db->prepare('UPDATE cuenca SET nombre=:nombre,reg_hidrologica_id=:reg_hidrologica_id WHERE id_cuenca=:id_cuenca');
            //Colocamos los datos
            $select->bindValue('id_cuenca', $this->getIdCuenca(), PDO::PARAM_INT);
            $select->bindValue('nombre', $this->getNombre(), PDO::PARAM_STR);
            $select->bindValue('reg_hidrologica_id', $this->getRegHidrologicaId(), PDO::PARAM_INT);
            return $select->execute();
        } catch (PDOException $exc) {
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
            $select = $db->prepare('DELETE FROM cuenca WHERE id_cuenca=:id_cuenca');
            //Colocamos los datos
            $select->bindValue('id_cuenca', $this->getIdCuenca(), PDO::PARAM_INT);
            return $select->execute();
        } catch (PDOException $exc) {
            return null;
        }
    }

    /**
     * @return int|null
     */
    public function getCuen()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('SELECT id_cuenca from cuenca where id_cuenca=:id_cuenca');
            $select->bindValue('id_cuenca', $this->getIdCuenca(), PDO::PARAM_INT);
            $select->execute();
            return $select->rowCount();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    public function getCuencaNombre($nombre)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('SELECT id_cuenca from cuenca where nombre=:nombre');
            $select->bindValue('nombre', $nombre, PDO::PARAM_INT);
            $select->execute();
            return $select->fetch();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    public function getSubCuencaNombre($nombre)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {            
            $select = $db->prepare('SELECT id_subcuenca from subcuenca where nombre=:nombre');
            $select->bindValue('nombre', $nombre, PDO::PARAM_INT);
            $select->execute();
            return $select->fetch();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    function getSubcuencas()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM subcuenca');
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

    public function getOrganismoNombre($nombre)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {            
            $select = $db->prepare('SELECT id_organismo from organismo_climatologico where nombre=:nombre');
            $select->bindValue('nombre', $nombre, PDO::PARAM_INT);
            $select->execute();
            return $select->fetch();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    function getOrganismos()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM organismo_climatologico');
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
