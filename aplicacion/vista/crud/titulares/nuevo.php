<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
?>
<!--Seccion principal de la pagina-->
<main class="page">
    <?php require_once(__DIR__ . "/../../plantillas/barra.php"); ?>
    <br>
    <!--Contenedor-->
    <div class="container">
        <div class="row">
            <!--Indicador-->
            <div class="col-sm">
                <br><br>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">Administración</li>
                    <li class="breadcrumb-item"><a onclick="cancelarForm()">Gestionar Base de datos</a></li>
                    <li class="breadcrumb-item active">Nuevo Propietario</li>
                </ol>
            </div>
        </div>
        <div class="row">
            <form action="" name="formTitular" onsubmit="valiFormNuevo(); return false">
                <input type="text" hidden id="Accion" name="Accion" value="Nuevo">
                <div class="col-sm">
                    <p>Nombre del titular:</p>
                    <input type="text" class="form-control" name="titular" id="titular" required>
                </div>
                <div class="col-sm">
                    <a onclick="cancelarForm()" class="btn btn-danger btn-fill  btn-block">Cancelar</a>
                </div>
                <div class="col-sm">
                    <button type="submit" class="btn btn-primary btn-fill  btn-block">Guardar</button>
                </div>
            </form>
        </div>
        <br>
    </div>
</main>

<?php require_once(__DIR__ . "/../../plantillas/footer.php"); ?>

<script>
    //Funcion de cancelar
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
                        $.redirect("/aplicacion/vista/crud/dbadmin.php", {tablaP: "Titulares"}, "POST");
                    }
                });
    }

    //Funcion de validar
    function valiFormNuevo() {
        swal({
            title: "¿Estás seguro?",
            text: "Se guardarán los cambios en la base de datos",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
                .then((willDelete) => {
                    if (willDelete) {
                        $.ajax({
                            type: 'GET',
                            url: '/aplicacion/controlador/titular.php',
                            data: $("form").serialize(),
                            success: function (response) {
                                switch (response) {
                                    case 'OK':
                                        swal("Buen Trabajo!", "Se han guardado los cambios", "success")
                                                .then((value) => {
                                                    $.redirect("/aplicacion/vista/crud/dbadmin.php", {tablaP: "Titulares"}, "POST");
                                                });
                                        break;
                                    case 'Ya se encuentra en la Base de Datos':
                                        swal("Algo Anda mal!", response, "error");
                                        break;
                                }
                            },
                        });
                    }
                });
    }
</script>
