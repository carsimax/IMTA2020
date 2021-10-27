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
set_time_limit(300);

/**
 * Para que el controlador funcione de forma correcta, es necesario la llamada a los modelos necesarios en el mismo.
 */
require_once("dbconnection.php");
require_once("dbconnectionGeoespacial.php");


/**
 * Class Acuifero
 */
class Acuifero {

    /**
     * @var
     * Variables de acuifero
     */
    private $id_acuifero;
    private $nombre;
    private $fecha_dof;
    private $fecha_repda;
    private $longitud;
    private $latitud;
    private $estado_id;
    private $area;

    /**
     * @return mixed
     */
    public function getArea()
    {
        return $this->area;
    }

    /**
     * @param mixed $area
     */
    public function setArea($area)
    {
        $this->area = $area;
    }

    /**
     * Acuifero constructor.
     */
    public function __construct()
    {
        
    }

    /**
     * @return array|null
     * Obtener todos los registros
     */
    public function getTodos($query){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT acuifero.id_acuifero, acuifero.nombre,acuifero.estado_id, acuifero.fecha_dof, acuifero.fecha_repda, acuifero.longitud, acuifero.latitud, estado.nombre AS estado from acuifero INNER JOIN estado ON estado.id_estado=acuifero.estado_id '
                    . 'WHERE '.$query);
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

    
    public function getTodos2(){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT acuifero.id_acuifero, acuifero.nombre,acuifero.estado_id, acuifero.fecha_dof, acuifero.fecha_repda, acuifero.longitud, acuifero.latitud, estado.nombre AS estado from acuifero INNER JOIN estado ON estado.id_estado=acuifero.estado_id ');
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
     * @return Acuifero|null
     * Funcion para obtener un acuifero
     */
    public function getAcuifero($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM acuifero WHERE id_acuifero=:ID');
            $select->bindValue('ID', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $Acuifero = new Acuifero();
            $Acuifero->setIDAcuifero($registro['id_acuifero']);
            $Acuifero->setEstadoID($registro['estado_id']);
            $Acuifero->setNombre($registro['nombre']);
            $Acuifero->setFechaDOF($registro['fecha_dof']);
            $Acuifero->setFechaREPDA($registro['fecha_repda']);
            $Acuifero->setLongitud($registro['longitud']);
            $Acuifero->setLatitud($registro['latitud']);
            $Acuifero->setArea($registro['area']);
            return $Acuifero;
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }
    public function getAcuiferoSIG($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql='SELECT * FROM v_estado_acu WHERE id_acuifero=' . $id;
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
     * @return bool
     * Funcion para actualizar un acuifero
     */
    public function update()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('UPDATE acuifero SET 
        nombre=:nombre,
        fecha_dof=:fecha_dof,
        fecha_repda=:fecha_repda,
        longitud=:longitud,
        latitud=:latitud,
        area=:area,
        estado_id=:estado_id WHERE id_acuifero=:id_acuifero ');
        //Colocamos los datos
        $select->bindValue('id_acuifero', $this->getIdAcuifero(), PDO::PARAM_INT);
        $select->bindValue('estado_id', $this->getEstadoId(), PDO::PARAM_INT);
        $select->bindValue('nombre', $this->getNombre(), PDO::PARAM_STR);
        $select->bindValue('fecha_dof', $this->getFechaDof(), PDO::PARAM_STR);
        $select->bindValue('fecha_repda', $this->getFechaRepda(), PDO::PARAM_STR);
        $select->bindValue('longitud', $this->getLongitud(), PDO::PARAM_STR);
        $select->bindValue('latitud', $this->getLatitud(), PDO::PARAM_STR);
        $select->bindValue('area', $this->getArea(), PDO::PARAM_STR);
        if ($select->execute())
        {
            $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
            $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Modificó el acuífero con ID= " . $this->getIdAcuifero() . " en la tabla acuifero";
            $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
            return $select->execute();
        }
    }

    /**
     * @return mixed
     */
    public function getIdAcuifero()
    {
        return $this->id_acuifero;
    }

    /**
     * @param mixed $id_acuifero
     */
    public function setIdAcuifero($id_acuifero)
    {
        $this->id_acuifero = $id_acuifero;
    }

    /**
     * @return mixed
     */
    public function getEstadoId()
    {
        return $this->estado_id;
    }

    /**
     * @param mixed $estado_id
     */
    public function setEstadoId($estado_id)
    {
        $this->estado_id = $estado_id;
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
    public function getFechaDof()
    {
        return $this->fecha_dof;
    }

    /**
     * @param mixed $fecha_dof
     */
    public function setFechaDof($fecha_dof)
    {
        $this->fecha_dof = $fecha_dof;
    }

    /**
     * @return mixed
     */
    public function getFechaRepda()
    {
        return $this->fecha_repda;
    }

    /**
     * @param mixed $fecha_repda
     */
    public function setFechaRepda($fecha_repda)
    {
        $this->fecha_repda = $fecha_repda;
    }

    /**
     * @return mixed
     */
    public function getLongitud()
    {
        return $this->longitud;
    }

    /**
     * @param mixed $longitud
     */
    public function setLongitud($longitud)
    {
        $this->longitud = $longitud;
    }

    /**
     * @return mixed
     */
    public function getLatitud()
    {
        return $this->latitud;
    }

    /**
     * @param mixed $latitud
     */
    public function setLatitud($latitud)
    {
        $this->latitud = $latitud;
    }

    /**
     * @return bool|null
     * Funcion para insertar Acuifero
     */
    public function Insert()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('INSERT INTO acuifero values (:id_acuifero, :nombre, :fecha_dof, :fecha_repda, :longitud, :latitud, :estado_id,:area)');
            //Colocamos los datos
            $select->bindValue('id_acuifero', $this->getIdAcuifero(), PDO::PARAM_INT);
            $select->bindValue('nombre', $this->getNombre());
            $select->bindValue('fecha_dof', $this->getFechaDof(), PDO::PARAM_STR);
            $select->bindValue('fecha_repda', $this->getFechaRepda(), PDO::PARAM_STR);
            $select->bindValue('longitud', $this->getLongitud(), PDO::PARAM_STR);
            $select->bindValue('latitud', $this->getLatitud(), PDO::PARAM_STR);
            $select->bindValue('estado_id', $this->getEstadoId(), PDO::PARAM_INT);
            $select->bindValue('area', $this->getArea(), PDO::PARAM_STR);
            if ($select->execute())
            {
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Registró el acuífero con ID= " . $this->getIdAcuifero() . " en la tabla acuifero";
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
     * Funcion para eliminar acuifero
     */
    public function delete()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('DELETE FROM acuifero WHERE id_acuifero=:id_acuifero');
            //Colocamos los datos
            $select->bindValue('id_acuifero', $this->getIdAcuifero(), PDO::PARAM_INT);
            if ($select->execute())
            {
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Eliminó el acuífero con ID= " . $this->getIdAcuifero() . " en la tabla acuifero";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            return null;
        }
    }

    /**
     * @param $query
     * @return array|null
     * Obtener la relacion de acuifero - Estado
     */
    public function getAcuEstado($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT id_acuifero,nombre FROM acuifero WHERE ' . $query . 'GROUP BY id_acuifero';
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
     * Funcion para obtener la informacion para la tabla
     */
    public function getAcuTabla($query)
    {

        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = '
            SELECT
            organismo.id_organismo,
            CONCAT(organismo.numero, \'-\', organismo.nombre) as Organismo,
            estado.id_estado,
            estado.nombre as Estado,
            municipio.id_municipio,
            municipio.nombre as Municipio,
            acuifero.id_acuifero,
            CONCAT(acuifero.id_acuifero, \'-\', acuifero.nombre) as Acuifero,
            ROUND((SUM(acuifero_municipio.area)/acuifero.area)*acuifero_disponibilidad.r,2) as R,
            ROUND((SUM(acuifero_municipio.area)/acuifero.area)*acuifero_disponibilidad.dnc,2) as DNC,
            ROUND((SUM(acuifero_municipio.area)/acuifero.area)*acuifero_disponibilidad.vcas,2) as VCAS,
            ROUND((SUM(acuifero_municipio.area)/acuifero.area)*acuifero_disponibilidad.veala,2) as VEALA,
            ROUND((SUM(acuifero_municipio.area)/acuifero.area)*acuifero_disponibilidad.vaptyr,2) as VAPTYR,
            ROUND((SUM(acuifero_municipio.area)/acuifero.area)*acuifero_disponibilidad.vaprh,2) as VAPRH,
            ROUND((SUM(acuifero_municipio.area)/acuifero.area)*acuifero_disponibilidad.dma,2) as DMA,
            ROUND(((SUM(acuifero_municipio.area)/acuifero.area)*acuifero_disponibilidad.vcas)+((SUM(acuifero_municipio.area)/acuifero.area)*acuifero_disponibilidad.veala)+((SUM(acuifero_municipio.area)/acuifero.area)*acuifero_disponibilidad.vaptyr)+((SUM(acuifero_municipio.area)/acuifero.area)*acuifero_disponibilidad.vaptyr),2) as VEAS,
            ROUND((1-((((SUM(acuifero_municipio.area)/acuifero.area)*acuifero_disponibilidad.vcas)+((SUM(acuifero_municipio.area)/acuifero.area)*acuifero_disponibilidad.veala)+((SUM(acuifero_municipio.area)/acuifero.area)*acuifero_disponibilidad.vaptyr)+((SUM(acuifero_municipio.area)/acuifero.area)*acuifero_disponibilidad.vaptyr))/((SUM(acuifero_municipio.area)/acuifero.area)*acuifero_disponibilidad.r)))*100,2) as Disp
            from acuifero_municipio
            LEFT JOIN acuifero on acuifero.id_acuifero=acuifero_municipio.acuifero_id 
            LEFT JOIN acuifero_disponibilidad on acuifero_disponibilidad.acuifero_id=acuifero.id_acuifero
            LEFT JOIN estado on estado.id_estado=acuifero_municipio.estado_id
            LEFT JOIN municipio on municipio.id_municipio=acuifero_municipio.municipio_id 
            LEFT JOIN organismo_estado on organismo_estado.estado_id=estado.id_estado and organismo_estado.organismo_id=municipio.organismo_id
            LEFT JOIN organismo on organismo.id_organismo=municipio.organismo_id
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

    /**
     * @return int|null
     * Funcion para obtener un acuifero
     */
    public function getAcu()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('SELECT id_acuifero from acuifero where id_acuifero=:id_acuifero');
            $select->bindValue('id_acuifero', $this->getIdAcuifero(), PDO::PARAM_INT);
            $select->execute();
            return $select->rowCount();
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
         //Realizamos la consulta
         $sql='SELECT acuifero_json as json FROM sig_acuifero WHERE ' . $query;
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
