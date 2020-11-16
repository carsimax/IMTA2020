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
require_once (__DIR__ . "/../modelo/estacionclimatologica.php");
require_once (__DIR__ . "/../modelo/estado.php");
require_once (__DIR__ . "/../modelo/municipio.php");

/**
 * La variable acción almacena la función que recibimos desde la vista.
 */
$accion = filter_input(INPUT_POST, "Accion");

//Si no se recibió nada por post, intentara recibirlo por get.
if (filter_input(INPUT_POST, "Accion") == NULL)
{
    $accion = filter_input(INPUT_GET, "Accion");
}

/**
 * Este switch es la controladora de las funciones que contiene el controlador,
 * Desde aquí se determina a que función del controlador llamar.
 */
switch ($accion)
{
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
    case 'getInfoMap':
        try {
            getInfoMap();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Excel':
        try {
            getInfoMap();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

/**
 * Funcion para insertar un nuevo cultivo a la base de datos
 */
function Nuevo(){
    /**
     * Crear instancia de EstacionClimatologica
     */
    $EstacionClimatologica = new EstacionClimatologica();
    /**
     * Colocar los datos del POST por medio de los metodos SET
     */
    $EstacionClimatologica->setIdEstacionClimatologica(filter_input(INPUT_GET, 'clave'));
    $EstacionClimatologica->setClave_omm(filter_input(INPUT_GET, 'clave_omm'));
    $EstacionClimatologica->setNombre(filter_input(INPUT_GET, 'nombre'));
    $EstacionClimatologica->setCuenca_id(filter_input(INPUT_GET, 'cuenca_id'));
    $EstacionClimatologica->setSubcuenca_id(filter_input(INPUT_GET, 'subcuenca_id'));
    $EstacionClimatologica->setTipo(filter_input(INPUT_GET, 'tipo_id'));
    $EstacionClimatologica->setOrganismo_id(filter_input(INPUT_GET, 'organismo_id'));
    $EstacionClimatologica->setFechainicio(filter_input(INPUT_GET, 'fechainicio'));
    $EstacionClimatologica->setFechafin(filter_input(INPUT_GET, 'fechafin'));
    $EstacionClimatologica->setSituacion(filter_input(INPUT_GET, 'situacion'));
    $EstacionClimatologica->setLatitud(filter_input(INPUT_GET, 'latitud'));
    $EstacionClimatologica->setLongitud(filter_input(INPUT_GET, 'longitud'));
    $EstacionClimatologica->setAltura(filter_input(INPUT_GET, 'altura'));
    $EstacionClimatologica->setObservaciones(filter_input(INPUT_GET, 'observaciones'));
    $Estado = new Estado();
    //Instancia de Municipio
    $Municipio = new Municipio();
    //Extraer el Id del estado
    $id_Estado = $Estado->getEstado(filter_input(INPUT_GET, "estado"));
    //Obtener el Municipio
    $id_municipio = $Municipio->getMunicipio($id_Estado['id_estado'], filter_input(INPUT_GET, "municipio"));
    $EstacionClimatologica->setMunicipio_id($id_municipio['id_municipio']);
    if ($EstacionClimatologica->Insert() != null)
    {
        echo 'OK';
    }
    else
    {
        echo 'Ya se encuentra en la Base de Datos';
    }
}

/**
 * Funcion para insertar un nuevo cultivo a la base de datos
 */
function Actualizar()
{
    /**
     * Crear instancia de EstacionClimatologica
     */
    $EstacionClimatologica = new EstacionClimatologica();
    /**
     * Colocar los datos del POST por medio de los metodos SET
     */
    $EstacionClimatologica->setIdEstacionClimatologica(filter_input(INPUT_GET, 'clave'));
    $EstacionClimatologica->setClave_omm(filter_input(INPUT_GET, 'clave_omm'));
    $EstacionClimatologica->setNombre(filter_input(INPUT_GET, 'nombre'));
    $EstacionClimatologica->setCuenca_id(filter_input(INPUT_GET, 'cuenca_id'));
    $EstacionClimatologica->setSubcuenca_id(filter_input(INPUT_GET, 'subcuenca_id'));
    $EstacionClimatologica->setTipo(filter_input(INPUT_GET, 'tipo_id'));
    $EstacionClimatologica->setOrganismo_id(filter_input(INPUT_GET, 'organismo_id'));
    $EstacionClimatologica->setFechainicio(filter_input(INPUT_GET, 'fechainicio'));
    $EstacionClimatologica->setFechafin(filter_input(INPUT_GET, 'fechafin'));
    $EstacionClimatologica->setSituacion(filter_input(INPUT_GET, 'situacion'));
    $EstacionClimatologica->setLatitud(filter_input(INPUT_GET, 'latitud'));
    $EstacionClimatologica->setLongitud(filter_input(INPUT_GET, 'longitud'));
    $EstacionClimatologica->setAltura(filter_input(INPUT_GET, 'altura'));
    $EstacionClimatologica->setObservaciones(filter_input(INPUT_GET, 'observaciones'));
    $Estado = new Estado();
    //Instancia de Municipio
    $Municipio = new Municipio();
    //Extraer el Id del estado
    $id_Estado = $Estado->getEstado(filter_input(INPUT_GET, "estado"));
    //Obtener el Municipio
    $id_municipio = $Municipio->getMunicipio($id_Estado['id_estado'], filter_input(INPUT_GET, "municipio"));
    $EstacionClimatologica->setMunicipio_id($id_municipio['id_municipio']);
    if ($EstacionClimatologica->Update() != null)
    {
        echo 'OK';
    }
    else
    {
        echo 'Algo salío mal :(';
    }
}

/**
 * Funcion para Eliminar un cultivo
 */
function Eliminar()
{
    /**
     * Se crea una instanica a un grupo de cultivo
     */
    $EstacionClimatologica = new EstacionClimatologica();
    /**
     * Se coloca el Id del acuifero a eliminar por medio del metodo SET
     */
    $EstacionClimatologica->setIdEstacionClimatologica(filter_input(INPUT_GET, "ID"));
    /**
     * Se manda a llamar a la funcion de eliminar.
     */
    echo $EstacionClimatologica->delete();
}

//Obtiene todas las estaciones climatologicas
function getTodos(){
    $Estaciones = new EstacionClimatologica();
    echo json_encode($Estaciones->getEstaciones());
}

//Obtiene la información que se colocará en el mapa
function getInfoMap(){
    $Estaciones = new EstacionClimatologica();
    echo json_encode($Estaciones->getEstacionesMap(filter_input(INPUT_POST, "query")));
}

function UnidadSiembra(){
    $objPHPExcel = getArchivo(); //Se obtiene el archivo
    $Cultivos=getCultivos();
    $Ciclos=getCiclos();
    $OrganismosCuenca=getOrganismosCuenca();
    $Estados=getEstados();
    $objPHPExcel->setActiveSheetIndex(0); //Asignamos la hoja de calculo activa 1
    $numRows = $objPHPExcel->setActiveSheetIndex(0)->getHighestRow(); //Obtener el numero de filas del archivo
    $bandera = true; //Bandera que nos ayuda a identificar si se realizó el proceso con éxito
    if ($numRows > 1){//Si la primera hoja tiene filas comenzamos con la extraccion de datos
        for ($i = 2; $i <= $numRows; $i++){
            $unidadSiembra = new SiembraUnidad(); //Crear instancia de SiembraUnidad
            $unidadSiembra->setSembrada(str_replace(' ','',$objPHPExcel->getActiveSheet()->getCell('A' . $i)->getValue()));
            $unidadSiembra->setCosechada(str_replace(' ','',$objPHPExcel->getActiveSheet()->getCell('B' . $i)->getValue()));
            $unidadSiembra->setProduccion(str_replace(' ','',$objPHPExcel->getActiveSheet()->getCell('C' . $i)->getValue()));
            $unidadSiembra->setValor(str_replace(' ','',$objPHPExcel->getActiveSheet()->getCell('D' . $i)->getValue()));
            $unidadSiembra->setCicloId($objPHPExcel->getActiveSheet()->getCell('E' . $i)->getValue());
            $unidadSiembra->setCultivoId($objPHPExcel->getActiveSheet()->getCell('F' . $i)->getValue());
            $unidadSiembra->setAnioagricolaId($objPHPExcel->getActiveSheet()->getCell('G' . $i)->getValue());
            $unidadSiembra->setUnidadRiegoId($objPHPExcel->getActiveSheet()->getCell('H' . $i)->getValue());
            $validar = validarCamposUnidadSiembra($unidadSiembra, $i);
            if ($validar != null) { //Se validan campos
                echo $validar;
                $bandera = false;
                break;
            }else{
                if ($unidadSiembra->existeSiembra() == 0){//Se verifica si se va insertar o actualizar
                    if ($unidadSiembra->Insert() != 1)
                    {//Se inserta
                        echo "Se encontró registro del Distrito de Riego con ID=" . $unidadSiembra->getUnidadRiegoId() . " pero no se pudo insertar, verifica el registro " . $i . ".";
                        $bandera = false;
                        break;
                    }
                }else{
                    if ($unidadSiembra->Update() != 1)
                    {//Se actualiza
                        echo "Se encontró registro del Distrito de Riego con ID=" . $unidadSiembra->getUnidadRiegoId() . " pero no se pudo actualizar, verifica el registro " . $i . ".";
                        $bandera = false;
                        break;
                    }
                }
            }
        }
    }
    else{
        echo 'Tu archivo en Excel está vacío.';
        unlink("Formato_UnidadSiembra.xlsx");
    }
    //Se realizó con exito la operación
    if ($bandera){
        unlink("Formato_UnidadSiembra.xlsx");
        echo 'OK';
    }
}
