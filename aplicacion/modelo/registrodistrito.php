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
 * Class RegistroDistrito
 */
class RegistroDistrito {

    /**
     * @var
     */
    private $id_registro;
    private $sup_tot;
    private $sup_rasup;
    private $sup_rasub;
    private $sup_rtot;
    private $vol_asup;
    private $vol_asub;
    private $vol_atot;
    private $anioagricola_id;
    private $distrito_riego_id;

    /**
     * RegistroDistrito constructor.
     */
    public function __construct()
    {
        
    }

    /**
     * @return mixed
     */
    public function getIdRegistro()
    {
        return $this->id_registro;
    }

    /**
     * @param mixed $id_registro
     */
    public function setIdRegistro($id_registro)
    {
        $this->id_registro = $id_registro;
    }

    /**
     * @return mixed
     */
    public function getSupTot()
    {
        return $this->sup_tot;
    }

    /**
     * @param mixed $sup_tot
     */
    public function setSupTot($sup_tot)
    {
        $this->sup_tot = $sup_tot;
    }

    /**
     * @return mixed
     */
    public function getSupRasup()
    {
        return $this->sup_rasup;
    }

    /**
     * @param mixed $sup_rasup
     */
    public function setSupRasup($sup_rasup)
    {
        $this->sup_rasup = $sup_rasup;
    }

    /**
     * @return mixed
     */
    public function getSupRasub()
    {
        return $this->sup_rasub;
    }

    /**
     * @param mixed $sup_rasub
     */
    public function setSupRasub($sup_rasub)
    {
        $this->sup_rasub = $sup_rasub;
    }

    /**
     * @return mixed
     */
    public function getSupRtot()
    {
        return $this->sup_rtot;
    }

    /**
     * @param mixed $sup_rtot
     */
    public function setSupRtot($sup_rtot)
    {
        $this->sup_rtot = $sup_rtot;
    }

    /**
     * @return mixed
     */
    public function getVolAsup()
    {
        return $this->vol_asup;
    }

    /**
     * @param mixed $vol_asup
     */
    public function setVolAsup($vol_asup)
    {
        $this->vol_asup = $vol_asup;
    }

    /**
     * @return mixed
     */
    public function getVolAsub()
    {
        return $this->vol_asub;
    }

    /**
     * @param mixed $vol_asub
     */
    public function setVolAsub($vol_asub)
    {
        $this->vol_asub = $vol_asub;
    }

    /**
     * @return mixed
     */
    public function getVolAtot()
    {
        return $this->vol_atot;
    }

    /**
     * @param mixed $vol_atot
     */
    public function setVolAtot($vol_atot)
    {
        $this->vol_atot = $vol_atot;
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
    public function getDistritoRiegoId()
    {
        return $this->distrito_riego_id;
    }

    /**
     * @param mixed $distrito_riego_id
     */
    public function setDistritoRiegoId($distrito_riego_id)
    {
        $this->distrito_riego_id = $distrito_riego_id;
    }

    /**
     * @return array|null
     * funcion para obetener todos los registros de un distrito
     */
    public function getRegistrosDistrito($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM registro_distrito WHERE distrito_riego_id=:distrito_riego_id');
            $select->bindValue('distrito_riego_id', $id, PDO::PARAM_STR);
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

    public function getRegistroDistrito($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM registro_distrito WHERE id_registro=:id_registro');
            $select->bindValue('id_registro', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setIdRegistro($registro['id_registro']);
            $this->setSupTot($registro['sup_tot']);
            $this->setSupRasup($registro['sup_rasup']);
            $this->setSupRasub($registro['sup_rasub']);
            $this->setSupRtot($registro['sup_rtot']);
            $this->setVolAsup($registro['vol_asup']);
            $this->setVolAsub($registro['vol_asub']);
            $this->setVolAtot($registro['vol_atot']);
            $this->setAnioagricolaId($registro['anioagricola_id']);
            $this->setDistritoRiegoId($registro['distrito_riego_id']);
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
            //Se valida si es que hay un registro con el mismo año
            $select = $db->prepare('SELECT COUNT(distrito_riego_id) AS num FROM registro_distrito WHERE anioagricola_id=:anioagricola_id and distrito_riego_id=:distrito_riego_id');
            $select->bindValue('distrito_riego_id', $this->getDistritoRiegoId(), PDO::PARAM_STR);
            $select->bindValue('anioagricola_id', $this->getAnioagricolaId(), PDO::PARAM_INT);
            $select->execute();
            $resul = $select->fetch();
            if ($resul['num'] >= 1)
            {
                echo 2;
            }
            else
            {
                $select = $db->prepare('INSERT INTO registro_distrito VALUES (0, :sup_tot ,  :sup_rasup ,:sup_rasub , :sup_rtot , :vol_asup ,:vol_asub ,:vol_atot ,:anioagricola_id , :distrito_riego_id)');
                $select->bindValue('sup_tot', $this->getSupTot(), PDO::PARAM_STR);
                $select->bindValue('sup_rasup', $this->getSupRasup(), PDO::PARAM_STR);
                $select->bindValue('sup_rasub', $this->getSupRasub(), PDO::PARAM_STR);
                $select->bindValue('sup_rtot', $this->getSupRtot(), PDO::PARAM_STR);
                $select->bindValue('vol_asup', $this->getVolAsup(), PDO::PARAM_STR);
                $select->bindValue('vol_asub', $this->getVolAsub(), PDO::PARAM_STR);
                $select->bindValue('vol_atot', $this->getVolAtot(), PDO::PARAM_STR);
                $select->bindValue('anioagricola_id', $this->getAnioagricolaId(), PDO::PARAM_INT);
                $select->bindValue('distrito_riego_id', $this->getDistritoRiegoId(), PDO::PARAM_STR);
                if ($select->execute())
                {
                    //Se obtiene el ultimo registro
                    $select = $db->prepare('SELECT MAX(id_registro) AS id FROM registro_distrito');
                    $select->execute();
                    $id = $select->fetch();
                    $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                    $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " insertó el registro " . $id['id'] . " en la tabla registro_distrito";
                    $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                    return $select->execute();
                }
            }
        } catch (PDOException $exc) {
            echo $exc;
            return null;
        }
    }

    public function update()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('UPDATE registro_distrito SET sup_tot=:sup_tot, sup_rasup=:sup_rasup,sup_rasub=:sup_rasub,sup_rtot=:sup_rtot,vol_asup=:vol_asup,vol_asub=:vol_asub,vol_atot=:vol_atot,anioagricola_id=:anioagricola_id WHERE id_registro=:id_registro');
            //Colocamos los datos
            $select->bindValue('sup_tot', $this->getSupTot(), PDO::PARAM_STR);
            $select->bindValue('sup_rasup', $this->getSupRasup(), PDO::PARAM_STR);
            $select->bindValue('sup_rasub', $this->getSupRasub(), PDO::PARAM_STR);
            $select->bindValue('sup_rtot', $this->getSupRtot(), PDO::PARAM_STR);
            $select->bindValue('vol_asup', $this->getVolAsup(), PDO::PARAM_STR);
            $select->bindValue('vol_asub', $this->getVolAsub(), PDO::PARAM_STR);
            $select->bindValue('vol_atot', $this->getVolAtot(), PDO::PARAM_STR);
            $select->bindValue('anioagricola_id', $this->getAnioagricolaId(), PDO::PARAM_INT);
            $select->bindValue('id_registro', $this->getIdRegistro(), PDO::PARAM_INT);
            if ($select->execute())
            {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " actualizó el registro " . $this->getIdRegistro() . " en la tabla registro_distrito";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            return null;
        }
    }

    public function delete()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('DELETE FROM registro_distrito WHERE id_registro=:id_registro');
            //Colocamos los datos
            $select->bindValue('id_registro', $this->getIdRegistro(), PDO::PARAM_INT);
            if ($select->execute())
            {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " eliminó el registro " . $this->getIdRegistro();
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            return null;
        }
    }

    public function existeRegistro()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('SELECT distrito_riego_id FROM registro_distrito WHERE anioagricola_id=:anioagricola_id and distrito_riego_id=:distrito_riego_id');
            $select->bindValue('distrito_riego_id', $this->getDistritoRiegoId(), PDO::PARAM_STR);
            $select->bindValue('anioagricola_id', $this->getAnioagricolaId(), PDO::PARAM_INT);
            $select->execute();
            return $select->rowCount();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return false;
        }
    }

}
