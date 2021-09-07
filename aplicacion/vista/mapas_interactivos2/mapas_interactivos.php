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
  <style>
    .mapa__interactivo__container {
      height: 672px;
      overflow: hidden;
      width: 100%;
      display: flex;
    }

    .mapa__banner {
      height: 100%;
      width: 220px;
      object-fit: fill;
    }

    .mapa__interactivo {
      width: 100%;
      height: 100%;
    }

    @media (max-width: 375px) {
      .mapa__interactivo__container {
        flex-direction: column-reverse;
        height: auto;
        overflow: auto;
      }

      .mapa__interactivo {
        height: 500px;
      }
    }
  </style>
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
      <br>
      <div class="col-sm" id="pantalla">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="tab1-tab" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">Superficie Agrícola de Riego</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="tab2-tab" data-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false" onclick="Mapa2()">Principales Cultivos Agrícolas y Volumen de Riego</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="tab3-tab" data-toggle="tab" href="#tab3" role="tab" aria-controls="tab3" aria-selected="false" onclick="Mapa3()">Fuentes de Abastecimiento de Agua de Riego</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="tab4-tab" data-toggle="tab" href="#tab4" role="tab" aria-controls="tab4" aria-selected="false" onclick="Mapa4()">Tipos de Vegetación</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="tab5-tab" data-toggle="tab" href="#tab5" role="tab" aria-controls="tab5" aria-selected="false" onclick="Mapa5()">Condición de los Suelos</a>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
            <br>
            <div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
              <h3>Superficie Agrícola de Riego</h3>
            </div>
            <div class="mapa__interactivo__container">
              <div id="img1"></div>
              <div id="mapa1" class="mapa__interactivo"></div>
            </div>

          </div>
          <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
            <br>
            <div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
              <h3>Principales Cultivos Agrícolas y Volumen de Riego</h3>
            </div>
            <div class="mapa__interactivo__container">
              <div id="img2"></div>
              <div id="mapa2" class="mapa__interactivo"></div>
            </div>
          </div>
          <div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
            <br>
            <div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
              <h3>Fuentes de Abastecimiento de Agua de Riego</h3>
            </div>
            <div class="mapa__interactivo__container">
              <div id="img3"></div>
              <div id="mapa3" class="mapa__interactivo"></div>
            </div>
          </div>
          <div class="tab-pane fade" id="tab4" role="tabpanel" aria-labelledby="tab4-tab">
            <br>
            <div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
              <h3>Tipos de Vegetación</h3>
            </div>
            <div class="mapa__interactivo__container">
              <div id="img4"></div>
              <div id="mapa4" class="mapa__interactivo"></div>
            </div>
          </div>
          <div class="tab-pane fade" id="tab5" role="tabpanel" aria-labelledby="tab5-tab">
            <br>
            <div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
              <h3>Condición de los Suelos</h3>
            </div>
            <div class="mapa__interactivo__container">
              <div id="img5"></div>
              <div id="mapa5" class="mapa__interactivo"></div>
            </div>
          </div>
        </div>
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