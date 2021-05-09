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
                <h1 class="h5">Sistema de Información Sobre el Uso del Agua de Riego a Nivel Nacional</h1>
            </div>

            <?php if (isset($_SESSION['loggedin'])) { ?>
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
            <?php } else { ?>
                <div class="row">
                    <div class="col-md-6">
                        <h4 class="text-center"><small>Bienvenido</small></h4>
                        <p class="justify">
                            La agricultura es una actividad económica vital para el desarrollo de un país que demanda
                            cada
                            vez más cantidades de alimentos para una población en constante crecimiento. La agricultura
                            mexicana está expuesta a factores adversos que incrementan el riesgo y vulnerabilidad a la
                            siniestralidad, entre los que más afectan al desarrollo de los cultivos y causan más
                            pérdidas están
                            los climáticos (variabilidad y cambio climático) y la disponibilidad de recursos hídricos.
                            Para
                            afrontar con éxito este desafío es indispensable contar con información que permita evaluar
                            el
                            comportamiento no sólo de la producción agrícola de un país y del uso de la tierra, sino
                            también
                            estimar el uso del agua para riego, analizar patrones de uso y niveles de eficiencia para
                            fijar metas
                            compartidas con los usuarios y mejorar la productividad por unidad de volumen usado y por
                            unidad de superficie de suelo.
                        </p>
                        <p class="justify">
                            Varias instituciones gubernamentales proporcionan información estadística, principalmente
                            tabular, de la producción agrícola y volumen de agua entregado en las zonas agrícolas bajo
                            riego a
                            nivel nacional. Dado sus distintos orígenes, esta información está dispersa y no tiene un
                            formato
                            homogéneo, lo que dificulta su utilización. Ante esta situación, se requiere de plataformas
                            de
                            comunicación digital que faciliten el acceso y análisis efectivo de la información
                            disponible,
                            haciendo uso de las más recientes tecnologías de información y comunicación y los sistemas
                            de
                            información geográfica para maximizar el aprovechamiento de los datos generados.
                        </p>
                        <p class="justify">
                            En este contexto, se presenta el Sistema de Información Sobre el Uso del Agua de Riego en la Agricultura Nacional (SISUAR), con el propósito de brindar un punto de acceso común a la información relacionada con el uso y explotación del recurso agua en la agricultura nacional de riego. El sistema proporciona información estadística de la producción agrícola de los Distritos y las Unidades de Riego, presas, aprovechamientos subterráneos para la explotación del agua destinada al uso agrícola, datos sobre la evapotranspiración de cultivos, volúmenes utilizados y otras fuentes de datos relacionadas. La intención es poner al alcance de los usuarios interesados una hereramienta de consulta con una interfaz amigable y con herramientas que facilitan el análisis y la extracción de información.
                        </p>
                    </div>
                    <div class="col-md-6" id="padre">
                        <img id="hijo" style="max-width:100%;width:auto;height:auto;" class="img-responsive" src="/imagenes/Inicio.jpg">
                    </div>
                </div>
            <?php } ?>
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