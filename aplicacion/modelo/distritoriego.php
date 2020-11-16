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
require_once("dbconnectionGeoespacial.php");
require_once(__DIR__ . "/../controlador/sesion.php");

/**
 * Class DistritoRiego
 */
class DistritoRiego {

    /**
     * @var
     */
    private $id_distrito_riego;
    private $nom_dr;
    private $estado_id;
    private $organismo_id;

    /**
     * Constructor.
     */
    public function __construct() {
        
    }

    /**
     * @return mixed
     */
    public function getIdDistritoRiego() {
        return $this->id_distrito_riego;
    }

    /**
     * @param mixed $id_distrito_riego
     */
    public function setIdDistritoRiego($id_distrito_riego) {
        $this->id_distrito_riego = $id_distrito_riego;
    }

    /**
     * @return mixed
     */
    public function getNomDr() {
        return $this->nom_dr;
    }

    /**
     * @param mixed $nom_dr
     */
    public function setNomDr($nom_dr) {
        $this->nom_dr = $nom_dr;
    }

    /**
     * @return mixed
     */
    public function getEstadoId() {
        return $this->estado_id;
    }

    /**
     * @param mixed $estado_id
     */
    public function setEstadoId($estado_id) {
        $this->estado_id = $estado_id;
    }

    /**
     * @return mixed
     */
    public function getOrganismoId() {
        return $this->organismo_id;
    }

    /**
     * @param mixed $organismo_id
     */
    public function setOrganismoId($organismo_id) {
        $this->organismo_id = $organismo_id;
    }

    /**
     * @return array|null
     */
    public function getDRs() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT id_distrito_riego, nom_dr, organismo.nombre AS organismo, estado.nombre AS estado FROM distrito_riego, organismo, estado WHERE distrito_riego.organismo_id=organismo.id_organismo AND distrito_riego.estado_id=estado.id_estado');
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
    public function getDR($id) {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM distrito_riego WHERE id_distrito_riego=:id_distrito_riego');
            $select->bindValue('id_distrito_riego', $id, PDO::PARAM_STR);
            $select->execute();
            $registro = $select->fetch();
            $this->setIdDistritoRiego($registro['id_distrito_riego']);
            $this->setOrganismoId($registro['organismo_id']);
            $this->setNomDr($registro['nom_dr']);
            return $this;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @return bool|null
     */
    public function insert() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('INSERT INTO  distrito_riego VALUES ( :id_distrito_riego,  :nom_dr ,  :organismo_id, :estado_id)');
            //Colocamos los datos
            $select->bindValue('id_distrito_riego', $this->getIdDistritoRiego(), PDO::PARAM_STR);
            $select->bindValue('nom_dr', $this->getNomDr(), PDO::PARAM_STR);
            $select->bindValue('organismo_id', $this->getOrganismoId(), PDO::PARAM_INT);
            $select->bindValue('estado_id', $this->getEstadoId(), PDO::PARAM_INT);
            if ($select->execute()) {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " insertó el distrito de riego " . $this->getIdDistritoRiego();
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
    public function update() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('UPDATE distrito_riego SET nom_dr=:nom_dr, organismo_id=:organismo_id, estado_id=:estado_id WHERE id_distrito_riego=:id_distrito_riego');
            $select->bindValue('id_distrito_riego', $this->getIdDistritoRiego(), PDO::PARAM_STR);
            $select->bindValue('nom_dr', $this->getNomDr(), PDO::PARAM_STR);
            $select->bindValue('organismo_id', $this->getOrganismoId(), PDO::PARAM_INT);
            $select->bindValue('estado_id', $this->getEstadoId(), PDO::PARAM_INT);
            if ($select->execute()) {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " actualizó el distrito de riego " . $this->getIdDistritoRiego();
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @return bool|null
     */
    public function delete() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('DELETE FROM distrito_riego WHERE id_distrito_riego=:id_distrito_riego');
            //Colocamos los datos
            $select->bindValue('id_distrito_riego', $this->getIdDistritoRiego(), PDO::PARAM_STR);
            if ($select->execute()) {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " eliminó el distrito de riego " . $this->getIdDistritoRiego();
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }

    public function existeDistrito() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('SELECT id_distrito_riego FROM distrito_riego WHERE id_distrito_riego=:id_distrito_riego');
            $select->bindValue('id_distrito_riego', $this->getIdDistritoRiego(), PDO::PARAM_STR);
            $select->execute();
            return $select->rowCount();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return false;
        }
    }

    /**
     * @param $query
     * @return array|null
     * Obtener la relacion de acuifero - Estado
     */
    public function getDREstado($query) {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT id_distrito_riego,nom_dr FROM distrito_riego WHERE ' . $query . 'GROUP BY id_distrito_riego';
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
     * Obtener la relacion de acuifero - Estado
     */
    public function getDRProduccion($query) {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT
            anio_id,
            organismo.id_organismo,
            estado.id_estado,
            siembra_distrito.ciclo_id,
            siembra_distrito.modalidad,
            siembra_distrito.tenencia_id,
            distrito_riego.id_distrito_riego,
            distrito_riego.nom_dr
            FROM siembra_distrito
            INNER JOIN distrito_riego on distrito_riego.id_distrito_riego=siembra_distrito.distrito_riego_id
            INNER JOIN organismo on organismo.id_organismo=distrito_riego.organismo_id
            INNER JOIN estado on estado.id_estado=distrito_riego.estado_id
            WHERE ' . $query . 'GROUP BY id_distrito_riego';
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
    public function getDRProduccion2($query) {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT
            anio_id,
            organismo.id_organismo,
            estado.id_estado,
            volumen_distrito.tenencia_id,
            volumen_distrito.fuente_id,
            distrito_riego.id_distrito_riego,
            distrito_riego.nom_dr
            FROM volumen_distrito
            INNER JOIN distrito_riego on distrito_riego.id_distrito_riego=volumen_distrito.distrito_riego_id
            INNER JOIN organismo on organismo.id_organismo=distrito_riego.organismo_id
            INNER JOIN estado on estado.id_estado=distrito_riego.estado_id
            WHERE ' . $query . 'GROUP BY id_distrito_riego';
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

    public function getDRI($id) {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT 
            id_distrito_riego,
            nom_dr,
            estado.variable,
            estado.nombre as estado,
            organismo.numero,
            organismo.nombre as organismo
            FROM distrito_riego
            INNER JOIN organismo on organismo.id_organismo=distrito_riego.organismo_id
            INNER JOIN estado on estado.id_estado=distrito_riego.estado_id
            WHERE id_distrito_riego=:id_distrito_riego');
            $select->bindValue('id_distrito_riego', $id, PDO::PARAM_INT);
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
    public function getJson($query)
    {
        $pdo = new DBConnectionGeoespacial();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql='SELECT distrito_riego_json as json FROM sig_distrito_riego WHERE ' . $query;
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

    //Obtiene los identificadores de los distritos de riego
    public function getIDs(){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT id_distrito_riego FROM distrito_riego');
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
    public function getOrganismos($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql="SELECT id_distrito_riego FROM distrito_riego";
            $select = $db->prepare($sql);       
            $sql = 'SELECT
                    anio_id,
                    organismo.id_organismo,
                    organismo.nombre as organismo,
                    estado.id_estado,
                    estado.nombre as estado
                    FROM siembra_distrito
                    INNER JOIN distrito_riego on distrito_riego.id_distrito_riego=siembra_distrito.distrito_riego_id
                    INNER JOIN organismo on organismo.id_organismo=distrito_riego.organismo_id
                    INNER JOIN estado on estado.id_estado=distrito_riego.estado_id WHERE ' . $query . 'GROUP BY id_organismo';
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
    public function getOrganismos2($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT
            anio_id,
            organismo.id_organismo,
            organismo.nombre as organismo,
            estado.id_estado,
            estado.nombre as estado
            FROM volumen_distrito
            INNER JOIN distrito_riego on distrito_riego.id_distrito_riego=volumen_distrito.distrito_riego_id
            INNER JOIN organismo on organismo.id_organismo=distrito_riego.organismo_id
            INNER JOIN estado on estado.id_estado=distrito_riego.estado_id WHERE ' . $query . 'GROUP BY id_organismo';
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
    public function getEstados($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT
                    anio_id,
                    organismo.id_organismo,
                    organismo.nombre as organismo,
                    estado.id_estado,
                    estado.nombre as estado
                    FROM siembra_distrito
                    INNER JOIN distrito_riego on distrito_riego.id_distrito_riego=siembra_distrito.distrito_riego_id
                    INNER JOIN organismo on organismo.id_organismo=distrito_riego.organismo_id
                    INNER JOIN estado on estado.id_estado=distrito_riego.estado_id WHERE ' . $query . 'GROUP BY id_estado';
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
    public function getEstados2($query){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT
                    anio_id,
                    organismo.id_organismo,
                    organismo.nombre as organismo,
                    estado.id_estado,
                    estado.nombre as estado
                    FROM volumen_distrito
                    INNER JOIN distrito_riego on distrito_riego.id_distrito_riego=volumen_distrito.distrito_riego_id
                    INNER JOIN organismo on organismo.id_organismo=distrito_riego.organismo_id
                    INNER JOIN estado on estado.id_estado=distrito_riego.estado_id WHERE ' . $query . 'GROUP BY id_estado';
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
