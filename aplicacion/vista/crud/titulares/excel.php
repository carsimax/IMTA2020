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
                    <li class="breadcrumb-item active">Importar desde Excel</li>
                </ol>
            </div>
        </div>
        <div class="row">
            <p>Para que el proceso de importación de titulares a la base de datos se realice de forma correcta
                le recomendamos descargar el formato para los campos correspondientes a los titulares</p>
            <a href="/formatos/FormatoTitular.php" class="btn btn-warning btn-fill  btn-block">Descargar
                Formato Titulares</a>
            <p><b>Notas importantes:</b></p>
            <ul>
                <li><p>La primera hoja corresponde a la información general del Titular, los campos ya tienen
                        el formato adecuado, favor de no modificar las cabeceras ni el tipo de dato.</p></li>
                <li><p>Si se coloca el ID de un Titular ya existente en la base de datos, el sistema solamente
                        actualizara los datos del mismo.</p></li>
                <li><p><b>Favor de no dejar ningún campo vacío, esto será de gran importancia, ya que de lo
                            contrario se perdería información relevante.</b></p></li>
            </ul>
        </div>
        <div class="row">
            <form action="/aplicacion/controlador/excel.php" method="POST" enctype="multipart/form-data">
                <input type="text" hidden id="Accion" name="Accion" value="Titular">
                <div class="form-group">
                    <div class="col-sm">
                        <p>Seleccione el archivo</p>
                        <input class="form-control" type="file" name="archivo" id="archivo" accept=".xlsx" required>
                    </div>
                </div>
                <div class="col-sm">
                    <a onclick="cancelarForm()" class="btn btn-danger btn-fill  btn-block">Cancelar</a>
                </div>
                <div class="col-sm">
                    <button type="submit" class="btn btn-primary btn-fill  btn-block">Continuar</button>
                </div>
            </form>
        </div>
        <br>
    </div>
</main>
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
                        $.redirect("/aplicacion/vista/crud/dbadmin.php", {tablaP: "Titulares"}, "POST");
                    }
                });
    }
</script>
