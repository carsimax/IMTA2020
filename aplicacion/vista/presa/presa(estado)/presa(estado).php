<!--Carga de los organismos de Cuenca-->
<?php
//Requerimos del modelo de los organismos de cuanca disponibles
require_once(__DIR__ . "/../../../modelo/organismo.php");
$registros = new Organismo();
//Obtenemos todos los registros
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

    <!--Select del Presas-->
    <div class="col-sm">
        <label>Presa:</label>
        <select name="Presas[]" multiple id="Presas">
        </select>
    </div>
    <!--Fin del Select de los Estados-->
    <!--Select del Acuiferos-->
</div>
<div class="row">
    <div class="col-sm">
        <br>
        <button id="consultar" onclick="Consultar()"
            class="btn btn-gob text-light btn-fill  btn-block">Consultar</button>
        <br>
    </div>
</div>
<!--importacion de las capas de informacion-->
<script src="/aplicacion/vista/presa/presa(estado)/presa(estado).js"></script>