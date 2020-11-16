<!--Llamamos a la funcion se sesion-->
<?php
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
                    <li class="breadcrumb-item active">Importar desde Distritos de Riego</li>
                </ol>
            </div>
        </div>
        <div class="row">
            <p>Para que el proceso de importación de Distritos de Riego a la base de datos se realice de forma correcta
                le recomendamos descargar el formato que contiene los campos correspondientes en la base de datos.</p>
            <a href="/formatos/FormatoDistrito.php" class="btn btn-warning btn-fill  btn-block">Descargar
                Formato Distritos de Riego</a>
            <br>
            <p><b>Notas importantes:</b></p>
            <ul>
                <li><p>La primera hoja corresponde a la información general del Distrito de Riego.</p></li>
                <li><p>La segunda hoja corresponde a la relación que tiene los Distritos de Riego con los municipios, favor de escribir correctamente el nombre de cada Estado y Municipio que le corresponden al Distrito de Riego.</p></li>
                <li><p>Los campos ya tienen el formato adecuado, favor de no modificar las cabeceras ni el tipo de dato.</p></li>
                <li><p>Si se coloca el ID de un Distrito de Riego ya existente en la base de datos, <b>el sistema
                            actualizará los datos del mismo</b>.</p></li>
                <li><p><b>Favor de no dejar ningún campo vacío, esto será de gran importancia, ya que de lo
                            contrario se perdería información relevante.</b></p></li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12 text-center" id="cargando" hidden="hidden">
                <br>
                <br>
                <i class="fa fa-circle-o-notch fa-spin" style="font-size:50px"></i>
                <br>
                <h6>Procesando...</h6>
            </div>            
            <form action="" method="POST" id="formUpload" enctype="multipart/form-data">
                <input type="text" hidden id="Accion" name="Accion" value="Distrito">
                <div class="form-group">
                    <div class="col-sm">
                        <p>Seleccione el archivo</p>
                        <input class="form-control" type="file" name="archivo" id="archivo" accept=".xlsx" required>
                    </div>
                </div>
                <div id="mensaje"></div>
                <div class="col-sm">
                    <a onclick="cancelarForm()" class="btn btn-danger btn-fill  btn-block" name="cancelar" id="cancelar">Cancelar</a>
                </div>
                <div class="col-sm">
                    <button type="submit" class="btn btn-primary btn-fill  btn-block" id="continuar" name="continuar">Continuar</button>
                </div>
            </form>
        </div>
        <br>
    </div>
</main>
<?php require_once(__DIR__ . "/../../plantillas/footer.php"); ?>
<script src="/aplicacion/vista/crud/animacion.js"></script>

<script>
    $(function () {
        $("#formUpload").on("submit", function (e) {
            e.preventDefault();
            var f = $(this);
            var formData = new FormData(document.getElementById("formUpload"));
            $.ajax({
                url: "/aplicacion/controlador/excel.php",
                type: "post",
                dataType: "html",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            })
                    .always(function (res) {
                        if (res == 'OK') {
                            swal("¡Buen Trabajo!", "Se ha realizado el proceso con éxito.", "success")
                                    .then((value) => {
                                        //window.location.href = "../dbadmin.php";
                                    });
                        } else {
                            swal("¡Algo anda mal!", res, "error");
                        }
                    });
        });
    });
</script>

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
</script>
