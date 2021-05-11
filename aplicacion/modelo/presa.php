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
require_once("dbconnectionGeoespacial.php");


/**
 * Class Presa
 */
class Presa
{

    /**
     * @var
     */
    private $id_presa;
    private $nom_oficial;
    private $nom_comun;
    private $corriente;
    private $anio_term;
    private $edo_id;

    /**
     * @return mixed
     */
    public function getIdPresa()
    {
        return $this->id_presa;
    }

    /**
     * @param mixed $id_presa
     */
    public function setIdPresa($id_presa)
    {
        $this->id_presa = $id_presa;
    }

    /**
     * @return mixed
     */
    public function getNomOficial()
    {
        return $this->nom_oficial;
    }

    /**
     * @param mixed $nom_oficial
     */
    public function setNomOficial($nom_oficial)
    {
        $this->nom_oficial = $nom_oficial;
    }

    /**
     * @return mixed
     */
    public function getNomComun()
    {
        return $this->nom_comun;
    }

    /**
     * @param mixed $nom_comun
     */
    public function setNomComun($nom_comun)
    {
        $this->nom_comun = $nom_comun;
    }

    /**
     * @return mixed
     */
    public function getCorriente()
    {
        return $this->corriente;
    }

    /**
     * @param mixed $corriente
     */
    public function setCorriente($corriente)
    {
        $this->corriente = $corriente;
    }

    /**
     * @return mixed
     */
    public function getAnioTerm()
    {
        return $this->anio_term;
    }

    /**
     * @param mixed $anio_term
     */
    public function setAnioTerm($anio_term)
    {
        $this->anio_term = $anio_term;
    }

    /**
     * @return mixed
     */
    public function getEdo()
    {
        return $this->edo_id;
    }

    /**
     * @param mixed $edo_id
     */
    public function setEdo($edo_id)
    {
        $this->edo_id = $edo_id;
    }

    /**
     * Cultivo constructor.
     */
    public function __construct()
    {
    }

    public function obtenerPresas()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT id_presa, nom_oficial FROM presa');
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
    public function getNamesAndIDs()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = "SELECT id_presa, REPLACE (LOWER(nom_oficial),' ','') AS nombre FROM presa ORDER BY nombre";
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
     * @return mixed
     */
    public function getPresas($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT id_presa, nom_oficial, nom_comun, corriente, anio_term, nombre as edo FROM presa
        INNER JOIN estado on estado.id_estado=presa.edo_id WHERE ' . $query);
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
    public function getPresa($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM presa WHERE id_presa=:id_presa');
            $select->bindValue('id_presa', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setIdPresa($registro['id_presa']);
            $this->setNomOficial($registro['nom_oficial']);
            $this->setNomComun($registro['nom_comun']);
            $this->setCorriente($registro['corriente']);
            $this->setAnioTerm($registro['anio_term']);
            $this->setEdo($registro['edo_id']);
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
            $select = $db->prepare('INSERT INTO presa VALUES ( :id_presa ,  :nom_oficial ,  :nom_comun ,  :corriente , :anio_term , :edo_id)');
            //Colocamos los datos
            $select->bindValue('id_presa', $this->getIdPresa(), PDO::PARAM_INT);
            $select->bindValue('nom_oficial', $this->getNomOficial(), PDO::PARAM_STR);
            $select->bindValue('nom_comun', $this->getNomComun(), PDO::PARAM_STR);
            $select->bindValue('corriente', $this->getCorriente(), PDO::PARAM_STR);
            $select->bindValue('anio_term', $this->getAnioTerm(), PDO::PARAM_INT);
            $select->bindValue('edo_id', $this->getEdo(), PDO::PARAM_INT);
            if ($select->execute()) {
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " registró la presa " . $this->getIdPresa() . " en la tabla presa";
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
    public function update()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('UPDATE presa SET nom_oficial=:nom_oficial,nom_comun=:nom_comun,corriente=:corriente,anio_term=:anio_term,edo_id=:edo_id WHERE id_presa=:id_presa');
            //Colocamos los datos
            $select->bindValue('id_presa', $this->getIdPresa(), PDO::PARAM_INT);
            $select->bindValue('nom_oficial', $this->getNomOficial(), PDO::PARAM_STR);
            $select->bindValue('nom_comun', $this->getNomComun(), PDO::PARAM_STR);
            $select->bindValue('corriente', $this->getCorriente(), PDO::PARAM_STR);
            $select->bindValue('anio_term', $this->getAnioTerm(), PDO::PARAM_INT);
            $select->bindValue('edo_id', $this->getEdo(), PDO::PARAM_INT);
            if ($select->execute()) {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " actualizó la presa " . $this->getIdPresa() . " en la tabla presa";
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
            $select = $db->prepare('DELETE FROM presa WHERE id_presa=:id_presa');
            //Colocamos los datos
            $select->bindValue('id_presa', $this->getIdPresa(), PDO::PARAM_INT);
            $select->execute();
            $select = $db->prepare('DELETE FROM presa_volumen WHERE presa_id=:id_presa');
            //Colocamos los datos
            $select->bindValue('id_presa', $this->getIdPresa(), PDO::PARAM_INT);
            return $select->execute();
        } catch (PDOException $exc) {
            return null;
        }
    }

    /**
     * @param $query
     * @return array|null
     */
    public function getPresaEstado($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM presa WHERE ' . $query . 'GROUP BY id_presa');
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
    public function getPresaMuni($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM presa_municipio INNER JOIN presa on presa.id_presa=presa_municipio.presa_id WHERE ' . $query . 'GROUP BY id_presa');
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
    public function getPresaTabla($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = '
            SELECT 
            presa.id_presa,
            CONCAT(presa.id_presa, \' - \', presa.nom_oficial)as nombre_oficial,
            presa.corriente,
            estado.nombre as estado,
            presa.anio_term,
            presa.alt_cort,
            presa.cap_name,
            presa.cap_namo
            from presa INNER JOIN estado on estado.id_estado=presa.edo_id WHERE ' . $query;
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
    public function getJson($query)
    {
        $pdo = new DBConnectionGeoespacial();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT presa_json as json FROM sig_presa WHERE ' . $query;
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

    public function existePresa()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {

            $select = $db->prepare('SELECT id_presa FROM presa WHERE  nom_oficial=:nom_oficial');
            $select->bindValue('nom_comun', $this->getNomOficial(), PDO::PARAM_STR);
            $select->execute();
            return $select->rowCount();
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }

    public function getPresaNombre($nombre)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('SELECT id_presa from presa where nom_oficial=:nom_oficial');
            $select->bindValue('nom_oficial', $nombre, PDO::PARAM_INT);
            $select->execute();
            return $select->fetch();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }
    //Retorna el resultado de la busqueda por el id del municipio de estado y municipio
    public function getPresaId($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM presa INNER JOIN estado on estado.id_estado=presa.edo_id WHERE id_presa=:id_presa');
            $select->bindValue('id_presa', $id, PDO::PARAM_INT);
            $select->execute();
            return $select->fetch();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    public function getPresaMapa($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT nom_oficial,nombre, corriente, cap_name, cap_namo, anio_term, alt_cort, TRUNCATE(AVG(vol_alma),2)  as promedio_volumen  FROM presa INNER JOIN estado on estado.id_estado=presa.edo_id INNER JOIN presa_volumen on presa_volumen.presa_id= presa.id_presa WHERE id_presa=:id_presa GROUP BY nom_oficial');
            $select->bindValue('id_presa', $id, PDO::PARAM_INT);
            $select->execute();
            return $select->fetch();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }
}
