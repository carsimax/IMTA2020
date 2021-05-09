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
 * Class AcuiferoDisp
 */
class AcuiferoDisp {

    /**
     * @var
     * Variables de disponibilidad
     */
    private $acuifero_id;
    private $r;
    private $dnc;
    private $vcas;
    private $veala;
    private $vaptyr;
    private $vaprh;
    private $dma;
    private $anio_actualizacion;

    /**
     * @return mixed
     */
    public function getAcuiferoId()
    {
        return $this->acuifero_id;
    }

    /**
     * @param mixed $acuifero_id
     */
    public function setAcuiferoId($acuifero_id)
    {
        $this->acuifero_id = $acuifero_id;
    }

    /**
     * @return mixed
     */
    public function getR()
    {
        return $this->r;
    }

    /**
     * @param mixed $r
     */
    public function setR($r)
    {
        $this->r = $r;
    }

    /**
     * @return mixed
     */
    public function getDnc()
    {
        return $this->dnc;
    }

    /**
     * @param mixed $dnc
     */
    public function setDnc($dnc)
    {
        $this->dnc = $dnc;
    }

    /**
     * @return mixed
     */
    public function getVcas()
    {
        return $this->vcas;
    }

    /**
     * @param mixed $vcas
     */
    public function setVcas($vcas)
    {
        $this->vcas = $vcas;
    }

    /**
     * @return mixed
     */
    public function getVeala()
    {
        return $this->veala;
    }

    /**
     * @param mixed $veala
     */
    public function setVeala($veala)
    {
        $this->veala = $veala;
    }

    /**
     * @return mixed
     */
    public function getVaptyr()
    {
        return $this->vaptyr;
    }

    /**
     * @param mixed $vaptyr
     */
    public function setVaptyr($vaptyr)
    {
        $this->vaptyr = $vaptyr;
    }

    /**
     * @return mixed
     */
    public function getVaprh()
    {
        return $this->vaprh;
    }

    /**
     * @param mixed $vaprh
     */
    public function setVaprh($vaprh)
    {
        $this->vaprh = $vaprh;
    }

    /**
     * @return mixed
     */
    public function getDma()
    {
        return $this->dma;
    }

    /**
     * @param mixed $dma
     */
    public function setDma($dma)
    {
        $this->dma = $dma;
    }

    /**
     * @return mixed
     */
    public function getAnioActualizacion()
    {
        return $this->anio_actualizacion;
    }

    /**
     * @param mixed $anio_actualizacion
     */
    public function setAnioActualizacion($anio_actualizacion)
    {
        $this->anio_actualizacion = $anio_actualizacion;
    }

    /**
     * @param $id
     * @return $this|null
     * funcion para obtener la disponibilidad de un acuifero
     */
    public function getDisp($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM acuifero_disponibilidad WHERE acuifero_id=:ID');
            $select->bindValue('ID', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            //
            $this->setAcuiferoId($registro['acuifero_id']);
            $this->setR($registro['r']);
            $this->setDnc($registro['dnc']);
            $this->setVcas($registro['vcas']);
            $this->setVeala($registro['veala']);
            $this->setVaptyr($registro['vaptyr']);
            $this->setVaprh($registro['vaprh']);
            $this->setDma($registro['dma']);
            $this->setAnioActualizacion($registro['anio_actualizacion']);
            return $this;
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @return bool
     * Funcion para actualizar acuifero disponibilidad
     */
    public function update()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('UPDATE acuifero_disponibilidad SET 
        r=:r,
        dnc=:dnc,
        vcas=:vcas,
        veala=:veala,
        vaptyr=:vaptyr,
        vaprh=:vaprh,
        dma=:dma,
        anio_actualizacion=:anio_actualizacion WHERE acuifero_id=:acuifero_id');
        //Colocamos los datos
        $select->bindValue('acuifero_id', $this->getAcuiferoId(), PDO::PARAM_INT);
        $select->bindValue('r', $this->getR(), PDO::PARAM_INT);
        $select->bindValue('dnc', $this->getDnc(), PDO::PARAM_INT);
        $select->bindValue('vcas', $this->getVcas(), PDO::PARAM_INT);
        $select->bindValue('veala', $this->getVeala(), PDO::PARAM_INT);
        $select->bindValue('vaptyr', $this->getVaptyr(), PDO::PARAM_INT);
        $select->bindValue('vaprh', $this->getVaprh(), PDO::PARAM_INT);
        $select->bindValue('dma', $this->getDma(), PDO::PARAM_INT);
        $select->bindValue('anio_actualizacion', $this->getAnioActualizacion(), PDO::PARAM_INT);
        if ($select->execute())
        {
            $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
            $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Actualizó la disponibilidad del acuífero " . $this->getAcuiferoId() . " en la tabla acuifero_disponibilidad";
            $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
            return $select->execute();
        }
    }

    /**
     * @return bool|null
     * funcion para insertar acuifero disponibilidad
     */
    public function Insert()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('INSERT INTO acuifero_disponibilidad values (:acuifero_id, :r, :dnc, :vcas, :veala, :vaptyr, :vaprh, :dma, :anio_actualizacion)');
            //Colocamos los datos
            $select->bindValue('acuifero_id', $this->getAcuiferoId(), PDO::PARAM_INT);
            $select->bindValue('r', $this->getR(), PDO::PARAM_STR);
            $select->bindValue('dnc', $this->getDnc(), PDO::PARAM_STR);
            $select->bindValue('vcas', $this->getVcas(), PDO::PARAM_STR);
            $select->bindValue('veala', $this->getVeala(), PDO::PARAM_STR);
            $select->bindValue('vaptyr', $this->getVaptyr(), PDO::PARAM_STR);
            $select->bindValue('vaprh', $this->getVaprh(), PDO::PARAM_STR);
            $select->bindValue('dma', $this->getDma(), PDO::PARAM_STR);
            $select->bindValue('anio_actualizacion', $this->getAnioActualizacion(), PDO::PARAM_STR);
            if ($select->execute())
            {
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Insertó la disponibilidad del acuífero " . $this->getAcuiferoId() . " en la tabla acuifero_disponibilidad";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }

}
