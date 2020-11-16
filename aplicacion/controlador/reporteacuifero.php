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
ini_set('memory_limit', '1024M');

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
            reporteOC();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case '2':
        try {
            reporteEst();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case '3':
        try {
            reporteAcu();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case '4':
        try {
            reporteMun();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

/**
 * @throws MpdfException
 * Reporte de acuiferos por organismo
 */
function reporteOC()
{
    ob_start();
    /**
     * Colocamos un tiempo limite de carga
     */
    set_time_limit(1600);
    /**
     * Obtenemos el array de los registros
     */
    $array = json_decode($_POST['infoReporteOC'], true);
    /**
     * nuestras cadenas de variables
     */
    $disponibilidad = "";
    /**
     * Este foreach extrae la informacion respectiva a cada una de las tablas de acuiferos
     */
    foreach ($array as $key => $value)
    {
        $disponibilidad .= <<<EOD
<tr>
<td>{$value['Organismo']}</td>
<td>{$value['R']}</td>
<td>{$value['DNC']}</td>
<td>{$value['VCAS']}</td>
<td>{$value['VEALA']}</td>
<td>{$value['VAPTYR']}</td>
<td>{$value['VAPRH']}</td>
<td>{$value['DMA']}</td>
</tr>
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
    $mpdf->SetHeader('<img src="../../../imagenes/header.png" width="15%" >|Reporte Acuíferos|{DATE j-m-Y}');
    $mpdf->SetFooter('{PAGENO}');
    /**
     * Añadimos la la pagina correspondiente
     */
    $mpdf->AddPage('', '', '', '', '', 10, 10, 20, 15, 5, 5); // margin footer

    $html = <<<EOD
<div class="w3-container">
<div class="w3-container w3-amlo">
  <h4>Organismo Disponibilidad</h4>
</div>
<b>Glosario:</b>
<ul>
    <li><small><b>R: </b>Recarga Media Anual.</small></li>
    <li><small><b>DNC: </b>Descarga Natural Comprometida.</small></li>
    <li><small><b>VCAS: </b>Volumen concesionado/Asignado de aguas subterráneas.</small></li>
    <li><small><b>VEALA: </b>Volumen de extracción de agua en las zonas de suspensión provisional de libre alumbramiento y los inscritos en el Registro Nacional Permanente.</small></li>
    <li><small><b>VAPTYR: </b>Volumen de extracción de agua pendiente de titulación y/o registro en el REPDA.</small></li>
    <li><small><b>VAPRH: </b>Volumen de agua correspondiente a reservas, reglamentos y programación hídrica.</small></li>
    <li><small><b>DMA: </b>Disponibilidad media anual de agua del subsuelo.</small></li>
</ul>
  <table class="w3-table w3-bordered w3-striped">
    <thead>
        <tr class="w3-amlo">
            <th class="blanco">Organismo</th>
            <th class="blanco">R (hm<sup>3</sup>)</th>
            <th class="blanco">DNC (hm<sup>3</sup>)</th>
            <th class="blanco">VCAS (hm<sup>3</sup>)</th>
            <th class="blanco">VEALA (hm<sup>3</sup>)</th>
            <th class="blanco">VAPTYR (hm<sup>3</sup>)</th>
            <th class="blanco">VAPRH (hm<sup>3</sup>)</th>
            <th class="blanco">DMA (hm<sup>3</sup>)</th>
        </tr>
     </thead>
     <tbody>
EOD;
    /**
     * Se imprime el array
     */
    $html .= $disponibilidad;
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
    $mpdf->SetTitle('Reporte Acuífero');
    $mpdf->output('Reporte_Acuífero.pdf', 'I');
    ob_end_flush();
}

/**
 * @throws MpdfException
 * Reporte de acuiferos por Estado
 */
function reporteEst()
{
    ob_start();
    /**
     * Colocamos un tiempo limite de carga
     */
    set_time_limit(1600);
    /**
     * Obtenemos el array de los registros
     */
    $array = json_decode($_POST['infoReporteEst'], true);
    /**
     * nuestras cadenas de variables
     */
    $disponibilidad = "";
    /**
     * Este foreach extrae la informacion respectiva a cada una de las tablas de acuiferos
     */
    foreach ($array as $key => $value)
    {
        $disponibilidad .= <<<EOD
<tr>
<td>{$value['Estado']}</td>
<td>{$value['R']}</td>
<td>{$value['DNC']}</td>
<td>{$value['VCAS']}</td>
<td>{$value['VEALA']}</td>
<td>{$value['VAPTYR']}</td>
<td>{$value['VAPRH']}</td>
<td>{$value['DMA']}</td>
</tr>
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
    $mpdf->SetHeader('<img src="../../../imagenes/header.png" width="15%" >|Reporte Acuíferos|{DATE j-m-Y}');
    $mpdf->SetFooter('{PAGENO}');
    /**
     * Añadimos la la pagina correspondiente
     */
    $mpdf->AddPage('', '', '', '', '', 10, 10, 20, 15, 5, 5); // margin footer

    $html = <<<EOD
<div class="w3-container">
<div class="w3-container w3-amlo">
  <h4>Estado Disponibilidad</h4>
</div>
<b>Glosario:</b>
<ul>
    <li><small><b>R: </b>Recarga Media Anual.</small></li>
    <li><small><b>DNC: </b>Descarga Natural Comprometida.</small></li>
    <li><small><b>VCAS: </b>Volumen concesionado/Asignado de aguas subterráneas.</small></li>
    <li><small><b>VEALA: </b>Volumen de extracción de agua en las zonas de suspensión provisional de libre alumbramiento y los inscritos en el Registro Nacional Permanente.</small></li>
    <li><small><b>VAPTYR: </b>Volumen de extracción de agua pendiente de titulación y/o registro en el REPDA.</small></li>
    <li><small><b>VAPRH: </b>Volumen de agua correspondiente a reservas, reglamentos y programación hídrica.</small></li>
    <li><small><b>DMA: </b>Disponibilidad media anual de agua del subsuelo.</small></li>
</ul>
  <table class="w3-table w3-bordered w3-striped">
    <thead>
        <tr class="w3-amlo">
            <th class="blanco">Estado</th>
            <th class="blanco">R (hm<sup>3</sup>)</th>
            <th class="blanco">DNC (hm<sup>3</sup>)</th>
            <th class="blanco">VCAS (hm<sup>3</sup>)</th>
            <th class="blanco">VEALA (hm<sup>3</sup>)</th>
            <th class="blanco">VAPTYR (hm<sup>3</sup>)</th>
            <th class="blanco">VAPRH (hm<sup>3</sup>)</th>
            <th class="blanco">DMA (hm<sup>3</sup>)</th>
        </tr>
     </thead>
     <tbody>
EOD;
    /**
     * Se imprime el array
     */
    $html .= $disponibilidad;
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
    $mpdf->SetTitle('Reporte Acuífero');
    $mpdf->output('Reporte_Acuífero.pdf', 'I');
    ob_end_flush();
}

/**
 * @throws MpdfException
 * Reporte de acuiferos por Estado
 */
function reporteAcu()
{
    ob_start();
    /**
     * Colocamos un tiempo limite de carga
     */
    set_time_limit(1600);
    /**
     * Obtenemos el array de los registros
     */
    $array = json_decode($_POST['infoReporteAcu'], true);
    /**
     * nuestras cadenas de variables
     */
    $disponibilidad = "";
    /**
     * Este foreach extrae la informacion respectiva a cada una de las tablas de acuiferos
     */
    foreach ($array as $key => $value)
    {
        $disponibilidad .= <<<EOD
<tr>
<td>{$value['Acuifero']}</td>
<td>{$value['R']}</td>
<td>{$value['DNC']}</td>
<td>{$value['VCAS']}</td>
<td>{$value['VEALA']}</td>
<td>{$value['VAPTYR']}</td>
<td>{$value['VAPRH']}</td>
<td>{$value['DMA']}</td>
</tr>
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
    $mpdf->SetHeader('<img src="../../../imagenes/header.png" width="15%" >|Reporte Acuíferos|{DATE j-m-Y}');
    $mpdf->SetFooter('{PAGENO}');
    /**
     * Añadimos la la pagina correspondiente
     */
    $mpdf->AddPage('', '', '', '', '', 10, 10, 20, 15, 5, 5); // margin footer

    $html = <<<EOD
<div class="w3-container">
<div class="w3-container w3-amlo">
  <h4>Acuífero Disponibilidad</h4>
</div>
<b>Glosario:</b>
<ul>
    <li><small><b>R: </b>Recarga Media Anual.</small></li>
    <li><small><b>DNC: </b>Descarga Natural Comprometida.</small></li>
    <li><small><b>VCAS: </b>Volumen concesionado/Asignado de aguas subterráneas.</small></li>
    <li><small><b>VEALA: </b>Volumen de extracción de agua en las zonas de suspensión provisional de libre alumbramiento y los inscritos en el Registro Nacional Permanente.</small></li>
    <li><small><b>VAPTYR: </b>Volumen de extracción de agua pendiente de titulación y/o registro en el REPDA.</small></li>
    <li><small><b>VAPRH: </b>Volumen de agua correspondiente a reservas, reglamentos y programación hídrica.</small></li>
    <li><small><b>DMA: </b>Disponibilidad media anual de agua del subsuelo.</small></li>
</ul>
  <table class="w3-table w3-bordered w3-striped">
    <thead>
        <tr class="w3-amlo">
            <th class="blanco">Acuífero</th>
            <th class="blanco">R (hm<sup>3</sup>)</th>
            <th class="blanco">DNC (hm<sup>3</sup>)</th>
            <th class="blanco">VCAS (hm<sup>3</sup>)</th>
            <th class="blanco">VEALA (hm<sup>3</sup>)</th>
            <th class="blanco">VAPTYR (hm<sup>3</sup>)</th>
            <th class="blanco">VAPRH (hm<sup>3</sup>)</th>
            <th class="blanco">DMA (hm<sup>3</sup>)</th>
        </tr>
     </thead>
     <tbody>
EOD;
    /**
     * Se imprime el array
     */
    $html .= $disponibilidad;
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
    $mpdf->SetTitle('Reporte Acuífero');
    $mpdf->output('Reporte_Acuífero.pdf', 'I');
    ob_end_flush();
}

/**
 * @throws MpdfException
 * Reporte de acuiferos por Estado
 */
function reporteMun()
{
    ob_start();
    /**
     * Colocamos un tiempo limite de carga
     */
    set_time_limit(1600);
    /**
     * Obtenemos el array de los registros
     */
    $array = json_decode($_POST['infoReporteMun'], true);
    /**
     * nuestras cadenas de variables
     */
    $disponibilidad = "";
    /**
     * Este foreach extrae la informacion respectiva a cada una de las tablas de acuiferos
     */
    foreach ($array as $key => $value)
    {
        $disponibilidad .= <<<EOD
<tr>
<td>{$value['Estado']}</td>
<td>{$value['Municipio']}</td>
<td>{$value['R']}</td>
<td>{$value['DNC']}</td>
<td>{$value['VCAS']}</td>
<td>{$value['VEALA']}</td>
<td>{$value['VAPTYR']}</td>
<td>{$value['VAPRH']}</td>
<td>{$value['DMA']}</td>
</tr>
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
    $mpdf->SetHeader('<img src="../../../imagenes/header.png" width="15%" >|Reporte Acuíferos|{DATE j-m-Y}');
    $mpdf->SetFooter('{PAGENO}');
    /**
     * Añadimos la la pagina correspondiente
     */
    $mpdf->AddPage('', '', '', '', '', 10, 10, 20, 15, 5, 5); // margin footer

    $html = <<<EOD
<div class="w3-container">
<div class="w3-container w3-amlo">
  <h4>Municipio Disponibilidad</h4>
</div>
<b>Glosario:</b>
<ul>
    <li><small><b>R: </b>Recarga Media Anual.</small></li>
    <li><small><b>DNC: </b>Descarga Natural Comprometida.</small></li>
    <li><small><b>VCAS: </b>Volumen concesionado/Asignado de aguas subterráneas.</small></li>
    <li><small><b>VEALA: </b>Volumen de extracción de agua en las zonas de suspensión provisional de libre alumbramiento y los inscritos en el Registro Nacional Permanente.</small></li>
    <li><small><b>VAPTYR: </b>Volumen de extracción de agua pendiente de titulación y/o registro en el REPDA.</small></li>
    <li><small><b>VAPRH: </b>Volumen de agua correspondiente a reservas, reglamentos y programación hídrica.</small></li>
    <li><small><b>DMA: </b>Disponibilidad media anual de agua del subsuelo.</small></li>
</ul>
  <table class="w3-table w3-bordered w3-striped">
    <thead>
        <tr class="w3-amlo">
            <th class="blanco">Estado</th>
            <th class="blanco">Municipio</th>
            <th class="blanco">R (hm<sup>3</sup>)</th>
            <th class="blanco">DNC (hm<sup>3</sup>)</th>
            <th class="blanco">VCAS (hm<sup>3</sup>)</th>
            <th class="blanco">VEALA (hm<sup>3</sup>)</th>
            <th class="blanco">VAPTYR (hm<sup>3</sup>)</th>
            <th class="blanco">VAPRH (hm<sup>3</sup>)</th>
            <th class="blanco">DMA (hm<sup>3</sup>)</th>
        </tr>
     </thead>
     <tbody>
EOD;
    /**
     * Se imprime el array
     */
    $html .= $disponibilidad;
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
    $mpdf->SetTitle('Reporte Acuífero');
    $mpdf->output('Reporte_Acuífero.pdf', 'I');
    ob_end_flush();
}
