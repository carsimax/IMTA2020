<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once(__DIR__ . "/../../../modelo/acuiferomun.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");

$registros = new AcuiferoMun;
$Municipios = $registros->getTodos($_POST['ID']);
?>

<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
    <h4>Municipios</h4>
</div>
<div class="row">
    <div class="col-sm">
        <form action="nuevomun.php" method="POST">
            <input type="text" id="ID" name="ID" value="<?php echo $_POST['ID'] ?>" hidden>
            <button href="" class="btn btn-gob btn-fill  btn-block">Nuevo Municipio</button>
        </form>
    </div>
</div>
<hr>
<div class="row">
    <div class="col-sm">
        <table id="example" cellpadding="0" cellspacing="0" border="0" class="table table-bordered responsive nowrap"
            width="100%">
            <thead>
                <tr class="filters">
                    <th>Estado</th>
                    <th>Municipio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php
                foreach ($Municipios as $Municipio)
                {
                    ?>
                <tr>
                    <td>
                        <?php echo $Municipio['Estado']; ?>
                    </td>
                    <td>
                        <?php echo $Municipio['Municipio']; ?>
                    </td>
                    <td>
                        <form action="editacumun.php" method="post">
                            <input type="number" name="Acuifero_ID" id="Acuifero_ID"
                                value="<?php echo $Municipio['acuifero_id']; ?>" hidden>
                            <input type="number" name="Municipio_ID" id="Municipio_ID"
                                value="<?php echo $Municipio['municipio_id']; ?>" hidden>
                            <button class="btn btn-gob btn-block">
                                Editar
                            </button>
                            <br>
                        </form>
                        <button class="btn btn-primary btn-block"
                            onclick="Eliminar(<?php echo $Municipio['municipio_id']; ?>,<?php echo $Municipio['acuifero_id']; ?>)">
                            Eliminar
                        </button>

                    </td>
                </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>
</div>

<form id="AcuForm" action="editar.php" method="post" hidden>
    <input name="ID" type="text" value="<?php echo $_POST['ID'] ?>" hidden>
</form>
<script>
$(document).ready(function() {
    $('#example').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
        }
    });
});
$(document).ready(function() {
    $('.filterable .btn-filter').click(function() {
        var $panel = $(this).parents('.filterable'),
            $filters = $panel.find('.filters input'),
            $tbody = $panel.find('.table tbody');
        if ($filters.prop('disabled') == true) {
            $filters.prop('disabled', false);
            $filters.first().focus();
        } else {
            $filters.val('').prop('disabled', true);
            $tbody.find('.no-result').remove();
            $tbody.find('tr').show();
        }
    });

    $('.filterable .filters input').keyup(function(e) {
        /* Ignore tab key */
        var code = e.keyCode || e.which;
        if (code == '9')
            return;
        /* Useful DOM data and selectors */
        var $input = $(this),
            inputContent = $input.val().toLowerCase(),
            $panel = $input.parents('.filterable'),
            column = $panel.find('.filters th').index($input.parents('th')),
            $table = $panel.find('.table'),
            $rows = $table.find('tbody tr');
        /* Dirtiest filter function ever ;) */
        var $filteredRows = $rows.filter(function() {
            var value = $(this).find('td').eq(column).text().toLowerCase();
            return value.indexOf(inputContent) === -1;
        });
        /* Clean previous no-result if exist */
        $table.find('tbody .no-result').remove();
        /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
        $rows.show();
        $filteredRows.hide();
        /* Prepend no-result row if all rows are filtered */
        if ($filteredRows.length === $rows.length) {
            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table
                .find('.filters th').length + '">No se han encontrado resultados</td></tr>'));
        }
    });
});

function Eliminar(ID, ACU) {
    swal({
            title: "¿Estás seguro?",
            text: 'Una vez realizada la acción se perderá el registro',
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                cadena =
                    "Acuifero_ID=" + ACU +
                    "&Municipio_ID=" + ID +
                    "&Accion=DeleteMUN";
                $.ajax({
                    type: 'GET',
                    url: '/aplicacion/controlador/acuifero.php',
                    data: cadena,
                    success: function(response) {
                        if (response == 1) {
                            swal("Buen Trabajo!", "Se han guardado los cambios", "success")
                                .then((value) => {
                                    document.getElementById("AcuForm").submit();
                                });
                        }
                    },
                });
            }
        });
}
</script>