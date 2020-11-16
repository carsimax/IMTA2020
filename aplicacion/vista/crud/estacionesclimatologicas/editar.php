<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../modelo/anio.php");
require_once(__DIR__ . "/../../../modelo/cuenca.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
require_once(__DIR__ . "/../../../controlador/estacionclimatologica.php");
$registros = new Anio();
$Anios = $registros->getAnios();
$registro = new EstacionClimatologica();
$estacion = $registro->getEstacion($_POST['ID']);
$busqueda = new Municipio();
$muni = new Municipio();
$muni = $busqueda->getMuniId($registro->getMunicipio_id());
$registros = new Cuenca();
$cuencas = $registros->getTodos();
$subcuencas = $registros->getSubcuencas();
$organismos = $registros->getOrganismos();
?>

<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarForm('EstacionesClimatologicas')">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Editar Estación Climatológica</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <form action="" name="formPropietario" onsubmit="valiFormNuevo('/aplicacion/controlador/estacionclimatologica.php', $('form').serialize(),'EstacionesClimatologicas'); return false">
                            <input type="number" name="clave" id="clave" hidden value="<?php echo $estacion->getIdEstacionClimatologica() ?>">
                            <input type="text" hidden id="Accion" name="Accion" value="Actualizar">                
                            <div class="col-sm">
                                <p>Clave:</p>
                                <input disabled  type="number" class="form-control" name="clave" id="clave" required value="<?php echo $estacion->getIdEstacionClimatologica() ?>">
                            </div>
                            <div class="col-sm">
                                <p>Clave OMM:</p>
                                <input  type="number" class="form-control" name="clave_omm" id="clave_omm" placeholder="No es obligatorio" value="<?php echo $estacion->getClave_omm() ?>">
                            </div>
                            <div class="col-sm">
                                <p>Nombre:</p>
                                <input  type="text" class="form-control" name="nombre" id="nombre" required value="<?php echo $estacion->getNombre() ?>">
                            </div>
                            <div class="col-sm">
                                <p>Estado:</p>
                                <input hidden type="text" value="<?php echo $muni['estado'] ?>" id="estadoID">
                                <select class="form-control" name="estado" id="estado" required></select>
                            </div>
                            <!--Municipio-->
                            <div class="col-sm">
                                <p>Municipio:</p>
                                <input hidden type="text" value="<?php echo $muni['municipio'] ?>" id="municipioID">
                                <select class="form-control" name="municipio" id="municipio" required></select>
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
                                <p>Subcuenca:</p>
                                <select class="form-control" name="subcuenca_id" id="subcuenca_id">
                                    <?php
                                    foreach ($subcuencas as $subcuenca) {
                                        if ($subcuenca['id_subcuenca'] == $estacion->getSubcuenca_id()) {
                                            ?>
                                            <option value="<?php echo $subcuenca['id_subcuenca']; ?>" selected><?php echo $subcuenca['nombre']; ?></option>
                                        <?php } else { ?>
                                            <option value="<?php echo $subcuenca['id_subcuenca']; ?>" ><?php echo $subcuenca['nombre']; ?></option>
                                            <?php
                                        }
                                    }
                                    ?>
                                </select>
                            </div>
                            <div class="col-sm">
                                <p>Tipo:</p>
                                <select class="form-control" name="tipo_id" id="tipo_id">
                                    <?php if ($estacion->getTipo() == 1) { ?>
                                        <option value="1" selected>Observatorio</option>
                                        <option value="2">Climatológica</option>                        
                                    <?php } else { ?>
                                        <option value="1" >Observatorio</option>
                                        <option value="2" selected>Climatológica</option>                        
                                    <?php } ?>

                                </select>
                            </div>
                            <div class="col-sm">
                                <p>Organismo:</p>
                                <select class="form-control" name="organismo_id" id="organismo_id">
                                    <?php
                                    foreach ($organismos as $organismo) {
                                        if ($organismo['id_organismo_climatologico'] == $estacion->getOrganismo_id()) {
                                            ?>
                                            <option value="<?php echo $organismo['id_organismo_climatologico']; ?>" selected><?php echo $organismo['nombre']; ?></option>
                                        <?php } else { ?>
                                            <option value="<?php echo $organismo['id_organismo_climatologico']; ?>" ><?php echo $organismo['nombre']; ?></option>
                                            <?php
                                        }
                                    }
                                    ?>
                                </select>
                            </div>
                            <div class="col-sm">
                                <p>Fecha Inicio:</p>
                                <input  type="date" class="form-control" placeholder="No es obligatorio" name="fechainicio" id="fechainicio" value="<?php echo $estacion->getFechainicio() ?>">
                            </div>   
                            <div class="col-sm">
                                <p>Fecha Fin:</p>
                                <input  type="date" class="form-control" name="fechafin" id="fechafin" required value="<?php echo $estacion->getFechafin() ?>">
                            </div>                                                        
                            <div class="col-sm">
                                <p>Situación:</p>
                                <select class="form-control" name="situacion" id="situacion">
                                    <?php if ($estacion->getSituacion() == 1) { ?>
                                        <option value="1" selected>Operando</option>
                                        <option value="0">Suspendido</option>                      
                                    <?php } else { ?>
                                        <option value="1">Operando</option>
                                        <option value="0" selected>Suspendido</option>                      
                                    <?php } ?>
                                </select>
                            </div>
                            <div class="col-sm">
                                <p>Latitud:</p>
                                <input  type="number" step="any" class="form-control" name="latitud" id="latitud" required value="<?php echo $estacion->getLatitud() ?>">
                            </div>             
                            <div class="col-sm">
                                <p>Longitud:</p>
                                <input  type="number" step="any" class="form-control" name="longitud" id="longitud" required value="<?php echo $estacion->getLongitud() ?>">
                            </div>                
                            <div class="col-sm">
                                <p>Altura:</p>
                                <input  type="number" step="any" class="form-control" name="altura" id="altura" required value="<?php echo $estacion->getAltura() ?>">
                            </div>                      
                            <div class="col-sm">
                                <p>Observaciones:</p>
                                <input  type="text" class="form-control" placeholder="No es obligatorio" name="observaciones" id="observaciones" value="<?php echo $estacion->getObservaciones() ?>">
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
<script src="/estilo/js/municipios.js"></script>
<script type="text/javascript" src="/aplicacion/vista/crud/alerts.js"></script>
<script>
$(document).ready(function () {
    var estados = "<option value='' disabled selected>Selecciona el estado</option>";
    for (var key in municipios) {
        if (municipios.hasOwnProperty(key)) {
            if (key.localeCompare((document.getElementById("estadoID").value).toUpperCase()) == 0) {
                estados = estados + "<option selected value='" + key + "'>" + key + "</option>";
            } else {
                estados = estados + "<option value='" + key + "'>" + key + "</option>";
            }
        }
    }
    $('#estado').html(estados);
    // Al detectar
    $("#estado").change(function () {
        var html = "<option value='' disabled selected>Selecciona el municipio</option>";
        $("#estado option:selected").each(function () {
            var estado = $(this).text();
            if (estado != "Selecciona el estado") {
                var municipio = municipios[estado];
                for (var i = 0; i < municipio.length; i++) {
                    if (municipio[i].localeCompare((document.getElementById("municipioID").value)) == 0) {
                        html += "<option selected value='" + municipio[i] + "'>" + municipio[i] + "</option>";
                    } else {
                        html += "<option  value='" + municipio[i] + "'>" + municipio[i] + "</option>";
                    }
                }
            }
        });
        $('#municipio').html(html);
        $('select').material_select('update');
    })
            .trigger("change");
});

</script>
