<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../modelo/presavolumen.php");
require_once(__DIR__ . "/../../../modelo/anio.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
$PresaVolumen = new PresaVolumen;
$PresaVolumen = $PresaVolumen->getPresaVolumen($_POST['ID']);
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
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarFormReg('RegForm')">Editar Presa</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Editar Registro</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <b>Editar Registro</b><br>
                        <p class="my-4">Información Volumétrica.</p>
                        <form name="form" onsubmit="valiFormAnterior('/aplicacion/controlador/presa.php', $('form').serialize(), 'RegForm'); return false">
                            <input type="text" hidden id="Accion" name="Accion" value="UpdateReg">
                            <input hidden type="number" class="form-control" name="id_presa_volumen" id="id_presa_volumen" value="<?php echo $PresaVolumen->getIdPresaVolumen() ?>">
                            <div class="row">
                                <div class="col-sm">
                                    <p>Altura de la cortina (m):</p>
                                    <input type="number" class="form-control" name="alt_cort" id="alt_cort" value="<?php echo $PresaVolumen->getAltCort() ?>" required>
                                </div>
                                <div class="col-sm">
                                    <p>Capacidad al NAME (hm<sup>3</sup>):</p>
                                    <input type="number" class="form-control" name="cap_name" id="cap_name" value="<?php echo $PresaVolumen->getCapName() ?>" required>
                                </div>
                                <div class="col-sm">
                                    <p>Capacidad al NAMO (hm<sup>3</sup>):</p>
                                    <input type="number" class="form-control" name="cap_namo" id="cap_namo" value="<?php echo $PresaVolumen->getCapNamo() ?>" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <p>Vol. de almacenamiento (hm<sup>3</sup>):</p>
                                    <input type="number" class="form-control" name="vol_alma" id="vol_alma" value="<?php echo $PresaVolumen->getVolAlma() ?>" required>
                                </div>
                                <div class="col-sm">
                                    <p>Información del Año:</p>
                                    <select class="form-control" name="anio_id" id="anio_id">
                                        <?php
                                        foreach ($Anios as $Anio) {
                                            if ($Anio['id_anio'] == $PresaVolumen->getAnioId()) {
                                                ?>
                                                <option selected value="<?php echo $Anio['id_anio']; ?>"><?php echo $Anio['anio']; ?></option>
                                                <?php
                                            } else {
                                                ?>
                                                <option value="<?php echo $Anio['id_anio']; ?>"><?php echo $Anio['anio']; ?></option>
                                                <?php
                                            }
                                        }
                                        ?>
                                    </select>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm">
                                    <a onclick="cancelarFormReg('RegForm')" class="btn btn-gob2 text-light btn-block">Cancelar</a>
                                </div>
                                <div class="col-sm">
                                    <button type="submit" class="btn btn-primary btn-fill  btn-block">Guardar</button>
                                </div>
                            </div>
                        </form>
                        <br>

                    </div>
                </div>
        </main>
    </div>
</div>

<form id="RegForm" action="editar.php" method="post" hidden>
    <input name="ID" type="text" value="<?php echo $PresaVolumen->getPresaId(); ?>" hidden>
</form>
<?php require_once(__DIR__ . "/../../plantillas/footer.php"); ?>
<script type="text/javascript" src="/aplicacion/vista/crud/alerts.js"></script>
