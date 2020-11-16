<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
//Llamada a los controladore sy modelos necesarios para editar a un nuevo propietario
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
require_once(__DIR__ . "/../../../modelo/uso.php");
require_once(__DIR__ . "/../../../modelo/titulo.php");
ini_set('memory_limit', '512M');
$Titulo = new Titulo();
$Titulo = $Titulo->getTitulo($_POST['ID']);
//
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
                        <li class="breadcrumb-item active" aria-current="page">Editar Título</li>
                    </ol>
                </nav>
            </div>
            <!--Aquí temina la seccion del encabezado-->
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <form action="" name="formPropietario" onsubmit="valiFormNuevo('/aplicacion/controlador/titulo.php', $('form').serialize(), 'Titulos'); return false">
                            <input type="text" hidden id="Accion" name="Accion" value="Actualizar">
                            <div class="row">
                                <div class="col-sm">
                                    <p>Folio:</p>
                                    <input readonly name="id_titulo" id="id_titulo" type="text" class="form-control" value="<?php echo $Titulo->getId_titulo() ?>" required>
                                </div>
                                <div class="col-sm">
                                    <p>Titular:</p>
                                    <input name="titular" id="titular" type="text" class="form-control" value="<?php echo $Titulo->getTitular() ?>" required>
                                </div>
                                <!--Uso-->
                                <div class="col-sm">
                                    <p>Uso:</p>
                                    <select class="form-control" name="uso_id" id="uso_id" required>
                                        <?php
                                        foreach ($Usos as $Uso) {
                                            if ($Titulo->getUso_id() == $Uso['id_uso']) {
                                                ?>
                                                <option selected value="<?php echo $Uso['id_uso']; ?>"><?php echo $Uso['uso']; ?></option>
                                                <?php
                                            } else {
                                                ?>
                                                <option value="<?php echo $Uso['id_uso']; ?>"><?php echo $Uso['uso']; ?></option>
                                                <?php
                                            }
                                        }
                                        ?>
                                    </select>
                                </div>      
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <p>Volumen de extracción de aguas nacionales (m3/año):</p>
                                    <input step=any type="number" class="form-control" name="vol_amparado_total" id="vol_amparado_total"
                                           value="<?php echo $Titulo->getVol_amparado_total() ?>" required>     
                                </div>
                                <div class="col-sm">
                                    <p>Número de anexos de aguas superficiales:</p>
                                    <input type="number" class="form-control" name="num_aprov_superf" id="num_aprov_superf"
                                           value="<?php echo $Titulo->getNum_aprov_superf() ?>" required>
                                </div>
                                <div class="col-sm">
                                    <p>Volumen de aguas superficiales (m3/año):</p>
                                    <input step=any type="number" class="form-control" name="vol_aprov_superf" id="vol_aprov_superf"
                                           value="<?php echo $Titulo->getVol_aprov_superf() ?>" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <p>Número de anexos de aguas subterráneas:</p>
                                    <input type="number" class="form-control" name="num_aprov_subt" id="num_aprov_subt"
                                           value="<?php echo $Titulo->getNum_aprov_subt() ?>" required>
                                </div>
                                <div class="col-sm">
                                    <p>Volumen de aguas subterráneas (m3/año):</p>
                                    <input step=any type="number" class="form-control" name="vol_aprov_subt" id="vol_aprov_subt"
                                           value="<?php echo $Titulo->getVol_aprov_subt() ?>" required>
                                </div>
                                <div class="col-sm">
                                    <p>Número de anexos de descarga:</p>
                                    <input type="number" class="form-control" name="puntos_desc" id="puntos_desc"
                                           value="<?php echo $Titulo->getPuntos_desc() ?>" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <p>Volumen de descarga (m3/día):</p>
                                    <input step=any type="number" class="form-control" name="vol_desc_diario" id="vol_desc_diario"
                                           value="<?php echo $Titulo->getVol_desc_diario() ?>" required>
                                </div>
                                <div class="col-sm">
                                    <p>Número de anexos de zonas federales:</p>
                                    <input type="number" class="form-control" name="zonas_fed_amp_titulo" id="zonas_fed_amp_titulo"
                                           value="<?php echo $Titulo->getZonas_fed_amp_titulo() ?>" required>
                                </div>
                                <div class="col-sm">
                                    <p>Superficie:</p>
                                    <input step=any type="number" class="form-control" name="supeficie" id="supeficie"
                                           value="<?php echo $Titulo->getSupeficie() ?>" required>
                                </div>
                                <div class="col-sm">
                                    <p>Fecha de registro:</p>
                                    <input type="date" class="form-control" name="fecha_reg" id="fecha_reg" value="<?php echo $Titulo->getFecha_reg() ?>" required>
                                </div>     
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm">
                                    <a onclick="cancelarForm('Titulos')" class="btn btn-gob2 text-light btn-block">Cancelar</a>
                                </div>
                                <div class="col-sm">
                                    <button type="submit" class="btn btn-gob btn-fill  btn-block">Guardar</button>
                                </div>
                            </div>
                        </form>
                        <br>
                        <div class="row">
                            <div class="col-sm">
                                <div class="row">
                                    <div class="col-sm">
                                        <button type="button" onclick="NuevoPozo()"  class="btn btn-gob btn-fill  btn-block"><i class="fas fa-plus"></i> Nuevo Pozo</button>
                                    </div>
                                </div>
                                <br>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm">
                                <table id="exampleP" cellpadding="0" cellspacing="0" border="0" class="table table-bordered responsive nowrap" width="100%">
                                </table>
                                <br>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    </div>
</div>





<!--Footer de la pagina-->
<?php require_once(__DIR__ . "/../../plantillas/footer.php"); ?>
<script type="text/javascript" src="/aplicacion/vista/crud/alerts.js"></script>
<!--Scripts de la funcionalidad de la edicion de una concesion-->
<script>
                                            tablaP = $('#exampleP').DataTable({
                                                columns: [
                                                    {
                                                        title: 'ID Pozo',
                                                        className: 'dt-body-justify'
                                                    },
                                                    {
                                                        title: 'Título',
                                                        className: 'dt-body-justify'
                                                    },
                                                    {
                                                        title: 'Latitud',
                                                        className: 'dt-body-right'
                                                    },
                                                    {
                                                        title: 'Longitud',
                                                        className: 'dt-body-right'
                                                    },
                                                    {
                                                        title: 'Editar',
                                                        className: 'dt-body-right'
                                                    },
                                                    {
                                                        title: 'Eliminar',
                                                        className: 'dt-body-right'
                                                    }
                                                ],
                                                language: {
                                                    url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                                                },
                                                columnDefs: [{
                                                        targets: 4,
                                                        data: null,
                                                        defaultContent: '<button id="editar" class="btn btn-gob btn-fill"><i class="fa fa-edit"></button>',
                                                        width: "5%"
                                                    },
                                                    {
                                                        targets: 5,
                                                        data: null,
                                                        defaultContent: '<button id="eliminar" class="btn btn-gob btn-fill"><i class="far fa-trash-alt"></i></button>',
                                                        width: "5%"
                                                    }]
                                            }
                                            );
                                            query = 'titulo_id="' + document.getElementById("id_titulo").value + '"';
                                            cadena = "Accion=Titulo&query=" + query;
                                            $.ajax({
                                                type: "POST",
                                                url: "/aplicacion/controlador/pozo.php",
                                                data: cadena,
                                                //Si el controlador devuelve una respuesta
                                                success: function (resp) {
                                                    var data = [];
                                                    //Primero se desglosara por Acuifero
                                                    $.each(JSON.parse(resp), function (index, item) {
                                                        data.push([item.id_pozo, item.titulo_id, item.lat, item.lon]);
                                                    });
                                                    tablaP.clear().draw();
                                                    tablaP.rows.add(data).draw();
                                                }
                                            });

                                            $('#exampleP').on('click', '#editar', function () {
                                                var data = tablaP.row($(this).parents('tr')).data();
                                                $.redirect("/aplicacion/vista/crud/titulos/editarp1.php", {ID: data[0]}, "POST");
                                            });

                                            $('#exampleP').on('click', '#eliminar', function () {
                                                var data = tablaP.row($(this).parents('tr')).data();
                                                Swal.fire({
                                                    title: "¿Estás seguro?",
                                                    text: "Está a punto de eliminar " + data[1],
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#621132',
                                                    cancelButtonColor: '#6f7271',
                                                    confirmButtonText: 'Sí, continuar',
                                                    cancelButtonText: 'Cancelar'
                                                }).then((result) => {
                                                    if (result.value) {
                                                        cadena = "ID=" + data[0] + "&Accion=Delete";
                                                        $.ajax({
                                                            type: 'GET',
                                                            url: '/aplicacion/controlador/pozo.php',
                                                            data: cadena,
                                                            success: function (response) {
                                                                if (response == 1) {
                                                                    swal("Buen Trabajo!", "Se han guardado los cambios", "success").
                                                                            then((value) => {
                                                                                var Folio = $("#id_titulo").val();
                                                                                $.redirect("/aplicacion/vista/crud/titulos/editar.php", {ID: Folio, Tipo: 0}, "POST");
                                                                            });
                                                                } else {
                                                                    algoAndaMal('No se ha podido eliminar el registro.');
                                                                }
                                                            },
                                                        });
                                                    }
                                                });
                                            });
                                            function NuevoPozo() {
                                                var Tipo = <?php echo $_POST['Tipo'] ?>;
                                                var Folio = $("#id_titulo").val();
                                                $.redirect("/aplicacion/vista/crud/titulos/NuevoP" + Tipo + ".php", {ID: Folio}, "POST");
                                            }
</script>
