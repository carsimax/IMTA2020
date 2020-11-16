<!--Llamamos a la funcion se sesion-->
<?php
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
?>




<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Encabezado DE la seccion en la que se Esta-->
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarForm('Cultivos')">Gestionar Base de datos</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Importar desde Excel</li>
                    </ol>
                </nav>
            </div>
            <!--Aqui temina la seccion Del encabezado-->
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        
                            <p>Para que el proceso de importación de Cultivos a la base de datos se realice de forma correcta
                                le recomendamos descargar el formato para los acampos correspondientes a los Cultivos</p>
                            <a href="/formatos/FormatoCultivo.php" class="btn btn-warning btn-fill  btn-block">Descargar
                                Formato Cultivos</a>
                            <p><b>Notas importantes:</b></p>
                            <ul class="container">
                                <li><p>La primera hoja corresponde a la información general de las Cultivos, los campos ya tienen
                                        el formato adecuado, favor de no modificar las cabeceras ni el tipo de dato.</p></li>
                                <li><p>Si se coloca el ID de una Cultivo ya existente en la base de datos, el sistema solamente
                                        actualizara los datos del mismo.</p></li>
                                <li><p><b>Favor de no dejar ningún campo vacío, esto será de gran importancia, ya que de lo
                                            contrario se perdería información relevante.</b></p></li>
                                <li><p><b>Para el caso de nuevos cultivos, se deberá dejar vacío el campo de Id Cultivo.</b></p></li>
                            </ul>
                        
                        
                            <form action="/aplicacion/controlador/excel.php" method="POST" enctype="multipart/form-data">
                                <input type="text" hidden id="Accion" name="Accion" value="Cultivo">
                                <div class="form-group">
                                    <div class="col-sm">
                                        <p>Seleccione el archivo</p>
                                        <input class="form-control" type="file" name="archivo" id="archivo" accept=".xlsx" required>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-sm">
                                        <a onclick="cancelarForm('Cultivos')" class="btn btn-gob2 text-light btn-block">Cancelar</a>
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