/**
 * Cuado se carga el documento
 */
$(document).ready(async function () {
    /**
     * @type {jQuery}
     * Cargamo la tabla por defecto
     */
    $("#pantalla").hide();
    $("#divPrioridad").hide();
    $("#botonMapa").hide();
    $("#referencias").hide();
    crearMapa();
});
/**
 * 
 * @param {*} ms 
 * Funcion para hacer asincronas las funciones
 */
async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
* Esta función esta al pendiente de los cambios que se
* presenten en el select de los filtro de búsqueda de los acuiferos
*/
$(document).on("change", "input[type=radio]", async function () {
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Cargando modulo",
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    $val = $('[name="filtro"]:checked').val();
    /**
     * Si el filtro esta vacio
     */
    if ($val === "0") {
        /**
         * @type {string}
         * Se vacia la seccion de los filtros
         */
        document.getElementById("divFiltro").innerHTML = "";
        document.getElementById("pantalla").innerHTML = "";
        await $("#referencias").hide();
        document.getElementById("lista").innerHTML = "";
    }
    /**
     * Se remueve el mapa, para así evitar datos basura de mapas anteriores.
     */
    await map.off();
    await map.remove();
    /**
     * Se limpia la seccion de los filtros
     * @type {string}
     */
    document.getElementById("divFiltro").innerHTML = "";
    document.getElementById("lista").innerHTML = "";
    /**
     * Se carga la sección de código HTML correspondiente al filtro seleccionado.
     */
    await $("#divFiltro").load($val.toLowerCase() + "/" + $val.toLowerCase()+ ".php");
    await $("#pantalla").load($val.toLowerCase() + "/" + $val.toLowerCase() + "s.php");
    /**
     * Se crea nuevamente el mapa
     */
    crearMapa();
    await $("#pantalla").hide();
    await $("#divPrioridad").hide();
    await $("#botonMapa").hide();
    await $("#referencias").hide();
    await Swal.close();
});

$('#Prioridad').change(async function () {
    var x = $(this).prop('checked');
    if (x) {
        //El mapa del modal al auxiliar
        $('#map').detach().appendTo('#SeccionModal');
        $('#tabla').detach().appendTo('#pantalla');
        //Cambiamos el titulo del modal
        document.getElementById("exampleModalLabel").innerHTML = "";
        $("#exampleModalLabel").append('Mapa Geoespacial');
        document.getElementById("botonMapa").innerHTML = "";
        $("#botonMapa").append('<i class="fa fa-map my-float"></i><b> Ver Mapa</b>');
    } else {
        //El mapa del modal al auxiliar
        $('#map').detach().appendTo('#pantalla');
        $('#tabla').detach().appendTo('#SeccionModal');
        //Recargamos el mapa
        var callBack = async function () {
            document.getElementById("map").style.display = "block";
            setTimeout(function () {
                map.invalidateSize();
            }, 100);
        };
        map.whenReady(callBack);
        //Cambiamos el titulo del modal
        document.getElementById("exampleModalLabel").innerHTML = "";
        $("#exampleModalLabel").append('Información Tabular');
        document.getElementById("botonMapa").innerHTML = "";
        $("#botonMapa").append('<i class="fa fa-table my-float"></i><b> Ver Tablas</b>');
        if (!map.hasLayer(OCSelect)) {
            await loadShape();
        }
    }
});



/**
 * Funcion que deshabilita las funciones de busqueda
 */
async function deshabilitar() {
    $("#consultar").prop("disabled", true);
    $("#pantalla").hide();
    $("#divPrioridad").hide();
    $("#botonMapa").hide();
}

/**
 * Funciones que habilitan las unfiones de busqueda
 */
async function habilitar() {
    $("#consultar").prop("disabled", false);
    $("#pantalla").show();
    $("#divPrioridad").show();
    $("#botonMapa").show();
}

async function cargarMapa() {
    var x = $('#Prioridad').prop('checked');
    if (x==true) {
        if (!map.hasLayer(OCSelect)) {
            await loadShape();
            var callBack = async function () {
                document.getElementById("exampleModal").style.display = "block";
                setTimeout(function () {
                    map.invalidateSize();
                }, 100);
            };
            map.whenReady(callBack);
        }
    }
}



