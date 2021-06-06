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
          </ol>
        </nav>
      </div>
      <div class="col-md">
        <p class="bold">Mapas interactivos</p>
        <p class="font-weight-normal">Consulta los mapas interactivos de superficies agrícolas bajo riego, cultivos agrícolas por ciclo y volumen de riego, fuentes de abastecimiento, tipos de vegetación y condición de suelos. </p>
      </div>
      <!--Seccion del Filtro-->
      <div class="col-sm" id="SeccionFiltro">
        <div id="divFiltro">
        </div>
      </div>
      
      <!--Resultado-->
      <div class="col-sm" id="pantalla">
   
      </div>
      <div class="col-sm" id="pantalla2">
        <hr>
        <?php require_once(__DIR__ . "/../plantillas/referencias.html"); ?>

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


<?php require_once(__DIR__ . "/../plantillas/footer.php"); ?>
<!--Script de chartJS-->
<script src="gpresa.js"></script>
<script src="presa.js"></script>
<script src="/sig/capas.js"></script>
<script>
  $('#referencias').hide();
</script>