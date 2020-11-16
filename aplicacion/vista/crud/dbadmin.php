<!--Llamamos a la funcion se sesion-->
<?php
require_once(__DIR__ . "/../../controlador/sesion.php");
require_once(__DIR__ . "/../../controlador/modulosadmin.php");
require_once(__DIR__ . "/../../modelo/crud.php");
require_once(__DIR__ . "/../plantillas/header.php");
$registros = new crud();
$cruds = $registros->getTodos();
?>


<div class="container-fluid">
    <?php
        if (isset($_POST['tablaP'])) {
            ?>
    <input type=hidden id="tablaP" name="tablaP" value="<?php echo $_POST['tablaP'] ?>">
    <?php } ?>
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Encabezado-->
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Administración</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Gestionar Base de datos</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
                <h4>Seleccione una tabla <small></small></h4>
            </div>
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <select class="form-control" name="tablaCRUD" id="tablaCRUD" onchange="cambio()">
                            <option value="0" selected> Seleccione una opción</option>
                            <?php
                    foreach ($cruds as $crud) {
                        ?>
                            <option value="<?php echo $crud['nombreCarpeta'] ?>"><?php echo $crud['nombre'] ?></option>
                            <?php } ?>
                        </select>
                    </div>
                </div>
                <hr>
                <div id="tabla">

                </div>
            </div>
        </main>
    </div>
</div>
<!--Footer de la pagina-->
<?php require_once(__DIR__ . "/../plantillas/footer.php"); ?>
<!--Fin del footer de la pagina-->

<!--Seccion del script para la selección de la tabla de la base de datos-->
<script>
$Post = $("#tablaP").val();

if ($Post != null) {
    document.getElementById("tabla").innerHTML = "";
    $("#tabla").load($Post + '/' + $Post + '.php');
    $("#tablaCRUD").val($("#tablaP").val());
}

function cambio() {
    $val = $("#tablaCRUD").val();

    if ($val == '0') {
        document.getElementById("tabla").innerHTML = "";
    }

    document.getElementById("tabla").innerHTML = "";
    $("#tabla").load($val.toLowerCase() + '/' + $val.toLowerCase() + '.php');

}
</script>
<!--Fin del script-->