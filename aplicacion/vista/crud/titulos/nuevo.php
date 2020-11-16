<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once(__DIR__ . "/../../plantillas/header.php");
//Llamada a los controladore sy modelos necesarios para agrregar a un nuevo propietario
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../modelo/acuifero.php");
require_once(__DIR__ . "/../../../modelo/estado.php");
require_once(__DIR__ . "/../../../modelo/uso.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
ini_set('memory_limit', '512M');
//Obtenemos los usos
$registros = new Uso();
$Usos = $registros->getTodos();
?>

<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarForm('Titulos')">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Nuevo Título</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <form action="" name="form" onsubmit="valiFormNuevo('/aplicacion/controlador/titulo.php', $('form').serialize(), 'Titulos'); return false">
                            <input type="text" hidden id="Accion" name="Accion" value="Nuevo">
                            <div class="row">
                                <div class="col-sm">
                                    <p>Folio:</p>
                                    <input  name="id_titulo" id="id_titulo" type="text" class="form-control"  required>
                                </div>
                                <div class="col-sm">
                                    <p>Titular:</p>
                                    <input name="titular" id="titular" type="text" class="form-control" required>
                                </div>
                                <div class="col-sm">
                                    <p>Uso:</p>
                                    <select class="form-control" name="uso_id" id="uso_id" required>
                                        <?php
                                        foreach ($Usos as $Uso) {
                                            ?>
                                            <option value="<?php echo $Uso['id_uso']; ?>"><?php echo $Uso['uso']; ?></option>
                                            <?php
                                        }
                                        ?>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <p>Volumen de extracción de aguas nacionales (m3/año):</p>
                                    <input step=any type="number" class="form-control" name="vol_amparado_total" id="vol_amparado_total"
                                           required>     
                                </div>
                                <div class="col-sm">
                                    <p>Número de anexos de aguas superficiales:</p>
                                    <input type="number" class="form-control" name="num_aprov_superf" id="num_aprov_superf"
                                           required>
                                </div>
                                <div class="col-sm">
                                    <p>Volumen de aguas superficiales (m3/año):</p>
                                    <input step=any type="number" class="form-control" name="vol_aprov_superf" id="vol_aprov_superf"
                                           required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <p>Número de anexos de aguas subterráneas:</p>
                                    <input type="number" class="form-control" name="num_aprov_subt" id="num_aprov_subt"
                                           required>
                                </div>
                                <div class="col-sm">
                                    <p>Volumen de aguas subterráneas (m3/año):</p>
                                    <input step=any type="number" class="form-control" name="vol_aprov_subt" id="vol_aprov_subt"
                                           required>
                                </div>
                                <div class="col-sm">
                                    <p>Número de anexos de descarga:</p>
                                    <input type="number" class="form-control" name="puntos_desc" id="puntos_desc"
                                           required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <p>Volumen de descarga (m3/día):</p>
                                    <input step=any type="number" class="form-control" name="vol_desc_diario" id="vol_desc_diario"
                                           required>
                                </div>
                                <div class="col-sm">
                                    <p>Número de anexos de zonas federales:</p>
                                    <input type="number" class="form-control" name="zonas_fed_amp_titulo" id="zonas_fed_amp_titulo"
                                           required>
                                </div>
                                <div class="col-sm">
                                    <p>Superficie:</p>
                                    <input step=any type="number" class="form-control" name="supeficie" id="supeficie"
                                           required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <p>Fecha de registro:</p>
                                    <input type="date" class="form-control" name="fecha_reg" id="fecha_reg"
                                           required>
                                </div>
                            </div>
                            <div class="row">
                                <table id="example" class="table table-bordered responsive nowrap" cellspacing="0" width="100%"></table>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm">
                                    <a onclick="cancelarForm('Titulos')" class="btn btn-gob2 text-light btn-block">Cancelar</a>
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



<!--Pie de pagina-->
<?php require_once(__DIR__ . "/../../plantillas/footer.php"); ?>
<script type="text/javascript" src="/aplicacion/vista/crud/alerts.js"></script>


<script>
                                        cadena = "&Accion=Todos";
                                        $.ajax({
                                            type: "POST",
                                            url: "/aplicacion/controlador/titular.php",
                                            data: cadena,
                                            //Si el controlador devuelve una respuesta
                                            success: function (resp) {
                                                var data = [];
                                                //Primero se desglosara por Acuifero
                                                $.each(JSON.parse(resp), function (index, item) {
                                                    data.push([item.id_titular, item.titular, item])
                                                });
                                                table = $('#example').DataTable(
                                                        {
                                                            data: data,

                                                            "language": {
                                                                "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                                                            },
                                                            "columnDefs": [{
                                                                    "targets": 2,
                                                                    "data": null,
                                                                    "defaultContent": "<a class=\"btn btn-primary btn-fill  btn-block\"><i class=\"fas fa-edit\"></i></a>"
                                                                }]
                                                        }
                                                );
                                            }
                                        });

                                        $('#example tbody').on('click', 'a', function () {
                                            var data = table.row($(this).parents('tr')).data();
                                            document.getElementById("titular_id").value = data[0];
                                        });
</script>
