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
require_once(__DIR__ . "/../modelo/acuifero.php");
require_once(__DIR__ . "/../modelo/acuiferodisp.php");
require_once(__DIR__ . "/../modelo/acuiferohidro.php");
require_once(__DIR__ . "/../modelo/acuiferomun.php");
require_once(__DIR__ . "/../modelo/acuiferopob.php");
require_once(__DIR__ . "/../modelo/acuiferocuenca.php");
require_once(__DIR__ . "/../modelo/acuiferototal.php");
require_once(__DIR__ . "/../modelo/estado.php");
require_once(__DIR__ . "/../modelo/municipio.php");
require_once(__DIR__ . "/../modelo/titular.php");
require_once(__DIR__ . "/../modelo/titulo.php");
require_once(__DIR__ . "/../modelo/cuenca.php");
require_once(__DIR__ . "/../modelo/cultivo.php");
require_once(__DIR__ . "/../modelo/presa.php");
require_once(__DIR__ . "/../modelo/presavolumen.php");
require_once(__DIR__ . "/../modelo/anio.php");
require_once(__DIR__ . "/../modelo/tipopozo.php");
require_once(__DIR__ . "/../modelo/uso.php");
require_once(__DIR__ . "/../modelo/ciclo.php");
require_once(__DIR__ . "/../modelo/siembradtt.php");
require_once(__DIR__ . "/../modelo/siembraunidad.php");
require_once(__DIR__ . "/../modelo/municipiodistrito.php");
require_once(__DIR__ . "/../modelo/anioagricola.php");
require_once(__DIR__ . "/../modelo/tenencia.php");
require_once(__DIR__ . "/../modelo/fuente.php");
require_once(__DIR__ . "/../modelo/municipiodistrito.php");
require_once(__DIR__ . "/../modelo/anio.php");
require_once(__DIR__ . "/../modelo/pozo.php");
require_once(__DIR__ . "/../modelo/municipiomarginacion.php");
require_once(__DIR__ . "/../modelo/estadomarginacion.php");
require_once(__DIR__ . "/../modelo/region.php");
require_once(__DIR__ . "/../modelo/estacionclimatologica.php");
require_once(__DIR__ . "/../modelo/estacionhidrometrica.php");
require_once(__DIR__ . "/../modelo/dtt.php");
require_once(__DIR__ . "/../modelo/organismoclimatologico.php");



/*
 * Libreria de excel
 */
require_once(__DIR__ . "/../../excel/PHPExcel/IOFactory.php");

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
     * Importar acuiferos
     */
    case 'Acu':
        try {
            Acu();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    /**
     * Importar Propietarios
     */
    case 'Titular':
        try {
            Titular();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    /**
     * Importar Concesiones
     */
    case 'Titulo':
        try {
            Titulo();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    /**
     * Importar Cuencas
     */
    case 'Cuenca':
        try {
            Cuenca();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    /**
     * Importar Cultivo
     */
    case 'Cultivo':
        try {
            Cultivo();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    /**
     * Importar Presa
     */
    case 'Presa':
        try {
            Presa();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'MarginacionMunicipio':
        try {
            MarginacionMunicipio();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'MarginacionEstado':
        try {
            MarginacionEstado();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'EstacionClimatologica':
        try {
            EstacionClimatologica();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'EstacionHidrometrica':
        try {
            EstacionHidrometrica();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

/**
 * @return bool
 * @throws PHPExcel_Exception
 * @throws PHPExcel_Reader_Exception
 * Funcion para importar acuiferos
 */
function Acu() {
    /*
     * Obtenemos el archivo
     */
    $archivoRecibido = $_FILES["archivo"]["tmp_name"];
    $archivo = "Formato_Acuifero.xlsx";

    /**
     * Movemos el archivo temporal al directorio
     */
    if (!move_uploaded_file($archivoRecibido, $archivo)) {
        echo 'EL proceso ha fallado';
    }

    /**
     * Carga de la hoja de cálculo
     */
    $objPHPExcel = PHPExcel_IOFactory::load($archivo);

    /**
     * Asignar la hoja de calculo activa 1
     */
    $objPHPExcel->setActiveSheetIndex(0);

    /**
     * Obtenemos el numero de filas del archivo
     */
    $numRows = $objPHPExcel->setActiveSheetIndex(0)->getHighestRow();

    /**
     * Si la primera hoja tiene filas comenzamos con la extraccion de datos
     */
    if ($numRows > 1) {
        for ($i = 2; $i <= $numRows; $i++) {

            /**
             * Se crea la instancia a acuifero
             */
            $NAcuifero = new Acuifero();
            /**
             * Se colocan los datos correspondientes
             */
            $NAcuifero->setIdAcuifero($objPHPExcel->getActiveSheet()->getCell('A' . $i)->getValue());

            /**
             * Obtenemos el estado
             */
            $ESTADO = $objPHPExcel->getActiveSheet()->getCell('G' . $i)->getValue();
            /**
             * Obtenemos el Id de Estado
             */
            $nEstado = new Estado();
            $nEstado = $nEstado->getEstado($ESTADO);
            $ESTADO = $nEstado['id_estado'];
            /**
             * Se coloca el id obtenido en acuifero
             */
            $NAcuifero->setEstadoId($ESTADO);
            /**
             * Se continua con la captura de los datos
             */
            $NAcuifero->setNombre($objPHPExcel->getActiveSheet()->getCell('B' . $i)->getValue());
            $NAcuifero->setFechaDof(date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($objPHPExcel->getActiveSheet()->getCell('C' . $i)->getValue())));
            $NAcuifero->setFechaRepda(date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($objPHPExcel->getActiveSheet()->getCell('D' . $i)->getValue())));
            $NAcuifero->setLatitud($objPHPExcel->getActiveSheet()->getCell('F' . $i)->getValue());
            $NAcuifero->setLongitud($objPHPExcel->getActiveSheet()->getCell('E' . $i)->getValue());
            /**
             * Se crea la instancia a acuifireo cuenca
             */
            $NCuenca = new AcuiferoCuenca();
            $NCuenca->setAcuiferoId($objPHPExcel->getActiveSheet()->getCell('A' . $i)->getValue());
            $NCuenca->setCuencaId($objPHPExcel->getActiveSheet()->getCell('H' . $i)->getValue());
            $NCuenca->setSubcuenca($objPHPExcel->getActiveSheet()->getCell('I' . $i)->getValue());
            /**
             * Se crea la instancia a acuifero disponibilidad
             */
            $NDisp = new AcuiferoDisp();
            $NDisp->setAcuiferoId($objPHPExcel->getActiveSheet()->getCell('A' . $i)->getValue());
            $NDisp->setR($objPHPExcel->getActiveSheet()->getCell('J' . $i)->getValue());
            $NDisp->setDnc($objPHPExcel->getActiveSheet()->getCell('K' . $i)->getValue());
            $NDisp->setVcas($objPHPExcel->getActiveSheet()->getCell('L' . $i)->getValue());
            $NDisp->setVeala($objPHPExcel->getActiveSheet()->getCell('M' . $i)->getValue());
            $NDisp->setVaptyr($objPHPExcel->getActiveSheet()->getCell('N' . $i)->getValue());
            $NDisp->setVaprh($objPHPExcel->getActiveSheet()->getCell('O' . $i)->getValue());
            $NDisp->setDma($objPHPExcel->getActiveSheet()->getCell('P' . $i)->getValue());
            $NDisp->setAnioActualizacion($objPHPExcel->getActiveSheet()->getCell('Q' . $i)->getValue());
            /**
             * Se crea una nueva instancia a acuifero hidrologica
             */
            $NHidro = new AcuiferoHidro();
            $NHidro->setAcuiferoId($objPHPExcel->getActiveSheet()->getCell('A' . $i)->getValue());
            $NHidro->setPNestaticoMin($objPHPExcel->getActiveSheet()->getCell('R' . $i)->getValue());
            $NHidro->setPNestaticomax($objPHPExcel->getActiveSheet()->getCell('S' . $i)->getValue());
            $NHidro->setPNdinamicomin($objPHPExcel->getActiveSheet()->getCell('T' . $i)->getValue());
            $NHidro->setPNdinamicomax($objPHPExcel->getActiveSheet()->getCell('U' . $i)->getValue());
            /**
             * Acuifero Poblacion
             */
            $NPoblacion = new AcuiferoPob();
            $NPoblacion->setAcuiferoId($objPHPExcel->getActiveSheet()->getCell('A' . $i)->getValue());
            $NPoblacion->setNumHabitantes($objPHPExcel->getActiveSheet()->getCell('V' . $i)->getValue());
            $NPoblacion->setNumHabitantesRural($objPHPExcel->getActiveSheet()->getCell('W' . $i)->getValue());
            $NPoblacion->setRumHabitantesUrbana($objPHPExcel->getActiveSheet()->getCell('X' . $i)->getValue());
            /**
             * Total
             */
            $Ntotal = new AcuiferoTotal();
            $Ntotal->setAcuiferoId($objPHPExcel->getActiveSheet()->getCell('A' . $i)->getValue());
            $Ntotal->setEjidales($objPHPExcel->getActiveSheet()->getCell('Y' . $i)->getValue());
            $Ntotal->setPequenosPropietarios($objPHPExcel->getActiveSheet()->getCell('Z' . $i)->getValue());
            $Ntotal->setVolumenAnual($objPHPExcel->getActiveSheet()->getCell('AA' . $i)->getValue());
            $Ntotal->setTotalUsuario($objPHPExcel->getActiveSheet()->getCell('AB' . $i)->getValue());
            /**
             * Se verifica si se va insertar o actualizar
             */
            if ($NAcuifero->getAcu() == 0) {
                /**
                 * Si se inserto correctamente el acuifero
                 */
                if ($NAcuifero->Insert() == 1) {
                    /**
                     * Se inserta La cuenca
                     */
                    if ($NCuenca->Insert() == 1) {
                        /**
                         * Se inserta la disponibilidad
                         */
                        if ($NDisp->Insert() == 1) {
                            //Se inserta la informacion hidrogeologica
                            if ($NHidro->Insert() == 1) {
                                /**
                                 * Se inserta la poblacion
                                 */
                                if ($NPoblacion->Insert() == 1) {
                                    /**
                                     * Se inserta El total
                                     */
                                    if ($Ntotal->Insert() == 1) {
                                        
                                    } else {
                                        $NAcuifero->delete();
                                        err();
                                        break;
                                    }
                                } else {
                                    $NAcuifero->delete();
                                    err();
                                    break;
                                }
                            } else {
                                $NAcuifero->delete();
                                err();
                                break;
                            }
                        } else {
                            $NAcuifero->delete();
                            err();
                            break;
                        }
                    } else {
                        $NAcuifero->delete();
                        err();
                        break;
                    }
                } else {
                    $NAcuifero->delete();
                    err();
                    break;
                }
            } else {
                /**
                 * Si se actualizo correctamente el acuifero
                 */
                if ($NAcuifero->update() == 1) {
                    /**
                     * Se actualiza La cuenca
                     */
                    if ($NCuenca->update() == 1) {
                        /**
                         * Se actualiza la disponibilidad
                         */
                        if ($NDisp->update() == 1) {
                            /**
                             * Se actualiza la informacion hidrogeologica
                             */
                            if ($NHidro->update() == 1) {
                                /**
                                 * Se actualiza la poblacion
                                 */
                                if ($NPoblacion->update() == 1) {
                                    //Se inserta El total
                                    if ($Ntotal->update() == 1) {
                                        
                                    } else {
                                        err();
                                        break;
                                    }
                                } else {
                                    err();
                                    break;
                                }
                            } else {
                                err();
                                break;
                            }
                        } else {
                            err();
                            break;
                        }
                    } else {
                        err();
                        break;
                    }
                } else {
                    err();
                    break;
                }
            }
        }
    } else {
        /**
         * Se manda el mensaje de error
         */
        err();
        unlink("Formato_Propietario.xlsx");
        return false;
    }
    /**
     * Se hace referencia a la hoja 2 del excel
     */
    $numRows = $objPHPExcel->setActiveSheetIndex(1)->getHighestRow();

    if ($numRows > 1) {
        for ($i = 2; $i <= $numRows; $i++) {
            /**
             * Creamos la instancia
             */
            $AcuMun = new AcuiferoMun();
            /**
             * Instancia de Estado
             */
            $Estado = new Estado();
            /**
             * Instancia de Municipio
             */
            $Municipio = new Municipio();
            /**
             * Extraer el Id del estado
             */
            $id_Estado = $Estado->getEstado($objPHPExcel->getActiveSheet()->getCell('B' . $i)->getValue());
            /**
             * Obtener el Municipio
             */
            $id_municipio = $Municipio->getMunicipio($id_Estado['id_estado'], $objPHPExcel->getActiveSheet()->getCell('C' . $i)->getValue());
            /**
             * Colocamos los datos a la instancia
             */
            $AcuMun->setAcuiferoID($objPHPExcel->getActiveSheet()->getCell('A' . $i)->getValue());
            $AcuMun->setMunicipioID($id_municipio['id_municipio']);
            $AcuMun->Insert();
        }
    }
    /**
     * Retornar estado del proceso
     */
    unlink("Formato_Acuifero.xlsx");
    echo '<script type="text/javascript">alert("Importación Exitosa");</script>';
    echo "<script type='text/javascript'>";
    echo "window.location.href ='/aplicacion/vista/crud/dbadmin.php'";
    echo "</script>";
}

/**
 * @return bool
 * @throws PHPExcel_Exception
 * @throws PHPExcel_Reader_Exception
 * Funcion para importar excel de propietarios
 */
function Titular() {
    /**
     * Leemos el archivo
     */
    $archivoRecibido = $_FILES["archivo"]["tmp_name"];
    $archivo = "Formato_Titulares.xlsx";
    /**
     * Movemos el archivo temporal al directorio
     */
    if (!move_uploaded_file($archivoRecibido, $archivo)) {
        echo 'EL proceso ha fallado';
        //err();
    }
    /**
     * Cargamos la hoja de cálculo
     */
    $objPHPExcel = PHPExcel_IOFactory::load($archivo);
    /**
     * Asignamos la hoja de calculo activa 1
     */
    $objPHPExcel->setActiveSheetIndex(0);
    /**
     * Obtenemos el numero de filas del archivo
     */
    $numRows = $objPHPExcel->setActiveSheetIndex(0)->getHighestRow();
    echo $numRows;
    /**
     * Si la primera hoja tiene filas comenzamos con la extraccion de datos
     */
    if ($numRows > 1) {
        for ($i = 2; $i <= $numRows; $i++) {
            /**
             * Crear instancia de Propietatio
             */
            $Titular = new Titular();
            /**
             * Colocar los datos del POST por medio de los metodos SET
             */
            $Titular->setIdTitular($objPHPExcel->getActiveSheet()->getCell('A' . $i)->getValue());
            $Titular->setTitular($objPHPExcel->getActiveSheet()->getCell('B' . $i)->getValue());
            /**
             * Se verifica si se va insertar o actualizar
             */
            if ($Titular->getProp() == 0) {
                /**
                 * Se inserta
                 */
                if ($Titular->Insert() != 1) {
                    err();
                    unlink("Formato_Titulares.xlsx");
                    break;
                }
            } else {
                /**
                 * Se actualiza
                 */
                if ($Titular->Update() != 1) {
                    err();
                    unlink("Formato_Titulares.xlsx");
                    break;
                }
            }
        }
    } else {
        /**
         * Se manda el mensaje de error
         */
        err();
        unlink("Formato_Titulares.xlsx");
        return false;
    }
    unlink("Formato_Titulares.xlsx");
    echo '<script type="text/javascript">alert("Importación Exitosa");</script>';
    echo "<script type='text/javascript'>";
    echo "window.location.href ='/aplicacion/vista/crud/dbadmin.php'";
    echo "</script>";
}

/**
 * @return bool
 * @throws PHPExcel_Exception
 * @throws PHPExcel_Reader_Exception
 * Funcion para importar excel de propietarios
 */
function Titulo() {
    /**
     * Leemos el archivo
     */
    $archivoRecibido = $_FILES["archivo"]["tmp_name"];
    $archivo = "Formato_Titulo.xlsx";
    /**
     * Movemos el archivo al directorio
     */
    if (!move_uploaded_file($archivoRecibido, $archivo)) {
        echo 'El proceso ha fallado';
    }
    /**
     * Cargamos la hoja de cálculo
     */
    $objPHPExcel = PHPExcel_IOFactory::load($archivo);
    /**
     * Asignar la hoja de calculo activa 1
     */
    $objPHPExcel->setActiveSheetIndex(0);
    /**
     * Obtener el numero de filas del archivo
     */
    $numRows = $objPHPExcel->setActiveSheetIndex(0)->getHighestRow();
    /**
     * Si la primera hoja tiene filas comenzamos con la extraccion de datos
     */
    if ($numRows > 1) {
        for ($i = 2; $i <= $numRows; $i++) {
            $Titlulo = new Titulo();
            //ID
            $Titlulo->setId_titulo($objPHPExcel->getActiveSheet()->getCell('A' . $i)->getValue());
            //Uso
            $uso = New Uso();
            $uso = $uso->getUs($objPHPExcel->getActiveSheet()->getCell('B' . $i)->getValue());
            $Titlulo->setUso_id($uso['id_uso']);
            //Titular
            $Titlulo->setTitular($objPHPExcel->getActiveSheet()->getCell('C' . $i)->getValue());
            //VolTotal
            $Titlulo->setVol_amparado_total($objPHPExcel->getActiveSheet()->getCell('D' . $i)->getValue());
            $Titlulo->setNum_aprov_superf($objPHPExcel->getActiveSheet()->getCell('E' . $i)->getValue());
            $Titlulo->setVol_aprov_superf($objPHPExcel->getActiveSheet()->getCell('F' . $i)->getValue());
            $Titlulo->setNum_aprov_subt($objPHPExcel->getActiveSheet()->getCell('G' . $i)->getValue());
            $Titlulo->setVol_aprov_subt($objPHPExcel->getActiveSheet()->getCell('H' . $i)->getValue());
            $Titlulo->setPuntos_desc($objPHPExcel->getActiveSheet()->getCell('I' . $i)->getValue());
            $Titlulo->setVol_desc_diario($objPHPExcel->getActiveSheet()->getCell('J' . $i)->getValue());
            $Titlulo->setZonas_fed_amp_titulo($objPHPExcel->getActiveSheet()->getCell('K' . $i)->getValue());
            $Titlulo->setSupeficie($objPHPExcel->getActiveSheet()->getCell('L' . $i)->getValue());
            $Titlulo->setFecha_reg(date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($objPHPExcel->getActiveSheet()->getCell('M' . $i)->getValue())));


            //$estado = New Estado();
            // $estado = $estado->getEstado($objPHPExcel->getActiveSheet()->getCell('C' . $i)->getValue());
            //$Titlulo->setEstadoId($estado['id_estado']);
            //$Municipio = new Municipio();
            //$id_municipio = $Municipio->getMunicipio($estado['id_estado'], $objPHPExcel->getActiveSheet()->getCell('D' . $i)->getValue());  
            /**
             * Se verifica si se va insertar o actualizar
             */
            if ($Titlulo->getTitu() == 0) {
                /**
                 * Se inserta
                 */
                if ($Titlulo->Insert() != 1) {
                    err();
                    unlink("Formato_Titulo.xlsx");
                    return false;
                }
            } else {
                /**
                 * Se actualiza
                 */
                if ($Titlulo->Update() != 1) {
                    err();
                    unlink("Formato_Titulo.xlsx");
                    return false;
                }
            }
        }
    } else {
        /**
         * Se manda el mensaje de error
         */
        err();
        unlink("Formato_Titulo.xlsx");
        return false;
    }
    //Se cambia de hoja
    $objPHPExcel->setActiveSheetIndex(1);
    /**
     * Obtener el numero de filas del archivo
     */
    $numRows = $objPHPExcel->setActiveSheetIndex(1)->getHighestRow();
    if ($numRows > 1) {
        for ($i = 2; $i <= $numRows; $i++) {
            /**
             * Crear instancia de Propietatio
             */
            $Pozo = new Pozo();
            $Pozo->setID_pozo($objPHPExcel->getActiveSheet()->getCell('A' . $i)->getValue());
            $Pozo->setTitulo_id($objPHPExcel->getActiveSheet()->getCell('B' . $i)->getValue());
            $Pozo->setRegion_id($objPHPExcel->getActiveSheet()->getCell('C' . $i)->getValue());
            $Estado = new Estado();
            //Instancia de Municipio
            $Municipio = new Municipio();
            //Extraer el Id del estado
            $id_Estado = $Estado->getEstado($objPHPExcel->getActiveSheet()->getCell('D' . $i)->getValue());
            //Obtener el Municipio
            $id_municipio = $Municipio->getMunicipio($id_Estado['id_estado'], $objPHPExcel->getActiveSheet()->getCell('E' . $i)->getValue());
            $Pozo->setMunicipio_id($id_municipio['id_municipio']);
            $Pozo->setEstado_Id($id_Estado['id_estado']);
            //
            $Pozo->setCuenca_id($objPHPExcel->getActiveSheet()->getCell('F' . $i)->getValue());
            $Pozo->setSup($objPHPExcel->getActiveSheet()->getCell('G' . $i)->getValue());
            $Pozo->setCorriente($objPHPExcel->getActiveSheet()->getCell('H' . $i)->getValue());
            $Pozo->setVol_anual($objPHPExcel->getActiveSheet()->getCell('I' . $i)->getValue());
            $Pozo->setVol_diario($objPHPExcel->getActiveSheet()->getCell('J' . $i)->getValue());
            $Pozo->setAcuifero_id($objPHPExcel->getActiveSheet()->getCell('K' . $i)->getValue());
            $Pozo->setProcedencia($objPHPExcel->getActiveSheet()->getCell('L' . $i)->getValue());
            $Pozo->setReceptor($objPHPExcel->getActiveSheet()->getCell('M' . $i)->getValue());
            $Pozo->setUso($objPHPExcel->getActiveSheet()->getCell('N' . $i)->getValue());
            $Pozo->setFuente($objPHPExcel->getActiveSheet()->getCell('O' . $i)->getValue());
            $Pozo->setAfluente($objPHPExcel->getActiveSheet()->getCell('P' . $i)->getValue());
            $Pozo->setForma_desc($objPHPExcel->getActiveSheet()->getCell('Q' . $i)->getValue());
            $Pozo->setAnexo($objPHPExcel->getActiveSheet()->getCell('S' . $i)->getValue());
            $Pozo->setLat($objPHPExcel->getActiveSheet()->getCell('T' . $i)->getValue());
            $Pozo->setLon($objPHPExcel->getActiveSheet()->getCell('U' . $i)->getValue());
            $Pozo->setTipo_id($objPHPExcel->getActiveSheet()->getCell('R' . $i)->getValue());
            /**
             * Se verifica si se va insertar o actualizar
             */
            if ($Pozo->getPoz() == 0) {
                /**
                 * Se inserta
                 */
                if ($Pozo->Insert() != 1) {
                    err();
                    unlink("Formato_Titulo.xlsx");
                    break;
                }
            } else {
                /**
                 * Se actualiza
                 */
                if ($Pozo->Update() != 1) {
                    err();
                    unlink("Formato_Titulo.xlsx");
                    break;
                }
            }
        }
    } else {
        /**
         * Se manda el mensaje de error
         */
        err();
        unlink("Formato_Titulo.xlsx");
        return false;
    }


    unlink("Formato_Titulo.xlsx");
    echo 'OK';
}

/**
 * @return bool
 * @throws PHPExcel_Exception
 * @throws PHPExcel_Reader_Exception
 * Funcion para importar excel de cuencas
 */
function Cuenca() {
    /**
     * Leemos el archivo
     */
    $archivoRecibido = $_FILES["archivo"]["tmp_name"];
    $archivo = "Formato_Cuenca.xlsx";
    if (!move_uploaded_file($archivoRecibido, $archivo)) {
        echo 'EL proceso ha fallado';
    }
    /**
     * Cargar la hoja de cálculo
     */
    $objPHPExcel = PHPExcel_IOFactory::load($archivo);
    /**
     * Asignar la hoja de calculo activa 1
     */
    $objPHPExcel->setActiveSheetIndex(0);
    /**
     * Obtenger el numero de filas del archivo
     */
    $numRows = $objPHPExcel->setActiveSheetIndex(0)->getHighestRow();
    /**
     * Si la primera hoja tiene filas comenzamos con la extraccion de datos
     */
    if ($numRows > 1) {
        for ($i = 2; $i <= $numRows; $i++) {
            /**
             * Crear instancia de Cuenca
             */
            $Cuenca = new Cuenca();
            /**
             * Colocar los datos del archivo por medio de los metodos SET
             */
            $Cuenca->setIdCuenca($objPHPExcel->getActiveSheet()->getCell('A' . $i)->getValue());
            $Cuenca->setNombre($objPHPExcel->getActiveSheet()->getCell('B' . $i)->getValue());
            $Cuenca->setRegHidrologicaId($objPHPExcel->getActiveSheet()->getCell('C' . $i)->getValue());
            /**
             * Se verifica si se va insertar o actualizar
             */
            if ($Cuenca->getCuen() == 0) {
                /**
                 * Se inserta
                 */
                if ($Cuenca->Insert() != 1) {
                    err();
                    break;
                }
            } else {
                /**
                 * Se actualiza
                 */
                if ($Cuenca->Update() != 1) {
                    err();
                    break;
                }
            }
        }
    } else {
        /**
         * Se manda el mensaje de error
         */
        err();
        unlink("Formato_Cuenca.xlsx");
        return false;
    }
    unlink("Formato_Cuenca.xlsx");
    echo '<script type="text/javascript">alert("Importación Exitosa");</script>';
    echo "<script type='text/javascript'>";
    echo "window.location.href ='/aplicacion/vista/crud/dbadmin.php'";
    echo "</script>";
}

/**
 * @return bool
 * @throws PHPExcel_Exception
 * @throws PHPExcel_Reader_Exception
 * Funcion para importar excel de cultivo
 */
function Cultivo() {
    /**
     * Leemos el archivo
     */
    $archivoRecibido = $_FILES["archivo"]["tmp_name"];
    $archivo = "Formato_Cultivo.xlsx";
    /**
     * Movemos el archivo al directorioi
     */
    if (!move_uploaded_file($archivoRecibido, $archivo)) {
        echo 'EL proceso ha fallado';
    }
    /**
     * Cargamos la hoja de cálculo
     */
    $objPHPExcel = PHPExcel_IOFactory::load($archivo);
    /**
     * Asignamos la hoja de calculo activa 1
     */
    $objPHPExcel->setActiveSheetIndex(0);
    /**
     * Obtener el numero de filas del archivo
     */
    $numRows = $objPHPExcel->setActiveSheetIndex(0)->getHighestRow();
    /**
     * Si la primera hoja tiene filas comenzamos con la extraccion de datos
     */
    if ($numRows > 1) {
        for ($i = 2; $i <= $numRows; $i++) {
            /**
             * Crear instancia de Cultivo
             */
            $Cultivo = new Cultivo();
            /**
             * Colocar los datos del archivo por medio de los metodos SET
             */
            $Cultivo->setIdCultivo($objPHPExcel->getActiveSheet()->getCell('A' . $i)->getValue());
            $Cultivo->setNombre($objPHPExcel->getActiveSheet()->getCell('B' . $i)->getValue());
            $Cultivo->setNombreCientifico($objPHPExcel->getActiveSheet()->getCell('C' . $i)->getValue());
            $Cultivo->setGrupoCultivoId($objPHPExcel->getActiveSheet()->getCell('D' . $i)->getValue());
            /**
             * Se verifica si se va insertar o actualizar
             */
            if ($Cultivo->getCultivobyId() == 0) {
                /**
                 * Se inserta
                 */
                if ($Cultivo->Insert() != 1) {
                    err();
                    break;
                }
            } else {
                /**
                 * Se actualiza
                 */
                if ($Cultivo->Update() != 1) {
                    err();
                    break;
                }
            }
        }
    } else {
        /**
         * Se manda el mensaje de error
         */
        err();
        unlink("Formato_Cultivo.xlsx");
        return false;
    }
    unlink("Formato_Cultivo.xlsx");
    echo '<script type="text/javascript">alert("Importación Exitosa");</script>';
    echo "<script type='text/javascript'>";
    echo "window.location.href ='/aplicacion/vista/crud/dbadmin.php'";
    echo "</script>";
}

/**
 * @return bool
 * @throws PHPExcel_Exception
 * @throws PHPExcel_Reader_Exception
 * Funcion para importar el excel de presas
 */
function Presa() {
    /*     * Se lee el archivo
     */
    $archivoRecibido = $_FILES["archivo"]["tmp_name"];
    /**
     * Se mueve el archivo al directorio
     */
    $archivo = "Formato_Presa.xlsx";
    if (!move_uploaded_file($archivoRecibido, $archivo)) {
        echo 'EL proceso ha fallado';
    }
    /**
     * Cargamos la hoja de cálculo
     */
    $objPHPExcel = PHPExcel_IOFactory::load($archivo);
    /**
     * Asignamos la hoja de calculo activa 1
     */
    $objPHPExcel->setActiveSheetIndex(0);
    /**
     * Obtenemos el numero de filas del archivo
     */
    $numRows = $objPHPExcel->setActiveSheetIndex(0)->getHighestRow();
    /**
     * Si la primera hoja tiene filas comenzamos con la extraccion de datos
     */
    if ($numRows > 1) {
        for ($i = 2; $i <= $numRows; $i++) {
            /**
             * Crear instancia de Presa
             */
            $Presa = new Presa();
            /**
             * Colocar los datos del archivo por medio de los metodos SET
             */
            $Presa->setIdPresa($objPHPExcel->getActiveSheet()->getCell('A' . $i)->getValue());
            $Presa->setNomOficial($objPHPExcel->getActiveSheet()->getCell('B' . $i)->getValue());
            $Presa->setNomComun($objPHPExcel->getActiveSheet()->getCell('C' . $i)->getValue());
            $Presa->setCorriente($objPHPExcel->getActiveSheet()->getCell('D' . $i)->getValue());
            $Presa->setAnioTerm($objPHPExcel->getActiveSheet()->getCell('E' . $i)->getValue());
            /**
             * Obtenemos el estado
             */
            $ESTADO = $objPHPExcel->getActiveSheet()->getCell('G' . $i)->getValue();
            /**
             * Obtenemos el id del estado
             */
            $nEstado = new Estado();
            $nEstado = $nEstado->getEstado($ESTADO);
            $ESTADO = $nEstado['id_estado'];
            /**
             * Se coloca el id obtenido en la presa
             */
            $Presa->setEdo($ESTADO);
            /**
             * Se verifica si se va insertar o actualizar
             */
            if ($Presa->existePresa() == 0) {
                /**
                 * Se inserta
                 */
                if ($Presa->Insert() != 1) {
                    err();
                    break;
                }
            } else {
                /**
                 * Se actualiza
                 */
                if ($Presa->Update() != 1) {
                    err();
                    break;
                }
            }
        }
    } else {
        /**
         * Se manda el mensaje de error
         */
        err();
        unlink("Formato_Presa.xlsx");
        return false;
    }
    unlink("Formato_Presa.xlsx");
    echo 'OK';
}





function err() {
    /**
     * Se manda mensaje de error al usuario
     */
    echo '<script type="text/javascript">alert("Al parecer el archivo contiene errores, verifique el archivo e intente nuevamente.");</script>';
    echo "<script type='text/javascript'>";
    echo "javascript:window.history.back();";
    echo "</script>";
}

function MarginacionMunicipio() {
    $archivoRecibido = $_FILES["archivo"]["tmp_name"]; //Se lee el archivo
    $archivo = "Formato_MarginacionMunicipio.xlsx";
    if (!move_uploaded_file($archivoRecibido, $archivo)) {//Movemos el archivo al directorioi
        echo 'El proceso ha fallado';
    }
    $objPHPExcel = PHPExcel_IOFactory::load($archivo); //Cargamos la hoja de cálculo
    $objPHPExcel->setActiveSheetIndex(0); //Asignamos la hoja de calculo activa 1
    $numRows = $objPHPExcel->setActiveSheetIndex(0)->getHighestRow(); //Obtener el numero de filas del archivo    
    $bandera = true; //Bandera que nos ayuda a identificar si se realizó el proceso con éxito
    if ($numRows > 1) {//Si la primera hoja tiene filas comenzamos con la extraccion de datos
        for ($i = 2; $i <= $numRows; $i++) {
            $regMargi = new MunicipioMarginacion();
            $regMargi->setPob_tot($objPHPExcel->getActiveSheet()->getCell('A' . $i)->getValue());
            $regMargi->setAnalf($objPHPExcel->getActiveSheet()->getCell('B' . $i)->getValue());
            $regMargi->setSprim($objPHPExcel->getActiveSheet()->getCell('C' . $i)->getValue());
            $regMargi->setOvsde($objPHPExcel->getActiveSheet()->getCell('D' . $i)->getValue());
            $regMargi->setOvsee($objPHPExcel->getActiveSheet()->getCell('E' . $i)->getValue());
            $regMargi->setOvsae($objPHPExcel->getActiveSheet()->getCell('F' . $i)->getValue());
            $regMargi->setVhac($objPHPExcel->getActiveSheet()->getCell('G' . $i)->getValue());
            $regMargi->setOvpt($objPHPExcel->getActiveSheet()->getCell('H' . $i)->getValue());
            $regMargi->setPl_5000($objPHPExcel->getActiveSheet()->getCell('I' . $i)->getValue());
            $regMargi->setPo2sm($objPHPExcel->getActiveSheet()->getCell('J' . $i)->getValue());
            $regMargi->setIm($objPHPExcel->getActiveSheet()->getCell('K' . $i)->getValue());
            $regMargi->setGm($objPHPExcel->getActiveSheet()->getCell('L' . $i)->getValue());
            $regMargi->setAnio_id($objPHPExcel->getActiveSheet()->getCell('O' . $i)->getValue());
            $resultado = validarCamposMarginacion($regMargi, $i);
            $resultadoBusqueda = buscarIDMunicipio($objPHPExcel->getActiveSheet()->getCell('M' . $i)->getValue(), $objPHPExcel->getActiveSheet()->getCell('N' . $i)->getValue(), $i); //Se hace la busqueda del id global con el estado y municipio
            if ($resultado != null || is_numeric($resultadoBusqueda) == null) { //Se validan campos                
                if ($resultado != null) {
                    echo $resultado;
                } elseif (is_numeric($resultadoBusqueda) == null) {
                    echo $resultadoBusqueda;
                }
                $bandera = false;
                break;
            } else {
                $regMargi->setMunicipio_id($resultadoBusqueda);
                if ($regMargi->existeRegistro() == 0) {//Se verifica si se va insertar o actualizar
                    if ($regMargi->Insert() != 1) {//Se inserta
                        echo "Registro:( " . $i . " idMuni [" . $resultadoBusqueda . "] Año " . $regMargi->getAnio_id();
                        $bandera = false;
                        break;
                    }
                } else {
                    if ($regMargi->Update() != 1) {//Se actualiza
                        echo "No se pudo actualizar :(";
                        $bandera = false;
                        break;
                    }
                }
            }
        }
    } else {
        echo 'Tu archivo en Excel está vacío.';
        unlink("Formato_MarginacionMunicipio.xlsx");
    }
    //Se realizó con exito la operación
    if ($bandera) {
        unlink("Formato_MarginacionMunicipio.xlsx");
        echo 'OK';
    }
}

function MarginacionEstado() {
    $archivoRecibido = $_FILES["archivo"]["tmp_name"]; //Se lee el archivo
    $archivo = "Formato_MarginacionEstado.xlsx";
    if (!move_uploaded_file($archivoRecibido, $archivo)) {//Movemos el archivo al directorioi
        echo 'El proceso ha fallado';
    }
    $objPHPExcel = PHPExcel_IOFactory::load($archivo); //Cargamos la hoja de cálculo
    $objPHPExcel->setActiveSheetIndex(0); //Asignamos la hoja de calculo activa 1
    $numRows = $objPHPExcel->setActiveSheetIndex(0)->getHighestRow(); //Obtener el numero de filas del archivo    
    $bandera = true; //Bandera que nos ayuda a identificar si se realizó el proceso con éxito
    if ($numRows > 1) {//Si la primera hoja tiene filas comenzamos con la extraccion de datos
        for ($i = 2; $i <= $numRows; $i++) {
            $regMargi = new EstadoMarginacion();
            $regMargi->setPob_tot($objPHPExcel->getActiveSheet()->getCell('A' . $i)->getValue());
            $regMargi->setAnalf($objPHPExcel->getActiveSheet()->getCell('B' . $i)->getValue());
            $regMargi->setSprim($objPHPExcel->getActiveSheet()->getCell('C' . $i)->getValue());
            $regMargi->setOvsde($objPHPExcel->getActiveSheet()->getCell('D' . $i)->getValue());
            $regMargi->setOvsee($objPHPExcel->getActiveSheet()->getCell('E' . $i)->getValue());
            $regMargi->setOvsae($objPHPExcel->getActiveSheet()->getCell('F' . $i)->getValue());
            $regMargi->setVhac($objPHPExcel->getActiveSheet()->getCell('G' . $i)->getValue());
            $regMargi->setOvpt($objPHPExcel->getActiveSheet()->getCell('H' . $i)->getValue());
            $regMargi->setPl_5000($objPHPExcel->getActiveSheet()->getCell('I' . $i)->getValue());
            $regMargi->setPo2sm($objPHPExcel->getActiveSheet()->getCell('J' . $i)->getValue());
            $regMargi->setIm($objPHPExcel->getActiveSheet()->getCell('K' . $i)->getValue());
            $regMargi->setGm($objPHPExcel->getActiveSheet()->getCell('L' . $i)->getValue());
            $regMargi->setEstado_id($objPHPExcel->getActiveSheet()->getCell('M' . $i)->getValue());
            $regMargi->setAnio_id($objPHPExcel->getActiveSheet()->getCell('N' . $i)->getValue());
            $resultado = validarCamposMarginacion($regMargi, $i);
            if ($resultado != null) { //Se validan campos                                
                echo $resultado;
                $bandera = false;
                break;
            } else {
                if ($regMargi->existeRegistro() == 0) {//Se verifica si se va insertar o actualizar
                    if ($regMargi->Insert() != 1) {//Se inserta
                        //echo "Registro:( " . $i . " idMuni [" . $resultadoBusqueda . "] Año " . $regMargi->getAnio_id();
                        $bandera = false;
                        break;
                    }
                } else {
                    if ($regMargi->Update() != 1) {//Se actualiza
                        echo "No se pudo actualizar :(";
                        $bandera = false;
                        break;
                    }
                }
            }
        }
    } else {
        echo 'Tu archivo en Excel está vacío.';
        unlink("Formato_MarginacionEstado.xlsx");
    }
    //Se realizó con exito la operación
    if ($bandera) {
        unlink("Formato_MarginacionEstado.xlsx");
        echo 'OK';
    }
}

function EstacionClimatologica() {
    $archivoRecibido = $_FILES["archivo"]["tmp_name"]; //Se lee el archivo
    $archivo = "Formato_EstacionesClimatologicas.xlsx";
    if (!move_uploaded_file($archivoRecibido, $archivo)) {//Movemos el archivo al directorioi
        echo 'El proceso ha fallado';
    }
    $objPHPExcel = PHPExcel_IOFactory::load($archivo); //Cargamos la hoja de cálculo
    $objPHPExcel->setActiveSheetIndex(0); //Asignamos la hoja de calculo activa 1
    $numRows = $objPHPExcel->setActiveSheetIndex(0)->getHighestRow(); //Obtener el numero de filas del archivo    
    $bandera = true; //Bandera que nos ayuda a identificar si se realizó el proceso con éxito
    if ($numRows > 1) {//Si la primera hoja tiene filas comenzamos con la extraccion de datos
        for ($i = 2; $i <= $numRows; $i++) {
            $estacion = new EstacionClimatologica();
            $estacion->setIdEstacionClimatologica($objPHPExcel->getActiveSheet()->getCell('A' . $i)->getValue());
            $estacion->setClave_omm($objPHPExcel->getActiveSheet()->getCell('B' . $i)->getValue());
            $estacion->setNombre($objPHPExcel->getActiveSheet()->getCell('C' . $i)->getValue());
            $estacion->setCuenca_id($objPHPExcel->getActiveSheet()->getCell('F' . $i)->getValue());
            $estacion->setSubcuenca_id($objPHPExcel->getActiveSheet()->getCell('G' . $i)->getValue());
            $estacion->setTipo($objPHPExcel->getActiveSheet()->getCell('H' . $i)->getValue());
            $estacion->setOrganismo_id($objPHPExcel->getActiveSheet()->getCell('I' . $i)->getValue());
            $estacion->setFechainicio(date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($objPHPExcel->getActiveSheet()->getCell('J' . $i)->getValue())));
            $estacion->setFechafin(date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($objPHPExcel->getActiveSheet()->getCell('K' . $i)->getValue())));
            $estacion->setSituacion($objPHPExcel->getActiveSheet()->getCell('L' . $i)->getValue());
            $estacion->setLatitud($objPHPExcel->getActiveSheet()->getCell('M' . $i)->getValue());
            $estacion->setLongitud($objPHPExcel->getActiveSheet()->getCell('N' . $i)->getValue());
            $estacion->setAltura($objPHPExcel->getActiveSheet()->getCell('O' . $i)->getValue());
            $estacion->setObservaciones($objPHPExcel->getActiveSheet()->getCell('P' . $i)->getValue());
            $resultado = validarCamposEstacionClimatologica($estacion, $i);
            $resultadoBusqueda = buscarIDMunicipio($objPHPExcel->getActiveSheet()->getCell('E' . $i)->getValue(), $objPHPExcel->getActiveSheet()->getCell('D' . $i)->getValue(), $i); //Se hace la busqueda del id global con el estado y municipio
            if ($resultado != null || is_numeric($resultadoBusqueda) == null) { //Se validan campos                
                if ($resultado != null) {
                    echo $resultado;
                } elseif (is_numeric($resultadoBusqueda) == null) {
                    echo $resultadoBusqueda;
                }
                $bandera = false;
                break;
            } else {
                $estacion->setMunicipio_id($resultadoBusqueda);

                if ($estacion->existeRegistro() == 0) {//Se verifica si se va insertar o actualizar
                    if ($estacion->Insert() != 1) {//Se inserta
                        echo "No se pudo insertar :(";
                        $bandera = false;
                        break;
                    }
                } else {
                    if ($estacion->Update() != 1) {//Se actualiza
                        echo "No se pudo actualizar :(";
                        $bandera = false;
                        break;
                    }
                }
            }
        }
    } else {
        echo 'Tu archivo en Excel está vacío.';
        unlink("Formato_EstacionesClimatologicas.xlsx");
    }
    //Se realizó con exito la operación
    if ($bandera) {
        unlink("Formato_EstacionesClimatologicas.xlsx");
        echo 'OK';
    }
}

function EstacionHidrometrica() {
    $archivoRecibido = $_FILES["archivo"]["tmp_name"]; //Se lee el archivo
    $archivo = "Formato_EstacionesHidrometricas.xlsx";
    if (!move_uploaded_file($archivoRecibido, $archivo)) {//Movemos el archivo al directorioi
        echo 'El proceso ha fallado';
    }
    $objPHPExcel = PHPExcel_IOFactory::load($archivo); //Cargamos la hoja de cálculo
    $objPHPExcel->setActiveSheetIndex(0); //Asignamos la hoja de calculo activa 1
    $numRows = $objPHPExcel->setActiveSheetIndex(0)->getHighestRow(); //Obtener el numero de filas del archivo    
    $bandera = true; //Bandera que nos ayuda a identificar si se realizó el proceso con éxito
    if ($numRows > 1) {//Si la primera hoja tiene filas comenzamos con la extraccion de datos
        for ($i = 2; $i <= $numRows; $i++) {
            $estacion = new EstacionHidrometrica();
            $estacion->setIdEstacion($objPHPExcel->getActiveSheet()->getCell('A' . $i)->getValue());
            $estacion->setNombre($objPHPExcel->getActiveSheet()->getCell('B' . $i)->getValue());
            $estacion->setCorriente($objPHPExcel->getActiveSheet()->getCell('C' . $i)->getValue());
            $estacion->setCuenca_id($objPHPExcel->getActiveSheet()->getCell('D' . $i)->getValue());
            $estacion->setEstado_id($objPHPExcel->getActiveSheet()->getCell('E' . $i)->getValue());
            $estacion->setRegion_id($objPHPExcel->getActiveSheet()->getCell('F' . $i)->getValue());
            $estacion->setLatitud($objPHPExcel->getActiveSheet()->getCell('G' . $i)->getValue());
            $estacion->setLongitud($objPHPExcel->getActiveSheet()->getCell('H' . $i)->getValue());
            $resultado = validarCamposEstacionHidrometrica($estacion, $i);
            if ($resultado != null) { //Se validan campos
                echo $resultado;
                $bandera = false;
                break;
            } else {
                if ($estacion->existeRegistro() == 0) {//Se verifica si se va insertar o actualizar
                    if ($estacion->Insert() != 1) {//Se inserta
                        echo "Se encontró registro de la Unidad de Riego con ID: " . $estacion->getIdEstacion() . " pero no se pudo insertar, verifica el registro " . $i . ".";
                        $bandera = false;
                        break;
                    }
                } else {
                    if ($estacion->Update() != 1) {//Se actualiza
                        echo "Se encontró registro de la Unidad de Riego con ID: " . $estacion->getIdEstacion() . " pero no se pudo actualizar, verifica el registro " . $i . ".";
                        $bandera = false;
                        break;
                    }
                }
            }
        }
    } else {
        echo 'Tu archivo en Excel está vacío.';
        unlink("Formato_EstacionesHidrometricas.xlsx");
    }
    //Se realizó con exito la operación
    if ($bandera) {
        unlink("Formato_EstacionesHidrometricas.xlsx");
        echo 'OK';
    }
}

function buscarIDMunicipio($estado, $municipio, $i) {
    $Estado = new Estado();
    $Municipio = new Municipio();
    $estado_id = $Estado->getEstado($estado); //Extraer el Id del estado
    if ($estado_id['id_estado'] == null) {
        return "Al parecer el estado " . $estado . " de la línea " . $i . " no es válido, por favor verifica como debe de estar escrito.";
    } else {
        $municipio_id = $Municipio->getMunicipio($estado_id['id_estado'], $municipio);
        if ($municipio_id['id_municipio'] == null) {
            return "Al parecer el municipio " . $municipio . " de  la línea " . $i . " no es válido, por favor verifica como está registrado en la base de datos.";
        } else {
            return $municipio_id['id_municipio']; //Colocamos los datos a la instancia
        }
    }
}

function validarCamposMarginacion($registroMarginacion, $i) {
    if (strlen($registroMarginacion->getPob_tot()) == null || strlen($registroMarginacion->getAnalf()) == null || strlen($registroMarginacion->getSprim()) == null || strlen($registroMarginacion->getOvsde()) == null ||
            strlen($registroMarginacion->getOvsee()) == null || strlen($registroMarginacion->getOvsae()) == null || strlen($registroMarginacion->getVhac()) == null || strlen($registroMarginacion->getOvpt()) == null ||
            strlen($registroMarginacion->getPl_5000()) == null || strlen($registroMarginacion->getPo2sm()) == null || strlen($registroMarginacion->getIm()) == null || strlen($registroMarginacion->getGm()) == null ||
            strlen($registroMarginacion->getGm()) == null || strlen($registroMarginacion->getAnio_id()) == null) {
        return "Al parecer hay campos vacíos en la línea " . $i . ".";
    }
    if (is_numeric($registroMarginacion->getPob_tot()) == null || is_numeric($registroMarginacion->getAnalf()) == null || is_numeric($registroMarginacion->getSprim()) == null ||
            is_numeric($registroMarginacion->getOvsde()) == null || is_numeric($registroMarginacion->getOvsee()) == null || is_numeric($registroMarginacion->getOvsae()) == null ||
            is_numeric($registroMarginacion->getVhac()) == null || is_numeric($registroMarginacion->getOvpt()) == null || is_numeric($registroMarginacion->getPl_5000()) == null ||
            is_numeric($registroMarginacion->getPo2sm()) == null || is_numeric($registroMarginacion->getIm()) == null || is_numeric($registroMarginacion->getAnio_id()) == null) { //Verifica si los campos si son numericos
        return "Los datos Pob_tot, Analf, Sprim, Ovsde, Ovsee, Ovsae, Vhac, Ovpt, Pl_5000, Po2sm, IM y Año deben ser numéricos, verifica la línea " . $i . ".";
    }
    if (is_numeric($registroMarginacion->getIm()) == null) { //Verifica si los campos si son numericos
        return "El campo GM no debe de ser un número, verifica la línea " . $i . ".";
    }
    //Se busca el año en la base de datos
    $resultado = buscarAnio($registroMarginacion->getAnio_id());
    if ($resultado == null) {
        return "El año " . $registroMarginacion->getAnio_id() . " de la línea " . $i . " no está en la base de datos, por favor registralo.";
    } else {
        $registroMarginacion->setAnio_id($resultado);
    }
    $estado = new Estado();
    $resultado = $estado->getEstado($registroMarginacion->getEstado_id());

    if ($resultado == null) {
        return "El estado " . $registroMarginacion->getEstado_id() . " de la línea " . $i . " no está en la base de datos, por favor verifica como está registrado en la base de datos.";
    } else {
        $registroMarginacion->setEstado_id($resultado[0]);
    }
    return null;
}

function validarCamposEstacionClimatologica($estacionClimatologica, $i) {
    if (strlen($estacionClimatologica->getIdEstacionClimatologica()) == null || strlen($estacionClimatologica->getNombre()) == null || strlen($estacionClimatologica->getCuenca_id()) == null || strlen($estacionClimatologica->getSubcuenca_id()) == null || strlen($estacionClimatologica->getTipo()) == null || strlen($estacionClimatologica->getOrganismo_id()) == null || strlen($estacionClimatologica->getFechafin()) == null || strlen($estacionClimatologica->getSituacion()) == null || strlen($estacionClimatologica->getLatitud()) == null || strlen($estacionClimatologica->getLongitud()) == null || strlen($estacionClimatologica->getAltura()) == null) {
        return "Los campos CLAVE,CLAVE_OMM,NOMBRE,CUENCA,SUBCUENCA,TIPO_EST,ORGANISMO,FIN,SITUACION,LATITUD,LONGITUD y ALTURA son obligatorios, por favor verifica la línea " . $i . ".";
    }
    if (is_numeric($estacionClimatologica->getIdEstacionClimatologica()) == null || is_numeric($estacionClimatologica->getLatitud()) == null || is_numeric($estacionClimatologica->getLongitud()) == null || is_numeric($estacionClimatologica->getAltura()) == null) { //Verifica si los campos si son numericos
        return "Los campos CLAVE,CLAVE_OMM,LATITUD,LONGITUD y ALTURA deben de ser númericos, verifica la linea " . $i . ".";
    }
    //Se busca la cuenca
    $resultado = buscarCuenca($estacionClimatologica->getCuenca_id());
    if ($resultado == null) {
        return "La cuenca " . $estacionClimatologica->getCuenca_id() . " de la línea " . $i . " no está en la base de datos, por favor registrala.";
    } else {
        $estacionClimatologica->setCuenca_id($resultado);
    }
    //Se busca la subcuenca
    $resultado = buscarSubcuenca($estacionClimatologica->getSubcuenca_id());
    if ($resultado == null) {
        return "La subcuenca " . $estacionClimatologica->getSubcuenca_id() . " de la línea " . $i . " no está en la base de datos, por favor registrala.";
    } else {
        $estacionClimatologica->setSubcuenca_id($resultado);
    }
    if (strcasecmp($estacionClimatologica->getTipo(), 'OBSERVATORIO') == 0) {
        $estacionClimatologica->setTipo(1);
    } else if (strcasecmp($estacionClimatologica->getTipo(), 'CLIMATOLOGICA') == 0) {
        $estacionClimatologica->setTipo(2);
    } else {
        return "Solo de permiten dos tipos de situaciones, operando o suspendida , por favor revisa la línea " . $i . ".";
    }

    $resultado = buscarOrganismoClimatologico($estacionClimatologica->getOrganismo_id());
    if ($resultado == null) {
        return "El organismo " . $estacionClimatologica->getOrganismo_id() . " de la línea " . $i . " no está en la base de datos, por favor verifica como está registrado en la base de datos.";
    } else {
        $estacionClimatologica->setOrganismo_id($resultado);
    }
    if (strcasecmp($estacionClimatologica->getSituacion(), 'OPERANDO') == 0) {
        $estacionClimatologica->setSituacion(1);
    } else if (strcasecmp($estacionClimatologica->getSituacion(), 'SUSPENDIDA') == 0) {
        $estacionClimatologica->setSituacion(0);
    } else {
        return "Solo de permiten dos tipos de situaciones, operando o suspendida , por favor revisa la línea " . $i . ".";
    }

    return null;
}

function validarCamposEstacionHidrometrica($estacionHidrometrica, $i) {

    if (strlen($estacionHidrometrica->getIdDtt()) == null || strlen($estacionHidrometrica->getNombre()) == null || strlen($estacionHidrometrica->getCuenca_id()) == null || strlen($estacionHidrometrica->getCorriente()) == null || strlen($estacionHidrometrica->getLatitud()) == null || strlen($estacionHidrometrica->getLongitud()) == null || strlen($estacionHidrometrica->getRegion_id()) == null || strlen($estacionHidrometrica->getEstado_id()) == null) {
        return "Todos los campos son obligatorios, por favor verifica la línea " . $i . ".";
    }
    if (is_numeric($estacionHidrometrica->getIdDtt()) == null || is_numeric($estacionHidrometrica->getLatitud()) == null || is_numeric($estacionHidrometrica->getLongitud()) == null) { //Verifica si los campos si son numericos
        return "Los campos CLAVE,LATITUD y LONGITUD deben de ser númericos, verifica la linea " . $i . ".";
    }
    //Se busca la cuenca
    $resultado = buscarCuenca($estacionHidrometrica->getCuenca_id());
    if ($resultado == null) {
        return "La cuenca " . $estacionHidrometrica->getCuenca_id() . " de la línea " . $i . " no está en la base de datos, por favor registrala.";
    } else {
        $estacionHidrometrica->setCuenca_id($resultado);
    }
    $resultado = buscarRegion($estacionHidrometrica->getRegion_id());
    if ($resultado == null) {
        return "La Región Hidrológica " . $estacionHidrometrica->getRegion_id() . " de la línea " . $i . " no está en la base de datos, por favor verifica como está registrada en la base de datos.";
    } else {
        $estacionHidrometrica->setRegion_id($resultado);
    }

    $resultado = buscarEstado($estacionHidrometrica->getEstado_id());
    if ($resultado == null) {
        return "El estado " . $estacionHidrometrica->getEstado_id() . " de la línea " . $i . " no está en la base de datos, por favor verifica como está registrado en la base de datos.";
    } else {
        $estacionHidrometrica->setEstado_id($resultado);
    }

    return null;
}

//Función que valida si un numero es entero
function isInteger($input) {
    return (ctype_digit(strval($input)));
}

//Funcion que envia un año agricola a consulta al modelo AnioAgricola
function buscarAnioAgricola($anioAgricola) {
    $anio = new Anio();
    $anio->setAnioAgricola($anioAgricola);
    $resultado = $anio->getAnio();
    if (strlen($resultado['id_anioagricola']) == null) {
        return null;
    } else {
        return $resultado['id_anioagricola'];
    }
}

function buscarEstado($estado) {
    $nEstado = new Estado();
    $resultado = $nEstado->getEstado($estado);
    if (strlen($resultado[0]) == null) {
        return null;
    } else {
        return $resultado[0];
    }
}

//Funcion que envia el nombre de una región hidrológica a consulta al modelo Región para obtener el ID
function buscarRegion($nombre) {
    $region = new RegionHidrologica();
    $id_region = $region->getRegion($nombre);
    if (strlen($id_region) == null) {
        return null;
    } else {
        return $id_region;
    }
}

//Funcion que envia el ID de un DR a consulta al modelo DistritoRiego
function buscarDistritoRiego($distrito) {
    $dr = new DistritoRiego();
    $resultado = $dr->getDR($distrito);
    if (strlen($resultado->getIdDistritoRiego()) == null) {
        return null;
    } else {
        return $resultado->getIdDistritoRiego();
    }
}

//Funcion que envia el ID de un DTT a consulta al modelo DTT
function buscarDTT($clave) {
    $dr = new DTT();
    $resultado = $dr->getDTT($clave);
    if (strlen($resultado->getIdDtt()) == null) {
        return null;
    } else {
        return $resultado->getIdDtt();
    }
}


//Funcion que envia un año cultivo a consulta al modelo Cultivo
function buscarCultivo($nombreCultivo) {
    $cultivo = new Cultivo();
    $cultivo->setNombre($nombreCultivo);
    $resultado = $cultivo->buscarCultivo();
    if (strlen($resultado['id_cultivo']) == null) {
        return null;
    } else {
        return $resultado['id_cultivo'];
    }
}

//Funcion que envia un ciclo a consulta al modelo Ciclo
function buscarCiclo($nombreCultivo) {
    $cultivo = new Ciclo();
    $cultivo->setNombre($nombreCultivo);
    $resultado = $cultivo->buscarCiclo();
    if (strlen($resultado['id_ciclo']) == null) {
        return null;
    } else {
        return $resultado['id_ciclo'];
    }
}

//Funcion que envia una tenencia a consulta al modelo Tenencia
function buscarTenencia($nombreTenencia) {
    $tenencia = new Tenencia();
    $tenencia->setNombre($nombreTenencia);
    $resultado = $tenencia->buscarTenencia();
    if (strlen($resultado['id_tenencia']) == null) {
        return null;
    } else {
        return $resultado['id_tenencia'];
    }
}

//Funcion que envia una fuente a consulta al modelo Tenencia
function buscarFuente($nombreFuente) {
    $fuente = new Fuente();
    $fuente->setNombre($nombreFuente);
    $resultado = $fuente->buscarFuente();
    if (strlen($resultado['id_fuente']) == null) {
        return null;
    } else {
        return $resultado['id_fuente'];
    }
}



function buscarPresa($nombre) {
    $presa = new Presa();
    $resultado = $presa->getPresaNombre($presa);
    if (strlen($resultado['id_presa']) == null) {
        return null;
    } else {
        return $resultado['id_presa'];
    }
}



function buscarCuenca($nombreCuenca) {
    $cuenca = new Cuenca();
    $resultado = $cuenca->getCuencaNombre($nombreCuenca);
    if (strlen($resultado['id_cuenca']) == null) {
        return null;
    } else {
        return $resultado['id_cuenca'];
    }
}

function buscarSubcuenca($nombreSubcuenca) {
    $cuenca = new Cuenca();
    $resultado = $cuenca->getSubCuencaNombre($nombreSubcuenca);
    if (strlen($resultado['id_subcuenca']) == null) {
        return null;
    } else {
        return $resultado['id_subcuenca'];
    }
}

function buscarOrganismoClimatologico($nombreOrganismo) {
    $organismo = new OrganismoClimatologico();
    $resultado = $organismo->getIdOrganismoClimatologicoNombre($nombreOrganismo);
    if (strlen($resultado[0]) == null) {
        return null;
    } else {
        return $resultado[0];
    }
}

//Funcion que envia un año a consulta al modelo Anio
function buscarAnio($anioB)
{
    $anio = new Anio();
    $resultado = $anio->getAnnio($anioB);
    if (strlen($resultado['id_anio']) == null)
    {
        return null;
    }
    else
    {
        return $resultado['id_anio'];
    }
}

