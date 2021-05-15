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
                <div class="row">
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 my-3">
                        <div class="card h-100">
                            <div class="card-header py-3">
                                <h5 class="my-0 font-weight-normal text-center"><a href="/aplicacion/vista/acuifero/acuiferos.php">Acuíferos</a></h5>
                            </div>
                            <a href="/aplicacion/vista/acuifero/acuiferos.php"><img class="img-fluid" src="/imagenes/acuifero.png" title="Disponibilidad de Acuíferos" alt="Disponibilidad de Acuíferos"></a>
                            <div class="card-body text-justify">
                                <p class="font-weight-normal">Consulta los valores de Disponibilidad Media Anual de Agua Subterránea, Descarga Natural Comprometida, Recarga Media Anual, Volumen de Extracción de Aguas Subterráneas y demás información de cada uno de los Estados y Municipios de la República Mexicana.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 my-3">
                        <div class="card h-100">
                            <div class="card-header py-3">
                                <h5 class="my-0 font-weight-normal text-center"><a href="/aplicacion/vista/presa/presas.php">Presas</a></h5>
                            </div>
                            <a href="/aplicacion/vista/presa/presas.php"><img class="img-fluid" src="/imagenes/presa.png" alt="Principales presas" title="Principales presas"></a>
                            <div class="card-body text-justify">
                                <p class="font-weight-normal">Consulta los Volúmenes de Almacenamiento y los Niveles de Aguas Máximas Ordinarias (NAMO) y Extraordniarias (NAME) las principales presas de la República Mexicana.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 my-3">
                        <div class="card h-100">
                            <div class="card-header py-3">
                                <h5 class="my-0 font-weight-normal text-center"><a href="/aplicacion/vista/pozo/pozos.php">Pozos</a></h5>
                            </div>
                            <a href="/aplicacion/vista/pozo/pozos.php"><img class="img-fluid" src="/imagenes/pozo.png" alt="Títulos de conseción" title="Pozos"></a>
                            <div class="card-body text-justify">
                                <p class="font-weight-normal">Consulta los diferentes tipos de Pozos por medio de Títulos de Concesión para conocer los Volúmenes de Extracción de Aguas Nacionales, Número de Anexos de Aguas Subterráneas y demás información de cada uno de los Estados y Municipios de la República Mexicana.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 my-3">
                        <div class="card h-100">
                            <div class="card-header py-3">
                                <h5 class="my-0 font-weight-normal text-center"><a href="/aplicacion/vista/agricola/agricola.php">Estadística Agrícola</a></h5>
                            </div>
                            <a href="/aplicacion/vista/agricola/agricola.php"><img class="img-fluid" src="/imagenes/agricultura.png" alt="Estadística agrícola" title="Estadística agrícola"></a>
                            <div class="card-body text-justify">
                                <p class="font-weight-normal">Consulta los Informes Estadísticos de Producción Agrícola, Superficies Regadas y Volúmenes de Agua Distribuidos en los Distritos de Riego y Temporal Tecnificado, así como sus históricos.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 my-3">
                        <div class="card h-100">
                            <div class="card-header py-3">
                                <h5 class="my-0 font-weight-normal text-center"><a href="/aplicacion/vista/calidad_agua_superficial/calidad_agua_superficial.php">Calidad del Agua</a></h5>
                            </div>
                            <a href="/aplicacion/vista/calidad_agua_superficial/calidad_agua_superficial.php"><img class="img-fluid" src="/imagenes/calidad_agua.png" alt="Calidad de agua en México" title="Calidad de agua en México"></a>
                            <div class="card-body text-justify">
                                <p class="font-weight-normal">Consulta los diferentes indicadores de la calidad del agua como lo son: Demanda Bioquímica de Oxígeno a cinco días (DBO5), Demanda Química de Oxígeno (DQO), Sólidos Suspendidos Totales (SST), Coliformes Fecales (CF) recabados por los sitios de monitoreo operados por la Conagua en todo el país.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 my-3">
                        <div class="card h-100">
                            <div class="card-header py-3">
                                <h5 class="my-0 font-weight-normal text-center"><a href="/aplicacion/vista/estaciones_hidrometricas/estaciones_hidrometricas.php">Estaciones Hidrométricas</a></h5>
                            </div>
                            <a href="/aplicacion/vista/estaciones_hidrometricas/estaciones_hidrometricas.php"><img class="img-fluid" src="/imagenes/hidrometrica.png" alt="Estaciones Hidrométricas" title="Estaciones Hidrométricas"></a>
                            <div class="card-body text-justify">
                                <p class="font-weight-normal">Consulta las diferentes estaciones hidrométricas distribuidas en todo el país.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 my-3">
                        <div class="card h-100">
                            <div class="card-header py-3">
                                <h5 class="my-0 font-weight-normal text-center"><a href="/aplicacion/vista/estaciones_climatologicas/estaciones_climatologicas.php">Estaciones Climatológicas</a></h5>
                            </div>
                            <a href="/aplicacion/vista/estaciones_climatologicas/estaciones_climatologicas.php"><img class="img-fluid" src="/imagenes/climatologica.png" alt="Estaciones climatológicas" title="Estaciones Climatológicas"></a>
                            <div class="card-body text-justify">
                                <p class="font-weight-normal">Consulta las diferentes estaciones climatológicas distribuidas en todo el país.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 my-3">
                        <div class="card h-100">
                            <div class="card-header py-3">
                                <h5 class="my-0 font-weight-normal text-center"><a href="/aplicacion/vista/indice_marginacion/indice_marginacion.php">Índice de Marginación</a></h5>
                            </div>
                            <a href="/aplicacion/vista/indice_marginacion/indice_marginacion.php">
                                <img class="img-fluid" src="/imagenes/marginacion.png" alt="Índice de Marginación" title="Índice de Marginación">
                            </a>
                            <div class="card-body text-justify">
                                <p class="font-weight-normal">Consulta el índice de marginación estatal y municipal de todo el país.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 my-3">
                        <div class="card h-100">
                            <div class="card-header py-3">
                                <h5 class="my-0 font-weight-normal text-center"><a href="/aplicacion/vista/inventario/inventario.php"><small>Inventario de Obras de los Distritos de Riego</small></a></h5>
                            </div>
                            <div class="img-container">
                                <a href="/aplicacion/vista/inventario/inventario.php">
                                    <img class="img-fluid" src="/imagenes/Inventario.png" alt="Inventario de Obras de los Distritos de Riego" title="Inventario de Obras de los Distritos de Riego">
                                </a>
                            </div>
                            <div class="card-body text-justify">
                                <p class="font-weight-normal">Consulta el inventario de obras de infraestructura, obras de cabeza y sociedades de responsabilidad limitada de Distritos de Riego.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</div>
</main>
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