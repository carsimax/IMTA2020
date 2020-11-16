<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../modelo/grupocultivo.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
$registros = new GrupoCultivo();
$Grupos = $registros->getGrupos();
?>




<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarForm('Cultivos')">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Nuevo Cultivo</li>
                    </ol>
                </nav>
            </div>
            <!--Aqui temina la seccion Del encabezado-->
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <form action="" name="formPropietario" onsubmit="valiFormNuevo('/aplicacion/controlador/cultivo.php',$('form').serialize(),'Cultivos'); return false">
                            <input type="text" hidden id="Accion" name="Accion" value="Nuevo">
                            <div class="row">
                                <div class="col-sm-4">
                                    <p>Nombre Cultivo:</p>
                                    <input type="text" class="form-control" name="nombre" id="nombre" required>
                                </div>
                                <div class="col-sm-4">
                                    <p>Nombre Científico:</p>
                                    <input type="text" class="form-control" name="nombre_cientifico" id="nombre_cientifico" required>
                                </div>
                                <div class="col-sm-4">
                                    <p>Grupo de Cultivo:</p>
                                    <select class="form-control" name="grupo_cultivo_id" id="grupo_cultivo_id">
                                        <?php
                                        foreach ($Grupos as $Grupo) {
                                        ?>
                                            <option value="<?php echo $Grupo['id_grupo_cultivo']; ?>"><?php echo $Grupo['nombre']; ?></option>
                                        <?php } ?>
                                    </select>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm">
                                    <a onclick="cancelarForm('Cultivos')" class="btn btn-gob2 text-light btn-block">Cancelar</a>
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