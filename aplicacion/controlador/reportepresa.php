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
require_once(__DIR__ . "/../../vendor/autoload.php");

use Mpdf\Mpdf;
use Mpdf\MpdfException;

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
    case '1':
        try {
            reportePresa();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case '2':
        try {
            reportePresaV();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

/**
 * @throws MpdfException
 * Reporte de acuiferos por organismo
 */
function reportePresa()
{
    ob_start();
    /**
     * Colocamos un tiempo limite de carga
     */
    set_time_limit(1600);
    /**
     * Obtenemos el array de los registros
     */
    $array = json_decode($_POST['infoReporte'], true);
    $arrayV = json_decode($_POST['infoReporteVol'], true);
    /**
     * nuestras cadenas de variables
     */
    $presa = "";
    $presa .= <<<EOD
<div class="w3-container w3-amlo">
<h4>Presas </h4>
</div>
<br>    
EOD;

    /**
     * Este foreach extrae la informacion respectiva a cada una de las tablas de acuiferos
     */
    foreach ($array as $key => $value)
    {
        $presa .= <<<EOD
<table class="w3-table w3-bordered w3-striped">
<thead>
<tr class="w3-amlo">
<th class="blanco">Nombre Oficial</th>
<th class="blanco">Nombre Común</th>
<th class="blanco">Corriente</th>
<th class="blanco">Estado</th>
<th class="blanco">Año Termino</th>
</tr>
</thead>
<tbody>
<tr>
<td>{$value['nombre_oficial']}</td>
<td>{$value['nom_comun']}</td>
<td>{$value['corriente']}</td>
<td>{$value['nombre']}</td>
<td>{$value['anio_term']}</td>
</tr>
</tbody>
  </table>
</div>
EOD;
        foreach ($arrayV as $keyV => $valueV)
        {
            if ($value['id_presa'] == $valueV['presa_id'])
            {
                $presa .= <<<EOD
<table class="w3-table w3-bordered w3-striped">
<thead>
<tr class="w3-brown">
<th class="blanco">Año</th>
<th class="blanco">Altura de la cortina (m)</th>
<th class="blanco">Capacidad al NAME (hm<sup>3</sup>)</th>
<th class="blanco">Capacidad al NAMO (hm<sup>3</sup>)</th>
<th class="blanco">Vol. de almacenamiento (hm<sup>3</sup>)</th>
</tr>
</thead>
<tbody>
<tr>
<td>{$valueV['anio']}</td>
<td>{$valueV['alt_cort']}</td>
<td>{$valueV['cap_name']}</td>
<td>{$valueV['cap_namo']}</td>
<td>{$valueV['vol_alma']}</td>
</tr>
</tbody>
  </table>
</div>
EOD;
            }
        }
        $presa .= <<<EOD
<br>    
<hr>
EOD;
    }
    /**
     * Crear la instancia a la libreria de pdf
     */
    $mpdf = new Mpdf(['mode' => 'utf-8', 'format' => 'A4-L']);
    /**
     * aplicacion del estilo
     */
    $css = file_get_contents('../../estilo/css/mpdf.css', 1);
    $mpdf->writeHTML($css, 1);
    /**
     * Colocamos la cabezera y el pie de pagina de nuestro pdf
     */
    $mpdf->SetHeader('<img src="../../../imagenes/header.png" width="15%" >|Reporte Presas|{DATE j-m-Y}');
    $mpdf->SetFooter('{PAGENO}');
    /**
     * Añadimos la la pagina correspondiente
     */
    $mpdf->AddPage('', '', '', '', '', 10, 10, 20, 15, 5, 5); // margin footer

    $html = <<<EOD
EOD;
    /**
     * Se imprime el array
     */
    $html .= $presa;
    $html .= <<<EOD

EOD;
    $html = mb_convert_encoding($html, 'UTF-8', 'UTF-8');
    $mpdf->writeHTML($presa);
    /**
     * Devulve el documento
     */
    $mpdf->SetTitle('Reporte Presa');
    $mpdf->output('Reporte_Presa.pdf', 'I');
    ob_end_flush();
}

/**
 * @throws MpdfException
 * Reporte de acuiferos por organismo
 */
function reportePresaV()
{
    ob_start();
    /**
     * Colocamos un tiempo limite de carga
     */
    set_time_limit(1600);
    /**
     * Obtenemos el array de los registros
     */
    $array = json_decode($_POST['infoReporteV'], true);
    /**
     * nuestras cadenas de variables
     */
    $presa = "";
    /**
     * Este foreach extrae la informacion respectiva a cada una de las tablas de presa volumen
     */
    foreach ($array as $key => $value)
    {
        $presa .= <<<EOD
<tr>
<td>{$value['anio']}</td>
<td>{$value['alt_cort']}</td>
<td>{$value['cap_name']}</td>
<td>{$value['cap_namo']}</td>
<td>{$value['vol_alma']}</td>
</tr>
EOD;
        $id = $value['presa_id'];
        $nombre = $value['nom_oficial'];
    }
    /**
     * Crear la instancia a la libreria de pdf
     */
    $mpdf = new Mpdf(['mode' => 'utf-8', 'format' => 'A4-L']);
    /**
     * aplicacion del estilo
     */
    $css = file_get_contents('../../estilo/css/mpdf.css', 1);
    $mpdf->writeHTML($css, 1);
    /**
     * Colocamos la cabezera y el pie de pagina de nuestro pdf
     */
    $mpdf->SetHeader('<img src="../../../imagenes/header.png" width="15%" >|Reporte Volumen Presa|{DATE j-m-Y}');
    $mpdf->SetFooter('{PAGENO}');
    /**
     * Añadimos la la pagina correspondiente
     */
    $mpdf->AddPage('', '', '', '', '', 10, 10, 20, 15, 5, 5); // margin footer
    /**
     * Escribimos la primera tabla de presa volumen
     */
    $html = <<<EOD
<div class="w3-container">
<div class="w3-container w3-amlo">
  <h4>Presa: {$id} - {$nombre} </h4>
</div>
  <table class="w3-table w3-bordered w3-striped">
    <thead>
        <tr class="w3-amlo">
            <th class="blanco">Año</th>
            <th class="blanco">Altura de la cortina(m)</th>
            <th class="blanco">Capacidad al NAME(hm³)</th>
            <th class="blanco">Capacidad al NAMO(hm³)</th>
            <th class="blanco">Vol. de almacenamiento(hm³)</th>
        </tr>
     </thead>
     <tbody>
EOD;
    $html .= $presa;
    $html .= <<<EOD
</tbody>
</table>
</div>
EOD;
    $html = mb_convert_encoding($html, 'UTF-8', 'UTF-8');
    $mpdf->writeHTML($html);
    /**
     * Devulve el documento
     */
    $mpdf->SetTitle('Reporte Presas');
    $mpdf->output('Reporte_Presas.pdf', 'I');
    ob_end_flush();
}
