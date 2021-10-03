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
set_time_limit(20800);
ini_set('memory_limit', '10240M');
/**
 * Para que el controlador funcione de forma correcta, es necesario la llamada a los modelos necesarios en el mismo.
 */
require_once("dbconnection.php");


/**
 * Class Concesion
 */
class Titulo
{

    private $id_titulo;
    private $uso_id;
    private $titular;
    private $vol_amparado_total;
    private $num_aprov_superf;
    private $vol_aprov_superf;
    private $num_aprov_subt;
    private $vol_aprov_subt;
    private $puntos_desc;
    private $vol_desc_diario;
    private $zonas_fed_amp_titulo;
    private $supeficie;
    private $fecha_reg;
    function getId_titulo()
    {
        return $this->id_titulo;
    }

    function getUso_id()
    {
        return $this->uso_id;
    }

    function getTitular()
    {
        return $this->titular;
    }

    function getVol_amparado_total()
    {
        return $this->vol_amparado_total;
    }

    function getNum_aprov_superf()
    {
        return $this->num_aprov_superf;
    }

    function getVol_aprov_superf()
    {
        return $this->vol_aprov_superf;
    }

    function getNum_aprov_subt()
    {
        return $this->num_aprov_subt;
    }

    function getVol_aprov_subt()
    {
        return $this->vol_aprov_subt;
    }

    function getPuntos_desc()
    {
        return $this->puntos_desc;
    }

    function getVol_desc_diario()
    {
        return $this->vol_desc_diario;
    }

    function getZonas_fed_amp_titulo()
    {
        return $this->zonas_fed_amp_titulo;
    }

    function getSupeficie()
    {
        return $this->supeficie;
    }

    function getFecha_reg()
    {
        return $this->fecha_reg;
    }
    function setId_titulo($id_titulo)
    {
        $this->id_titulo = $id_titulo;
    }

    function setUso_id($uso_id)
    {
        $this->uso_id = $uso_id;
    }

    function setTitular($titular)
    {
        $this->titular = $titular;
    }

    function setVol_amparado_total($vol_amparado_total)
    {
        $this->vol_amparado_total = $vol_amparado_total;
    }

    function setNum_aprov_superf($num_aprov_superf)
    {
        $this->num_aprov_superf = $num_aprov_superf;
    }

    function setVol_aprov_superf($vol_aprov_superf)
    {
        $this->vol_aprov_superf = $vol_aprov_superf;
    }

    function setNum_aprov_subt($num_aprov_subt)
    {
        $this->num_aprov_subt = $num_aprov_subt;
    }

    function setVol_aprov_subt($vol_aprov_subt)
    {
        $this->vol_aprov_subt = $vol_aprov_subt;
    }

    function setPuntos_desc($puntos_desc)
    {
        $this->puntos_desc = $puntos_desc;
    }

    function setVol_desc_diario($vol_desc_diario)
    {
        $this->vol_desc_diario = $vol_desc_diario;
    }

    function setZonas_fed_amp_titulo($zonas_fed_amp_titulo)
    {
        $this->zonas_fed_amp_titulo = $zonas_fed_amp_titulo;
    }

    function setSupeficie($supeficie)
    {
        $this->supeficie = $supeficie;
    }

    function setFecha_reg($fecha_reg)
    {
        $this->fecha_reg = $fecha_reg;
    }



    /**
     * @return array|null
     */
    public function getTodos($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);
            $select = $db->prepare('
            SELECT 
            titulo.id_titulo,
            titular.titular,
            estado.nombre as estado,
            municipio.nombre as municipio,
            acuifero.nombre
            FROM titulo INNER JOIN titular on titular.id_titular=titulo.titular_id
            INNER JOIN acuifero on acuifero.id_acuifero=titulo.acuifero_id
            INNER JOIN estado on estado.id_estado=titulo.estado_id
            INNER JOIN municipio on municipio.id_municipio=titulo.muni_id
            WHERE ' . $query);
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

    public function getQuery($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);
            $select = $db->prepare('
                SELECT * FROM titulo
                INNER JOIN uso on uso.id_uso=titulo.uso_id
                WHERE ' . $query);
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

    public function getQuery2($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);
            $select = $db->prepare('
            SELECT 
            pozo.titulo_id,
            pozo.estado_Id,
            pozo.municipio_id,
            pozo.acuifero_id,
            pozo.tipo_id,
            titulo.uso_id,
            titulo.titular,
            titulo.uso_id,
            uso.uso
            FROM pozo 
            INNER JOIN titulo on titulo.id_titulo=pozo.titulo_id
            INNER JOIN uso on uso.id_uso=titulo.uso_id
            WHERE' . $query);
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

    public function getQuery3($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);
            $select = $db->prepare('SELECT 
            titulo.id_titulo, 
            tipo_pozo.tipo,
            uso.uso,
            titular.titular,
            acuifero.nombre as acuifero,
            titulo.vol_amparado_total,
            titulo.num_aprov_superf,
            titulo.vol_aprov_superf,
            titulo.num_aprov_subt,
            titulo.vol_aprov_subt,
            titulo.puntos_desc,
            titulo.vol_desc_diario,
            titulo.zonas_fed_amp_titulo,
            titulo.supeficie,
            titulo.fecha_reg,
            titulo.anexos,
            municipio.id_municipio,
            municipio.nombre as municipio,
            estado.nombre as estado
            from titulo
            INNER JOIN tipo_pozo on tipo_pozo.id_tipo=titulo.tipo_id
            INNER JOIN uso on uso.id_uso=titulo.uso_id
            INNER JOIN titular on titular.id_titular=titulo.titular_id
            INNER JOIN acuifero on acuifero.id_acuifero=titulo.acuifero_id
            INNER JOIN municipio on municipio.id_municipio=titulo.muni_id
            INNER JOIN estado on estado.id_estado=municipio.estado_id
             WHERE ' . $query);
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
    public function Insert()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare(''
                . 'INSERT INTO titulo VALUES('
                . ':id_titulo, '
                . ':uso_id, '
                . ':titular, '
                . ':vol_total, '
                . ':anexos_sup, '
                . ':vol_sup, '
                . ':anexos_sub, '
                . ':vol_sub, '
                . ':p_descarga, '
                . ':vol_desc, '
                . ':z_federales, '
                . ':superficie, '
                . ':fecha_reg)');
            //Colocamos los datos
            $select->bindValue('id_titulo', $this->getId_titulo(), PDO::PARAM_STR);
            $select->bindValue('uso_id', $this->getUso_id(), PDO::PARAM_INT);
            $select->bindValue('titular', $this->getTitular(), PDO::PARAM_STR);
            $select->bindValue('vol_total', $this->getVol_amparado_total(), PDO::PARAM_STR);
            $select->bindValue('anexos_sup', $this->getNum_aprov_superf(), PDO::PARAM_INT);
            $select->bindValue('vol_sup', $this->getVol_aprov_superf(), PDO::PARAM_STR);
            $select->bindValue('anexos_sub', $this->getNum_aprov_subt(), PDO::PARAM_INT);
            $select->bindValue('vol_sub', $this->getVol_aprov_subt(), PDO::PARAM_STR);
            $select->bindValue('p_descarga', $this->getPuntos_desc(), PDO::PARAM_INT);
            $select->bindValue('vol_desc', $this->getVol_desc_diario(), PDO::PARAM_STR);
            $select->bindValue('z_federales', $this->getZonas_fed_amp_titulo(), PDO::PARAM_INT);
            $select->bindValue('superficie', $this->getSupeficie(), PDO::PARAM_STR);
            $select->bindValue('fecha_reg', $this->getFecha_reg(), PDO::PARAM_STR);
            if ($select->execute()) {
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Insertó el titulo " . $this->getId_titulo() . " en la tabla titulo";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            return null;
        }
    }

    /**
     * @param $id
     * @return $this|null
     */
    public function getTitulo($id)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);
            $select = $db->prepare('
            SELECT * from titulo
            INNER JOIN uso on uso.id_uso=titulo.uso_id
            WHERE id_titulo=:id_titulo');
            $select->bindValue('id_titulo', $id, PDO::PARAM_STR);
            $select->execute();
            $registro = $select->fetch();
            $this->setId_titulo($registro['id_titulo']);
            $this->setUso_id($registro['uso_id']);
            $this->setTitular($registro['titular']);
            $this->setVol_amparado_total($registro['vol_total']);
            $this->setNum_aprov_superf($registro['anexos_sup']);
            $this->setVol_aprov_superf($registro['vol_sup']);
            $this->setNum_aprov_subt($registro['anexos_sub']);
            $this->setVol_aprov_subt($registro['vol_sub']);
            $this->setPuntos_desc($registro['p_descarga']);
            $this->setVol_desc_diario($registro['vol_desc']);
            $this->setZonas_fed_amp_titulo($registro['z_federales']);
            $this->setSupeficie($registro['superficie']);
            $this->setFecha_reg($registro['fecha_reg']);
            return $this;
        } catch (PDOException $exc) {
            $db = null;
            echo $exc->getMessage();
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
            $select = $db->prepare('UPDATE titulo SET '
                . 'uso_id=:uso_id,'
                . 'titular=:titular,'
                . 'vol_total=:vol_total,'
                . 'anexos_sup=:anexos_sup,'
                . 'vol_sup=:vol_sup,'
                . 'anexos_sub=:anexos_sub,'
                . 'vol_sub=:vol_sub,'
                . 'p_descarga=:p_descarga,'
                . 'vol_desc=:vol_desc,'
                . 'z_federales=:z_federales,'
                . 'superficie=:superficie,'
                . 'fecha_reg=:fecha_reg '
                . 'WHERE id_titulo=:id_titulo');
            //Colocamos los datos
            $select->bindValue('id_titulo', $this->getId_titulo(), PDO::PARAM_STR);
            $select->bindValue('uso_id', $this->getUso_id(), PDO::PARAM_INT);
            $select->bindValue('titular', $this->getTitular(), PDO::PARAM_STR);
            $select->bindValue('vol_total', $this->getVol_amparado_total(), PDO::PARAM_STR);
            $select->bindValue('anexos_sup', $this->getNum_aprov_superf(), PDO::PARAM_INT);
            $select->bindValue('vol_sup', $this->getVol_aprov_superf(), PDO::PARAM_STR);
            $select->bindValue('anexos_sub', $this->getNum_aprov_subt(), PDO::PARAM_INT);
            $select->bindValue('vol_sub', $this->getVol_aprov_subt(), PDO::PARAM_STR);
            $select->bindValue('p_descarga', $this->getPuntos_desc(), PDO::PARAM_INT);
            $select->bindValue('vol_desc', $this->getVol_desc_diario(), PDO::PARAM_STR);
            $select->bindValue('z_federales', $this->getZonas_fed_amp_titulo(), PDO::PARAM_INT);
            $select->bindValue('superficie', $this->getSupeficie(), PDO::PARAM_STR);
            $select->bindValue('fecha_reg', $this->getFecha_reg(), PDO::PARAM_STR);
            if ($select->execute()) {
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Actualizó el titulo " . $this->getId_titulo() . " en la tabla titulo";
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
            $select = $db->prepare('DELETE FROM titulo WHERE id_titulo=:id_titulo');
            //Colocamos los datos
            $select->bindValue('id_titulo', $this->getId_titulo(), PDO::PARAM_STR);
            if ($select->execute()) {
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Eliminó el titulo " . $this->getId_titulo() . " en la tabla titulo";
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                return $select->execute();
            }
        } catch (PDOException $exc) {
            return null;
        }
    }

    /**
     * @return int|null
     */
    public function getTitu()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('SELECT id_titulo from titulo where id_titulo=:id_titulo');
            $select->bindValue('id_titulo', $this->getId_titulo(), PDO::PARAM_STR);
            $select->execute();
            return $select->rowCount();
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }
}
