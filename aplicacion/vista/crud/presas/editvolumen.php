<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../modelo/anio.php");
require_once(__DIR__ . "/../../../modelo/presavolumen.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
$reg = new Anio();
$Anios = $reg->getAnios();
$registros = new PresaVolumen();
$PresaVolumenes = $registros->getRegistrosPresaVolumen($_POST['ID']);
?>



<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
    <h4>Información Volumétrica</h4>
</div>
<div class="row">
    <div class="col-sm">
        <form action="nuevoregistro.php" method="POST">
            <input type="text" id="ID" name="ID" value="<?php echo ($_POST['ID']) ?>" hidden>
            <button href="" class="btn btn-gob btn-fill  btn-block"><i class="fas fa-plus"></i> Nuevo Registro</button>
        </form>

    </div> 
</div>
<br>    
<div style="overflow-x:auto;" class="content table-responsive table-full-width">
    <table id="example2" class="table table-hover">
        <thead>
            <tr>
                <th>Altura de la cortina (m)</th>
                <th>Capacidad al NAME (hm<sup>3</sup>)</th>
                <th>Capacidad al NAMO (hm<sup>3</sup>)</th>
                <th>Vol. de almacenamiento (hm<sup>3</sup>)</th>
                <th>Información del Año</th>
                <th>Editar</th>
                <th>Eliminar</th>
            </tr>
        </thead>
        <tbody>
            <?php
            foreach ($PresaVolumenes as $PresaVolumen) {
                ?>
                <tr>
                    <td>
                        <?php echo $PresaVolumen['alt_cort']; ?>
                    </td>
                    <td>
                        <?php echo $PresaVolumen['cap_name']; ?>
                    </td>
                    <td>
                        <?php echo $PresaVolumen['cap_namo']; ?>
                    </td>
                    <td>
                        <?php echo $PresaVolumen['vol_alma']; ?>
                    </td>
                    <td>
                        <?php
                        foreach ($Anios as $Anio) {
                            if ($Anio['id_anio'] == $PresaVolumen['anio_id'])
                                echo $Anio['anio'];
                        }
                        ?>
                    </td>
                    <td>
                        <form action="editarvolumenregistro.php" method="post">
                            <input type="number" name="ID" id="ID" value="<?php echo $PresaVolumen['id_presa_volumen'] ?>" hidden>
                            <button class="btn btn-gob btn-fill"><i class="fa fa-edit"></i></button>
                        </form>
                    </td>
                    <td>
                        <button class="btn btn-gob btn-fill" onclick="Eliminar(<?php echo $PresaVolumen['id_presa_volumen']; ?>)"><i class="far fa-trash-alt"></i></button>                          
                    </td>
                </tr>
            <?php } ?>
        </tbody>
    </table>
</div>

<form id="AcuForm" action="editar.php" method="post" hidden>
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

    function Eliminar(ID) {
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
                                "id_presa_volumen=" + ID +
                                "&Accion=DeleteREGISTRO";
                        $.ajax({
                            type: 'GET',
                            url: '/aplicacion/controlador/presa.php',
                            data: cadena,
                            success: function (response) {
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
