<link rel="stylesheet" type="text/css" href="css/estilo.css"/>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script type="text/javascript" src="js/cambiarPestanna.js"></script>

<?php
//Variables para depurar y ver los errores de ejecuci√≥n dentro del servidor apache.
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
            <li class="breadcrumb-item"><a href="/">Consulta de Informaci√≥n</a></li>
          </ol>
        </nav>
      </div>
      <div class="col-md">
        <p class="bold">Mapas interactivos (EN CONTRUCCI√ìN)</p>
        <p class="font-weight-normal">Consulta los mapas interactivos de superficies agr√≠colas bajo riego, cultivos agr√≠colas por ciclo y volumen de riego, fuentes de abastecimiento, tipos de vegetaci√≥n y condici√≥n de suelos. </p>
      </div>
      <!--Seccion del Filtro-->
      <div class="col-sm" id="SeccionFiltro">
        <div id="divFiltro">
        </div>
      </div>

     <script>
     const nombre_mapas=["Aguascalientes","Baja California","Baja California Sur","Campeche","Coahuila","Colima","Chiapas","Chihuahua","Ciudad de MÈxico","Durango","Guanajuato","Guerrero","Hidalgo","Jalisco","MÈxico","Michoac·n de Ocampo","Morelos","Nayarit","Nuevo LeÛnn","Oaxaca","Puebla","QuerÈtaro","Quintana Roo","San Luis PotosÌ","Sinaloa","Sonora","Tabasco","Tamaulipas","Tlaxcala","Veracruz","Yucat·n","Zacatecas"];
     
     function estadoChange(selected) {
        if (selected.value!=null)
        {
            var indice=parseInt(selected.value)-1;	
	    var nomArchivo="./mapas/"+nombre_mapas[indice];
	    document.getElementById("mapa1").src=nomArchivo+".jpg";
	    document.getElementById("mapa2").src=nomArchivo+"_2.jpg";
	    document.getElementById("mapa3").src=nomArchivo+"_3.jpg";
	    document.getElementById("mapa4").src=nomArchivo+"_4.jpg";
	    document.getElementById("mapa5").src=nomArchivo+"_5.jpg";
        }
    }
    </script>

      <div class="col-md-4" id="divEstado" align="center">
        <label>Estado:</label>
        <select class="form-control" onchange="estadoChange(this)" id="Estados">
        <?php
	$primero=true;
        foreach ($estados as $Estado) {
            ?>
	    <option value="<?php echo $Estado['id_estado']; echo($primero?'" selected':'"'); ?>><?php echo $Estado['nombre'] ?> </option>
            <?php
	    $primero=false;
	    }
        ?>
        </select>
	<p>
    </div>
      <!--Resultado-->
      <div class="col-sm" id="pantalla">
      <!-- body onload="javascript:cambiarPestanna(pestanas,pestana1);" -->
      <script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
        <div class="cont" >
        <!--
            <div id="pestanas">
                <ul id=lista>
                    <li id="pestana1"><a href='javascript:cambiarPestanna(pestanas,pestana1);'>Superficies agr√≠colas bajo riego</a></li>
                    <li id="pestana2"><a href='javascript:cambiarPestanna(pestanas,pestana2);'>Cultivos agr√≠colas</a></li>
                    <li id="pestana3"><a href='javascript:cambiarPestanna(pestanas,pestana3);'>Fuentes de abastecimiento</a></li>
                    <li id="pestana4"><a href='javascript:cambiarPestanna(pestanas,pestana4);'>Tipos de vegetaci√≥n</a></li>
                    <li id="pestana5"><a href='javascript:cambiarPestanna(pestanas,pestana5);'>Condici√≥n suelos</a></li>
                </ul>
            </div>
            -->
	    
            <div id="contenidopestanas" align="center">
                <div id="cpestana1">
                  <img id="mapa1" src="./mapas/Aguascalientes.jpg" width="748" height="530"> <p>
                </div>
                <div id="cpestana2">
                  <img id="mapa2" src="./mapas/Aguascalientes_2.jpg"  width="1169" height="827"> <p>
                </div>
                <div id="cpestana3">
                  <img id="mapa3" src="./mapas/Aguascalientes_3.jpg"  width="1169" height="827"> <p>
                </div>
                <div id="cpestana4">
                  <img id="mapa4" src="./mapas/Aguascalientes_4.jpg"  width="1169" height="827"> <p>
                </div>
                <div id="cpestana4">
                  <img id="mapa5" src="./mapas/Aguascalientes_5.jpg"  width="1169" height="827"> <p>
                </div>

            </div>
        </div>
    <!--/body>
      </div>

<script>

// Create a new 'change' event
var event = new Event('change');

    // Dispatch it.
    document.getElementById('Estados').dispatchEvent(event);

    //cambiarPestanna(pestanas,pestana1);
</script>
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