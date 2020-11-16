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
 * Class Ciclo
 */
class Ciclo {

    /**
     * @var
     */
    private $id_ciclo;
    private $nombre;
    private $siglas;

    /**
     * Ciclo constructor.
     */
    public function __construct()
    {
        
    }

    /**
     * @return array|null
     */
    public function getCiclos()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM ciclo');
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
    public function getCiclosDTT()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM ciclo where id_ciclo NOT IN (4)');
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
    
    public function getCiclosUR()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM ciclo WHERE id_ciclo<>4');
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
    public function getCiclo($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM ciclo WHERE id_ciclo=:id_ciclo');
            $select->bindValue('id_ciclo', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setIdCiclo($registro['id_ciclo']);
            $this->setNombre($registro['nombre']);
            $this->setSiglas($registro['siglas']);
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
            $select = $db->prepare('INSERT INTO  ciclo VALUES ( 0,  :nombre ,  :siglas)');
            //Colocamos los datos
            $select->bindValue('nombre', $this->getNombre(), PDO::PARAM_STR);
            $select->bindValue('siglas', $this->getSiglas(), PDO::PARAM_STR);

            if ($select->execute())
            {
                //obtenemos el ultimo id de la tabla
                $select = $db->prepare('SELECT MAX(id_ciclo) AS id FROM ciclo');
                $select->execute();
                $id = $select->fetch();
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " insertó el ciclo " . $id['id'];
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            return null;
        }
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
    public function getSiglas()
    {
        return $this->siglas;
    }

//funcion para obetener todos los ciclos

    /**
     * @param mixed $siglas
     */
    public function setSiglas($siglas)
    {
        $this->siglas = $siglas;
    }

    /**
     * @return bool|null
     */
    public function update()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('UPDATE ciclo SET nombre=:nombre,siglas=:siglas WHERE id_ciclo=:id_ciclo');
            //Colocamos los datos
            $select->bindValue('id_ciclo', $this->getIdCiclo(), PDO::PARAM_INT);
            $select->bindValue('nombre', $this->getNombre(), PDO::PARAM_STR);
            $select->bindValue('siglas', $this->getSiglas(), PDO::PARAM_STR);
            if ($select->execute())
            {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " actualizó el ciclo " . $this->getIdCiclo();
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            return null;
        }
    }

    /**
     * @return mixed
     */
    public function getIdCiclo()
    {
        return $this->id_ciclo;
    }

    /**
     * @param mixed $id_ciclo
     */
    public function setIdCiclo($id_ciclo)
    {
        $this->id_ciclo = $id_ciclo;
    }

    /**
     * @return bool|null
     */
    public function delete()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('DELETE FROM ciclo WHERE id_ciclo=:id_ciclo');
            //Colocamos los datos
            $select->bindValue('id_ciclo', $this->getIdCiclo(), PDO::PARAM_INT);
            if ($select->execute())
            {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " eliminó el ciclo " . $this->getIdCiclo();
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            return null;
        }
    }

    //Funcion que busca un ciclo por su nombre
    public function buscarCiclo(){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('SELECT id_ciclo from ciclo where nombre=:nombre');
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
    
    

    public function getCicloI($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT nombre FROM ciclo WHERE id_ciclo=:id_ciclo');
            $select->bindValue('id_ciclo', $id, PDO::PARAM_INT);
            $select->execute();
            return $select->fetch();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }
    
    
    //Obtiene el id y el nombre de todos los cultivos
    public function getNamesAndIDs(){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = "SELECT id_ciclo, REPLACE (LOWER(nombre),' ','') AS nombre FROM ciclo ORDER BY nombre";
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
