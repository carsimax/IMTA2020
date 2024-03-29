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
require_once(__DIR__ . "/../../../modelo/tipopozo.php");
require_once(__DIR__ . "/../../../modelo/uso.php");
/**
 * Obtenemos los registros de los organismos de cuenca
 */
$registros = new Organismo();
$Organismos = $registros->getTodos();
//Obtenemos los tipoz
$registros = new TipoPozo();
$Tipos = $registros->getTodos();
//Obtenemos los usos
$registros = new Uso();
$Usos = $registros->getTodos();
?>

<div class="row">
    <!--Select del Tipo de Pozo-->
    <div class="col-sm" id="divTipo">
        <label>Tipo de Título:</label>
        <select class="form-control green" onchange="CambioTipo()" id="Tipos">
            <?php
            foreach ($Tipos as $Tipo) {
            ?>
                <option value="<?php echo $Tipo['id_tipo']; ?>"><?php echo $Tipo['tipo']; ?></option>
            <?php } ?>
        </select>
    </div>
    <div class="col-sm">
        <!--Select del organismo de cuenca-->
        <label>Organismo de Cuenca:</label>
        <select class="form-control" onchange="Organismos()" multiple id="Organismos" name="Organismos[]">
            <?php
            foreach ($Organismos as $Organismo) {
            ?>
                <option value="<?php echo $Organismo['id_organismo'] ?>"><?php echo $Organismo['numero'] ?>. <?php echo $Organismo['nombre'] ?> </option>
            <?php } ?>
        </select>
    </div>
    <!--Fin del Select de los OC-->

    <!--Select del Estados-->
    <div class="col-sm" id="divEstado">
        <label>Estado:</label>
        <select class="form-control" onchange="Estados()" multiple id="Estados" name="Estados[]">
        </select>
    </div>
    <!--Fin del Select de los Estados-->

    <!--Select del Municipios-->
    <div class="col-sm" id="divMuni">
        <label>Municipio:</label>
        <select class="form-control" onchange="Municipios()" multiple id="Municipios" name="Municipios[]">
            <option disabled selected value> -- Seleccione una opción -- </option>
        </select>
    </div>
    <!--Fin del Select de los Estados-->

    <div class="col-sm" id="divAcuifero">
        <label>Acuífero:</label>
        <select onchange="limpiarAcuifero2()" name="Acuiferos[]" multiple id="Acuiferos">
        </select>
    </div>
    <div class="col-sm">
        <label>Uso del Título:</label>
        <select onchange="getTitulo()" name="Usos[]" multiple id="Usos">
        </select>
    </div>
    <!--Select del Titulos-->
    <div class="col-sm-12 col-md-12" id="divTitulo">
        <label>Titulo de Concesión:</label>
        <select name="Concesiones[]" onchange="Concesiones()" multiple id="Concesiones">
        </select>
    </div>
</div>
<div class="row">
    <!--Fin del Select de los Estados-->
    <!--Select del Acuiferos-->
    <div class="col" id="divAcuifero">
        <br>
        <button id="consultar" onclick="Consultar()" disabled class="btn btn-gob text-light  btn-block">Consultar</button>
        <br>
    </div>
</div>

<!-- Funciones globales de los selects -->
<script src="/sistema/functionsselect.js"></script>
<!--importacion de las capas de informacion-->
<script src="/aplicacion/vista/pozo/pozo(municipio)/pozo(municipio).js"></script>