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
    crearMapa();
});

/**
 * Esta función esta al pendiente de los cambios que se
 * presenten en el select de los filtro de búsqueda de los acuiferos
 */
$(document).on("change", "input[type=radio]", async function () {
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Cargando modulo",
        allowEscapeKey: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
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
    debugger
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
        var val = $('[name="filtro"]:checked').val();

        if (val === "agricola9") {
            await loadShape2();
        } else {
            if (!map.hasLayer(OCSelect)) {

                await loadShape();
            }
        }
    }
});

async function cargarMapa() {
    var x = $('#Prioridad').prop('checked');
    var val = $('[name="filtro"]:checked').val();
    if (x === true) {
        if (!map.hasLayer(OCSelect)) {
            if (val === "agricola9") {
                await loadShape2();
            } else {
                await loadShape();
            }
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
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Cargando Mapa Geoespacial",
        allowEscapeKey: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    /**
     * Cargamos OC
     */
    getOC_SIG(function () {
        /**
         * Cargamos Estados
         */
        getEst_SIG(function () {
            let val = $('[name="filtro"]:checked').val();

            switch (val.toLowerCase()) {

                case "agricola1":
                    /**
                     * Cargamos DR
                     */
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
                    break;
                case "agricola2":
                    /**
                     * Cargamos DR
                     */
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
                    break;
                case "agricola5":
                    /**
                     * Cargamos DR
                     */
                    getDTT_SIG(function () {
                        var overlays = {
                            "Organismos de Cuenca": GroupoOCSelect,
                            "Estados": GroupoEstSelect,
                            "Distritos de Temporal Tecnificado": GroupoDRSelect,
                        }
                        var lc = L.control.layers(null, overlays);
                        lc.addTo(map);
                        Swal.close();
                    });
                    break;
                case "agricola7":
                    getMuni_SIG(function () {
                        var overlays = {
                            "Organismos de Cuenca": GroupoOCSelect,
                            "Estados": GroupoEstSelect,
                            "Municipios": GroupoMunSelect,
                        }
                        var lc = L.control.layers(null, overlays);
                        lc.addTo(map);
                        Swal.close();
                    });
                    break;
            }
        });
    });
}

async function loadShape2() {
    await map.off();
    await map.remove();
    crearMapa();
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Cargando Mapa Geoespacial",
        allowEscapeKey: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    /**
        * Cargamos Estados
        */
    getEst_SIG(function () {
        getMuni_SIG(function () {
            var overlays = {
                "Organismos de Cuenca": GroupoOCSelect,
                "Estados": GroupoEstSelect,
                "Municipios": GroupoMunSelect,
            }
            var lc = L.control.layers(null, overlays);
            lc.addTo(map);
            Swal.close();
        });
    });
}

