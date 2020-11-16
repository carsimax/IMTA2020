<!--Llamamos a la funcion se sesion-->
<?php
require_once(__DIR__ . "/../../controlador/sesion.php");
require_once(__DIR__ . "/../plantillas/header.php");
require_once(__DIR__ . "/../../controlador/modulossudo.php");
?>

<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Encabezado-->
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Adimistración</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Administradores</li>
                    </ol>
                </nav>
            </div>
            <!--Contenido-->
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <a href="nuevo.php" class="btn btn-gob btn-fill  btn-block"><i class="fas fa-plus"></i>
                            Nuevo Administrador</a>
                    </div>
                </div>
                <hr>
                <!--Tabla Admins-->
                <div class="row">
                    <div class="col-sm">
                        <table id="tabla" cellpadding="0" cellspacing="0" border="0" class="table table-bordered responsive nowrap" width="100%"></table>
                        <br>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>
<!--Footer de la pagina-->
<?php require_once(__DIR__ . "/../plantillas/footer.php"); ?>
<!--Fin del footer de la pagina-->
<script>
    cadena = "&Accion=Admins";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/usuario.php",
        data: cadena,
        //Si el controlador devuelve una respuesta
        success: function(resp) {
            var data = [];
            //Primero se desglosara por Acuifero
            $.each(JSON.parse(resp), function(index, item) {
                data.push([item.id_usuario, item.nombre, item.a_paterno, item.a_materno, item.usuario,
                    item
                ]);
            });
            table = $('#tabla').DataTable({
                data: data,
                columns: [{
                        title: 'ID'
                    },
                    {
                        title: 'Nombre'
                    },
                    {
                        title: 'A. Paterno'
                    },
                    {
                        title: 'A. Materno'
                    },
                    {
                        title: 'Usuario'
                    },
                    {
                        title: 'Editar'
                    },
                    {
                        title: 'Eliminar'
                    }
                ],
                language: {
                    url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                },
                columnDefs: [{
                        targets: 5,
                        data: null,
                        defaultContent:"<button id='editar' class='btn btn-gob btn-fill'><i class='far fa-edit'></i></button>",
                        width: "5%"
                    },
                    {
                        targets: 6,
                        data: null,
                        defaultContent:"<button id='eliminar' class='btn btn-gob btn-fill'><i class='far fa-trash-alt'></i></button>",
                        width: "5%",
                    }],
            });
        }
    });

    $('#example').on('click', '#editar', function () {
        var data = table.row($(this).parents('tr')).data();
        $.redirect("/aplicacion/vista/admin/editar.php", {ID: data[0]}, "POST");
    });
    

    $('#tabla').on('click', '#eliminar', function() {
        var data = table.row($(this).parents('tr')).data();
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Está a punto de eliminar a " + data[1],
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#621132',
            cancelButtonColor: '#6f7271',
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                cadena =
                    "ID=" + data[0] +
                    "&Accion=Delete";
                $.ajax({
                    type: 'GET',
                    url: '/aplicacion/controlador/usuario.php',
                    data: cadena,
                    success: function(response) {
                        if (response == 1) {
                            Swal.fire({
                                    title: "Buen Trabajo!",
                                    html: "Se han guardado los cambios",
                                    icon: "success",
                                    confirmButtonColor: '#621132',
                                })
                                .then((value) => {
                                    window.location.href =
                                        "/aplicacion/vista/admin/admins.php";
                                });
                        }
                    },
                });
            }
        });

    });



    $('#tabla').on('click', '#editar', function() {
        var data = table.row($(this).parents('tr')).data();
        $.redirect("/aplicacion/vista/admin/editar.php", {
            ID: data[0]
        }, "POST");
    });
</script>