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
 * Class Cultivo
 */
class Cultivo {

    /**
     * @var
     */
    private $id_cultivo;
    private $nombre;
    private $nombre_cientifico;
    private $grupo_cultivo_id;

    /**
     * Cultivo constructor.
     */
    public function __construct()
    {
        
    }

    /**
     * @return mixed
     */
    public function getIdCultivo()
    {
        return $this->id_cultivo;
    }

    /**
     * @param mixed $id_cultivo
     */
    public function setIdCultivo($id_cultivo)
    {
        $this->id_cultivo = $id_cultivo;
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
    public function getNombreCientifico()
    {
        return $this->nombre_cientifico;
    }

    /**
     * @param mixed $nombre_cientifico
     */
    public function setNombreCientifico($nombre_cientifico)
    {
        $this->nombre_cientifico = $nombre_cientifico;
    }

    /**
     * @return mixed
     */
    public function getGrupoCultivoId()
    {
        return $this->grupo_cultivo_id;
    }

    /**
     * @param mixed $grupo_cultivo_id
     */
    public function setGrupoCultivoId($grupo_cultivo_id)
    {
        $this->grupo_cultivo_id = $grupo_cultivo_id;
    }

    /**
     * @return array|null
     */
    public function getCultivos()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT cultivo.id_cultivo, cultivo.nombre, cultivo.nombre_cientifico, grupo_cultivo.nombre as grupo
            FROM cultivo INNER JOIN grupo_cultivo ON cultivo.grupo_cultivo_id=grupo_cultivo.id_grupo_cultivo ORDER BY nombre');
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
    public function getCultivo($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM cultivo WHERE id_cultivo=:id_cultivo');
            $select->bindValue('id_cultivo', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setIdCultivo($registro['id_cultivo']);
            $this->setNombre($registro['nombre']);
            $this->setNombreCientifico($registro['nombre_cientifico']);
            $this->setGrupoCultivoId($registro['grupo_cultivo_id']);
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
            $select = $db->prepare('INSERT INTO  cultivo VALUES ( :id_cultivo ,  :nombre ,  :nombre_cientifico ,  :grupo_cultivo_id )');
            //Colocamos los datos
            $select->bindValue('id_cultivo', 0, PDO::PARAM_INT);
            $select->bindValue('nombre', $this->getNombre(), PDO::PARAM_STR);
            $select->bindValue('nombre_cientifico', $this->getNombreCientifico(), PDO::PARAM_STR);
            $select->bindValue('grupo_cultivo_id', $this->getGrupoCultivoId(), PDO::PARAM_INT);
            if ($select->execute())
            {
                //obtenemos el ultimo id de la tabla
                $select = $db->prepare('SELECT MAX(id_cultivo) AS id FROM cultivo');
                $select->execute();
                $id = $select->fetch();

                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Insertó el cultivo " . $id['id'] . " en la tabla cultivo";
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
    public function Update()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('UPDATE cultivo SET nombre=:nombre,nombre_cientifico=:nombre_cientifico,grupo_cultivo_id=:grupo_cultivo_id WHERE id_cultivo=:id_cultivo');
            //Colocamos los datos
            $select->bindValue('id_cultivo', $this->getIdCultivo(), PDO::PARAM_INT);
            $select->bindValue('nombre', $this->getNombre(), PDO::PARAM_STR);
            $select->bindValue('nombre_cientifico', $this->getNombreCientifico(), PDO::PARAM_STR);
            $select->bindValue('grupo_cultivo_id', $this->getGrupoCultivoId(), PDO::PARAM_INT);
            if ($select->execute())
            {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Actualizó el cultivo " . $this->getIdCultivo() . " en la tabla cultivo";
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
            $select = $db->prepare('DELETE FROM cultivo WHERE id_cultivo=:id_cultivo');
            //Colocamos los datos
            $select->bindValue('id_cultivo', $this->getIdCultivo(), PDO::PARAM_INT);
            return $select->execute();
        } catch (PDOException $exc) {
            return null;
        }
    }

    /**
     * @return int|null
     */
    public function getCultivobyId(){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('SELECT id_cultivo from cultivo where id_cultivo=:id_cultivo');
            $select->bindValue('id_cultivo', $this->getIdCultivo(), PDO::PARAM_INT);
            $select->execute();
            return $select->rowCount();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    //Funcion que busca un cultivo por su nombre
    public function buscarCultivo()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('SELECT id_cultivo from cultivo where nombre=:nombre');
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
    
    //Funcion que busca el nombre del cultivo por su ID
    public function getCulID($id){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT nombre FROM cultivo WHERE id_cultivo=:id_cultivo');
            $select->bindValue('id_cultivo', $id, PDO::PARAM_INT);
            $select->execute();
            return $select->fetch();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    public function getCultivosConsulta($query){
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
            distrito_riego.nom_dr,
            cultivo.id_cultivo,
            cultivo.nombre as cultivo
            FROM siembra_distrito
            INNER JOIN distrito_riego on distrito_riego.id_distrito_riego=siembra_distrito.distrito_riego_id
            INNER JOIN organismo on organismo.id_organismo=distrito_riego.organismo_id
            INNER JOIN estado on estado.id_estado=distrito_riego.estado_id
            INNER JOIN cultivo ON cultivo.id_cultivo = siembra_distrito.cultivo_id
            WHERE '. $query . ' GROUP BY cultivo';
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
    
    //Obtiene el id y el nombre de todos los cultivos
    public function getNamesAndIDs(){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = "SELECT id_cultivo, REPLACE (LOWER(nombre),' ','') AS nombre FROM cultivo ORDER BY nombre";
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

    public function getCultivoDTT($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT
            produccion_dtt.anioagricola_id,
            organismo.id_organismo,
            estado.id_estado,
            produccion_dtt.ciclo_id,
            produccion_dtt.dtt_id,
            cultivo.id_cultivo,
            cultivo.nombre as cultivo
            FROM produccion_dtt
            INNER JOIN cultivo on cultivo.id_cultivo=produccion_dtt.cultivo_id
            INNER JOIN distrito_temporal_tecnificado  on distrito_temporal_tecnificado.id_dtt=produccion_dtt.dtt_id
            INNER JOIN organismo on organismo.id_organismo=distrito_temporal_tecnificado.organismo_id
            INNER JOIN estado on estado.id_estado=distrito_temporal_tecnificado.estado_id WHERE ' . $query.' GROUP BY id_cultivo';
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
