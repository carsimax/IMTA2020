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
 * Class SiembraDistrito
 */
class SiembraDistrito {

    private $id_siembra_distrito;
    private $modalidad;
    private $sembrada;
    private $cosechada;
    private $produccion;
    private $valor;
    private $anioagricola_id;
    private $ciclo_id;
    private $tenencia_id;
    private $cultivo_id;
    private $distrito_riego_id;

    /**
     * SiembraDistrito constructor.
     *
     */
    public function __construct()
    {
        
    }

    /**
     * @return mixed
     */
    public function getIdSiembraDistrito()
    {
        return $this->id_siembra_distrito;
    }

    /**
     * @param mixed $id_siembra_distrito
     */
    public function setIdSiembraDistrito($id_siembra_distrito)
    {
        $this->id_siembra_distrito = $id_siembra_distrito;
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
    public function getRegistrosSiembra()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT id_siembra_distrito,modalidad,sembrada, cosechada, produccion, valor, cultivo.nombre AS cultivo, tenencia.nombre AS tenencia,  anio.anio, ciclo.nombre AS ciclo FROM siembra_distrito, cultivo, tenencia, anio, ciclo WHERE siembra_distrito.cultivo_id=cultivo.id_cultivo AND siembra_distrito.ciclo_id=ciclo.id_ciclo AND siembra_distrito.tenencia_id=tenencia.id_tenencia AND siembra_distrito.anio_id=anio.id_anio AND distrito_riego_id=:distrito_riego_id');
            $select->bindValue('distrito_riego_id', $this->getDistritoRiegoId(), PDO::PARAM_STR);
            $select->execute();  
            $registros = $select->fetchAll(PDO::FETCH_ASSOC);
            return $registros;
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @return array|null
     * funcion para obetener un registro volumétrico de un distrito
     */
    public function getRegistroSiembra($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM siembra_distrito WHERE id_siembra_distrito=:id_siembra_distrito');
            $select->bindValue('id_siembra_distrito', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setIdSiembraDistrito($registro['id_siembra_distrito']);
            $this->setModalidad($registro['modalidad']);
            $this->setSembrada($registro['sembrada']);
            $this->setCosechada($registro['cosechada']);
            $this->setProduccion($registro['produccion']);
            $this->setValor($registro['valor']);
            $this->setAnioagricolaId($registro['anio_id']);
            $this->setCicloId($registro['ciclo_id']);
            $this->setTenenciaId($registro['tenencia_id']);
            $this->setCultivoId($registro['cultivo_id']);
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
            $select = $db->prepare('INSERT INTO siembra_distrito VALUES (0, :modalidad,:sembrada,:cosechada,:produccion,:valor,:anio_id,:ciclo_id,:tenencia_id,:cultivo_id, :distrito_riego_id)');
            $select->bindValue('modalidad', $this->getModalidad(), PDO::PARAM_STR);
            $select->bindValue('sembrada', $this->getSembrada(), PDO::PARAM_STR);
            $select->bindValue('cosechada', $this->getCosechada(), PDO::PARAM_STR);
            $select->bindValue('produccion', $this->getProduccion(), PDO::PARAM_STR);
            $select->bindValue('valor', $this->getValor(), PDO::PARAM_STR);
            $select->bindValue('anio_id', $this->getAnioagricolaId(), PDO::PARAM_INT);
            $select->bindValue('ciclo_id', $this->getCicloId(), PDO::PARAM_INT);
            $select->bindValue('tenencia_id', $this->getTenenciaId(), PDO::PARAM_INT);
            $select->bindValue('cultivo_id', $this->getCultivoId(), PDO::PARAM_INT);
            $select->bindValue('distrito_riego_id', $this->getDistritoRiegoId(), PDO::PARAM_STR);
            if ($select->execute())
            {
                //Se obtiene el ultimo registro
                $select = $db->prepare('SELECT MAX(id_siembra_distrito) AS id FROM siembra_distrito');
                $select->execute();
                $id = $select->fetch();
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " insertó el registro " . $id['id'] . " en la tabla siembra_distrito";
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
            $select = $db->prepare('UPDATE siembra_distrito SET 
            modalidad=:modalidad, 
            sembrada=:sembrada,            
            cosechada=:cosechada, 
            produccion=:produccion,
            valor=:valor,
            anio_id=:anio_id, 
            ciclo_id=:ciclo_id,
            tenencia_id=:tenencia_id,
            cultivo_id=:cultivo_id           
            WHERE id_siembra_distrito=:id_siembra_distrito');
            //Colocamos los datos
            $select->bindValue('modalidad', $this->getModalidad(), PDO::PARAM_STR);
            $select->bindValue('sembrada', $this->getSembrada(), PDO::PARAM_STR);
            $select->bindValue('cosechada', $this->getCosechada(), PDO::PARAM_STR);
            $select->bindValue('produccion', $this->getProduccion(), PDO::PARAM_STR);
            $select->bindValue('valor', $this->getValor(), PDO::PARAM_STR);
            $select->bindValue('anio_id', $this->getAnioagricolaId(), PDO::PARAM_INT);
            $select->bindValue('ciclo_id', $this->getCicloId(), PDO::PARAM_INT);
            $select->bindValue('tenencia_id', $this->getTenenciaId(), PDO::PARAM_INT);
            $select->bindValue('cultivo_id', $this->getCultivoId(), PDO::PARAM_INT);
            $select->bindValue('id_siembra_distrito', $this->getIdSiembraDistrito(), PDO::PARAM_INT);
            if ($select->execute())
            {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " actualizó el registro " . $this->getIdSiembraDistrito() . " en la tabla siembra_distrito";
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
            $select = $db->prepare('DELETE FROM siembra_distrito WHERE id_siembra_distrito=:id_siembra_distrito');
            //Colocamos los datos
            $select->bindValue('id_siembra_distrito', $this->getIdSiembraDistrito(), PDO::PARAM_INT);
            if ($select->execute())
            {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " eliminó el registro " . $this->getIdSiembraDistrito() . " de la tabla siembra_distrito";
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

            $select = $db->prepare('SELECT distrito_riego_id FROM siembra_distrito WHERE anio_id=:anio_id AND distrito_riego_id=:distrito_riego_id AND cultivo_id=:cultivo_id AND ciclo_id=:ciclo_id AND tenencia_id=:tenencia_id AND modalidad=:modalidad');
            $select->bindValue('modalidad', $this->getModalidad(), PDO::PARAM_STR);
            $select->bindValue('distrito_riego_id', $this->getDistritoRiegoId(), PDO::PARAM_STR);
            $select->bindValue('anio_id', $this->getAnioagricolaId(), PDO::PARAM_INT);
            $select->bindValue('cultivo_id', $this->getCultivoId(), PDO::PARAM_INT);
            $select->bindValue('ciclo_id', $this->getCicloId(), PDO::PARAM_INT);
            $select->bindValue('tenencia_id', $this->getTenenciaId(), PDO::PARAM_INT);
            $select->execute();
            return $select->rowCount();
        } catch (PDOException $exc) {
            echo $exc->getMessage();
            return null;
        }
    }

    public function getTablaOC($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = '
            SELECT
            organismo.id_organismo,
            organismo.numero,
            organismo.nombre as OC,
            estado.id_estado,
            estado.nombre as estado,
            distrito_riego_id,
            distrito_riego.nom_dr,
            TRUNCATE(sum(sembrada),2) as SEM,
            TRUNCATE(sum(cosechada),2) as COS,
            TRUNCATE(sum(produccion),2) as PROD,
            TRUNCATE(sum(valor),2) as VAL,
            TRUNCATE((sum(produccion)/sum(cosechada)),2)as REND,
            TRUNCATE(((sum(valor))/sum(produccion)),2)as PMR,
            anio,
            anio_id,
            modalidad,
            tenencia_id,
            cultivo_id,
            cultivo.nombre as cultivo,
            ciclo.nombre as ciclo,
            ciclo.id_ciclo
            FROM siembra_distrito
            INNER JOIN anio on anio.id_anio=siembra_distrito.anio_id
            INNER JOIN distrito_riego on distrito_riego.id_distrito_riego=siembra_distrito.distrito_riego_id
            INNER JOIN estado on estado.id_estado=distrito_riego.estado_id
            INNER JOIN organismo on organismo.id_organismo=distrito_riego.organismo_id 
            INNER JOIN cultivo on cultivo.id_cultivo=siembra_distrito.cultivo_id
            INNER JOIN ciclo on ciclo.id_ciclo=siembra_distrito.ciclo_id
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

    public function getTablaOC2($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = '
            SELECT
            distrito_riego.organismo_id,
            TRUNCATE(sum(sembrada),2) as SEM,
            TRUNCATE(sum(cosechada),2) as COS,
            TRUNCATE(sum(produccion),2) as PROD,
            TRUNCATE(sum(valor),2) as VAL,
            TRUNCATE((sum(produccion)/sum(cosechada)),2)as REND,
            TRUNCATE(((sum(valor))/sum(produccion)),2)as PMR,
            anio,
            anio_id,
            modalidad,
            tenencia_id,
            ciclo.nombre as ciclo,
            ciclo.id_ciclo
            FROM siembra_distrito
            INNER JOIN anio on anio.id_anio=siembra_distrito.anio_id
            INNER JOIN distrito_riego on distrito_riego.id_distrito_riego=siembra_distrito.distrito_riego_id
            INNER JOIN estado on estado.id_estado=distrito_riego.estado_id
            INNER JOIN organismo on organismo.id_organismo=distrito_riego.organismo_id 
            INNER JOIN ciclo on ciclo.id_ciclo=siembra_distrito.ciclo_id
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
