<!--Llamamos a la funcion se sesion-->
<?php
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../modelo/presa.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
$registros = new Presa();
$Presas = $registros->obtenerPresas();
?>


<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarForm('Presas')">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Importar Shapefile</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <div class="col-sm container">
                            <b>Notas importantes:</b>
                            <ul class="container">
                                <li>El nombrado del archivo shapefile debe ser <u>Presa_id_presa_<b>IDPresa</b></u>.zip
                                </li>
                                <li>Dentro del zip se debe contener el archivo .dbf, .prj, .qpj, .shp y .shx.</li>
                            </ul>
                        </div>
                        <div class="col-sm">
                            <form action="/aplicacion/controlador/shape.php" method="POST" enctype="multipart/form-data">
                                <input type="text" hidden id="Accion" name="Accion" value="Presa">
                                <div class="form-group">
                                    <div class="col-sm">
                                        <p>Seleccione la presa al cual pertenece el shapefile: </p>
                                        <select class="form-control" name="id_presa" id="id_presa">
                                            <?php
                                            foreach ($Presas as $Presa) {
                                                ?>
                                                <option value="<?php echo $Presa['id_presa'] ?>"><?php echo $Presa['id_presa'] ?> - <?php echo $Presa['nom_oficial'] ?></option>
                                            <?php } ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm">
                                        <p>Seleccione el archivo: </p>
                                        <input type="file" class="form-control" name="shape" id="shape"
                                               accept="application/zip" required>
                                    </div>
                                </div><hr>
                                <div class="row">
                                    <div class="col-sm">
                                        <a onclick="cancelarForm('Presas')" class="btn btn-gob2 text-light btn-block">Cancelar</a>
                                    </div>
                                    <div class="col-sm">
                                        <button type="submit" class="btn btn-primary btn-fill  btn-block">Guardar</button>
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
<script type="text/javascript" src="/aplicacion/vista/crud/alerts.js"></script>
