<?php
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
?>
<div class="panel panel-default filterable">
    <div class="panel-heading">
        <h3 class="panel-title">Titulares</h3>
        <a href="titulares/nuevo.php" class="btn btn-default btn-fill  btn-block">Nuevo
            Titular</a>
        <a href="titulares/excel.php" class="btn btn-default btn-fill btn-block"><i class="fas fa-file-pdf"></i>Importar
            desde Excel</a>
    </div>
</div>
<div style="overflow-x:auto;" class="content table-responsive table-full-width">
    <table id="example" class="display compact" style="width:100%"></table>
</div>

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
                        columns: [
                            {
                                title: 'ID titular',
                                className: 'dt-body-right'
                            },
                            {
                                title: 'Nombre',
                                className: 'dt-body-center'
                            },
                            {
                                title: 'Acciones',
                                className: 'dt-body-center'
                            }
                        ],
                        data: data,
                        scrollY: "500px",
                        scrollX: true,
                        scrollCollapse: true,
                        responsive: true,
                        fixedColumns: true,
                        autoWidth: true,
                        "language": {
                            "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                        },
                        "columnDefs": [{
                                "targets": 2,
                                "data": null,
                                "defaultContent": "<button class=\"btn btn-primary btn-fill  btn-block\">Acciones</button>"
                            }]
                    }
            );
        }
    });

    $('#example').on('click', 'button', function () {
        var data = table.row($(this).parents('tr')).data();
        swal("¿Qué desea realizar con " + data[1] + "?", {
            buttons: {
                delete: "Eliminar",
                edit: "Editar",
            },
        })
                .then((value) => {
                    switch (value) {
                        case "delete":
                            swal({
                                title: "¿Estás seguro?",
                                text: "Está a punto de eliminar a" + data[1],
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                            })
                                    .then((willDelete) => {
                                        if (willDelete) {
                                            cadena =
                                                    "ID=" + data[0] +
                                                    "&Accion=Delete";
                                            $.ajax({
                                                type: 'GET',
                                                url: '/aplicacion/controlador/titular.php',
                                                data: cadena,
                                                success: function (response) {
                                                    if (response == 1) {
                                                        swal("Buen Trabajo!", "Se han guardado los cambios", "success")
                                                                .then((value) => {
                                                                    $.redirect("/aplicacion/vista/crud/dbadmin.php", {tablaP: "Titulares"}, "POST");
                                                                });
                                                    }
                                                },
                                            });
                                        }
                                    });
                            break;
                        case "edit":
                            $.redirect("/aplicacion/vista/crud/titulares/editar.php", {ID: data[0]}, "POST");
                            break;

                    }
                });
    });

</script>
