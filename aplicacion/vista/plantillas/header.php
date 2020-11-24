<!DOCTYPE html>
<?php
if (!isset($_SESSION)) {
    session_start();
}
?>
<html lang="es">
<!--Encabezado de la pagina-->

<head>
    <title>Sistema de Información del Uso del Agua de Riego a Nivel Nacional</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--JAVASCRIPT-->
    <script src=" https://code.jquery.com/jquery-3.5.1.js"></script>
    <!--CARGA DE LOS ARCHIVOS DE GOB MX-->
    <link href="/estilo/css/sisuar.css" rel="stylesheet">
    <link href="/estilo/css/bootstrap.css" rel="stylesheet">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
    <!--datatables
    <link href="https://cdn.datatables.net/1.10.21/css/dataTables.bootstrap4.min.css" rel="stylesheet">
    <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.21/js/dataTables.bootstrap4.min.js"></script>-->
    <script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.22/css/jquery.dataTables.css">
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.22/js/jquery.dataTables.js"></script>
    <!--Toggles-->
    <link href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>

    <!--Botones DataTables-->
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.6.2/css/buttons.bootstrap.min.css">
    <script defired src="https://cdn.datatables.net/buttons/1.6.2/js/dataTables.buttons.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.6.2/js/buttons.bootstrap.min.js"></script>
    <!--DATATABLES FIXHEADER-->
    <link rel="stylesheet" href="https://cdn.datatables.net/fixedheader/3.1.7/css/fixedHeader.bootstrap.min.css">
    <script src="https://cdn.datatables.net/fixedheader/3.1.7/js/dataTables.fixedHeader.min.js"></script>
    <!--DATATABLE RESPONSIVE-->
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.5/css/responsive.bootstrap.min.css">
    <script src="https://cdn.datatables.net/responsive/2.2.5/js/dataTables.responsive.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.2.5/js/responsive.bootstrap.min.js"></script>
    <!--Datatable ROWGROUP-->
    <link rel="stylesheet" href="https://cdn.datatables.net/rowgroup/1.1.2/css/rowGroup.bootstrap.min.css">
    <script src="https://cdn.datatables.net/rowgroup/1.1.2/js/dataTables.rowGroup.min.js"></script>
    <!--Botones DATATABLES-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.6.2/js/buttons.html5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.6.2/js/buttons.print.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.6.2/js/buttons.flash.min.js"></script>
    <!--Leaflet-->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>
    <!--SweetAlert-->
    <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-borderless/borderless.css  ">-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bootstrap-4/bootstrap-4.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9/dist/sweetalert2.min.js"></script>
    <!--ChartJs-->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
    <!--JSPDF-->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
    <script type="text/javascript" src="https://html2canvas.hertzen.com/dist/html2canvas.js"></script>
    <!--Scripts Personales-->
    <!--<link rel="stylesheet" href="/estilo/css/sticky-footer.css">-->
    <link rel="stylesheet" href="/estilo/css/gridCards.css">
    <link rel="stylesheet" href="/estilo/css/multiselect.css">
    <link rel="stylesheet" href="/estilo/css/legend.css">
    <script src="/estilo/js/jquery.multiselect.js"></script>
    <script src="/estilo/js/5320a8a9f1.js"></script>
    <script src="/estilo/js/animatescroll.js"></script>
    <script src="/estilo/js/jquery.redirect.min.js"></script>
    <script src="/estilo/js/moment.js"></script>
    <script src="/estilo/js/sweetalert.min.js"></script>
    <script src="/estilo/js/logo.js"></script>
    <script>
        $(window).on("change", function() {
            $.fn.dataTable.tables({
                visible: true,
                api: true
            }).columns.adjust();
            //console.log("Acomodado");
        });

        $(window).on("resize", function() {
            $.fn.dataTable.tables({
                visible: true,
                api: true
            }).columns.adjust();
            //console.log("Acomodado");
        });

        /*Scroll to top when arrow up clicked BEGIN*/
        $(window).scroll(function() {
            var height = $(window).scrollTop();
            if (height > 100) {
                $('#back2Top').fadeIn();
            } else {
                $('#back2Top').fadeOut();
            }
        });
        $(document).ready(function() {
            $("#back2Top").click(function(event) {
                event.preventDefault();
                $("html, body").animate({
                    scrollTop: 0
                }, "slow");
                return false;
            });

        });
        /*Scroll to top when arrow up clicked END*/
    </script>
</head>
<!--Fin del Encabezado de la pagina-->

<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-gob sticky-top">
        <a class="navbar-brand" href="#"><a class="navbar-brand" href="/"><i class="fas fa-home"></i></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <?php
                if (isset($_SESSION['loggedin'])) {
                ?>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <a class="navbar-brand" href="/"><!--<i class="fas fa-home"></i>
                                Plataforma Web Informativa Sobre Usos de Agua en la Agricultura Nacional--></a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="/aplicacion/vista/perfil/perfil.php">
                                <?php echo $_SESSION['Nombre'] ?>
                                <?php echo $_SESSION['A_Paterno'] ?>
                                <?php echo $_SESSION['A_Materno'] ?></a>
                        </li>

                        <li class="nav-item dropdown">
                            <?php
                            switch ($_SESSION['Rol_ID']) {
                                case '1':
                                    require_once 'sudo.php';
                                    break;
                                case '2':
                                    require_once 'admin.php';
                                    break;
                            }
                            ?>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Consulta
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item-gob" href="/aplicacion/vista/acuifero/acuiferos.php">Acuíferos</a>
                                <a class="dropdown-item-gob" href="/aplicacion/vista/presa/presas.php">Presas</a>
                                <a class="dropdown-item-gob" href="/aplicacion/vista/pozo/pozos.php">Pozos</a>
                                <a class="dropdown-item-gob" href="/aplicacion/vista/agricola/agricola.php">Estadística Agrícola</a>
                                <a class="dropdown-item-gob" href="/aplicacion/vista/calidad_agua_superficial/calidad_agua_superficial.php">Calidad del agua superficial</a>
                                <a class="dropdown-item-gob" href="/aplicacion/vista/estaciones_climatologicas/estaciones_climatologicas.php">Estaciones Climatológicas</a>
                                <a class="dropdown-item-gob" href="/aplicacion/vista/estaciones_hidrometricas/estaciones_hidrometricas.php">Estaciones Hidrométricas</a>
                                <a class="dropdown-item-gob" href="/aplicacion/vista/indice_marginacion/indice_marginacion.php">Índice de Marginación</a>
                                <a class="dropdown-item-gob" href="/aplicacion/vista/inventario/inventario.php">Inventario de Obras de los Distritos de Riego</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/aplicacion/vista/sugerencia.php">Comentarios y sugerencias</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="logout" href="#" onclick="logout();">Cerrar Sesión</a>
                        </li>
                    </ul>
                <?php } else { ?>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#LoginModal" class="trigger-btn" data-toggle="modal">Iniciar Sesión</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#RegistroModal" class="trigger-btn" data-toggle="modal">Regístrate</a>
                        </li>
                    </ul>
                <?php } ?>
            </div>
    </nav>