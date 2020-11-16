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
$registros = new Anio();
$Anios = $registros->getAnios();
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
                        <li class="breadcrumb-item active" aria-current="page">Nueva Estación Climatológica</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <form action="" name="formPropietario" onsubmit="valiFormNuevo('/aplicacion/controlador/estacionclimatologica.php', $('form').serialize(),'EstacionesClimatologicas' ); return false">
                            <input type="text" hidden id="Accion" name="Accion" value="Nuevo">
                            <div class="col-sm">
                                <p>Clave:</p>
                                <input  type="number" class="form-control" name="clave" id="clave" required>
                            </div>
                            <div class="col-sm">
                                <p>Clave OMM:</p>
                                <input  type="number" class="form-control" name="clave_omm" id="clave_omm" placeholder="No es obligatorio">
                            </div>
                            <div class="col-sm">
                                <p>Nombre:</p>
                                <input  type="text" class="form-control" name="nombre" id="nombre" required>
                            </div>
                            <div class="col-sm">
                                <p>Estado:</p>
                                <select class="form-control" name="estado" id="estado" required></select>
                            </div>
                            <!--Municipio-->
                            <div class="col-sm">
                                <p>Municipio:</p>
                                <select class="form-control" name="municipio" id="municipio" required></select>
                            </div>
                            <div class="col-sm">
                                <p>Cuenca:</p>
                                <select class="form-control" name="cuenca_id" id="cuenca_id" required>
                                    <?php foreach ($cuencas as $cuenca) { ?>
                                        <option value="<?php echo $cuenca['id_cuenca']; ?>"><?php echo $cuenca['nombre']; ?></option>
                                    <?php } ?>
                                </select>
                            </div>
                            <div class="col-sm">
                                <p>Subcuenca:</p>
                                <select class="form-control" name="subcuenca_id" id="subcuenca_id">
                                    <?php foreach ($subcuencas as $subcuenca) { ?>
                                        <option value="<?php echo $subcuenca['id_subcuenca']; ?>"><?php echo $subcuenca['nombre']; ?></option>
                                    <?php } ?>
                                </select>
                            </div>
                            <div class="col-sm">
                                <p>Tipo:</p>
                                <select class="form-control" name="tipo_id" id="tipo_id">
                                    <option value="1">Observatorio</option>
                                    <option value="2">Climatológica</option>                        
                                </select>
                            </div>
                            <div class="col-sm">
                                <p>Organismo:</p>
                                <select class="form-control" name="organismo_id" id="organismo_id">
                                    <?php foreach ($organismos as $organismo) { ?>
                                        <option value="<?php echo $organismo['id_organismo_climatologico']; ?>"><?php echo $organismo['nombre']; ?></option>
                                    <?php } ?>
                                </select>
                            </div>
                            <div class="col-sm">
                                <p>Fecha Inicio:</p>
                                <input  type="date" class="form-control" placeholder="No es obligatorio" name="fechainicio" id="fechainicio">
                            </div>   
                            <div class="col-sm">
                                <p>Fecha Fin:</p>
                                <input  type="date" class="form-control" name="fechafin" id="fechafin" required>
                            </div>                                                        
                            <div class="col-sm">
                                <p>Situación:</p>
                                <select class="form-control" name="situacion" id="situacion">
                                    <option value="1">Operando</option>
                                    <option value="0">Suspendido</option>            
                                </select>
                            </div>
                            <div class="col-sm">
                                <p>Latitud:</p>
                                <input  type="number" step="any" class="form-control" name="latitud" id="latitud" required>
                            </div>             
                            <div class="col-sm">
                                <p>Longitud:</p>
                                <input  type="number" step="any" class="form-control" name="longitud" id="longitud" required>
                            </div>                
                            <div class="col-sm">
                                <p>Altura:</p>
                                <input  type="number" step="any" class="form-control" name="altura" id="altura" required>
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
    // Cargamos los estados
    var estados = "<option value='' disabled selected>Selecciona el estado</option>";
    for (var key in municipios) {
        if (municipios.hasOwnProperty(key)) {
            estados = estados + "<option value='" + key + "'>" + key + "</option>";
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
                for (var i = 0; i < municipio.length; i++)
                    html += "<option value='" + municipio[i] + "'>" + municipio[i] + "</option>";
            }
        });
        $('#municipio').html(html);
        $('select').material_select('update');
    })
            .trigger("change");
});
</script>
