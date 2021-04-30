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
 * Class SiembraUnidad
 */
class SiembraUnidad {

    private $id_produccion_ur;
    private $organismo_id;
    private $estado_id;
    private $municipio_id;
    private $anio_id;
    private $cultivo_id;
    private $sembrada;
    private $cosechada;
    private $produccion;
    private $valor;

    /**
     * Siembraunidad constructor.
     *
     */
    public function __construct() {
        
    }

    /**
     * @return array|null
     * funcion para obetener todos los registros de siembras de una unidad de riego
     */
    public function getRegistrosSiembra() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT id_produccion_ur,sem, cos,val,prod,cultivo.nombre as cultivo,anio.anio as anio from produccion_ur,cultivo,anio where produccion_ur.cultivo_id=cultivo.id_cultivo and produccion_ur.anio_id=anio.id_anio and municipio_id=:municipio_id');
            $select->bindValue('municipio_id', $this->getMunicipio_id(), PDO::PARAM_STR);
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
     * funcion para obetener un registro volumétrico de una unidad
     */
    public function getRegistroSiembra($id) {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM produccion_ur WHERE id_produccion_ur=:id_produccion_ur');
            $select->bindValue('id_produccion_ur', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setId_produccion_ur($registro['id_produccion_ur']);
            $this->setSembrada($registro['sembrada']);
            $this->setCosechada($registro['cosechada']);
            $this->setProduccion($registro['produccion']);
            $this->setValor($registro['valor']);
            $this->setAnio_id($registro['anio_id']);
            $this->setCultivo_id($registro['cultivo_id']);
            $this->setMunicipio_id($registro['municipio_id']);
            return $this;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
        }
    }
    //Obtiene el organismo y el Estado de un municipio
    public function getOCandEdo() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT organismo_id, estado_id FROM produccion_ur WHERE municipio_id=:municipio_id LIMIT 1;');
            $select->bindValue('municipio_id', $this->getMunicipio_id(), PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setOrganismo_id($registro['organismo_id']);
            $this->setEstado_id($registro['estado_id']);
        } catch (PDOException $exc) {
            echo $exc->getMessage();
        }
    }


    /**
     * @return bool|null
     */
    public function insert() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('INSERT INTO produccion_ur VALUES (0,:organismo_id,:estado_id,:municipio_id,:anio_id,:cultivo_id,:sembrada,:cosechada,:produccion,:valor)');
            $select->bindValue('sembrada', $this->getSembrada(), PDO::PARAM_INT);
            $select->bindValue('cosechada', $this->getCosechada(), PDO::PARAM_INT);
            $select->bindValue('produccion', $this->getProduccion(), PDO::PARAM_INT);
            $select->bindValue('valor', $this->getValor(), PDO::PARAM_INT);
            $select->bindValue('anio_id', $this->getAnio_id(), PDO::PARAM_INT);
            $select->bindValue('cultivo_id', $this->getCultivo_id(), PDO::PARAM_INT);
            $select->bindValue('municipio_id', $this->getMunicipio_id(), PDO::PARAM_INT);
            $select->bindValue('estado_id', $this->getEstado_id(), PDO::PARAM_INT);
            $select->bindValue('organismo_id', $this->getOrganismo_id(), PDO::PARAM_INT);
            if ($select->execute()) {
                
                //Se obtiene el ultimo registro
                $select = $db->prepare('SELECT MAX(id_produccion_ur) AS id FROM produccion_ur   ');
                $select->execute();
                $id = $select->fetch();
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " insertó el registro " . $id['id'] . " en la tabla siembra_unidad";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }

    public function update() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('UPDATE produccion_ur SET 
            sembrada=:sembrada,            
            cosechada=:cosechada, 
            produccion=:produccion,
            valor=:valor,
            anio_id=:anio_id, 
            cultivo_id=:cultivo_id           
            WHERE id_produccion_ur=:id_produccion_ur');
            //Colocamos los datos
            $select->bindValue('sembrada', $this->getSembrada(), PDO::PARAM_STR);
            $select->bindValue('cosechada', $this->getCosechada(), PDO::PARAM_STR);
            $select->bindValue('produccion', $this->getProduccion(), PDO::PARAM_STR);
            $select->bindValue('valor', $this->getValor(), PDO::PARAM_STR);
            $select->bindValue('anio_id', $this->getAnio_id(), PDO::PARAM_INT);
            $select->bindValue('cultivo_id', $this->getCultivo_id(), PDO::PARAM_INT);
            $select->bindValue('id_produccion_ur', $this->getId_produccion_ur(), PDO::PARAM_INT);
            if ($select->execute()) {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " actualizó el registro " . $this->getId_produccion_ur() . " en la tabla siembra_unidad";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }

    public function delete() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('DELETE FROM produccion_ur WHERE id_produccion_ur=:id_produccion_ur');
            //Colocamos los datos
            $select->bindValue('id_produccion_ur', $this->getId_produccion_ur(), PDO::PARAM_INT);
            if ($select->execute()) {
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " eliminó el registro " . $this->getId_produccion_ur() . " en la tabla siembra_unidad";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }

    function getId_produccion_ur() {
        return $this->id_produccion_ur;
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

    function getAnio_id() {
        return $this->anio_id;
    }
 

    function getSembrada() {
        return $this->sembrada;
    }

    function getCosechada() {
        return $this->cosechada;
    }

    function getProduccion() {
        return $this->produccion;
    }

    function getValor() {
        return $this->valor;
    }

    function setId_produccion_ur($id_produccion_ur): void {
        $this->id_produccion_ur = $id_produccion_ur;
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

    function setAnio_id($anio_id): void {
        $this->anio_id = $anio_id;
    }

    function setSembrada($sembrada): void {
        $this->sembrada = $sembrada;
    }

    function setCosechada($cosechada): void {
        $this->cosechada = $cosechada;
    }

    function setProduccion($produccion): void {
        $this->produccion = $produccion;
    }

    function setValor($valor): void {
        $this->valor = $valor;
    }

    function getCultivo_id() {
        return $this->cultivo_id;
    }

    function setCultivo_id($cultivo_id): void {
        $this->cultivo_id = $cultivo_id;
    }


    public function URTabla($query){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT
            organismo.id_organismo,
            organismo.numero,
            organismo.nombre AS OC,
            estado.id_estado,
            estado.nombre AS estado,
            municipio.id_municipio,
            municipio.nombre as municipio,
            TRUNCATE ( sum( sem ), 2 ) AS SEM,
            TRUNCATE ( sum( cos ), 2 ) AS COS,
            TRUNCATE ( sum( prod ), 2 ) AS PROD,
            TRUNCATE ( sum( val ), 2 ) AS VAL,
            TRUNCATE ( sum( volumen ), 2 ) AS VOL,
            TRUNCATE (( sum( prod )/ sum( cos )), 2 ) AS REND,
            TRUNCATE ((( sum( val ))/ sum( prod )), 2 ) AS PMR,
            anio,
            anio_id,
            cultivo_id,
            cultivo.nombre AS cultivo
            FROM
            produccion_ur
            INNER JOIN anio ON anio.id_anio = produccion_ur.anio_id
            INNER JOIN estado ON estado.id_estado = produccion_ur.estado_id
            INNER JOIN municipio on municipio.id_municipio=produccion_ur.municipio_id
            INNER JOIN organismo ON organismo.id_organismo=produccion_ur.organismo_id
            INNER JOIN cultivo ON cultivo.id_cultivo = produccion_ur.cultivo_id
            WHERE ' . $query;
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
