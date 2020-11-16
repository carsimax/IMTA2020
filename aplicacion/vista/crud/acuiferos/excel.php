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
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarForm()">Acuíferos</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Importar desde Excel</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <p>Para que el proceso de importación de acuíferos a la base de datos se realice de forma
                            correcta
                            le recomendamos descargar el formato para los acampos correspondientes a los acuíferos</p>
                        <a href="/formatos/FormatoAcuifero.php" class="btn btn-gob btn-fill  btn-block">Descargar
                            Formato</a>
                        <p><b>Notas importantes:</b></p>
                        <ul>
                            <li>
                                <p>La primera hoja corresponde a la información general del acuífero, los campos ya
                                    tienen
                                    el formato adecuado, favor de no modificar las cabeceras ni el tipo de dato.</p>
                            </li>
                            <li>
                                <p>La segunda hoja de Excel corresponde a la relación entre los municipios y los
                                    acuíferos,
                                    favor de escribir el estado y el municipio gramaticalmente correcto.</p>
                            </li>
                            <li>
                                <p>Si se coloca el ID de un acuífero ya existente en la base de datos, el sistema
                                    solamente
                                    actualizara los datos del mismo.</p>
                            </li>
                            <li>
                                <p><b>Favor de no dejar ningún campo vacío, esto será de gran importancia, ya que de lo
                                        contrario se perdería información relevante.</b></p>
                            </li>
                        </ul>
                    </div>
                </div>
                <form action="/aplicacion/controlador/excel.php" method="POST" enctype="multipart/form-data">
                    <div class="row">
                        <input type="text" hidden id="Accion" name="Accion" value="Acu">
                        <div class="col-sm">
                            <p>Seleccione el archivo</p>
                            <input class="form-control" type="file" name="archivo" id="archivo" accept=".xlsx" required>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-sm">
                            <a onclick="cancelarForm()" class="btn btn-gob2 text-light  btn-block">Cancelar</a>
                        </div>
                        <div class="col-sm">
                            <button type="submit" class="btn btn-primary btn-fill  btn-block">Continuar</button>
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
</script>