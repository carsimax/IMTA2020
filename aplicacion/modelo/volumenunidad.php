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
 * Class Volumenunidad
 */
class VolumenUnidad {

    /**
     * @var
     */
    private $id_volumen_unidad;
    private $superficie_regada1;
    private $volumen_distribuido1;
    private $usuarios1;
    private $superficie_regada2;
    private $volumen_distribuido2;
    private $usuarios2;
    private $superficie_regada3;
    private $volumen_distribuido3;
    private $usuarios3;
    private $anio_id;
    private $fuente_id;
    private $tenencia_id;
    private $unidad_riego_id;

    /**
     * Volumenunidad constructor.
     */
    public function __construct()
    {
        $this->superficie_regada1 = 0;
        $this->volumen_distribuido1 = 0;
        $this->usuarios1 = 0;
        $this->superficie_regada2 = 0;
        $this->volumen_distribuido2 = 0;
        $this->usuarios2 = 0;
        $this->superficie_regada3 = 0;
        $this->volumen_distribuido3 = 0;
        $this->usuarios3 = 0;
    }

    /**
     * @return mixed
     */
    public function getIdVolumenUnidad()
    {
        return $this->id_volumen_unidad;
    }

    /**
     * @param mixed $id_volumen_unidad
     */
    public function setIdVolumenUnidad($id_volumen_unidad)
    {
        $this->id_volumen_unidad = $id_volumen_unidad;
    }

    /**
     * @return mixed
     */
    public function getSuperficieRegada1()
    {
        return $this->superficie_regada1;
    }

    /**
     * @param mixed $superficie_regada1
     */
    public function setSuperficieRegada1($superficie_regada1)
    {
        $this->superficie_regada1 = $superficie_regada1;
    }

    /**
     * @return mixed
     */
    public function getVolumenDistribuido1()
    {
        return $this->volumen_distribuido1;
    }

    /**
     * @param mixed $volumen_distribuido1
     */
    public function setVolumenDistribuido1($volumen_distribuido1)
    {
        $this->volumen_distribuido1 = $volumen_distribuido1;
    }

    /**
     * @return mixed
     */
    public function getUsuarios1()
    {
        return $this->usuarios1;
    }

    /**
     * @param mixed $usuarios1
     */
    public function setUsuarios1($usuarios1)
    {
        $this->usuarios1 = $usuarios1;
    }

    /**
     * @return mixed
     */
    public function getSuperficieRegada2()
    {
        return $this->superficie_regada2;
    }

    /**
     * @param mixed $superficie_regada2
     */
    public function setSuperficieRegada2($superficie_regada2)
    {
        $this->superficie_regada2 = $superficie_regada2;
    }

    /**
     * @return mixed
     */
    public function getVolumenDistribuido2()
    {
        return $this->volumen_distribuido2;
    }

    /**
     * @param mixed $volumen_distribuido2
     */
    public function setVolumenDistribuido2($volumen_distribuido2)
    {
        $this->volumen_distribuido2 = $volumen_distribuido2;
    }

    /**
     * @return mixed
     */
    public function getUsuarios2()
    {
        return $this->usuarios2;
    }

    /**
     * @param mixed $usuarios2
     */
    public function setUsuarios2($usuarios2)
    {
        $this->usuarios2 = $usuarios2;
    }

    /**
     * @return mixed
     */
    public function getSuperficieRegada3()
    {
        return $this->superficie_regada3;
    }

    /**
     * @param mixed $superficie_regada3
     */
    public function setSuperficieRegada3($superficie_regada3)
    {
        $this->superficie_regada3 = $superficie_regada3;
    }

    /**
     * @return mixed
     */
    public function getVolumenDistribuido3()
    {
        return $this->volumen_distribuido3;
    }

    /**
     * @param mixed $volumen_distribuido3
     */
    public function setVolumenDistribuido3($volumen_distribuido3)
    {
        $this->volumen_distribuido3 = $volumen_distribuido3;
    }

    /**
     * @return mixed
     */
    public function getUsuarios3()
    {
        return $this->usuarios3;
    }

    /**
     * @param mixed $usuarios3
     */
    public function setUsuarios3($usuarios3)
    {
        $this->usuarios3 = $usuarios3;
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
    public function getFuenteId()
    {
        return $this->fuente_id;
    }

    /**
     * @param mixed $fuente_id
     */
    public function setFuenteId($fuente_id)
    {
        $this->fuente_id = $fuente_id;
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
    public function getUnidadRiegoId()
    {
        return $this->unidad_riego_id;
    }

    /**
     * @param mixed $unidad_riego_id
     */
    public function setUnidadRiegoId($unidad_riego_id)
    {
        $this->unidad_riego_id = $unidad_riego_id;
    }

    /**
     * @return array|null
     * funcion para obetener todos los registros de un unidad
     */
    public function getRegistrosVolumen($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM volumen_unidad_riego WHERE unidad_riego_id=:unidad_riego_id');
            $select->bindValue('unidad_riego_id', $id, PDO::PARAM_STR);
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
     * funcion para obetener un registro volumétrico de un unidad
     */
    public function getRegistroVolumen($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM volumen_unidad_riego WHERE id_volumen_unidad=:id_volumen_unidad');
            $select->bindValue('id_volumen_unidad', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setIdVolumenunidad($registro['id_volumen_unidad']);
            $this->setSuperficieRegada1($registro['superficie_regada1']);
            $this->setVolumenDistribuido1($registro['volumen_distribuido1']);
            $this->setUsuarios1($registro['usuarios1']);
            $this->setSuperficieRegada2($registro['superficie_regada2']);
            $this->setVolumenDistribuido2($registro['volumen_distribuido2']);
            $this->setUsuarios2($registro['usuarios2']);
            $this->setSuperficieRegada3($registro['superficie_regada3']);
            $this->setVolumenDistribuido3($registro['volumen_distribuido3']);
            $this->setUsuarios3($registro['usuarios3']);
            $this->setAnioId($registro['anio_id']);
            $this->setFuenteId($registro['fuente_id']);
            $this->setTenenciaId($registro['tenencia_id']);
            $this->setUnidadRiegoId($registro['unidad_riego_id']);
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
            $select = $db->prepare('SELECT COUNT(unidad_riego_id) AS num FROM volumen_unidad_riego WHERE anio_id=:anio_id and unidad_riego_id=:unidad_riego_id');
            $select->bindValue('unidad_riego_id', $this->getUnidadRiegoId(), PDO::PARAM_STR);
            $select->bindValue('anio_id', $this->getAnioId(), PDO::PARAM_INT);
            $select->execute();
            $resul = $select->fetch();
            if ($resul['num'] >= 1)
            {
                echo 2;
            }
            else
            {
                $select = $db->prepare('INSERT INTO volumen_unidad_riego VALUES (0, :superficie_regada1, :volumen_distribuido1, :usuarios1, :superficie_regada2, :volumen_distribuido2, :usuarios2 , :superficie_regada3, :volumen_distribuido3, :usuarios3, :anio_id, :fuente_id, :tenencia_id, :unidad_riego_id)');
                $select->bindValue('superficie_regada1', $this->getSuperficieRegada1(), PDO::PARAM_STR);
                $select->bindValue('volumen_distribuido1', $this->getVolumenDistribuido1(), PDO::PARAM_STR);
                $select->bindValue('usuarios1', $this->getUsuarios1(), PDO::PARAM_INT);
                $select->bindValue('superficie_regada2', $this->getSuperficieRegada2(), PDO::PARAM_STR);
                $select->bindValue('volumen_distribuido2', $this->getVolumenDistribuido2(), PDO::PARAM_STR);
                $select->bindValue('usuarios2', $this->getUsuarios2(), PDO::PARAM_INT);
                $select->bindValue('superficie_regada3', $this->getSuperficieRegada3(), PDO::PARAM_STR);
                $select->bindValue('volumen_distribuido3', $this->getVolumenDistribuido3(), PDO::PARAM_STR);
                $select->bindValue('usuarios3', $this->getUsuarios3(), PDO::PARAM_INT);
                $select->bindValue('anio_id', $this->getAnioId(), PDO::PARAM_INT);
                $select->bindValue('fuente_id', $this->getFuenteId(), PDO::PARAM_INT);
                $select->bindValue('tenencia_id', $this->getTenenciaId(), PDO::PARAM_INT);
                $select->bindValue('unidad_riego_id', $this->getUnidadRiegoId(), PDO::PARAM_STR);
                if ($select->execute())
                {
                    //Se obtiene el ultimo registro
                    $select = $db->prepare('SELECT MAX(id_volumen_unidad) AS id FROM volumen_unidad_riego');
                    $select->execute();
                    $id = $select->fetch();
                    $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                    $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " insertó el registro volumétrico " . $id['id'] . " en la tabla volumen_unidad";
                    $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                    return $select->execute();
                }
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
            $select = $db->prepare('UPDATE volumen_unidad_riego SET 
            superficie_regada1=:superficie_regada1, 
            volumen_distribuido1=:volumen_distribuido1,
            usuarios1=:usuarios1,
            superficie_regada2=:superficie_regada2, 
            volumen_distribuido2=:volumen_distribuido2,
            usuarios2=:usuarios2,
            superficie_regada3=:superficie_regada3, 
            volumen_distribuido3=:volumen_distribuido3,
            usuarios3=:usuarios3,
            anio_id=:anio_id,
            fuente_id=:fuente_id,
            tenencia_id=:tenencia_id
            WHERE id_volumen_unidad=:id_volumen_unidad');
            //Colocamos los datos
            $select->bindValue('id_volumen_unidad', $this->getIdVolumenUnidad(), PDO::PARAM_STR);
            $select->bindValue('superficie_regada1', $this->getSuperficieRegada1(), PDO::PARAM_STR);
            $select->bindValue('volumen_distribuido1', $this->getVolumenDistribuido1(), PDO::PARAM_STR);
            $select->bindValue('usuarios1', $this->getUsuarios1(), PDO::PARAM_INT);
            $select->bindValue('superficie_regada2', $this->getSuperficieRegada2(), PDO::PARAM_STR);
            $select->bindValue('volumen_distribuido2', $this->getVolumenDistribuido2(), PDO::PARAM_STR);
            $select->bindValue('usuarios2', $this->getUsuarios2(), PDO::PARAM_INT);
            $select->bindValue('superficie_regada3', $this->getSuperficieRegada3(), PDO::PARAM_STR);
            $select->bindValue('volumen_distribuido3', $this->getVolumenDistribuido3(), PDO::PARAM_STR);
            $select->bindValue('usuarios3', $this->getUsuarios3(), PDO::PARAM_INT);
            $select->bindValue('anio_id', $this->getAnioId(), PDO::PARAM_INT);
            $select->bindValue('fuente_id', $this->getFuenteId(), PDO::PARAM_INT);
            $select->bindValue('tenencia_id', $this->getTenenciaId(), PDO::PARAM_INT);
            if ($select->execute())
            {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " actualizó el registro " . $this->getIdVolumenUnidad() . " en la tabla volumen_unidad";
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
            $select = $db->prepare('DELETE FROM volumen_unidad_riego WHERE id_volumen_unidad=:id_volumen_unidad');
            //Colocamos los datos
            $select->bindValue('id_volumen_unidad', $this->getIdVolumenUnidad(), PDO::PARAM_INT);
            if ($select->execute())
            {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " eliminó el registro " . $this->getIdVolumenUnidad() . " de la tabla volumen_unidad";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }

    public function existeRegistro()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('SELECT unidad_riego_id FROM volumen_unidad_riego WHERE unidad_riego_id=:unidad_riego_id AND anio_id=:anio_id AND fuente_id=:fuente_id AND tenencia_id=:tenencia_id AND unidad_riego_id=:unidad_riego_id');
            $select->bindValue('unidad_riego_id', $this->getUnidadRiegoId(), PDO::PARAM_STR);
            $select->bindValue('anio_id', $this->getAnioId(), PDO::PARAM_INT);
            $select->bindValue('fuente_id', $this->getFuenteId(), PDO::PARAM_INT);
            $select->bindValue('tenencia_id', $this->getTenenciaId(), PDO::PARAM_INT);
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
