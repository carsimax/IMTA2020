<div class="row">
    <div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
        <h2 class="my-4">Datos de la Institución.<small> Por favor introduzca sus datos</small></h2>
    </div>
    <div class="col-sm" id="Instituciones"></div>
</div>

<script>
$("#Instituciones").load('/aplicacion/vista/login/institucionesdisponibles.php');

function mostrarNI() {
    document.getElementById("Instituciones").innerHTML = "";
    $("#Instituciones").load('/aplicacion/vista/login/nuevainstitucion.php');
}

function cancelarNI() {
    document.getElementById("Instituciones").innerHTML = "";
    $("#Instituciones").load('/aplicacion/vista/login/institucionesdisponibles.php');
}
</script>