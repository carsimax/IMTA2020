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
/**
 * Obtenemos los registros de los organismos de cuenca
 */
$registros = new Organismo();
$Organismos = $registros->getTodos();
?>

<div class="row">
    <div class="col-md-4">
        <!--Select del organismo de cuenca-->
        <label>Organismo de Cuenca:</label>
        <select class="form-control" onchange="Organismos()" multiple id="Organismos">
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

    <div class="col-md-4">
        <label>Tipo de Estación:</label>
        <select onchange="TipoEstacion()"  multiple id="TipoEstacion">
            <option value="2">Climatológico</option>
            <option value="1">Obsertatorio</option>
        </select>
    </div>
    
    <!--Select del Titulos-->
    <div class="col-md-4">
        <label>Estación Climatológica:</label>
        <select name="EstacionClimatologica[]" onchange="Estaciones()" multiple id="EstacionClimatologica">
        </select>
    </div>
</div>
<div class="row">
    <div class="col-md id="divAcuifero">
        <br>
        <button id="consultar" onclick="Consultar()" class="btn btn-gob text-light  btn-block" disabled>Consultar</button>
        <br>
    </div>
</div>
<!-- Funciones globales de los selects -->
<script src="/sistema/functionsselect.js"></script>
<script src="/aplicacion/vista/estaciones_climatologicas/estacion(municipio)/estacion(municipio).js"></script>