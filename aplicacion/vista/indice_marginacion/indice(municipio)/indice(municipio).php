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
require_once(__DIR__ . "/../../../modelo/municipiomarginacion.php");
require_once(__DIR__ . "/../../../modelo/estado.php");
/**
 * Obtenemos los registros de los organismos de cuenca
 */

$registros = new MunicipioMarginacion();
$Anios = $registros->getAnios();
$registros = new Estado();
$Estados = $registros->getTodos();
?>
<div class="row">
    <!--Select del los AÑo-->
    <div class="col-sm">
        <label>Año:</label>
        <select class="form-control" id="Anios" onchange="Anios()">
            <?php
            foreach ($Anios as $Anio) {
            ?>
                <option value="<?php echo $Anio['anio_id'] ?>"><?php echo $Anio['anio'] ?></option>
            <?php } ?>
        </select>
    </div>
    <div class="col-sm">
        <label>Estado:</label>
        <select class="form-control" multiple name="Estados" onchange="Estados()" id="Estados">
            <?php
            foreach ($Estados as $Estado) {
            ?>
                <option value="<?php echo $Estado['id_estado'] ?>"><?php echo $Estado['nombre'] ?> </option>
            <?php } ?>
        </select>
    </div>
    <div class="col-sm">
        <label>Municipio:</label>
        <select class="form-control" multiple name="Municipios" id="Municipios">
           
        </select>
    </div>
</div>
<div class="row">
    <div class="col-sm">
        <br>
        <button id="consultar" onclick="Consultar()" class="btn btn-gob btn-fill btn-block">Consultar</button>
        <br>
    </div>
</div>

<!-- Functions select provienen las funciones del seteo de los selects y la obtencion de informacion -->
<script src="/sistema/functionsselect.js"></script>
<script src="/aplicacion/vista/indice_marginacion/indice(municipio)/indice(municipio).js"></script>