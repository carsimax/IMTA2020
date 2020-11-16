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
 * Class SiembraDTT
 */
class SiembraDTT {

    private $id_siembra_dtt;
    private $modalidad;
    private $sembrada;
    private $cosechada;
    private $produccion;
    private $valor;
    private $anioagricola_id;
    private $ciclo_id;
    private $tenencia_id;
    private $cultivo_id;
    private $dtt_id;

    /**
     * Siembraunidad constructor.
     *
     */
    public function __construct()
    {
        
    }

    /**
     * @return mixed
     */
    public function getIdSiembraDTT()
    {
        return $this->id_siembra_dtt;
    }

    /**
     * @param mixed $id_siembra_dtt
     */
    public function setIdSiembraDTT($id_siembra_dtt)
    {
        $this->id_siembra_dtt = $id_siembra_dtt;
    }

    /**
     * @return mixed
     */
    public function getModalidad()
    {
        return $this->modalidad;
    }

    /**
     * @param mixed $modalidad
     */
    public function setModalidad($modalidad)
    {
        $this->modalidad = $modalidad;
    }

    /**
     * @return mixed
     */
    public function getSembrada()
    {
        return $this->sembrada;
    }

    /**
     * @param mixed $sembrada
     */
    public function setSembrada($sembrada)
    {
        $this->sembrada = $sembrada;
    }

    /**
     * @return mixed
     */
    public function getCosechada()
    {
        return $this->cosechada;
    }

    /**
     * @param mixed $cosechada
     */
    public function setCosechada($cosechada)
    {
        $this->cosechada = $cosechada;
    }

    /**
     * @return mixed
     */
    public function getProduccion()
    {
        return $this->produccion;
    }

    /**
     * @param mixed $produccion
     */
    public function setProduccion($produccion)
    {
        $this->produccion = $produccion;
    }

    /**
     * @return mixed
     */
    public function getValor()
    {
        return $this->valor;
    }

    /**
     * @param mixed $valor
     */
    public function setValor($valor)
    {
        $this->valor = $valor;
    }

    /**
     * @return mixed
     */
    public function getAnioagricolaId()
    {
        return $this->anioagricola_id;
    }

    /**
     * @param mixed $anioagricola_id
     */
    public function setAnioagricolaId($anioagricola_id)
    {
        $this->anioagricola_id = $anioagricola_id;
    }

    /**
     * @return mixed
     */
    public function getCicloId()
    {
        return $this->ciclo_id;
    }

    /**
     * @param mixed $ciclo_id
     */
    public function setCicloId($ciclo_id)
    {
        $this->ciclo_id = $ciclo_id;
    }

    /**
     * @return mixed
     */
    public function getTenenciaId()
    {
        return $this->tenencia_id;
    }

    /**
     * @param mixed $tenencia_id
     */
    public function setTenenciaId($tenencia_id)
    {
        $this->tenencia_id = $tenencia_id;
    }

    /**
     * @return mixed
     */
    public function getCultivoId()
    {
        return $this->cultivo_id;
    }

    /**
     * @param mixed $cultivo_id
     */
    public function setCultivoId($cultivo_id)
    {
        $this->cultivo_id = $cultivo_id;
    }

    /**
     * @return mixed
     */
    public function getDTTid()
    {
        return $this->dtt_id;
    }

    /**
     * @param mixed $dtt_id
     */
    public function setDTTid($dtt_id)
    {
        $this->dtt_id = $dtt_id;
    }

    /**
     * @return array|null
     * funcion para obetener todos los registros de siembras de una unidad de riego
     */
    public function getRegistrosSiembra()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT id_siembra_dtt,modalidad,sembrada, cosechada, produccion, ROUND(valor,2) as valor, cultivo.nombre AS cultivo, tenencia.nombre AS tenencia, anio.anio, ciclo.nombre AS ciclo FROM produccion_dtt, cultivo, tenencia, anio, ciclo WHERE produccion_dtt.cultivo_id=cultivo.id_cultivo AND produccion_dtt.ciclo_id=ciclo.id_ciclo AND produccion_dtt.tenencia_id=tenencia.id_tenencia AND produccion_dtt.anioagricola_id=anio.id_anio AND dtt_id=:dtt_id');
            $select->bindValue('dtt_id', $this->getDTTid(), PDO::PARAM_INT);
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
     * funcion para obetener un registro de producción agricola
     */
    public function getRegistroSiembra($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM produccion_dtt WHERE id_siembra_dtt=:id_siembra_dtt');
            $select->bindValue('id_siembra_dtt', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setIdSiembraDTT($registro['id_siembra_dtt']);
            $this->setModalidad($registro['modalidad']);
            $this->setSembrada($registro['sembrada']);
            $this->setCosechada($registro['cosechada']);
            $this->setProduccion($registro['produccion']);
            $this->setValor($registro['valor']);
            $this->setAnioagricolaId($registro['anioagricola_id']);
            $this->setCicloId($registro['ciclo_id']);
            $this->setTenenciaId($registro['tenencia_id']);
            $this->setCultivoId($registro['cultivo_id']);
            $this->setDTTid($registro['dtt_id']);
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
            $select = $db->prepare('INSERT INTO produccion_dtt VALUES (0, :modalidad,:sembrada,:cosechada,:produccion,:valor,:anioagricola_id,:ciclo_id,:tenencia_id,:cultivo_id, :dtt_id)');
            $select->bindValue('modalidad', $this->getModalidad(), PDO::PARAM_STR);
            $select->bindValue('sembrada', $this->getSembrada(), PDO::PARAM_STR);
            $select->bindValue('cosechada', $this->getCosechada(), PDO::PARAM_STR);
            $select->bindValue('produccion', $this->getProduccion(), PDO::PARAM_STR);
            $select->bindValue('valor', $this->getValor(), PDO::PARAM_STR);
            $select->bindValue('anioagricola_id', $this->getAnioagricolaId(), PDO::PARAM_INT);
            $select->bindValue('ciclo_id', $this->getCicloId(), PDO::PARAM_INT);
            $select->bindValue('tenencia_id', $this->getTenenciaId(), PDO::PARAM_INT);
            $select->bindValue('cultivo_id', $this->getCultivoId(), PDO::PARAM_INT);
            $select->bindValue('dtt_id', $this->getDTTid(), PDO::PARAM_INT);
            if ($select->execute())
            {
                //Se obtiene el ultimo registro
                $select = $db->prepare('SELECT MAX(id_siembra_dtt) AS id FROM produccion_dtt   ');
                $select->execute();
                $id = $select->fetch();
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " insertó el registro " . $id['id'] . " en la tabla produccion_dtt";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }

    public function update()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('UPDATE produccion_dtt SET 
            modalidad=:modalidad, 
            sembrada=:sembrada,            
            cosechada=:cosechada, 
            produccion=:produccion,
            valor=:valor,
            anioagricola_id=:anioagricola_id, 
            ciclo_id=:ciclo_id,
            tenencia_id=:tenencia_id,
            cultivo_id=:cultivo_id           
            WHERE id_siembra_dtt=:id_siembra_dtt');
            //Colocamos los datos
            $select->bindValue('modalidad', $this->getModalidad(), PDO::PARAM_STR);
            $select->bindValue('sembrada', $this->getSembrada(), PDO::PARAM_STR);
            $select->bindValue('cosechada', $this->getCosechada(), PDO::PARAM_STR);
            $select->bindValue('produccion', $this->getProduccion(), PDO::PARAM_STR);
            $select->bindValue('valor', $this->getValor(), PDO::PARAM_STR);
            $select->bindValue('anioagricola_id', $this->getAnioagricolaId(), PDO::PARAM_INT);
            $select->bindValue('ciclo_id', $this->getCicloId(), PDO::PARAM_INT);
            $select->bindValue('tenencia_id', $this->getTenenciaId(), PDO::PARAM_INT);
            $select->bindValue('cultivo_id', $this->getCultivoId(), PDO::PARAM_INT);
            $select->bindValue('id_siembra_dtt', $this->getIdSiembraDTT(), PDO::PARAM_INT);
            if ($select->execute())
            {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " actualizó el registro " . $this->getIdSiembraDTT() . " en la tabla produccion_dtt";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }

    public function delete()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('DELETE FROM produccion_dtt WHERE id_siembra_dtt=:id_siembra_dtt');
            //Colocamos los datos
            $select->bindValue('id_siembra_dtt', $this->getIdSiembraDTT(), PDO::PARAM_INT);            
            
            if ($select->execute())
            {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " eliminó el registro " . $this->getIdSiembraDTT() . " de la tabla produccion_dtt";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }

    public function existeSiembra()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('SELECT dtt_id FROM produccion_dtt WHERE anioagricola_id=:anioagricola_id AND dtt_id=:dtt_id AND cultivo_id=:cultivo_id AND ciclo_id=:ciclo_id AND tenencia_id=:tenencia_id AND modalidad=:modalidad');
            $select->bindValue('modalidad', $this->getModalidad(), PDO::PARAM_STR);
            $select->bindValue('dtt_id', $this->getDTTid(), PDO::PARAM_STR);
            $select->bindValue('anioagricola_id', $this->getAnioagricolaId(), PDO::PARAM_INT);
            $select->bindValue('cultivo_id', $this->getCultivoId(), PDO::PARAM_INT);
            $select->bindValue('ciclo_id', $this->getCicloId(), PDO::PARAM_INT);
            $select->bindValue('tenencia_id', $this->getTenenciaId(), PDO::PARAM_INT);
            $select->execute();
            return $select->rowCount();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }
    public function DTTTabla($query){
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
            dtt_id,
            distrito_temporal_tecnificado.nombre,
            TRUNCATE ( sum( sembrada ), 2 ) AS SEM,
            TRUNCATE ( sum( cosechada ), 2 ) AS COS,
            TRUNCATE ( sum( produccion ), 2 ) AS PROD,
            TRUNCATE ( sum( valor ), 2 ) AS VAL,
            TRUNCATE (( sum( produccion )/ sum( cosechada )), 2 ) AS REND,
            TRUNCATE ((( sum( valor ))/ sum( produccion )), 2 ) AS PMR,
            anio,
            anioagricola_id,
            cultivo_id,
            cultivo.nombre AS cultivo,
            ciclo.nombre AS ciclo,
            ciclo.id_ciclo 
            FROM
            produccion_dtt
            INNER JOIN anio ON anio.id_anio = produccion_dtt.anioagricola_id
            INNER JOIN distrito_temporal_tecnificado ON distrito_temporal_tecnificado.id_dtt = produccion_dtt.dtt_id
            INNER JOIN estado ON estado.id_estado = distrito_temporal_tecnificado.estado_id
            INNER JOIN organismo ON organismo.id_organismo=distrito_temporal_tecnificado.organismo_id
            INNER JOIN cultivo ON cultivo.id_cultivo = produccion_dtt.cultivo_id
            INNER JOIN ciclo ON ciclo.id_ciclo = produccion_dtt.ciclo_id
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
