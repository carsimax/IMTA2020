<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../modelo/anio.php");
require_once(__DIR__ . "/../../../modelo/tenencia.php");
require_once(__DIR__ . "/../../../modelo/fuente.php");
require_once(__DIR__ . "/../../../modelo/volumendistrito.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
?>
<br>

<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
    <h4>Información de volumétrica</h4>
</div>
<div class="row">
    <div class="col-sm">
        <form action="nuevoregistrovolumen.php" method="POST">
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

<form id="FormVolumen" action="editar.php" method="post" hidden>
    <input name="ID" type="text" value="<?php echo $_POST['ID'] ?>" hidden>
</form>

<script>
    var id_distrito = '<?php echo ($_POST['ID']) ?>';
    var cadena = "ID=" + id_distrito + "&Accion=getRegistrosVolumen";
    $.ajax({
        type: "GET",
        url: "/aplicacion/controlador/distritoriego.php",
        data: cadena,
        //Si el controlador devuelve una respuesta
        success: function (resp) {
            var data = [];
            $.each(JSON.parse(resp), function (index, item) {
                data.push([item.id_volumen_distrito, item.superficie_regada1, item.volumen_distribuido1, item.usuarios1, item.superficie_regada2, item.volumen_distribuido2, item.usuarios2, item.anio, item.fuente, item.tenencia]);
            });
            table = $('#example').DataTable({
                columns: [
                    {
                        title: 'ID Registro',
                        className: 'dt-body-right'
                    },
                    {
                        title: 'Sup. Reg1.'
                    },
                    {
                        title: 'Vol. Dist.1'
                    },
                    {
                        title: 'No. Usu1.'
                    },
                    {
                        title: 'Sup. Reg2.'
                    },
                    {
                        title: 'Vol. Dist.2'
                    },
                    {
                        title: 'No. Usu2.'
                    },
                    {
                        title: 'Año'
                    },
                    {
                        title: 'Fuente'
                    },
                    {
                        title: 'Tenencia'
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
                        targets: 10,
                        data: null,
                        defaultContent: "<button id='editar' class='btn btn-gob btn-fill'><i class='far fa-edit'></i></button>",
                        width: "5%"
                    },
                    {
                        targets: 11,
                        data: null,
                        defaultContent: '<button id="eliminar" class="btn btn-gob btn-fill"><i class="far fa-trash-alt"></i></button>',
                        width: "5%",
                    }],

            });
        }
    });


    $('#example').on('click', '#editar', function () {
        var data = table.row($(this).parents('tr')).data();
        $.redirect("/aplicacion/vista/crud/distritosderiego/editarvolumen.php", {ID: data[0]}, "POST");
    });

    $('#example').on('click', '#eliminar', function () {
        var data = table.row($(this).parents('tr')).data();
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Está a punto de eliminar el registro " + data[0],
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#621132',
            cancelButtonColor: '#6f7271',
            confirmButtonText: 'Sí, continuar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                cadena = "ID=" + data[0] + "&Accion=DeleteRegVol";
                $.ajax({
                    type: 'GET',
                    url: '/aplicacion/controlador/distritoriego.php',
                    data: cadena,
                    success: function (response) {
                        if (response == 1) {
                            Swal.fire({
                                title: "Buen Trabajo!",
                                text: "Se han guardado los cambios",
                                icon: "success",
                                confirmButtonColor: '#621132'
                            }).then((value) => {
                                document.getElementById("FormVolumen").submit();
                            });
                        }
                    },
                });
            }
        });
    });
    
</script>


