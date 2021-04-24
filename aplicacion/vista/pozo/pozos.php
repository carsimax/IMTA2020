<?php

/**
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */
//Variables para depurar y ver los errores de ejecución dentro del servidor apache.
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
/**
 * Para que el controlador funcione de forma correcta, es necesario la llamada a los modelos necesarios en el mismo.
 */
require_once(__DIR__ . "/../../controlador/sesion.php");
require_once(__DIR__ . "/../../modelo/filtroacu.php");
require_once(__DIR__ . "/../plantillas/header.php");
/**
 * Obtenemos los registros
 */
$registros = new FiltroAcu();
$filtros = $registros->getPozos();
?>
<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Encabezado-->
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Consulta de Información</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Pozos</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
            <p>Consulta los diferentes tipos de Pozos por medio de Títulos de Concesión para conocer los Volúmenes de Extracción de Aguas Nacionales, Número de Anexos de Aguas Subterráneas y demás información de cada uno de los Estados y Municipios de la República Mexicana.</p>
            </div>
            <!--Seccion Para Seleccionr el Filtro-->
            <div class="col-sm" id="filtros">
                <h6>Seleccione un filtro</h6>
                <?php foreach ($filtros as $filtro) { ?>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="filtro" id="<?php echo $filtro['id_filtro'] ?>" value="<?php echo $filtro['id_filtro'] ?>">
                        <label class="form-check-label" for="<?php echo $filtro['id_filtro'] ?>"><?php echo $filtro['filtro'] ?></label>
                    </div>
                <?php } ?>
            </div>
            <hr>
            <!--Seccion del Filtro-->
            <div class="col-sm" id="SeccionFiltro">
                <div id="divFiltro">

                </div>
            </div>
            <div id="divPrioridad">
                <div class="d-flex justify-content-center">
                    <h4>Prioridad de Vizualización</h4>
                </div>
                <div class="d-flex justify-content-center">
                    <input id="Prioridad" type="checkbox" data-toggle="toggle" data-on="Tabular" data-off="Geoespacial" checked>
                </div>
                <br>
            </div>
            <div class="col-sm" id="pantalla">
                <div class="col-sm" id="tabla">
                    <div class="row">
                        <div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
                            <h4 class="panel-title">Títulos de concesión</h4>
                        </div>
                        <div class="col-sm">
                            <table id="example" class="table table-bordered responsive nowrap" style="width:100%">
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div id="tituloP" class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
                            <h6 class="panel-title">Pozos</h6>
                        </div>
                        <div id="divTablaPozo" class="col-sm">
                            <table id="tablaPozo" class="table table-bordered responsive nowrap" style="width:100%">
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm" id="pantalla2">
                <hr>
                <?php require_once(__DIR__ . "/../plantillas/referencias.html");?>
            </div>
        </main>
    </div>
</div>
<br>
<!-- Modal -->
<a href="#" id="botonMapa" onclick="cargarMapa();" data-toggle="modal" data-target="#exampleModal" class="float"><i class="fa fa-map my-float"></i><b> Ver Mapa</b></a>
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Mapa Geoespacial</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="SeccionModal">
                <div id="map"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-gob" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
<?php require_once(__DIR__ . "/../plantillas/footer.php"); ?>
<!--Script de chartJS-->
<script src="pozo.js"></script>
<script src="/sig/capas.js"></script>
<script>
    $('#referencias').hide();
</script>