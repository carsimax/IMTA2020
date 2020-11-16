<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../modelo/anio.php");
require_once(__DIR__ . "/../../../modelo/tenencia.php");
require_once(__DIR__ . "/../../../modelo/fuente.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
$reg = new Anio();
$Anios = $reg->getAnios();
$reg = new Tenencia();
$Tenencias = $reg->getTenencias();
$reg = new Fuente();
$Fuentes = $reg->getFuentes();
?>


<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Encabezado DE la seccion en la que se Esta-->
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarForm('DistritosdeRiego')">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarFormReg('RegSiemb')">Editar Distrito de Riego</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Nuevo Registro de Siembra</li>
                    </ol>
                </nav>
            </div>
            <!--Aqui temina la seccion Del encabezado-->
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <h2>Nuevo Registro</h2>
                        <p>Información de Registro.</p>
                        <p>ID Distrito: <b><?php echo $_POST['ID'] ?></b></p>
                        <form action="" onsubmit="valiFormAnterior('/aplicacion/controlador/distritoriego.php', $('form').serialize(), 'RegSiemb'); return false">
                            <input type="text" hidden id="Accion" name="Accion" value="NuevoRegVol">
                            <input type="text" hidden name="distrito_riego_id" id="distrito_riego_id"
                                   value="<?php echo $_POST['ID'] ?>">
                            <div class="row">
                                <div class="col-sm">
                                    <p>Superficie Regada 1* :</p>
                                    <input step="any" type="number" class="form-control" name="superficie_regada1"
                                           id="superficie_regada1" required>
                                </div>
                                <div class="col-sm">
                                    <p>Volumen Distribuido 1* :</p>
                                    <input step="any" type="number" class="form-control" name="volumen_distribuido1"
                                           id="volumen_distribuido1" required>
                                </div>
                                <div class="col-sm">
                                    <p>Usuarios 1* :</p>
                                    <input type="number" class="form-control" name="usuarios1" id="usuarios1" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <p>Superficie Regada 2 :</p>
                                    <input step="any" type="number" class="form-control" name="superficie_regada2"
                                           id="superficie_regada2">
                                </div>
                                <div class="col-sm">
                                    <p>Volumen Distribuido 2 :</p>
                                    <input step="any" type="number" class="form-control" name="volumen_distribuido2"
                                           id="volumen_distribuido2">
                                </div>
                                <div class="col-sm">
                                    <p>Usuarios 2 :</p>
                                    <input type="number" class="form-control" name="usuarios2" id="usuarios2">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <p>Superficie Regada 3 :</p>
                                    <input step="any" type="number" class="form-control" name="superficie_regada3"
                                           id="superficie_regada3">
                                </div>
                                <div class="col-sm">
                                    <p>Volumen Distribuido 3 :</p>
                                    <input step="any" type="number" class="form-control" name="volumen_distribuido3"
                                           id="volumen_distribuido3">
                                </div>
                                <div class="col-sm">
                                    <p>Usuarios 3 :</p>
                                    <input type="number" class="form-control" name="usuarios3" id="usuarios3">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <p>Información del Año:</p>
                                    <select class="form-control" name="anio_id" id="anio_id">
                                        <?php
                                        foreach ($Anios as $Anio) {
                                            ?>
                                            <option value="<?php echo $Anio['id_anio']; ?>"><?php echo $Anio['anio']; ?></option>
                                        <?php } ?>
                                    </select>
                                </div>
                                <div class="col-sm">
                                    <p>Tenencia:</p>
                                    <select class="form-control" name="tenencia_id" id="tenencia_id">
                                        <?php
                                        foreach ($Tenencias as $Tenencia) {
                                            ?>
                                            <option value="<?php echo $Tenencia['id_tenencia']; ?>"><?php echo $Tenencia['nombre']; ?></option>
                                        <?php } ?>
                                    </select>
                                </div>
                                <div class="col-sm">
                                    <p>Fuente:</p>
                                    <select class="form-control" name="fuente_id" id="fuente_id">
                                        <?php
                                        foreach ($Fuentes as $Fuente) {
                                            ?>
                                            <option value="<?php echo $Fuente['id_fuente']; ?>"><?php echo $Fuente['nombre']; ?></option>
                                        <?php } ?>
                                    </select>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm">
                                    <a onclick="cancelarFormReg('RegSiemb')" class="btn btn-gob2 text-light btn-block">Cancelar</a>
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

<form id="RegSiemb" action="editar.php" method="post" hidden>
    <input name="ID" type="text" value="<?php echo $_POST['ID'] ?>" hidden>
</form>

<script type="text/javascript" src="/aplicacion/vista/crud/alerts.js"></script>
