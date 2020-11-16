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
                        <li class="breadcrumb-item"><a href="#">Administración</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Comentarios</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <table id="tabla" cellpadding="0" cellspacing="0" border="0"
                            class="table table-bordered responsive nowrap" width="100%">
                        </table>
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
cadena = "&Accion=Comentarios";
$.ajax({
    type: "POST",
    url: "/aplicacion/controlador/usuario.php",
    data: cadena,
    //Si el controlador devuelve una respuesta
    success: function(resp) {
        var data = [];
        //Primero se desglosara por Acuifero
        $.each(JSON.parse(resp), function(index, item) {
            data.push([item.nombre + ' ' + item.ap + ' ' + item.am, item.comentario, item.fecha]);
        });
        table = $('#tabla').DataTable({
            data: data,
            columns: [{
                    title: 'Nombre Completo'
                },
                {
                    title: 'Comentario'
                },
                {
                    title: 'Fecha'
                }

            ],
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            }
        });
    }
});
</script>