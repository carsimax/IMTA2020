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
            <div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
                <h4>Sistema de Información Sobre el Uso del Agua de Riego a Nivel Nacional</h4>
            </div>
            <div class="col-sm">
                <p>En este sitio podrás consultar la siguiente información.</p>
            </div>
            <div class="container-fluid">
                <div class="mx-auto contenedor-cards">

                    <div class="modulo card">
                        <div class="card-header">
                            <h5 class="my-0 font-weight-normal text-center"><a href="/aplicacion/vista/acuifero/acuiferos.php">Acuíferos</a></h5>
                        </div>
                        <a href="/aplicacion/vista/acuifero/acuiferos.php"><img src="/imagenes/acuifero.jpg" alt="Card image"></a>
                        <div class="card-body text-justify">
                            <p class="font-weight-normal">Consulta los valores de Disponibilidad Media Anual de Agua Subterránea, Descarga Natural Comprometida, Recarga Media Anual, Volumen de Extracción de Aguas Subterráneas y demás información de cada uno de los Estados y Municipios de la República Mexicana.</p>
                        </div>
                    </div>
                    <div class="card modulo">
                        <div class="card-header">
                            <h5 class="my-0 font-weight-normal text-center"><a href="/aplicacion/vista/presa/presas.php">Presas</a></h5>
                        </div>
                        <a href="/aplicacion/vista/presa/presas.php"><img src="/imagenes/presa.jpg" alt="Card image"></a>
                        <div class="card-body text-justify">
                            <p class="font-weight-normal">Consulta los Volúmenes de Almacenamiento y los Niveles de Aguas Máximas Ordinarias (NAMO) y Extraordniarias (NAME) las principales presas de la República Mexicana.</p>
                        </div>
                    </div>
                    <div class="card modulo">
                        <div class="card-header">
                            <h5 class="my-0 font-weight-normal text-center"><a href="/aplicacion/vista/pozo/pozos.php">Pozos</a></h5>
                        </div>
                        <a href="/aplicacion/vista/pozo/pozos.php"><img src="/imagenes/pozo.jpg" alt="Card image"></a>
                        <div class="card-body text-justify">
                            <p class="font-weight-normal">Consulta los diferentes tipos de Pozos por medio de Títulos de Concesión para conocer los Volúmenes de Extracción de Aguas Nacionales, Número de Anexos de Aguas Subterráneas y demás información de cada uno de los Estados y Municipios de la República Mexicana.</p>
                        </div>
                    </div>
                    <div class="card modulo">
                        <div class="card-header">
                            <h5 class="my-0 font-weight-normal text-center"><a href="/aplicacion/vista/agricola/agricola.php">Estadística Agrícola</a></h5>
                        </div>
                        <a href="/aplicacion/vista/agricola/agricola.php"><img src="/imagenes/agricultura.jpg" alt="Card image"></a>
                        <div class="card-body text-justify">
                            <p class="font-weight-normal">Consulta los Informes Estadísticos de Producción Agrícola, Superficies Regadas y Volúmenes de Agua Distribuidos en los Distritos de Riego, Unidades de Riego y Temporal Tecnificado, así como sus históricos.</p>
                        </div>
                    </div>
                    <div class="card modulo">
                        <div class="card-header">
                            <h5 class="my-0 font-weight-normal text-center"><a href="/aplicacion/vista/calidad_agua_superficial/calidad_agua_superficial.php">Calidad del Agua</a></h5>
                        </div>
                        <a href="/aplicacion/vista/calidad_agua_superficial/calidad_agua_superficial.php"><img src="/imagenes/calidad_agua.jpg" alt="Card image"></a>
                        <div class="card-body text-justify">
                            <p class="font-weight-normal">Consulta los diferentes indicadores de la calidad del agua como lo son: Demanda Bioquímica de Oxígeno a cinco días (DBO5), Demanda Química de Oxígeno (DQO), Sólidos Suspendidos Totales (SST), Coliformes Fecales (CF) recabados por los sitios de monitoreo operados por la Conagua en todo el país.</p>
                        </div>
                    </div>

                    <div class="card modulo">
                        <div class="card-header">
                            <h5 class="my-0 font-weight-normal text-center"><a href="/aplicacion/vista/estaciones_climatologicas/estaciones_climatologicas.php">Estaciones Climatológicas</a></h5>
                        </div>
                        <a href="/aplicacion/vista/estaciones_climatologicas/estaciones_climatologicas.php"><img src="/imagenes/climatologica.jpg" alt="Card image"></a>
                        <div class="card-body text-justify">
                            <p class="font-weight-normal">Consulta las diferentes estaciones climatológicas distribuidas en todo el país.</p>
                        </div>
                    </div>
                    <div class="card modulo">
                        <div class="card-header">
                            <h5 class="my-0 font-weight-normal text-center"><a href="/aplicacion/vista/estaciones_hidrometricas/estaciones_hidrometricas.php">Estaciones Hidrométricas</a></h5>
                        </div>
                        <a href="/aplicacion/vista/estaciones_hidrometricas/estaciones_hidrometricas.php"><img src="/imagenes/hidrometrica.jpg" alt="Card image"></a>
                        <div class="card-body text-justify">
                            <p class="font-weight-normal">Consulta las diferentes estaciones hidrométricas distribuidas en todo el país.</p>
                        </div>
                    </div>
                    <div class="card modulo">
                        <div class="card-header">
                            <h5 class="my-0 font-weight-normal text-center"><a href="/aplicacion/vista/inventario/inventario.php"><small>Inventario de Obras de los Distritos de Riego</small></a></h5>
                        </div>
                        <a href="/aplicacion/vista/inventario/inventario.php"><img src="/imagenes/Inventario.jpg" alt="Card image"></a>
                        <div class="card-body text-justify">
                            <p class="font-weight-normal">Consulta el inventario de obras de infraestructura, obras de cabeza y sociedades de responsabilidad limitada de Distritos de Riego.</p>
                        </div>
                    </div>
                    <div class="card modulo">
                        <div class="card-header">
                            <h5 class="my-0 font-weight-normal text-center"><a href="/aplicacion/vista/indice_marginacion/indice_marginacion.php">Índice de Marginación</a></h5>
                        </div>
                        <a href="/aplicacion/vista/indice_marginacion/indice_marginacion.php"><img src="/imagenes/marginacion.png" alt="Card image"></a>
                        <div class="card-body text-justify">
                            <p class="font-weight-normal">Consulta el índice de marginación estatal</p>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</div>
</main>
</div>
</div>

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
<?php
//LLamamos la cabezera con todos los ccs y scripts del sistema
if (!defined(__DIR__ . '/plantillas/footer.php')) {
    require(__DIR__ . '/plantillas/footer.php');
    define(__DIR__ . '/plantillas/footer.php', 1);
}
?>