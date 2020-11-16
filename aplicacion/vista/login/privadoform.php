<div class="row">
    <div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
        <h2 class="my-4">Datos de la Empresa.<small> Por favor introduzca sus datos</small></h2>
    </div>
    <div class="col " id="Empresas"></div>
</div>

<script>
$("#Empresas").load('/aplicacion/vista/login/empresasdisponibles.php');

function mostrarNP() {
    document.getElementById("Empresas").innerHTML = "";
    $("#Empresas").load('/aplicacion/vista/login/nuevaempresa.php');
}

function cancelarNP() {
    document.getElementById("Empresas").innerHTML = "";
    $("#Empresas").load('/aplicacion/vista/login/empresasdisponibles.php');
}
</script>