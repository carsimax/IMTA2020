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
        <select onchange="Municipios()" name="Municipios[]" multiple id="Municipios">
        </select>
    </div>
    <!--Fin del Select de los Estados-->

    <!--Select del Acuiferos-->
    <div class="col-sm">
        <label>Acuífero:</label>
        <select name="Acuiferos[]" multiple id="Acuiferos">
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
<script src="/aplicacion/vista/acuifero/acuifero(municipio)/acuifero(municipio).js"></script>