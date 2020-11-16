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
require_once(__DIR__ . "/../../../modelo/fuente.php");
$Fuente = new Fuente();
$Fuente = $Fuente->getFuente($_POST['ID']);
?>
<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarForm('Fuentes')">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Editar Fuente</li>
                    </ol>
                </nav>
            </div>
            <!--Aquí temina la seccion del encabezado-->
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <form action="" name="form" onsubmit="valiFormNuevo('/aplicacion/controlador/fuente.php',$('form').serialize(),'Fuentes'); return false">
                            <input type="text" hidden id="Accion" name="Accion" value="Actualizar">
                            <div class="col-sm">
                                <p>ID:</p>
                                <input disabled type="number" class="form-control" value="<?php echo $Fuente->getIdFuente(); ?>" required>
                                <input  type="hidden" class="form-control" name="id_fuente" id="id_fuente" value="<?php echo $Fuente->getIdFuente(); ?>" >
                            </div>
                            <div class="col-sm">
                                <p>Fuente:</p>
                                <input type="text" class="form-control" name="nombre" id="nombre"
                                       value="<?php echo $Fuente->getNombre() ?>" required>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm">
                                    <a onclick="cancelarForm('Fuentes')" class="btn btn-gob2 text-light btn-block">Cancelar</a>
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
