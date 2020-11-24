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
require_once(__DIR__ . "/../../../modelo/fuentemodulo.php");
require_once(__DIR__ . "/../../../modelo/inventariodistrito.php");
//fuentes
$registros = new FuenteModulo();
$Fuentes = $registros->getFuentes();
//Organismos de cuenca de los distritos de rego
$registros = new InventarioDistrito();
$Organismos= $registros->getDistritos();


?>
<!--Select del organismo de cuenca-->
<div class="row">
    <div class="col-sm">
        <label>Organismo de Cuenca:</label>
        <select onchange="Organismos()" name="Organismos[]" multiple id="Organismos">
            <?php
            foreach ($Organismos as $Organismo) {
                ?>
                <option value="<?php echo $Organismo['id_organismo'] ?>"><?php echo $Organismo['numero'] ?>
                    .<?php echo $Organismo['organismo'] ?> </option>
            <?php } ?>
        </select>
    </div>
    <!--Select del Estados-->
    <div class="col-sm">
        <label>Estado:</label>
        <select onchange="Estados()" name="Estados[]" multiple id="Estados">
        </select>
    </div>
    <!--Select del los ciclos-->
    <div class="col-sm">
        <label>Distritos de Riego:</label>
        <select onchange="getModulos()" name="Distritos[]" multiple id="Distritos">
        </select>
    </div>
    <div class="col-sm">
        <label>Modulos:</label>
        <select name="Modulos[]" onchange="Modulos()" multiple id="Modulos">
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
<!-- Funciones globales del select -->
<script src="/sistema/functionsselect.js"></script>
<!--importacion de las capas de informacion-->
<script src="/aplicacion/vista/inventario/inventario2/inventario2.js"></script>
