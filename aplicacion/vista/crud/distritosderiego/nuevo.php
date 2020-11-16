<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
require_once(__DIR__ . "/../../../modelo/organismo.php");
require_once(__DIR__ . "/../../../modelo/estado.php");
$organismos = new Organismo();
$organismos = $organismos->getTodos();
$estados = new Estado();
$estados = $estados->getTodos();
?>


<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Encabezado DE la seccion en la que se Esta-->
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarForm('DistritosdeRiego')">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Nuevo Distrito de Riego</li>
                    </ol>
                </nav>
            </div>
            <!--Aqui temina la seccion Del encabezado-->
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <form action="" name="formDistrito" onsubmit="valiFormNuevo('/aplicacion/controlador/distritoriego.php',$('form').serialize(),'DistritosdeRiego' ); return false">
                            <input type="text" hidden id="Accion" name="Accion" value="Nuevo">
                            <div class="col-sm">
                                <p>ID:</p>
                                <input type="text" class="form-control" name="id_distrito_riego" id="id_distrito_riego" required>
                            </div>
                            <div class="col-sm">
                                <p>Nombre del Distrito:</p>
                                <input type="text" class="form-control" name="nom_dr" id="nom_dr" required>
                            </div>
                            <div class="col-sm">
                                <p>Organismo de cuenca:</p>
                                <select class="form-control" name="organismo_id" id="organismo_id">
                                    <?php
                                    foreach ($organismos as $organismo) {
                                        ?>
                                        <option value="<?php echo $organismo['id_organismo']; ?>"><?php echo $organismo['nombre']; ?></option>
                                    <?php } ?>
                                </select>
                            </div>
                            <div class="col-sm">
                                <p>Estado:</p>
                                <select class="form-control" name="estado_id" id="estado_id">
                                    <?php
                                    foreach ($estados as $estado) {
                                        ?>
                                        <option value="<?php echo $estado['id_estado']; ?>"><?php echo $estado['nombre']; ?></option>
                                    <?php } ?>
                                </select>
                            </div>            
                            <hr>
                            <div class="row">
                                <div class="col-sm">
                                    <a onclick="cancelarForm('DistritosdeRiego')" class="btn btn-gob2 text-light btn-block">Cancelar</a>
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
