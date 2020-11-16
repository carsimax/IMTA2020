<h2 class="my-4">Datos de la Escuela.<small> Por favor introduzca sus datos</small></h2>
<!--Seccion de las Escuela-->
<div id="Escuelas" ></div>
<!--Fornuario-->
<div class="col-sm">
    <p>Carrera:</p>
    <input type="text" class="form-control" name="Carrera" id="Carrera" >
</div>
<div class="col-sm">
    <p>Grado:</p>
    <input type="number" class="form-control" name="Grado" id="Grado" >
</div>
<div class="col-sm">
    <p>Grupo:</p>
    <input type="text" class="form-control" name="Grupo" id="Grupo" >
</div>
<div class="col-sm">
    <p>Nivel Educativo:</p>
    <select class="form-control" name="Nivel" id="Nivel">
        <option value="Media Superior">Media Superior</option>
        <option value="Superior">Superior</option>
        <option value="Posgrado">Posgrado</option>
    </select>
</div>

<script>
    $("#Escuelas").load('escuelasdisponibles.php');
    function mostrarNE(){
        document.getElementById("Escuelas").innerHTML = "";
         $("#Escuelas").load('nuevaescuela.php');
    }
    function cancelarNE(){
        document.getElementById("Escuelas").innerHTML = "";
         $("#Escuelas").load('escuelasdisponibles.php');
    }
</script>