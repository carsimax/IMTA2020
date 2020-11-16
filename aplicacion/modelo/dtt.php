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
 * Class DTT
 */
class DTT{
    /**
     * @var
     */
    private $id_dtt;
    private $nombre;
    private $estado_id;    

    function __construct() {
        
        
    }

    function getIdDtt() {
        return $this->id_dtt;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getEstado_id() {
        return $this->estado_id;
    }

    function setIdDtt($id_dtt) {
        $this->id_dtt = $id_dtt;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function setEstado_id($estado_id) {
        $this->estado_id = $estado_id;
    }

    
    /**
     * @return array|null
     */
    public function getDTTs(){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try{
            $db->beginTransaction();
            $select = $db->prepare('SELECT id_dtt, distrito_temporal_tecnificado.nombre,estado.nombre AS estado FROM distrito_temporal_tecnificado, estado WHERE distrito_temporal_tecnificado.estado_id=estado.id_estado');
            $select->execute();
            $registros = $select->fetchAll(PDO::FETCH_ASSOC);
            return $registros;
        }catch (PDOException $exc){
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
    public function getDTT($id){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try{
            $db->beginTransaction();
            $select = $db->prepare('SELECT *  FROM distrito_temporal_tecnificado WHERE id_dtt=:id_dtt');
            $select->bindValue('id_dtt',$id,PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setIdDtt($registro['id_dtt']);
            $this->setNombre($registro['nombre']);
            $this->setEstado_id($registro['estado_id']);        
            return $this;
        }catch (PDOException $exc){
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @return bool|null
     */
    public function Insert(){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try{
            $select = $db->prepare('INSERT INTO  distrito_temporal_tecnificado VALUES ( :id_dtt ,  :nombre ,  :estado_id)');
            //Colocamos los datos
            $select->bindValue('id_dtt', $this->getIdDtt(),PDO::PARAM_INT);
            $select->bindValue('nombre', $this->getNombre(),PDO::PARAM_STR);
            $select->bindValue('estado_id', $this->getEstado_id(),PDO::PARAM_INT);            
            if($select->execute()){                
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena="El administrador ". $_SESSION['ID_Usuario']." Insertó el DTT ".$this->getIdDtt().".";
                $select->bindValue('cadena', $cadena,PDO::PARAM_STR);
                return $select->execute();
            }
        }catch (PDOException $exc){
            //echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @return bool|null
     */
    public function Update(){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try{
            $select = $db->prepare('UPDATE distrito_temporal_tecnificado SET nombre=:nombre,estado_id=:estado_id WHERE id_dtt=:id_dtt');
            //Colocamos los datos
            $select->bindValue('id_dtt', $this->getIdDtt(),PDO::PARAM_INT);
            $select->bindValue('nombre', $this->getNombre(),PDO::PARAM_STR);
            $select->bindValue('estado_id', $this->getEstado_id(),PDO::PARAM_INT);            
            if($select->execute()){
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena="El administrador ". $_SESSION['ID_Usuario']." Actualizó el DTT ".$this->getIdDtt().".";
                $select->bindValue('cadena', $cadena,PDO::PARAM_STR);
                return $select->execute();
            }
        }catch (PDOException $exc){
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @return bool|null
     */
    public function delete(){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try{
            $select = $db->prepare('DELETE FROM distrito_temporal_tecnificado WHERE id_dtt=:id_dtt');
            //Colocamos los datos
            $select->bindValue('id_dtt', $this->getIdDtt(),PDO::PARAM_INT);
            return $select->execute();
        }catch (PDOException $exc){
            return null;
        }
    }

     /**
     * @param $query
     * @return array|null
     * Obtener la relacion de acuifero - Estado
     */
    public function getDTTEstado($query) {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT * FROM distrito_temporal_tecnificado WHERE ' . $query . 'GROUP BY id_distrito_riego';
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

    public function getDTTI($id) {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('
            SELECT
            distrito_temporal_tecnificado.id_dtt,
            distrito_temporal_tecnificado.nombre,
            estado.variable,
            estado.nombre as estado,
            organismo.numero,
            organismo.nombre as organismo
            FROM
            distrito_temporal_tecnificado
            INNER JOIN estado ON estado.id_estado = distrito_temporal_tecnificado.estado_id
            INNER JOIN organismo ON organismo.id_organismo=distrito_temporal_tecnificado.organismo_id WHERE id_dtt=:id_dtt');
            $select->bindValue('id_dtt', $id, PDO::PARAM_INT);
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
            $sql='SELECT dtt_json as json FROM sig_dtt WHERE ' . $query;
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
            $select = $db->prepare('SELECT id_dtt FROM distrito_temporal_tecnificado;');
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