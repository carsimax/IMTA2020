<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once (__DIR__ . "/../../../modelo/acuiferodisp.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
$Disponibilidad = new AcuiferoDisp;
$Disponibilidad = $Disponibilidad->getDisp($_POST['ID']);
?>
<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
    <h4>Editar Disponibilidad Acuífero</h4>
</div>

<form action="" name="formDisp" onsubmit="valiFormDisp(); return false">
    <input disabled hidden type="number" name="ID_Acuifero" id="ID_Acuifero" required
        value="<?php echo $Disponibilidad->getAcuiferoId() ?>">
    <div class="row">
        <div class="col-sm">
            <p>R:</p>
            <input step=any type="number" class="form-control" name="R" id="R" required
                value="<?php echo $Disponibilidad->getR() ?>">
        </div>
        <div class="col-sm">
            <p>DNC:</p>
            <input step=any type="number" class="form-control" name="DNC" id="DNC" required
                value="<?php echo $Disponibilidad->getDnc() ?>">
        </div>
        <div class="col-sm">
            <p>VCAS:</p>
            <input step=any type="number" class="form-control" name="VCAS" id="VCAS" required
                value="<?php echo $Disponibilidad->getVcas() ?>">
        </div>
        <div class="col-sm">
            <p>VEALA:</p>
            <input step=any type="number" class="form-control" name="VEALA" id="VEALA" required
                value="<?php echo $Disponibilidad->getVeala() ?>">
        </div>
    </div>
    <div class="row">
        <div class="col-sm">
            <p>VAPTYR:</p>
            <input step=any type="number" class="form-control" name="VAPTYR" id="VAPTYR" required
                value="<?php echo $Disponibilidad->getVaptyr() ?>">
        </div>
        <div class="col-sm">
            <p>VAPRH:</p>
            <input step=any type="number" class="form-control" name="VAPRH" id="VAPRH" required
                value="<?php echo $Disponibilidad->getVaprh() ?>">
        </div>
        <div class="col-sm">
            <p>DMA:</p>
            <input step=any type="number" class="form-control" name="DMA" id="DMA" required
                value="<?php echo $Disponibilidad->getDma() ?>">
        </div>
        <div class="col-sm">
            <p>Año de Actualizacion:</p>
            <input type="number" class="form-control" name="Anio_Actualizacion" id="Anio_Actualizacion" required
                value="<?php echo $Disponibilidad->getAnioActualizacion() ?>">
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
function valiFormDisp() {
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
                    "&R=" + $("#R").val() +
                    "&DNC=" + $("#DNC").val() +
                    "&VCAS=" + $("#VCAS").val() +
                    "&VEALA=" + $("#VEALA").val() +
                    "&VAPTYR=" + $("#VAPTYR").val() +
                    "&VAPRH=" + $("#VAPRH").val() +
                    "&DMA=" + $("#DMA").val() +
                    "&Anio_Actualizacion=" + $("#Anio_Actualizacion").val() +
                    "&Accion=UpdateDisponibilidad";
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