<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../modelo/estado.php");
require_once(__DIR__ . "/../../../modelo/anio.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
$registros = new Estado();
$Estados = $registros->getTodos();
$reg = new Anio();
$Anios = $reg->getAnios();
?>

<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarForm('Presas')">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Nuevo Distrito de Riego</li>
                    </ol>
                </nav>
            </div>
            <!--Aquí temina la seccion del encabezado-->
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <form action="" name="formPropietario" onsubmit="valiFormNuevo('/aplicacion/controlador/presa.php', $('form').serialize(), 'Presas'); return false">
                            <input type="text" hidden id="Accion" name="Accion" value="Nuevo">
                            <div class="row">
                                <div class="col-sm">
                                    <p>ID Presa:</p>
                                    <input type="number" class="form-control" name="id_presa" id="id_presa" required>
                                </div>
                                <div class="col-sm">
                                    <p>Nombre Oficial:</p>
                                    <input type="text" class="form-control" name="nom_oficial" id="nom_oficial" required>
                                </div>
                                <div class="col-sm">
                                    <p>Nombre Común:</p>
                                    <input type="text" class="form-control" name="nom_comun" id="nom_comun">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <p>Corriente:</p>
                                    <input type="text" class="form-control" name="corriente" id="corriente" required>
                                </div>
                                <div class="col-sm">
                                    <p>Año de termino:</p>
                                    <input type="number" class="form-control" name="anio_term" id="anio_term">
                                </div>
                                <div class="col-sm">
                                    <p>Estado:</p>
                                    <select class="form-control" name="edo_id" id="edo_id">
                                        <?php
                                        foreach ($Estados as $Estado) {
                                            ?>
                                            <option value="<?php echo $Estado['id_estado']; ?>"><?php echo $Estado['nombre']; ?></option>
                                        <?php } ?>
                                    </select>
                                </div>
                            </div>
                            <h4 class="my-4">Información Volumétrica</h4>
                            <div class="row">
                                <div class="col-sm">
                                    <p>Altura de la cortina (m):</p>
                                    <input type="number" class="form-control" name="alt_cort" id="alt_cort" required>
                                </div>
                                <div class="col-sm">
                                    <p>Capacidad al NAME (hm<sup>3</sup>):</p>
                                    <input type="number" class="form-control" name="cap_name" id="cap_name" required>
                                </div>
                                <div class="col-sm">
                                    <p>Capacidad al NAMO (hm<sup>3</sup>):</p>
                                    <input type="number" class="form-control" name="cap_namo" id="cap_namo" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <p>Vol. de almacenamiento (hm<sup>3</sup>):</p>
                                    <input type="number" class="form-control" name="vol_alma" id="vol_alma" required>
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

