<?php
require_once(__DIR__ . "/../../modelo/publico.php");
/**
 * Obtenemos los registros de los organismos de cuenca
 */
$registros = new Publico();
$Instituciones = $registros->getTodos();
?>
<label>Institución:</label>
<select class="form-control" name="Nombre_Escuela" id="Nombre_Institucion">
    <?php
    foreach ($Instituciones as $Institucion) {
        ?>
        <option value="<?php echo $Institucion['institucion'] ?>"><?php echo $Institucion['institucion'] ?></option>
    <?php } ?>
</select>
<b>¿Tu Institución no se encuentra registrada?</b>
<a class="btn btn-gob text-light  btn-block" onclick="mostrarNI()">Agregar Institución</a>