<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once (__DIR__ . "/../../../modelo/acuiferopob.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");

$Poblacion = new AcuiferoPob;
$Poblacion = $Poblacion->getPoblacion($_POST['ID']);
?>


<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
    <h4>Editar Población Acuífero</h4>
</div>

<form action="" name="formPoblacion" onsubmit="valiFormPoblacion(); return false">
    <input disabled hidden type="number" name="ID_Acuifero" id="ID_Acuifero" required
        value="<?php echo $Poblacion->getAcuiferoId() ?>">
    <div class="row">
        <div class="col-sm">
            <p>Número de habitantes:</p>
            <input type="number" class="form-control" name="Num_Habitantes" id="Num_Habitantes"
                value="<?php echo $Poblacion->getNumHabitantes() ?>">
        </div>
        <div class="col-sm">
            <p>Número de habitantes Rural:</p>
            <input type="number" class="form-control" name="Num_Habitantes_Rural" id="Num_Habitantes_Rural"
                value="<?php echo $Poblacion->getNumHabitantesRural() ?>">
        </div>
        <div class="col-sm">
            <p>Número de habitantes Urbano:</p>
            <input type="number" class="form-control" name="Num_Habitantes_Urbana" id="Num_Habitantes_Urbana"
                value="<?php echo $Poblacion->getRumHabitantesUrbana() ?>">
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
function valiFormPoblacion() {
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
                    "&Num_Habitantes=" + $("#Num_Habitantes").val() +
                    "&Num_Habitantes_Rural=" + $("#Num_Habitantes_Rural").val() +
                    "&Num_Habitantes_Urbana=" + $("#Num_Habitantes_Urbana").val() +
                    "&Accion=UpdatePoblacion";
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