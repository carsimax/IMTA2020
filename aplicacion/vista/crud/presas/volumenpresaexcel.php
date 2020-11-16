<?php
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
?>


<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarForm('Presas')">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item active">Importar Información Volumétrica desde Excel</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <p>Para que el proceso de importación de los datos volumétricos de presas a la base de datos se realice de forma correcta
                            le recomendamos descargar el siguiente formato que contiene los campos correspondientes en la base de datos.</p>
                        <a href="/formatos/FormatoPresaVol.php" class="btn btn-warning btn-fill  btn-block">Descargar
                            Formato</a>
                        <br>
                        <p><b>Notas importantes:</b></p>
                        <ul class="container">
                            <li><p>La primera hoja corresponde a la información volumétrica de cada presa, los campos ya tienen
                                    el formato adecuado, favor de no modificar las cabeceras ni el tipo de dato.</p></li>                             
                        </ul>
                        <div class="col-md-12 text-center" id="cargando" style="display: none;">
                            <br>
                            <i class="fa fa-circle-o-notch fa-spin" style="font-size:50px"></i>
                            <br>
                            <h6>Procesando...</h6>
                        </div>
                        <form action="" method="POST" id="formUpload"  enctype="multipart/form-data">
                            <input type="text" hidden id="Accion" name="Accion" value="importFromExcel">
                            <div class="form-group">
                                <div class="col-sm">
                                    <p>Seleccione el archivo</p>
                                    <input class="form-control" type="file" name="archivo" id="archivo" accept=".xlsx" required>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm">
                                    <a onclick="cancelarForm('Presas')" class="btn btn-gob2 text-light btn-block">Cancelar</a>
                                </div>
                                <div class="col-sm">
                                    <button type="submit" class="btn btn-primary btn-fill  btn-block">Continuar</button>
                                </div>
                            </div>
                        </form>
                        <br>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>

<?php require_once(__DIR__ . "/../../plantillas/footer.php"); ?>
<script src="/aplicacion/vista/crud/animacion.js"></script>
<script src="/aplicacion/vista/crud/alerts.js"></script>


<script>
$(function () {
    $("#formUpload").on("submit", function (e) {
        e.preventDefault();
        var f = $(this);
        var formData = new FormData(document.getElementById("formUpload"));
        $.ajax({
            url: "/aplicacion/controlador/presa.php",
            type: "post",
            dataType: "html",
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        }).always(function (resp) {
            if (resp == 'OK') {
                    buenTrabajoNuevo('DistritosdeRiego');
                } else {
                    resp = JSON.parse(resp);
                    advertencia(resp.messageError);
                    window.location=(resp.url);
                    $("#formUpload")[0].reset();
                }
        });
    });
});
</script>


