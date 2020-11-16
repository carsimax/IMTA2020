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
require_once (__DIR__ . "/../modelo/distritoriego.php");
require_once (__DIR__ . "/../modelo/registrodistrito.php");
require_once (__DIR__ . "/../modelo/volumendistrito.php");
require_once (__DIR__ . "/../modelo/siembradistrito.php");
require_once (__DIR__ . "/../../sistema/functionsexcel.php");
require_once (__DIR__ . "/../../excel/PHPExcel/IOFactory.php"); //Libreria de excel
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
     * Funcion para realizar el registro del distrito de riego
     */
    case 'Nuevo':
        try {
            Nuevo();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /**
         * Si es el caso de actualizar
         */
    case 'Actualizar':
        try {
            Actualizar();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /**
         * Funcion para Borrar
         */
    case 'Delete':
        try {
            Eliminar();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case "NuevoReg":
        try {
            nuevoRegistro();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case "UpdateReg":
        try {
            updateRegistro();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'DeleteRegistro':
        try {
            eliminarRegistro();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'NuevoRegVol':
        try {
            nuevoVolumen();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'UpdateRegVol':
        try {
            updateVolumen();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'DeleteRegVol':
        try {
            deleteVolumen();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'NuevoRegSiembra':
        try {
            insertSiembra();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'UpdateRegSiembra':
        try {
            updateSiembra();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'DeleteRegSiembra':
        try {
            deleteSiembra();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Todos':
        try {
            getTodos();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'getProduccionSiembra':
        try {
            getProduccionSiembra();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'getRegistrosVolumen':
        try {
            getRegistrosVolumen();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'getDRId':
        try {
            getDRId();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'importExcel':
        try {
            importExcelSiembra();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'importVolumenExcel':
        try {
            importExcelVolumen();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;

    case 'getOrganismos':
        try {
            getOrganismos();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'getOrganismos2':
        try {
            getOrganismos2();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'getEstados':
        try {
            getEstados();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'getEstados2':
        try {
            getEstados2();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'getDRProduccion':
        try {
            getDRProduccion(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'getDRProduccion2':
        try {
            getDRProduccion2(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

/**
 * Funcion para insertar un nuevo Distrito a la base de datos
 */
function Nuevo()
{
    $DistritoRiego = new DistritoRiego();
    $DistritoRiego->setIdDistritoRiego(filter_input(INPUT_GET, "id_distrito_riego"));
    $DistritoRiego->setNomDr(filter_input(INPUT_GET, "nom_dr"));
    $DistritoRiego->setOrganismoId(filter_input(INPUT_GET, "organismo_id"));
    $DistritoRiego->setEstadoId(filter_input(INPUT_GET, "estado_id"));
    if ($DistritoRiego->Insert() != null) {
        echo 'OK';
    } else {
        echo 'Ya se encuentra en la Base de Datos';
    }
}

/**
 * Funcion para actualizar un Distrito de riego a la base de datos
 */
function Actualizar()
{
    $DistritoRiego = new DistritoRiego();
    /**
     * Colocar los datos del GET por medio de los metodos SET
     */
    $DistritoRiego->setIdDistritoRiego(filter_input(INPUT_GET, "ID"));
    $DistritoRiego->setNomDr(filter_input(INPUT_GET, "nom_dr"));
    $DistritoRiego->setOrganismoId(filter_input(INPUT_GET, "organismo_id"));
    $DistritoRiego->setEstadoId(filter_input(INPUT_GET, "estado_id"));

    if ($DistritoRiego->Update() != null) {
        echo 'OK';
    } else {
        echo 'Algo salío mal :(';
    }
}

/**
 * Funcion para Eliminar un distrito de riego
 */
function Eliminar()
{
    $DistritoRiego = new DistritoRiego();
    $DistritoRiego->setIdDistritoRiego(filter_input(INPUT_GET, "ID"));
    echo $DistritoRiego->delete();
}

function nuevoRegistro()
{
    $RegistroDistrito = new RegistroDistrito();
    $RegistroDistrito->setSupTot(filter_input(INPUT_GET, 'sup_tot'));
    $RegistroDistrito->setSupRasup(filter_input(INPUT_GET, 'sup_rasup'));
    $RegistroDistrito->setSupRasub(filter_input(INPUT_GET, 'sup_rasub'));
    $RegistroDistrito->setSupRtot(filter_input(INPUT_GET, 'sup_rtot'));
    $RegistroDistrito->setVolAsup(filter_input(INPUT_GET, 'vol_asup'));
    $RegistroDistrito->setVolAsub(filter_input(INPUT_GET, 'vol_asub'));
    $RegistroDistrito->setVolAtot(filter_input(INPUT_GET, 'vol_atot'));
    $RegistroDistrito->setAnioagricolaId(filter_input(INPUT_GET, 'anioagricola_id'));
    $RegistroDistrito->setDistritoRiegoId(filter_input(INPUT_GET, 'distrito_riego_id'));
    if ($RegistroDistrito->Insert() != null) {
        echo 1;
    } else {
        echo 2;
    }
}

function updateRegistro()
{
    $RegistroDistrito = new RegistroDistrito();
    $RegistroDistrito->setIdRegistro(filter_input(INPUT_GET, 'id_registro'));
    $RegistroDistrito->setSupTot(filter_input(INPUT_GET, 'sup_tot'));
    $RegistroDistrito->setSupRasup(filter_input(INPUT_GET, 'sup_rasup'));
    $RegistroDistrito->setSupRasub(filter_input(INPUT_GET, 'sup_rasub'));
    $RegistroDistrito->setSupRtot(filter_input(INPUT_GET, 'sup_rtot'));
    $RegistroDistrito->setVolAsup(filter_input(INPUT_GET, 'vol_asup'));
    $RegistroDistrito->setVolAsub(filter_input(INPUT_GET, 'vol_asub'));
    $RegistroDistrito->setVolAtot(filter_input(INPUT_GET, 'vol_atot'));
    $RegistroDistrito->setAnioagricolaId(filter_input(INPUT_GET, 'anioagricola_id'));
    $RegistroDistrito->setDistritoRiegoId(filter_input(INPUT_GET, 'distrito_riego_id'));
    if (validarUpdate($RegistroDistrito) == 1) {
        if ($RegistroDistrito->update() != null) {
            echo 1; //La funcion update de DistritoRegistro se realizó con exito
        } else {
            echo 2; //La funcion update de DistritoRegistro identificó un error
        }
    } else { //La funcion validar update identificó un error
        echo 2;
    }
}

function validarUpdate($RegistroDistrito)
{
    $pdo = new DBConnection();
    $db = $pdo->DBConnect();
    $select = $db->prepare('SELECT anioagricola_id FROM registro_distrito WHERE id_registro=:id_registro');
    $select->bindValue('id_registro', $RegistroDistrito->getIdRegistro(), PDO::PARAM_INT);
    $select->execute();
    $resul = $select->fetch();
    if ($resul['anioagricola_id'] == $RegistroDistrito->getAnioagricolaId()) {
        return 1; //Se puede actualizar ya que es información del mismo año
    } else {
        $select = $db->prepare('SELECT COUNT(distrito_riego_id) AS num FROM registro_distrito WHERE anioagricola_id=:anioagricola_id and distrito_riego_id=:distrito_riego_id');
        $select->bindValue('distrito_riego_id', $RegistroDistrito->getDistritoRiegoId(), PDO::PARAM_STR);
        $select->bindValue('anioagricola_id', $RegistroDistrito->getAnioagricolaId(), PDO::PARAM_INT);
        $select->execute();
        $resul = $select->fetch();
        if ($resul['num'] == 0) {
            return 1; //Se puede actualizar ya que es un año que no tiene vinculada información
        } else {
            return 0; //No se puede actualizar ya que el año seleccionado tiene vinculada información
        }
    }
}

function eliminarRegistro()
{
    $registroDistrito = new RegistroDistrito();
    $registroDistrito->setIdRegistro(filter_input(INPUT_GET, "id_registro"));
    echo $registroDistrito->delete();
}

function nuevoVolumen()
{

    $VolumenDistrito = new VolumenDistrito();
    $VolumenDistrito->setSuperficieRegada1(filter_input(INPUT_GET, 'superficie_regada1'));
    $VolumenDistrito->setVolumenDistribuido1(filter_input(INPUT_GET, 'volumen_distribuido1'));
    $VolumenDistrito->setUsuarios1(filter_input(INPUT_GET, 'usuarios1'));
    $VolumenDistrito->setSuperficieRegada2(filter_input(INPUT_GET, 'superficie_regada2'));
    $VolumenDistrito->setVolumenDistribuido2(filter_input(INPUT_GET, 'volumen_distribuido2'));
    $VolumenDistrito->setUsuarios2(filter_input(INPUT_GET, 'usuarios2'));
    $VolumenDistrito->setSuperficieRegada3(filter_input(INPUT_GET, 'superficie_regada3'));
    $VolumenDistrito->setVolumenDistribuido3(filter_input(INPUT_GET, 'volumen_distribuido3'));
    $VolumenDistrito->setUsuarios3(filter_input(INPUT_GET, 'usuarios3'));
    $VolumenDistrito->setAnioId(filter_input(INPUT_GET, 'anio_id'));
    $VolumenDistrito->setFuenteId(filter_input(INPUT_GET, 'fuente_id'));
    $VolumenDistrito->setTenenciaId(filter_input(INPUT_GET, 'tenencia_id'));
    $VolumenDistrito->setDistritoRiegoId(filter_input(INPUT_GET, 'distrito_riego_id'));
    if ($VolumenDistrito->Insert() != null) {
        echo 1;
    } else {
        echo 2;
    }
}

function updateVolumen()
{

    $VolumenDistrito = new VolumenDistrito();
    $VolumenDistrito->setSuperficieRegada1(filter_input(INPUT_GET, 'superficie_regada1'));
    $VolumenDistrito->setVolumenDistribuido1(filter_input(INPUT_GET, 'volumen_distribuido1'));
    $VolumenDistrito->setUsuarios1(filter_input(INPUT_GET, 'usuarios1'));
    $VolumenDistrito->setSuperficieRegada2(filter_input(INPUT_GET, 'superficie_regada2'));
    $VolumenDistrito->setVolumenDistribuido2(filter_input(INPUT_GET, 'volumen_distribuido2'));
    $VolumenDistrito->setUsuarios2(filter_input(INPUT_GET, 'usuarios2'));
    $VolumenDistrito->setSuperficieRegada3(filter_input(INPUT_GET, 'superficie_regada3'));
    $VolumenDistrito->setVolumenDistribuido3(filter_input(INPUT_GET, 'volumen_distribuido3'));
    $VolumenDistrito->setUsuarios3(filter_input(INPUT_GET, 'usuarios3'));
    $VolumenDistrito->setAnioId(filter_input(INPUT_GET, 'anio_id'));
    $VolumenDistrito->setFuenteId(filter_input(INPUT_GET, 'fuente_id'));
    $VolumenDistrito->setTenenciaId(filter_input(INPUT_GET, 'tenencia_id'));
    $VolumenDistrito->setIdVolumenDistrito(filter_input(INPUT_GET, 'id_volumen_distrito'));
    if (validarUpdateVol($VolumenDistrito) == 1) {
        if ($VolumenDistrito->update() != null) {
            echo 1; //La funcion update de DistritoRegistro se realizó con exito
        } else {
            echo 2; //La funcion update de DistritoRegistro identificó un error
        }
    } else { //La funcion validar update identificó un error
        echo 2;
    }
}

function validarUpdateVol($VolumenDistrito)
{
    $pdo = new DBConnection();
    $db = $pdo->DBConnect();
    $select = $db->prepare('SELECT anio_id FROM volumen_distrito WHERE id_volumen_distrito=:id_volumen_distrito');
    $select->bindValue('id_volumen_distrito', $VolumenDistrito->getIdVolumenDistrito(), PDO::PARAM_INT);
    $select->execute();
    $resul = $select->fetch();
    if ($resul['anio_id'] == $VolumenDistrito->getAnioId()) {
        return 1; //Se puede actualizar ya que es información del mismo año
    } else {
        try {
            $select = $db->prepare('SELECT COUNT(distrito_riego_id) AS num FROM volumen_distrito WHERE anio_id=:anio_id and distrito_riego_id=:distrito_riego_id');
            $select->bindValue('distrito_riego_id', $VolumenDistrito->getDistritoRiegoId(), PDO::PARAM_INT);
            $select->bindValue('anio_id', $VolumenDistrito->getAnioId(), PDO::PARAM_INT);
            $select->execute();
            $resul = $select->fetch();
            if ($resul['num'] == 0) {
                return 1; //Se puede actualizar ya que es un año que no tiene vinculada información
            } else {
                return 0; //No se puede actualizar ya que el año seleccionado tiene vinculada información
            }
        } catch (Exception $exc) {
            echo $exc->getMessage();
        }
    }
}

function deleteVolumen()
{
    $volumenDistrito = new VolumenDistrito();
    $volumenDistrito->setIdVolumenDistrito(filter_input(INPUT_GET, "ID"));
    echo $volumenDistrito->delete();
}

function insertSiembra()
{

    $siembraDistrito = new SiembraDistrito();
    $siembraDistrito->setModalidad(filter_input(INPUT_GET, 'modalidad'));
    $siembraDistrito->setSembrada(filter_input(INPUT_GET, 'sembrada'));
    $siembraDistrito->setCosechada(filter_input(INPUT_GET, 'cosechada'));
    $siembraDistrito->setProduccion(filter_input(INPUT_GET, 'produccion'));
    $siembraDistrito->setValor(filter_input(INPUT_GET, 'valor'));
    $siembraDistrito->setAnioagricolaId(filter_input(INPUT_GET, 'anio_id'));
    $siembraDistrito->setCicloId(filter_input(INPUT_GET, 'ciclo_id'));
    $siembraDistrito->setTenenciaId(filter_input(INPUT_GET, 'tenencia_id'));
    $siembraDistrito->setCultivoId(filter_input(INPUT_GET, 'cultivo_id'));
    $siembraDistrito->setDistritoRiegoId(filter_input(INPUT_GET, 'distrito_riego_id'));
    //Se obtienen los valores por medio de get y se valida el insert
    $validar = validarInsertSiembra($siembraDistrito);
    if ($validar == 1) { //El los datos nos se repiten entonces se registra en a base de datos
        echo $siembraDistrito->insert();
    } else {
        echo "Se encontró un registro igual a la base de datos."; //La funcion de validar encontró un registro igual en la base
    }
}

function validarInsertSiembra($siembraDistrito)
{
    //Se valida si es que hay un registro con el mismo año
    $pdo = new DBConnection();
    $db = $pdo->DBConnect();
    $select = $db->prepare('SELECT COUNT(distrito_riego_id) AS num FROM siembra_distrito WHERE anio_id=:anioagricola_id AND distrito_riego_id=:distrito_riego_id AND cultivo_id=:cultivo_id AND ciclo_id=:ciclo_id AND tenencia_id=:tenencia_id AND modalidad=:modalidad');
    $select->bindValue('modalidad', $siembraDistrito->getModalidad(), PDO::PARAM_STR);
    $select->bindValue('distrito_riego_id', $siembraDistrito->getDistritoRiegoId(), PDO::PARAM_STR);
    $select->bindValue('anioagricola_id', $siembraDistrito->getAnioagricolaId(), PDO::PARAM_INT);
    $select->bindValue('cultivo_id', $siembraDistrito->getCultivoId(), PDO::PARAM_INT);
    $select->bindValue('ciclo_id', $siembraDistrito->getCicloId(), PDO::PARAM_INT);
    $select->bindValue('tenencia_id', $siembraDistrito->getTenenciaId(), PDO::PARAM_INT);
    $select->execute();
    $resul = $select->fetch();
    if ($resul['num'] >= 1) { //Se encontró un registro igual entonces no se puede insertar
        return 2;
    } else {
        return 1; //Es información de diferente año, se puede insertar en la base de datos
    }
}

function updateSiembra()
{

    $siembraDistrito = new SiembraDistrito();
    $siembraDistrito->setIdSiembraDistrito(filter_input(INPUT_GET, 'id_siembra_distrito'));
    $siembraDistrito->setModalidad(filter_input(INPUT_GET, 'modalidad'));
    $siembraDistrito->setSembrada(filter_input(INPUT_GET, 'sembrada'));
    $siembraDistrito->setCosechada(filter_input(INPUT_GET, 'cosechada'));
    $siembraDistrito->setProduccion(filter_input(INPUT_GET, 'produccion'));
    $siembraDistrito->setValor(filter_input(INPUT_GET, 'valor'));
    $siembraDistrito->setAnioagricolaId(filter_input(INPUT_GET, 'anioagricola_id'));
    $siembraDistrito->setCicloId(filter_input(INPUT_GET, 'ciclo_id'));
    $siembraDistrito->setTenenciaId(filter_input(INPUT_GET, 'tenencia_id'));
    $siembraDistrito->setCultivoId(filter_input(INPUT_GET, 'cultivo_id'));
    $siembraDistrito->setDistritoRiegoId(filter_input(INPUT_GET, 'distrito_riego_id'));
    $validar = validarUpdateSiembra($siembraDistrito);
    if ($validar == 1) { //El los datos nos se repiten entonces se registra en a base de datos
        echo $siembraDistrito->update();
    } else {
        echo "Se encontró un registro duplicado"; //La funcion de validar encontró un registro igual en la base
    }
}

function validarUpdateSiembra($siembraDistrito)
{
    //Se valida si es que hay un registro con el mismo año
    $pdo = new DBConnection();
    $db = $pdo->DBConnect();
    $select = $db->prepare('SELECT COUNT(distrito_riego_id) AS num FROM siembra_distrito WHERE anio_id=:anioagricola_id AND distrito_riego_id=:distrito_riego_id AND cultivo_id=:cultivo_id AND ciclo_id=:ciclo_id AND tenencia_id=:tenencia_id AND modalidad=:modalidad');
    $select->bindValue('modalidad', $siembraDistrito->getModalidad(), PDO::PARAM_STR);
    $select->bindValue('distrito_riego_id', $siembraDistrito->getDistritoRiegoId(), PDO::PARAM_STR);
    $select->bindValue('anioagricola_id', $siembraDistrito->getAnioagricolaId(), PDO::PARAM_INT);
    $select->bindValue('cultivo_id', $siembraDistrito->getCultivoId(), PDO::PARAM_INT);
    $select->bindValue('ciclo_id', $siembraDistrito->getCicloId(), PDO::PARAM_INT);
    $select->bindValue('tenencia_id', $siembraDistrito->getTenenciaId(), PDO::PARAM_INT);
    $select->execute();
    $resul = $select->fetch();
    if ($resul['num'] >= 1) { //Se encontró un registro igual entonces no se puede insertar
        $select = $db->prepare('SELECT modalidad, ciclo_id, tenencia_id,anioagricola_id, cultivo_id, distrito_riego_id FROM siembra_distrito WHERE id_siembra_distrito=:id_siembra_distrito');
        $select->bindValue('id_siembra_distrito', $siembraDistrito->getDistritoRiegoId(), PDO::PARAM_INT);
        $select->execute();
        $resul = $select->fetch();
        if (
            $resul['modalidad'] == $siembraDistrito->getDistritoRiegoId() &&
            $resul['distrito_riego_id'] == $siembraDistrito->getDTTid() &&
            $resul['anioagricola_id'] == $siembraDistrito->getAnioagricolaId() &&
            $resul['cultivo_id'] == $siembraDistrito->getCultivoId() &&
            $resul['ciclo_id'] == $siembraDistrito->getCicloId() &&
            $resul['tenencia_id'] == $siembraDistrito->getTenenciaId()
        ) {
            return 1; //Si es la misma info se puede actualizar
        } else {
            return 2; //Se encontró un registro diferente ;
        }

        return 2;
    } else {
        return 1; //Es información de diferente año, se puede insertar en la base de datos
    }
}

function deleteSiembra()
{

    $siembraDistrito = new SiembraDistrito();
    $siembraDistrito->setIdSiembraDistrito(filter_input(INPUT_GET, "ID"));

    echo $siembraDistrito->delete();
}

function getTodos()
{
    $DistritoRiego = new DistritoRiego();
    echo json_encode($DistritoRiego->getDRs());
}

//Obtiene la produccion agricola de un DR
function getProduccionSiembra()
{
    $siembraDistrito = new SiembraDistrito();
    $siembraDistrito->setDistritoRiegoId(filter_input(INPUT_GET, "ID"));
    echo json_encode($siembraDistrito->getRegistrosSiembra());
}
//Obtiene los volumenes de un DR
function getRegistrosVolumen()
{
    $volumenDistrito = new VolumenDistrito();
    $volumenDistrito->setDistritoRiegoId(filter_input(INPUT_GET, "ID"));
    echo json_encode($volumenDistrito->getRegistrosVolumen());
}

/**
 * Funcion para Eliminar una presa
 */
function getDRId()
{
    $DR = new DistritoRiego();
    echo json_encode($DR->getDRI(filter_input(INPUT_POST, "id")));
}

function getOrganismos()
{
    $DR = new DistritoRiego();
    /**
     * Regresa los registros de los estados
     */
    echo json_encode($DR->getOrganismos(filter_input(INPUT_POST, "query")));
}
function getOrganismos2()
{
    $DR = new DistritoRiego();
    /**
     * Regresa los registros de los estados
     */
    echo json_encode($DR->getOrganismos2(filter_input(INPUT_POST, "query")));
}

function getEstados()
{
    $DR = new DistritoRiego();
    /**
     * Regresa los registros de los estados
     */
    echo json_encode($DR->getEstados(filter_input(INPUT_POST, "query")));
}
function getEstados2()
{
    $DR = new DistritoRiego();
    /**
     * Regresa los registros de los estados
     */
    echo json_encode($DR->getEstados2(filter_input(INPUT_POST, "query")));
}

/**
 * @param $query
 * Funcion para obtener los Acuiferos de un estado
 */
function getDRProduccion($query)
{
    $DR = new DistritoRiego();
    echo json_encode($DR->getDRProduccion($query));
}
function getDRProduccion2($query)
{
    $DR = new DistritoRiego();
    echo json_encode($DR->getDRProduccion2($query));
}


//Lee el archivo de excel, extrae la información y la inserta en la base de datos
function importExcelSiembra()
{

    $objPHPExcel = getArchivo('Registros_No_Insertados.xlsx'); //Se obtiene el archivo
    $Distritos = getCatalogo('DistritoRiego', 'getIDs');
    $Ciclos = getCatalogo('Ciclo', 'getNamesAndIDs');
    $Tenencias = getCatalogo('Tenencia', 'getNamesAndIDs');
    $Cultivos = getCatalogo('Cultivo', 'getNamesAndIDs');
    $Modalidades = getCatalogoModalidades();
    $Anios = getCatalogo('Anio', 'getAnios');
    $objPHPExcel->setActiveSheetIndex(0); //Asignamos la hoja de calculo activa 1
    $numRows = $objPHPExcel->setActiveSheetIndex(0)->getHighestRow(); //Obtener el numero de filas del archivo
    $OK = true; //OK que nos ayuda a identificar si se realizó el proceso con éxito

    if ($numRows > 1) {
        $bottom = $numRows;
        $index = 2;
        while ($index <= $bottom) {
            $distritoSiembra = getValuesCosechaFromExcel($objPHPExcel, $index);
            $validar = validarCamposSiembra($distritoSiembra, $index, $Ciclos, $Tenencias, $Cultivos,  $Anios, $Distritos, $Modalidades);
            if ($validar != null) {
                writeExcel($objPHPExcel, 'K' . $index, $validar, 'Registros_No_Insertados.xlsx');
                $OK = false;
                $index++;
            } else {
                $distritoSiembra->Insert();
                $objPHPExcel->getActiveSheet()->removeRow($index);
                $bottom--;
            }
        }
    } else {
        echo 'Tu archivo en Excel está vacío.';
        unlink("../../temp/Registros_No_Insertados.xlsx");
    }
    if ($OK) {
        unlink("../../temp/Registros_No_Insertados.xlsx");
        echo 'OK';
    } else {
        setCellStyle($objPHPExcel, $bottom, "K"); //Se le da formato a la columna que contiene los errores
        writeExcel($objPHPExcel, 'K1', "Errores", 'Registros_No_Insertados.xlsx');
        $bottom == 1 ? $cadena = "No se pudo insertar 1 registro," : $cadena = "No se pudieron insertar " . --$bottom . " registros,";
        $arr = array('messageError' => $cadena . " favor de verificar.", 'url' => "../../../../temp/exceldownload.php");
        echo json_encode($arr);
    }
}


//Funcion que valida que no tenga campos nulos que existan los años agricolas, unidades de riego, cultivos, ciclos, tenencias y modalidad en la base de datos para que se pueda realizar la inserción //
function validarCamposSiembra($distritoSiembra, $index, $Ciclos, $Tenencias, $Cultivos,  $Anios, $Distritos, $Modalidades)
{
    $DBerror = "";
    $TypeError = "";
    if (strlen($distritoSiembra->getSembrada()) == null || strlen($distritoSiembra->getCosechada()) == null || strlen($distritoSiembra->getProduccion()) == null || strlen($distritoSiembra->getValor()) == null || strlen($distritoSiembra->getDistritoRiegoId()) == null || strlen($distritoSiembra->getCultivoId()) == null || strlen($distritoSiembra->getCicloId()) == null || strlen($distritoSiembra->getTenenciaId()) == null || strlen($distritoSiembra->getAnioagricolaId()) == null) {
        $TypeError = "hay campos vacíos.";
    }
    if (is_numeric($distritoSiembra->getSembrada()) == null || is_numeric($distritoSiembra->getCosechada()) == null || is_numeric($distritoSiembra->getProduccion()) == null || is_numeric($distritoSiembra->getValor()) == null || is_numeric($distritoSiembra->getAnioagricolaId()) == null) {
        if ($TypeError == "") {
            $TypeError = "verifica los campos númericos.";
        } else {
            $TypeError = trim($TypeError, '.');
            $TypeError = $TypeError . ", verifica los campos númericos.";
        }
    }
    //Se valida en anio
    $resultado = validarInfo($distritoSiembra->getAnioagricolaId(), $Anios, $index, 'anio', 'anio', 'id_anio');
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $distritoSiembra->setAnioagricolaId($resultado['data']);
    }
    //Se valida el Distrito de Riego
    $resultado = validarInfo($distritoSiembra->getDistritoRiegoId(), $Distritos, $index, 'dr', 'id_distrito_riego', 'id_distrito_riego');
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $distritoSiembra->setDistritoRiegoId($resultado['data']);
    }
    //Se valida el cultivo
    $resultado = validarInfo($distritoSiembra->getCultivoId(), $Cultivos, $index, 'cultivo', 'nombre', 'id_cultivo');
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $distritoSiembra->setCultivoId($resultado['data']);
    }
    //Se valida la tenencia
    $resultado = validarInfo($distritoSiembra->getTenenciaId(), $Tenencias, $index, 'tenencia', 'nombre', 'id_tenencia');
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $distritoSiembra->setTenenciaId($resultado['data']);
    }
    //Se valida la modalidad
    $resultado = validarInfo($distritoSiembra->getModalidad(), $Modalidades, $index, 'modalidad', 'nombre', 'id_modalidad');
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $distritoSiembra->setModalidad($resultado['data']);
    }
    //Se valida el ciclo
    $resultado = validarInfo($distritoSiembra->getCicloId(), $Ciclos, $index, 'ciclo', 'nombre', 'id_ciclo');
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $distritoSiembra->setCicloId($resultado['data']);
    }
    
    if ($DBerror == "" && $TypeError == "") {
        return null;
    } else {
        return constructError($DBerror, $TypeError);
    }
}

//Lee el archivo de excel, extrae la información y la inserta en la base de datos
function importExcelVolumen()
{

    $objPHPExcel = getArchivo('Registros_No_Insertados.xlsx'); //Se obtiene el archivo
    //Catalogos a usar para validar la info
    $Distritos = getCatalogo('DistritoRiego', 'getIDs');
    $Tenencias = getCatalogo('Tenencia', 'getNamesAndIDs');
    $Anios = getCatalogo('Anio', 'getAnios');
    $Fuentes = getCatalogo('Fuente', 'getNamesAndIDs');
    $objPHPExcel->setActiveSheetIndex(0); //Asignamos la hoja de calculo activa 1
    $numRows = $objPHPExcel->setActiveSheetIndex(0)->getHighestRow(); //Obtener el numero de filas del archivo
    $OK = true; //OK que nos ayuda a identificar si se realizó el proceso con éxito
    if ($numRows > 1) { //Si la primera hoja tiene filas comenzamos con la extraccion de datos
        $bottom = $numRows;
        $index = 2;
        while ($index <= $bottom) {
            $distritoVol = getValuesVolumenFromExcel($objPHPExcel, $index);
            $validar = validarCamposVolumen($distritoVol, $index,  $Tenencias,  $Anios, $Fuentes, $Distritos);
            if ($validar != null) {
                writeExcel($objPHPExcel, 'N' . $index, $validar, 'Registros_No_Insertados.xlsx');
                $OK = false;
                $index++;
            } else {
                $distritoVol->Insert();
                $objPHPExcel->getActiveSheet()->removeRow($index);
                $bottom--;
            }
        }
    } else {
        echo 'Tu archivo en Excel está vacío.';
        unlink("../../temp/Registros_No_Insertados.xlsx");
    }

    //Se realizó con exito la operación
    if ($OK) {
        unlink("../../temp/Registros_No_Insertados.xlsx");
        echo 'OK';
    } else {
        setCellStyle($objPHPExcel, $bottom, "N"); //Se le da formato a la columna que contiene los errores
        writeExcel($objPHPExcel, 'N1', "Errores", 'Registros_No_Insertados.xlsx');
        $bottom == 1 ? $cadena = "No se pudo insertar 1 registro," : $cadena = "No se pudieron insertar " . --$bottom . " registros,";
        $arr = array('messageError' => $cadena . " favor de verificarlos.", 'url' => "../../../../temp/exceldownload.php");
        echo json_encode($arr);
    }
}

//Funcion que valida que no tenga campos nulos que existan los años agricolas, unidades de riego, cultivos, ciclos, tenencias y modalidad en la base de datos para que se pueda realizar la inserción //
function validarCamposVolumen($distritoVol, $index, $Tenencias,  $Anios, $Fuentes, $Distritos)
{
    $DBerror = "";
    $TypeError = "";
    if (strlen($distritoVol->getAnioId()) == null || strlen($distritoVol->getFuenteId()) == null || strlen($distritoVol->getTenenciaId()) == null || strlen($distritoVol->getDistritoRiegoId()) == null) {
        $TypeError = "hay campos vacíos.";
    }
    //Se valida que los datos de superficie, volumen y usuarios sean númericos
    if (
        is_numeric($distritoVol->getSuperficieRegada1()) == null || is_numeric($distritoVol->getVolumenDistribuido1()) == null || is_numeric($distritoVol->getUsuarios1()) == null ||
        is_numeric($distritoVol->getSuperficieRegada2()) == null || is_numeric($distritoVol->getVolumenDistribuido2()) == null || is_numeric($distritoVol->getUsuarios2()) == null ||
        is_numeric($distritoVol->getSuperficieRegada3()) == null || is_numeric($distritoVol->getVolumenDistribuido3()) == null || is_numeric($distritoVol->getUsuarios3()) == null
    ) {
        if ($TypeError == "") {
            $TypeError = "verifica los campos númericos.";
        } else {
            $TypeError = trim($TypeError, '.');
            $TypeError = $TypeError . ", verifica los campos númericos.";
        }
    }

    //Se valida en anio
    $resultado = validarInfo($distritoVol->getAnioId(), $Anios, $index, 'anio', 'anio', 'id_anio');
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $distritoVol->setAnioId($resultado['data']);
    }
    //Se valida el Distrito de Riego
    $resultado = validarInfo($distritoVol->getDistritoRiegoId(), $Distritos, $index, 'dr', 'id_distrito_riego', 'id_distrito_riego');
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $distritoVol->setDistritoRiegoId($resultado['data']);
    }
    //Se valida la tenencia
    $resultado = validarInfo($distritoVol->getTenenciaId(), $Tenencias, $index, 'tenencia', 'nombre', 'id_tenencia');
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $distritoVol->setTenenciaId($resultado['data']);
    }

    //Se valida la fuente
    $resultado = validarInfo($distritoVol->getFuenteId(), $Fuentes, $index, 'fuente', 'nombre', 'id_fuente');
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $distritoVol->setFuenteId($resultado['data']);
    }

    if ($DBerror == "" && $TypeError == "") {
        return null;
    } else {
        return constructError($DBerror, $TypeError);
    }
}

function getValuesCosechaFromExcel($objPHPExcel, $index)
{
    $distritoSiembra = new SiembraDistrito(); //Crear instancia de RegistroDistrito
    $distritoSiembra->setModalidad($objPHPExcel->getActiveSheet()->getCell('A' . $index)->getValue());
    $distritoSiembra->setSembrada($objPHPExcel->getActiveSheet()->getCell('B' . $index)->getValue());
    $distritoSiembra->setCosechada($objPHPExcel->getActiveSheet()->getCell('C' . $index)->getValue());
    $distritoSiembra->setProduccion($objPHPExcel->getActiveSheet()->getCell('D' . $index)->getValue());
    $distritoSiembra->setValor($objPHPExcel->getActiveSheet()->getCell('E' . $index)->getValue());
    $distritoSiembra->setCicloId($objPHPExcel->getActiveSheet()->getCell('F' . $index)->getValue());
    $distritoSiembra->setTenenciaId($objPHPExcel->getActiveSheet()->getCell('G' . $index)->getValue());
    $distritoSiembra->setCultivoId($objPHPExcel->getActiveSheet()->getCell('H' . $index)->getValue());
    $distritoSiembra->setAnioagricolaId($objPHPExcel->getActiveSheet()->getCell('I' . $index)->getValue());
    $distritoSiembra->setDistritoRiegoId($objPHPExcel->getActiveSheet()->getCell('J' . $index)->getValue());
    return $distritoSiembra;
}

function getValuesVolumenFromExcel($objPHPExcel, $i)
{
    $distritoVol = new VolumenDistrito(); //Crear instancia de RegistroDistrito
    $distritoVol->setSuperficieRegada1($objPHPExcel->getActiveSheet()->getCell('A' . $i)->getValue());
    $distritoVol->setVolumenDistribuido1($objPHPExcel->getActiveSheet()->getCell('B' . $i)->getValue());
    $distritoVol->setUsuarios1($objPHPExcel->getActiveSheet()->getCell('C' . $i)->getValue());
    $distritoVol->setSuperficieRegada2($objPHPExcel->getActiveSheet()->getCell('D' . $i)->getValue());
    $distritoVol->setVolumenDistribuido2($objPHPExcel->getActiveSheet()->getCell('E' . $i)->getValue());
    $distritoVol->setUsuarios2($objPHPExcel->getActiveSheet()->getCell('F' . $i)->getValue());
    $distritoVol->setSuperficieRegada3($objPHPExcel->getActiveSheet()->getCell('G' . $i)->getValue());
    $distritoVol->setVolumenDistribuido3($objPHPExcel->getActiveSheet()->getCell('H' . $i)->getValue());
    $distritoVol->setUsuarios3($objPHPExcel->getActiveSheet()->getCell('I' . $i)->getValue());
    $distritoVol->setAnioId($objPHPExcel->getActiveSheet()->getCell('J' . $i)->getValue());
    $distritoVol->setFuenteId($objPHPExcel->getActiveSheet()->getCell('K' . $i)->getValue());
    $distritoVol->setTenenciaId($objPHPExcel->getActiveSheet()->getCell('L' . $i)->getValue());
    $distritoVol->setDistritoRiegoId($objPHPExcel->getActiveSheet()->getCell('M' . $i)->getValue());
    return $distritoVol;
}
