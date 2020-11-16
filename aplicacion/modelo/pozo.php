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
set_time_limit(10800);
ini_set('memory_limit', '512M');
/**
 * Para que el controlador funcione de forma correcta, es necesario la llamada a los modelos necesarios en el mismo.
 */
require_once("dbconnection.php");
require_once(__DIR__ . "/../controlador/sesion.php");

class Pozo {

    private $id_pozo;
    private $titulo_id;
    private $region_id;
    private $estado_Id;
    private $municipio_id;
    private $cuenca_id;
    private $sup;
    private $corriente;
    private $vol_anual;
    private $vol_diario;
    private $acuifero_id;
    private $procedencia;
    private $receptor;
    private $uso;
    private $fuente;
    private $afluente;
    private $forma_desc;
    private $tipo_id;
    private $anexo;
    private $lat;
    private $lon;

    function getID_pozo()
    {
        return $this->id_pozo;
    }

    function getTitulo_id()
    {
        return $this->titulo_id;
    }

    function getRegion_id()
    {
        return $this->region_id;
    }

    function getEstado_Id()
    {
        return $this->estado_Id;
    }

    function getMunicipio_id()
    {
        return $this->municipio_id;
    }

    function getCuenca_id()
    {
        return $this->cuenca_id;
    }

    function getSup()
    {
        return $this->sup;
    }

    function getCorriente()
    {
        return $this->corriente;
    }

    function getVol_anual()
    {
        return $this->vol_anual;
    }

    function getVol_diario()
    {
        return $this->vol_diario;
    }

    function getAcuifero_id()
    {
        return $this->acuifero_id;
    }

    function getProcedencia()
    {
        return $this->procedencia;
    }

    function getReceptor()
    {
        return $this->receptor;
    }

    function getUso()
    {
        return $this->uso;
    }

    function getFuente()
    {
        return $this->fuente;
    }

    function getAfluente()
    {
        return $this->afluente;
    }

    function getForma_desc()
    {
        return $this->forma_desc;
    }

    function getTipo_id()
    {
        return $this->tipo_id;
    }

    function getAnexo()
    {
        return $this->anexo;
    }

    function getLat()
    {
        return $this->lat;
    }

    function getLon()
    {
        return $this->lon;
    }

    function setID_pozo($id_pozo)
    {
        $this->id_pozo = $id_pozo;
    }

    function setTitulo_id($titulo_id)
    {
        $this->titulo_id = $titulo_id;
    }

    function setRegion_id($region_id)
    {
        $this->region_id = $region_id;
    }

    function setEstado_Id($estado_Id)
    {
        $this->estado_Id = $estado_Id;
    }

    function setMunicipio_id($municipio_id)
    {
        $this->municipio_id = $municipio_id;
    }

    function setCuenca_id($cuenca_id)
    {
        $this->cuenca_id = $cuenca_id;
    }

    function setSup($sup)
    {
        $this->sup = $sup;
    }

    function setCorriente($corriente)
    {
        $this->corriente = $corriente;
    }

    function setVol_anual($vol_anual)
    {
        $this->vol_anual = $vol_anual;
    }

    function setVol_diario($vol_diario)
    {
        $this->vol_diario = $vol_diario;
    }

    function setAcuifero_id($acuifero_id)
    {
        $this->acuifero_id = $acuifero_id;
    }

    function setProcedencia($procedencia)
    {
        $this->procedencia = $procedencia;
    }

    function setReceptor($receptor)
    {
        $this->receptor = $receptor;
    }

    function setUso($uso)
    {
        $this->uso = $uso;
    }

    function setFuente($fuente)
    {
        $this->fuente = $fuente;
    }

    function setAfluente($afluente)
    {
        $this->afluente = $afluente;
    }

    function setForma_desc($forma_desc)
    {
        $this->forma_desc = $forma_desc;
    }

    function setTipo_id($tipo_id)
    {
        $this->tipo_id = $tipo_id;
    }

    function setAnexo($anexo)
    {
        $this->anexo = $anexo;
    }

    function setLat($lat)
    {
        $this->lat = $lat;
    }

    function setLon($lon)
    {
        $this->lon = $lon;
    }

    public function getPozos()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT pozo.id_pozo,titulo.id_titulo,pozo.latitud,pozo.longitud
            from pozo INNER JOIN titulo on titulo.id_titulo=pozo.titulo_id');
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

    public function getPozosT($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT  
            pozo.id_pozo,
            pozo.titulo_id,
            pozo.lat,
            pozo.lon
            FROM pozo WHERE ' . $query);
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

    public function insert()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {

            $select = $db->prepare('INSERT INTO pozo VALUES ('
                    . '0, '
                    . ':titulo_id, '
                    . ':region_id, '
                    . ':estado_Id, '
                    . ':municipio_id, '
                    . ':cuenca_id, '
                    . ':sup, '
                    . ':corriente, '
                    . ':vol_anual, '
                    . ':vol_diario, '
                    . ':acuifero_id, '
                    . ':procedencia, '
                    . ':receptor, '
                    . ':uso, '
                    . ':fuente, '
                    . ':afluente, '
                    . ':forma_desc, '
                    . ':tipo_id, '
                    . ':anexo, '
                    . ':lat, '
                    . ':lon)');
            //Colocamos los datos
            $select->bindValue('titulo_id', $this->getTitulo_id(), PDO::PARAM_STR);
            $select->bindValue('region_id', $this->getRegion_id(), PDO::PARAM_STR);
            $select->bindValue('estado_Id', $this->getEstado_Id(), PDO::PARAM_STR);
            $select->bindValue('municipio_id', $this->getMunicipio_id(), PDO::PARAM_STR);
            $select->bindValue('cuenca_id', $this->getCuenca_id(), PDO::PARAM_STR);
            $select->bindValue('sup', $this->getSup(), PDO::PARAM_STR);
            $select->bindValue('corriente', $this->getCorriente(), PDO::PARAM_STR);
            $select->bindValue('vol_anual', $this->getVol_anual(), PDO::PARAM_STR);
            $select->bindValue('vol_diario', $this->getVol_diario(), PDO::PARAM_STR);
            $select->bindValue('acuifero_id', $this->getAcuifero_id(), PDO::PARAM_STR);
            $select->bindValue('procedencia', $this->getProcedencia(), PDO::PARAM_STR);
            $select->bindValue('receptor', $this->getReceptor(), PDO::PARAM_STR);
            $select->bindValue('uso', $this->getUso(), PDO::PARAM_STR);
            $select->bindValue('fuente', $this->getFuente(), PDO::PARAM_STR);
            $select->bindValue('afluente', $this->getAfluente(), PDO::PARAM_STR);
            $select->bindValue('forma_desc', $this->getForma_desc(), PDO::PARAM_STR);
            $select->bindValue('tipo_id', $this->getTipo_id(), PDO::PARAM_STR);
            $select->bindValue('anexo', $this->getAnexo(), PDO::PARAM_STR);
            $select->bindValue('lat', $this->getLat(), PDO::PARAM_STR);
            $select->bindValue('lon', $this->getLon(), PDO::PARAM_STR);
            if ($select->execute())
            {
                //obtenemos el ultimo id de la tabla
                $select = $db->prepare('SELECT MAX(id_pozo) AS id FROM pozo');
                $select->execute();
                $id = $select->fetch();
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " registró el pozo " . $id['id'];
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            return null;
        }
    }

    public function update()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('UPDATE pozo SET '
                    . 'region_id=:region_id,'
                    . 'estado_Id=:estado_Id,'
                    . 'municipio_id=:municipio_id,'
                    . 'cuenca_id=:cuenca_id,'
                    . 'sup=:sup,'
                    . 'corriente=:corriente,'
                    . 'vol_anual=:vol_anual,'
                    . 'vol_diario=:vol_diario,'
                    . 'acuifero_id=:acuifero_id,'
                    . 'procedencia=:procedencia,'
                    . 'receptor=:receptor,'
                    . 'uso=:uso,'
                    . 'fuente=:fuente,'
                    . 'afluente=:afluente,'
                    . 'forma_desc=:forma_desc,'
                    . 'anexo=:anexo,'
                    . 'lat=:lat,'
                    . 'lon=:lon '
                    . 'WHERE id_pozo=:id_pozo');
            //Colocamos los datos
            $select->bindValue('region_id', $this->getRegion_id(), PDO::PARAM_STR);
            $select->bindValue('estado_Id', $this->getEstado_Id(), PDO::PARAM_STR);
            $select->bindValue('municipio_id', $this->getMunicipio_id(), PDO::PARAM_STR);
            $select->bindValue('cuenca_id', $this->getCuenca_id(), PDO::PARAM_STR);
            $select->bindValue('sup', $this->getSup(), PDO::PARAM_STR);
            $select->bindValue('corriente', $this->getCorriente(), PDO::PARAM_STR);
            $select->bindValue('vol_anual', $this->getVol_anual(), PDO::PARAM_STR);
            $select->bindValue('vol_diario', $this->getVol_diario(), PDO::PARAM_STR);
            $select->bindValue('acuifero_id', $this->getAcuifero_id(), PDO::PARAM_STR);
            $select->bindValue('procedencia', $this->getProcedencia(), PDO::PARAM_STR);
            $select->bindValue('receptor', $this->getReceptor(), PDO::PARAM_STR);
            $select->bindValue('uso', $this->getUso(), PDO::PARAM_STR);
            $select->bindValue('fuente', $this->getFuente(), PDO::PARAM_STR);
            $select->bindValue('afluente', $this->getAfluente(), PDO::PARAM_STR);
            $select->bindValue('forma_desc', $this->getForma_desc(), PDO::PARAM_STR);
            $select->bindValue('anexo', $this->getAnexo(), PDO::PARAM_STR);
            $select->bindValue('lat', $this->getLat(), PDO::PARAM_STR);
            $select->bindValue('lon', $this->getLon(), PDO::PARAM_STR);
            $select->bindValue('id_pozo', $this->getID_pozo(), PDO::PARAM_STR);

            if ($select->execute())
            {
                //insertamos en la tabla log
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Actualizó el pozo " . $this->getID_pozo();
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            return null;
        }
    }

    //Funcion para obtener el propietario
    public function getPozo($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT
            id_pozo,
            titulo_id,
            region_id,
            estado.nombre as estado,
            municipio.nombre as municipio,
            cuenca_id,
            sup,
            corriente,
            vol_anual,
            vol_diario,
            acuifero_id,
            procedencia,
            receptor,
            uso,
            fuente,
            afluente,
            forma_desc,
            tipo_id,
            anexo,
            lat,
            lon
            FROM pozo
            INNER JOIN estado on estado.id_estado=pozo.estado_Id
            INNER JOIN municipio on municipio.id_municipio=pozo.municipio_id WHERE id_pozo=:id_pozo');
            $select->bindValue('id_pozo', $id, PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setID_pozo($registro['id_pozo']);
            $this->setTitulo_id($registro['titulo_id']);
            $this->setRegion_id($registro['region_id']);
            $this->setEstado_Id($registro['estado']);
            $this->setMunicipio_id($registro['municipio']);
            $this->setCuenca_id($registro['cuenca_id']);
            $this->setSup($registro['sup']);
            $this->setCorriente($registro['corriente']);
            $this->setVol_anual($registro['vol_anual']);
            $this->setVol_diario($registro['vol_diario']);
            $this->setAcuifero_id($registro['acuifero_id']);
            $this->setProcedencia($registro['procedencia']);
            $this->setReceptor($registro['receptor']);
            $this->setUso($registro['uso']);
            $this->setFuente($registro['fuente']);
            $this->setAfluente($registro['afluente']);
            $this->setForma_desc($registro['forma_desc']);
            $this->setTipo_id($registro['tipo_id']);
            $this->setAnexo($registro['anexo']);
            $this->setLat($registro['lat']);
            $this->setLon($registro['lon']);
            return $this;
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    //Funcion para obtener el propietario

    public function getPozoQuery($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT
            pozo.id_pozo,
            pozo.titulo_id,
            reg_hidrologica.nombre as region,
            estado.nombre as estado,
            municipio.nombre as municipio,
            pozo.cuenca_id,
            pozo.sup,
            pozo.corriente,
            pozo.vol_anual,
            pozo.vol_diario,
            pozo.acuifero_id,
            acuifero.nombre as acuifero,
            pozo.procedencia,
            pozo.receptor,
            pozo.uso,
            pozo.fuente,
            pozo.afluente,
            pozo.forma_desc,
            pozo.tipo_id,
            tipo_pozo.tipo,
            pozo.anexo,
            pozo.lat,
            pozo.lon
            FROM pozo
            LEFT JOIN reg_hidrologica on reg_hidrologica.id_reg_hidrologica=pozo.region_id
            LEFT JOIN estado on estado.id_estado=pozo.estado_Id
            LEFT JOIN municipio on municipio.id_municipio=pozo.municipio_id
            LEFT JOIN acuifero on acuifero.id_acuifero=pozo.acuifero_id
            LEFT JOIN tipo_pozo on tipo_pozo.id_tipo=pozo.tipo_id
            WHERE ' . $id);
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

    //Funcion para obtener el propietario
    public function getPozoQuery2($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT
            pozo.id_pozo,
            titulo.id_titulo,
            reg_hidrologica.nombre as rh,
            pozo.cuenca_id,
            pozo.lat,
            pozo.lon
            FROM pozo 
            INNER JOIN titulo on titulo.id_titulo=pozo.titulo_id
            INNER JOIN reg_hidrologica on reg_hidrologica.id_reg_hidrologica=pozo.region_id WHERE ' . $query);
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

    public function delete()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('DELETE FROM pozo WHERE id_pozo=:id_pozo');
            //Colocamos los datos
            $select->bindValue('id_pozo', $this->getID_pozo(), PDO::PARAM_INT);
            if ($select->execute())
            {
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Eliminó el pozo " . $this->getID_pozo() . " en la tabla Pozo";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            return null;
        }
    }

    public function getPoz()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('SELECT id_pozo from pozo where id_pozo=:id_pozo');
            $select->bindValue('id_pozo', $this->getID_pozo(), PDO::PARAM_INT);
            $select->execute();
            return $select->rowCount();
        } catch (PDOException $exc) {
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

}
