<!--Llamamos a la funcion se sesion-->
<?php
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../modelo/acuifero.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
$registros = new Acuifero;
$Acuiferos = $registros->getTodos2();
?>



<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Encabezado-->
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Importar Shapefile</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <b>Notas importantes:</b>
                        <ul>
                            <li>El nombrado del archivo shapefile debe ser Acuifero_id_acuif_ID_Acuifero.zipEl nombrado
                                del archivo
                                shapefile debe ser <u>Acuifero_id_acuif_<b>IDAcuifero</b></u>.zip
                            </li>
                            <li>Dentro del zip se debe contener el archivo .dbf, .prj, .qpj, .shp y .shx.</li>
                        </ul>
                    </div>
                </div>
                <form action="/aplicacion/controlador/shape.php" method="POST" enctype="multipart/form-data">
                    <div class="row">
                        <input type="text" hidden id="Accion" name="Accion" value="Acu">
                        <div class="col-sm">
                            <p>Seleccione el acuífero al cual pertenece el shapefile: </p>
                            <select class="form-control" name="id_acuifero" id="id_acuifero">
                                <?php
                            foreach ($Acuiferos as $Acuifero) {
                                ?>
                                <option value="<?php echo $Acuifero['id_acuifero'] ?>">
                                    <?php echo $Acuifero['id_acuifero'] ?>
                                    - <?php echo $Acuifero['nombre'] ?></option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="col-sm">
                            <p>Seleccione el archivo: </p>
                            <input type="file" class="form-control" name="shape" id="shape" accept="application/zip"
                                required>
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