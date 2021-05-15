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
require_once(__DIR__ . "/../modelo/presa.php");
require_once(__DIR__ . "/../modelo/presavolumen.php");
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
        /**
     * Funcion para realizar el registro de una presa
     */
    case 'Nuevo':
        try {
            insert();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /**
         * Si es el caso de actualizar
         */
    case 'Actualizar':
        try {
            update();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /**
         * Funcion para Borrar
         */
    case 'Delete':
        try {
            delete();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /**
         * Nuevo Registro anual
         */
    case "NuevoReg":
        try {
            nuevoRegistro();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
        /**
         * Editar un registro anual
         */
    case "UpdateReg":
        try {
            updateRegistro();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case "DeleteREGISTRO":
        try {
            deleteRegistro();
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
    case 'getPresaId':
        try {
            getPresaId();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'importFromExcel':
        try {
            importFromExcel();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

/**
 * Funcion para insertar una nueva presa a la base de datos
 */
function insert()
{
    /**
     * Crear instancia de Presa
     */
    $Presa = new Presa();
    $PresaVolumen = new PresaVolumen();
    /**
     * Colocar los datos del GET por medio de los metodos SET
     */
    $Presa->setIdPresa(filter_input(INPUT_GET, "id_presa"));
    $Presa->setNomOficial(filter_input(INPUT_GET, "nom_oficial"));
    $Presa->setNomComun(filter_input(INPUT_GET, "nom_comun"));
    $Presa->setCorriente(filter_input(INPUT_GET, "corriente"));
    $Presa->setAnioTerm(filter_input(INPUT_GET, "anio_term"));
    $Presa->setEdo(filter_input(INPUT_GET, "edo_id"));
    if ($Presa->Insert() != null) {
        $PresaVolumen->setAltCort(filter_input(INPUT_GET, 'alt_cort'));
        $PresaVolumen->setCapName(filter_input(INPUT_GET, 'cap_name'));
        $PresaVolumen->setCapNamo(filter_input(INPUT_GET, 'cap_namo'));
        $PresaVolumen->setVolAlma(filter_input(INPUT_GET, 'vol_alma'));
        $PresaVolumen->setPresaId(filter_input(INPUT_GET, 'id_presa'));
        $PresaVolumen->setAnioId(filter_input(INPUT_GET, 'anio_id'));
        $PresaVolumen->Insert();
        echo 'OK';
    } else {
        echo 'Ya se encuentra en la Base de Datos';
    }
}

/**
 * Funcion para actualizar un nueva nueva presa a la base de datos
 */
function update()
{
    /**
     * Crear instancia de Presa
     */
    $Presa = new Presa();
    /**
     * Colocar los datos del GET por medio de los metodos SET
     */
    $Presa->setIdPresa(filter_input(INPUT_GET, "id_presa"));
    $Presa->setNomOficial(filter_input(INPUT_GET, "nom_oficial"));
    $Presa->setNomComun(filter_input(INPUT_GET, "nom_comun"));
    $Presa->setCorriente(filter_input(INPUT_GET, "corriente"));
    $Presa->setAnioTerm(filter_input(INPUT_GET, "anio_term"));
    $Presa->setEdo(filter_input(INPUT_GET, "edo_id"));
    if ($Presa->update() != null) {
        /**
         * Se actualizó con exito
         */
        echo 1;
    } else {
        /**
         * No se actualizó con exito
         */
        echo 2;
    }
}

/**
 * Funcion para Eliminar una presa
 */
function delete()
{
    $Presa = new Presa();
    $Presa->setIdPresa(filter_input(INPUT_GET, "ID"));
    echo $Presa->delete();
}
/**
 * Funcion para Eliminar una presa
 */
function getPresaId()
{
    $Presa = new Presa();
    echo json_encode($Presa->getPresaId(filter_input(INPUT_POST, "id")));
}

/**
 * Función que registra un nuevo registro volumétrico de una presa
 */
function nuevoRegistro()
{
    $PresaVolumen = new PresaVolumen();
    $PresaVolumen->setAltCort(filter_input(INPUT_GET, 'alt_cort'));
    $PresaVolumen->setCapName(filter_input(INPUT_GET, 'cap_name'));
    $PresaVolumen->setCapNamo(filter_input(INPUT_GET, 'cap_namo'));
    $PresaVolumen->setVolAlma(filter_input(INPUT_GET, 'vol_alma'));
    $PresaVolumen->setPresaId(filter_input(INPUT_GET, 'presa_id'));
    $PresaVolumen->setAnioId(filter_input(INPUT_GET, 'anio_id'));
    if ($PresaVolumen->Insert() != null) {
        echo 1;
    } else {
        echo 2;
    }
}

/**
 * Funcion que actualiza un registro volumetrico de una presa
 */
function updateRegistro()
{
    $PresaVolumen = new PresaVolumen();
    $PresaVolumen->setIdPresaVolumen(filter_input(INPUT_GET, 'id_presa_volumen'));
    $PresaVolumen->setPresaId(filter_input(INPUT_GET, "presa_id"));
    $PresaVolumen->setAltCort(filter_input(INPUT_GET, 'alt_cort'));
    $PresaVolumen->setCapName(filter_input(INPUT_GET, 'cap_name'));
    $PresaVolumen->setCapNamo(filter_input(INPUT_GET, 'cap_namo'));
    $PresaVolumen->setVolAlma(filter_input(INPUT_GET, 'vol_alma'));
    $PresaVolumen->setAnioId(filter_input(INPUT_GET, 'anio_id'));
    if (validarUpdate($PresaVolumen) == 1) {
        if ($PresaVolumen->update() != null) {
            echo 1; //La funcion update de PresaVolumen se realizó con exito
        } else {
            echo 2; //La funcion update de PresaVolumen identificó un error
        }
    } else { //La funcion validar update identificó un error
        echo 2;
    }
}

/**
 * @param $PresaVolumen
 * @return int
 * Valida que la información de la presa se pueda actualizar, buscando relaciones con años vinculados con información
 */
function validarUpdate($PresaVolumen)
{
    $pdo = new DBConnection();
    $db = $pdo->DBConnect();
    $select = $db->prepare('SELECT anio_id FROM presa_volumen WHERE id_presa_volumen=:id_presa_volumen');
    $select->bindValue('id_presa_volumen', $PresaVolumen->getIdPresaVolumen(), PDO::PARAM_INT);
    $select->execute();
    $resul = $select->fetch();
    if ($resul['anio_id'] == $PresaVolumen->getAnioId()) {
        return 1; //Se puede actualizar ya que es información del mismo año
    } else {
        $select = $db->prepare('SELECT COUNT(presa_id) AS num FROM presa_volumen WHERE anio_id=:anio_id and presa_id=:presa_id');
        $select->bindValue('presa_id', $PresaVolumen->getPresaId(), PDO::PARAM_INT);
        $select->bindValue('anio_id', $PresaVolumen->getAnioId(), PDO::PARAM_INT);
        $select->execute();
        $resul = $select->fetch();
        if ($resul['num'] == 0) {
            return 1; //Se puede actualizar ya que es un año que no tiene vinculada información
        } else {
            return 0; //No se puede actualizar ya que el año seleccionado tiene vinculada información
        }
    }
}

function deleteRegistro()
{
    $presaVolumen = new PresaVolumen();
    $presaVolumen->setIdPresaVolumen(filter_input(INPUT_GET, 'id_presa_volumen'));
    echo $presaVolumen->delete();
}

function getTodos()
{

    $Presa = new Presa();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Presa->getPresas(filter_input(INPUT_POST, "query")));
}

function importFromExcel()
{

    $objPHPExcel = getArchivo('Registros_No_Insertados.xlsx'); //Se obtiene el archivo
    $Presas = getCatalogo('Presa', 'getNamesAndIDs');
    $Anios = getCatalogo('Anio', 'getAnios');
    $objPHPExcel->setActiveSheetIndex(0); //Asignamos la hoja de calculo activa 1
    $numRows = $objPHPExcel->setActiveSheetIndex(0)->getHighestRow(); //Obtener el numero de filas del archivo
    $OK = true; //OK que nos ayuda a identificar si se realizó el proceso con éxito
    if ($numRows > 1) {
        $bottom = $numRows;
        $index = 2;
        while ($index <= $bottom) {
            $PresaVolumen = getValuesFromExcel($objPHPExcel, $index);
            $validar = validarCampos($PresaVolumen, $index, $Presas,  $Anios);
            if ($validar != null) {
                writeExcel($objPHPExcel, 'G' . $index, $validar, 'Registros_No_Insertados.xlsx');
                $OK = false;
                $index++;
            } else {
                $PresaVolumen->Insert();
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
        setCellStyle($objPHPExcel, $bottom, "G"); //Se le da formato a la columna que contiene los errores
        writeExcel($objPHPExcel, 'G1', "Errores", 'Registros_No_Insertados.xlsx');
        $bottom == 1 ? $cadena = "No se pudo insertar 1 registro," : $cadena = "No se pudieron insertar " . --$bottom . " registros,";
        $arr = array('messageError' => $cadena . " favor de verificar.", 'url' => "../../../../temp/exceldownload.php");
        echo json_encode($arr);
    }
}

function validarCampos($PresaVolumen, $i, $Presas, $Anios)
{
    $DBerror = "";
    $TypeError = "";
    //Se valida que los campos obligatorios no esten en blanco
    if (strlen($PresaVolumen->getPresaId()) == null || strlen($PresaVolumen->getAltCort()) == null || strlen($PresaVolumen->getCapName()) == null || strlen($PresaVolumen->getCapNamo()) == null || strlen($PresaVolumen->getVolAlma()) == null || strlen($PresaVolumen->getAnioId()) == null) {
        $TypeError = "hay campos vacíos.";
    }
    if (is_numeric($PresaVolumen->getCapNamo()) == null || is_numeric($PresaVolumen->getAltCort()) == null || is_numeric($PresaVolumen->getCapName()) == null || is_numeric($PresaVolumen->getVolAlma()) == null || is_numeric($PresaVolumen->getAnioId()) == null) {
        if ($TypeError == "") {
            $TypeError = "verifica los campos númericos.";
        } else {
            $TypeError = trim($TypeError, '.');
            $TypeError = $TypeError . ", verifica los campos númericos.";
        }
    }
    //Se busca la presa
    $resultado = validarInfo($PresaVolumen->getPresaId(), $Presas, $i, 'presa', 'nombre', 'id_presa');
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $PresaVolumen->setPresaId($resultado['data']);
    }
    //Se busca el año
    $resultado = validarInfo($PresaVolumen->getAnioId(), $Anios, $i, 'anio', 'anio', 'id_anio');
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $PresaVolumen->setAnioId($resultado['data']);
    }
    if ($DBerror == "" && $TypeError == "") {
        return null;
    } else {
        return constructError($DBerror, $TypeError);
    }
}


function getValuesFromExcel($objPHPExcel, $i)
{
    $PresaVolumen = new PresaVolumen(); //Creamos la instancia a presa volumen            
    $PresaVolumen->setPresaId($objPHPExcel->getActiveSheet()->getCell('A' . $i)->getValue());
    $PresaVolumen->setAltCort($objPHPExcel->getActiveSheet()->getCell('B' . $i)->getValue());
    $PresaVolumen->setCapName($objPHPExcel->getActiveSheet()->getCell('C' . $i)->getValue());
    $PresaVolumen->setCapNamo($objPHPExcel->getActiveSheet()->getCell('D' . $i)->getValue());
    $PresaVolumen->setVolAlma($objPHPExcel->getActiveSheet()->getCell('E' . $i)->getValue());
    $PresaVolumen->setAnioId($objPHPExcel->getActiveSheet()->getCell('F' . $i)->getValue());
    return $PresaVolumen;
}
