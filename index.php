<?php
//Esto es para que se muestren los errores de php durante la ejecucion del programa

use PHPMailer\PHPMailer\PHPMailer;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//Esta es la funcion principal que verifica el estado de la sesion del usuario
if (!defined('aplicacion/controlador/main.php') && !isset($_GET['email'])&& !isset($_GET['token'])) {
    require('aplicacion/controlador/main.php');
    define('aplicacion/controlador/main.php', 1);
    //Hola
} else {
    require_once(__DIR__ . "/correo/src/Exception.php");
    require_once(__DIR__ . "/correo/src/PHPMailer.php");
    require_once(__DIR__ . "/correo/src/SMTP.php");
    $to = $_GET['email'];
    $token = $_GET['token'];
    $phpMailerObj = new PHPMailer();

    $phpMailerObj->isSMTP();
    $phpMailerObj->SMTPDebug = 0;
    $phpMailerObj->Debugoutput = 'html';
    $phpMailerObj->Host = 'smtp.gmail.com';
    $phpMailerObj->Port = 587;
    $phpMailerObj->SMTPSecure = 'tls';
    $phpMailerObj->SMTPAuth = true;
    $phpMailerObj->Username = 'sisuar.imta@gmail.com';
    $phpMailerObj->Password = '$imta2021$';
    $phpMailerObj->setFrom('sisuar.imta@gmail.com', 'SISUAR', 0);
    $phpMailerObj->addAddress($to, 'Nuevo Usuario');

    $phpMailerObj->Subject = 'Verificación';
    $phpMailerObj->Body = 'Verifique su cuenta desde el siguiente enlace: http://sisuar.imta.mx/aplicacion/vista/verificar.php?email='.$to.'&token='.$token;

    if (!$phpMailerObj->send()) {
        echo "phpMailerObjer Error: " . $phpMailerObj->ErrorInfo;
        return 0;
    } else {
        header("Location:/aplicacion/vista/principal.php");
        return 1;
    }
}
die();
