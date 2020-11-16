<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once (__DIR__ . "/../../../modelo/acuiferototal.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");

$Total = new AcuiferoTotal;
$Total = $Total->getTotal($_POST['ID']);
?>
<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
    <h4>Editar Total Acuífero</h4>
</div>
<form action="" name="formTotal" onsubmit="valiFormTotal(); return false">
    <input disabled hidden type="number" name="ID_Acuifero" id="ID_Acuifero" required
        value="<?php echo $Total->getAcuiferoId() ?>">
    <div class="row">
        <div class="col-sm">
            <p>Ejidales:</p>
            <input type="number" class="form-control" name="Ejidales" id="Ejidales"
                value="<?php echo $Total->getEjidales() ?>">
        </div>
        <div class="col-sm">
            <p>Pequeños Propietarios:</p>
            <input type="number" class="form-control" name="Pequenos_Propietarios" id="Pequenos_Propietarios"
                value="<?php echo $Total->getPequenosPropietarios() ?>">
        </div>
        <div class="col-sm">
            <p>Volumen Anual:</p>
            <input type="number" class="form-control" name="Volumen_Anual" id="Volumen_Anual"
                value="<?php echo $Total->getVolumenAnual() ?>">
        </div>
        <div class="col-sm">
            <p>Total Usuarios:</p>
            <input type="number" class="form-control" name="Total_Usuario" id="Total_Usuario"
                value="<?php echo $Total->getTotalUsuario() ?>">
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
function valiFormTotal() {
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
                    "Acuifero_ID=" + $("#ID_Acuifero").val() +
                    "&Ejidales=" + $("#Ejidales").val() +
                    "&Pequenos_Propietarios=" + $("#Pequenos_Propietarios").val() +
                    "&Volumen_Anual=" + $("#Volumen_Anual").val() +
                    "&Total_Usuario=" + $("#Total_Usuario").val() +
                    "&Accion=UpdateTotal";
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