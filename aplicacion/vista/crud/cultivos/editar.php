<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../modelo/grupocultivo.php");
require_once(__DIR__ . "/../../../modelo/cultivo.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");

$registros = new GrupoCultivo();
$Grupos = $registros->getGrupos();
$Cultivo = new Cultivo();
$Cultivo = $Cultivo->getCultivo($_POST['ID']);
?>

<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Encabezado DE la seccion en la que se Esta-->
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarForm('Cultivos')">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Editar Cultivo</li>
                    </ol>
                </nav>
            </div>
            <!--Aqui temina la seccion Del encabezado-->
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <form action="" name="formPropietario" onsubmit="valiFormNuevo('/aplicacion/controlador/cultivo.php', $('form').serialize(), 'Cultivos'); return false">
                            <input type="text" hidden id="Accion" name="Accion" value="Actualizar">
                            <div class="col-sm">
                                <p>ID del Cultivo:</p>
                                <input hidden type="text" name="id_cultivo" id="id_cultivo"
                                       value="<?php echo $Cultivo->getIdCultivo() ?>">
                                <input disabled type="text" class="form-control"
                                       value="<?php echo $Cultivo->getIdCultivo() ?>" required>
                            </div>
                            <div class="col-sm">
                                <p>Nombre Cultivo:</p>
                                <input type="text" class="form-control" name="nombre" id="nombre"
                                       value="<?php echo $Cultivo->getNombre() ?>" required>
                            </div>
                            <div class="col-sm">
                                <p>Nombre Científico:</p>
                                <input type="text" class="form-control" name="nombre_cientifico" id="nombre_cientifico"
                                       value="<?php echo $Cultivo->getNombreCientifico() ?>" required>
                            </div>
                            <div class="col-sm">
                                <p>Grupo de Cultivo:</p>
                                <select class="form-control" name="grupo_cultivo_id" id="grupo_cultivo_id">
                                    <?php
                                    foreach ($Grupos as $Grupo) {
                                        if ($Grupo['id_grupo_cultivo'] == $Cultivo->getGrupoCultivoId()) {
                                            ?>
                                            <option selected
                                                    value="<?php echo $Grupo['id_grupo_cultivo']; ?>"><?php echo $Grupo['nombre']; ?></option>
                                                    <?php
                                                } else {
                                                    ?>
                                            <option value="<?php echo $Grupo['id_grupo_cultivo']; ?>"><?php echo $Grupo['nombre']; ?></option>
                                            <?php
                                        }
                                    }
                                    ?>
                                </select>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm">
                                    <a onclick="cancelarForm('Cuencas')" class="btn btn-gob2 text-light btn-block">Cancelar</a>
                                </div>
                                <div class="col-sm">
                                    <button type="submit" class="btn btn-primary btn-fill  btn-block">Guardar</button>
                                </div>
                            </div>
                        </form>
                        <br>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>
     
<?php require_once(__DIR__ . "/../../plantillas/footer.php"); ?>
<script type="text/javascript" src="/aplicacion/vista/crud/alerts.js"></script>

