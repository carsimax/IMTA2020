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
require_once(__DIR__ . "/../../../modelo/sitiomonitoreosuperficial.php");
/**
 * Obtenemos los registros de los organismos de cuenca
 */
$registros = new Organismo();
$Organismos = $registros->getTodos();
$registros = new SitioMonitoreoSuperficial();
$Anios = $registros->getAnios();
?>
<div class="row">
    <!--Select del los AÑo-->
    <div class="col-sm">
        <label>Año:</label>
        <select class="form-control" id="Anios" onchange="Anios()">
            <?php
            foreach ($Anios as $Anio) {
            ?>
            <option value="<?php echo $Anio['id_anio'] ?>"><?php echo $Anio['anio'] ?></option>
            <?php } ?>
        </select>
    </div>
    <!--Select del Municipios-->
    <div class="col-sm">
        <label>Indicador de calidad:</label>
        <select class="form-control" name="indicador" id="indicador" onchange="Anios()">
            <option value="DBO_TOT">Demanda Bioquímica de Oxígeno</option>
            <option value="DQO_TOT">Demanda Química de Oxígeno</option>
            <option value="SST">Sólidos Suspendidos Totales</option>
            <option value="COLI_FEC">Coliformes Fecales</option>
            <!--<option value="SDT">Sólidos disueltos totales</option>-->
        </select>
    </div>
    <!--Select del organismo de cuenca-->
    <div class="col-sm">
        <label>Organismo de Cuenca:</label>
        <select onchange="Organismos()" name="Organismos[]" multiple id="Organismos">
            <?php
            foreach ($Organismos as $Organismo) {
            ?>
            <option value="<?php echo $Organismo['id_organismo'] ?>"><?php echo $Organismo['numero'] ?>
                .<?php echo $Organismo['nombre'] ?> </option>
            <?php } ?>
        </select>
    </div>
    <!--Fin del Select de los OC-->

    <!--Select del Estados-->
    <div class="col-sm">
        <label>Estado:</label>
        <select onchange="Estados()" name="Estados[]" multiple id="Estados">
        </select>
    </div>
    <!--Fin del Select de los Estados-->

    <!--Select del Municipios-->
    <div class="col-sm">
        <label>Municipio:</label>
        <select name="Municipios[]" multiple id="Municipios" onchange="getPuntosMonitoreo()">
        </select>
    </div>
    <!--Fin del Select de los Estados-->
    <!--Select del Acuiferos-->
    <div class="col-sm">
        <label>Sitios de Monitoreo:</label>
        <select name="Sitios[]" multiple id="Sitios">
        </select>
    </div>
    <!--Fin del Select de los Estados-->
</div>
<div class="row">
    <div class="col-sm">
        <br>
        <button id="consultar" onclick="Consultar()" class="btn btn-gob btn-fill btn-block">Consultar</button>
        <br>
    </div>
</div>

<!--importacion de las capas de informacion-->
<script
    src="/aplicacion/vista/calidad_agua_superficial/calidad_agua_superficial(anual)/calidad_agua_superficial(anual).js">
</script>
