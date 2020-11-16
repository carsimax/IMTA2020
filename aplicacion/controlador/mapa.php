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
require_once(__DIR__ . "/../controlador/sesion.php");
require_once(__DIR__ . "/../modelo/organismoestado.php");
require_once(__DIR__ . "/../modelo/acuifero.php");
require_once(__DIR__ . "/../modelo/acuiferomun.php");
require_once(__DIR__ . "/../modelo/presa.php");
require_once(__DIR__ . "/../modelo/presavolumen.php");
require_once(__DIR__ . "/../modelo/municipio.php");
require_once(__DIR__ . "/../modelo/estado.php");
require_once(__DIR__ . "/../modelo/usuario.php");
require_once(__DIR__ . "/../modelo/consulta.php");
require_once(__DIR__ . "/../modelo/distritoriego.php");
require_once(__DIR__ . "/../modelo/siembradistrito.php");
require_once(__DIR__ . "/../modelo/volumendistrito.php");
require_once(__DIR__ . "/../modelo/anio.php");
require_once(__DIR__ . "/../modelo/organismo.php");
require_once(__DIR__ . "/../modelo/distritoriego.php");
require_once(__DIR__ . "/../modelo/ciclo.php");
require_once(__DIR__ . "/../modelo/cultivo.php");
require_once(__DIR__ . "/../modelo/estacionclimatologica.php");
require_once(__DIR__ . "/../modelo/estacionhidrometrica.php");
require_once(__DIR__ . "/../modelo/region.php");
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
        /**
     * Funcion para obtener los estados
     */
    case 'Estados':
        try {
            getEstados(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /**
         * Funcion para obtener los municipios
         */
    case 'Municipios':
        try {
            getMuni(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /**
         * Funcion para obtener los acuiferos por estado
         */
    case 'Acuiferos(Estado)':
        try {
            getAcuEstado(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /**
         * Funcion para obtener los acuiferos por municipio
         */
    case 'Acuiferos(Muni)':
        try {
            getAcuMuni(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Acuiferos(Muni)2':
        try {
            getAcuMuni2(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /**
         * Funcion para obtener los acuiferos
         */
    case 'Acuiferos':
        try {
            getAcu(filter_input(INPUT_POST, "query"), filter_input(INPUT_POST, "desglose"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'EstacionClimatologica(Municipio)':
        try {
            getEstacionClimatologicaMuni(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'EstacionesClimatologicas':
        try {
            getEstacionesClimatologicas(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'MunicipiosCuenca':
        try {
            getMunicipiosCuencaEstacionClimatologica(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'MunicipiosCuencaHidrologica':
        try {
            getMunicipiosCuencaEstacionHidrometrica(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'EstacionHidrometrica(Municipio)':
        try {
            getEstacionHidrometricaMuni(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'EstacionesHidrometricas':
        try {
            getEstacionesHidrometricas(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;

        /**
         * Funcion para obtener los presas Estado
         */
    case 'Presas(Estado)':
        try {
            getPresaEstado(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /**
         * Funcion de presas municipios
         */
    case 'Presas(Muni)':
        try {
            getPresaMuni(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;

        /**
         * Funcion para obtener las presas
         */
    case 'Presas':
        try {
            getPresas(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /**
         * Funcion para obtener presa volumen
         */
    case 'PresaVolumen':
        try {
            getPresaVolumen(filter_input(INPUT_POST, "id"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'PresaVolumenT':
        try {
            getPresaVolumenT(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /**
         * Historial
         */
    case 'Historial':
        try {
            Historial(filter_input(INPUT_POST, "Modulo"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Distritos(Estado)':
        try {
            getDREstado(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'DistritosOC':
        try {
            getTablaOC(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'DistritosOC2':
        try {
            getTablaOC2(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Anio':
        try {
            getAnio(filter_input(INPUT_POST, "id"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'rha':
        try {
            getRHA(filter_input(INPUT_POST, "id"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'DR':
        try {
            getDR(filter_input(INPUT_POST, "id"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Ciclo':
        try {
            getCiclo(filter_input(INPUT_POST, "id"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Cultivo':
        try {
            getCultivo(filter_input(INPUT_POST, "id"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'DistritosVol':
        try {
            getTablaVol(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'DistritosVol2':
        try {
            getTablaVol2(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'getOC':
        try {
            getOC(filter_input(INPUT_POST, "id"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'getRH':
        try {
            getRH(filter_input(INPUT_POST, "id"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'getMuniId':
        try {
            getMuniId(filter_input(INPUT_POST, "id"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

/**
 * @param $query
 * Funcion para obtener los estados pertenecientes a un organimos
 */
function getEstados($query)
{
    $OrganismoEstado = new OrganismoEstado();
    /**
     * Regresa los registros de los estados
     */
    echo json_encode($OrganismoEstado->getEstadoOrganismo($query));
}

/**
 * @param $query
 * Funcion para obtener los Acuiferos de un estado
 */
function getAcuEstado($query)
{
    $Acuifero = new Acuifero();
    /*
     * Regresa los acuiferos de un estado
     */
    echo json_encode($Acuifero->getAcuEstado($query));
}

/**
 * @param $query
 * Funcion para obtener los Acuiferos de un municipio
 */
function getAcuMuni($query)
{
    $Acuifero = new AcuiferoMun();
    /**
     * Regresa los acuiferos de un municipio
     */
    echo json_encode($Acuifero->getAcuMun($query));
}

function getAcuMuni2($query)
{
    $Acuifero = new AcuiferoMun();
    /**
     * Regresa los acuiferos de un municipio
     */
    echo json_encode($Acuifero->getAcuMunTitulo($query));
}
/**
 * @param $query
 * Funcion para obtener los municipios
 */
function getMuni($query)
{
    $Municipios = new Municipio();
    /**
     * Regresa los registros de los municipios
     */
    echo json_encode($Municipios->getMuni($query));
}

/**
 * @param $query
 * Funcion para obtener los Acuiferos
 */
function getAcu($query)
{

    $Acuifero = new Acuifero();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Acuifero->getAcuTabla($query));
}

//Obtiene las estaciones climatologicas con los municipios y cuencas seleccionadas
function getEstacionClimatologicaMuni($query)
{
    $EstacionClimatologica = new EstacionClimatologica();
    echo json_encode($EstacionClimatologica->getEstacionesMuni($query));
}

//Obtiene las cuencas con los municipios seleccionados en estaciones climatologicas
function getMunicipiosCuencaEstacionClimatologica($query)
{
    $EstacionClimatologica = new EstacionClimatologica();
    echo json_encode($EstacionClimatologica->getMunicipiosCuenca($query));
}

//Obtiene las cuencas con los municipios seleccionados en estaciones hidrometricas
function getMunicipiosCuencaEstacionHidrometrica($query)
{
    $EstacionHidrometrica = new EstacionHidrometrica();
    echo json_encode($EstacionHidrometrica->getMunicipiosCuenca($query));
}

//Obtiene las estaciones climatologicas con los municipios y cuencas seleccionadas
function getEstacionHidrometricaMuni($query)
{
    $EH = new EstacionHidrometrica();
    echo json_encode($EH->getEstacionesMuni($query));
}

//Obtiene las estaciones climatologicas para vaciarlas en la tabla de consulta
function getEstacionesClimatologicas($query)
{
    $EstacionClimatologica = new EstacionClimatologica();
    echo json_encode($EstacionClimatologica->getEstacionesTabla($query));
}

//Obtiene las estaciones hidrometricas para vaciarlas en la tabla de consulta
function getEstacionesHidrometricas($query)
{
    $EstacionHidrometrica = new EstacionHidrometrica();
    echo json_encode($EstacionHidrometrica->getEstacionesTabla($query));
}
/**
 * @param $query
 * Funcion para obtener las presas que estan relacionadas a un estado
 */
function getPresaEstado($query)
{
    $Presa = new Presa();
    /**
     * /Regresa los registros de las presas
     */
    echo json_encode($Presa->getPresaEstado($query));
}

/**
 * @param $query
 * Funcion para obtener las presas que estan relacionadas a un municipio
 */
function getPresaMuni($query)
{
    $Presa = new Presa();
    /**
     * /Regresa los registros de las presas
     */
    echo json_encode($Presa->getPresaMuni($query));
}

/**
 * @param $query
 * Funcion para obtener los presas
 */
function getPresas($query)
{
    $Presa = new Presa();
    /**
     * Regresa los registros de las presas
     */
    echo json_encode($Presa->getPresaTabla($query));
}

/**
 * @param $query
 * Funcion para obtener las presas volumen
 */
function getPresaVolumen($query)
{
    $Presa = new PresaVolumen();
    /**
     * Regresa los registros de la presa volumen
     */
    echo json_encode($Presa->getPresaVol($query));
}

function getPresaVolumenT($query)
{
    $Presa = new PresaVolumen();
    /**
     * Regresa los registros de la presa volumen
     */
    echo json_encode($Presa->getPresaVolT($query));
}

function Historial($modulo)
{
    /**
     * La informacion para el log de la consulta
     */
    $sector = "";
    $grado = "";
    $institucion = "";
    $modulo = $modulo;

    $usuario = new Usuario();
    $usuario->setIdUsuario($_SESSION["ID_Usuario"]);
    $sector = $usuario->getSector();

    /**
     * Dependiendo el secto se obtendra cierta informacion
     */
    switch ($sector) {
        case 'Educativo':
            $grado = $usuario->getGrado();
            $institucion = $usuario->getEscuela();
            break;
        case 'Público':
            $institucion = $usuario->getPublico();
            break;
        case 'Privado':
            $institucion = $usuario->getPrivado();
            break;
    }
    $consulta = new Consulta();
    $consulta->setSector($sector);
    $consulta->setGrado($grado);
    $consulta->setInstitucion($institucion);
    $consulta->setModulo($modulo);
    $consulta->Insert();
}

/**
 * @param $query
 * Funcion para obtener los Acuiferos de un estado
 */
function getDREstado($query)
{
    $DR = new DistritoRiego();
    /*
     * Regresa los acuiferos de un estado
     */
    echo json_encode($DR->getDREstado($query));
}

/**
 * @param $query
 * Funcion para obtener los Acuiferos
 */
function getTablaOC($query)
{

    $SDR = new SiembraDistrito();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($SDR->getTablaOC($query));
}

function getTablaOC2($query)
{

    $SDR = new SiembraDistrito();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($SDR->getTablaOC2($query));
}

/**
 * @param $query
 * Funcion para obtener los Acuiferos
 */
function getTablaVol($query)
{

    $VDR = new VolumenDistrito();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($VDR->getTablaVol($query));
}

function getTablaVol2($query)
{

    $VDR = new VolumenDistrito();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($VDR->getTablaVol2($query));
}

function getAnio($query)
{

    $Anio = new Anio();
    /**
     * Regresa los registros de los acuiferos
     */
    $anio = $Anio->getAnnio2($query);
    echo json_encode($anio['anio']);
}

function getRH($query){
    $RH = new RegionHidrologica();
    echo json_encode($RH->getRH($query));
}

function getOC($query){
    $OC = new Organismo();
    echo json_encode($OC->getOC($query));
}

function getMuniId($query)
{

    $Muni = new Municipio();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Muni->getMuniId($query));
}


function getRHA($query)
{

    $OC = new Organismo();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($OC->getRHA($query));
}

function getDR($query)
{
    $DR = new DistritoRiego();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($DR->getDRI($query));
}

function getCiclo($query)
{
    $Ciclo = new Ciclo();
    /**
     * Regresa los registros de los acuiferos
     */
    $Ciclo = $Ciclo->getCicloI($query);
    echo json_encode($Ciclo['nombre']);
}

function getMod($query)
{
    $Ciclo = new Ciclo();
    /**
     * Regresa los registros de los acuiferos
     */
    $Ciclo = $Ciclo->getCicloI($query);
    echo json_encode($Ciclo['nombre']);
}

function getCultivo($query)
{
    $Cultivo = new Cultivo();
    /**
     * Regresa los registros de los acuiferos
     */
    $Cultivo = $Cultivo->getCulID($query);
    echo json_encode($Cultivo['nombre']);
}
