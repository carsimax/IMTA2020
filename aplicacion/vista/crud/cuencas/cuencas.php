<?php
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
?>

<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
    <h4>Cuencas</h4>
</div>
<div class="row">
    <div class="col-sm">
        <a href="cuencas/nuevo.php" class="btn btn-gob btn-fill  btn-block"><i class="fas fa-plus"></i> Nueva Cuenca</a>
    </div>
    <div class="col-sm">
        <a href="cuencas/excel.php" class="btn btn-gob btn-fill  btn-block"><i class="fas fa-file-excel"></i> Importar desde Excel</a>
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
<!--Script de las funciones-->
<script>
    cadena = "&Accion=Todos";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/cuenca.php",
        data: cadena,
        //Si el controlador devuelve una respuesta
        success: function (resp) {
            var data = [];
            //Primero se desglosara por Acuifero
            $.each(JSON.parse(resp), function (index, item) {
                data.push([item.id_cuenca, item.nombre, item.region, item])
            });
            table = $('#example').DataTable({
                columns: [
                    {
                        title: 'ID Cuenca',
                        className: 'dt-body-right'
                    },
                    {
                        title: 'Nombre'
                    },
                    {
                        title: 'Región'
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
                        targets: 3,
                        data: null,
                        defaultContent: '<button id="editar" class="btn btn-gob btn-fill"><i class="fa fa-edit"></button>',
                        width: "5%"
                    },
                    {
                        targets: 4,
                        data: null,
                        defaultContent: '<button id="eliminar" class="btn btn-gob btn-fill"><i class="far fa-trash-alt"></i></button>',
                        width: "5%"
                    }],
            }
            );
        }
    });


    $('#example').on('click', '#editar', function () {
        var data = table.row($(this).parents('tr')).data();
        $.redirect("/aplicacion/vista/crud/cuencas/editar.php", {ID: data[0]}, "POST");
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
                    url: '/aplicacion/controlador/cuenca.php',
                    data: cadena,
                    success: function (response) {
                        if (response == 1) {
                            Swal.fire({
                                title: "Buen Trabajo!",
                                text: "Se han guardado los cambios",
                                icon: "success",
                                confirmButtonColor: '#621132'
                            })
                                    .then((value) => {
                                        $.redirect("/aplicacion/vista/crud/dbadmin.php", {tablaP: "Cuencas"}, "POST");
                                    });
                        }
                    },
                });
            }
        });
    });
</script>

