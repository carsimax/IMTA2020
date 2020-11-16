<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../modelo/anio.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
$reg = new Anio();
$Anios = $reg->getAnios();
?>

<main class="page">
    <?php require_once(__DIR__ . "/../../plantillas/barra.php"); ?>
    <br>
    <!--Contenedor-->
    <div class="container">
        <div class="row">
            <!--Indicador-->
            <div class="col-sm">
                <br><br>
                <div class="col-sm">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">Administración</li>
                        <li class="breadcrumb-item"><a onclick="cancelarForm()">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item"><a onclick="cancelarFormReg()">Editar Distrito</a></li>
                        <li class="breadcrumb-item active">Nuevo Registro</li>
                    </ol>
                </div>
            </div>
        </div>
        <div class="row">
            <!--Formulario Datos Generales-->
            <div class="col-sm">
                <h2>Nuevo Registro</h2>
                <p>Información de Registro.</p>
                <form action="" onsubmit="valiForm(); return false">
                    <div class="col-sm">
                        <p>ID Distrito:</p>
                        <input disabled type="text" class="form-control" name="distrito_riego_id" id="distrito_riego_id"
                               value="<?php echo $_POST['ID'] ?>">
                    </div>
                    <div class="col-sm">
                        <p>Superficie Total :</p>
                        <input step="any" type="number" class="form-control" name="sup_tot" id="sup_tot" required>
                    </div>
                    <div class="col-sm">
                        <p>Superficie regada con agua superficial:</p>
                        <input step="any" type="number" class="form-control" name="sup_rasup" id="sup_rasup" required>
                    </div>
                    <div class="col-sm">
                        <p>Sup. regada con agua subterránea:</p>
                        <input step="any" type="number" class="form-control" name="sup_rasub" id="sup_rasub" required>
                    </div>
                    <div class="col-sm">
                        <p>Superficie regada total:</p>
                        <input step="any" type="number" class="form-control" name="sup_rtot" id="sup_rtot" required>
                    </div>
                    <div class="col-sm">
                        <p>Volumen de agua superficial:</p>
                        <input step="any" type="number" class="form-control" name="vol_asup" id="vol_asup" required>
                    </div>
                    <div class="col-sm">
                        <p>Volumen de agua subterránea:</p>
                        <input step="any" type="number" class="form-control" name="vol_asub" id="vol_asub" required>
                    </div>
                    <div class="col-sm">
                        <p>Volumen de agua total:</p>
                        <input step="any" type="number" class="form-control" name="vol_atot" id="vol_atot" required>
                    </div>
                    <div class="col-sm">
                        <p>Información del Año:</p>
                        <select class="form-control" name="anioagricola_id" id="anioagricola_id">
                            <?php
                            foreach ($Anios as $Anio)
                            {
                                ?>
                                <option value="<?php echo $Anio['id_anio']; ?>"><?php echo $Anio['anio_agricola']; ?></option>
<?php } ?>
                        </select>
                    </div>
                    <br>
                    <div class="col-sm">
                        <a onclick="cancelarFormReg()" class="btn btn-warning btn-fill  btn-block">Cancelar</a>
                    </div>
                    <div class="col-sm">
                        <button type="submit" class="btn btn-primary btn-fill  btn-block">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
        <br>
    </div>
</main>
<?php require_once(__DIR__ . "/../../plantillas/footer.php"); ?>
<form id="RegForm" action="editar.php" method="post" hidden>
    <input name="ID" type="text" value="<?php echo $_POST['ID'] ?>" hidden>
</form>

<script>
    function cancelarForm() {
        swal({
            title: "¿Estás seguro?",
            text: "No se guardarán los cambios en la base de datos.",
            icon: "error",
            buttons: true,
            dangerMode: true,
        })
                .then((willDelete) => {
                    if (willDelete) {
                        $.redirect("/aplicacion/vista/crud/dbadmin.php", {tablaP: "DistritosdeRiego"}, "POST");
                    }
                });
    }

    function cancelarFormReg() {
        swal({
            title: "¿Estás seguro?",
            text: "No se guardarán los cambios en la base de datos.",
            icon: "error",
            buttons: true,
            dangerMode: true,
        })
                .then((willDelete) => {
                    if (willDelete) {
                        document.getElementById("RegForm").submit();
                    }
                });
    }

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
                                "distrito_riego_id=" + $("#distrito_riego_id").val() +
                                "&sup_tot=" + $("#sup_tot").val() +
                                "&sup_rasup=" + $("#sup_rasup").val() +
                                "&sup_rasub=" + $("#sup_rasub").val() +
                                "&sup_rtot=" + $("#sup_rtot").val() +
                                "&vol_asup=" + $("#vol_asup").val() +
                                "&vol_asub=" + $("#vol_asub").val() +
                                "&vol_atot=" + $("#vol_atot").val() +
                                "&anioagricola_id=" + $("#anioagricola_id").val() +
                                "&Accion=NuevoReg";
                        $.ajax({
                            type: 'GET',
                            url: '/aplicacion/controlador/distritoriego.php',
                            data: cadena,
                            success: function (response) {
                                if (response == 1) {
                                    swal("Buen Trabajo!", "Se han guardado los cambios", "success")
                                            .then((value) => {
                                                document.getElementById("RegForm").submit();
                                            });
                                } else {
                                    swal("Ya existe información registrada con este año", "Intenta de nuevo", "error")
                                }
                            },
                        });
                    }
                });
    }

</script>
