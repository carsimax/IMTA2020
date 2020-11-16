<!--Llamamos a la funcion se sesion-->
<?php
require_once(__DIR__ . "/../../controlador/sesion.php");
require_once(__DIR__ . "/../plantillas/header.php");
require_once(__DIR__ . "/../../controlador/modulosadmin.php");
?>

<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Encabezado-->
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Administración</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Estadísticas</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <form onsubmit="consultar(); return false">
                    <div class="row">
                        <!--Fecha de inicio-->
                        <div class="col-sm">
                            <p>Fecha de Inicio:</p>
                            <input class="form-control" type="date" name="fInicio" id="fInicio" required>
                        </div>
                        <!--Fecha de fin-->
                        <div class="col-sm">
                            <p>Fecha de Fin:</p>
                            <input class="form-control" type="date" name="fFin" id="fFin" required>
                        </div>
                        <!--Sector-->
                        <div class="col-sm">
                            <p>Sector:</p>
                            <select class="form-control" name="Sector" id="Sector" onchange="cambiar()">
                                <option value="0">Todos los Sectores</option>
                                <option value="1">Sector Educativo</option>
                                <option value="2">Sector Público</option>
                                <option value="3">Sector Privado</option>
                                <option value="4">Sin Especificar</option>
                                <option value="5">Nivel Educativo</option>
                            </select>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-sm">
                            <button class="btn btn-gob btn-fill  btn-block">Consultar</button>
                        </div>
                    </div>
                </form>
                <hr>
                <div class="row">
                    <div class="col-sm">
                        <div id="divGrafica">
                            <canvas id="densityChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <br>
</div>
<!--Footer de la pagina-->
<?php require_once(__DIR__ . "/../plantillas/footer.php"); ?>
<!--Fin del footer de la pagina-->

<script src="/../../ChartJS/Chart.bundle.js"></script>
<script src="/../../ChartJS/utils.js"></script>
<script src="gestadistica.js"></script>
<!--Seccion del script para la selecicon de la tabla de la base de datos-->
<script>
$(document).ready(function() {
    //Cargar la grafica
    graficarAll();
});


function cambio() {
    $val = $("#tablaCRUD").val();

    if ($val == '0') {
        document.getElementById("tabla").innerHTML = "";
    }

    document.getElementById("tabla").innerHTML = "";
    $("#tabla").load($val + '/' + $val + '.php');

}

function consultar() {
    var opcion = document.getElementById("Sector").value;
    var fechaInicio = document.getElementById("fInicio").value;
    var fechaFin = document.getElementById("fFin").value;
    //Se obtiene que tipo de filtrado de informacion se va realizar
    switch (opcion) {
        //En caso que sea todos los sectores
        case '0':
            //Se manda a llamar la funcion
            graficarSectores(fechaInicio, fechaFin);
            break;
        case '1':
            //Se manda a llamar la funcion
            graficarEducativo(fechaInicio, fechaFin);
            break;
        case '2':
            //El caso del sector publico se manda a llamar a la funcion
            graficarPublico(fechaInicio, fechaFin);
            break;
        case '3':
            //El caso del sector privado se manda a llamar a la funcion
            graficarPrivado(fechaInicio, fechaFin);
            break;
        case '4':
            //El caso del sector Sin Especificar se manda a llamar a la funcion
            graficarSE(fechaInicio, fechaFin);
            break;
        case '5':
            //El caso del Nivel Educativo se manda a llamar a la funcion
            graficarNE(fechaInicio, fechaFin);
            break;
    }
}
</script>
<!--Fin del script-->