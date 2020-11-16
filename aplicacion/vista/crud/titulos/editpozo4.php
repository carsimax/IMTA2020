
<input type="number" hidden id="tipo_id" name="tipo_id" value="4">
<!--VOLUMEN ANUAL EN m3 -->
<div class="col-sm">
    <p>Superficie (m2):</p>
    <input step=any type="number" class="form-control" name="superficie" id="superficie" 
            value="<?php echo $Pozo->getSup()?>" required>
</div>

<div class="col-sm">
    <p>Corriente o vaso:</p>
    <input  type="text" class="form-control" name="corriente" id="corriente" 
            value="<?php echo $Pozo->getCorriente()?>" required>
</div>
<div class="col-sm">
    <p>Número de anexo:</p>
    <input  name="anexo" id="anexo" type="number" class="form-control"
             value="<?php echo $Pozo->getAnexo()?>" required>
</div>