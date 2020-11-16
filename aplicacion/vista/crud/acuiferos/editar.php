<!--Llamamos a la funcion se sesion-->
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once(__DIR__ . "/../../../controlador/sesion.php");
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
?>
<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Encabezado-->
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a onclick="cancelarForm()">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Editar Acuífero</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <a onclick="cancelarForm()" class="btn btn-gob2 text-light btn-block">Regresar</a>
                <hr>
                <!--Formulario Datos Generales-->

                <?php require_once(__DIR__ . "/editarform.php"); ?>

                <!--Formulario de disponibilidad-->

                <?php require_once(__DIR__ . "/editdisp.php"); ?>

                <!--Formulario Hidrogeologica-->

                <?php require_once(__DIR__ . "/edithidro.php"); ?>

                <!--Formulario Municipio-->

                <?php require_once(__DIR__ . "/editmun.php"); ?>

                <!--Formulario Poblacion-->

                <?php require_once(__DIR__ . "/editpob.php"); ?>

                <!--Cuenca-->

                <?php require_once(__DIR__ . "/editcuenca.php"); ?>
                <!--Total-->

                <?php require_once(__DIR__ . "/edittotal.php"); ?>
                <hr>
                <a onclick="cancelarForm()" class="btn btn-gob2 text-light btn-block">Regresar</a>
            </div>
            <br>
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
</script>