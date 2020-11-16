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
 * Class Tenencia
 */
class Tenencia {

    /**
     * @var
     */
    private $id_tenencia;
    private $nombre;

    /**
     * Fuente constructor.
     */
    public function __construct()
    {
        
    }

    /**
     * @return mixed
     */
    public function getIdTenencia()
    {
        return $this->id_tenencia;
    }

    /**
     * @param mixed $id_fuente
     */
    public function setIdTenencia($id_tenencia)
    {
        $this->id_tenencia = $id_tenencia;
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
    public function getTenencias()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM tenencia');
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
    public function getTenencia($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM tenencia WHERE id_tenencia=:id_tenencia');
            $select->bindValue('id_tenencia', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setIdTenencia($registro['id_tenencia']);
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
    public function insert()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('INSERT INTO tenencia VALUES ( 0,  :nombre)');
            //Colocamos los datos
            $select->bindValue('nombre', $this->getNombre(), PDO::PARAM_STR);
            if ($select->execute())
            {
                //obtenemos el ultimo id de la tabla
                $select = $db->prepare('SELECT MAX(id_tenencia) AS id FROM tenencia');
                $select->execute();
                $id = $select->fetch();
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " registró la tenencia " . $id['id'];
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            return null;
        }
    }

    /**
     * @return bool|null
     */
    public function update()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('UPDATE tenencia SET nombre=:nombre WHERE id_tenencia=:id_tenencia');
            $select->bindValue('id_tenencia', $this->getIdTenencia(), PDO::PARAM_INT);
            $select->bindValue('nombre', $this->getNombre(), PDO::PARAM_STR);
            $result=$select->execute();
            if ($result){
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " actualizó la tenencia " . $this->getIdTenencia();
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
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
            $select = $db->prepare('DELETE FROM tenencia WHERE id_tenencia=:id_tenencia');
            //Colocamos los datos
            $select->bindValue('id_tenencia', $this->getIdTenencia(), PDO::PARAM_INT);
            if ($select->execute())
            {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " eliminó la tenencia " . $this->getIdTenencia();
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            return null;
        }
    }

    //Funcion que busca una tenenia por su nombre
    public function buscarTenencia()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('SELECT id_tenencia from tenencia where nombre=:nombre');
            $select->bindValue('nombre', $this->getNombre(), PDO::PARAM_STR);
            $select->execute();
            return $select->fetch();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    public function getNamesAndIDs()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare("SELECT id_tenencia, REPLACE (LOWER(nombre),' ','') AS nombre FROM tenencia");
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
    //

}
