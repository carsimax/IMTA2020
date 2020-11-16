<?php
require_once(__DIR__ . "/../../../modelo/privado.php");
/**
 * Obtenemos los registros de los organismos de cuenca
 */
$registros = new Privado();
$Empresas = $registros->getTodos();
?>
<div class="col-sm">
<label>Empresa:</label>
<select class="form-control" name="Nombre_Escuela" id="Nombre_Empresa">
    <?php
    foreach ($Empresas as $Empresa)
    {
        ?>
        <option value="<?php echo $Empresa['empresa'] ?>"><?php echo $Empresa['empresa'] ?></option>
    <?php } ?>
</select>
</div>

<div class="col-sm">
    <b>¿Tu Empresa no se encuentra registrada?</b>
    <a class="btn btn-primary btn-fill  btn-block" onclick="mostrarNP()">Agregar Empresa</a>
    <br>
</div>