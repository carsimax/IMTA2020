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
 * Class AcuiferoMun
 */
class AcuiferoMun {

    /**
     * @var
     */
    private $municipio_ID;
    private $acuifero_ID;

    /**
     * AcuiferoMun constructor.
     */
    public function __construct()
    {
        
    }

    /**
     * @return mixed
     */
    public function getMunicipioID()
    {
        return $this->municipio_ID;
    }

    /**
     * @param mixed $municipio_ID
     */
    public function setMunicipioID($municipio_ID)
    {
        $this->municipio_ID = $municipio_ID;
    }

    /**
     * @return mixed
     */
    public function getAcuiferoID()
    {
        return $this->acuifero_ID;
    }

    /**
     * @param mixed $acuifero_ID
     */
    public function setAcuiferoID($acuifero_ID)
    {
        $this->acuifero_ID = $acuifero_ID;
    }

    /**
     * @param $id
     * @return array|null
     * funcion para obtener los municipios de un acuifero
     */
    public function getTodos($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT acuifero_municipio.acuifero_id, acuifero_municipio.municipio_id,estado.nombre AS Estado, municipio.nombre AS Municipio from acuifero_municipio INNER JOIN municipio ON municipio.id_municipio=acuifero_municipio.municipio_id inner JOIN estado ON estado.id_estado=municipio.estado_id
            WHERE acuifero_id=:ID;');
            $select->bindValue('ID', $id);
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
     * @param $idAcu
     * @param $idMun
     * @return $this|null
     * Funcion para obtener la relacion de un acuifero con un municipio
     */
    public function getAcuiferoMun($idAcu, $idMun)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM acuifero_municipio WHERE acuifero_id=:idAcu AND municipio_id=:idMun');
            $select->bindValue('idAcu', $idAcu, PDO::PARAM_INT);
            $select->bindValue('idMun', $idMun, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setAcuiferoID($registro['acuifero_id']);
            $this->setMunicipioID($registro['municipio_id']);
            return $this;
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @param $old
     * @return bool
     * Funcion para actualizar un acuifero municipio
     */
    public function update($old)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('UPDATE acuifero_municipio SET 
        municipio_id=:municipio_id
        WHERE municipio_id=:OLD AND acuifero_id=:acuifero_id');
        //Colocamos los datos
        $select->bindValue('municipio_id', $this->getMunicipioID(), PDO::PARAM_INT);
        $select->bindValue('acuifero_id', $this->getAcuiferoID(), PDO::PARAM_INT);
        $select->bindValue('OLD', $old, PDO::PARAM_INT);
        if ($select->execute())
        {
            $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
            $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Actualizó el municipio del acuífero " . $this->getAcuiferoId() . " en la tabla acuifero_municipio";
            $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
            return $select->execute();
        }
    }

    /**
     * @return bool
     * funcion para Eliminar una relacion de acuifero municipio
     */
    public function delete()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('DELETE FROM acuifero_municipio WHERE municipio_id=:municipio_id AND acuifero_id=:acuifero_id');
        $select->bindValue('municipio_id', $this->getMunicipioID(), PDO::PARAM_INT);
        $select->bindValue('acuifero_id', $this->getAcuiferoID(), PDO::PARAM_INT);
        //Colocamos los datos
        if ($select->execute())
        {
            $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
            $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Eliminó el municipio " . $this->getMunicipioID() . " del acuífero " . $this->getAcuiferoId() . " en la tabla acuifero_municipio";
            $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
            return $select->execute();
        }
    }

    /**
     * @return bool|null
     * Funcion para insertar una relacion de acuifero municipio
     */
    public function Insert()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('INSERT INTO acuifero_municipio values (:acuifero_id,:municipio_id)');
            //Colocamos los datos
            $select->bindValue('acuifero_id', $this->getAcuiferoID(), PDO::PARAM_INT);
            $select->bindValue('municipio_id', $this->getMunicipioID(), PDO::PARAM_INT);
            if ($select->execute())
            {
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Insertó el municipio " . $this->getMunicipioID() . " del acuífero " . $this->getAcuiferoId() . " en la tabla acuifero_municipio";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @param $query
     * @return array|null
     * Funcion para obtener los acuiferos que pertenecen a un municipio
     */
    public function getAcuMun($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT * FROM v_acu_mun WHERE ' . $query . 'GROUP BY id_acuifero';
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
    
    public function getAcuMunTitulo($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT
	acuifero.id_acuifero AS id_acuifero,
	acuifero.nombre AS nombre,
	acuifero_municipio.acuifero_id AS acuifero_id,
	acuifero_municipio.municipio_id AS municipio_id,
	pozo.id_pozo
FROM
acuifero 
LEFT JOIN acuifero_municipio ON acuifero.id_acuifero=acuifero_municipio.acuifero_id
LEFT JOIN	pozo on pozo.acuifero_id=acuifero.id_acuifero WHERE ' . $query . ' GROUP BY id_acuifero';
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
