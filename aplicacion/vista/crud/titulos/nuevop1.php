<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
require_once(__DIR__ . "/../../../modelo/uso.php");
require_once(__DIR__ . "/../../../modelo/region.php");
require_once(__DIR__ . "/../../../modelo/tipopozo.php");
$registros = new TipoPozo();
$Tipos = $registros->getTodos();
ini_set('memory_limit', '512M');
//Obtenemos los usos
$registros = new Uso();
$Usos = $registros->getTodos();
//Obtee\ner lar RH
$registros = new RegionHidrologica();
$RH = $registros->getTodos();
?>

<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a onclick="cancelarForm()">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item active">Nuevo Pozo</li>
                    </ol>
                </nav>
            </div>
            <!--Aquí temina la seccion del encabezado-->
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <form action="" name="formTenencia" onsubmit="valiFormNuevo(); return false">
                            <input type="text" hidden id="Accion" name="Accion" value="Nuevo">
                            <!--Select de los propietarios-->
                            <!--Select del Tipo de Pozo-->
                            <div class="form-group  col-md-6" id="divTipo">
                                <p>Tipo de Título:</p>
                                <select class="form-control" onchange="cambiarForm()" id="tipo_id">
                                    <?php
                                    foreach ($Tipos as $Tipo) {
                                        ?>
                                        <option value="<?php echo $Tipo['id_tipo']; ?>"><?php echo $Tipo['tipo']; ?></option>
                                    <?php } ?>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <p>Titulo:</p>
                                <input readonly name="titulo_id" id="titulo_id" type="text" class="form-control"
                                       value="<?php
                                       if (isset($_POST['ID'])) {
                                           echo $_POST['ID'];
                                       }
                                       ?>"
                                       required>
                                <br>   
                            </div>
                            <!--RH-->
                            <div class="form-group col-md-6">
                                <p>Región Hidrologíca:</p>
                                <select class="form-control" name="rh_id" id="rh_id" required>
                                    <?php
                                    foreach ($RH as $R) {
                                        ?>
                                        <option value="<?php echo $R['id_reg_hidrologica']; ?>"><?php echo $R['nombre']; ?></option>
                                    <?php } ?>
                                </select>
                            </div>
                            <!--Estado-->
                            <div class="form-group col-md-6">
                                <p>Estado:</p>
                                <select class="form-control" name="estado" id="estado" required></select>
                            </div>
                            <!--Municipio-->
                            <div class="form-group col-md-6">
                                <p>Municipio:</p>
                                <select class="form-control" name="municipio" id="municipio" required></select>
                            </div>
                            <!--Cuenca-->
                            <div class="form-group col-md-6">
                                <p>Cuenca:</p>
                                <input  name="cuenca_id" id="cuenca_id" type="number" class="form-control">
                            </div>
                            <!--divPozo-->
                            <div id="divFormPozo">
                            </div>
                            <!--Latitud-->
                            <div class="form-group col-md-6">
                                <p>Latitud:</p>
                                <input type="number" step=any class="form-control" name="latitud" id="latitud" required>
                            </div>
                            <!--Longuitos-->    
                            <div class="form-group col-md-6">
                                <p>Longitud:</p>
                                <input type="number" step=any class="form-control" name="longitud" id="longitud" required>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-md-6">
                                    <a onclick="cancelarForm()" class="btn btn-gob2 btn-fill  btn-block">Cancelar</a>
                                </div>
                                <div class="col-md-6">
                                    <button type="submit" class="btn btn-gob btn-fill  btn-block">Guardar</button>
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
<script>
                        $(document).ready(function () {
                            var Form = $("#tipo_id").val();
                            document.getElementById("divFormPozo").innerHTML = "";
                            $("#divFormPozo").load('formPozo' + Form + '.php');
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

                        //Funcion para cancelar el formulario
                        function cancelarForm() {
                            var Folio = $("#titulo_id").val();
                            swal({
                                title: "¿Estás seguro?",
                                text: "No se guardarán los cambios en la base de datos.",
                                icon: "error",
                                buttons: true,
                                dangerMode: true,
                            })
                                    .then((willDelete) => {
                                        if (willDelete) {
                                            $.redirect("/aplicacion/vista/crud/titulos/editar.php", {ID: Folio, Tipo: 1}, "POST");
                                        }
                                    });
                        }

                        //Funcion para validar el formulario
                        function valiFormNuevo() {
                            var Folio = $("#titulo_id").val();
                            swal({
                                title: "¿Estás seguro?",
                                text: "Se guardaran los cambios en la base de datos",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                            })
                                    .then((willDelete) => {
                                        if (willDelete) {
                                            $.ajax({
                                                type: 'GET',
                                                url: '/aplicacion/controlador/pozo.php',
                                                data: $("form").serialize(),
                                                success: function (response) {
                                                    switch (response) {
                                                        case 'OK':

                                                            swal("Buen Trabajo!", "Se han guardado los cambios", "success")
                                                                    .then((value) => {
                                                                        swal({
                                                                            title: "Agregar nuevo pozo",
                                                                            text: "¿Deseas agregar otro pozo?",
                                                                            icon: "warning",
                                                                            buttons: true,
                                                                            dangerMode: true,
                                                                        })
                                                                                .then((willDelete) => {
                                                                                    if (willDelete) {
                                                                                        $.redirect("/aplicacion/vista/crud/titulos/nuevop1.php", {ID: Folio}, "POST");
                                                                                    } else {
                                                                                        $.redirect("/aplicacion/vista/crud/titulos/editar.php", {ID: Folio, Tipo: 1}, "POST");
                                                                                    }
                                                                                });
                                                                    });
                                                            break;
                                                        case 'Ya se encuentra en la Base de Datos':
                                                            swal("Algo Anda mal!", response, "error");
                                                            break;
                                                    }
                                                },
                                            });
                                        }
                                    });
                        }

                        cadena = "Accion=Todos";
                        $.ajax({
                            type: "POST",
                            url: "/aplicacion/controlador/titulo.php",
                            data: cadena,
                            //Si el controlador devuelve una respuesta
                            success: function (resp) {
                                var data = [];
                                //Primero se desglosara por Acuifero
                                $.each(JSON.parse(resp), function (index, item) {
                                    data.push([item.id_titulo, item.titular, item]);
                                });
                                table = $('#example').DataTable(
                                        {
                                            data: data,
                                            deferRender: true,
                                            scrollY: 200,
                                            scrollCollapse: true,
                                            scroller: true,
                                            "language": {
                                                "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                                            },
                                            "columnDefs": [{
                                                    "targets": 2,
                                                    "data": null,
                                                    "defaultContent": "<a class=\"btn btn-primary btn-fill  btn-block\"><i class=\"fas fa-check\"></i></a>"
                                                }]
                                        }
                                );
                            }
                        });
                        $('#example tbody').on('click', 'a', function () {
                            var data = table.row($(this).parents('tr')).data();
                            document.getElementById("titulo_id").value = data[0];
                        });

                        function cambiarForm() {
                            var Form = $("#tipo_id").val();
                            document.getElementById("divFormPozo").innerHTML = "";
                            $("#divFormPozo").load('formPozo' + Form + '.php');
                        }
</script>