<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabecera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../modelo/region.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");

$registros = new RegionHidrologica();
$Regiones = $registros->getTodos();
?>

<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Encabezado DE la seccion en la que se Esta-->
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarForm('Cuencas')">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Nueva Cuenca</li>
                    </ol>
                </nav>
            </div>
            <!--Aqui temina la seccion Del encabezado-->
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <form action="" name="formPropietario" onsubmit="valiFormNuevo('/aplicacion/controlador/cuenca.php',$('form').serialize(),'Cuencas'); return false">
                            <input type="text" hidden id="Accion" name="Accion" value="Nuevo">
                            <div class="col-sm">
                                <p>ID Cuenca:</p>
                                <input name="id_cuenca" id="id_cuenca" type="number" class="form-control" required>
                            </div>
                            <div class="col-sm">
                                <p>Nombre Cuenca:</p>
                                <input type="text" class="form-control" name="nombre" id="nombre" required>
                            </div>
                            <div class="col-sm">
                                <p>Región Hidrológica:</p>
                                <select class="form-control" name="reg_hidrologica_id" id="reg_hidrologica_id" required>
                                    <?php
                                    foreach ($Regiones as $Region) {
                                        ?>
                                        <option value="<?php echo $Region['id_reg_hidrologica']; ?>"><?php echo $Region['nombre']; ?></option>
                                    <?php } ?>
                                </select>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm">
                                    <a onclick="cancelarForm('Cuencas')" class="btn btn-gob2 text-light btn-block">Cancelar</a>
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
<!--Pie de pagina-->
<?php require_once(__DIR__ . "/../../plantillas/footer.php"); ?>
<script type="text/javascript" src="/aplicacion/vista/crud/alerts.js"></script>