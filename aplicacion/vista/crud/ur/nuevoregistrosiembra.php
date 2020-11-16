<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
require_once(__DIR__ . "/../../../modelo/anio.php");
require_once(__DIR__ . "/../../../modelo/ciclo.php");
require_once(__DIR__ . "/../../../modelo/cultivo.php");
$reg = new Ciclo();
$Ciclos = $reg->getCiclosUR();
$reg = new Cultivo();
$Cultivos = $reg->getCultivos();
$reg = new Anio();
$Anios = $reg->getAnios();
?>


<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarForm('UR')">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarFormReg('RegSiemb')">Editar Unidad de Riego</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Nuevo Registro de Siembra</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <h4>Nuevo Registro</h4>
                        <p>Información de Registro.</p>
                        <p>ID Unidad de Riego: <b><?php echo $_POST['ID'] ?></b></p>
                        <form action="" onsubmit="valiFormAnterior('/aplicacion/controlador/unidadriego.php', $('form').serialize(), 'RegSiemb'); return false">
                            <input type="text" hidden id="Accion" name="Accion" value="NuevoRegSiembra">
                            <input type="text" hidden name="municipio_id" id="municipio_id" value="<?php echo $_POST['ID'] ?>">
                            <div class="row">
                                <div class="col-sm">
                                    <p>Superficie sembrada (ha):</p>
                                    <input step="any" type="number" class="form-control" name="sembrada" id="sembrada" required>
                                </div>
                                <div class="col-sm">
                                    <p>Superficie cosechada (ha):</p>
                                    <input step="any" type="number" class="form-control" name="cosechada" id="cosechada" required>
                                </div>
                                <div class="col-sm">
                                    <p>Producción (ton):</p>
                                    <input step="any" type="number" class="form-control" name="produccion" id="produccion" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <p>Valor de cosecha (miles $):</p>
                                    <input step="any" type="number" class="form-control" name="valor" id="valor" required>
                                </div>
                                <div class="col-sm">
                                    <p>Cultivo:</p>
                                    <select class="form-control" name="cultivo_id" id="cultivo_id">
                                        <?php
                                        foreach ($Cultivos as $cultivo) {
                                            ?>
                                            <option value="<?php echo $cultivo['id_cultivo']; ?>"><?php echo $cultivo['nombre']; ?></option>
                                        <?php } ?>
                                    </select>
                                </div>
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





<form id="RegSiemb" action="editar.php" method="post" hidden>
    <input name="ID" type="text" value="<?php echo $_POST['ID']; ?>" hidden>
</form>

<?php require_once(__DIR__ . "/../../plantillas/footer.php"); ?>
<script type="text/javascript" src="/aplicacion/vista/crud/alerts.js"></script>