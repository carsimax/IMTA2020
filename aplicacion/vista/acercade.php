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
session_start();
//LLamamos la cabezera con todos los ccs y scripts del sistema
if (!defined(__DIR__ . '/plantillas/header.php')) {
  require(__DIR__ . '/plantillas/header.php');
  define(__DIR__ . '/plantillas/header.php', 1);
}
?>
<div class="container-fluid">
  <div class="row">
    <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
      <div class="pt-3 pb-2 mb-3 border-bottom">
        <nav aria-label="breadcrumb ">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Acerca de...</a></li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <strong>Sistema de Información Sobre el Uso del Agua de Riego en la Agricultura Nacional (SISUAR)</strong>
          <hr>
          <strong>Fondo SADER - CONACYT</strong> <br>
          <em>Fondo Sectorial de Investigación en Materias Agrícola, Pecuaria, Acuacultura, Agrobiotecnología y Recursos Fitogenéticos.</em><br> <br>
          <strong>Proyecto 2017-02-291372 "Plataforma Web Informativa sobre Usos del Agua en la Agricultura Nacional"</strong>
          <hr>
          Este producto está protegido por las leyes de derechos de autor y otros tratados internacionales. La reproducción y distribución no autorizada del código, está penada severamente por la ley. <br><br>
          Para cualquier informe sobre este favor de contactar a:<br>
          <strong>Dr. Alberto González Sánchez (alberto_gonzalez@tlaloc.imta.mx)</strong><br>
          Jefe de proyecto (IMTA) <br><br>
          <strong>Dr. Ronald Ontiveros Capurata (ronald.ontiveros@tlaloc.imta.mx)</strong><br>
          Cátedra CONACyT-IMTA <br><br>

          <strong>Instituto Mexicano de Tecnología del Agua (IMTA)</strong><br>
          Paseo Cuauhnáhuac #8532 <br>
          Progreso, Jiutepec, Mor. 62550 <br>
          (777) 3 29 36 00 Ext. 115 <br><br>

          <strong>Última actualización: </strong><br>
          ► Octubre 2021
          <hr>
          <p><strong>Instituciones colaboradoras:</strong></p>
          <p><strong>► Universidad Autónoma Chapingo</strong><br>
            <em>Responsable</em>: Dr. Víctor Manuel Olmedo Vázquez<br>
            <br>
            ► <strong>Instituto Nacional de Investigaciones Forestales, Agrícolas y Pecuarias</strong><br>
            <em>Responsable</em>: Dr. Ernesto Sifuentes Ibarra
          </p><br>
          <hr>
          <strong>Programadores:</strong><br>
          ► Alberto González Sánchez.<br>
          ► Maximiliano Carsi Castrejon.<br>
          ► Jorge Calderón Peralta. <br> <br>
          <strong>Apoyo Técnico y Diseño:</strong><br>
          ► Juan Bahena Sánchez. <br>
        </div>

        <div id="logos3" class="col-sm-12 col-md-6">
          <img src="/imagenes/LogoSISUAR.png" class="image" style="width: 174px; height: 175px;" />
          <img src="/imagenes/sader_.png" class="image" />
          <img src="/imagenes/CONACYT_.png" class="image" />
          <img src="/imagenes/IMTA_.png" class="image" />
          <img src="/imagenes/CHAPINGO_.png" class="image" />
          <img src="/imagenes/INIFAP_.png" class="image" />
        </div>
      </div>
    </main>
  </div>
</div>
<style>
  .image {
    width: 300px;
    display: block;
    margin: 2rem 0;
  }
</style>
<!-- Modal Login-->
<div class="modal fade" id="LoginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Iniciar Sesíon</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <?php require(__DIR__ . '/login/login.php'); ?>
      </div>
    </div>
  </div>
</div>

<!-- Modal Registro-->
<div class="modal fade" id="RegistroModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Registro Sistema De Información Sobre Uso Del Agua De
          Riego A Nivel Nacional</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <?php require(__DIR__ . '/login/registro.php'); ?>
      </div>
    </div>
  </div>
</div>
<br>
<!--Footer de la pagina-->
<?php
//LLamamos la cabezera con todos los ccs y scripts del sistema
if (!defined(__DIR__ . '/plantillas/footer.php')) {
  require(__DIR__ . '/plantillas/footer.php');
  define(__DIR__ . '/plantillas/footer.php', 1);
}
?>