<h2 class="my-4">Datos de la Empresa.<small> Por favor introduzca sus datos</small></h2>
<div id="Empresas" ></div>

<script>
    $("#Empresas").load('empresasdisponibles.php');
    function mostrarNP(){
        document.getElementById("Empresas").innerHTML = "";
         $("#Empresas").load('nuevaempresa.php');
    }
    function cancelarNP(){
        document.getElementById("Empresas").innerHTML = "";
         $("#Empresas").load('empresasdisponibles.php');
    }
</script>