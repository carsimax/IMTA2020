<?php

/**FUNCIONES NECESARIAS PARA LA VALIDACIÓN DE LA INSERCIÓN DE INFORMACIÓN POR MEDIO DE EXCEL**/
/**MODELOS NECESARIOS PARA OBTENER LOS CATALOGOS**/
require_once(__DIR__ . "/../aplicacion/modelo/cultivo.php");
require_once(__DIR__ . "/../aplicacion/modelo/organismo.php");
require_once(__DIR__ . "/../aplicacion/modelo/anio.php");
require_once(__DIR__ . "/../aplicacion/modelo/estado.php");
require_once(__DIR__ . "/../aplicacion/modelo/municipio.php");
require_once(__DIR__ . "/../aplicacion/modelo/ciclo.php");
require_once(__DIR__ . "/../aplicacion/modelo/tenencia.php");
require_once(__DIR__ . "/../aplicacion/modelo/fuente.php");
require_once(__DIR__ . "/../aplicacion/modelo/distritoriego.php");
require_once(__DIR__ . "/../aplicacion/modelo/dtt.php");
require_once(__DIR__ . "/../aplicacion/modelo/presa.php");

//Recibe un archivo y lo abre con la libreria en excel
function getArchivo($nombreArchivo)
{
    $archivoRecibido = $_FILES["archivo"]["tmp_name"]; //Se lee el archivo
    $archivo = "../../temp/".$nombreArchivo;
    if (!move_uploaded_file($archivoRecibido, $archivo)) { //Movemos el archivo al directorio
        echo 'El proceso ha fallado';
    }
    $objPHPExcel = PHPExcel_IOFactory::load($archivo); //Cargamos la hoja de cálculo
    return $objPHPExcel;
}

//Obtiene el catalogo correspondiente a una clase
function getCatalogo($clase, $metodo)
{
    $object = new $clase();
    return $object->$metodo();
}
//Retorna las modalidades que se usan en la importación de produccion agrícola
function getCatalogoModalidades()
{
    return array(
        (0) => array(
            ('nombre') => 'riego',
            ('id_modalidad') => 'Riego',
        ),

        (1) => array(
            ('nombre') => 'temporal',
            ('id_modalidad') => 'Temporal',
        )
    );
}


//Busca en un array un valor y retorna el identificador correspondiente de la base de datos o un mensaje de error
function validarInfo($value, $catalogo,$index, $case, $column, $id)
{
    if (is_numeric($value) == null) { //Si el valor no es númerico
        $value = str_replace(" ", "", strtolower($value)); //se convierte a minusculas y se quitan los espacios
    } 
    $key = array_search($value, array_column($catalogo, $column));
    if ($key == null && is_bool($key) === true) {
        return array('isFound' => false, 'error'  => getError($case));
    } else {
        return array('isFound' => true, 'data'  => $catalogo[$key][$id]);
    }
}

//Valida la existencia del municipio en la base de datos
function validarMunicipio($estado_id, $municipio, $index)
{
    $Municipio = new Municipio();
    $municipio_id = $Municipio->getMunicipio($estado_id, $municipio);
    if ($municipio_id['id_municipio'] == null) {
        $data = getError('municipio');
        return array('isFound' => false, 'error'  => $data);
    } else {
        return array('isFound' => true, 'data'  => $municipio_id['id_municipio']);
    }
}



//Construye el mensaje de error para ser insertado en el Excel
function constructError($DBerror,$TypeError){
    
    if(strlen($DBerror)==0 && strlen($TypeError)!=0){
        $messageError=ucfirst($TypeError);
    }else if($DBerror!="" && $TypeError==""){
        substr_count($DBerror, ',') == 1 ? $word="encuentra" :  $word="encuentran";
        $messageError = substr($DBerror, 0, strlen($DBerror) - 2);
        $messageError = $messageError . " no se ".$word." en la base de datos.";
    }else if($DBerror != "" && $TypeError != ""){
        substr_count($DBerror, ',') == 1 ? $word="encuentra" :  $word="encuentran";
        $messageError = substr($DBerror, 0, strlen($DBerror) - 2);
        $messageError = $messageError . " no se ".$word." en la base de datos.";
        $messageError = trim($messageError, '.');
        $messageError = $messageError . ", ".$TypeError;
    }
    return $messageError;
}
//Escribe el mensaje de error en el archivo de excel
function writeExcel($objPHPExcel, $index, $error,$file)
{
    $objPHPExcel->getActiveSheet()->setCellValue($index, $error);
    $objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);
    $objWriter->save("../../temp/".$file);
}

//Asigna un formato a la celda de los erroes
function setCellStyle($objPHPExcel,$bottom,$column){
    $objPHPExcel->getActiveSheet()->getStyle($column.'1')->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
    $objPHPExcel->getActiveSheet()->getStyle($column.'1')->getFill()->getStartColor()->setARGB('da9694');
    $objPHPExcel->getActiveSheet()->getStyle($column.'1')->getFont()->setBold(true);
    $objPHPExcel->getActiveSheet()->getStyle($column.'2:'.$column.$bottom)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
    $objPHPExcel->getActiveSheet()->getStyle($column.'2:'.$column.$bottom)->getFill()->getStartColor()->setARGB('f2dcdb');
    $style = array(
        'borders' => array(
            'allborders' => array(
                'style' => PHPExcel_Style_Border::BORDER_THIN
            )
        )
    );
    $objPHPExcel->getActiveSheet()->getStyle($column.'1:'.$column.$bottom)->applyFromArray($style);

    foreach (range('A', $objPHPExcel->getActiveSheet()->getHighestDataColumn()) as $col) {
        $objPHPExcel->getActiveSheet()
            ->getColumnDimension($col)
            ->setAutoSize(true);
    }
}


//Idenfica el mensaje de error a retornar con el usuario
function getError($case)
{
    switch ($case) {
        case 'anio':
            return 'Año, ';
            break;
        case 'oc':
            return "Clave númerica de organismo de cuenca, ";
            break;
        case 'cultivo':
            return "Cultivo, ";
            break;
        case 'estado':
            return "Estado, ";
            break;
        case 'municipio':
            return "Municipio relacionado con ese estado, ";
            break;
        case 'dr':
            return "Clave de Distrito de Riego, ";
            break;
        case 'tenencia':
            return "Tenencia, ";
            break;
        case 'modalidad':
            return "Modalidad, ";
            break;
        case 'ciclo':
            return "Ciclo, ";
            break;
        case 'fuente':
            return "Fuente, ";
            break;
        case 'dtt':
            return "Clave de Distrito Temporal, ";
            break;
        case 'presa':
            return "Presa, ";
        break;
    }
}