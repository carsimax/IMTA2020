<?php
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
if ($_SESSION["Rol_ID"] == 3) {
    header('location: /');
}
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../modelo/ciclo.php");
$Ciclo = new Ciclo();
$Ciclo = $Ciclo->getCiclo($_POST['ID']);
?>
<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Encabezado DE la seccion en la que se Esta-->
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarForm('Ciclos')">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Editar Ciclo</li>
                    </ol>
                </nav>
            </div>
            <!--Aqui temina la seccion Del encabezado-->
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <form action="" name="formCiclo" onsubmit="valiFormNuevo('/aplicacion/controlador/ciclo.php', $('form').serialize(), 'Ciclos'); return false">
                            <input type="text" hidden id="Accion" name="Accion" value="Actualizar">
                            <div class="col-sm">
                                <p>ID:</p>
                                <input disabled type="text" class="form-control" name="id_ciclo" id="id_ciclo"
                                       value="<?php echo $Ciclo->getIdCiclo() ?>" required>
                            </div>
                            <div class="col-sm">
                                <p>Ciclo:</p>
                                <input type="text" class="form-control" name="nombre" id="nombre"
                                       value="<?php echo $Ciclo->getNombre() ?>" required>
                            </div>
                            <div class="col-sm">
                                <p>Siglas:</p>
                                <input type="text" class="form-control" name="nombre_cientifico" id="nombre_cientifico"
                                       value="<?php echo $Ciclo->getSiglas() ?>" required>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm">
                                    <a onclick="cancelarForm('Ciclos')" class="btn btn-gob2 text-light btn-block">Cancelar</a>
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

