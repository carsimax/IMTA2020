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
require_once(__DIR__ . "/../modelo/dtt.php");
require_once(__DIR__ . "/../modelo/siembradtt.php");
require_once(__DIR__ . "/../../sistema/functionsexcel.php");
require_once(__DIR__ . "/../../excel/PHPExcel/IOFactory.php"); //Libreria de excel

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
        /*
     * Funcion para realizar el registro del propietario
     */
    case 'Nuevo':
        try {
            Nuevo();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /*
     * Si es el caso de actualizar
     */
    case 'Actualizar':
        try {
            Actualizar();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /*
     * Funcion para Borrar
     */
    case 'Delete':
        try {
            Eliminar();
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
    case 'DeleteRegDTT':
        try {
            deleteSiembra();
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
    case 'getDTTI':
        try {
            getDTTI();
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
}

/**
 * Funcion para insertar un nuevo cultivo a la base de datos
 */
function Nuevo()
{
    $DTT = new DTT();
    $DTT->setIdDtt(filter_input(INPUT_GET, "clave"));
    $DTT->setNombre(filter_input(INPUT_GET, "nombre"));
    $DTT->setEstado_id(filter_input(INPUT_GET, "estado_id"));
    if ($DTT->Insert() != null) {
        echo 'OK';
    } else {
        echo 'Ya se encuentra en la Base de Datos un Distrito con la misma Clave';
    }
}

/**
 * Funcion para insertar un nuevo cultivo a la base de datos
 */
function Actualizar()
{
    $DTT = new DTT();
    $DTT->setIdDtt(filter_input(INPUT_GET, "clave"));
    $DTT->setNombre(filter_input(INPUT_GET, "nombre"));
    $DTT->setEstado_id(filter_input(INPUT_GET, "estado_id"));
    if ($DTT->Update() != null) {
        echo 'OK';
    } else {
        echo 'Algo salío mal :(';
    }
}

/**
 * Funcion para Eliminar un cultivo
 */
function Eliminar()
{
    $DTT = new DTT();
    /**
     * Se coloca el Id del acuifero a eliminar por medio del metodo SET
     */
    $DTT->setIdDtt(filter_input(INPUT_GET, "ID"));
    /**
     * Se manda a llamar a la funcion de eliminar.
     */
    echo $DTT->delete();
}

function getTodos()
{

    $DTTs = new DTT();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($DTTs->getDTTs());
}

function insertSiembra()
{
    $siembraDTT = new SiembraDTT();
    $siembraDTT->setModalidad(filter_input(INPUT_GET, 'modalidad'));
    $siembraDTT->setSembrada(filter_input(INPUT_GET, 'sembrada'));
    $siembraDTT->setCosechada(filter_input(INPUT_GET, 'cosechada'));
    $siembraDTT->setProduccion(filter_input(INPUT_GET, 'produccion'));
    $siembraDTT->setValor(filter_input(INPUT_GET, 'valor'));
    $siembraDTT->setAnioagricolaId(filter_input(INPUT_GET, 'anioagricola_id'));
    $siembraDTT->setCicloId(filter_input(INPUT_GET, 'ciclo_id'));
    $siembraDTT->setTenenciaId(filter_input(INPUT_GET, 'tenencia_id'));
    $siembraDTT->setCultivoId(filter_input(INPUT_GET, 'cultivo_id'));
    $siembraDTT->setDTTid(filter_input(INPUT_GET, 'dtt_id'));

    //Se obtienen los valores por medio de get y se valida el insert
    $validar = validarInsertSiembra($siembraDTT);
    if ($validar == 1) { //El los datos nos se repiten entonces se registra en a base de datos
        echo $siembraDTT->insert();
    } else {
        echo 2; //La funcion de validar encontró un registro igual en la base
    }
}

function validarInsertSiembra($siembraDTT)
{
    //Se valida si es que hay un registro con el mismo año
    try {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('SELECT COUNT(dtt_id) AS num FROM siembra_dtt WHERE anioagricola_id=:anioagricola_id AND dtt_id=:dtt_id AND cultivo_id=:cultivo_id AND ciclo_id=:ciclo_id AND tenencia_id=:tenencia_id AND modalidad=:modalidad');
        $select->bindValue('modalidad', $siembraDTT->getModalidad(), PDO::PARAM_STR);
        $select->bindValue('dtt_id', $siembraDTT->getDTTid(), PDO::PARAM_INT);
        $select->bindValue('anioagricola_id', $siembraDTT->getAnioagricolaId(), PDO::PARAM_INT);
        $select->bindValue('cultivo_id', $siembraDTT->getCultivoId(), PDO::PARAM_INT);
        $select->bindValue('ciclo_id', $siembraDTT->getCicloId(), PDO::PARAM_INT);
        $select->bindValue('tenencia_id', $siembraDTT->getTenenciaId(), PDO::PARAM_INT);
        $select->execute();
        $resul = $select->fetch();
        if ($resul['num'] >= 1) { //Se encontró un registro igual entonces no se puede insertar
            echo 2;
        } else {
            return 1; //Es diferente información, se puede insertar en la base de datos
        }
    } catch (PDOException $exc) {
        echo $exc->getMessage();
        return null;
    }
}

function updateSiembra()
{
    $siembraDTT = new SiembraDTT();
    $siembraDTT->setIdSiembraDTT(filter_input(INPUT_GET, 'id_siembra_dtt'));
    $siembraDTT->setModalidad(filter_input(INPUT_GET, 'modalidad'));
    $siembraDTT->setSembrada(filter_input(INPUT_GET, 'sembrada'));
    $siembraDTT->setCosechada(filter_input(INPUT_GET, 'cosechada'));
    $siembraDTT->setProduccion(filter_input(INPUT_GET, 'produccion'));
    $siembraDTT->setValor(filter_input(INPUT_GET, 'valor'));
    $siembraDTT->setAnioagricolaId(filter_input(INPUT_GET, 'anioagricola_id'));
    $siembraDTT->setCicloId(filter_input(INPUT_GET, 'ciclo_id'));
    $siembraDTT->setTenenciaId(filter_input(INPUT_GET, 'tenencia_id'));
    $siembraDTT->setCultivoId(filter_input(INPUT_GET, 'cultivo_id'));
    $siembraDTT->setDTTid(filter_input(INPUT_GET, 'dtt_id'));
    $validar = validarUpdateSiembra($siembraDTT);
    if ($validar === 1) { //El los datos nos se repiten entonces se registra en a base de datos
        echo $siembraDTT->update();
    } else {
        echo "Se encontró un registro duplicado"; //La funcion de validar encontró un registro igual en la base
    }
}

function validarUpdateSiembra($siembraDTT)
{
    //Se valida si es que hay un registro con el mismo año
    try {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('SELECT COUNT(dtt_id) AS num FROM siembra_dtt WHERE anioagricola_id=:anioagricola_id AND dtt_id=:dtt_id AND cultivo_id=:cultivo_id AND ciclo_id=:ciclo_id AND tenencia_id=:tenencia_id AND modalidad=:modalidad');
        $select->bindValue('modalidad', $siembraDTT->getModalidad(), PDO::PARAM_STR);
        $select->bindValue('dtt_id', $siembraDTT->getDTTid(), PDO::PARAM_INT);
        $select->bindValue('anioagricola_id', $siembraDTT->getAnioagricolaId(), PDO::PARAM_INT);
        $select->bindValue('cultivo_id', $siembraDTT->getCultivoId(), PDO::PARAM_INT);
        $select->bindValue('ciclo_id', $siembraDTT->getCicloId(), PDO::PARAM_INT);
        $select->bindValue('tenencia_id', $siembraDTT->getTenenciaId(), PDO::PARAM_INT);
        $select->execute();
        $resul = $select->fetch();
        if ($resul['num'] >= 1) { //Se encontró un registro con la misma información, ahora se valida si es la misma info que se tiene en el formulario y en la base de datos
            $select = $db->prepare('SELECT modalidad, ciclo_id, tenencia_id,anioagricola_id, cultivo_id, dtt_id FROM siembra_dtt WHERE id_siembra_dtt=:id_siembra_dtt');
            $select->bindValue('id_siembra_dtt', $siembraDTT->getIdSiembraDTT(), PDO::PARAM_INT);
            $select->execute();
            $resul = $select->fetch();
            if (
                $resul['modalidad'] == $siembraDTT->getModalidad() &&
                $resul['dtt_id'] == $siembraDTT->getDTTid() &&
                $resul['anioagricola_id'] == $siembraDTT->getAnioagricolaId() &&
                $resul['cultivo_id'] == $siembraDTT->getCultivoId() &&
                $resul['ciclo_id'] == $siembraDTT->getCicloId() &&
                $resul['tenencia_id'] == $siembraDTT->getTenenciaId()
            ) {
                return 1; //Si es la misma info se puede actualizar
            } else {
                return 2; //Se encontró un registro diferente ;
            }
        } else {
            return 1; //Es diferente información, no puede insertar en la base de datos
        }
    } catch (PDOException $exc) {
        echo $exc->getMessage();
        return null;
    }
}

function deleteSiembra()
{
    $DTT = new SiembraDTT();
    $DTT->setIdSiembraDTT(filter_input(INPUT_GET, "ID"));
    echo $DTT->delete();
}



//Obtiene un Json de la producción agrícola de un DTT
function getProduccionSiembra()
{
    $siembraDtt = new SiembraDTT();
    $siembraDtt->setDTTid(filter_input(INPUT_GET, "ID"));
    echo json_encode($siembraDtt->getRegistrosSiembra());
}

function getDTTI()
{
    $DR = new DTT();
    echo json_encode($DR->getDTTI(filter_input(INPUT_POST, "id")));
}

function importExcelSiembra()
{

    $objPHPExcel = getArchivo('Registros_No_Insertados.xlsx'); //Se obtiene el archivo
    //Catalogos a usar para validar la info
    $Distritos = getCatalogo('DTT', 'getIDs');
    $Ciclos = getCatalogo('Ciclo', 'getNamesAndIDs');
    $Cultivos = getCatalogo('Cultivo', 'getNamesAndIDs');
    $Anios = getCatalogo('Anio', 'getAnios');
    $objPHPExcel->setActiveSheetIndex(0); //Asignamos la hoja de calculo activa 1
    $numRows = $objPHPExcel->setActiveSheetIndex(0)->getHighestRow(); //Obtener el numero de filas del archivo
    $ok = true; //ok que nos ayuda a identificar si se realizó el proceso con éxito
    if ($numRows > 1) { //Si la primera hoja tiene filas comenzamos con la extraccion de datos
        $bottom = $numRows;
        $index = 2;
        while ($index <= $bottom) {
            $dttSiembra = new SiembraDTT(); //Crear instancia de RegistroDistrito
            $dttSiembra->setModalidad('Temporal');
            $dttSiembra->setSembrada($objPHPExcel->getActiveSheet()->getCell('A' . $index)->getValue());
            $dttSiembra->setCosechada($objPHPExcel->getActiveSheet()->getCell('B' . $index)->getValue());
            $dttSiembra->setProduccion($objPHPExcel->getActiveSheet()->getCell('C' . $index)->getValue());
            $dttSiembra->setValor($objPHPExcel->getActiveSheet()->getCell('D' . $index)->getValue());
            $dttSiembra->setCicloId($objPHPExcel->getActiveSheet()->getCell('E' . $index)->getValue());
            $dttSiembra->setTenenciaId(1);
            $dttSiembra->setCultivoId($objPHPExcel->getActiveSheet()->getCell('F' . $index)->getValue());
            $dttSiembra->setAnioagricolaId($objPHPExcel->getActiveSheet()->getCell('G' . $index)->getValue());
            $dttSiembra->setDTTid($objPHPExcel->getActiveSheet()->getCell('H' . $index)->getValue());
            $validar = validarCamposSiembra($dttSiembra, $index, $Ciclos, $Cultivos,  $Anios, $Distritos);
            if ($validar != null) {
                writeExcel($objPHPExcel, 'I' . $index, $validar, 'Registros_No_Insertados.xlsx');
                $index++;
                $ok = false;
                
            } else {
                $dttSiembra->Insert();
                $objPHPExcel->getActiveSheet()->removeRow($index);
                $bottom--;
            }
        }
    } else {
        echo 'Tu archivo en Excel está vacío.';
        unlink("../../temp/Registros_No_Insertados.xlsx");
    }
    //Se realizó con exito la operación
    if ($ok) {
        unlink("../../temp/Registros_No_Insertados.xlsx");
        echo 'OK';
    } else {
        setCellStyle($objPHPExcel, $bottom, "I"); //Se le da formato a la columna que contiene los errores
        writeExcel($objPHPExcel, 'I1', "Errores", 'Registros_No_Insertados.xlsx');
        $bottom==1 ? $cadena = "No se pudo insertar 1 registro," : $cadena = "No se pudieron insertar " . --$bottom . " registros,";
        $arr = array('messageError' => $cadena . " favor de verificarlos.", 'url' => "../../../../temp/exceldownload.php");
        echo json_encode($arr);
    }
}

//Funcion que valida que no tenga campos nulos que existan los años agricolas, unidades de riego, cultivos, ciclos, tenencias y modalidad en la base de datos para que se pueda realizar la inserción //
function validarCamposSiembra($dttSiembra, $index, $Ciclos, $Cultivos,  $Anios, $Distritos){
    $DBerror = "";
    $TypeError = "";

    if (strlen($dttSiembra->getModalidad()) == null || strlen($dttSiembra->getSembrada()) == null || strlen($dttSiembra->getCosechada()) == null || strlen($dttSiembra->getProduccion()) == null || strlen($dttSiembra->getValor()) == null || strlen($dttSiembra->getCicloId()) == null || strlen($dttSiembra->getTenenciaId()) == null || strlen($dttSiembra->getCultivoId()) == null || strlen($dttSiembra->getAnioagricolaId()) == null || strlen($dttSiembra->getDTTid()) == null) {
        $TypeError = "hay campos vacíos.";
    }
    if (is_numeric($dttSiembra->getSembrada()) == null || is_numeric($dttSiembra->getCosechada()) == null || is_numeric($dttSiembra->getProduccion()) == null || is_numeric($dttSiembra->getValor()) == null) { //Verifica si los campos si son numericos
        if ($TypeError == "") {
            $TypeError = "verifica los campos númericos.";
        } else {
            $TypeError = trim($TypeError, '.');
            $TypeError = $TypeError . ", verifica los campos númericos.";
        }
    }

    $resultado = validarInfo($dttSiembra->getAnioagricolaId(), $Anios, $index, 'anio', 'anio', 'id_anio');
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $dttSiembra->setAnioagricolaId($resultado['data']);
    }

    //Se valida el Distrito de Temporal
    $resultado = validarInfo($dttSiembra->getDTTid(), $Distritos, $index, 'dtt', 'id_dtt', 'id_dtt');
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $dttSiembra->setDTTid($resultado['data']);
    }
    //Se valida el cultivo
    $resultado = validarInfo($dttSiembra->getCultivoId(), $Cultivos, $index, 'cultivo', 'nombre', 'id_cultivo');
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $dttSiembra->setCultivoId($resultado['data']);
    }
    //Se valida el ciclo
    $resultado = validarInfo($dttSiembra->getCicloId(), $Ciclos, $index, 'ciclo', 'nombre', 'id_ciclo');
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $dttSiembra->setCicloId($resultado['data']);
    }
    if ($DBerror == "" && $TypeError == "") {
        return null;
    } else {
        return constructError($DBerror, $TypeError);
    }
}
