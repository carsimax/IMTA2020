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
                        <li class="breadcrumb-item active" aria-current="page">Log de cambios</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <form onsubmit="consultar(); return false">
                    <div class="row">
                        <!--Fecha de inicio-->
                        <div class="col-sm">
                            <p>Fecha de Inicio:</p>
                            <input class="form-control" type="date" name="fInicio" id="fInicio" required>
                        </div>
                        <!--Fecha de fin-->
                        <div class="col-sm">
                            <p>Fecha de Fin:</p>
                            <input class="form-control" type="date" name="fFin" id="fFin" required>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-sm">
                            <button class="btn btn-gob btn-fill  btn-block">Consultar</button>
                        </div>
                    </div>
                </form>
                <hr>
                <div class="row">
                    <div class="col-sm">
                        <table id="tablaLog" cellpadding="0" cellspacing="0" border="0"
                            class="table table-bordered responsive nowrap" width="100%">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fecha</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
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
table = $('#tablaLog').DataTable({
    scrollX: true,
    scrollY: "200px",
    "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
    }
});
cadena = "Accion=Todo";
$.ajax({
    type: "POST",
    url: "/aplicacion/controlador/log.php",
    data: cadena,
    //Si el controlador devuelve una respuesta
    success: function(resp) {
        data = [];
        $.each(JSON.parse(resp), function(index, item) {
            data.push([
                item.id_version,
                item.fecha,
                item.descripcion
            ]);
        });
        table.destroy();
        table = $('#tablaLog').DataTable({
            data: data,
            scrollX: true,
            scrollY: "200px",
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            }
        });
    }
});

function consultar() {
    $("#pantalla").hide();
    var inicio = document.getElementById("fInicio").value;
    var fin = document.getElementById("fFin").value;
    cadena = "&Inicio=" + inicio + "&Fin=" + fin + "&Accion=Fecha";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/log.php",
        data: cadena,
        //Si el controlador devuelve una respuesta
        success: function(resp) {
            data = [];
            $.each(JSON.parse(resp), function(index, item) {
                data.push([
                    item.id_version,
                    item.fecha,
                    item.descripcion
                ]);
            });
            table.destroy();
            table = $('#tablaLog').DataTable({
                data: data,
                scrollX: true,
                scrollY: "200px",
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                }
            });
            $("#pantalla").show();
        }
    });
}
</script>