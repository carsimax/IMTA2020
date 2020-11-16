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
if (!defined(__DIR__ . "/../modelo/acuiferohidro.php"))
{
    require(__DIR__ . "/../modelo/acuiferohidro.php");
    define(__DIR__ . "/../modelo/acuiferohidro.php", 1);
}
if (!defined(__DIR__ . "/../modelo/acuiferomun.php"))
{
    require(__DIR__ . "/../modelo/acuiferomun.php");
    define(__DIR__ . "/../modelo/acuiferomun.php", 1);
}
if (!defined(__DIR__ . "/../modelo/acuiferopob.php"))
{
    require(__DIR__ . "/../modelo/acuiferopob.php");
    define(__DIR__ . "/../modelo/acuiferopob.php", 1);
}
if (!defined(__DIR__ . "/../modelo/acuiferocuenca.php"))
{
    require(__DIR__ . "/../modelo/acuiferocuenca.php");
    define(__DIR__ . "/../modelo/acuiferocuenca.php", 1);
}
if (!defined(__DIR__ . "/../modelo/acuiferototal.php"))
{
    require(__DIR__ . "/../modelo/acuiferototal.php");
    define(__DIR__ . "/../modelo/acuiferototal.php", 1);
}
if (!defined(__DIR__ . "/../modelo/estado.php"))
{
    require(__DIR__ . "/../modelo/estado.php");
    define(__DIR__ . "/../modelo/estado.php", 1);
}

if (!defined(__DIR__ . "/../modelo/acuifero.php"))
{
    require(__DIR__ . "/../modelo/acuifero.php");
    define(__DIR__ . "/../modelo/acuifero.php", 1);
}

if (!defined(__DIR__ . "/../modelo/acuiferodisp.php"))
{
    require(__DIR__ . "/../modelo/acuiferodisp.php");
    define(__DIR__ . "/../modelo/acuiferodisp.php", 1);
}

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
    //Si es el caso de actualizar un registro.
    case 'Update':
        try {
            update();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    //Si es el caso de actualizar la disponibilidad de un acuífero
    case 'UpdateDisponibilidad':
        try {
            UpdateDisponibilidad();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    //Si es el caso de actualizar la Información hidrogeológica  de un acuífero .
    case 'UpdateHidro':
        try {
            UpdateHidro();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    //Esta es la opcion para realizar la actualizacion de un municipio del acuifero.
    case 'UpdateMun':
        try {
            UpdateMun();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    //Esta es la opcion para realizar la actualizacion de la informacion poblacional del acuifero.
    case 'UpdatePoblacion':
        try {
            UpdatePoblacion();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    //Esta es la opcion para actualizar la informacion de la cuenca del acuifero.
    case 'UpdateCuenca':
        try {
            UpdateCuenca();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    //Esta es la opcion para actualizar la informacion de los usuarios totales que utilizan el acuifero.
    case 'UpdateTotal':
        try {
            UpdateTotal();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    //Esta es la opcion para realizar un nuevo registro en acuiferos
    case 'Nuevo':
        try {
            Nuevo();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    //esta es la opcion para crear una relacion entre un municipio y un acuifero.
    case 'NuevoMun':
        try {
            NuevoMun();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    //Esta es la opcion para realizar la eliminacion de un acuifero en la base de datos
    case 'DeleteACU':
        try {
            DeleteACU();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    //Esta es la opcion para eliminar una relacion entre un municipio y un acuifero
    case 'DeleteMUN':
        try {
            DeleteMUN();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    //si se quiere subir desde excel
    case 'Excel':
        try {
            Excel();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Todos':
        try {
            getAcuiferos();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'TodosMun':
        try {
            getMunicipios();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Acuifero':
        try {
            getAcuifero();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

/**
 * Esta es la función que actualiza la información de un acuífero
 * @return bool
 */
function update()
{
    try {
        /**
         * Se crea una instacia al modelo de acuifero.
         */
        $Acu = new Acuifero;
        /**
         * Colocamos los datos recibidos por GET por medio de los metodos SET del objeto Acuifero.
         */
        $Acu->setIDAcuifero(filter_input(INPUT_GET, "ID_Acuifero"));
        $Acu->setEstadoID(filter_input(INPUT_GET, "Estado_ID"));
        $Acu->setNombre(filter_input(INPUT_GET, "Nombre_Acuifero"));
        $Acu->setFechaDOF(filter_input(INPUT_GET, "Fecha_DOF"));
        $Acu->setFechaREPDA(filter_input(INPUT_GET, "Fecha_REPDA"));
        $Acu->setLongitud(filter_input(INPUT_GET, "Longitud"));
        $Acu->setLatitud(filter_input(INPUT_GET, "Latitud"));
        $Acu->setArea(filter_input(INPUT_GET, "Area"));
        /**
         * Se manda a llamar a la funcion de actualizar que esta dentro de los metodos del objeto acuifero.
         */
        echo $Acu->update();
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
        return false;
    }
}

/**
 * Esta es la función que actualiza la disponibilidad de un acuífero
 * @return bool
 */
function UpdateDisponibilidad()
{
    try {
        /**
         * Se crea la instancia a un objeto del modelo de AcuiferoDisp
         */
        $Acu = new AcuiferoDisp;
        /**
         * Colocamos los datos recibidos por medio del POST con los metodos SET del objeto creado.
         */
        $Acu->setAcuiferoId(filter_input(INPUT_GET, "Acuifero_ID"));
        $Acu->setR(filter_input(INPUT_GET, "R"));
        $Acu->setDnc(filter_input(INPUT_GET, "DNC"));
        $Acu->setVcas(filter_input(INPUT_GET, "VCAS"));
        $Acu->setVeala(filter_input(INPUT_GET, "VEALA"));
        $Acu->setVaptyr(filter_input(INPUT_GET, "VAPTYR"));
        $Acu->setVaprh(filter_input(INPUT_GET, "VAPRH"));
        $Acu->setDma(filter_input(INPUT_GET, "DMA"));
        $Acu->setAnioActualizacion(filter_input(INPUT_GET, "Anio_Actualizacion"));
        /**
         * Se manda a llamar a la funcion de update que esta alojado en el modelo.
         */
        echo $Acu->update();
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
        return false;
    }
}

/**
 * Esta es la función que actualiza la informacion hidrologica de un acuífero
 * @return bool
 */
function UpdateHidro()
{
    try {
        /**
         * Hacemos una nueva instancia al modelo de AcuiferoHidro
         */
        $Acu = new AcuiferoHidro;
        /**
         * Colocamos los datos recibidos por GET por medio de los metodos SET del objeto
         */
        $Acu->setAcuiferoId(filter_input(INPUT_GET, "Acuifero_ID"));
        $Acu->setPNestaticoMin(filter_input(INPUT_GET, "pNEstaticoMin"));
        $Acu->setPNestaticomax(filter_input(INPUT_GET, "pNEstaticoMax"));
        $Acu->setPNdinamicomin(filter_input(INPUT_GET, "pNDinamicoMin"));
        $Acu->setPNdinamicomax(filter_input(INPUT_GET, "pNDinamicoMax"));
        /**
         * Mandamos a llamar a la funcion de update del objeto.
         */
        echo $Acu->update();
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
        return false;
    }
}

/**
 * Funcion para acutalizar el municipio de un acuifero
 * @return bool
 */
function UpdateMun()
{
    try {
        /**
         * Se crea una nueva instancia al modelo de AcuiferoMun
         */
        $Acu = new AcuiferoMun;
        /**
         * Colocamos los datos del GET a por medio de los metodos SET
         */
        $Acu->setAcuiferoID(filter_input(INPUT_GET, "Acuifero_ID"));
        $Acu->setMunicipioID(filter_input(INPUT_GET, "Municipio_ID"));
        echo $Acu->update(filter_input(INPUT_GET, "OLD_ID"));
    } catch (Exception $exc) {
        /**
         * Se manda a llamar a la funcion update.
         */
        echo $exc->getTraceAsString();
        return false;
    }
}

/**
 * Funcion para actualizar la informacion de la poblacion del acuifero.
 * @return bool
 */
function UpdatePoblacion()
{
    try {
        /**
         * Creamo la instancia la objeto de AcuiferoPob
         */
        $Acu = new AcuiferoPob;
        /**
         * Colocamos los datos del GET por medio de los metodos SET del objeto.
         */
        $Acu->setAcuiferoId(filter_input(INPUT_GET, "Acuifero_ID"));
        $Acu->setNumHabitantes(filter_input(INPUT_GET, "Num_Habitantes"));
        $Acu->setNumHabitantesRural(filter_input(INPUT_GET, "Num_Habitantes_Rural"));
        $Acu->setRumHabitantesUrbana(filter_input(INPUT_GET, "Num_Habitantes_Urbana"));
        /**
         * Se manda a llamar a la funcion update del objeto.
         */
        echo $Acu->update();
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
        return false;
    }
}

/**
 * @return bool
 * Funcion para actualizar la informacion de la cuenca de un acuifero.
 */
function UpdateCuenca()
{
    try {
        /**
         * Se realiza una nueva instancia al objeto de AcuiferoCuenca
         */
        $Acu = new AcuiferoCuenca;
        /**
         * Colocamos los datos del GET por medio de los metodos SET
         */
        $Acu->setAcuiferoId(filter_input(INPUT_GET, "Acuifero_ID"));
        $Acu->setCuencaId(filter_input(INPUT_GET, "Cuenca_ID"));
        $Acu->setSubcuenca(filter_input(INPUT_GET, "Sub_Cuenca"));
        /**
         * Se manda a llamar la funcion update
         */
        echo $Acu->update();
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
        return false;
    }
}

/**
 * @return bool
 * Funcion para actualizar la informacion del total de usuarios del acuifero
 */
function UpdateTotal()
{
    try {
        /**
         * Se crea la nueva instancia ala objeto de AcuiferoTotal
         */
        $Acu = new AcuiferoTotal;
        /**
         * Colocamos los datos del GET por medio de los metodos SET
         */
        $Acu->setAcuiferoId(filter_input(INPUT_GET, "Acuifero_ID"));
        $Acu->setEjidales(filter_input(INPUT_GET, "Ejidales"));
        $Acu->setPequenosPropietarios(filter_input(INPUT_GET, "Pequenos_Propietarios"));
        $Acu->setVolumenAnual(filter_input(INPUT_GET, "Volumen_Anual"));
        $Acu->setTotalUsuario(filter_input(INPUT_GET, "Total_Usuario"));
        /**
         * Se manda a llamar a la funcion update.
         */
        echo $Acu->update();
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
        return false;
    }
}

/**
 * Funcion para eliminar un municipio del acuifero
 */
function DeleteMUN()
{
    /**
     * Se crea la instancia al objeto AcuiferoMun
     */
    $NMun = new AcuiferoMun;
    /**
     * Se obtienen los datos del GET por medio de los metodos SET
     */
    $NMun->setAcuiferoID(filter_input(INPUT_GET, "Acuifero_ID"));
    $NMun->setMunicipioID(filter_input(INPUT_GET, "Municipio_ID"));
    /**
     * Mandamos a llamar a la funcion delete.
     */
    echo $NMun->delete();
}

/**
 * Funcion para crear una relacion entre el municipio y el acuifero.
 */
function NuevoMun()
{
    /**
     * Se crea una instancia de AcuiferoMun
     */
    $NMun = new AcuiferoMun;
    /**
     * Se colocan los datos del POST por medio de los metodos SET del objeto.
     */
    $NMun->setAcuiferoID(filter_input(INPUT_GET, "Acuifero_ID"));
    $NMun->setMunicipioID(filter_input(INPUT_GET, "Municipio_ID"));
    /*
     * Se manda a llamar a la funcion para insertar un nuevo registro.
     */
    echo $NMun->Insert();
}

/**
 * Funcion para realizar un nuevo registro de un acuifero en la base de datos.
 */
function Nuevo()
{
    /**
     * En esta parte se realizan las instancias a los objetos que vamos a utilizar en el registro.
     */
    $NAcuifero = new Acuifero;
    $NDisp = new AcuiferoDisp;
    $NHidro = new AcuiferoHidro;
    $NPoblacion = new AcuiferoPob;
    $NCuenca = new AcuiferoCuenca;
    $Ntotal = new AcuiferoTotal;
    /**
     * Colocamos los datos del Acuifero recibidos por el GET por medio de los metodos SET del objeto.
     */
    $NAcuifero->setIdAcuifero(filter_input(INPUT_GET, "ID_Acuifero"));
    $NAcuifero->setEstadoId(filter_input(INPUT_GET, "Estado_ID"));
    $NAcuifero->setNombre(filter_input(INPUT_GET, "Nombre_Acuifero"));
    $NAcuifero->setFechaDof(filter_input(INPUT_GET, "Fecha_DOF"));
    $NAcuifero->setFechaRepda(filter_input(INPUT_GET, "Fecha_REPDA"));
    $NAcuifero->setLatitud(filter_input(INPUT_GET, "Latitud"));
    $NAcuifero->setLongitud(filter_input(INPUT_GET, "Longitud"));
    $NAcuifero->setArea(filter_input(INPUT_GET, "area"));
    /**
     * Si se realizo la insercion del acuifero correctamente se continua con el resto de tablas
     */
    if ($NAcuifero->Insert() == 1)
    {
        /**
         * Colocamos los datos de la disponibilidad del acuifero recibidos por el
         * GET por medio de los metodos SET del objeto.
         */
        $NDisp->setAcuiferoId(filter_input(INPUT_GET, "ID_Acuifero"));
        $NDisp->setR(filter_input(INPUT_GET, "R"));
        $NDisp->setDnc(filter_input(INPUT_GET, "DNC"));
        $NDisp->setVcas(filter_input(INPUT_GET, "VCAS"));
        $NDisp->setVeala(filter_input(INPUT_GET, "VEALA"));
        $NDisp->setVaptyr(filter_input(INPUT_GET, "VAPTYR"));
        $NDisp->setVaprh(filter_input(INPUT_GET, "VAPRH"));
        $NDisp->setDma(filter_input(INPUT_GET, "DMA"));
        $NDisp->setAnioActualizacion(filter_input(INPUT_GET, "Anio_Actualizacion"));
        /**
         * Se manda a llamar la funcion insertar.
         */
        if ($NDisp->Insert() == 1)
        {
            /**
             * Colocamos los datos hidrogeologicos del acuifero recibidos por el
             * GET por medio de los metodos SET del objeto.
             */
            $NHidro->setAcuiferoId(filter_input(INPUT_GET, "ID_Acuifero"));
            $NHidro->setPNestaticoMin(filter_input(INPUT_GET, "pNEstaticoMin"));
            $NHidro->setPNestaticomax(filter_input(INPUT_GET, "pNEstaticoMax"));
            $NHidro->setPNdinamicomin(filter_input(INPUT_GET, "pNDinamicoMin"));
            $NHidro->setPNdinamicomax(filter_input(INPUT_GET, "pNDinamicoMax"));
            /**
             * Se manda a llamar a la funcion insertar
             */
            if ($NHidro->Insert() == 1)
            {
                /**
                 * Colocamos los datos de la poblacion del acuifero recibidos por el
                 * GET por medio de los metodos SET del objeto.
                 */
                $NPoblacion->setAcuiferoId(filter_input(INPUT_GET, "ID_Acuifero"));
                $NPoblacion->setNumHabitantes(filter_input(INPUT_GET, "Num_Habitantes"));
                $NPoblacion->setNumHabitantesRural(filter_input(INPUT_GET, "Num_Habitantes_Rural"));
                $NPoblacion->setRumHabitantesUrbana(filter_input(INPUT_GET, "Num_Habitantes_Urbana"));
                /**
                 * Se llama a la funcion insertar
                 */
                if ($NPoblacion->Insert() == 1)
                {
                    /**
                     * Colocamos los datos dela cuenca del acuifero recibidos por el
                     * GET por medio de los metodos SET del objeto.
                     */
                    $NCuenca->setAcuiferoId(filter_input(INPUT_GET, "ID_Acuifero"));
                    $NCuenca->setCuencaId(filter_input(INPUT_GET, "Cuenca_ID"));
                    $NCuenca->setSubcuenca(filter_input(INPUT_GET, "Sub_Cuenca"));
                    /**
                     * Se manda a llamar a la funcion insertar
                     */
                    if ($NCuenca->Insert() == 1)
                    {
                        /**
                         * Colocamos los datos del total de usuarios del Acuifero recibidos por el
                         * GET por medio de los metodos SET del objeto.
                         */
                        $Ntotal->setAcuiferoId(filter_input(INPUT_GET, "ID_Acuifero"));
                        $Ntotal->setEjidales(filter_input(INPUT_GET, "Ejidales"));
                        $Ntotal->setPequenosPropietarios(filter_input(INPUT_GET, "Pequenos_Propietarios"));
                        $Ntotal->setVolumenAnual(filter_input(INPUT_GET, "Volumen_Anual"));
                        $Ntotal->setTotalUsuario(filter_input(INPUT_GET, "Total_Usuario"));
                        /**
                         * se manda a llamar a la funcion inertar
                         */
                        if ($Ntotal->Insert() == 1)
                        {
                            //Se retorna un mensaje del estatus de la operacion
                            echo 'OK';
                        }
                        else
                        {
                            $NAcuifero->delete();
                            echo 'Verifica los datos de la información de total';
                        }
                    }
                    else
                    {
                        $NAcuifero->delete();
                        echo 'Verifica los datos de la información de cuenca';
                    }
                }
                else
                {
                    $NAcuifero->delete();
                    echo 'Verifica los datos de la información de población';
                }
            }
            else
            {
                $NAcuifero->delete();
                echo 'Verifica los datos de la información hidrogeológica';
            }
        }
        else
        {
            $NAcuifero->delete();
            echo 'Verifica los datos de disponibilidad';
        }
    }
    else
    {
        //Si el acuifero ya esta registrado, se retorna un mensaje de error.
        echo 'Ya se encuentra en la Base de Datos';
    }
}

/**
 * Funcion para Eliminar un acuifero
 */
function DeleteACU()
{
    /**
     * Se crea una instanica a acuifero
     */
    $NAcuifero = new Acuifero;
    /**
     * Se coloca el Id del acuifero a eliminar por medio del metodo SET
     */
    $NAcuifero->setIdAcuifero(filter_input(INPUT_GET, "ID"));
    /**
     * Se manda a llamar a la funcion de eliminar.
     */
    echo $NAcuifero->delete();
}

function getAcuiferos()
{
    $Acuifero = new Acuifero();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Acuifero->getTodos(filter_input(INPUT_POST, "query")));
}

function getAcuifero()
{
    $Acuifero = new Acuifero();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Acuifero->getAcuiferoSIG(filter_input(INPUT_POST, "query")));
}

function getMunicipios()
{
    $Acuifero = new AcuiferoMun();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Acuifero->getTodos(filter_input(INPUT_POST, "ID")));
}
