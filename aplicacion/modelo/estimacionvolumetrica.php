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

class EstimacionVolumetrica
{

  private $id_estimacion;
  private $anio_id;
  private $estado_id;
  private $municipio_id;
  private $ciclo_id;
  private $sup_sembrada;
  private $volumen_neto;


  // Obtiene los anios de la tabla estimacion_volumetrica_cultivo
  public function getAnios()
  {
    $pdo = new DBConnection();
    $db = $pdo->DBConnect();
    try {
      $select = $db->prepare('SELECT id_anio,anio_agricola FROM estimacion_volumetrica_cultivo, anio WHERE estimacion_volumetrica_cultivo.anio_id=anio.id_anio GROUP BY id_anio ORDER BY anio_agricola DESC');
      $select->execute();
      return $select->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $exc) {
      echo $exc->getMessage();
      return false;
    }
  }

  // Obtiene los estados de la tabla estimacion_volumetrica_cultivo
  public function getEstados($anio)
  {
    $pdo = new DBConnection();
    $db = $pdo->DBConnect();
    try {
      $select = $db->prepare('SELECT id_estado,nombre FROM estimacion_volumetrica_cultivo, estado WHERE estimacion_volumetrica_cultivo.estado_id=estado.id_estado AND (' . $anio . ') GROUP BY id_estado ORDER BY estado.nombre');
      $select->execute();
      return $select->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $exc) {
      echo $exc->getMessage();
      return false;
    }
  }

  //Obtiene los municipios de la tabla estimacion_volumetrica_cultivo 
  public function getMunicipios($estados)
  {
    $pdo = new DBConnection();
    $db = $pdo->DBConnect();
    try {
      $select = $db->prepare('SELECT id_municipio,nombre FROM estimacion_volumetrica_cultivo, municipio WHERE estimacion_volumetrica_cultivo.municipio_id=municipio.id_municipio AND (' . $estados . ') GROUP BY id_municipio ORDER BY municipio.nombre');
      $select->execute();
      return $select->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $exc) {
      echo $exc->getMessage();
      return false;
    }
  }


  //Obtiene los municipios de la tabla estimacion_volumetrica_cultivo 
  public function getCiclos($municipios)
  {
    $pdo = new DBConnection();
    $db = $pdo->DBConnect();
    try {
      $select = $db->prepare('SELECT id_ciclo,nombre FROM estimacion_volumetrica_cultivo, ciclo WHERE estimacion_volumetrica_cultivo.ciclo_id=ciclo.id_ciclo AND (' . $municipios . ') GROUP BY id_ciclo ORDER BY ciclo.nombre');
      $select->execute();
      return $select->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $exc) {
      echo $exc->getMessage();
      return false;
    }
  }

  //Obtiene los cultivos de la tabla estimacion_volumetrica_cultivo 
  public function getCultivos($query)
  {
    $pdo = new DBConnection();
    $db = $pdo->DBConnect();
    try {
      $select = $db->prepare('SELECT id_cultivo,nombre FROM estimacion_volumetrica_cultivo, cultivo WHERE estimacion_volumetrica_cultivo.cultivo_id=cultivo.id_cultivo AND (' . $query . ') GROUP BY id_cultivo ORDER BY cultivo.nombre');
      $select->execute();
      return $select->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $exc) {
      echo $exc->getMessage();
      return false;
    }
  }




  public function getConsulta($QUERY)
  {
    $pdo = new DBConnection();
    $db = $pdo->DBConnect();
    try {
      $select = $db->prepare('SELECT
      anio.id_anio,
      anio.anio,
      anio.anio_agricola,
      estado.id_estado,
      estado.nombre as Estado,
      municipio.nombre as Municipio,
      ciclo.nombre as Ciclo,
      cultivo.id_cultivo,
      cultivo.nombre as Cultivo,
      TRUNCATE (sum(estimacion_volumetrica_cultivo.sup_sembrada),2) AS SEM,
      TRUNCATE (sum(estimacion_volumetrica_cultivo.volumen_neto),2) AS VOL_NET
      FROM estimacion_volumetrica_cultivo
      INNER JOIN anio ON anio.id_anio=estimacion_volumetrica_cultivo.anio_id
      INNER JOIN estado ON estado.id_estado=estimacion_volumetrica_cultivo.estado_id
      INNER JOIN municipio ON municipio.id_municipio=estimacion_volumetrica_cultivo.municipio_id
      INNER JOIN ciclo ON ciclo.id_ciclo=estimacion_volumetrica_cultivo.ciclo_id
      INNER JOIN cultivo on cultivo.id_cultivo=estimacion_volumetrica_cultivo.cultivo_id
      WHERE ' . $QUERY);
      $select->execute();
      return $select->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $exc) {
      echo $exc->getMessage();
      return false;
    }
  }


  public function getId_estimacion()
  {
    return $this->id_estimacion;
  }

  public function setId_estimacion($id_estimacion)
  {
    $this->id_estimacion = $id_estimacion;
  }

  public function getAnio_id()
  {
    return $this->anio_id;
  }

  public function setAnio_id($anio_id)
  {
    $this->anio_id = $anio_id;
  }

  public function getEstado_id()
  {
    return $this->estado_id;
  }

  public function setEstado_id($estado_id)
  {
    $this->estado_id = $estado_id;
  }

  public function getMunicipio_id()
  {
    return $this->municipio_id;
  }

  public function setMunicipio_id($municipio_id)
  {
    $this->municipio_id = $municipio_id;
  }

  public function getCiclo_id()
  {
    return $this->ciclo_id;
  }

  public function setCiclo_id($ciclo_id)
  {
    $this->ciclo_id = $ciclo_id;
  }

  public function getSup_sembrada()
  {
    return $this->sup_sembrada;
  }

  public function setSup_sembrada($sup_sembrada)
  {
    $this->sup_sembrada = $sup_sembrada;
  }

  public function getVolumen_neto()
  {
    return $this->volumen_neto;
  }

  public function setVolumen_neto($volumen_neto)
  {
    $this->volumen_neto = $volumen_neto;
  }

  function __construct()
  {
  }
}
