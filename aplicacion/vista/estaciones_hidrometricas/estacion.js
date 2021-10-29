/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */
citas = "";
$(document).ready(async function () {
    await $("#pantalla").hide();
    await $("#botonMapa").hide();
    await $("#divPrioridad").hide();
    await $("#referencias").hide();
    $("#download_shapefile").hide();
    /**
     * @type {jQuery}
     * Cargamo la tabla por defecto
     */
    crearMapa();
    await $("#divFiltro").load("estacion(municipio)/estacion(municipio).php");
});

table = $("#tablaPresa").DataTable({
    columnDefs: [{ className: 'dt-body-right', targets: [5] }],
    dom: "Bfrtip",
    columns: [
        {
            title: "Volumen"
        }
    ],
    language: {
        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
    }
});


///Función que crea la instancia al mapa
function crearMapa() {
    map = new L.Map("map", {//Se crea la variable map que contiene las coordenadas del país de México y el tipo de mapa que vamos a utilizar.
        center: [22.4326, -99.13],
        zoom: 5
    });
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    return true;
}


async function cargarMapa() {
    var x = $('#Prioridad').prop('checked');
    if (x == true) {
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



//Cambia los divs entre el principal y el mapa
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


//Carga los shapes al mapa
async function loadShape() {
    alertaCargando("Por favor espere", "Cargando mapa geoespacial");
    getRegionesHidrologicas_SIG(function () {
        getEst_SIG(function () {
            getMuni_SIG(function () {
                getEstacionesHidroSIG(function () {
                    var overlays = {
                        "Regiones Hidrológicas": GrupoRegionesHidrologicasSelect,
                        "Estados": GroupoEstSelect,
                        "Municipios": GroupoMunSelect,
                        "Estaciones Hidrométricas": GrupoEstHidroSelect,
                    }
                    var lc = L.control.layers(null, overlays);
                    lc.addTo(map);
                    Swal.close();
                });
            });
        });
    });
}
