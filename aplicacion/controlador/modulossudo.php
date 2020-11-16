<?php

/**
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */
if (!isset($_SESSION))
{
    session_start();
}
if ($_SESSION['Rol_ID'] != 1)
{
    header("Location:/aplicacion/vista/principal.php");
    die();
}

