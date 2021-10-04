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
/**
 * Obtenemos los registros
 */
$registros = new FiltroAcu();
$filtros = $registros->getAgricola(); ?>
<div class="container-fluid">
  <div class="row">
    <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
      <!--Encabezado-->
      <div class="pt-3 pb-2 mb-3 border-bottom">
        <nav aria-label="breadcrumb ">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/">Consulta de Información</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Estadística Agrícola</li>
          </ol>
        </nav>
      </div>
      <div class="col-md">
        <p class="bold">Estadística Agrícola</p>
        <p class="font-weight-normal">Consulta los Informes Estadísticos de Producción Agrícola, Superficies Regadas y Volúmenes de Agua Distribuidos en los Distritos de Riego, Unidades de Riego y Temporal Tecnificado, así como sus históricos.</p>
      </div>
      <div class="col-sm" id="filtros">
        <h6>Seleccione un filtro</h6>
        <?php foreach ($filtros as $filtro) { ?>
          <div class="form-check">
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
      <?php require_once(__DIR__ . "/../plantillas/switchVisualizacion.html"); ?>

      <div class="text-right" id="download_shapefile" style="display: none; margin-bottom:10px; margin-right:15px">
        <a onclick="getShapefiles('Estadística_Agrícola')" id="button_download_shapefile" class="btn btn-gob" style="color: white;">Descargar Capas</a>
      </div>
      <!--Resultado-->
      <div class="col-sm" id="pantalla">

      </div>
      <div id="geoJSON" style="display: none;"></div>
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
      <div class="modal-body" id="SeccionModal" style="position: relative;">
        <div id="map">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-gob" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
<?php require_once(__DIR__ . "/../plantillas/footer.php"); ?>
<!--Script de chartJS-->
<script src="agricola.js"></script>
<script defer src="/sig/capas.js"></script>
<script defer src="/aplicacion/vista/getShapefiles.js"></script>