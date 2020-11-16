<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../modelo/anio.php");
require_once(__DIR__ . "/../../../modelo/registrodistrito.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
$reg = new Anio();
$Anios = $reg->getAnios();
$registros = new RegistroDistrito();
$DistritoRegistros = $registros->getRegistrosDistrito($_POST['ID']);
?>
<br>
<div class="col-sm">
    <div class="panel panel-default filterable">
        <div class="panel-heading">
            <h3 class="panel-title">Información de Registro</h3>
            <form action="nuevoregistro.php" method="POST">
                <input type="text" id="ID" name="ID" value="<?php echo $_POST['ID'] ?>" hidden>
                <button href="" class="btn btn-default btn-fill  btn-block"><i class="fas fa-plus"></i> Nuevo Registro</button>
            </form>
        </div>
    </div>
    <div style="overflow-x:auto;" class="content table-responsive table-full-width">
        <table id="example2" class="table table-hover">
            <thead>
                <tr>
                    <th>Sup. Tot.</th>
                    <th>Sup. Rasup.</th>
                    <th>Sup. Rasub.</th>
                    <th>Sup. RTot.</th>
                    <th>Vol. Asup.</th>
                    <th>Vol. Asub.</th>
                    <th>Vol. ATot.</th>
                    <th>Año Agrícola</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                <?php
                foreach ($DistritoRegistros as $DistritoRegistro) {
                    ?>
                    <tr>
                        <td>
                            <?php echo $DistritoRegistro['sup_tot']; ?>
                        </td>
                        <td>
                            <?php echo $DistritoRegistro['sup_rasup']; ?>
                        </td>
                        <td>
                            <?php echo $DistritoRegistro['sup_rasub']; ?>
                        </td>
                        <td>
                            <?php echo $DistritoRegistro['sup_rtot']; ?>
                        </td>
                        <td>
                            <?php echo $DistritoRegistro['vol_asup']; ?>
                        </td>
                        <td>
                            <?php echo $DistritoRegistro['vol_asub']; ?>
                        </td>
                        <td>
                            <?php echo $DistritoRegistro['vol_atot']; ?>
                        </td>
                        <td>
                            <?php
                            foreach ($Anios as $Anio) {
                                if ($Anio['id_anio'] == $DistritoRegistro['anioagricola_id'])
                                    echo $Anio['anio_agricola'];
                            }
                            ?>
                        </td>
                        <td>
                            <form action="editarregistrodistrito.php" method="post">
                                <p title="Editar">
                                    <input type="text" name="ID" id="ID" value="<?php echo $DistritoRegistro['id_registro'] ?>" hidden>
                                    <button class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-pencil"></span></button>
                                </p>
                            </form>
                        </td>
                        <td>
                            <p title="Eliminar">
                                <button class="btn btn-primary btn-xs"
                                        onclick="EliminarRegistro(<?php echo $DistritoRegistro['id_registro']; ?>)">
                                    <span class="glyphicon glyphicon-trash"></span>
                                </button>
                            </p>
                        </td>
                    </tr>
<?php } ?>
            </tbody>
        </table>
    </div>
</div>
<form id="FormDist" action="editar.php" method="post" hidden>
    <input name="ID" type="text" value="<?php echo $_POST['ID'] ?>" hidden>
</form>

<script>
    $(document).ready(function () {
        $('#example2').DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            }
        });
    });

    function EliminarRegistro(ID) {
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
                                "id_registro=" + ID +
                                "&Accion=DeleteRegistro";
                        $.ajax({
                            type: 'GET',
                            url: '/aplicacion/controlador/distritoriego.php',
                            data: cadena,
                            success: function (response) {

                                if (response == 1) {
                                    swal("Trabajo!", "Se han guardado los cambios", "success")
                                            .then((value) => {
                                                document.getElementById("FormDist").submit();
                                            });
                                }
                            },
                        });
                    }
                });
    }
</script>


