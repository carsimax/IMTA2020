<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
?>

<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
    <h4>Información de producción agrícola</h4>
</div>
<div class="row">
    <div class="col-sm">
        <form action="nuevoregistrosiembra.php" method="POST">
            <input type="text" id="ID" name="ID" value="<?php echo $_POST['ID'] ?>" hidden>
            <button href="" class="btn btn-default btn-gob  btn-block"><i class="fas fa-plus"></i> Nuevo Registro</button>
        </form>
    </div> 
</div>
<hr>
<br>
<div class="row">
    <div class="col-sm">
        <table id="example" cellpadding="0" cellspacing="0" border="0" class="table table-bordered responsive nowrap" width="100%">
        </table>
        <br>
    </div>
</div>
<script>
    cadena = "ID="+<?php echo $_POST['ID']?> + "&Accion=getProduccionSiembra";
    $.ajax({
        type: "GET",
        url: "/aplicacion/controlador/dtt.php",
        data: cadena,
        success: function (resp) {
            var data = [];
            $.each(JSON.parse(resp), function (index, item) {
                data.push([item.id_siembra_dtt,item.ciclo,item.cultivo,item.sembrada, item.cosechada, item.produccion, item.valor, item.anio]);
            });
            table = $('#example').DataTable({
                columns: [
                    {
                        title: 'ID Registro',
                        className: 'dt-body-right'
                    },
                    {
                      title:'Ciclo',  
                    },
                    {
                       title:'Cultivo'
                    },
                    {
                        title: 'Sembrada (ha)'
                    },
                    {
                        title: 'Cosechada (ha)'
                    },
                    {
                        title: 'Producción (ton)'
                    },
                    {
                        title: 'Valor (miles $)'
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
                columnDefs: [{ className: "text-right", targets: [3, 4, 5, 6, 7, 8,9] },
                    {
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
        $.redirect("/aplicacion/vista/crud/dtts/editarsiembra.php", {ID: data[0]}, "POST");
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
                cadena = "ID=" + data[0] + "&Accion=DeleteRegSiembra";
                $.ajax({
                    type: 'GET',
                    url: '/aplicacion/controlador/dtt.php',
                    data: cadena,
                    success: function (response) {
                        if (response == 1) {
                            Swal.fire({
                                title: "Buen Trabajo!",
                                text: "Se han guardado los cambios",
                                icon: "success",
                                confirmButtonColor: '#621132'
                            }).then((value) => {
                                document.getElementById("FormSiembra").submit();
                            });
                        }
                    },
                });
            }
        });
    });
</script>


<form id="FormSiembra" action="editar.php" method="post" hidden>
    <input name="ID" type="text" value="<?php echo $_POST['ID'] ?>" hidden>
</form>

<script>
    

    function EliminarSiembra(ID) {
        swal({
            title: "¿Estás seguro?",
            text: 'Una vez realizada la acción se eliminará el registro',
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
                .then((willDelete) => {
                    if (willDelete) {
                        cadena =
                                "ID=" + ID +
                                "&Accion=DeleteRegDTT";
                        $.ajax({
                            type: 'GET',
                            url: '/aplicacion/controlador/dtt.php',
                            data: cadena,
                            success: function (response) {
                                if (response == 1) {
                                    swal("Buen Trabajo!", "Se han guardado los cambios", "success")
                                            .then((value) => {
                                                document.getElementById("FormSiembra").submit();
                                            });
                                }
                            },
                        });
                    }
                });
    }
</script>


