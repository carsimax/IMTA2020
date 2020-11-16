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

class SitioMonitoreoSuperficial
{
    private $id_sitio;
    private $nom_sitio;
    private $cuenca;
    private $organismo_id;
    private $estado_id;
    private $municipio_id;
    private $cuerpo_agua_id;
    private $tipo_cuerpo_agua_id;
    private $subtipo_cuerpo_agua_id;
    private $lat;
    private $lon;
    
    
    function __construct() {
        
    }

    function getId_sitio() {
        return $this->id_sitio;
    }

    function getNom_sitio() {
        return $this->nom_sitio;
    }

    function getCuenca() {
        return $this->cuenca;
    }

    function getOrganismo_id() {
        return $this->organismo_id;
    }

    function getEstado_id() {
        return $this->estado_id;
    }

    function getMunicipio_id() {
        return $this->municipio_id;
    }

    function getCuerpo_agua_id() {
        return $this->cuerpo_agua_id;
    }

    function getTipo_cuerpo_agua_id() {
        return $this->tipo_cuerpo_agua_id;
    }

    function getSubtipo_cuerpo_agua_id() {
        return $this->subtipo_cuerpo_agua_id;
    }

    function getLat() {
        return $this->lat;
    }

    function getLon() {
        return $this->lon;
    }

    function setId_sitio($id_sitio): void {
        $this->id_sitio = $id_sitio;
    }

    function setNom_sitio($nom_sitio): void {
        $this->nom_sitio = $nom_sitio;
    }

    function setCuenca($cuenca): void {
        $this->cuenca = $cuenca;
    }

    function setOrganismo_id($organismo_id): void {
        $this->organismo_id = $organismo_id;
    }

    function setEstado_id($estado_id): void {
        $this->estado_id = $estado_id;
    }

    function setMunicipio_id($municipio_id): void {
        $this->municipio_id = $municipio_id;
    }

    function setCuerpo_agua_id($cuerpo_agua_id): void {
        $this->cuerpo_agua_id = $cuerpo_agua_id;
    }

    function setTipo_cuerpo_agua_id($tipo_cuerpo_agua_id): void {
        $this->tipo_cuerpo_agua_id = $tipo_cuerpo_agua_id;
    }

    function setSubtipo_cuerpo_agua_id($subtipo_cuerpo_agua_id): void {
        $this->subtipo_cuerpo_agua_id = $subtipo_cuerpo_agua_id;
    }

    function setLat($lat): void {
        $this->lat = $lat;
    }

    function setLon($lon): void {
        $this->lon = $lon;
    }
    

    public function getSitiosConsulta($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT
            anio.id_anio,
            anio.anio,
            organismo.id_organismo,
            organismo.nombre as organismo,
            estado.id_estado,
            estado.nombre as estado,
            municipio.id_municipio,
            municipio.nombre as municipio,
            sitio_superficiales.id_sitio,
            sitio_superficiales.nom_sitio,
            avg(monitoreo_superficial.DBO_TOT),
            avg(monitoreo_superficial.DQO_TOT),
            avg(monitoreo_superficial.SST),
            avg(monitoreo_superficial.COLI_FEC)
            FROM sitio_superficiales
            INNER JOIN municipio on municipio.id_municipio=sitio_superficiales.municipio_id
            INNER JOIN organismo on organismo.id_organismo=sitio_superficiales.organismo_id
            INNER JOIN estado on estado.id_estado=sitio_superficiales.estado_id
            INNER JOIN monitoreo_superficial on monitoreo_superficial.sitio_id=sitio_superficiales.id_sitio
            INNER JOIN anio on anio.id_anio=monitoreo_superficial.anio_id WHERE '. $query.' GROUP BY nom_sitio';
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
    public function distribucionDBO5($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT oc_clave,organismo,estado_id,estado,municipio_id,municipio, COUNT(IF(Clasificacion = "Excelente",1,NULL)) as Excelente, COUNT(IF(Clasificacion = "Buena Calidad",1,NULL)) as Buena_Calidad, COUNT(IF(Clasificacion = "Aceptable",1,NULL)) as Aceptable, COUNT(IF(Clasificacion = "Contaminada",1,NULL)) as Contaminada, COUNT(IF(Clasificacion = "Fuertemente contaminada",1,NULL)) as Fuertemente_Contaminada, COUNT(*) as total FROM consulta_dbo5 WHERE '. $query;
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

    public function distribucionDBO5Estaciones($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT * FROM consulta_dbo5 WHERE '. $query;
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
    public function puntoSitio($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT * FROM consulta_dbo5 WHERE '. $query;
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


    public function distribucionDQO($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT oc_clave,organismo,estado_id,estado,municipio_id,municipio, COUNT(IF(Clasificacion = "Excelente",1,NULL)) as Excelente, COUNT(IF(Clasificacion = "Buena Calidad",1,NULL)) as Buena_Calidad, COUNT(IF(Clasificacion = "Aceptable",1,NULL)) as Aceptable, COUNT(IF(Clasificacion = "Contaminada",1,NULL)) as Contaminada, COUNT(IF(Clasificacion = "Fuertemente contaminada",1,NULL)) as Fuertemente_Contaminada, COUNT(*) as total FROM consulta_dqo WHERE '. $query;
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

    public function distribucionDQOEstaciones($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT * FROM consulta_dqo WHERE '. $query;
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

    public function puntoSitioDQO($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT * FROM consulta_dqo WHERE '. $query;
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


    public function distribucionSST($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT oc_clave,organismo,estado_id,estado,municipio_id,municipio, COUNT(IF(Clasificacion = "Excelente",1,NULL)) as Excelente, COUNT(IF(Clasificacion = "Buena Calidad",1,NULL)) as Buena_Calidad, COUNT(IF(Clasificacion = "Aceptable",1,NULL)) as Aceptable, COUNT(IF(Clasificacion = "Contaminada",1,NULL)) as Contaminada, COUNT(IF(Clasificacion = "Fuertemente contaminada",1,NULL)) as Fuertemente_Contaminada, COUNT(*) as total FROM consulta_sst WHERE '. $query;
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

    public function distribucionSSTEstaciones($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT * FROM consulta_sst WHERE '. $query;
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

    public function puntoSitioSST($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT * FROM consulta_sst WHERE '. $query;
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
    public function distribucionCF($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT oc_clave,organismo,estado_id,estado,municipio_id,municipio, COUNT(IF(Clasificacion = "Excelente",1,NULL)) as Excelente, COUNT(IF(Clasificacion = "Buena Calidad",1,NULL)) as Buena_Calidad, COUNT(IF(Clasificacion = "Aceptable",1,NULL)) as Aceptable, COUNT(IF(Clasificacion = "Contaminada",1,NULL)) as Contaminada, COUNT(IF(Clasificacion = "Fuertemente contaminada",1,NULL)) as Fuertemente_Contaminada, COUNT(*) as total FROM consulta_cf WHERE '. $query;
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

    public function distribucionCFEstaciones($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT * FROM consulta_cf WHERE '. $query;
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

    public function puntoSitioCF($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT * FROM consulta_cf WHERE '. $query;
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
     * @return array|null
     * funcion para obetener todos los anios
     */
    public function getAnios()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT
            anio.id_anio,
            anio.anio,
            organismo.id_organismo,
            organismo.nombre as organismo,
            estado.id_estado,
            estado.nombre as estado,
            municipio.id_municipio,
            municipio.nombre as municipio
            FROM sitio_superficiales
            INNER JOIN municipio on municipio.id_municipio=sitio_superficiales.municipio_id
            INNER JOIN organismo on organismo.id_organismo=sitio_superficiales.organismo_id
            INNER JOIN estado on estado.id_estado=sitio_superficiales.estado_id
            INNER JOIN monitoreo_superficial on monitoreo_superficial.sitio_id=sitio_superficiales.id_sitio
            INNER JOIN anio on anio.id_anio=monitoreo_superficial.anio_id
            where anio NOT IN("2019") AND anio NOT IN("2018")
            GROUP BY anio ORDER BY anio desc');
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
    public function getEstadoOrganismo($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT
            anio.id_anio,
            anio.anio,
            organismo.id_organismo,
            organismo.nombre as organismo,
            estado.id_estado,
            estado.nombre as estado,
            municipio.id_municipio,
            municipio.nombre as municipio,
            sitio_superficiales.id_sitio,
            sitio_superficiales.nom_sitio,
            avg(monitoreo_superficial.DBO_TOT),
            avg(monitoreo_superficial.DQO_TOT),
            avg(monitoreo_superficial.SST),
            avg(monitoreo_superficial.COLI_FEC)
            FROM sitio_superficiales
            INNER JOIN municipio on municipio.id_municipio=sitio_superficiales.municipio_id
            INNER JOIN organismo on organismo.id_organismo=sitio_superficiales.organismo_id
            INNER JOIN estado on estado.id_estado=sitio_superficiales.estado_id
            INNER JOIN monitoreo_superficial on monitoreo_superficial.sitio_id=sitio_superficiales.id_sitio
            INNER JOIN anio on anio.id_anio=monitoreo_superficial.anio_id WHERE ' . $query . 'GROUP BY id_estado';   
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
    public function getMuni($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT
            anio.id_anio,
            anio.anio,
            organismo.id_organismo,
            organismo.nombre as organismo,
            estado.id_estado,
            estado.nombre as estado,
            municipio.id_municipio,
            municipio.nombre as municipio,
            sitio_superficiales.id_sitio,
            sitio_superficiales.nom_sitio,
            avg(monitoreo_superficial.DBO_TOT),
            avg(monitoreo_superficial.DQO_TOT),
            avg(monitoreo_superficial.SST),
            avg(monitoreo_superficial.COLI_FEC)
            FROM sitio_superficiales
            INNER JOIN municipio on municipio.id_municipio=sitio_superficiales.municipio_id
            INNER JOIN organismo on organismo.id_organismo=sitio_superficiales.organismo_id
            INNER JOIN estado on estado.id_estado=sitio_superficiales.estado_id
            INNER JOIN monitoreo_superficial on monitoreo_superficial.sitio_id=sitio_superficiales.id_sitio
            INNER JOIN anio on anio.id_anio=monitoreo_superficial.anio_id WHERE' . $query . 'GROUP BY id_municipio';   
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
