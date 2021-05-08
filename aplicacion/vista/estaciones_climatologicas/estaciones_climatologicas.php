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

require_once(__DIR__ . "/../../modelo/filtroacu.php");
require_once(__DIR__ . "/../plantillas/header.php");
?>
<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Encabezado-->
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Consulta de Información</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Estaciones Climatológicas</li>
                    </ol>
                </nav>
            </div>
            <div class="col-md">
                <p class="bold">Estaciones Climatológicas</p>
                <p class="font-weight-normal">Consulta las diferentes estaciones climatológicas distribuidas en todo el país.</p>
            </div>
            <!--Seccion del Filtro-->
            <div class="col-sm" id="SeccionFiltro">
                <div id="divFiltro">
                </div>
            </div>
            <hr>
            <div id="divPrioridad">
                <div class="d-flex justify-content-center">
                    <h6>Prioridad de Vizualización</h6>
                </div>
                <div class="d-flex justify-content-center">
                    <input id="Prioridad" type="checkbox" data-toggle="toggle" data-on="Tabular" data-off="Geoespacial" checked>
                </div>
                <br>
            </div>
            <!--Resultado-->
            <div class="col-sm" id="pantalla">
                <div class="row" id='tabla'>
                    <div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
                        <h5 class="panel-title">Consulta Estaciones Climatológicas</h5>
                    </div>
                    <div class="col-sm">
                        <table id="tablaEstacionClimatoogica" class="table table-bordered responsive nowrap" style="width:100%"></table>
                    </div>
                </div>
            </div>
            <?php require_once(__DIR__ . "/../plantillas/referencias.html"); ?>
        </main>
    </div>
</div>
<br>
<!-- Modal -->
<a hidden href="#" id="botonMapa" onclick="cargarMapa();" data-toggle="modal" data-target="#exampleModal" class="float"><i class="fa fa-map my-float"></i><b> Ver Mapa</b></a>
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
<script src="estacion.js"></script>
<script src="/sig/capas.js"></script>
<script>
    $('#referencias').hide();
</script>