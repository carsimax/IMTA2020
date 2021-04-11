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
require_once(__DIR__ . "/../modelo/estimacionvolumetrica.php");


/**
 * La variable acción almacena la función que recibimos desde la vista.
 */
$accion = filter_input(INPUT_POST, "Accion");

//Si no se recibió nada por post, intentara recibirlo por get.
if (filter_input(INPUT_POST, "Accion") == NULL) {
  $accion = filter_input(INPUT_GET, "Accion");
}

/**
 * Este switch es la controladora de las funciones que contiene el controlador,
 * Desde aquí se determina a que función del controlador llamar.
 */
switch ($accion) {
  case 'getEstados':
    try {
      getEstados();
    } catch (Exception $exc) {
      echo $exc->getTraceAsString();
    }
    break;
  case 'getMunicipios':
    try {
      getMunicipios();
    } catch (Exception $exc) {
      echo $exc->getTraceAsString();
    }
    break;

  case 'getCiclos':
    try {
      getCiclos();
    } catch (Exception $exc) {
      echo $exc->getTraceAsString();
    }
    break;
  case 'getCultivos':
    try {
      getCultivos();
    } catch (Exception $exc) {
      echo $exc->getTraceAsString();
    }
    break;
  case 'getConsulta':
    try {
      getConsulta();
    } catch (Exception $exc) {
      echo $exc->getTraceAsString();
    }
    break;
}

//Obtiene los estados del anio seleccionado
function getEstados()
{
  $EstimacionVol = new EstimacionVolumetrica();
  echo json_encode($EstimacionVol->getEstados(filter_input(INPUT_POST, "query")));
}

// Obtiene los municipios del estado seleccionado
function getMunicipios()
{
  $EstimacionVol = new EstimacionVolumetrica();
  echo json_encode($EstimacionVol->getMunicipios(filter_input(INPUT_POST, "query")));
}

// Obtiene los ciclos del municipio seleccionado
function getCiclos()
{
  $EstimacionVol = new EstimacionVolumetrica();
  echo json_encode($EstimacionVol->getCiclos(filter_input(INPUT_POST, "query")));
}


// Obtiene los ciclos del municipio seleccionado
function getCultivos()
{
  $EstimacionVol = new EstimacionVolumetrica();
  echo json_encode($EstimacionVol->getCultivos(filter_input(INPUT_POST, "query")));
}
// Obtiene los ciclos del municipio seleccionado
function getConsulta()
{
  $EstimacionVol = new EstimacionVolumetrica();
  echo json_encode($EstimacionVol->getConsulta(filter_input(INPUT_POST, "query")));
}
