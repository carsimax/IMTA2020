<?php
/**
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */
/**
 * Variables para depurar y ver los errores de ejecución dentro del servidor apache.
 */
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
/**
 * Para que el controlador funcione de forma correcta, es necesario la llamada a los modelos necesarios en el mismo.
 */
require_once(__DIR__ . "/../../../modelo/organismo.php");
require_once(__DIR__ . "/../../../modelo/ciclo.php");
require_once(__DIR__ . "/../../../modelo/anio.php");
require_once(__DIR__ . "/../../../modelo/fuente.php");

//Tenenciaas
$registros = new Ciclo();
$Ciclos = $registros->getCiclosDTT();
//Tenenciaas
$registros = new Anio();
$Anios = $registros->getAniosUR();
//fuentes
//$registros = new Fuente();
//$Fuentes = $registros->getFuentes();
?>

<div class="row">
    <div class="col-sm">
        <label>Año Agrícola:</label>
        <select class="form-control" id="Anios" onchange="Anios()">
            <option disabled selected value> -- Seleccione una opción -- </option>
            <?php
            foreach ($Anios as $Anio)
            {
                ?>
                <option value="<?php echo $Anio['id_anio'] ?>"><?php echo $Anio['anio_agricola'] ?></option>
            <?php } ?>
        </select>
    </div>
    <!--Select del organismo de cuenca-->
    <div class="col-sm">
        <label>Organismo de Cuenca:</label>
        <select onchange="Organismos()" name="Organismos[]" multiple id="Organismos">
        </select>
    </div>
    <!--Fin del Select de los OC-->

    <!--Select del Estados-->
    <div class="col-sm">
        <label>Estado:</label>
        <select onchange="Estados()" name="Estados[]" multiple id="Estados">
        </select>
    </div>
    <!--Select del Estados-->
    <div class="col-sm">
        <label>Municipio:</label>
        <select onchange="getCultivos()" name="Municipios[]" multiple id="Municipios">
        </select>
    </div>
    <!--Select del los ciclos-->
    <div class="col-sm">
        <label>Cultivos:</label>
        <select name="Cultivos[]" onchange="Cultivos()" multiple id="Cultivos">
        </select>
    </div>
</div>
<div class="row">
    <!--Select del Acuiferos-->
    <div class="col-sm">
        <br>
        <button id="consultar" onclick="Consultar()" disabled class="btn btn-gob btn-fill  btn-block">Consultar</button>
        <br>
    </div>
</div>
<!-- Funciones globales de los selects -->
<script src="/../sistema/functionsselect.js"></script>
<!--importacion de las capas de informacion-->
<script src="/aplicacion/vista/agricola/agricola7/agricola7.js"></script>