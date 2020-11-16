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

/**
 * Para que el controlador funcione de forma correcta, es necesario la llamada a los modelos necesarios en el mismo.
 */
require_once(__DIR__ . "/../modelo/siembraunidad.php");
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
    case 'NuevoRegSiembra':
        try {
            nuevoSiembra();
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
    case 'getProduccionSiembra':
        try {
            getProduccionSiembra();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'importExcel':
        try {
            importExcel();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'URTabla':
        try {
            URTabla(filter_input(INPUT_POST, "query"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

function nuevoSiembra()
{
    $siembraUnidad = getParams();
    $siembraUnidad->getOCandEdo();
    $validar = validarInsertSiembra($siembraUnidad);
    if ($validar == 1) {
        $siembraUnidad->insert();
        echo 'OK';
    } else {
        echo 'Se encontró un registro igual en la base de datos, pera evitar duplicados mejor edita el registro que contiene la información de este formulario.';
    }
}

function validarInsertSiembra($siembraUnidad)
{
    //Se valida si es que hay un registro con el mismo año
    try {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('SELECT COUNT(id_produccion_ur) AS num FROM produccion_ur WHERE anio_id=:anio_id AND cultivo_id=:cultivo_id AND municipio_id=:municipio_id');
        $select->bindValue('municipio_id', $siembraUnidad->getMunicipio_id(), PDO::PARAM_INT);
        $select->bindValue('anio_id', $siembraUnidad->getAnio_id(), PDO::PARAM_INT);
        $select->bindValue('cultivo_id', $siembraUnidad->getCultivo_Id(), PDO::PARAM_INT);
        $select->execute();
        $resul = $select->fetch();
        if ($resul['num'] >= 1) { //Se encontró un registro igual entonces no se puede insertar
            return 2;
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
    $siembraUnidad = getParams();
    $validar = validarUpdateSiembra($siembraUnidad);
    if ($validar == 1) {
        $siembraUnidad->update();
        echo "OK";
    } else {
        echo "Se ha encontrado un registro con el mismo año y cultivo en la base de datos";
    }
}

function validarUpdateSiembra($siembraUR)
{
    $pdo = new DBConnection();
    $db = $pdo->DBConnect();
    $select = $db->prepare('SELECT COUNT(id_produccion_ur) AS num FROM produccion_ur WHERE anio_id=:anio_id AND cultivo_id=:cultivo_id');
    $select->bindValue('anio_id', $siembraUR->getAnio_id(), PDO::PARAM_INT);
    $select->bindValue('cultivo_id', $siembraUR->getCultivo_id(), PDO::PARAM_INT);
    $select->execute();
    $resul = $select->fetch();
    if ($resul['num'] >= 1) { //Se encontró un registro igual entonces no se puede insertar
        $select = $db->prepare('SELECT anio_id, cultivo_id FROM produccion_ur WHERE id_produccion_ur=:id_produccion_ur');
        $select->bindValue('id_produccion_ur', $siembraUR->getId_produccion_ur(), PDO::PARAM_INT);
        $select->execute();
        $resul = $select->fetch();
        if ($resul['anio_id'] == $siembraUR->getAnio_id() && $resul['cultivo_id'] == $siembraUR->getCultivo_id()) {
            return 1; //Si es la misma info se puede actualizar
        } else {
            return 2; //Se encontró un registro diferente ;
        }
    } else {
        return 1; //Es información de diferente año, se puede insertar en la base de datos
    }
}

function deleteSiembra()
{
    $siembraUnidad = new SiembraUnidad();
    $siembraUnidad->setId_produccion_ur(filter_input(INPUT_GET, "ID"));
    echo $siembraUnidad->delete();
}

//Obtiene la produccion agricola de un municipio
function getProduccionSiembra()
{
    $siembraUnidad = new SiembraUnidad();
    $siembraUnidad->setMunicipio_id(filter_input(INPUT_GET, "ID"));
    echo json_encode($siembraUnidad->getRegistrosSiembra());
}

//Obtiene los parametros por get
function getParams()
{
    $siembraUnidad = new SiembraUnidad();
    $siembraUnidad->setId_produccion_ur(filter_input(INPUT_GET, 'idsiembra'));
    $siembraUnidad->setMunicipio_id(filter_input(INPUT_GET, 'municipio_id'));
    $siembraUnidad->setSembrada(filter_input(INPUT_GET, 'sembrada'));
    $siembraUnidad->setCosechada(filter_input(INPUT_GET, 'cosechada'));
    $siembraUnidad->setProduccion(filter_input(INPUT_GET, 'produccion'));
    $siembraUnidad->setValor(filter_input(INPUT_GET, 'valor'));
    $siembraUnidad->setAnio_id(filter_input(INPUT_GET, 'anio_id'));
    $siembraUnidad->setCultivo_id(filter_input(INPUT_GET, 'cultivo_id'));
    return $siembraUnidad;
}

function importExcel()
{

    $objPHPExcel = getArchivo('Registros_No_Insertados.xlsx'); //Se obtiene el archivo
    $Cultivos = getCatalogo('Cultivo', 'getNamesAndIDs');
    $OrganismosCuenca = getCatalogo('Organismo', 'getTodos');
    $Anios = getCatalogo('Anio', 'getAnios');
    $Estados = getCatalogo('Estado', 'getNamesAndIDs');
    $objPHPExcel->setActiveSheetIndex(0); //Asignamos la hoja de calculo activa 1
    $numRows = $objPHPExcel->setActiveSheetIndex(0)->getHighestRow(); //Obtener el numero de filas del archivo
    $ok = true; //ok que nos ayuda a identificar si se realizó el proceso con éxito
    if ($numRows > 1) { //Si la primera hoja tiene filas comenzamos con la extraccion de datos
        $bottom = $numRows;
        $index = 2;
        while ($index <= $bottom) {
            $unidadSiembra=getValoresFromExcel($objPHPExcel,$index);
            $error = validarCamposUnidadSiembra($unidadSiembra, $index, $Cultivos, $OrganismosCuenca, $Anios, $Estados);
            if ($error != null) {
                writeExcel($objPHPExcel, 'J' . $index, $error, 'Registros_No_Insertados.xlsx');
                $ok = false;
                $index++;
            } else {
                $unidadSiembra->Insert();
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
    }else {
        setCellStyle($objPHPExcel, $bottom, "J"); //Se le da formato a la columna que contiene los errores
        writeExcel($objPHPExcel, 'J1', "Errores", 'Registros_No_Insertados.xlsx');
        $bottom==1 ? $cadena = "No se pudo insertar 1 registro," : $cadena = "No se pudieron insertar " . --$bottom . " registros,";
        $arr = array('messageError' => $cadena . " favor de verificarlos.", 'url' => "../../../../temp/exceldownload.php");
        echo json_encode($arr);
    }
}


//Funcion que valida que no tenga campos nulos que existan los años agricolas, unidades de riego, cultivos, ciclos, tenencias y modalidad en la base de datos para que se pueda realizar la inserción
function validarCamposUnidadSiembra($unidadSiembra, $index, $catalogoCultivos, $catalogoOrganismosCuenca, $catalogoAnios, $catalogoEstados)
{
    $DBerror = "";
    $TypeError = "";
    
    if (strlen($unidadSiembra->getSembrada()) == null || strlen($unidadSiembra->getCosechada()) == null || strlen($unidadSiembra->getProduccion()) == null || strlen($unidadSiembra->getValor()) == null || strlen($unidadSiembra->getOrganismo_id()) == null || strlen($unidadSiembra->getCultivo_id()) == null || strlen($unidadSiembra->getEstado_id()) == null || strlen($unidadSiembra->getMunicipio_id()) == null || strlen($unidadSiembra->getAnio_id()) == null) {
        $TypeError = "hay campos vacíos.";
    }
    if (is_numeric($unidadSiembra->getSembrada()) == null || is_numeric($unidadSiembra->getCosechada()) == null || is_numeric($unidadSiembra->getProduccion()) == null || is_numeric($unidadSiembra->getValor()) == null || is_numeric($unidadSiembra->getAnio_id()) == null) {
        if ($TypeError == "") {
            $TypeError = "verifica los campos númericos.";
        } else {
            $TypeError = trim($TypeError, '.');
            $TypeError = $TypeError . ", verifica los campos númericos.";
        }
    }
    //Se valida en anio
    $resultado = validarInfo($unidadSiembra->getAnio_id(), $catalogoAnios, $index, 'anio', 'anio', 'id_anio');
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $unidadSiembra->setAnio_id($resultado['data']);
    }
    //Se valida el Organismo de cuenca
    $resultado = validarInfo($unidadSiembra->getOrganismo_id(), $catalogoOrganismosCuenca, $index, 'oc', 'id_organismo', 'id_organismo');
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $unidadSiembra->setOrganismo_id($resultado['data']);
    }
    //Se valida el cultivo
    $resultado = validarInfo($unidadSiembra->getCultivo_id(), $catalogoCultivos, $index, 'cultivo', 'nombre', 'id_cultivo');
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $unidadSiembra->setCultivo_id($resultado['data']);
    }
    //Se valida el estado
    $resultado = validarInfo($unidadSiembra->getEstado_id(), $catalogoEstados, $index, 'estado', 'nombre', 'id_estado');
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $unidadSiembra->setEstado_id($resultado['data']);
    }
    //Se valida el municipio
    $resultado = validarMunicipio($unidadSiembra->getEstado_id(), $unidadSiembra->getMunicipio_id(), $index);
    if (!$resultado['isFound']) {
        $DBerror = $DBerror . $resultado['error'];
    } else {
        $unidadSiembra->setMunicipio_id($resultado['data']);
    }
    if ($DBerror == "" && $TypeError == "") {
        return null;
    } else {
        return constructError($DBerror, $TypeError);
    }
}

function getValoresFromExcel($objPHPExcel, $index)
{
    $unidadSiembra = new SiembraUnidad(); //Crear instancia de SiembraUnidad
    $unidadSiembra->setSembrada($objPHPExcel->getActiveSheet()->getCell('A' . $index)->getValue());
    $unidadSiembra->setCosechada($objPHPExcel->getActiveSheet()->getCell('B' . $index)->getValue());
    $unidadSiembra->setProduccion($objPHPExcel->getActiveSheet()->getCell('C' . $index)->getValue());
    $unidadSiembra->setValor($objPHPExcel->getActiveSheet()->getCell('D' . $index)->getValue());
    $unidadSiembra->setCultivo_id($objPHPExcel->getActiveSheet()->getCell('E' . $index)->getValue());
    $unidadSiembra->setAnio_id($objPHPExcel->getActiveSheet()->getCell('F' . $index)->getValue());
    $unidadSiembra->setOrganismo_id($objPHPExcel->getActiveSheet()->getCell('G' . $index)->getValue());
    $unidadSiembra->setEstado_id($objPHPExcel->getActiveSheet()->getCell('H' . $index)->getValue());
    $unidadSiembra->setMunicipio_id($objPHPExcel->getActiveSheet()->getCell('I' . $index)->getValue());
    return $unidadSiembra;
}

function URTabla($query) {
    $UR = new SiembraUnidad();
    /**
     * Regresa los registros de los estados
     */
    echo json_encode($UR->URTabla($query));
}
