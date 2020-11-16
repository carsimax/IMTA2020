<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
require_once(__DIR__ . "/../../../modelo/municipio.php");
$var = new Municipio();
$municipio = $var->getMuniId($_POST['ID']);
?>

<form action="" name="" onsubmit="">
    <input type="text" hidden id="Accion" name="Accion" value="Actualizar">
    <div class="row">
        <div class="col-sm">
            <label>ID:</label>
            <input readonly type="number" class="form-control" value="<?php echo ($_POST['ID']); ?>">
        </div>
        <div class="col-sm">
            <label>Estado:</label>
            <input readonly type="text" class="form-control" name="estado" id="nombre" value="<?php echo $municipio['estado']; ?>" required>
        </div>
        <div class="col-sm">
            <label>Municipio:</label>
            <input readonly type="text" class="form-control" name="municipio" id="nombre" value="<?php echo $municipio['municipio']; ?>" required>
        </div>
    </div>
</form>
