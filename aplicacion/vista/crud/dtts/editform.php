<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
;
require_once(__DIR__ . "/../../../modelo/dtt.php");
require_once(__DIR__ . "/../../../modelo/estado.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");

$registros = new Estado();
$estados = $registros->getTodos();
$dtt = new DTT();
$dtt = $dtt->getDTT($_POST['ID']);
?>

<!--Seccion principal de la pagina-->
<form action="" name="formPropietario" onsubmit="valiFormEditar('/aplicacion/controlador/dtt.php', $('form').serialize()); return false">
    <input type="text" hidden id="Accion" name="Accion" value="Actualizar">
    <div class="col-sm">
        <p>Clave:</p>                                        
        <input hidden type="text" name="clave" id="clave"
               value="<?php echo $dtt->getIdDtt() ?>">
        <input disabled type="text" class="form-control"
               value="<?php echo $dtt->getIdDtt() ?>" required>
    </div>
    <div class="col-sm">
        <p>Nombre:</p>
        <input type="text" class="form-control" name="nombre" id="nombre"
               value="<?php echo $dtt->getNombre() ?>" required>
    </div>                
    <div class="col-sm">
        <p>Estado:</p>
        <select class="form-control" name="estado_id" id="estado_id">
            <?php foreach ($estados as $estado) {
                if ($estado['id_estado'] == $dtt->getEstado_id()) {
                    ?>
                    <option selected
                            value="<?php echo $estado['id_estado']; ?>"><?php echo $estado['nombre']; ?></option>
                <?php } else {
                    ?>
                    <option value="<?php echo $estado['id_estado']; ?>"><?php echo $estado['nombre']; ?></option>
                    <?php }
                }
                ?>
        </select>
    </div>
    <hr>
    <div class="row">
        <div class="col-sm">
            <button class="btn btn-primary btn-fill  btn-block">Guardar</button>
        </div>
    </div>
</form>
<br>

<script type="text/javascript" src="/aplicacion/vista/crud/alerts.js"></script>