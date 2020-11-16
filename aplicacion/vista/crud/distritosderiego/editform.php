<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once(__DIR__ . "/../../../modelo/distritoriego.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
require_once(__DIR__ . "/../../../modelo/organismo.php");
require_once(__DIR__ . "/../../../modelo/estado.php");
$organismos = new Organismo();
$organismos = $organismos->getTodos();
$estados = new Estado();
$estados = $estados->getTodos();
$dr = new DistritoRiego();
$dr = $dr->getDR($_POST['ID']);
?>

<form action="" name="" onsubmit="">
    <input type="text" hidden id="Accion" name="Accion" value="Actualizar">
    <h4 class="panel-title">Información del distrito</h4>
    <div class="row">
        <div class="col-sm">
            <p>ID:</p>
            <input disabled type="text" class="form-control" name="id_distrito_riego" id="id_distrito_riego" value="<?php echo $dr->getIdDistritoRiego() ?>" required>
        </div>
        <div class="col-sm">
            <p>Distrito de Riego:</p>
            <input type="text" class="form-control" name="nom_dr" id="nom_dr"
                   value="<?php echo $dr->getNomDr() ?>" required>
        </div> 
    </div>
    <div class="row">
        <div class="col-sm">
            <p>Organismo de cuenca:</p>
            <select class="form-control" name="organismo_id" id="organismo_id">
                <?php
                foreach ($organismos as $organismo) {
                    if ($organismo['id_organismo'] == $dr->getOrganismoId()) {
                        ?>
                        <option selected value="<?php echo $organismo['id_organismo']; ?>"><?php echo $organismo['nombre']; ?></option> 
                    <?php } else { ?>
                        <option value="<?php echo $organismo['id_organismo']; ?>"><?php echo $organismo['nombre']; ?></option> 
                        <?php
                    }
                }
                ?>
            </select>
        </div>
        <div class="col-sm">
            <p>Estado:</p>
            <select class="form-control" name="estado_id" id="estado_id">
                <?php
                foreach ($estados as $estado) {
                    if ($estado['id_estado'] == $dr->getEstadoId()) {
                        ?>
                        <option selected value="<?php echo $estado['id_estado']; ?>"><?php echo $estado['nombre']; ?></option> 
                    <?php } else { ?>
                        <option value="<?php echo $estado['id_estado']; ?>"><?php echo $estado['nombre']; ?></option> 
                        <?php
                    }
                }
                ?>

            </select>
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-sm">
            <button class="btn btn-primary btn-fill  btn-block">Guardar</button>
        </div>
    </div>
</form>
<br>


