<?php
require_once(__DIR__ . "/../../modelo/educativo.php");
/**
 * Obtenemos los registros de los organismos de cuenca
 */
$registros = new Educativo();
$Escuelas = $registros->getTodos();
?>
<p>Escuela:</p>
<select class="form-control" name="Nombre_Escuela" id="Nombre_Escuela">
    <?php
    foreach ($Escuelas as $Escuela)
    {
        ?>
        <option value="<?php echo $Escuela['escuela'] ?>"><?php echo $Escuela['escuela'] ?></option>
    <?php } ?>
</select>
    <b>¿Tu escuela no se encuentra registrada?</b>
    <a class="btn btn-gob text-light btn-block" onclick="mostrarNE()">Agregar Escuela</a>