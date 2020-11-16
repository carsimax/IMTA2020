<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once(__DIR__ . "/../../../modelo/estado.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
$registros = new Estado;
$estados = $registros->getTodos();
?>


<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
    <h4>Nuevo Acuífero</h4>
</div>
<div class="row">
    <div class="col-sm">
        <p>ID Acuífero:</p>
        <input type="number" class="form-control" name="ID_Acuifero" id="ID_Acuifero" required>
    </div>
    <div class="col-sm">
        <p>Nombre Acuífero:</p>
        <input type="text" class="form-control" name="Nombre_Acuifero" id="Nombre_Acuifero" required>
    </div>
    <div class="col-sm">
        <p>Estado:</p>
        <select class="form-control" name="Estado_ID" id="Estado_ID">
            <?php
        foreach ($estados as $estado)
        {
            ?>
            <option value="<?php echo $estado['id_estado']; ?>"><?php echo $estado['nombre']; ?></option>
            <?php } ?>
        </select>
    </div>
    <div class="col-sm">
        <p>Fecha DOF:</p>
        <input type="date" class="form-control" name="Fecha_DOF" id="Fecha_DOF" required>
    </div>
    <div class="col-sm">
        <p>Fecha REPDA:</p>
        <input type="date" class="form-control" name="Fecha_REPDA" id="Fecha_REPDA" required>
    </div>
</div>
<div class="row">
    <div class="col-sm">
        <p>Área:</p>
        <input type="number" step="any" class="form-control" name="area" id="area" required>
    </div>
    <div class="col-sm">
        <p>Longitud:</p>
        <input type="number" step="any" class="form-control" name="Longitud" id="Longitud" required>
    </div>
    <div class="col-sm">
        <p>Latitud:</p>
        <input type="number" step="any" class="form-control" name="Latitud" id="Latitud" required>
    </div>
</div>