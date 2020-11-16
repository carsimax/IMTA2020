<?php
require_once(__DIR__ . "/../../../modelo/acuifero.php");
//Obtenciom de la lista de acuiferos
$registros = new Acuifero();
$Acuiferos = $registros->getTodos2();
?>

<!--VOLUMEN ANUAL EN m3 -->
                <div class="col-sm">
                    <p>Volumen anual (m3):</p>
                    <input step=any type="number" class="form-control" name="volumen" id="volumen" required
                           value="<?php echo $Pozo->getVol_anual() ?>">
                </div>
                <!--Acuifero-->
                <div class="form-group col-md-3 ">
                    <p>Acuífero:</p>
                    <select class="form-control" name="acuifero_id" id="acuifero_id" required>
                        <?php
                        foreach ($Acuiferos as $Acuifero)
                        {
                            if ($Pozo->getAcuifero_id() == $Acuifero['id_acuifero'])
                            {
                                ?>
                                <option selected value="<?php echo $Acuifero['id_acuifero']; ?>"><?php echo $Acuifero['nombre']; ?></option>
                                <?php
                            }
                            else
                            {
                                ?>
                                <option value="<?php echo $Acuifero['id_acuifero']; ?>"><?php echo $Acuifero['nombre']; ?></option>
                                <?php
                            }
                        }
                        ?>
                    </select>
                </div>
                <!--Numero de anexo-->
                <div class="col-sm">
                    <p>Número de anexo:</p>
                    <input  name="anexo" id="anexo" type="number" class="form-control" value="<?php echo $Pozo->getAnexo() ?>" required="">
                </div>