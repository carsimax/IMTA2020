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
require_once(__DIR__ . "/../../../modelo/estimacionvolumetrica.php");
$registros = new EstimacionVolumetrica();
$Anios = $registros->getAnios();
?>

<div class="row">
    <div class="col-sm">
        <label>Año Agrícola:</label>
        <select name="Anios[]" multiple id="Anios" onchange="Anios()">
            <?php
            foreach ($Anios as $Anio) {
            ?>
                <option value="<?php echo $Anio['id_anio'] ?>"><?php echo $Anio['anio_agricola'] ?></option>
            <?php } ?>
        </select>
    </div>
    <div class="col-sm">
        <label>Estado:</label>
        <select onchange="Estados()" name="Estados[]" multiple id="Estados">
        </select>
    </div>
    <div class="col-sm">
        <label>Municipio:</label>
        <select onchange="Municipios()" name="Municipios[]" multiple id="Municipios">
        </select>
    </div>
    <div class="col-sm">
        <label>Ciclos:</label>

        <select onchange="Ciclos()" name="Ciclos[]" multiple id="Ciclos">
        </select>
    </div>
</div>
<div class=" row">
    <!--Select del los ciclos-->
    <div class="col-sm">
        <label>Cultivos:</label>
        <select name="Cultivos[]" multiple id="Cultivos" onchange="Cultivos()">
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
<script src="/aplicacion/vista/agricola/agricola10/agricola10.js"></script>