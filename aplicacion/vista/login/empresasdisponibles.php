<?php
require_once(__DIR__ . "/../../modelo/privado.php");
/**
 * Obtenemos los registros de los organismos de cuenca
 */
$registros = new Privado();
$Empresas = $registros->getTodos();
?>

<label>Empresa:</label>
<select class="form-control" name="Nombre_Escuela" id="Nombre_Empresa">
    <?php
    foreach ($Empresas as $Empresa)
    {
        ?>
        <option value="<?php echo $Empresa['empresa'] ?>"><?php echo $Empresa['empresa'] ?></option>
    <?php } ?>
</select>
    <b>¿Tu Empresa no se encuentra registrada?</b>
    <a class="btn btn-gob text-light  btn-block" onclick="mostrarNP()">Agregar Empresa</a>