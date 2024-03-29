/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */
/**
 * Esta función crea la instancia al mapa de Leflet y coloca la vista al principio
 */
$(document).ready(async function () {
    /**
     * @type {jQuery}
     * Cargamo la tabla por defecto
     */
    $("#pantalla").hide();
    $("#botonMapa").hide();
    $("#divPrioridad").hide();
    $("#referencias").hide();
    $("#download_shapefile").hide();
    crearMapa();
});

/**
 * Esta función esta al pendiente de los cambios que se
 * presenten en el select de los filtro de búsqueda de los acuiferos
 */
$(document).on("change", "input[type=radio]", async function () {
    $val = $('[name="filtro"]:checked').val();
    /**
     * Se remueve el mapa, para así evitar datos basura de mapas anteriores.
     */
    await map.off();
    await map.remove();
    crearMapa();
    /**
     * Se limpia la seccion de los filtros
     * @type {string}
     */
    document.getElementById("divFiltro").innerHTML = "";
    document.getElementById("lista").innerHTML = "";

    /**
     * Se carga la sección de código HTML correspondiente al filtro seleccionado.
     */
    await $("#divFiltro").load($val.toLowerCase() + "/" + $val.toLowerCase() + ".php");
    await $("#pantalla").load($val.toLowerCase() + "/" + $val.toLowerCase() + "s.php").hide();
    /**
     * Se crea nuevamente el mapa
     */

    await $("#divPrioridad").hide();
    await $("#botonMapa").hide();
    await $("#referencias").hide();
    await Swal.close();
});

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 *
 * @returns {undefined}
 * Funcion que deshabilita la funcionalidad de la interfez durante la consulta
 *
 */
async function deshabilitar() {
    $("#pantalla").hide();
    $("#botonMapa").hide();
    $("#divPrioridad").hide();
    $("#referencias").hide();
}

/**
 *
 * @returns {undefined}
 * Funcion que habilita la funcionalidad de la interfaz
 */
async function habilitar() {
    $("#pantalla").show();
    $("#botonMapa").show();
    $("#divPrioridad").show();
    $("#referencias").show();
}

$('#Prioridad').change(async function () {
    var x = $(this).prop('checked');
    if (x) {
        document.getElementById("download_shapefile").style.display = "none";
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
        document.getElementById("download_shapefile").style.display = "block";
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

async function cargarMapa() {
    var x = $('#Prioridad').prop('checked');
    if (x === true) {
        if (!map.hasLayer(OCSelect)) {
            document.getElementById("download_shapefile").style.display = "block";
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


async function loadShape() {
    await map.off();
    await map.remove();
    crearMapa();
    alertaCargando("Por favor espere", "Cargando mapa geoespacial");

    getOC_SIG(function () {
        getEst_SIG(function () {
            getDR_SIG(function () {
                var overlays = {
                    "Organismos de Cuenca": GroupoOCSelect,
                    "Estados": GroupoEstSelect,
                    "Distritos de Riego": GroupoDRSelect,
                }
                var lc = L.control.layers(null, overlays);
                lc.addTo(map);
                Swal.close();
            });
        });
    });
}

function getCitaConsulta() {
    //Se obtiene la cita con la información de calidad del agua
    cadena = "Accion=getCitaConsulta&modulo_id=11";
    citas = "\n ";
    $.ajax({
        type: "GET",
        url: "/aplicacion/controlador/catalogo.php",
        data: cadena,
        success: function (resp) {
            document.getElementById("lista").innerHTML = "";
            $.each(JSON.parse(resp), function (index, item) {
                citas += item.cita + " \n";
                $("#lista").append("<li class='text-left'>" + item.cita + "</li>");
            });
        },
    });

}