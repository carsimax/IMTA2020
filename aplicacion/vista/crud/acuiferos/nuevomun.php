<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../modelo/municipio.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
$registros = new Municipio;
$Municipios = $registros->getTodos();
?>

<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Encabezado-->
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Editar Acuífero</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Nuevo Municipio</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <form action="" name="formAcuMun" onsubmit="valiFormMun(); return false">
                    <div class="row">
                        <div class="col-sm">
                            <p>ID Acuífero:</p>
                            <input disabled type="number" class="form-control" name="Acuifero_ID" id="Acuifero_ID"
                                required value="<?php echo $_POST['ID'] ?>">
                        </div>
                        <div class="col-sm">
                            <p>Municipio:</p>
                            <select class="form-control" name="Municipio_ID" id="Municipio_ID">
                                <?php
                        foreach ($Municipios as $Municipio) {
                            ?>
                                <option value="<?php echo $Municipio['id_municipio']; ?>">
                                    <?php echo $Municipio['nombre'] ?>
                                </option>
                                <?php } ?>
                            </select>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-sm">
                            <button onclick="cancelarFormMun(); return false"
                                class="btn btn-gob2 text-ligth  btn-block">Cancelar
                            </button>
                        </div>
                        <div class="col-sm">
                            <button class="btn btn-primary btn-fill  btn-block">Guardar</button>
                        </div>
                    </div>
                </form>

            </div>
        </main>
    </div>
</div>
<?php require_once(__DIR__ . "/../../plantillas/footer.php"); ?>

<form id="AcuForm" action="editar.php" method="post" hidden>
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
                window.location = '../dbadmin.php';
            }
        });
}

function cancelarFormMun() {
    swal({
            title: "¿Estás seguro?",
            text: "No se guardarán los cambios en la base de datos.",
            icon: "error",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                document.getElementById("AcuForm").submit();
            }
        });
}

function valiFormMun() {
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
                    "Acuifero_ID=" + $("#Acuifero_ID").val() +
                    "&Municipio_ID=" + $("#Municipio_ID").val() +
                    "&Accion=NuevoMun";
                $.ajax({
                    type: 'GET',
                    url: '/aplicacion/controlador/acuifero.php',
                    data: cadena,
                    success: function(response) {
                        if (response == 1) {
                            swal("Buen Trabajo!", "Se han guardado los cambios", "success")
                                .then((value) => {
                                    document.getElementById("AcuForm").submit();
                                });
                        }
                    },
                });
            }
        });
}
</script>