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
require_once(__DIR__ . "/../../../modelo/tenencia.php");
require_once(__DIR__ . "/../../../modelo/anio.php");
require_once(__DIR__ . "/../../../modelo/fuente.php");

//Tenenciaas
$registros = new Tenencia();
$Tenencias = $registros->getTenencias();
//Tenenciaas
$registros = new Anio();
$Anios = $registros->getAnioVolDistrito();
//fuentes
$registros = new Fuente();
$Fuentes = $registros->getFuentes();
?>

<div class="row">
    <!--Select del los AÑo-->
    <div class="col-sm">
        <label>Año Agrícola:</label>
        <select name="Anios[]" multiple id="Anios" onchange="Anios()">
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
</div>
<div class="row">
    <!--Select del los ciclos-->
    <div class="col-sm">
        <label>Tenencia:</label>
        <select name="Tenencias[]" multiple id="Tenencias">
            <option value="4">Ejidal</option>
            <option value="5">Privada</option>
        </select>
    </div>
    <!--Select del los Fuentes-->
    <div class="col-sm">
        <label>Fuente:</label>
        <select name="Fuentes[]" multiple id="Fuentes" onchange="Fuentes()">
            <?php
        foreach ($Fuentes as $Fuente)
        {
            ?>
            <option value="<?php echo $Fuente['id_fuente'] ?>"><?php echo $Fuente['nombre'] ?></option>
            <?php } ?>
        </select>
    </div>
    <!--Select del Acuiferos-->
    <div class="col-sm">
        <label>Distritos de Riego:</label>
        <select name="Distritos[]" multiple id="Distritos">
        </select>
    </div>

</div>
<div class="row">
    <!--Select del Acuiferos-->
    <div class="col-sm">
        <br>
        <button id="consultar" onclick="Consultar()" class="btn btn-gob btn-fill  btn-block">Consultar</button>
        <br>
    </div>
</div>

<!-- Funciones globales de los selects -->
<script src="/../sistema/functionsselect.js"></script>
<!--importacion de las capas de informacion-->
<script src="/aplicacion/vista/agricola/agricola3/agricola3.js"></script>