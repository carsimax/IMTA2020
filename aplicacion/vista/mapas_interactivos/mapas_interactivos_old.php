<link rel="stylesheet" type="text/css" href="css/estilo.css"/>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script type="text/javascript" src="js/cambiarPestanna.js"></script>

<?php
//Variables para depurar y ver los errores de ejecución dentro del servidor apache.
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once(__DIR__ . "/../plantillas/header.php");
require_once(__DIR__ . "/../../modelo/estado.php");
/**
 * Obtenemos los registros de los estados
 */
$registros = new Estado();
$estados = $registros->getTodos();

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
        <p class="bold">Mapas interactivos (EN CONTRUCCIÓN)</p>
        <p class="font-weight-normal">Consulta los mapas interactivos de superficies agrícolas bajo riego, cultivos agrícolas por ciclo y volumen de riego, fuentes de abastecimiento, tipos de vegetación y condición de suelos. </p>
      </div>
      <!--Seccion del Filtro-->
      <div class="col-sm" id="SeccionFiltro">
        <div id="divFiltro">
        </div>
      </div>

      <div class="col-md-4" id="divEstado" align="center">
        <label>Estado:</label>
        <select class="form-control" onchange="Estados()" multiple id="Estados">
        <?php
        foreach ($estados as $Estado) {
            ?>
            <option value="<?php echo $Estado['id_estado'] ?>"><?php echo $Estado['nombre'] ?> </option>
            <?php } ?>
        </select>
    </div>
      <!--Resultado-->
      <div class="col-sm" id="pantalla">
      <!-- body onload="javascript:cambiarPestanna(pestanas,pestana1);" -->
      <script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
        <div class="cont" >            
            <div id="pestanas">
                <ul id=lista>
                    <li id="pestana1"><a href='javascript:cambiarPestanna(pestanas,pestana1);'>Superficies agrícolas bajo riego</a></li>
                    <li id="pestana2"><a href='javascript:cambiarPestanna(pestanas,pestana2);'>Cultivos agrícolas</a></li>
                    <li id="pestana3"><a href='javascript:cambiarPestanna(pestanas,pestana3);'>Fuentes de abastecimiento</a></li>
                    <li id="pestana4"><a href='javascript:cambiarPestanna(pestanas,pestana4);'>Tipos de vegetación</a></li>
                    <li id="pestana5"><a href='javascript:cambiarPestanna(pestanas,pestana5);'>Condición suelos</a></li>
                </ul>
            </div>
            
            <div id="contenidopestanas" align="center">
                <div id="cpestana1">
                  <img src="./mapas/Aguascalientes.jpg" width="748" height="530"> 
                </div>
                <div id="cpestana2">
                  <!--img src="./mapas/Aguascalientes2.jpg"  width="1169" height="827"--> 
                </div>
                <div id="cpestana3">
                  <!--img src="./mapas/Aguascalientes3.jpg"  width="1169" height="827"--> 
                </div>
                <div id="cpestana4">
                  <!--img src="./mapas/Aguascalientes4.jpg"  width="1169" height="827"--> 
                </div>
                <div id="cpestana4">
                  <!--img src="./mapas/Aguascalientes5.jpg"  width="1169" height="827"--> 
                </div>

            </div>
        </div>
    <!--/body>
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