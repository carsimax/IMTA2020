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
require_once(__DIR__ . "/../plantillas/header.php");
require_once(__DIR__ . "/../../modelo/estado.php");
$registros = new Estado();
$Estados = $registros->getTodos();
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
        <p class="font-weight-normal">Consulta los mapas interactivos de superficies agrícolas bajo riego, cultivos
          agrícolas por ciclo y volumen de riego, fuentes de abastecimiento, tipos de vegetación y condición de suelos.
        </p>
      </div>
      <!--Seccion del Filtro-->
      <div class="col-sm" id="SeccionFiltro">
        <div id="divFiltro">
          <div class="row">
            <div class="col-sm">
              <label>Estados:</label>
              <select class="form-control green" onchange="CambiarMapa()" id="Estado">
                <?php
                    foreach ($Estados as $Estado) {
                    ?>
                <option value="<?php echo $Estado['id_estado'] ?>">
                  <?php echo $Estado['nombre'] ?>
                </option>
                <?php } ?>
              </select>
            </div>
          </div>
        </div>
      </div>
      <!--Resultado-->
      <div class="col-sm" id="pantalla">
        <br>
        <div id="mapa1">
        </div>
        <br>
        <div id="mapa2">
        </div>
        <br>
        <div id="mapa3">
        </div>
        <br>
        <div id="mapa4">
        </div>
        <br>
        <div id="mapa5">
        </div>
        <br>
      </div>
    </main>
  </div>
</div>
<br>
<?php require_once(__DIR__ . "/../plantillas/footer.php"); ?>
<!--Script de chartJS-->
<script src="mapa.js"></script>
<script>
  $('#referencias').hide();
  function ready() {
    CambiarMapa();
  }

  document.addEventListener("DOMContentLoaded", ready);
</script>