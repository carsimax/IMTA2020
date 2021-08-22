<div class="row">
    <div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
        <h2 class="my-4">Datos de la Escuela.<small> Por favor introduzca sus datos</small></h2>
    </div>
    <!--Seccion de las Escuela-->
    <div class="col-sm" id="Escuelas"></div>
    <!--Fornuario-->
    <div class="col-sm">
        <p>Carrera:</p>
        <input type="text" class="form-control" name="Carrera" id="Carrera">
    </div>
    <div class="col-sm">
        <p>Grado:</p>
        <input type="number" class="form-control" name="Grado" id="Grado">
    </div>
    <div class="col-sm">
        <p>Grupo:</p>
        <input type="text" class="form-control" name="Grupo" id="Grupo">
    </div>
    <div class="col-sm">
        <p>Nivel Educativo:</p>
        <select class="form-control" name="Nivel" id="Nivel">
            <option value="Media Superior">Media Superior</option>
            <option value="Superior">Superior</option>
            <option value="Posgrado">Posgrado</option>
        </select>
    </div>
</div>
<script>
$("#Escuelas").load('/aplicacion/vista/login/escuelasdisponibles.php');

function mostrarNE() {
    document.getElementById("Escuelas").innerHTML = "";
    $("#Escuelas").load('/aplicacion/vista/login/nuevaescuela.php');
}

function cancelarNE() {
    document.getElementById("Escuelas").innerHTML = "";
    $("#Escuelas").load('/aplicacion/vista/login/escuelasdisponibles.php');
}
</script>