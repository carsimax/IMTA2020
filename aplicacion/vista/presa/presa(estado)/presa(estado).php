<!--Carga de los organismos de Cuenca-->
<?php
//Requerimos del modelo de los organismos de cuanca disponibles
require_once(__DIR__ . "/../../../modelo/organismo.php");
$registros = new Organismo();
$Organismos = $registros->getTodos();
?>

<div class="row">
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
    <div class="col-sm">
        <label>Estado:</label>
        <select onchange="Estados()" name="Estados[]" multiple id="Estados">
        </select>
    </div>
</div>
<div class="row">
    <div class="col-sm">
        <br>
        <button id="consultar" onclick="Consultar()" disabled class="btn btn-gob text-light btn-fill  btn-block">Consultar</button>
        <br>
    </div>
</div>
<!-- Funciones globales de los selects -->
<script src="/sistema/functionsselect.js"></script>
<!--importacion de las capas de informacion-->
<script src="/aplicacion/vista/presa/presa(estado)/presa(estado).js"></script>