
<input type="number" hidden id="tipo_id" name="tipo_id" value="2">
<!--VOLUMEN ANUAL EN m3 -->
<div class="col-sm">
    <p>Volumen anual (m3):</p>
    <input step=any type="number" class="form-control" name="volumen" id="volumen" 
           value="<?php echo $Pozo->getVol_anual()?>" required>
</div>
<div class="col-sm">
    <p>Fuente:</p>
    <input type="text" class="form-control" name="fuente" id="fuente" 
           value="<?php echo $Pozo->getFuente()?>" required>
</div>
<div class="col-sm">
    <p>Afluente:</p>
    <input type="text" class="form-control" name="afluente" id="afluente" 
          value="<?php echo $Pozo->getAfluente()?>" required>
</div>
<div class="col-sm">
    <p>Número de anexo:</p>
    <input  name="anexo" id="anexo" type="number" class="form-control"
            value="<?php echo $Pozo->getAnexo()?>" required>
</div>