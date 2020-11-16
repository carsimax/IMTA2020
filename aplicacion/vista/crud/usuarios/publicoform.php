<h2 class="my-4">Datos de la Institución.<small> Por favor introduzca sus datos</small></h2>
<div id="Instituciones" ></div>

<script>
    $("#Instituciones").load('institucionesdisponibles.php');
    function mostrarNI(){
        document.getElementById("Instituciones").innerHTML = "";
         $("#Instituciones").load('nuevainstitucion.php');
    }
    function cancelarNI(){
        document.getElementById("Instituciones").innerHTML = "";
         $("#Instituciones").load('institucionesdisponibles.php');
    }
</script>