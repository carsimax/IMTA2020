<!--Llamamos a la funcion se sesion-->
<?php
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
?>



<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Encabezado-->
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarForm()">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Nuevo Acuífero</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <form enctype="multipart/form-data" name="formCuenca" onsubmit="valiFormNuevo(); return false">
                    <input type="text" hidden id="Accion" name="Accion" value="Nuevo">
                    <!--Formulario Datos Generales-->
                    <?php require_once(__DIR__ . "/nuevoform.php"); ?>
                    <!--Formulario de disponibilidad-->
                    <?php require_once(__DIR__ . "/nuevodisp.php"); ?>
                    <!--Formulario Hidrogeologica-->
                    <?php require_once(__DIR__ . "/nuevohidro.php"); ?>
                    <!--Formulario Poblacion-->
                    <?php require_once(__DIR__ . "/nuevopob.php"); ?>
                    <!--Cuenca-->
                    <?php require_once(__DIR__ . "/nuevocuenca.php"); ?>
                    <!--Total-->
                    <?php require_once(__DIR__ . "/nuevototal.php"); ?>
                    <hr>
                    <div class="row">
                        <div class="col-sm">
                            <a onclick="cancelarForm()" class="btn btn-gob2 text-light btn-block">Cancelar</a>
                        </div>
                        <div class="col-sm">
                            <button type="submit" class="btn btn-primary btn-fill  btn-block">Guardar</button>
                        </div>
                    </div>
                </form>
                <br>
            </div>
        </main>
    </div>
</div>
<?php require_once(__DIR__ . "/../../plantillas/footer.php"); ?>

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
                        $.redirect("/aplicacion/vista/crud/dbadmin.php", {
                            tablaP: "Acuiferos"
                        }, "POST");
                    }
                });
    }

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
                            url: '../../../controlador/acuifero.php',
                            data: $("form").serialize(),
                            success: function (response) {
                                if (response == 'OK') {
                                    swal("Buen Trabajo!", "Se han guardado los cambios", "success")
                                            .then((value) => {
                                                $.redirect("/aplicacion/vista/crud/dbadmin.php", {
                                                    tablaP: "Acuiferos"
                                                }, "POST");
                                            });
                                } else {
                                    swal("Algo Anda mal!", response, "error");
                                }
                            }
                        });
                    }
                });
    }
</script>