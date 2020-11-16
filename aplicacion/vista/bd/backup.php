<?php
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../plantillas/header.php");
require_once(__DIR__ . "/../../controlador/sesion.php");
require_once(__DIR__ . "/../../controlador/modulosadmin.php");
?>


<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Encabezado-->
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Administración</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Restauración/Respaldo Base de Datos</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
                    <h4>Realizar Respaldo <small></small></h4>
                </div>
                <form class="form" action="/aplicacion/controlador/bd.php" method="post"
                    onsubmit="return confirm('¿Desea continuar con la copia de seguridad? ');">
                    <div class="row">
                        <input type="text" id="Accion" name="Accion" value="Copia" hidden>
                        <button type="submit" class=" btn btn-gob btn-fill btn-md btn-block">Realizar copia
                            de seguridad
                        </button>
                    </div>
                </form>
                <hr>
                <div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
                    <h4>Restaurar desde copia de Seguridad<small></small></h4>
                </div>
                <form class="form" enctype="multipart/form-data" action="/aplicacion/controlador/bd.php" method="post"
                    onsubmit="return confirm('¿Desea continuar con la restauración de la Base de Datos? ');">
                    <div class="row">
                        <input type="text" id="Accion" name="Accion" value="Restaurar" hidden>
                        <div class="col-sm">
                            <p>Seleccione el archivo</p>
                            <input class="form-control" type="file" name="base" id="base" accept=".sql" required>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-sm">
                            <!--Boton para guardar los cambios-->
                            <button type="submit" class="btn btn-gob2 text-light btn-block">Restaurar
                                Ahora
                            </button>
                        </div>
                    </div>
                </form>
                <br>
            </div>
        </main>
    </div>
</div>
<!--Footer de la pagina-->
<?php require_once(__DIR__ . "/../plantillas/footer.php"); ?>