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
require_once(__DIR__ . "/../../../modelo/estadomarginacion.php");
/**
 * Obtenemos los registros de los organismos de cuenca
 */

$registros = new EstadoMarginacion();
$Anios = $registros->getAnios();
$Estados = $registros->getEstados();
?>
<style>
/* Estilo para el legend */
    .legend {
        line-height: 18px;
        color: #555;
        background-color: white;
    }

    .legend i {
        width: 18px;
        height: 18px;
        float: left;
        margin-right: 8px;
        opacity: 0.7;
    }

    .info {
        padding: 6px 8px;
        background: white;
        background: rgba(255, 255, 255, 0.8);
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
    }

    .info h4 {
        margin: 0 0 5px;
        color: #777;
    }
</style>
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
        <select class="form-control" multiple name="Estados" id="Estados">
            <?php
            foreach ($Estados as $Estado) {
            ?>
                <option value="<?php echo $Estado['estado_id'] ?>"><?php echo $Estado['nombre'] ?> </option>
            <?php } ?>
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

<script src="/sistema/functionsselect.js"></script>
<script src="/aplicacion/vista/indice_marginacion/indice(estado)/indice(estado).js"></script>