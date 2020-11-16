<?php
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
?>




<main class="page">

    <!--Contenedor-->
    <div class="container">
        <br><br><br>
        <div class="row">
            <!--Cabezera del titulo-->
            <h2 class="my-4">Bienvenidosaddsadadas <small>Sistema De Información Sobre Uso Del Agua De Riego A Nivel
                    Nacional</small></h2>
        </div>
        <!-- Portfolio Item Row -->
        <div class="row">
            <!--Carousel-->
            <?php
            //LLamamos al formulario
            require_once("registroform.php");
            ?>
        </div>
        <br>
    </div>
</main>
<!--Footer de la pagina-->
<?php require_once(__DIR__ . "/../../plantillas/footer.php"); ?>

