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
require_once(__DIR__ . "/../../../modelo/estacionhidrometrica.php");
/**
 * Obtenemos los registros de los organismos de cuenca
 */
$registros = new EstacionHidrometrica();
$Regiones = $registros->getRegionesHidrologicas();
?>

<div class="row">
    <div class="col-md-4">
        <!--Select del organismo de cuenca-->
        <label>Región Hidrológica:</label>
        <select class="form-control" onchange="Regiones()" multiple id="RegHidrologicas">
            <?php
        foreach ($Regiones as $Region) {
            ?>
            <option value="<?php echo $Region['region_id'] ?>"><?php echo $Region['nombre'] ?> </option>
            <?php } ?>
        </select>
    </div>
    <!--Fin del Select de los OC-->

    <!--Select del Estados-->
    <div class="col-md-4" id="divEstado">
        <label>Estado:</label>
        <select class="form-control" onchange="Estados()" multiple id="Estados">
        </select>
    </div>
    <!--Fin del Select de los Estados-->

    <!--Select del Municipios-->
    <div class="col-md-4" id="divMuni">
        <label>Municipio:</label>
        <select class="form-control" onchange="Municipios()" multiple id="Municipios">
        </select>
    </div>
    
    <div class="col-md-4">
        <label>Cuenca:</label>
        <select onchange="Cuencas()"  multiple id="Cuencas">
        </select>
    </div>
    <div class="col-md-8">
        <label>Estación Hidrométrica:</label>
        <select name="EstacionHidrometrica[]" multiple onchange="Estaciones()" id="EstacionHidrometrica">
        </select>
    </div>
</div>
<div class="row">
    <div class="col-sm">
        <br>
        <button id="consultar" onclick="Consultar()" disabled class="btn btn-gob text-light  btn-block">Consultar</button>
        <br>
    </div>
</div>


<script src="/sistema/functionsselect.js"></script>
<script src="/aplicacion/vista/estaciones_hidrometricas/estacion(municipio)/estacion(municipio).js"></script>
