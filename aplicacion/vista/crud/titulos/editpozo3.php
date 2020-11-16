
<input type="number" hidden id="tipo_id" name="tipo_id" value="3">
<!--VOLUMEN ANUAL EN m3 -->
<div class="col-sm">
    <p>Volumen de descarga anual (m3):</p>
    <input step=any type="number" class="form-control" name="volumen" id="volumen"
           value="<?php echo $Pozo->getVol_anual()?>" required>
</div>
<div class="col-sm">
    <p>Volumen de descarga diario (m3):</p>
    <input step=any type="number" class="form-control" name="vol_diario" id="vol_diario" 
           value="<?php echo $Pozo->getVol_diario()?>" required>
</div>
<div class="col-sm">
    <p>Procedencia:</p>
    <input type="text" class="form-control" name="procedencia" id="procedencia" 
           value="<?php echo $Pozo->getProcedencia()?>" required>
</div>
<div class="col-sm">
    <p>Cuerpo receptor:</p>
    <input type="text" class="form-control" name="receptor" id="receptor" 
           value="<?php echo $Pozo->getReceptor()?>" required>
</div>
<div class="col-sm">
    <p>Tipo de descarga:</p>
    <input type="text" class="form-control" name="uso" id="uso" 
           value="<?php echo $Pozo->getUso()?>" required>
</div>
<div class="col-sm">
    <p>Afluente:</p>
    <input type="text" class="form-control" name="afluente" id="afluente" 
           value="<?php echo $Pozo->getAfluente()?>" required>
</div>
<div class="col-sm">
    <p>Forma de descarga:</p>
    <input type="text" class="form-control" name="forma_desc" id="forma_desc" 
           value="<?php echo $Pozo->getForma_desc()?>" required>
</div>

<div class="col-sm">
    <p>Número de anexo:</p>
    <input  name="anexo" id="anexo" type="number" class="form-control"
         value="<?php echo $Pozo->getAnexo()?>" required>
</div>