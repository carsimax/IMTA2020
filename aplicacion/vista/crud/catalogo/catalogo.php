<!--Llamamos a la funcion se sesion-->
<?php
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../modelo/catalogo.php");
require_once(__DIR__ . "/../../plantillas/header.php");
?>



<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Administración</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Catálogo de información</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <p>Aquí puedes ver los detalles de la información que se muestra en este sistema web.</p>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm">
                        <a href="Nuevo.php" class="btn btn-gob btn-fill  btn-block"><i class="fas fa-plus"></i> Nuevo Registro</a>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm">
                        <table id="example" cellpadding="0" cellspacing="0" border="0" class="table table-bordered responsive nowrap" width="100%"></table>
                        <br>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>
<!--Footer de la pagina-->
<?php require_once(__DIR__ . "/../../Plantillas/footer.php"); ?>
<!--Fin del footer de la pagina-->
<script>
    cadena = "Accion=Todos";
    $.ajax({
        type: "POST",
        url: "/Aplicacion/Controlador/Catalogo.php",
        data: cadena,
        //Si el controlador devuelve una respuesta
        success: function(resp) {
            var data = [];
            //Primero se desglosara por Acuifero
            $.each(JSON.parse(resp), function(index, item) {
                data.push([item.id_registro, item.fuente, item.nombre,item.anio, item.fecha, item])
            });
            table = $('#example').DataTable({
                columns: [{
                        title: 'ID',
                        className: 'dt-body-right'
                    },
                    {
                        title: 'Fuente'
                    },
                    {
                        title: 'Módulo'
                    },
                    {
                        title: 'Año de referencia'
                    },
                    {
                        title: 'Fecha de consulta'
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
                        targets: 5,
                        data: null,
                        defaultContent: "<button id='editar' class='btn btn-gob btn-fill'><i class='far fa-edit'></i></button>",
                        width: "5%"
                    },
                    {
                        targets: 6,
                        data: null,
                        defaultContent: "<button id='eliminar' class='btn btn-gob btn-fill'><i class='far fa-trash-alt'></i></button>",
                        width: "5%",
                    }
                ]
            });
        }
    });

    $('#example').on('click', '#editar', function() {
        var data = table.row($(this).parents('tr')).data();
        $.redirect("/aplicacion/vista/crud/catalogo/editar.php", {
            ID: data[0]
        }, "POST");
    });



    $('#example').on('click', '#eliminar', function() {
        var data = table.row($(this).parents('tr')).data();
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Está a punto de eliminar a este registro. ",
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
                    url: '/aplicacion/controlador/catalogo.php',
                    data: cadena,
                    success: function(response) {
                        if (response == 1) {
                            Swal.fire({
                                    title: "Buen Trabajo!",
                                    html: "Se han guardado los cambios",
                                    icon: "success",
                                    confirmButtonColor: '#621132'
                                })
                                .then((value) => {
                                    window.location.href =
                                        "Catalogo.php";
                                });
                        }
                    },
                });
            }
        });
    });
</script>