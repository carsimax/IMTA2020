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
 * Si la sesion no esta iniciada
 */
if (!isset($_SESSION))
{
    session_start();
}
/**
 * Si se esta en un proceso de restauracion
 */
if (isset($_SESSION['olvidada']) && $_SESSION['olvidada'] == 1)
{
    echo "
    <!doctype html>
    <html lang='es'>
    <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <!--Estilo General de la pagina-->
        <link href=\"https://framework-gb.cdn.gob.mx/qa/assets/styles/main.css\" rel=\"stylesheet\">
        <!--Fin de los estilos de la pagina-->
    </head>
    <body>
    <div class='alert alert-danger mt-4' role='alert'>
        <h4>Recientemente se inició un proceso de restablecimiento de contraseña.</h4>
        <h4>Por favor haga click en el siguiente enlace.</h4>
        <p><a href='../../../aplicacion/vista/perfil/perfil.php'>Entre aquí.</a></p></div>
        </body>
        </html>";
    exit;
}

if (isset($_SESSION['loggedin']))
{
    
}
else
{
    /**
     * si no esta activa se muestra un mensaje de advertencia y se pide iniciar sesion
     */
    echo "
    <!doctype html>
    <html lang='es'>
    <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <!--Estilo General de la pagina-->
        <link href=\"https://framework-gb.cdn.gob.mx/qa/assets/styles/main.css\" rel=\"stylesheet\">
        <!--Fin de los estilos de la pagina-->
    </head>
    <body>
    <div class='alert alert-danger mt-4' role='alert'>
        <h4>Necesitas iniciar sesión para acceder a esta página.</h4>
        <p><a href='/aplicacion/vista/login/login.php'>Entre aquí.</a></p></div>
        </body>
        </html>";
    exit;
}
?>
