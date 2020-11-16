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
 * Class Catalogo
 */
class Catalogo {

    /**
     * @var
     */
    private $id_registro;
    private $url;
    private $descripcion;
    private $fecha;
    private $fuente;
    private $cita;
    private $anio_id;
    private $modulo_id;

    function getId_registro() {
        return $this->id_registro;
    }

    function getCita() {
        return $this->cita;
    }

    function getAnio_id() {
        return $this->anio_id;
    }

    function getModulo_id() {
        return $this->modulo_id;
    }

    function setId_registro($id_registro) {
        $this->id_registro = $id_registro;
    }

    function setCita($cita) {
        $this->cita = $cita;
    }

    function setAnio_id($anio_id) {
        $this->anio_id = $anio_id;
    }

    function setModulo_id($modulo_id) {
        $this->modulo_id = $modulo_id;
    }

    /**
     * Catalogo constructor.
     */
    public function __construct() {
        
    }

    /**
     * @return mixed
     */
    public function getIdRegistro() {
        return $this->id_registro;
    }

    /**
     * @param mixed $id_registro
     */
    public function setIdRegistro($id_registro) {
        $this->id_registro = $id_registro;
    }

    public function getFuente() {
        return $this->fuente;
    }

    public function setFuente($fuente) {
        $this->fuente = $fuente;
    }

    /**
     * @return mixed
     */
    public function getUrl() {
        return $this->url;
    }

    /**
     * @param mixed $url
     */
    public function setUrl($url) {
        $this->url = $url;
    }

    /**
     * @return mixed
     */
    public function getDescripcion() {
        return $this->descripcion;
    }

    /**
     * @param mixed $descripcion
     */
    public function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

    /**
     * @return mixed
     */
    public function getFecha() {
        return $this->fecha;
    }

    /**
     * @param mixed $fecha
     */
    public function setFecha($fecha) {
        $this->fecha = $fecha;
    }

    /**
     * @return array|null
     */
    public function getCatalogo() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM tabla_registro');
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
    
    public function getCitaConsultaMasReciente() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('select cita from tabla_registro where modulo_id=:modulo_id ORDER BY anio_id DESC LIMIT 1');
            $select->bindValue('modulo_id', $this->getModulo_id(), PDO::PARAM_INT);
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
    
    public function getCitaConsulta() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('select cita from tabla_registro where modulo_id=:modulo_id');
            $select->bindValue('modulo_id', $this->getModulo_id(), PDO::PARAM_INT);
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
    
public function getCitaConsultaAgricola($query) {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('select cita from tabla_registro where (modulo_id=:modulo_id) AND ('.$query.') OR (id_registro=9)');
            $select->bindValue('modulo_id', $this->getModulo_id(), PDO::PARAM_INT);
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
    
    public function getCitaConsultaAgricolaDTT($query) {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('select cita from tabla_registro where (modulo_id=:modulo_id) AND ('.$query.')');
            $select->bindValue('modulo_id', $this->getModulo_id(), PDO::PARAM_INT);
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
    public function getConsultaVariosAnios($query) {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('select cita from tabla_registro,anio where (modulo_id=:modulo_id) AND ('.$query.') AND (tabla_registro.anio_id=anio.id_anio) ORDER BY anio.anio DESC');
            $select->bindValue('modulo_id', $this->getModulo_id(), PDO::PARAM_INT);
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
    public function getRegistro($id) {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM tabla_registro WHERE id_registro=:id_registro');
            $select->bindValue('id_registro', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setIdRegistro($registro['id_registro']);
            $this->setFuente($registro['fuente']);
            $this->setUrl($registro['url']);
            $this->setDescripcion($registro['descripcion']);
            $this->setFecha($registro['fecha']);
            $this->setCita($registro['cita']);
            $this->setAnio_id($registro['anio_id']);
            $this->setModulo_id($registro['modulo_id']);
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
    public function Insert() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('INSERT INTO  tabla_registro VALUES ( 0 ,:fuente, :url ,  :descripcion ,  :fecha, :cita, :anio_id, :modulo_id)');
            //Colocamos los datos            
            $select->bindValue('url', $this->getUrl(), PDO::PARAM_STR);
            $select->bindValue('anio_id', $this->getAnio_id(), PDO::PARAM_INT);
            $select->bindValue('cita', $this->getCita(), PDO::PARAM_STR);
            $select->bindValue('modulo_id', $this->getModulo_id(), PDO::PARAM_INT);
            $select->bindValue('descripcion', $this->getDescripcion(), PDO::PARAM_STR);
            $select->bindValue('fecha', $this->getFecha(), PDO::PARAM_STR);
            $select->bindValue('fuente', $this->getFuente(), PDO::PARAM_STR);
            if ($select->execute()) {
                //obtenemos el ultimo id de la tabla
                $select = $db->prepare('SELECT MAX(id_registro) AS id FROM tabla_registro');
                $select->execute();
                $id = $select->fetch();
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " insertó el registro " . $id['id'] . " en la tabla_registro";
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
    public function Update() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('UPDATE tabla_registro SET url=:url,descripcion=:descripcion,fecha=:fecha, fuente=:fuente,anio_id=:anio_id,cita=:cita,modulo_id=:modulo_id WHERE id_registro=:id_registro');
            //Colocamos los datos
            $select->bindValue('id_registro', $this->getIdRegistro(), PDO::PARAM_INT);
            $select->bindValue('url', $this->getUrl(), PDO::PARAM_STR);
            $select->bindValue('descripcion', $this->getDescripcion(), PDO::PARAM_STR);
            $select->bindValue('fecha', $this->getFecha(), PDO::PARAM_STR);
            $select->bindValue('fuente', $this->getFuente(), PDO::PARAM_STR);
            $select->bindValue('anio_id', $this->getAnio_id(), PDO::PARAM_INT);
            $select->bindValue('cita', $this->getCita(), PDO::PARAM_STR);
            $select->bindValue('modulo_id', $this->getModulo_id(), PDO::PARAM_INT);
            if ($select->execute()) {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " actualizó el registro " . $this->getIdRegistro() . " en la tabla tabla_registro";
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
            $select = $db->prepare('DELETE FROM tabla_registro WHERE id_registro=:id_registro');
            //Colocamos los datos
            $select->bindValue('id_registro', $this->getIdRegistro(), PDO::PARAM_INT);
            if ($select->execute()) {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " eliminó el registro " . $this->getIdRegistro() . " en la tabla tabla_registro";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            return null;
        }
    }

    public function getCitaConsultaIndice($filtro,$anio) {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT cita FROM tabla_registro WHERE cita LIKE \'%'.$filtro.'%\' and modulo_id=:modulo_id and anio_id=:anio_id');
            $select->bindValue('modulo_id', $this->getModulo_id(), PDO::PARAM_INT);
            $select->bindValue('anio_id', $anio, PDO::PARAM_INT);
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
