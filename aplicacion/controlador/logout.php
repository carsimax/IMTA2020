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
 * Se obtienen los datos se session
 */
session_start();
/**
 * Se quita el id del usuario
 */
session_unset($_SESSION['ID_Usuario']);
/**
 * Se utiliza la funcion destruir la sesion.
 */
session_destroy();
/**
 * Se redirecciona al inicio.
 */
header('location: /');
?>