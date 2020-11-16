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
 * Class EstacionHidrometrica
 */
class EstacionHidrometrica {

    private $id_estacion_hidrometrica;
    private $nombre;
    private $corriente;
    private $cuenca_id;
    private $estado_id;
    private $latitud;
    private $longitud;
    private $region_id;

    function __construct() {

    }

    function getIdEstacion() {
        return $this->id_estacion_hidrometrica;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getCorriente() {
        return $this->corriente;
    }

    function getCuenca_id() {
        return $this->cuenca_id;
    }

    function getEstado_id() {
        return $this->estado_id;
    }

    function getRegion_id() {
        return $this->region_id;
    }

    function getLatitud() {
        return $this->latitud;
    }

    function getLongitud() {
        return $this->longitud;
    }

    function setIdEstacion($id_estacion_hidrometrica) {
        $this->id_estacion_hidrometrica = $id_estacion_hidrometrica;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function setCorriente($corriente) {
        $this->corriente = $corriente;
    }

    function setCuenca_id($cuenca_id) {
        $this->cuenca_id = $cuenca_id;
    }

    function setRegion_id($region_id) {
        $this->region_id = $region_id;
    }
    function setEstado_id($estado_id) {
        $this->estado_id = $estado_id;
    }

    function setLatitud($latitud) {
        $this->latitud = $latitud;
    }

    function setLongitud($longitud) {
        $this->longitud = $longitud;
    }

    
    
    //Obtiene las regiones hidrologicas que estan en la tabla de estacion hidrometrica
    public function getRegionesHidrologicas() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare("SELECT region_id,reg_hidrologica.nombre FROM estacion_hidrometrica INNER JOIN reg_hidrologica ON estacion_hidrometrica.region_id=reg_hidrologica.id_reg_hidrologica GROUP BY region_id ORDER BY reg_hidrologica.nombre");
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
     * @return Obtiene todas las estaciones de la base de datos array|null
     */
    public function getEstaciones() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare("SELECT id_estacion_hidrometrica, estacion_hidrometrica.nombre, corriente, cuenca.nombre AS cuenca, estado.nombre AS estado,reg_hidrologica.nombre as region FROM estacion_hidrometrica, estado, cuenca,reg_hidrologica WHERE estacion_hidrometrica.cuenca_id=cuenca.id_cuenca AND estacion_hidrometrica.estado_id=estado.id_estado AND reg_hidrologica.id_reg_hidrologica=estacion_hidrometrica.region_id");
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
    public function getEstacion($id) {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * from estacion_hidrometrica where id_estacion_hidrometrica=:id_estacion_hidrometrica');
            $select->bindValue('id_estacion_hidrometrica', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setIdEstacion($registro['id_estacion_hidrometrica']);
            $this->setNombre($registro['nombre']);            
            $this->setCuenca_id($registro['cuenca_id']);            
            $this->setEstado_id($registro['estado_id']);            
            $this->setRegion_id($registro['region_id']);
            $this->setCorriente($registro['corriente']);
            $this->setLatitud($registro['latitud']);
            $this->setLongitud($registro['longitud']);
            return $this;
        } catch (PDOException $exc) {
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
            $select = $db->prepare('INSERT INTO estacion_hidrometrica VALUES (:id_estacion_hidrometrica,:nombre,:corriente,:cuenca_id,:estado_id,:latitud,:longitud,:region_id)');
            $select->bindValue('id_estacion_hidrometrica', $this->getIdEstacion(), PDO::PARAM_INT);            
            $select->bindValue('nombre', $this->getNombre(), PDO::PARAM_STR);
            $select->bindValue('estado_id', $this->getEstado_id(), PDO::PARAM_INT);
            $select->bindValue('cuenca_id', $this->getCuenca_id(), PDO::PARAM_INT);                        
            $select->bindValue('corriente', $this->getCorriente(), PDO::PARAM_STR);            
            $select->bindValue('latitud', $this->getLatitud(), PDO::PARAM_STR);
            $select->bindValue('longitud', $this->getLongitud(), PDO::PARAM_STR);                        
            $select->bindValue('region_id', $this->getRegion_id(), PDO::PARAM_INT);
            if ($select->execute()) {
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Insertó la estación con id_estacion_hidrometrica " . $this->getIdEstacion() . " en la tabla estacion_hidrometrica";
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
            $select = $db->prepare('UPDATE estacion_hidrometrica SET nombre=:nombre,estado_id=:estado_id,cuenca_id=:cuenca_id,corriente=:corriente,region_id=:region_id,latitud=:latitud,longitud=:longitud WHERE id_estacion_hidrometrica=:id_estacion_hidrometrica');
            $select->bindValue('id_estacion_hidrometrica', $this->getIdEstacion(), PDO::PARAM_INT);            
            $select->bindValue('nombre', $this->getNombre(), PDO::PARAM_STR);
            $select->bindValue('estado_id', $this->getEstado_id(), PDO::PARAM_INT);
            $select->bindValue('cuenca_id', $this->getCuenca_id(), PDO::PARAM_INT);                        
            $select->bindValue('corriente', $this->getCorriente(), PDO::PARAM_STR);            
            $select->bindValue('latitud', $this->getLatitud(), PDO::PARAM_STR);
            $select->bindValue('longitud', $this->getLongitud(), PDO::PARAM_STR);                        
            $select->bindValue('region_id', $this->getRegion_id(), PDO::PARAM_INT);
            if ($select->execute()) {
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Actualizó la estación con id_estacion_hidrometrica " . $this->getIdEstacion() . " en la tabla estacion_hidrometrica";
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
            $select = $db->prepare('DELETE FROM estacion_hidrometrica WHERE id_estacion_hidrometrica=:id_estacion_hidrometrica');
            $select->bindValue('id_estacion_hidrometrica', $this->getIdEstacion(), PDO::PARAM_INT);                                
            return $select->execute();
        } catch (PDOException $exc) {            
            echo $exc->getMessage();
            return null;
        }
    }

    public function existeRegistro() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT id_estacion_hidrometrica FROM estacion_hidrometrica WHERE id_estacion_hidrometrica=:id_estacion_hidrometrica');
            $select->bindValue('id_estacion_hidrometrica', $this->getIdEstacion(), PDO::PARAM_INT);
            $select->execute();
            return $select->rowCount();
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }
    
    //Consulta en la tabla de estacion_hidrometrica las cuencas con los municipios seleccionados
    public function getMunicipiosCuenca($query){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT cuenca_id, cuenca.nombre from estacion_hidrometrica INNER JOIN cuenca ON estacion_hidrometrica.cuenca_id=cuenca.id_cuenca WHERE ' . $query . 'GROUP BY cuenca_id');
            $select->execute();
            $registros = $select->fetchAll(PDO::FETCH_ASSOC);
            return $registros;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }
    
 //Consulta a la base de datos las estaciones climatologicas que cumplan con el query
    public function getEstacionesMuni($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT id_estacion_hidrometrica ,nombre FROM estacion_hidrometrica WHERE ' . $query . 'GROUP BY id_estacion_hidrometrica');
            $select->execute();
            $registros = $select->fetchAll(PDO::FETCH_ASSOC);
            return $registros;
        } catch (PDOException $exc) {
            //return $exc->getMessage();
            return null;
            
        }
    }
     //Obtiene el resultado de una consulta para mostrar en la tabla de resultad con los parametros capturados en la vista
    public function getEstacionesTabla($query){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT estacion_hidrometrica.nombre, corriente, cuenca.nombre AS cuenca, estado.nombre AS estado, municipio.nombre  AS municipio from estacion_hidrometrica INNER JOIN cuenca ON estacion_hidrometrica.cuenca_id=cuenca.id_cuenca INNER JOIN municipio ON estacion_hidrometrica.municipio_id=municipio.id_municipio INNER JOIN estado ON municipio.estado_id=estado.id_estado WHERE ' . $query;
            $select = $db->prepare($sql);
            $select->execute();
            $registros = $select->fetchAll(PDO::FETCH_ASSOC);
            return $registros;
        } catch (PDOException $exc) {
            $db = null;
            return $exc->getMessage();
        }
    }
    
    //Obtiene los estados pertenecientes a las regiones hidrológicas que tiene el query
    public function getEstados($query){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT estado_id, estado.nombre from estacion_hidrometrica INNER JOIN estado ON estacion_hidrometrica.estado_id=estado.id_estado  WHERE ' . $query.'GROUP BY estado_id');
            $select->execute();
            $registros = $select->fetchAll(PDO::FETCH_ASSOC);
            return $registros;
        } catch (PDOException $exc) {
            $db = null;
            return $exc->getMessage(); 
        }
    }
    
    //Obtiene los estados pertenecientes a las regiones hidrológicas que tiene el query
    public function getMunicipios($query){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT municipio_id, municipio.nombre FROM estacion_hidrometrica INNER JOIN municipio ON estacion_hidrometrica.municipio_id=municipio.id_municipio WHERE ' . $query.'GROUP BY municipio_id');
            $select->execute();
            $registros = $select->fetchAll(PDO::FETCH_ASSOC);
            return $registros;
        } catch (PDOException $exc) {
            $db = null;
            return $exc->getMessage(); 
        }
    }
    
     //Obtiene la informacion que se vaciará en el mapa
    public function getEstacionesMap($query){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT id_estacion_hidrometrica as clave, estacion_hidrometrica.nombre, corriente, cuenca.nombre AS cuenca, estado.nombre AS estado, municipio.nombre  AS municipio, latitud, longitud FROM estacion_hidrometrica INNER JOIN cuenca ON estacion_hidrometrica.cuenca_id=cuenca.id_cuenca INNER JOIN municipio ON estacion_hidrometrica.municipio_id=municipio.id_municipio INNER JOIN estado ON municipio.estado_id=estado.id_estado WHERE ' . $query);
            $select->execute();
            $registros = $select->fetchAll(PDO::FETCH_ASSOC);
            return $registros;
        } catch (PDOException $exc) {
            $db = null;
            return $exc->getMessage(); 
        }
    }
}
