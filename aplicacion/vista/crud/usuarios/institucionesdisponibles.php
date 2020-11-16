<?php
require_once(__DIR__ . "/../../../modelo/publico.php");
/**
 * Obtenemos los registros de los organismos de cuenca
 */
$registros = new Publico();
$Instituciones = $registros->getTodos();
?>
<div class="col-sm">
<label>Institución:</label>
<select class="form-control" name="Nombre_Escuela" id="Nombre_Institucion">
    <?php
    foreach ($Instituciones as $Institucion)
    {
        ?>
        <option value="<?php echo $Institucion['institucion'] ?>"><?php echo $Institucion['institucion'] ?></option>
    <?php } ?>
</select>
</div>

<div class="col-sm">
    <b>¿Tu Institución no se encuentra registrada?</b>
    <a class="btn btn-primary btn-fill  btn-block" onclick="mostrarNI()">Agregar Institución</a>
    <br>
</div>