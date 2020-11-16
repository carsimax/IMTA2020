<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once (__DIR__ . "/../../../modelo/acuiferocuenca.php");
require_once (__DIR__ . "/../../../modelo/cuenca.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");

$Acuifero = new AcuiferoCuenca;
$Acuifero = $Acuifero->getCuenca($_POST['ID']);
$registros = new Cuenca;
$cuencas = $registros->getTodos();
?>

<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
    <h4>Editar Cuenca Acuífero</h4>
</div>

<form action="" name="formCuenca" onsubmit="valiFormCuenca(); return false">
    <input disabled hidden type="number" name="ID_Acuifero" id="ID_Acuifero" required
        value="<?php echo $Acuifero->getAcuiferoId() ?>">
    <div class="row">
        <div class="col-sm">
            <p>Cuenca:</p>
            <select class="form-control" name="Cuenca_ID" id="Cuenca_ID">
                <?php
            foreach ($cuencas as $cuenca)
            {
                if ($cuenca['id_cuenca'] == $Acuifero->getCuencaId())
                {
                    ?>
                <option selected value="<?php echo $cuenca['id_cuenca']; ?>">
                    <?php echo $cuenca['nombre'] ?></option>
                <?php
                }
                else
                {
                    ?>
                <option value="<?php echo $cuenca['id_cuenca']; ?>"><?php echo $cuenca['nombre'] ?>
                </option>
                <?php
                }
            }
            ?>
            </select>
        </div>
        <div class="col-sm">
            <p>Sub Cuenca:</p>
            <input type="text" class="form-control" name="Sub_Cuenca" id="Sub_Cuenca"
                value="<?php echo $Acuifero->getSubcuenca(); ?>">
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
function valiFormCuenca() {
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
                    "&Cuenca_ID=" + $("#Cuenca_ID").val() +
                    "&Sub_Cuenca=" + $("#Sub_Cuenca").val() +
                    "&Accion=UpdateCuenca";
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