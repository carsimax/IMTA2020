<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../modelo/anio.php");
require_once(__DIR__ . "/../../../modelo/modulo.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
$registros = new Anio();
$Anios = $registros->getAnios();
$registros = new Modulo();
$modulos = $registros->getModulos();
?>

<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarForm('MunicipioMarginacion')">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Nuevo Registro</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <form action="" name="formPropietario" onsubmit="valiFormNuevo('/aplicacion/controlador/municipiomarginacion.php',$('form').serialize(),'MunicipioMarginacion'); return false">
                            <input type="text" hidden id="Accion" name="Accion" value="Nuevo">
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
                                <p>Pob. Tot.:</p>
                                <input  type="number" class="form-control" name="pob_tot" id="pob_tot">
                            </div>
                            <div class="col-sm">
                                <p>Analf:</p>
                                <input step=any type="number" min="0" max="100" class="form-control" name="analf" id="analf">
                            </div>
                            <div class="col-sm">
                                <p>Sprim:</p>
                                <input step=any type="number" min="0" max="100" class="form-control" name="sprim" id="sprim">
                            </div>
                            <div class="col-sm">
                                <p>Ovsde:</p>
                                <input step=any type="number" min="0" max="100" class="form-control" name="ovsde" id="ovsde">
                            </div>
                            <div class="col-sm">
                                <p>Ovsee:</p>
                                <input step=any type="number" min="0" max="100" class="form-control" name="ovsee" id="ovsee">
                            </div>
                            <div class="col-sm">
                                <p>Ovsae:</p>
                                <input step=any type="number" min="0" max="100" class="form-control" name="ovsae" id="ovsae">
                            </div>
                            <div class="col-sm">
                                <p>Vhac:</p>
                                <input step=any type="number" min="0" max="100" class="form-control" name="vhac" id="vhac">
                            </div>
                            <div class="col-sm">
                                <p>Ovpt:</p>
                                <input step=any type="number" min="0" max="100" class="form-control" name="ovpt" id="ovpt">
                            </div>
                            <div class="col-sm">
                                <p>Pl. 5000:</p>
                                <input step=any type="number" min="0" max="100" class="form-control" name="pl_5000" id="pl_5000">
                            </div>
                            <div class="col-sm">
                                <p>Po2sm:</p>
                                <input step=any type="number" min="0" max="100" class="form-control" name="po2sm" id="po2sm">
                            </div>                                                        
                            <div class="col-sm">
                                <p>IM:</p>
                                <input step=any type="number" class="form-control" name="im" id="im">
                            </div>                                                                        
                            <div class="col-sm">
                                <p>GM:</p>
                                <select class="form-control" name="gm" id="gm">
                                    <option value="Muy alto">Muy alto</option>
                                    <option value="Alto">Alto</option>
                                    <option value="Medio">Medio</option>
                                    <option value="Bajo">Bajo</option>
                                    <option value="Muy bajo">Muy bajo</option>
                                </select>                    
                            </div>                                                                                                    
                            <div class="col-sm">
                                <p>Año:</p>
                                <select class="form-control" name="anio_id" id="anio_id">
                                    <?php
                                    foreach ($Anios as $Anio) {
                                        ?>
                                        <option value="<?php echo $Anio['id_anio']; ?>"><?php echo $Anio['anio']; ?></option>
                                    <?php } ?>
                                </select>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm">
                                    <a onclick="cancelarForm('MunicipioMarginacion')" class="btn btn-gob2 text-light btn-block">Cancelar</a>
                                </div>
                                <div class="col-sm">
                                    <button type="submit" class="btn btn-primary btn-fill  btn-block">Guardar</button>
                                </div>
                            </div>
                        </form>
                        <br>
                        <div class="col-sm">
                            <br>
                            <h5>Glosario:</h5>
                            <ul>
                                <li><b>Pob. Tot. :</b> Población total.</li>
                                <li><b>Analf. :</b> Porcentaje de población de 15 años o más analfabeta.</li>
                                <li><b>Sprim. :</b> Porcentaje de población de 15 años o más sin primaria completa.</li>
                                <li><b>Ovsde. :</b> Porcentaje de ocupantes en viviendas sin drenaje ni excusado.</li>
                                <li><b>Ovsee. :</b> Porcentaje de ocupantes en viviendas sin energía eléctrica.</li>
                                <li><b>Ovsae. :</b> Porcentaje de ocupantes en viviendas sin agua entubada.</li>
                                <li><b>Vhac. :</b> Porcentaje de viviendas con algún nivel de hacinamiento.</li>
                                <li><b>Ovpt. :</b> Porcentaje de ocupantes en viviendas con piso de tierra.</li>
                                <li><b>Pl. 5000. :</b> Porcentaje de población en localidades con menos de 5 000 habitantes.</li>
                                <li><b>Po2sm. :</b> Porcentaje de población ocupada con ingreso de hasta 2 salarios mínimos.</li>
                                <li><b>IM. :</b> Índice de marginación.</li>
                                <li><b>GM. :</b> Grado de marginación.</li>                
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    </div>
</div>








<?php require_once(__DIR__ . "/../../plantillas/footer.php"); ?>
<script type="text/javascript" src="/aplicacion/vista/crud/alerts.js"></script>

<script src="/estilo/js/municipios.js"></script>
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
