<?php
/**
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../plantillas/header.php");
require_once(__DIR__ . "/../../controlador/modulossudo.php");
?>
<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Encabezado-->
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Administradores</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Nuevo</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <?php require_once("registrofrom.php");?>
            </div>
        </main>
    </div>
</div>
<!--Footer de la pagina-->
<?php require_once(__DIR__ . "/../plantillas/footer.php"); ?>