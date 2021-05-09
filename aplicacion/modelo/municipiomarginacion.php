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
 * Class Cultivo
 */
class MunicipioMarginacion
{

    /**
     * @var
     */
    private $id_registro_municipio_municipio;
    private $pob_tot;
    private $analf;
    private $sprim;
    private $ovsde;
    private $ovsee;
    private $ovsae;
    private $vhac;
    private $ovpt;
    private $pl_5000;
    private $po2sm;
    private $im;
    private $gm;
    private $municipio_id;
    private $anio_id;

    function getId_registro()
    {
        return $this->id_registro_municipio_municipio;
    }

    function getPob_tot()
    {
        return $this->pob_tot;
    }

    function getAnalf()
    {
        return $this->analf;
    }

    function getSprim()
    {
        return $this->sprim;
    }

    function getOvsde()
    {
        return $this->ovsde;
    }

    function getOvsee()
    {
        return $this->ovsee;
    }

    function getOvsae()
    {
        return $this->ovsae;
    }

    function getVhac()
    {
        return $this->vhac;
    }

    function getOvpt()
    {
        return $this->ovpt;
    }

    function getPl_5000()
    {
        return $this->pl_5000;
    }

    function getPo2sm()
    {
        return $this->po2sm;
    }

    function getIm()
    {
        return $this->im;
    }

    function getGm()
    {
        return $this->gm;
    }

    function getMunicipio_id()
    {
        return $this->municipio_id;
    }

    function getAnio_id()
    {
        return $this->anio_id;
    }

    function setId_registro($id_registro_municipio)
    {
        $this->id_registro_municipio_municipio = $id_registro_municipio;
    }

    function setPob_tot($pob_tot)
    {
        $this->pob_tot = $pob_tot;
    }

    function setAnalf($analf)
    {
        $this->analf = $analf;
    }

    function setSprim($sprim)
    {
        $this->sprim = $sprim;
    }

    function setOvsde($ovsde)
    {
        $this->ovsde = $ovsde;
    }

    function setOvsee($ovsee)
    {
        $this->ovsee = $ovsee;
    }

    function setOvsae($ovsae)
    {
        $this->ovsae = $ovsae;
    }

    function setVhac($vhac)
    {
        $this->vhac = $vhac;
    }

    function setOvpt($ovpt)
    {
        $this->ovpt = $ovpt;
    }

    function setPl_5000($pl_5000)
    {
        $this->pl_5000 = $pl_5000;
    }

    function setPo2sm($po2sm)
    {
        $this->po2sm = $po2sm;
    }

    function setIm($im)
    {
        $this->im = $im;
    }

    function setGm($gm)
    {
        $this->gm = $gm;
    }

    function setMunicipio_id($municipio_id)
    {
        $this->municipio_id = $municipio_id;
    }

    function setAnio_id($anio_id)
    {
        $this->anio_id = $anio_id;
    }

    function __construct()
    {
    }

    /**
     * Cultivo constructor.
     */

    /**
     * @return array|null
     */
    public function getRegistros()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT id_registro_municipio,pob_tot,analf,sprim,ovsde,ovsee,ovsae,vhac,ovpt,pl_5000,po2sm,im,gm,municipio.nombre AS municipio, estado.nombre AS estado ,anio.anio
                FROM marginacion_municipio,municipio,anio,estado WHERE 
                marginacion_municipio.municipio_id=municipio.id_municipio AND
                marginacion_municipio.anio_id=anio.id_anio AND 
                municipio.estado_id=estado.id_estado ORDER BY estado');
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
    public function getRegistro($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT id_registro_municipio, pob_tot, analf, sprim, ovsde, ovsee, ovsae, vhac, ovpt, pl_5000, po2sm, im,gm,id_municipio, anio_id FROM marginacion_municipio, municipio WHERE id_registro_municipio=:id_registro_municipio AND municipio.id_municipio=marginacion_municipio.municipio_id');
            $select->bindValue('id_registro_municipio', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setId_registro($registro['id_registro_municipio']);
            $this->setPob_tot($registro['pob_tot']);
            $this->setAnalf($registro['analf']);
            $this->setSprim($registro['sprim']);
            $this->setOvsde($registro['ovsde']);
            $this->setOvsee($registro['ovsee']);
            $this->setOvsae($registro['ovsae']);
            $this->setVhac($registro['vhac']);
            $this->setOvpt($registro['ovpt']);
            $this->setPl_5000($registro['pl_5000']);
            $this->setPo2sm($registro['po2sm']);
            $this->setIm($registro['im']);
            $this->setGm($registro['gm']);
            $this->setMunicipio_id($registro['id_municipio']);
            $this->setAnio_id($registro['anio_id']);
            return $this;
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            //echo $exc->getMessage();
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
            $select = $db->prepare('INSERT INTO marginacion_municipio VALUES (:id_registro_municipio,:pob_tot,:analf,:sprim,:ovsde,:ovsee,:ovsae,:vhac,:ovpt,:pl_5000,:po2sm,:im,:gm,:municipio_id,:anio_id)');
            //Colocamos los datos
            $select->bindValue('id_registro_municipio', 0, PDO::PARAM_INT);
            $select->bindValue('pob_tot', $this->getPob_tot(), PDO::PARAM_STR);
            $select->bindValue('analf', $this->getAnalf(), PDO::PARAM_STR);
            $select->bindValue('sprim', $this->getSprim(), PDO::PARAM_STR);
            $select->bindValue('ovsde', $this->getOvsde(), PDO::PARAM_STR);
            $select->bindValue('ovsee', $this->getOvsee(), PDO::PARAM_STR);
            $select->bindValue('ovsae', $this->getOvsae(), PDO::PARAM_STR);
            $select->bindValue('vhac', $this->getVhac(), PDO::PARAM_STR);
            $select->bindValue('ovpt', $this->getOvpt(), PDO::PARAM_STR);
            $select->bindValue('pl_5000', $this->getPl_5000(), PDO::PARAM_STR);
            $select->bindValue('po2sm', $this->getPo2sm(), PDO::PARAM_STR);
            $select->bindValue('im', $this->getIm(), PDO::PARAM_STR);
            $select->bindValue('gm', $this->getGm(), PDO::PARAM_STR);
            $select->bindValue('municipio_id', $this->getMunicipio_id(), PDO::PARAM_INT);
            $select->bindValue('anio_id', $this->getAnio_id(), PDO::PARAM_INT);
            if ($select->execute()) {
                //obtenemos el ultimo id de la tabla
                $select = $db->prepare('SELECT MAX(id_registro_municipio) AS id FROM marginacion_municipio');
                $select->execute();
                $id = $select->fetch();
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Insertó el registro " . $id['id'] . " en la tabla marginacion_municipio";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            // echo $exc->getMessage();
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
            $select = $db->prepare('UPDATE marginacion_municipio SET 
                pob_tot=:pob_tot,
                analf=:analf,
                sprim=:sprim,
                ovsde=:ovsde,
                ovsee=:ovsee,
                ovsae=:ovsae,
                vhac=:vhac,
                ovpt=:ovpt,
                pl_5000=:pl_5000,
                po2sm=:po2sm,
                im=:im,
                gm=:gm,
                municipio_id=:municipio_id,
                anio_id=:anio_id WHERE id_registro_municipio=:id_registro_municipio');
            $select->bindValue('id_registro_municipio', $this->getId_registro(), PDO::PARAM_INT);
            $select->bindValue('pob_tot', $this->getPob_tot(), PDO::PARAM_STR);
            $select->bindValue('analf', $this->getAnalf(), PDO::PARAM_STR);
            $select->bindValue('sprim', $this->getSprim(), PDO::PARAM_STR);
            $select->bindValue('ovsde', $this->getOvsde(), PDO::PARAM_STR);
            $select->bindValue('ovsee', $this->getOvsee(), PDO::PARAM_STR);
            $select->bindValue('ovsae', $this->getOvsae(), PDO::PARAM_STR);
            $select->bindValue('vhac', $this->getVhac(), PDO::PARAM_STR);
            $select->bindValue('ovpt', $this->getOvpt(), PDO::PARAM_STR);
            $select->bindValue('pl_5000', $this->getPl_5000(), PDO::PARAM_STR);
            $select->bindValue('po2sm', $this->getPo2sm(), PDO::PARAM_STR);
            $select->bindValue('im', $this->getIm(), PDO::PARAM_STR);
            $select->bindValue('gm', $this->getGm(), PDO::PARAM_STR);
            $select->bindValue('municipio_id', $this->getMunicipio_id(), PDO::PARAM_INT);
            $select->bindValue('anio_id', $this->getAnio_id(), PDO::PARAM_INT);
            if ($select->execute()) {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Actualizó el registro " . $this->getId_registro() . " en la tabla marginacion_municipio";
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
    public function delete()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('DELETE FROM marginacion_municipio WHERE id_registro_municipio=:id_registro_municipio');
            //Colocamos los datos
            $select->bindValue('id_registro_municipio', $this->getId_registro(), PDO::PARAM_INT);
            return $select->execute();
        } catch (PDOException $exc) {
            return null;
        }
    }

    public function existeRegistro()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('SELECT id_registro_municipio FROM marginacion_municipio WHERE municipio_id=:municipio_id AND anio_id=:anio_id');
            $select->bindValue('municipio_id', $this->getMunicipio_id(), PDO::PARAM_INT);
            $select->bindValue('anio_id', $this->getAnio_id(), PDO::PARAM_INT);
            $select->execute();
            return $select->rowCount();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            //echo $exc->getMessage();
            return false;
        }
    }

    public function getEstados()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('SELECT estado_id, estado.nombre FROM marginacion_municipio, estado, municipio WHERE estado.id_estado=municipio.estado_id GROUP BY id_estado');
            $select->execute();
            return $select->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            //echo $exc->getMessage();
            return false;
        }
    }
    public function getAnios()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('SELECT anio_id, anio FROM marginacion_municipio, anio WHERE marginacion_municipio.anio_id=anio.id_anio GROUP BY anio_id');
            $select->execute();
            return $select->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            //echo $exc->getMessage();
            return false;
        }
    }

    public function getMunicipios($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT municipio_id, municipio.nombre from marginacion_municipio, municipio, estado WHERE marginacion_municipio.municipio_id=municipio.id_municipio AND estado.id_estado=municipio.estado_id AND (' . $query . ') GROUP BY municipio_id');
            $select->execute();
            return $select->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }

    public function getConsulta($QUERY)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('SELECT pob_tot, ROUND(analf,2) AS analf, ROUND(sprim,2) as sprim, ROUND(ovsde,2) as ovsde, ROUND(ovsee,2) as ovsee, ROUND(ovsae,2) as ovsae, ROUND(vhac,2) as vhac, ROUND(ovpt,2) as ovpt, gm, estado.nombre AS estado, municipio.nombre AS municipio FROM marginacion_municipio, estado, municipio WHERE ' . $QUERY . ' AND marginacion_municipio.municipio_id=municipio.id_municipio AND estado.id_estado = municipio.estado_id');
            $select->execute();
            return $select->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return false;
        }
    }

    public function getInfoMunicipioMapa($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT pob_tot, round(analf,2) AS analf ,round(im,2) AS im ,gm, estado.nombre AS estado, municipio.nombre AS municipio FROM marginacion_municipio, estado, municipio WHERE marginacion_municipio.municipio_id=municipio.id_municipio AND estado.id_estado = municipio.estado_id AND municipio_id=:municipio_id');
            $select->bindValue('municipio_id', $id, PDO::PARAM_INT);
            $select->execute();
            return $select->fetch();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            //echo $exc->getMessage();
            return null;
        }
    }
}
