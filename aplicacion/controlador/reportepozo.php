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
            reporteTitulo();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case '2':
        try {
            reportePozo();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

/**
 * @throws MpdfException
 * Reporte de acuiferos por organismo
 */
function reporteTitulo()
{
    ob_start();
    /**
     * Colocamos un tiempo limite de carga
     */
    set_time_limit(1600);
    /**
     * Obtenemos el array de los registros
     */
    $array = json_decode($_POST['infoReporteTitulo'], true);
    $arrayV = json_decode($_POST['infoReporteTituloP'], true);
    /**
     * nuestras cadenas de variables
     */
    $pozo = "";
    $pozo .= <<<EOD
<div class="w3-container w3-amlo">
<h4>Títulos de Concesión </h4>
</div>
<br>    
EOD;

    /**
     * Este foreach extrae la informacion respectiva a cada una de las tablas de acuiferos
     */
    foreach ($array as $key => $value)
    {
        $pozo .= <<<EOD
<table class="w3-table w3-bordered w3-striped">
<thead>
<tr class="w3-amlo">
<th class="blanco">Título</th>
<th class="blanco">Titular</th>
<th class="blanco">Estado</th>
<th class="blanco">Municipio</th>
<th class="blanco">Acuífero</th>
<th class="blanco">Tipo</th>
<th class="blanco">Uso</th>
<th class="blanco">Fecha de registro</th>
<th class="blanco">Volumen de extracción de aguas nacionales (m3/año)</th>
<th class="blanco">Número de anexos de aguas superficiales</th>
<th class="blanco">Volumen de aguas superficiales (m3/año)</th>
<th class="blanco">Número de anexos de aguas subterráneas</th>
<th class="blanco">Volumen de aguas subterráneas (m3/año)</th>
<th class="blanco">Número de anexos de descarga</th>
<th class="blanco">Volumen de descarga (m3/día)</th>
<th class="blanco">Número de anexos de zonas federales</th>
<th class="blanco">Superficie (m2)</th>
<th class="blanco">Anexos Totales</th>
</tr>
</thead>
<tbody>
<tr>
<td>{$value['id_titulo']}</td>
<td>{$value['titular']}</td>
<td>{$value['estado']}</td>
<td>{$value['municipio']}</td>
<td>{$value['acuifero']}</td>
<td>{$value['tipo']}</td>
<td>{$value['uso']}</td>
<td>{$value['fecha_reg']}</td>
<td>{$value['vol_amparado_total']}</td>
<td>{$value['num_aprov_superf']}</td>
<td>{$value['vol_aprov_superf']}</td>
<td>{$value['num_aprov_subt']}</td>
<td>{$value['vol_aprov_subt']}</td>
<td>{$value['puntos_desc']}</td>
<td>{$value['vol_desc_diario']}</td>
<td>{$value['zonas_fed_amp_titulo']}</td>
<td>{$value['supeficie']}</td>
<td>{$value['anexos']}</td>
</tr>
</tbody>
  </table>
</div>
EOD;
        foreach ($arrayV as $keyV => $valueV)
        {
            if ($value['id_titulo'] == $valueV['id_titulo'])
            {
                $pozo .= <<<EOD
<table class="w3-table w3-bordered w3-striped">
<thead>
<tr class="w3-brown">
<th class="blanco">ID Pozo</th>
<th class="blanco">Título de Concesión</th>
<th class="blanco">Uso</th>
<th class="blanco">Región Hidrológica</th>
<th class="blanco">Cuenca</th>
<th class="blanco">Latitud</th>
<th class="blanco">Longitud</th>
<th class="blanco">Volumen</th>
</tr>
</thead>
<tbody>
<tr>
<td>{$valueV['id_pozo']}</td>
<td>{$valueV['id_titulo']}</td>
<td>{$valueV['uso']}</td>
<td>{$valueV['rh']}</td>
<td>{$valueV['latitud']}</td>
<td>{$valueV['longitud']}</td>
<td>{$valueV['volumen']}</td>
</tr>
</tbody>
  </table>
</div>
EOD;
            }
        }
        $pozo .= <<<EOD
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
    $mpdf->SetHeader('<img src="../../../imagenes/header.png" width="15%" >|Reporte Pozos|{DATE j-m-Y}');
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
    $html .= $pozo;
    $html .= <<<EOD

EOD;
    $html = mb_convert_encoding($html, 'UTF-8', 'UTF-8');
    $mpdf->writeHTML($pozo);
    /**
     * Devulve el documento
     */
    $mpdf->SetTitle('Reporte Pozo');
    $mpdf->output('Reporte_Pozo.pdf', 'I');
    ob_end_flush();
}

function reportePozo()
{
    ob_start();
    /**
     * Colocamos un tiempo limite de carga
     */
    set_time_limit(1600);
    /**
     * Obtenemos el array de los registros
     */
    $array = json_decode($_POST['infoReportePozo'], true);
    /**
     * nuestras cadenas de variables
     */
    $pozo = "";
    /**
     * Este foreach extrae la informacion respectiva a cada una de las tablas de Pozo volumen
     */
    foreach ($array as $key => $value)
    {
        $pozo .= <<<EOD
<tr>
<td>{$value['id_pozo']}</td>
<td>{$value['uso']}</td>
<td>{$value['rh']}</td>
<td>{$value['cuenca_id']}</td>
<td>{$value['latitud']}</td>
<td>{$value['longitud']}</td>
<td>{$value['volumen']}</td>
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
    $mpdf->SetHeader('<img src="../../../imagenes/header.png" width="15%" >|Reporte Volumen Pozo|{DATE j-m-Y}');
    $mpdf->SetFooter('{PAGENO}');
    /**
     * Añadimos la la pagina correspondiente
     */
    $mpdf->AddPage('', '', '', '', '', 10, 10, 20, 15, 5, 5); // margin footer
    /**
     * Escribimos la primera tabla de Pozo volumen
     */
    $html = <<<EOD
<div class="w3-container">
<div class="w3-container w3-amlo">
  <h4>Título de Concesión: {$value['id_titulo']}</h4>
</div>
<br>
  <table class="w3-table w3-bordered w3-striped">
    <thead>
        <tr class="w3-amlo">
            <th class="blanco">ID Pozo</th>
            <th class="blanco">Uso</th>
            <th class="blanco">Región Hidrológica</th>
            <th class="blanco">Cuenca</th>
            <th class="blanco">Latitud</th>
            <th class="blanco">Longitud</th>
            <th class="blanco">Volumen</th>
        </tr>
     </thead>
     <tbody>
EOD;
    $html .= $pozo;
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
    $mpdf->SetTitle('Reporte Pozos');
    $mpdf->output('Reporte_Pozos.pdf', 'I');
    ob_end_flush();
}
