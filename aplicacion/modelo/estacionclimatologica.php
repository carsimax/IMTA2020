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
 * Class EstacionClimatologica
 */
class EstacionClimatologica {

    private $id_estacion_climatologica;
    private $clave_omm;
    private $nombre;
    private $municipio_id;
    private $cuenca_id;
    private $subcuenca_id;
    private $tipo;
    private $organismo_id;
    private $fechainicio;
    private $fechafin;
    private $situacion;
    private $latitud;
    private $longitud;
    private $altura;
    private $observaciones;

    function __construct()
    {
        
    }

    function getIdEstacionClimatologica()
    {
        return $this->id_estacion_climatologica;
    }

    function getClave_omm()
    {
        return $this->clave_omm;
    }

    function getNombre()
    {
        return $this->nombre;
    }

    function getMunicipio_id()
    {
        return $this->municipio_id;
    }

    function getCuenca_id()
    {
        return $this->cuenca_id;
    }

    function getSubcuenca_id()
    {
        return $this->subcuenca_id;
    }

    function getTipo()
    {
        return $this->tipo;
    }

    function getOrganismo_id()
    {
        return $this->organismo_id;
    }

    function getFechainicio()
    {
        return $this->fechainicio;
    }

    function getFechafin()
    {
        return $this->fechafin;
    }

    function getSituacion()
    {
        return $this->situacion;
    }

    function getLatitud()
    {
        return $this->latitud;
    }

    function getLongitud()
    {
        return $this->longitud;
    }

    function getAltura()
    {
        return $this->altura;
    }

    function getObservaciones()
    {
        return $this->observaciones;
    }

    function setIdEstacionClimatologica($clave)
    {
        $this->id_estacion_climatologica = $clave;
    }

    function setClave_omm($clave_omm)
    {
        $this->clave_omm = $clave_omm;
    }

    function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    function setMunicipio_id($municipio_id)
    {
        $this->municipio_id = $municipio_id;
    }

    function setCuenca_id($cuenca_id)
    {
        $this->cuenca_id = $cuenca_id;
    }

    function setSubcuenca_id($subcuenca_id)
    {
        $this->subcuenca_id = $subcuenca_id;
    }

    function setTipo($tipo)
    {
        $this->tipo = $tipo;
    }

    function setOrganismo_id($organismo_id)
    {
        $this->organismo_id = $organismo_id;
    }

    function setFechainicio($fechainicio)
    {
        $this->fechainicio = $fechainicio;
    }

    function setFechafin($fechafin)
    {
        $this->fechafin = $fechafin;
    }

    function setSituacion($situacion)
    {
        $this->situacion = $situacion;
    }

    function setLatitud($latitud)
    {
        $this->latitud = $latitud;
    }

    function setLongitud($longitud)
    {
        $this->longitud = $longitud;
    }

    function setAltura($altura)
    {
        $this->altura = $altura;
    }

    function setObservaciones($observaciones)
    {
        $this->observaciones = $observaciones;
    }

    /**
     * @return array|null
     */
    public function getEstaciones()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare("SELECT id_estacion_climatologica, clave_omm, estacion_climatologica.nombre, UPPER(estado.nombre) AS estado, UPPER(municipio.nombre) AS municipio, cuenca.nombre AS cuenca, subcuenca.nombre AS subcuenca FROM estacion_climatologica, municipio, cuenca, subcuenca,tipo_estacion_climatologica,organismo_climatologico, estado WHERE 
                estacion_climatologica.cuenca_id=cuenca.id_cuenca AND
                estacion_climatologica.municipio_id=municipio.id_municipio AND
                estacion_climatologica.organismo_id=organismo_climatologico.id_organismo_climatologico AND
                estacion_climatologica.tipo_estacion_id=tipo_estacion_climatologica.id_estacion AND
                estacion_climatologica.subcuenca_id=subcuenca.id_subcuenca AND 
                estado.id_estado=municipio.estado_id;");
            $select->execute();
            $registros = $select->fetchAll(PDO::FETCH_ASSOC);
            return $registros;
        } catch (PDOException $exc) {
            $db = null;
            return $exc->getMessage();
        }
    }

    /**
     * @param $id
     * @return $this|null
     */
    public function getEstacion($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * from estacion_climatologica where id_estacion_climatologica=:id_estacion_climatologica');
            $select->bindValue('id_estacion_climatologica', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setIdEstacionClimatologica($registro['id_estacion_climatologica']);
            $this->setClave_omm($registro['clave_omm']);
            $this->setNombre($registro['nombre']);
            $this->setMunicipio_id($registro['municipio_id']);
            $this->setCuenca_id($registro['cuenca_id']);
            $this->setSubcuenca_id($registro['subcuenca_id']);
            $this->setTipo($registro['tipo_estacion_id']);
            $this->setOrganismo_id($registro['organismo_id']);
            $this->setFechainicio($registro['fechainicio']);
            $this->setFechafin($registro['fechafin']);
            $this->setSituacion($registro['situacion']);
            $this->setLatitud($registro['latitud']);
            $this->setLongitud($registro['longitud']);
            $this->setAltura($registro['altura']);
            $this->setObservaciones($registro['observaciones']);
            return $this;
        } catch (PDOException $exc) {
            $db = null;
            return $exc->getMessage();
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
            $select = $db->prepare('INSERT INTO estacion_climatologica VALUES (:id_estacion_climatologica,:clave_omm,:nombre,:municipio_id,:cuenca_id,:subcuenca_id,:tipo_estacion_id,:organismo_id,:fechainicio,:fechafin,:situacion,:latitud,:longitud,:altura,:observaciones)');
            //Colocamos los datos            
            $select->bindValue('id_estacion_climatologica', $this->getIdEstacionClimatologica(), PDO::PARAM_INT);
            $select->bindValue('clave_omm', $this->getClave_omm(), PDO::PARAM_INT);
            $select->bindValue('nombre', $this->getNombre(), PDO::PARAM_STR);
            $select->bindValue('municipio_id', $this->getMunicipio_id(), PDO::PARAM_INT);
            $select->bindValue('cuenca_id', $this->getCuenca_id(), PDO::PARAM_INT);
            $select->bindValue('subcuenca_id', $this->getSubcuenca_id(), PDO::PARAM_INT);
            $select->bindValue('tipo_estacion_id', $this->getTipo(), PDO::PARAM_INT);
            $select->bindValue('organismo_id', $this->getOrganismo_id(), PDO::PARAM_INT);
            $select->bindValue('fechainicio', $this->getFechainicio(), PDO::PARAM_STR);
            $select->bindValue('fechafin', $this->getFechafin(), PDO::PARAM_STR);
            $select->bindValue('situacion', $this->getSituacion(), PDO::PARAM_INT);
            $select->bindValue('latitud', $this->getLatitud(), PDO::PARAM_STR);
            $select->bindValue('longitud', $this->getLongitud(), PDO::PARAM_STR);
            $select->bindValue('altura', $this->getAltura(), PDO::PARAM_STR);
            $select->bindValue('observaciones', $this->getObservaciones(), PDO::PARAM_STR);            
            if ($select->execute())
            {
                //obtenemos el ultimo id de la tabla
                $select = $db->prepare('SELECT MAX(id_estacion_climatologica) AS id FROM estacion_climatologica');
                $select->execute();
                $id = $select->fetch();
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Insertó la estación con clave " . $id['id'] . " en la tabla estacion_climatologica";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            //echo $exc->getMessage();
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
            $select = $db->prepare('UPDATE estacion_climatologica SET clave_omm=:clave_omm,nombre=:nombre,municipio_id=:municipio_id,cuenca_id=:cuenca_id,subcuenca_id=:subcuenca_id,tipo_estacion_id=:tipo_estacion_id,organismo_id=:organismo_id,fechainicio=:fechainicio,fechafin=:fechafin,situacion=:situacion,latitud=:latitud,longitud=:longitud,altura=:altura,observaciones=:observaciones WHERE id_estacion_climatologica=:id_estacion_climatologica');
            $select->bindValue('id_estacion_climatologica', $this->getIdEstacionClimatologica(), PDO::PARAM_INT);
            $select->bindValue('clave_omm', $this->getClave_omm(), PDO::PARAM_INT);
            $select->bindValue('nombre', $this->getNombre(), PDO::PARAM_STR);
            $select->bindValue('municipio_id', $this->getMunicipio_id(), PDO::PARAM_INT);
            $select->bindValue('cuenca_id', $this->getCuenca_id(), PDO::PARAM_INT);
            $select->bindValue('subcuenca_id', $this->getSubcuenca_id(), PDO::PARAM_INT);
            $select->bindValue('tipo_estacion_id', $this->getTipo(), PDO::PARAM_INT);
            $select->bindValue('organismo_id', $this->getOrganismo_id(), PDO::PARAM_INT);
            $select->bindValue('fechainicio', $this->getFechainicio(), PDO::PARAM_STR);
            $select->bindValue('fechafin', $this->getFechafin(), PDO::PARAM_STR);
            $select->bindValue('situacion', $this->getSituacion(), PDO::PARAM_INT);
            $select->bindValue('latitud', $this->getLatitud(), PDO::PARAM_STR);
            $select->bindValue('longitud', $this->getLongitud(), PDO::PARAM_STR);
            $select->bindValue('altura', $this->getAltura(), PDO::PARAM_STR);
            $select->bindValue('observaciones', $this->getObservaciones(), PDO::PARAM_STR);
            if ($select->execute()){
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Actualizó la estación con clave " . $this->getIdEstacionClimatologica() . " en la tabla estacion_climatologica";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            return $exc->getMessage();
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
            $select = $db->prepare('DELETE FROM estacion_climatologica WHERE id_estacion_climatologica=:id_estacion_climatologica');
            //Colocamos los datos
            $select->bindValue('id_estacion_climatologica', $this->getIdEstacionClimatologica(), PDO::PARAM_INT);
            return $select->execute();
        } catch (PDOException $exc) {
            return $exc->getMessage();
        }
    }

    public function existeRegistro(){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {            
            $select = $db->prepare('SELECT id_estacion_climatologica FROM estacion_climatologica WHERE id_estacion_climatologica=:id_estacion_climatologica');
            $select->bindValue('id_estacion_climatologica', $this->getIdEstacionClimatologica(), PDO::PARAM_INT);
            $select->execute();
            return $select->rowCount();
        } catch (PDOException $exc) {            
            return $exc->getMessage();
        }
    }
    
    //Consulta a la base de datos las cuencas con los municipios seleccionados
    public function getMunicipiosCuenca($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT cuenca_id, cuenca.nombre from estacion_climatologica INNER JOIN cuenca ON estacion_climatologica.cuenca_id=cuenca.id_cuenca WHERE ' . $query . 'GROUP BY cuenca_id');
            $select->execute();
            $registros = $select->fetchAll(PDO::FETCH_ASSOC);
            return $registros;
        } catch (PDOException $exc) {
            return $exc->getMessage(); 
        }
    }
    
    
    
    //Obtiene los estados pertenecientes a las regiones hidrológicas que tiene el query
    public function getMunicipios($query){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT municipio_id, municipio.nombre FROM estacion_climatologica INNER JOIN municipio ON estacion_climatologica.municipio_id=municipio.id_municipio WHERE ' . $query.'GROUP BY municipio_id');
            $select->execute();
            $registros = $select->fetchAll(PDO::FETCH_ASSOC);
            return $registros;
        } catch (PDOException $exc) {
            $db = null;
            return $exc->getMessage(); 
        }
    }
    
    
    //Consulta a la base de datos las estaciones climatologicas que cumplan con el query
    public function getEstacionesMuni($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT id_estacion_climatologica,nombre FROM estacion_climatologica WHERE ' . $query . 'GROUP BY id_estacion_climatologica');
            $select->execute();
            $registros = $select->fetchAll(PDO::FETCH_ASSOC);
            return $registros;
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            return $exc->getMessage();
            
        }
    }
    

    
    //Obtiene el resultado de una consulta para mostrar en la tabla de resultad con los parametros capturados en la vista
    public function getEstacionesTabla($query){
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = '
            SELECT id_estacion_climatologica, estacion_climatologica.nombre, cuenca.nombre as cuenca, subcuenca.nombre as subcuenca, tipo_estacion_climatologica.nombre as tipo, estado.nombre as estado, municipio.nombre as municipio, fechainicio, fechafin, IF(situacion=1, "Operando", "Suspendido") as situacion FROM estacion_climatologica 
            INNER JOIN municipio ON estacion_climatologica.municipio_id=municipio.id_municipio
            INNER JOIN cuenca ON estacion_climatologica.cuenca_id=cuenca.id_cuenca
            INNER JOIN tipo_estacion_climatologica ON estacion_climatologica.tipo_estacion_id=tipo_estacion_climatologica.id_estacion
            INNER JOIN subcuenca ON estacion_climatologica.subcuenca_id=subcuenca.id_subcuenca
            INNER JOIN estado ON municipio.estado_id=estado.id_estado WHERE ' . $query;
            $select = $db->prepare($sql);
            $select->execute();
            $registros = $select->fetchAll(PDO::FETCH_ASSOC);
            return $registros;
        } catch (PDOException $exc) {
            $db = null;
            return $exc->getMessage();
        }
    }
    
    //Obtiene la informacion que se vaciará en el mapa
    public function getEstacionesMap($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT id_estacion_climatologica, estacion_climatologica.nombre, cuenca.nombre as cuenca, tipo_estacion_climatologica.nombre as tipo, estado.nombre as estado, municipio.nombre as municipio, IF(situacion=1, "Operando", "Suspendido") as situacion, IF(situacion=1,"#69E315","#FF0000") as color,latitud, longitud FROM estacion_climatologica 
            INNER JOIN municipio ON estacion_climatologica.municipio_id=municipio.id_municipio
            INNER JOIN cuenca ON estacion_climatologica.cuenca_id=cuenca.id_cuenca
            INNER JOIN tipo_estacion_climatologica ON estacion_climatologica.tipo_estacion_id=tipo_estacion_climatologica.id_estacion
            INNER JOIN estado ON municipio.estado_id=estado.id_estado WHERE ' . $query);
            $select->execute();
            $registros = $select->fetchAll(PDO::FETCH_ASSOC);
            return $registros;
        } catch (PDOException $exc) {
            $db = null;
            return $exc->getMessage(); 
        }
    }
    

}
