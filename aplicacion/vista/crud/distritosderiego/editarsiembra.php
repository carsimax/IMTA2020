<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../modelo/anio.php");
require_once(__DIR__ . "/../../../modelo/ciclo.php");
require_once(__DIR__ . "/../../../modelo/cultivo.php");
require_once(__DIR__ . "/../../../modelo/tenencia.php");
require_once(__DIR__ . "/../../../modelo/siembradistrito.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
$siembraDistrito = new SiembraDistrito();
$siembraDistrito = $siembraDistrito->getRegistroSiembra($_POST['ID']);
$reg = new Ciclo();
$Ciclos = $reg->getCiclos();
$reg = new Cultivo();
$Cultivos = $reg->getCultivos();
$reg = new Tenencia();
$Tenencias = $reg->getTenencias();
$reg = new Anio();
$Anios = $reg->getAnios();
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
                        <li class="breadcrumb-item active" aria-current="page">Editar Registro de Siembra</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <h4>Editar Registro</h4>
                        <p>Información de Registro.</p>
                        <p>ID Distrito: <b><?php echo $siembraDistrito->getDistritoRiegoId() ?></b></p>
                        <form action="" onsubmit="valiFormAnterior('/aplicacion/controlador/distritoriego.php', $('form').serialize(), 'RegSiemb'); return false">
                            <input type="text" hidden id="Accion" name="Accion" value="UpdateRegSiembra">
                            <input hidden type="text" name="id_siembra_distrito" id="id_siembra_distrito" value="<?php echo $_POST['ID'] ?>">
                            <div class="row">
                                <div class="col-sm">
                                    <p>Superficie sembrada (ha):</p>
                                    <input type="number"  step="any" class="form-control" name="sembrada" id="sembrada" required
                                           value="<?php echo $siembraDistrito->getSembrada() ?>">
                                </div>
                                <div class="col-sm">
                                    <p>Superficie cosechada (ha):</p>
                                    <input type="number" step="any"  class="form-control" name="cosechada" id="cosechada" required
                                           value="<?php echo $siembraDistrito->getCosechada() ?>">
                                </div>
                                <div class="col-sm">
                                    <p>Producción (ton):</p>
                                    <input type="number" step="any"  class="form-control" name="produccion" id="produccion" required
                                           value="<?php echo $siembraDistrito->getProduccion() ?>">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <p>Valor de cosecha (Pesos $):</p>
                                    <input type="number"step="any"  class="form-control" name="valor" id="valor" required
                                           value="<?php echo $siembraDistrito->getValor() ?>">
                                </div>
                                <div class="col-sm">
                                    <p>Modalidad :</p>
                                    <select name="modalidad" id="modalidad" class="form-control">
                                        <?php
                                        if ($siembraDistrito->getModalidad() == 'Temporal') {
                                            ?>
                                            <option selected value="Temporal">Temporal</option>
                                            <option value="Riego">Riego</option>
                                            <?php
                                        } else {
                                            ?>
                                            <option value="Temporal">Temporal</option>
                                            <option selected value="Riego">Riego</option>
                                        <?php } ?>
                                    </select>
                                </div>
                                <div class="col-sm">
                                    <p>Ciclo:</p>
                                    <select class="form-control" name="ciclo_id" id="ciclo_id">
                                        <?php
                                        foreach ($Ciclos as $Ciclo) {
                                            ?>
                                            <?php
                                            if ($siembraDistrito->getCicloId() == $Ciclo['id_ciclo']) {
                                                ?>
                                                <option selected
                                                        value="<?php echo $Ciclo['id_ciclo']; ?>"><?php echo $Ciclo['nombre']; ?></option>
                                                        <?php
                                                    } else {
                                                        ?>
                                                <option value="<?php echo $Ciclo['id_ciclo']; ?>"><?php echo $Ciclo['nombre']; ?></option>
                                            <?php } ?>
                                        <?php } ?>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <p>Tenencia:</p>
                                    <select class="form-control" name="tenencia_id" id="tenencia_id">
                                        <?php
                                        foreach ($Tenencias as $Tenencia) {
                                            ?>
                                            <?php
                                            if ($siembraDistrito->getTenenciaId() == $Tenencia['id_tenencia']) {
                                                ?>
                                                <option selected
                                                        value="<?php echo $Tenencia['id_tenencia']; ?>"><?php echo $Tenencia['nombre']; ?></option>
                                                        <?php
                                                    } else {
                                                        ?>
                                                <option value="<?php echo $Tenencia['id_tenencia']; ?>"><?php echo $Tenencia['nombre']; ?></option>
                                            <?php } ?>

                                        <?php } ?>
                                    </select>
                                </div>
                                <div class="col-sm">
                                    <p>Cultivo:</p>
                                    <select class="form-control" name="cultivo_id" id="cultivo_id">
                                        <?php
                                        foreach ($Cultivos as $cultivo) {
                                            ?>
                                            <?php
                                            if ($siembraDistrito->getCultivoId() == $cultivo['id_cultivo']) {
                                                ?>
                                                <option selected
                                                        value="<?php echo $cultivo['id_cultivo']; ?>"><?php echo $cultivo['nombre']; ?></option>
                                                        <?php
                                                    } else {
                                                        ?>
                                                <option value="<?php echo $cultivo['id_cultivo']; ?>"><?php echo $cultivo['nombre']; ?></option>
                                            <?php } ?>
                                        <?php } ?>
                                    </select>
                                </div>
                                <div class="col-sm">
                                    <p>Información del Año:</p>
                                    <select class="form-control" name="anioagricola_id" id="anioagricola_id">
                                        <?php
                                        foreach ($Anios as $Anio) {
                                            ?>
                                            <?php
                                            if ($siembraDistrito->getAnioagricolaId() == $Anio['id_anio']) {
                                                ?>
                                                <option selected
                                                        value="<?php echo $Anio['id_anio']; ?>"><?php echo $Anio['anio']; ?></option>
                                                        <?php
                                                    } else {
                                                        ?>
                                                <option value="<?php echo $Anio['id_anio']; ?>"><?php echo $Anio['anio']; ?></option>
                                            <?php } ?>

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
    <input name="ID" type="text" value="<?php echo $siembraDistrito->getDistritoRiegoId() ?>" hidden>
</form>


<?php require_once(__DIR__ . "/../../plantillas/footer.php"); ?>


<script type="text/javascript" src="/aplicacion/vista/crud/alerts.js"></script>