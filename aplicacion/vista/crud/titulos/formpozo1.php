<?php
require_once(__DIR__ . "/../../../modelo/acuifero.php");
//Obtenciom de la lista de acuiferos
$registros = new Acuifero();
$Acuiferos = $registros->getTodos2();
?>
<input type="number" hidden id="tipo_id" name="tipo_id" value="1">
<!--VOLUMEN ANUAL EN m3 -->
<div class="col-sm">
    <p>Volumen anual (m3):</p>
    <input step=any type="number" class="form-control" name="volumen" id="volumen" required>
</div>
<!--Acuifero-->
<div class="form-group col-md-4 ">
    <p>Acuífero:</p>
    <select class="form-control" name="acuifero_id" id="acuifero_id" required>
        <?php
        foreach ($Acuiferos as $Acuifero)
        {
            ?>
            <option value="<?php echo $Acuifero['id_acuifero']; ?>"><?php echo $Acuifero['nombre']; ?></option>
        <?php } ?>
    </select>
</div>
<!--Numero de anexo-->
<div class="col-sm">
    <p>Número de anexo:</p>
    <input  name="anexo" id="anexo" type="number" class="form-control">
</div>
