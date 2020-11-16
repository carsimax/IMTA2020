<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once (__DIR__ . "/../../../modelo/acuiferohidro.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");

$Hidro = new AcuiferoHidro;
$Hidro = $Hidro->getHidro($_POST['ID']);
?>
<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
    <h4>Editar información hidrogeológica Acuífero</h4>
</div>
<form action="" name="formCoordenadas" onsubmit="valiFormHidro(); return false">
    <input disabled hidden type="number" name="ID_Acuifero" id="ID_Acuifero" required
        value="<?php echo $Hidro->getAcuiferoId() ?>">
    <div class="row">
        <div class="col-sm">
            <p>pNEstaticoMin:</p>
            <input step=any type="number" class="form-control" name="pNEstaticoMin" id="pNEstaticoMin"
                value="<?php echo $Hidro->getPNestaticoMin() ?>">
        </div>
        <div class="col-sm">
            <p>pNEstaticoMax:</p>
            <input step=any type="number" class="form-control" name="pNEstaticoMax" id="pNEstaticoMax"
                value="<?php echo $Hidro->getPNestaticomax() ?>">
        </div>
        <div class="col-sm">
            <p>pNDinamicoMin:</p>
            <input step=any type="number" class="form-control" name="pNDinamicoMin" id="pNDinamicoMin"
                value="<?php echo $Hidro->getPNdinamicomin() ?>">
        </div>
        <div class="col-sm">
            <p>pNDinamicoMax:</p>
            <input step=any type="number" class="form-control" name="pNDinamicoMax" id="pNDinamicoMax"
                value="<?php echo $Hidro->getPNdinamicomax() ?>">
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
function valiFormHidro() {
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
                    "&pNEstaticoMin=" + $("#pNEstaticoMin").val() +
                    "&pNEstaticoMax=" + $("#pNEstaticoMax").val() +
                    "&pNDinamicoMin=" + $("#pNDinamicoMin").val() +
                    "&pNDinamicoMax=" + $("#pNDinamicoMax").val() +
                    "&Accion=UpdateHidro";
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