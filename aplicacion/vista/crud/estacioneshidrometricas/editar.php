<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
require_once(__DIR__ . "/../../../modelo/cuenca.php");
require_once(__DIR__ . "/../../../modelo/region.php");
require_once(__DIR__ . "/../../../modelo/estado.php");
require_once(__DIR__ . "/../../../modelo/estacionhidrometrica.php");
$registros = new RegionHidrologica();
$regiones = $registros->getTodos();
$registros = new Cuenca();
$cuencas = $registros->getTodos();
$registros = new EstacionHidrometrica();
$estacion = $registros->getEstacion($_POST['ID']);
$registros = new Estado();
$estados = $registros->getTodos();
?>

<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarForm('DTTs')">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Editar Estación Hidrométrica</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <form action="" name="formPropietario" onsubmit="validarSelector(); return false">
                            <input type="text" hidden id="Accion" name="Accion" value="Actualizar">
                            <div class="col-sm">
                                <p>Clave:</p>
                                <input  type="number" class="form-control" value="<?php echo $estacion->getIdEstacion(); ?>" disabled>
                                <input  type="hidden" class="form-control" name="clave" id="clave" value="<?php echo $estacion->getIdEstacion(); ?>" >
                            </div>                
                            <div class="col-sm">
                                <p>Nombre:</p>
                                <input  type="text" class="form-control" name="nombre" id="nombre" value="<?php echo $estacion->getNombre(); ?>" required>
                            </div>
                            <div class="col-sm">
                                <p>Corriente:</p>
                                <input  type="text" class="form-control" name="corriente" id="corriente" value="<?php echo $estacion->getCorriente(); ?>" required>
                            </div>
                            <div class="col-sm">
                                <p>Región Hidrológica:</p>
                                <select class="form-control" name="region_id" id="region_id" required>
                                    <?php
                                    foreach ($regiones as $region) {
                                        if ($region['id_reg_hidrologica'] == $estacion->getRegion_id()) {
                                            ?>
                                            <option value="<?php echo $region['id_reg_hidrologica']; ?>" selected><?php echo $region['nombre']; ?></option>
                                        <?php } else { ?>
                                            <option value="<?php echo $region['id_reg_hidrologica']; ?>"><?php echo $region['nombre']; ?></option>
                                            <?php
                                        }
                                    }
                                    ?>                        
                                </select>
                            </div>                                                
                            <div class="col-sm">
                                <p>Estado:</p>
                                <select class="form-control" name="estado_id" id="estado_id" required>                                                              
                                </select>
                            </div>                                                
                            <div class="col-sm">
                                <p>Cuenca:</p>
                                <select class="form-control" name="cuenca_id" id="cuenca_id" required>
                                    <?php
                                    foreach ($cuencas as $cuenca) {
                                        if ($cuenca['id_cuenca'] == $estacion->getCuenca_id()) {
                                            ?>
                                            <option value="<?php echo $cuenca['id_cuenca']; ?>" selected><?php echo $cuenca['nombre']; ?></option>
                                        <?php } else { ?>
                                            <option value="<?php echo $cuenca['id_cuenca']; ?>" ><?php echo $cuenca['nombre']; ?></option>
                                            <?php
                                        }
                                    }
                                    ?>
                                </select>
                            </div>                
                            <div class="col-sm">
                                <p>Latitud:</p>
                                <input  type="number" step="any" class="form-control" name="latitud" id="latitud" value="<?php echo $estacion->getLatitud(); ?>" required>
                            </div>             
                            <div class="col-sm">
                                <p>Longitud:</p>
                                <input  type="number" step="any" class="form-control" name="longitud" id="longitud" value="<?php echo $estacion->getLongitud(); ?>" required>
                            </div>                                
                            <hr>
                            <div class="row">
                                <div class="col-sm">
                                    <a onclick="cancelarForm('EstacionesClimatologicas')" class="btn btn-gob2 text-light btn-block">Cancelar</a>
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
<script>

    var o = new Option("Selecciona una Región", 0);
    $(o).html("Selecciona una Región");
    $("#estado_id").append(o);
    $.ajax({

        type: 'GET',
        url: '/aplicacion/controlador/region.php',
        data: "Accion=RegionEstado&ID=" +<?php echo $estacion->getRegion_id() ?>,
        success: function (resp) {
            $.each(JSON.parse(resp), function (index, item) {
                var o = new Option(item.nombre, item.id_estado);
                $(o).html(item.nombre);
                $("#estado_id").append(o);
                if (item.id_estado == <?php echo $estacion->getEstado_id() ?>) {
                    $("#estado_id").val(<?php echo $estacion->getEstado_id() ?>);
                }
            });

        }
    });
    $('#region_id').on('change', function () {
        limpiarEstados();
        var $region_id = this.value;
        $.ajax({
            type: 'GET',
            url: '/aplicacion/controlador/region.php',
            data: "Accion=RegionEstado&ID=" + $region_id,
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    var o = new Option(item.nombre, item.id_estado);
                    $(o).html(item.nombre);
                    $("#estado_id").append(o);
                });

            }
        });
    });

    function limpiarEstados() {
        $("#estado_id option").remove();
        var o = new Option("Selecciona una Región", 0);
        $(o).html("Selecciona una Región");
        $("#estado_id").append(o);
    }
    
    function validarSelector() {
        if ($('#region_id').val() === 0 || $('#estado_id').val() === 0) {
            swal("¡Cuidado!", "Debes de seleccionar una Región Hidrológica y un Estado", "warning");
        } else {
            valiFormNuevo('/aplicacion/controlador/estacionhidrometrica.php', $('form').serialize(),'EstacionesHidrometricas' );
        }
    }
</script>
