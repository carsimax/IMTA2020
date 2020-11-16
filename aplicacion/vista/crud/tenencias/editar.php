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
require_once(__DIR__ . "/../../../modelo/tenencia.php");
$Tenencia = new Tenencia();
$Tenencia = $Tenencia->getTenencia($_POST['ID']);
?>
<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarForm('Tenencias')">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Editar Tenencia</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <form name="form" onsubmit="valiFormNuevo('/aplicacion/controlador/tenencia.php', $('form').serialize(), 'Tenencias'); return false">
                            <input type="text" hidden id="Accion" name="Accion" value="Actualizar">
                            <div class="col-sm">
                                <p>ID:</p>
                                <input disabled type="number" class="form-control" name="ID" id="id" value="<?php echo $Tenencia->getIdTenencia() ?>" required>
                            </div>
                            <input hidden type="text" name="id_tenencia" id="id_tenencia" value="<?php echo $Tenencia->getIdTenencia() ?>">
                            <div class="col-sm">
                                <p>Fuente:</p>
                                <input type="text" class="form-control" name="nombre" id="nombre"
                                       value="<?php echo $Tenencia->getNombre() ?>" required>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm">
                                    <a onclick="cancelarForm('Tenencias')" class="btn btn-gob2 text-light btn-block">Cancelar</a>
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