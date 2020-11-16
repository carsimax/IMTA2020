<?php
/**
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
require_once(__DIR__ . "/../../../modelo/uso.php");
require_once(__DIR__ . "/../../../modelo/region.php");
require_once(__DIR__ . "/../../../modelo/pozo.php");
ini_set('memory_limit', '512M');
//Obtenemos los usos
$registros = new Uso();
$Usos = $registros->getTodos();
//Obtee\ner lar RH
$registros = new RegionHidrologica();
$RH = $registros->getTodos();
$Pozo = new Pozo();
$Pozo = $Pozo->getPozo($_POST['ID']);
?>

<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a onclick="cancelarForm()">Título de concesión</a></li>
                        <li class="breadcrumb-item active">Editar Pozo</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <form action="" name="formTenencia" onsubmit="valiFormNuevo(); return false">
                            <input type="text" hidden id="Accion" name="Accion" value="Actualizar">
                            <div class="col-sm">
                                <p>ID Pozo:</p>
                                <input readonly name="id_pozo" id="id_pozo" type="number" class="form-control"
                                       value="<?php echo $Pozo->getID_pozo() ?>"
                                       required>
                                <br>   
                            </div>
                            <div class="col-sm">
                                <p>Título:</p>
                                <input readonly name="titulo_id" id="titulo_id" type="text" class="form-control"
                                       value="<?php echo $Pozo->getTitulo_id() ?>"
                                       required>
                                <br>   
                            </div>
                            <!--RH-->
                            <div class="col-sm">
                                <p>Región Hidrologíca:</p>
                                <select class="form-control" name="rh_id" id="rh_id" required>
                                    <?php
                                    foreach ($RH as $R) {
                                        if ($Pozo->getRegion_id() == $R['id_reg_hidrologica']) {
                                            ?>
                                            <option selected value="<?php echo $R['id_reg_hidrologica']; ?>"><?php echo $R['nombre']; ?></option>
                                            <?php
                                        } else {
                                            ?>
                                            <option value="<?php echo $R['id_reg_hidrologica']; ?>"><?php echo $R['nombre']; ?></option>
                                            <?php
                                        }
                                    }
                                    ?>
                                </select>
                            </div>
                            <!--Estado-->
                            <div class="col-sm">
                                <p>Estado:</p>
                                <input hidden type="text" value="<?php echo $Pozo->getEstado_Id() ?>" id="estadoID">
                                <select class="form-control" name="estado" id="estado" required>           
                                </select>
                            </div>
                            <!--Municipio-->
                            <div class="col-sm">
                                <p>Municipio:</p>
                                <input hidden type="text" value="<?php echo $Pozo->getMunicipio_id() ?>" id="municipioID">
                                <select class="form-control" name="municipio" id="municipio" required>   
                                </select>
                            </div>
                            <!--Cuenca-->
                            <div class="col-sm">
                                <p>Cuenca:</p>
                                <input  name="cuenca_id" id="cuenca_id" type="number" class="form-control"
                                        value="<?php echo $Pozo->getCuenca_id() ?>">
                            </div>
                            <?php
                            require_once('editPozo' . $Pozo->getTipo_id() . '.php');
                            ?>    
                            <!--Latitud-->
                            <div class="col-sm">
                                <p>Latitud:</p>
                                <input type="number" step=any class="form-control" name="latitud" id="latitud" required
                                       value="<?php echo $Pozo->getLat() ?>">
                            </div>
                            <!--Longuitos-->    
                            <div class="col-sm">
                                <p>Longitud:</p>
                                <input type="number" step=any class="form-control" name="longitud" id="longitud" required
                                       value="<?php echo $Pozo->getLon() ?>">
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm">
                                    <a onclick="cancelarForm()" class="btn btn-gob2 btn-fill  btn-block">Cancelar</a>
                                </div>
                                <div class="col-sm">
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
                                            // Cargamos los estados
                                            //var sEstado=document.getElementById("estadoID").value;
                                            //var sMunicipio=document.getElementById("municipioID").value;
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


                                        //Funcion para cancelar el formulario
                                        function cancelarForm() {
                                            var id = $("#titulo_id").val();
                                            var tipo = 1;
                                            swal({
                                                title: "¿Estás seguro?",
                                                text: "No se guardarán los cambios en la base de datos.",
                                                icon: "error",
                                                buttons: true,
                                                dangerMode: true,
                                            })
                                                    .then((willDelete) => {
                                                        if (willDelete) {
                                                            $.redirect("/aplicacion/vista/crud/titulos/editar.php", {ID: id, Tipo: tipo}, "POST");
                                                        }
                                                    });
                                        }

                                        //Funcion para validar el formulario
                                        function valiFormNuevo() {
                                        var Folio = $("#titulo_id").val();
                                                Swal.fire({
                                                title: "¿Estás seguro?",
                                                        text: "Se guardarán los cambios en la base de datos.",
                                                        icon: "warning",
                                                        showCancelButton: true,
                                                        confirmButtonColor: '#621132',
                                                        cancelButtonColor: '#6f7271',
                                                        confirmButtonText: 'Sí, continuar',
                                                        cancelButtonText: 'Cancelar'
                                                }).then((result) => {
                                        if (result.value) {
                                        $.ajax({
                                        type: 'GET',
                                                url: '/aplicacion/controlador/pozo.php',
                                                data: $("form").serialize(),
                                                success: function (response) {
                                                switch (response) {
                                                case 'OK':
                                                        var id = $("#titulo_id").val();
                                                        var tipo = 1;
                                                        swal("Buen Trabajo!", "Se han guardado los cambios", "success")
                                                        .then((value) => {
                                                        $.redirect("/aplicacion/vista/crud/titulos/editar.php", {ID: id, Tipo: tipo}, "POST");
                                                        });
                                                        break;
                                                        case 'Ya se encuentra en la Base de Datos':
                                                        swal("Algo Anda mal!", response, "error");
                                                        break;
                                                }
                                                },
                                        });
                                        }

                                        }

</script>