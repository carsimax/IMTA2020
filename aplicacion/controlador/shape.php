<!---Esta es la parte del estilo-->
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Procesando la información</title>
        <link href="../../estilo/css/bootstrap.css" rel="stylesheet">
        <link href="../../estilo/css/loader.css" rel="stylesheet">
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700,600,300' rel='stylesheet' type='text/css'>
        <link href='https://www.gob.mx/cms/uploads/image/file/488329/favicon.png' rel='shortcut icon'>
        <script src="../../estilo/js/jquery.js"></script>
        <script src="../../estilo/js/bootstrap.js"></script>
        <script src="../../estilo/js/sweetalert.js"></script>
    </head>
    <body>
        <div class="container">
            <div class="item-1"></div>
            <div class="item-2"></div>
            <div class="item-3"></div>
            <div class="item-4"></div>
            <div class="item-5"></div>
        </div>
    </body>
</html>
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
    /**
     * Funcion para importar shape de acuifero
     */
    case 'Acu':
        try {
            Acu();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Presa':
        try {
            Presa();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

/**
 * Funcion para importar shape de acuifero
 */
function Acu()
{
    /**
     * Recibimos el archivo shape
     */
    $archivoRecibido = $_FILES["shape"]["tmp_name"];
    $nombre = "Acuifero_id_acuif_" . filter_input(INPUT_POST, "id_acuifero");
    $archivo = $nombre . ".zip";
    /**
     * Movemos al directorio
     */
    if (!move_uploaded_file($archivoRecibido, $archivo))
    {
        echo 'EL proceso ha fallado';
    }
    /**
     * Leemos el zip
     */
    $zip = zip_open($archivo);
    $a = array();
    if ($zip)
    {
        /**
         * la función zip_read sirve para leer el contenido de nuestro archivo ZIP
         */
        while ($zip_entry = zip_read($zip))
        {
            array_push($a, zip_entry_name($zip_entry));
        }
    }
    /**
     * Cerramos el zip
     */
    $zip = zip_close($archivo);
    /**
     * Verificar que contenga todos los archivos
     * DBF
     */
    if (($nombre . ".dbf") == $a[0])
    {
        /**
         * PRJ
         */
        if (($nombre . ".prj") == $a[1])
        {
            /**
             * qpj
             */
            if (($nombre . ".qpj") == $a[2])
            {
                /**
                 * shp
                 */
                if (($nombre . ".shp") == $a[3])
                {
                    /**
                     * shx
                     */
                    if (($nombre . ".shx") == $a[4])
                    {
                        /**
                         * Si los archivos dentro del zip estan correctos
                         */
                        $nombre_fichero = "/../../sig/acuiferos/" . $archivo;
                        /**
                         * Se buscara si el archivo existe en el directorio
                         */
                        if (copy($archivo, __DIR__ . $nombre_fichero))
                        {
                            echo '<script type="text/javascript">alert("Importación Exitosa");</script>';
                            echo "<script type='text/javascript'>";
                            echo "window.location.href ='/aplicacion/vista/crud/dbadmin.php'";
                            echo "</script>";
                            unlink($archivo);
                        }
                        else
                        {
                            unlink($archivo);
                            err("Se ha producido un error al intentar copiar el fichero");
                        }
                    }
                    else
                    {
                        unlink($archivo);
                        err("Falta el archivo .shx");
                    }
                }
                else
                {
                    unlink($archivo);
                    err("Falta el archivo .shp");
                }
            }
            else
            {
                unlink($archivo);
                err("Falta el archivo .qpj");
            }
        }
        else
        {
            unlink($archivo);
            err("Falta el archivo .prj");
        }
    }
    else
    {
        unlink($archivo);
        err("Falta el archivo .dbf");
    }
}

/**
 * Funcion para importar shape de acuifero
 */
function Presa()
{
    /**
     * Recibimos el archivo shape
     */
    $archivoRecibido = $_FILES["shape"]["tmp_name"];
    $nombre = "Presa_id_presa_" . filter_input(INPUT_POST, "id_presa");
    $archivo = $nombre . ".zip";
    /**
     * Movemos al directorio
     */
    if (!move_uploaded_file($archivoRecibido, $archivo))
    {
        echo 'EL proceso ha fallado';
    }
    /**
     * Leemos el zip
     */
    $zip = zip_open($archivo);
    $a = array();
    if ($zip)
    {
        /**
         * la función zip_read sirve para leer el contenido de nuestro archivo ZIP
         */
        while ($zip_entry = zip_read($zip))
        {
            array_push($a, zip_entry_name($zip_entry));
        }
    }
    /**
     * Cerramos el zip
     */
    $zip = zip_close($archivo);
    /**
     * Verificar que contenga todos los archivos
     * DBF
     */
    if (($nombre . ".dbf") == $a[0])
    {
        /**
         * PRJ
         */
        if (($nombre . ".prj") == $a[1])
        {
            /**
             * qpj
             */
            if (($nombre . ".qpj") == $a[2])
            {
                /**
                 * shp
                 */
                if (($nombre . ".shp") == $a[3])
                {
                    /**
                     * shx
                     */
                    if (($nombre . ".shx") == $a[4])
                    {
                        /**
                         * Si los archivos dentro del zip estan correctos
                         */
                        $nombre_fichero = "/../../sig/presas/" . $archivo;
                        /**
                         * Se buscara si el archivo existe en el directorio
                         */
                        if (copy($archivo, __DIR__ . $nombre_fichero))
                        {
                            echo '<script type="text/javascript">alert("Importación Exitosa");</script>';
                            echo "<script type='text/javascript'>";
                            echo "window.location.href ='/aplicacion/vista/crud/dbadmin.php'";
                            echo "</script>";
                            unlink($archivo);
                        }
                        else
                        {
                            unlink($archivo);
                            err("Se ha producido un error al intentar copiar el fichero");
                        }
                    }
                    else
                    {
                        unlink($archivo);
                        err("Falta el archivo .shx");
                    }
                }
                else
                {
                    unlink($archivo);
                    err("Falta el archivo .shp");
                }
            }
            else
            {
                unlink($archivo);
                err("Falta el archivo .qpj");
            }
        }
        else
        {
            unlink($archivo);
            err("Falta el archivo .prj");
        }
    }
    else
    {
        unlink($archivo);
        err("Falta el archivo .dbf");
    }
}

function err($error)
{
    /**
     * Se manda mensaje de error al usuario
     */
    echo '<script> type="text/javascript">alert("' . $error . '");</script>';
    echo '<script type="text/javascript">';
    echo "javascript:window.history.back();";
    echo "</script>";
}
