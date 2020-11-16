<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once(__DIR__ . "/../../../modelo/cuenca.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
$registros = new Cuenca;
$cuencas = $registros->getTodos();
?>
<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
    <h4>Cuenca Acuífero</h4>
</div>
<div class="row">
    <div class="col-sm">
        <p>Cuenca:</p>
        <select class="form-control" name="Cuenca_ID" id="Cuenca_ID">
            <?php
        foreach ($cuencas as $cuenca)
        {
            ?>
            <option value="<?php echo $cuenca['id_cuenca']; ?>"><?php echo $cuenca['nombre'] ?>
            </option>
            <?php } ?>
        </select>
    </div>
    <div class="col-sm">
        <p>Sub Cuenca:</p>
        <input type="text" class="form-control" name="Sub_Cuenca" id="Sub_Cuenca">
    </div>
</div>