<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once (__DIR__ . "/../../../modelo/acuifero.php");
require_once (__DIR__ . "/../../../modelo/estado.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");

$Acuifero = new Acuifero;
$Acuifero = $Acuifero->getAcuifero($_POST['ID']);
$registros = new Estado;
$estados = $registros->getTodos();
?>

<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
    <h4>Editar Acuífero</h4>
</div>
<form action="" name="formAcu" onsubmit="valiForm(); return false">
    <div class="row">
        <div class="col-sm">
            <p>ID Acuífero:</p>
            <input disabled type="number" class="form-control" name="ID_Acuifero" id="ID_Acuifero" required
                value="<?php echo $Acuifero->getIDAcuifero() ?>">
        </div>
        <div class="col-sm">
            <p>Nombre Acuífero:</p>
            <input type="text" class="form-control" name="Nombre_Acuifero" id="Nombre_Acuifero" required
                value="<?php echo $Acuifero->getNombre() ?>">
        </div>
        <div class="col-sm">
            <p>Estado:</p>
            <select class="form-control" name="Estado_ID" id="Estado_ID">
                <?php
            foreach ($estados as $estado)
            {
                if ($estado['id_estado'] == $Acuifero->getEstadoID())
                {
                    ?>
                <option selected value="<?php echo $estado['id_estado']; ?>"><?php echo $estado['nombre']; ?></option>
                <?php
                }
                else
                {
                    ?>
                <option value="<?php echo $estado['id_estado']; ?>"><?php echo $estado['nombre']; ?></option>
                <?php
                }
            }
            ?>
            </select>
        </div>
        <div class="col-sm">
            <p>Área:</p>
            <input type="number" step="any" class="form-control" name="area" id="area"
                value="<?php echo $Acuifero->getArea() ?>">
        </div>
    </div>
    <div class="row">
        <div class="col-sm">
            <p>Fecha DOF:</p>
            <input type="date" class="form-control" name="Fecha_DOF" id="Fecha_DOF" required
                value="<?php echo $Acuifero->getFechaDOF() ?>">
        </div>
        <div class="col-sm">
            <p>Fecha REPDA:</p>
            <input type="date" class="form-control" name="Fecha_REPDA" id="Fecha_REPDA" required
                value="<?php echo $Acuifero->getFechaREPDA() ?>">
        </div>
        <div class="col-sm">
            <p>Longitud:</p>
            <input type="number" step="any" class="form-control" name="Longitud" id="Longitud"
                value="<?php echo $Acuifero->getLongitud() ?>">
        </div>
        <div class="col-sm">
            <p>Latitud:</p>
            <input type="number" step="any" class="form-control" name="Latitud" id="Latitud"
                value="<?php echo $Acuifero->getLatitud() ?>">
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-sm">
            <button class="btn btn-primary btn-fill  btn-block">Guardar</button>
        </div>
    </div>
</form>

<script>
function valiForm() {
    swal({
            title: "¿Estás seguro?",
            text: "Se guardarán los cambios en la base de datos",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                cadena =
                    "ID_Acuifero=" + $("#ID_Acuifero").val() +
                    "&Nombre_Acuifero=" + $("#Nombre_Acuifero").val() +
                    "&Estado_ID=" + $("#Estado_ID").val() +
                    "&Fecha_DOF=" + $("#Fecha_DOF").val() +
                    "&Fecha_REPDA=" + $("#Fecha_REPDA").val() +
                    "&Longitud=" + $("#Longitud").val() +
                    "&Latitud=" + $("#Latitud").val() +
                    "&Area=" + $("#area").val() +
                    "&Accion=Update";
                $.ajax({
                    type: 'GET',
                    url: '/aplicacion/controlador/acuifero.php',
                    data: cadena,
                    success: function(response) {
                        if (response == 1) {
                            swal("Buen Trabajo!", "Se han guardado los cambios", "success");
                        }
                    },
                });
            }
        });
}
</script>