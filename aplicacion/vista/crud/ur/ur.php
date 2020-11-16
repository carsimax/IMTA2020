<?php
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
require_once(__DIR__ . "/../../../modelo/estado.php");
$registros = new Estado();
$estados = $registros->getTodos();
?>


<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
    <h4>Unidades de Riego</h4>
</div>
<div class="row">
    <div class="col-sm">
        <a href="ur/excelsiembra.php" class="btn btn-gob btn-fill btn-block"><i class="fas fa-file-excel"></i> Importar datos de producción agrícola</a>
    </div>
</div>
<hr>
<div class="row">
    <div class="col-sm" id="divEstado">
        <label>Estado:</label>
        <select  class="form-control" onchange="Estados()" id="Estados">
            <option disabled selected value> -- Seleccione una opción -- </option>
            <?php
            foreach ($estados as $estado) {
                ?>
                <option value="<?php echo $estado['id_estado'] ?>"><?php echo $estado['nombre'] ?> </option>
            <?php } ?>
        </select>
    </div> 
</div>
<br>
<div class="row">
    <div class="col-sm">
        <table id="example" cellpadding="0" cellspacing="0" border="0" class="table table-bordered responsive nowrap" width="100%">
        </table>
        <br>
    </div>
</div>
<script type="text/javascript" src="/aplicacion/vista/crud/alerts.js"></script>
<script>
async function Estados() {
    var dataSend = "estado=" + $("#Estados").val() + '&Accion=getMunicipios';
    var data = [];
    $.ajax({
        async: true,
        type: "GET",
        url: "/aplicacion/controlador/estado.php",
        data: dataSend,
        success: function (resp) {
            $.each(JSON.parse(resp), function (index, item) {
                data.push([item.id_municipio, item.nombre]);
            });
        }
    }).always(function () {

        table.clear().draw();
        table.rows.add(data).draw();
    });
}

table = $('#example').DataTable({
    columns: [
        {
            title: 'ID Unidad',
            className: 'dt-body-right'
        },
        {
            title: 'Municipio'
        },
        {
            title: 'Ver'
        }
    ],
    language: {
        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
    },
    columnDefs: [{
            targets: 2,
            data: null,
            defaultContent: '<button id="editar" class="btn btn-gob btn-fill"><i class="fa fa-eye"></button>',
            width: "10%"
        }]
}
);


$('#example').on('click', '#editar', function () {
    var data = table.row($(this).parents('tr')).data();
    $.redirect("/aplicacion/vista/crud/ur/editar.php", {ID: data[0]}, "POST");
});

</script>
