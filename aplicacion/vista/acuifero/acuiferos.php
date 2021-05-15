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
if (!defined(__DIR__ . "/../../modelo/filtroacu.php")) {
    require(__DIR__ . "/../../modelo/filtroacu.php");
    define(__DIR__ . "/../../modelo/filtroacu.php", 1);
}
if (!defined(__DIR__ . "/../plantillas/header.php")) {
    require(__DIR__ . "/../plantillas/header.php");
    define(__DIR__ . "/../plantillas/header.php", 1);
}

/**
 * Obtenemos los registros
 */
$registros = new FiltroAcu();
$filtros = $registros->getTodos();
?>
<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Encabezado-->
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Consulta de Información</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Acuíferos</li>
                    </ol>
                </nav>
            </div>

            <div class="col-md">
                <p class="bold">Acuíferos</p>
                <p class="font-weight-normal">Consulta los valores de Disponibilidad Media Anual de Agua Subterránea, Descarga Natural Comprometida, Recarga Media Anual, Volumen de Extracción de Aguas Subterráneas y demás información de cada uno de los Estados y Municipios de la República Mexicana.</p>
            </div>
            <!--Seccion Para Seleccionr el Filtro-->
            <div class="col-md" id="filtros">
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
            <!--Resultado-->
            <?php require_once(__DIR__ . "/../plantillas/switchVisualizacion.html"); ?>
            <div class="col-sm" id="pantalla">
                <div class="row" id="tablaDesglose"></div>
            </div>

            <div class="col-sm" id="pantalla2">
                <hr>
                <div class="row">
                    <div class="col-sm ml-2">
                        <h4>Glosario</h4>
                        <ul class="ml-4">
                            <li><b>DOF: </b>Diario Oficial de la Federación de México.</li>
                            <li><b>REPDA: </b>Registro Público de Derechos de Agua.</li>
                            <li><b>R: </b>Recarga Media Anual (hm<sup>3</sup>).</li>
                            <li><b>DNC: </b>Descarga Natural Comprometida (hm<sup>3</sup>).</li>
                            <li><b>VCAS: </b>Volumen concesionado/Asignado de aguas subterráneas (hm<sup>3</sup>).</li>
                            <li><b>VEALA: </b>Volumen de extracción de agua en las zonas de suspensión provisional
                                de libre alumbramiento y los inscritos en el Registro Nacional Permanente (hm<sup>3</sup>).
                            </li>
                            <li><b>VAPTYR: </b>Volumen de extracción de agua pendiente de titulación y/o registro en
                                el REPDA (hm<sup>3</sup>).
                            </li>
                            <li><b>VAPRH: </b>Volumen de agua correspondiente a reservas, reglamentos y programación
                                hídrica (hm<sup>3</sup>).
                            </li>
                            <li><b>DMA: </b>Disponibilidad media anual de agua del subsuelo (hm<sup>3</sup>).</li>
                        </ul>
                    </div>
                    <?php require_once(__DIR__ . "/../plantillas/referencias.html"); ?>
                </div>
            </div>
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


<!-- Modal -->
<div class="modal fade" id="graficaModal">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Grafica Acuífero</h5>
            </div>
            <div id="divGrafica" class="modal-body">
                <canvas id="densityChart"></canvas>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
<?php
if (!defined(__DIR__ . "/../plantillas/footer.php")) {
    require(__DIR__ . "/../plantillas/footer.php");
    define(__DIR__ . "/../plantillas/footer.php", 1);
}
?>
<script src="acuifero.js"></script>
<script src="/sig/capas.js"></script>
<script src="graficaacu.js"></script>