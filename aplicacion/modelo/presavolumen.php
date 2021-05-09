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
 * Class PresaVolumen
 */
class PresaVolumen
{

    /**
     * @var
     */
    private $id_presa_volumen;
    private $alt_cort;
    private $cap_name;
    private $cap_namo;
    private $vol_alma;
    private $presa_id;
    private $anio_id;

    /**
     * Cultivo constructor.
     */
    public function __construct()
    {
    }

    /**
     * @param $id
     * @return $this|null
     */
    public function getPresaVolumen($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM presa_volumen WHERE id_presa_volumen=:id_presa_volumen');
            $select->bindValue('id_presa_volumen', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setIdPresaVolumen($registro['id_presa_volumen']);
            $this->setAltCort($registro['alt_cort']);
            $this->setCapName($registro['cap_name']);
            $this->setCapNamo($registro['cap_namo']);
            $this->setVolAlma($registro['vol_alma']);
            $this->setPresaId($registro['presa_id']);
            $this->setAnioId($registro['anio_id']);
            return $this;
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @param $id
     * @return array|null
     */
    public function getRegistrosPresaVolumen($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM presa_volumen WHERE presa_id=:presa_id');
            $select->bindValue('presa_id', $id, PDO::PARAM_INT);
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
     * @return bool|null
     */
    public function insert()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('INSERT INTO presa_volumen VALUES (0, :alt_cort ,  :cap_name ,  :cap_namo ,  :vol_alma , :presa_id , :anio_id)');
            $select->bindValue('alt_cort', $this->getAltCort(), PDO::PARAM_INT);
            $select->bindValue('cap_name', $this->getCapName(), PDO::PARAM_INT);
            $select->bindValue('cap_namo', $this->getCapNamo(), PDO::PARAM_INT);
            $select->bindValue('vol_alma', $this->getVolAlma(), PDO::PARAM_INT);
            $select->bindValue('presa_id', $this->getPresaId(), PDO::PARAM_INT);
            $select->bindValue('anio_id', $this->getAnioId(), PDO::PARAM_INT);
            if ($select->execute()) {
                //Se obtiene el ultimo registro
                $select = $db->prepare('SELECT MAX(id_presa_volumen) AS id FROM presa_volumen');
                $select->execute();
                $id = $select->fetch();
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " insertó el registro volumétrico " . $id['id'] . " en la tabla presa_volumen";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            echo $exc;
            return null;
        }
    }

    public function existeRegistro()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('SELECT presa_id FROM presa_volumen WHERE presa_id=:presa_id AND anio_id=:anio_id');
            $select->bindValue('presa_id', $this->getPresaId(), PDO::PARAM_INT);
            $select->bindValue('anio_id', $this->getAnioId(), PDO::PARAM_INT);
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
     * @return mixed
     */
    public function getPresaId()
    {
        return $this->presa_id;
    }

    /**
     * @param mixed $presa_id
     */
    public function setPresaId($presa_id)
    {
        $this->presa_id = $presa_id;
    }

    /**
     * @return mixed
     */
    public function getAnioId()
    {
        return $this->anio_id;
    }

    /**
     * @param mixed $anio_id
     */
    public function setAnioId($anio_id)
    {
        $this->anio_id = $anio_id;
    }

    /**
     * @return mixed
     */
    public function getAltCort()
    {
        return $this->alt_cort;
    }

    /**
     * @param mixed $alt_cort
     */
    public function setAltCort($alt_cort)
    {
        $this->alt_cort = $alt_cort;
    }

    /**
     * @return mixed
     */
    public function getCapName()
    {
        return $this->cap_name;
    }

    /**
     * @param mixed $cap_name
     */
    public function setCapName($cap_name)
    {
        $this->cap_name = $cap_name;
    }

    /**
     * @return mixed
     */
    public function getCapNamo()
    {
        return $this->cap_namo;
    }

    /**
     * @param mixed $cap_namo
     */
    public function setCapNamo($cap_namo)
    {
        $this->cap_namo = $cap_namo;
    }

    /**
     * @return mixed
     */
    public function getVolAlma()
    {
        return $this->vol_alma;
    }

    /**
     * @return mixed
     */
    //funcion para obetener un registro volumétricos de una presa

    /**
     * @param mixed $vol_alma
     */
    public function setVolAlma($vol_alma)
    {
        $this->vol_alma = $vol_alma;
    }

    /**
     * @return bool|null
     */
    public function update()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('UPDATE presa_volumen SET alt_cort=:alt_cort,cap_name=:cap_name,cap_namo=:cap_namo, vol_alma=:vol_alma, anio_id=:anio_id WHERE id_presa_volumen=:id_presa_volumen');
            //Colocamos los datos
            $select->bindValue('id_presa_volumen', $this->getIdPresaVolumen(), PDO::PARAM_INT);
            $select->bindValue('alt_cort', $this->getAltCort(), PDO::PARAM_INT);
            $select->bindValue('cap_name', $this->getCapName(), PDO::PARAM_INT);
            $select->bindValue('cap_namo', $this->getCapNamo(), PDO::PARAM_INT);
            $select->bindValue('vol_alma', $this->getVolAlma(), PDO::PARAM_INT);
            $select->bindValue('anio_id', $this->getAnioId(), PDO::PARAM_INT);
            if ($select->execute()) {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " actualizó el registro volumétrico " . $this->getIdPresaVolumen() . " en la tabla presa_volumen'";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            return null;
        }
    }

    /**
     * @return mixed
     */
    public function getIdPresaVolumen()
    {
        return $this->id_presa_volumen;
    }

    /**
     * @param mixed $id_presa_volumen
     */
    public function setIdPresaVolumen($id_presa_volumen)
    {
        $this->id_presa_volumen = $id_presa_volumen;
    }

    /**
     * @return bool|null
     */
    public function delete()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('DELETE FROM presa_volumen WHERE id_presa_volumen=:id_presa_volumen');
            //Colocamos los datos
            $select->bindValue('id_presa_volumen', $this->getIdPresaVolumen(), PDO::PARAM_INT);
            return $select->execute();
        } catch (PDOException $exc) {
            return null;
        }
    }

    /**
     * @param $query
     * @return array|null
     */
    public function getPresaVol($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT presa_id,nom_oficial, vol_alma, anio  FROM presa_volumen INNER JOIN anio on anio.id_anio=presa_volumen.anio_id
            INNER JOIN presa on presa.id_presa=presa_volumen.presa_id WHERE presa_id=:presa_id');
            $select->bindValue('presa_id', $query, PDO::PARAM_INT);
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

    public function getPresaVolT($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM presa_volumen INNER JOIN anio on anio.id_anio=presa_volumen.anio_id
            INNER JOIN presa on presa.id_presa=presa_volumen.presa_id WHERE ' . $query);
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
