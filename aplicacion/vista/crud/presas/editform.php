<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once(__DIR__ . "/../../../modelo/estado.php");
require_once(__DIR__ . "/../../../modelo/presa.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
$registros = new Estado();
$Estados = $registros->getTodos();
$Presa = new Presa();
$Presa = $Presa->getPresa($_POST['ID']);
?>

<form action="" name="formPresa" onsubmit="valiFormEditar('/aplicacion/controlador/distritoriego.php', $('form').serialize()); return false">
    <input type="text" hidden id="Accion" name="Accion" value="Actualizar">
    <h4 class="panel-title">Información del distrito</h4>
    <div class="row">
        <div class="col-sm">
            <p>ID Presa:</p>
            <input hidden name="id_presa" id="id_presa" type="number"
                   value="<?php echo $Presa->getIdPresa() ?>">
            <input disabled type="number" class="form-control"
                   value="<?php echo $Presa->getIdPresa() ?>" required>
        </div>
        <div class="col-sm">
            <p>Nombre Oficial:</p>
            <input type="text" class="form-control" name="nom_oficial" id="nom_oficial" required
                   value="<?php echo $Presa->getNomOficial() ?>">
        </div>
        <div class="col-sm">
            <p>Nombre Común:</p>
            <input type="text" class="form-control" name="nom_comun" id="nom_comun"
                   value="<?php echo $Presa->getNomComun() ?>">
        </div>
    </div>
    <div class="row">
        <div class="col-sm">
            <p>Corriente:</p>
            <input type="text" class="form-control" name="corriente" id="corriente" required
                   value="<?php echo $Presa->getCorriente() ?>">
        </div>
        <div class="col-sm">
            <p>Año de termino:</p>
            <input type="number" class="form-control" name="anio_term" id="anio_term"
                   value="<?php echo $Presa->getAnioTerm() ?>">
        </div>
        <div class="col-sm">
            <p>Estado:</p>
            <select class="form-control" name="edo_id" id="edo_id">

                <?php
                foreach ($Estados as $estado) {
                    if ($estado['id_estado'] == $Presa->getEdo()) {
                        ?>
                        <option selected value="<?php echo $estado['id_estado']; ?>"><?php echo $estado['nombre']; ?></option>
                        <?php
                    } else {
                        ?>
                        <option value="<?php echo $estado['id_estado']; ?>"><?php echo $estado['nombre']; ?></option>
                        <?php
                    }
                }
                ?>
            </select>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-sm">
            <button class="btn btn-gob btn-fill  btn-block">Guardar</button>
        </div>
    </div>
    <br>
</form>
<script type="text/javascript" src="/aplicacion/vista/crud/alerts.js"></script>



