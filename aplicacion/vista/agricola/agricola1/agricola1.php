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
//Ciclos
$registros = new Ciclo();
$Ciclos = $registros->getCiclos();
//Tenenciaas
$registros = new Anio();
$Anios = $registros->getAnioSiembraDistrito();
?>
<!--Select del organismo de cuenca-->
<div class="row">
    <!--Select del los AÑo-->
    <div class="col-sm">
        <label>Año Agrícola:</label>
        <select class="form-control" id="Anios" onchange="Anios()">
            <option disabled selected value> -- Seleccione una opción -- </option>
            <?php
            foreach ($Anios as $Anio) {
            ?>
                <option value="<?php echo $Anio['id_anio'] ?>"><?php echo $Anio['anio_agricola'] ?></option>
            <?php } ?>
        </select>
    </div>
    <div class="col-sm">
        <label>Organismo de Cuenca:</label>
        <select onchange=" Organismos()" name="Organismos[]" multiple id="Organismos">
        </select>
    </div>
    <!--Fin del Select de los OC-->
    <!--Select del Estados-->
    <div class="col-sm">
        <label>Estado:</label>
        <select onchange="Estados()" name="Estados[]" multiple id="Estados">
        </select>
    </div>
    <!--Select del los ciclos-->
    <div class="col-sm">
        <label>Ciclos:</label>
        <select name="Ciclos[]" multiple id="Ciclos">
            <?php
            foreach ($Ciclos as $Ciclo) {
            ?>
                <option value="<?php echo $Ciclo['id_ciclo'] ?>"><?php echo $Ciclo['nombre'] ?></option>
            <?php } ?>
        </select>
    </div>
</div>
<div class="row">
    <!--Select del los ciclos-->
    <div class="col-sm">
        <label>Modalidad:</label>
        <select name="Modalidades[]" multiple id="Modalidades">
            <option value="Riego">Riego</option>
            <option value="Temporal">Temporal</option>
        </select>
    </div>
    <!--Select del los ciclos-->
    <div class="col-sm">
        <label>Tenencia:</label>
        <select name="Tenencias[]" multiple id="Tenencias" onchange="Tenencias()">
            <option value="1">Social</option>
            <option value="2">Particular</option>
        </select>
    </div>
    <!--Select del Acuiferos-->
    <div class="col-sm">
        <label>Distritos de Riego:</label>
        <select name="Distritos[]" multiple id="Distritos" onchange="getCultivos()">
        </select>
    </div>

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
        <button id="consultar" onclick="Consultar()" disabled class="btn btn-gob btn-fill btn-block">Consultar</button>
        <br>
    </div>
</div>

<!-- Funciones globales de los selects -->
<script src="/../sistema/functionsselect.js"></script>
<!--importacion de las capas de informacion-->
<script src="/aplicacion/vista/agricola/agricola1/agricola1.js"></script>