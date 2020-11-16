<?php
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
?>
<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
    <h4>Marginación por estado</h4>
</div>
<div class="row">
    <div class="col-sm">
        <a href="estadomarginacion/nuevo.php" class="btn btn-gob btn-fill  btn-block"><i class="fas fa-plus"></i> Nuevo Registro</a>
    </div>
    <div class="col-sm">
        <a href="estadomarginacion/excel.php" class="btn btn-gob btn-fill btn-block"><i class="fas fa-file-excel"></i> Importar dsde Excel</a>
    </div>
</div>
<hr>
<div class="row">
    <div class="col-sm">
        <table id="example" cellpadding="0" cellspacing="0" border="0" class="table table-bordered responsive nowrap" width="100%">
        </table>
        <br>
    </div>
</div>
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


<script type="text/javascript" src="/aplicacion/vista/crud/alerts.js"></script>
<script>
    cadena = "&Accion=Todos";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/estadomarginacion.php",
        data: cadena,
        //Si el controlador devuelve una respuesta
        success: function (resp) {
            var data = [];
            $.each(JSON.parse(resp), function (index, item) {
                data.push([item.id_registro_estado, item.estado, item.analf, item.sprim, item.im, item.gm, item.pob_tot, item.anio])
            });
            table = $('#example').DataTable({
                columns: [
                    {
                        title: 'ID',
                        className: 'dt-body-right'
                    },
                    {
                        title: 'Estado'
                    },
                    {
                        title: 'Analf'
                    },
                    {
                        title: 'Sprim'
                    },
                    {
                        title: 'IM'
                    },
                    {
                        title: 'GM'
                    },
                    {
                        title: 'Pob. Tot.'
                    },
                    {
                        title: 'Año'
                    },
                    {
                        title: 'Editar'
                    },
                    {
                        title: 'Eliminar'
                    }
                ],
                data: data,
                language: {
                    url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                },
                    columnDefs: [{
                            targets: 8,
                            data: null,
                        defaultContent: '<button id="editar" class="btn btn-gob btn-fill"><i class="fa fa-edit"></button>',
                        width: "5%"
                    },
                    {
                        targets: 9,
                        data: null,
                        defaultContent: '<button id="eliminar" class="btn btn-gob btn-fill"><i class="far fa-trash-alt"></i></button>',
                        width: "5%"
                    }]
            }
            );
        }
    });

    $('#example').on('click', '#editar', function () {
        var data = table.row($(this).parents('tr')).data();
        $.redirect("/aplicacion/vista/crud/estadomarginacion/editar.php", {ID: data[0]}, "POST");
    });

    $('#example').on('click', '#eliminar', function () {
        var data = table.row($(this).parents('tr')).data();
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
                    url: '/aplicacion/controlador/estadomarginacion.php',
                    data: cadena,
                    success: function (response) {
                        if (response == 1) {
                            buenTrabajoNuevo('EstadoMarginacion');
                        } else {
                            algoAndaMal('No se ha podido eliminar el registro.');
                        }
                    },
                });
            }
        });
    });

</script>