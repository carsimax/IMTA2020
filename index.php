<?php
//Esto es para que se muestren los errores de php durante la ejecucion del programa
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//Esta es la funcion principal que verifica el estado de la sesion del usuario
if (!defined('aplicacion/controlador/main.php')) {
    require('aplicacion/controlador/main.php');
    define('aplicacion/controlador/main.php', 1);
    
}
die();
