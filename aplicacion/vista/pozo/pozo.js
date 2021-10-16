/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */

/* global tablaOC, tablaEst, tablaAcu, tablaMun, map, tabla, moment, tablaP, capaPozo, shp, capaOrganismo, capaEstado, capaAcuifero, capaMuni */
tabla = $("#example").DataTable({
    dom: "Bfrtip",
    columns: [
        {
            title: "Ver más",
            className: "dt-body-justify",
        },
        {
            title: "Título",
            className: "dt-body-justify",
        },
        {
            title: "Uso",
            className: "dt-body-justify",
        },
        {
            title: "Titular",
            className: "dt-body-justify",
        },
        {
            title: "Volumen de extracción de aguas nacionales (m³/año)",
            className: "dt-body-right",
        },
        {
            title: "Número de anexos de aguas superficiales",
            className: "dt-body-right",
        },
        {
            title: "Volumen de aguas superficiales (m³/año)",
            className: "dt-body-right",
        },
        {
            title: "Número de anexos de aguas subterráneas",
            className: "dt-body-right",
        },
        {
            title: "Volumen de aguas subterráneas (m³/año)",
            className: "dt-body-right",
        },
        {
            title: "Número de anexos de descarga",
            className: "dt-body-right",
        },
        {
            title: "Volumen de descarga (m³/día)",
            className: "dt-body-right",
        },
        {
            title: "Número de anexos de zonas federales",
            className: "dt-body-right",
        },
        {
            title: "Superficie (m²)",
            className: "dt-body-right",
        },
    ],
    buttons: [
        {
            extend: "excelHtml5",
            title: "Consulta títulos de concesión",
            className: estiloboton,
            text: "Exportar Excel",
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            },
        },
        {
            extend: "pdfHtml5",
            title: "Consulta títulos de concesión",
            className: estiloboton,
            text: "Exportar PDF",
            message: "",
            orientation: "landscape",
            pageSize: "A3",
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            },
            customize: function (doc) {
                //Remove the title created by datatTables
                doc.content.splice(0, 1);
                //Create a date string that we use in the footer. Format is dd-mm-yyyy
                var now = new Date();
                var jsDate =
                    now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
                // It's important to create enough space at the top for a header !!!
                doc.pageMargins = [20, 70, 20, 50];
                // Set the font size fot the entire document
                doc.defaultStyle.fontSize = 10;
                // Set the fontsize for the table header
                doc.styles.tableHeader.fontSize = 10;
                doc["header"] = function () {
                    return {
                        columns: [
                            {
                                image: logo,
                                width: 200,
                            },
                            {
                                alignment: "left",
                                //italics: true,
                                text: "Consulta títulos de concesión",
                                fontSize: 12.5,
                                margin: [10, 5],
                            },
                            {
                                alignment: "right",
                                fontSize: 10,
                                text: jsDate.toString(),
                            },
                        ],
                        margin: 20,
                    };
                };
                doc["footer"] = function (page, pages) {
                    return {
                        columns: [
                            {
                                // This is the right column
                                alignment: "center",
                                text: [
                                    "Página ",
                                    {
                                        text: page.toString(),
                                    },
                                    " de ",
                                    {
                                        text: pages.toString(),
                                    },
                                ],
                            },
                        ],
                        margin: [50, 0],
                    };
                };
                var objLayout = {};
                objLayout["hLineWidth"] = function (i) {
                    return 0.5;
                };
                objLayout["vLineWidth"] = function (i) {
                    return 0.5;
                };
                objLayout["hLineColor"] = function (i) {
                    return "#aaaaaa";
                };
                objLayout["vLineColor"] = function (i) {
                    return "#aaaaaa";
                };
                objLayout["paddingLeft"] = function (i) {
                    return 4;
                };
                objLayout["paddingRight"] = function (i) {
                    return 4;
                };
                doc.content[0].layout = objLayout;
            },
        },
    ],
    language: {
        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
    },
    columnDefs: [
        {
            targets: 0,
            data: null,
            defaultContent:
                '<button class="btn btn-gob text-ligth  btn-block"><i class="fas fa-tint"></i></button>',
        },
    ],
});

tablaPozo = $("#tablaPozo").DataTable({
    dom: "Bfrtip",
    columns: [
        {
            title: "Anexo",
            className: "dt-body-justify",
        },
        {
            title: "Título de Concesión",
            className: "dt-body-justify",
        },
        {
            title: "Región Hidrológica",
            className: "dt-body-justify",
        },
        {
            title: "Estado",
            className: "dt-body-right",
        },
        {
            title: "Municipio",
            className: "dt-body-right",
        },
        {
            title: "Acuífero",
            className: "dt-body-right",
        },
        {
            title: "Cuenca",
            className: "dt-body-right",
        },
        {
            title: "Volumen anual (m³)",
            className: "dt-body-right",
        },
        {
            title: "Latitud",
            className: "dt-body-right",
        },
        {
            title: "Longitud",
            className: "dt-body-right",
        },
    ],
    buttons: [
        {
            extend: "excelHtml5",
            title: "Anexos título de concesión: ",
            className: estiloboton,
            text: "Exportar Excel",
        },
        {
            extend: "pdfHtml5",
            title: "Anexos título de concesión: ",
            className: estiloboton,
            text: "Exportar PDF",
            orientation: "landscape",
            pageSize: "A4",
            customize: function (doc) {
                //Remove the title created by datatTables
                doc.content.splice(0, 1);
                //Create a date string that we use in the footer. Format is dd-mm-yyyy
                var now = new Date();
                var jsDate =
                    now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
                // It's important to create enough space at the top for a header !!!
                doc.pageMargins = [20, 70, 20, 50];
                // Set the font size fot the entire document
                doc.defaultStyle.fontSize = 10;
                // Set the fontsize for the table header
                doc.styles.tableHeader.fontSize = 10;
                doc["header"] = function () {
                    return {
                        columns: [
                            {
                                image: logo,
                                width: 200,
                            },
                            {
                                alignment: "left",
                                //italics: true,
                                text: "Anexos título de concesión: " + titulo,
                                fontSize: 12.5,
                                margin: [10, 5],
                            },
                            {
                                alignment: "right",
                                fontSize: 10,
                                text: jsDate.toString(),
                            },
                        ],
                        margin: 20,
                    };
                };
                doc["footer"] = function (page, pages) {
                    return {
                        columns: [
                            {
                                // This is the right column
                                alignment: "center",
                                text: [
                                    "Página ",
                                    {
                                        text: page.toString(),
                                    },
                                    " de ",
                                    {
                                        text: pages.toString(),
                                    },
                                ],
                            },
                        ],
                        margin: [50, 0],
                    };
                };
                var objLayout = {};
                objLayout["hLineWidth"] = function (i) {
                    return 0.5;
                };
                objLayout["vLineWidth"] = function (i) {
                    return 0.5;
                };
                objLayout["hLineColor"] = function (i) {
                    return "#aaaaaa";
                };
                objLayout["vLineColor"] = function (i) {
                    return "#aaaaaa";
                };
                objLayout["paddingLeft"] = function (i) {
                    return 4;
                };
                objLayout["paddingRight"] = function (i) {
                    return 4;
                };
                doc.content[0].layout = objLayout;
            },
        },
    ],
    language: {
        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
    },
});

$(document).ready(async function () {
    /**
     * @type {jQuery}
     * Cargamo la tabla por defecto
     */
    $("#pantalla").hide();
    $("#pantalla2").hide();
    $("#divPrioridad").hide();
    $("#botonMapa").hide();
    crearMapa();
});
/**
 * Esta función esta al pendiente de los cambios que se
 * presenten en el select de los filtro de búsqueda de los acuiferos
 */

$(document).on("change", "input[type=radio]", async function () {
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
        document.getElementById("tablaDesglose").innerHTML = "";
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
    document.getElementById("lista").innerHTML = "";
    document.getElementById("divFiltro").innerHTML = "";
    /**
     * Se carga la sección de código HTML correspondiente al filtro seleccionado.
     */
    await $("#divFiltro").load($val.toLowerCase() + "/" + $val.toLowerCase() + ".php");
    //$("#tablaDesglose").load($val + '/' + $val + 'T.php');
    /**
     * Se crea nuevamente el mapa
     */
    crearMapa();
    $("#pantalla").hide();
    $("#pantalla2").hide();
    $("#divPrioridad").hide();
    $("#botonMapa").hide();
    await Swal.close();
});
/**
 * Funcion que se accioina cuando se selecciona un titulo de concesion
 */
$("#example").on("click", "button", async function () {
    alertaCargando("Por favor espere", "Cargando contenido");
    GroupoPozosSelect.clearLayers();
    $val = $("#Tipos").val();
    document.getElementById("divTablaPozo").innerHTML = "";
    $("#divTablaPozo").append(
        '<table id="tablaPozo" class="table table-bordered responsive nowrap" style="width:100%"></table>'
    );
    // $("#botonesPozo").hide();
    var data = tabla.row($(this).parents("tr")).data();
    //mandar a bucar el pozo
    query = 'titulo_id="' + data[1] + '" AND tipo_id=' + $val;
    cadena = "ID=" + query + "&Accion=Pozo";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/pozo.php",
        data: cadena,
        /**
         * @param resp
         * Si el controlador devuelve la consulta se procederá con el proceso de interpretación de los datos
         */
        success: function (resp) {
            var geojsonMarkerOptions = {
                radius: 10,
                fillColor: "#fff700",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8,
            };

            var pozosSHP = {
                type: "FeatureCollection",
                name: "pozosSHP",
                crs: {
                    type: "name",
                    properties: {
                        name: "urn:ogc:def:crs:OGC:1.3:CRS84",
                    },
                },
                features: [],
            };
            data = [];
            titulo = "";
            switch ($val) {
                case "1":
                    $.each(JSON.parse(resp), function (index, item) {
                        pozosSHP.features.push({
                            type: "Feature",
                            properties: {
                                ID: item.id_pozo,
                                TC: item.titulo_id,
                                RH: item.region,
                                cuenca: item.cuenca_id,
                                Latitud: item.lat,
                                Longitud: item.lon,
                            },
                            geometry: {
                                type: "Point",
                                coordinates: [item.lon, item.lat],
                            },
                        });
                        map.setView([item.lat, item.lon], 10);
                        data.push([
                            item.anexo,
                            item.titulo_id,
                            item.region,
                            item.estado,
                            item.municipio,
                            item.acuifero,
                            item.cuenca_id,
                            numeral(Number.parseFloat(item.vol_anual)).format("0,0.00"),
                            item.lat,
                            item.lon
                        ]);
                        titulo = item.titulo_id;
                        document.getElementById("tituloP").innerHTML = "";
                        document.getElementById("tituloP").innerHTML =
                            "<h3 class='panel-title'>Título de Concesión: " +
                            item.titulo_id +
                            "</h3>";
                    });
                    PozosSelect = L.geoJson(pozosSHP, {
                        pointToLayer: function (feature, latlng) {
                            return L.circleMarker(latlng, geojsonMarkerOptions);
                        },
                        onEachFeature: function popUp(f, l) {
                            var out = [];
                            if (f.properties) {
                                contenido =
                                    '<table class="table table-bordered"><thead><tr><th scope="col">Campo</th><th scope="col">Valor</th></tr></thead>' +
                                    '<tbody>' +
                                    //Organismo de Cuenca
                                    '<tr><th scope="row">Pozo</th><td>' + f.properties.ID + ' - ' + f.properties.TC + '</td></tr>' +
                                    //Organismo de Cuenca
                                    '<tr><th scope="row">Región Hidrológica</th><td>' + f.properties.RH + '</td></tr>' +
                                    //Organismo de Cuenca
                                    '<tr><th scope="row">Cuenca</th><td>' + f.properties.cuenca + '</td></tr>' +
                                    //Organismo de Cuenca
                                    '<tr><th scope="row">Latitud</th><td>' + f.properties.Latitud + '</td></tr>' +
                                    //Organismo de Cuenca
                                    '<tr><th scope="row">Longitud</th><td>' + f.properties.Longitud + '</td></tr>' +
                                    '</tbody></table>';
                                l.bindPopup(contenido);
                            }
                        },
                    });
                    GroupoPozosSelect.addLayer(PozosSelect);
                    GroupoPozosSelect.addTo(map);
                    tablaPozo = $("#tablaPozo").DataTable({
                        data: data,
                        scrollX: true,
                        columnDefs: [{ className: 'dt-body-right', targets: [6, 7, 8, 9] }],
                        dom: "Bfrtip",
                        columns: [
                            {
                                title: "Anexo",
                            },
                            {
                                title: "Título de Concesión",
                            },
                            {
                                title: "Región Hidrológica",
                            },
                            {
                                title: "Estado",
                            },
                            {
                                title: "Municipio",
                            },
                            {
                                title: "Acuífero",
                            },
                            {
                                title: "Cuenca",
                            },
                            {
                                title: "Volumen anual (m³)",
                            },
                            {
                                title: "Latitud",
                            },
                            {
                                title: "Longitud",
                            },
                        ],
                        buttons: [
                            {
                                extend: "excelHtml5",
                                title: "Anexos título de concesión: " + titulo,
                                className: estiloboton,
                                text: "Exportar Excel",
                            },
                            {
                                extend: "pdfHtml5",
                                title: "Anexos título de concesión: " + titulo,
                                className: estiloboton,
                                text: "Exportar PDF",
                                orientation: "landscape",
                                pageSize: "A4",
                                customize: function (doc) {
                                    //Remove the title created by datatTables
                                    doc.content.splice(0, 1);
                                    //Create a date string that we use in the footer. Format is dd-mm-yyyy
                                    var now = new Date();
                                    var jsDate =
                                        now.getDate() +
                                        "-" +
                                        (now.getMonth() + 1) +
                                        "-" +
                                        now.getFullYear();
                                    // It's important to create enough space at the top for a header !!!
                                    doc.pageMargins = [20, 70, 20, 50];
                                    // Set the font size fot the entire document
                                    doc.defaultStyle.fontSize = 10;
                                    // Set the fontsize for the table header
                                    doc.styles.tableHeader.fontSize = 10;
                                    doc["header"] = function () {
                                        return {
                                            columns: [
                                                {
                                                    image: logo,
                                                    width: 200,
                                                },
                                                {
                                                    alignment: "left",
                                                    //italics: true,
                                                    text: "Anexos título de concesión: " + titulo,
                                                    fontSize: 12.5,
                                                    margin: [10, 5],
                                                },
                                                {
                                                    alignment: "right",
                                                    fontSize: 10,
                                                    text: jsDate.toString(),
                                                },
                                            ],
                                            margin: 20,
                                        };
                                    };
                                    doc["footer"] = function (page, pages) {
                                        return {
                                            columns: [
                                                {
                                                    // This is the right column
                                                    alignment: "center",
                                                    text: [
                                                        "Página ",
                                                        {
                                                            text: page.toString(),
                                                        },
                                                        " de ",
                                                        {
                                                            text: pages.toString(),
                                                        },
                                                    ],
                                                },
                                            ],
                                            margin: [50, 0],
                                        };
                                    };
                                    var objLayout = {};
                                    objLayout["hLineWidth"] = function (i) {
                                        return 0.5;
                                    };
                                    objLayout["vLineWidth"] = function (i) {
                                        return 0.5;
                                    };
                                    objLayout["hLineColor"] = function (i) {
                                        return "#aaaaaa";
                                    };
                                    objLayout["vLineColor"] = function (i) {
                                        return "#aaaaaa";
                                    };
                                    objLayout["paddingLeft"] = function (i) {
                                        return 4;
                                    };
                                    objLayout["paddingRight"] = function (i) {
                                        return 4;
                                    };
                                    doc.content[0].layout = objLayout;
                                },
                            },
                        ],
                        language: {
                            url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
                        },
                    });
                    break;
                case "2":
                    $.each(JSON.parse(resp), function (index, item) {
                        pozosSHP.features.push({
                            type: "Feature",
                            properties: {
                                ID: item.id_pozo,
                                TC: item.titulo_id,
                                RH: item.region,
                                cuenca: item.cuenca_id,
                                Latitud: item.lat,
                                Longitud: item.lon,
                            },
                            geometry: {
                                type: "Point",
                                coordinates: [item.lon, item.lat],
                            },
                        });
                        map.setView([item.lat, item.lon], 10);
                        data.push([
                            item.anexo,
                            item.titulo_id,
                            item.region,
                            item.estado,
                            item.municipio,
                            item.cuenca_id,
                            numeral(Number.parseFloat(item.vol_anual)).format("0,0.00"),
                            item.fuente,
                            item.afluente,
                            numeral(Number.parseFloat(item.lat)).format("0,0.00"),
                            numeral(Number.parseFloat(item.lon)).format("0,0.00"),
                        ]);
                        titulo = item.titulo_id;
                        document.getElementById("tituloP").innerHTML = "";
                        document.getElementById("tituloP").innerHTML =
                            "<h3 class='panel-title'>Título de Concesión: " +
                            item.titulo_id +
                            "</h3>";
                    });
                    PozosSelect = L.geoJson(pozosSHP, {
                        pointToLayer: function (feature, latlng) {
                            return L.circleMarker(latlng, geojsonMarkerOptions);
                        },
                        onEachFeature: function popUp(f, l) {
                            var out = [];
                            if (f.properties) {
                                //Campo de la clave
                                out.push("ID Pozo: " + f.properties.ID);
                                l.bindPopup(out.join("<br />"));
                                out.push("Título de concesión: " + f.properties.TC);
                                l.bindPopup(out.join("<br />"));
                                out.push("Región Hidrológica: " + f.properties.RH);
                                l.bindPopup(out.join("<br />"));
                                out.push("Cuenca: " + f.properties.cuenca);
                                l.bindPopup(out.join("<br />"));
                                out.push("Latitud: " + f.properties.Latitud);
                                l.bindPopup(out.join("<br />"));
                                out.push("Longitud: " + f.properties.Longitud);
                                l.bindPopup(out.join("<br />")).openPopup();
                            }
                        },
                    });
                    GroupoPozosSelect.addLayer(PozosSelect);
                    GroupoPozosSelect.addTo(map);
                    tablaPozo = $("#tablaPozo").DataTable({
                        data: data,
                        scrollX: true,
                        dom: "Bfrtip",
                        columnDefs: [{ className: 'dt-body-right', targets: [5, 6, 9, 10] }],
                        columns: [
                            {
                                title: "Anexo",
                            },
                            {
                                title: "Título de Concesión",
                            },
                            {
                                title: "Región Hidrológica",
                            },
                            {
                                title: "Estado",
                            },
                            {
                                title: "Municipio",
                            },
                            {
                                title: "Cuenca",
                            },
                            {
                                title: "Volumen anual (m³)",
                            },
                            {
                                title: "Fuente",
                            },
                            {
                                title: "Afluente",
                            },
                            {
                                title: "Latitud",
                            },
                            {
                                title: "Longitud",
                            },
                        ],
                        buttons: [
                            {
                                extend: "excelHtml5",
                                title: "Anexos título de concesión: " + titulo,
                                className: estiloboton,
                                text: "Exportar Excel",
                            },
                            {
                                extend: "pdfHtml5",
                                title: "Anexos título de concesión: " + titulo,
                                className: estiloboton,
                                text: "Exportar PDF",
                                orientation: "landscape",
                                pageSize: "A4",
                                customize: function (doc) {
                                    //Remove the title created by datatTables
                                    doc.content.splice(0, 1);
                                    //Create a date string that we use in the footer. Format is dd-mm-yyyy
                                    var now = new Date();
                                    var jsDate =
                                        now.getDate() +
                                        "-" +
                                        (now.getMonth() + 1) +
                                        "-" +
                                        now.getFullYear();
                                    // It's important to create enough space at the top for a header !!!
                                    doc.pageMargins = [20, 70, 20, 50];
                                    // Set the font size fot the entire document
                                    doc.defaultStyle.fontSize = 10;
                                    // Set the fontsize for the table header
                                    doc.styles.tableHeader.fontSize = 10;
                                    doc["header"] = function () {
                                        return {
                                            columns: [
                                                {
                                                    image: logo,
                                                    width: 200,
                                                },
                                                {
                                                    alignment: "left",
                                                    //italics: true,
                                                    text: "Anexos título de concesión: " + titulo,
                                                    fontSize: 12.5,
                                                    margin: [10, 5],
                                                },
                                                {
                                                    alignment: "right",
                                                    fontSize: 10,
                                                    text: jsDate.toString(),
                                                },
                                            ],
                                            margin: 20,
                                        };
                                    };
                                    doc["footer"] = function (page, pages) {
                                        return {
                                            columns: [
                                                {
                                                    // This is the right column
                                                    alignment: "center",
                                                    text: [
                                                        "Página ",
                                                        {
                                                            text: page.toString(),
                                                        },
                                                        " de ",
                                                        {
                                                            text: pages.toString(),
                                                        },
                                                    ],
                                                },
                                            ],
                                            margin: [50, 0],
                                        };
                                    };
                                    var objLayout = {};
                                    objLayout["hLineWidth"] = function (i) {
                                        return 0.5;
                                    };
                                    objLayout["vLineWidth"] = function (i) {
                                        return 0.5;
                                    };
                                    objLayout["hLineColor"] = function (i) {
                                        return "#aaaaaa";
                                    };
                                    objLayout["vLineColor"] = function (i) {
                                        return "#aaaaaa";
                                    };
                                    objLayout["paddingLeft"] = function (i) {
                                        return 4;
                                    };
                                    objLayout["paddingRight"] = function (i) {
                                        return 4;
                                    };
                                    doc.content[0].layout = objLayout;
                                },
                            },
                        ],
                        language: {
                            url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
                        },
                    });
                    break;
                case "3":
                    $.each(JSON.parse(resp), function (index, item) {
                        pozosSHP.features.push({
                            type: "Feature",
                            properties: {
                                ID: item.id_pozo,
                                TC: item.titulo_id,
                                RH: item.region,
                                cuenca: item.cuenca_id,
                                Latitud: item.lat,
                                Longitud: item.lon,
                            },
                            geometry: {
                                type: "Point",
                                coordinates: [item.lon, item.lat],
                            },
                        });
                        map.setView([item.lat, item.lon], 10);
                        data.push([
                            item.anexo,
                            item.titulo_id,
                            item.region,
                            item.estado,
                            item.municipio,
                            item.cuenca_id,
                            numeral(Number.parseFloat(item.vol_anual)).format("0,0.00"),
                            numeral(Number.parseFloat(item.vol_diario)).format("0,0.00"),
                            item.procedencia,
                            item.receptor,
                            item.uso,
                            item.afluente,
                            item.forma_desc,
                            numeral(Number.parseFloat(item.lat)).format("0,0.00"),
                            numeral(Number.parseFloat(item.lon)).format("0,0.00"),
                        ]);
                        titulo = item.titulo_id;
                        document.getElementById("tituloP").innerHTML = "";
                        document.getElementById("tituloP").innerHTML =
                            "<h3 class='panel-title'>Título de Concesión: " +
                            item.titulo_id +
                            "</h3>";
                    });
                    PozosSelect = L.geoJson(pozosSHP, {
                        pointToLayer: function (feature, latlng) {
                            return L.circleMarker(latlng, geojsonMarkerOptions);
                        },
                        onEachFeature: function popUp(f, l) {
                            var out = [];
                            if (f.properties) {
                                //Campo de la clave
                                out.push("ID Pozo: " + f.properties.ID);
                                l.bindPopup(out.join("<br />"));
                                out.push("Título de concesión: " + f.properties.TC);
                                l.bindPopup(out.join("<br />"));
                                out.push("Región Hidrológica: " + f.properties.RH);
                                l.bindPopup(out.join("<br />"));
                                out.push("Cuenca: " + f.properties.cuenca);
                                l.bindPopup(out.join("<br />"));
                                out.push("Latitud: " + f.properties.Latitud);
                                l.bindPopup(out.join("<br />"));
                                out.push("Longitud: " + f.properties.Longitud);
                                l.bindPopup(out.join("<br />")).openPopup();
                            }
                        },
                    });
                    GroupoPozosSelect.addLayer(PozosSelect);
                    GroupoPozosSelect.addTo(map);
                    tablaPozo = $("#tablaPozo").DataTable({
                        data: data,
                        scrollX: true,
                        columnDefs: [
                            { className: 'dt-body-right', targets: [5, 6, 7, 13, 14] },
                        ],
                        dom: "Bfrtip",
                        columns: [
                            {
                                title: "Anexo",
                            },
                            {
                                title: "Título de Concesión",
                            },
                            {
                                title: "Región Hidrológica",
                            },
                            {
                                title: "Estado",
                            },
                            {
                                title: "Municipio",
                            },
                            {
                                title: "Cuenca",
                            },
                            {
                                title: "Volumen de descarga anual (m³)",
                            },
                            {
                                title: "Volumen de descarga diario (m³)",
                            },
                            {
                                title: "Procedencia",
                            },
                            {
                                title: "Cuerpo receptor",
                            },
                            {
                                title: "Tipo de descarga",
                            },
                            {
                                title: "Afluente de descarga",
                            },
                            {
                                title: "Forma de descarga",
                            },
                            {
                                title: "Latitud",
                            },
                            {
                                title: "Longitud",
                            },
                        ],
                        buttons: [
                            {
                                extend: "excelHtml5",
                                title: "Anexos título de concesión: " + titulo,
                                className: estiloboton,
                                text: "Exportar Excel",
                            },
                            {
                                extend: "pdfHtml5",
                                title: "Anexos título de concesión: " + titulo,
                                className: estiloboton,
                                text: "Exportar PDF",
                                orientation: "landscape",
                                pageSize: "A3",
                                customize: function (doc) {
                                    //Remove the title created by datatTables
                                    doc.content.splice(0, 1);
                                    //Create a date string that we use in the footer. Format is dd-mm-yyyy
                                    var now = new Date();
                                    var jsDate =
                                        now.getDate() +
                                        "-" +
                                        (now.getMonth() + 1) +
                                        "-" +
                                        now.getFullYear();
                                    // It's important to create enough space at the top for a header !!!
                                    doc.pageMargins = [20, 70, 20, 50];
                                    // Set the font size fot the entire document
                                    doc.defaultStyle.fontSize = 10;
                                    // Set the fontsize for the table header
                                    doc.styles.tableHeader.fontSize = 10;
                                    doc["header"] = function () {
                                        return {
                                            columns: [
                                                {
                                                    image: logo,
                                                    width: 200,
                                                },
                                                {
                                                    alignment: "left",
                                                    //italics: true,
                                                    text: "Anexos título de concesión: " + titulo,
                                                    fontSize: 12.5,
                                                    margin: [10, 5],
                                                },
                                                {
                                                    alignment: "right",
                                                    fontSize: 10,
                                                    text: jsDate.toString(),
                                                },
                                            ],
                                            margin: 20,
                                        };
                                    };
                                    doc["footer"] = function (page, pages) {
                                        return {
                                            columns: [
                                                {
                                                    // This is the right column
                                                    alignment: "center",
                                                    text: [
                                                        "Página ",
                                                        {
                                                            text: page.toString(),
                                                        },
                                                        " de ",
                                                        {
                                                            text: pages.toString(),
                                                        },
                                                    ],
                                                },
                                            ],
                                            margin: [50, 0],
                                        };
                                    };
                                    var objLayout = {};
                                    objLayout["hLineWidth"] = function (i) {
                                        return 0.5;
                                    };
                                    objLayout["vLineWidth"] = function (i) {
                                        return 0.5;
                                    };
                                    objLayout["hLineColor"] = function (i) {
                                        return "#aaaaaa";
                                    };
                                    objLayout["vLineColor"] = function (i) {
                                        return "#aaaaaa";
                                    };
                                    objLayout["paddingLeft"] = function (i) {
                                        return 4;
                                    };
                                    objLayout["paddingRight"] = function (i) {
                                        return 4;
                                    };
                                    doc.content[0].layout = objLayout;
                                },
                            },
                        ],
                        language: {
                            url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
                        },
                    });
                    break;
                case "4":
                    $.each(JSON.parse(resp), function (index, item) {
                        pozosSHP.features.push({
                            type: "Feature",
                            properties: {
                                ID: item.id_pozo,
                                TC: item.titulo_id,
                                RH: item.region,
                                cuenca: item.cuenca_id,
                                Latitud: item.lat,
                                Longitud: item.lon,
                            },
                            geometry: {
                                type: "Point",
                                coordinates: [item.lon, item.lat],
                            },
                        });
                        map.setView([item.lat, item.lon], 10);
                        data.push([
                            item.anexo,
                            item.titulo_id,
                            item.region,
                            item.estado,
                            item.municipio,
                            item.cuenca_id,
                            numeral(Number.parseFloat(item.sup)).format("0,0.00"),
                            item.corriente,
                            numeral(Number.parseFloat(item.lat)).format("0,0.00"),
                            numeral(Number.parseFloat(item.lon)).format("0,0.00"),
                        ]);
                        titulo = item.titulo_id;
                        document.getElementById("tituloP").innerHTML = "";
                        document.getElementById("tituloP").innerHTML =
                            "<h3 class='panel-title'>Título de Concesión: " +
                            item.titulo_id +
                            "</h3>";
                    });
                    PozosSelect = L.geoJson(pozosSHP, {
                        pointToLayer: function (feature, latlng) {
                            return L.circleMarker(latlng, geojsonMarkerOptions);
                        },
                        onEachFeature: function popUp(f, l) {
                            var out = [];
                            if (f.properties) {
                                //Campo de la clave
                                out.push("ID Pozo: " + f.properties.ID);
                                l.bindPopup(out.join("<br />"));
                                out.push("Título de concesión: " + f.properties.TC);
                                l.bindPopup(out.join("<br />"));
                                out.push("Región Hidrológica: " + f.properties.RH);
                                l.bindPopup(out.join("<br />"));
                                out.push("Cuenca: " + f.properties.cuenca);
                                l.bindPopup(out.join("<br />"));
                                out.push("Latitud: " + f.properties.Latitud);
                                l.bindPopup(out.join("<br />"));
                                out.push("Longitud: " + f.properties.Longitud);
                                l.bindPopup(out.join("<br />")).openPopup();
                            }
                        },
                    });
                    GroupoPozosSelect.addLayer(PozosSelect);
                    GroupoPozosSelect.addTo(map);
                    tablaPozo = $("#tablaPozo").DataTable({
                        data: data,
                        scrollX: true,
                        columnDefs: [{ className: 'dt-body-right', targets: [5, 6, 8, 9] }],
                        dom: "Bfrtip",
                        columns: [
                            {
                                title: "Anexo",
                            },
                            {
                                title: "Título de Concesión",
                            },
                            {
                                title: "Región Hidrológica",
                            },
                            {
                                title: "Estado",
                            },
                            {
                                title: "Municipio",
                            },
                            {
                                title: "Cuenca",
                            },
                            {
                                title: "Superficie (m²)",
                            },
                            {
                                title: "Corriente",
                            },
                            {
                                title: "Latitud",
                            },
                            {
                                title: "Longitud",
                            },
                        ],
                        buttons: [
                            {
                                extend: "excelHtml5",
                                title: "Anexos título de concesión: " + titulo,
                                className: estiloboton,
                                text: "Exportar Excel",
                            },
                            {
                                extend: "pdfHtml5",
                                title: "Anexos título de concesión: " + titulo,
                                className: estiloboton,
                                text: "Exportar PDF",
                                orientation: "portrait",
                                pageSize: "A4",
                                customize: function (doc) {
                                    //Remove the title created by datatTables
                                    doc.content.splice(0, 1);
                                    //Create a date string that we use in the footer. Format is dd-mm-yyyy
                                    var now = new Date();
                                    var jsDate =
                                        now.getDate() +
                                        "-" +
                                        (now.getMonth() + 1) +
                                        "-" +
                                        now.getFullYear();
                                    // It's important to create enough space at the top for a header !!!
                                    doc.pageMargins = [20, 70, 20, 50];
                                    // Set the font size fot the entire document
                                    doc.defaultStyle.fontSize = 10;
                                    // Set the fontsize for the table header
                                    doc.styles.tableHeader.fontSize = 10;
                                    doc["header"] = function () {
                                        return {
                                            columns: [
                                                {
                                                    image: logo,
                                                    width: 200,
                                                },
                                                {
                                                    alignment: "left",
                                                    //italics: true,
                                                    text: "Anexos título de concesión: " + titulo,
                                                    fontSize: 12.5,
                                                    margin: [10, 5],
                                                },
                                                {
                                                    alignment: "right",
                                                    fontSize: 10,
                                                    text: jsDate.toString(),
                                                },
                                            ],
                                            margin: 20,
                                        };
                                    };
                                    doc["footer"] = function (page, pages) {
                                        return {
                                            columns: [
                                                {
                                                    // This is the right column
                                                    alignment: "center",
                                                    text: [
                                                        "Página ",
                                                        {
                                                            text: page.toString(),
                                                        },
                                                        " de ",
                                                        {
                                                            text: pages.toString(),
                                                        },
                                                    ],
                                                },
                                            ],
                                            margin: [50, 0],
                                        };
                                    };
                                    var objLayout = {};
                                    objLayout["hLineWidth"] = function (i) {
                                        return 0.5;
                                    };
                                    objLayout["vLineWidth"] = function (i) {
                                        return 0.5;
                                    };
                                    objLayout["hLineColor"] = function (i) {
                                        return "#aaaaaa";
                                    };
                                    objLayout["vLineColor"] = function (i) {
                                        return "#aaaaaa";
                                    };
                                    objLayout["paddingLeft"] = function (i) {
                                        return 4;
                                    };
                                    objLayout["paddingRight"] = function (i) {
                                        return 4;
                                    };
                                    doc.content[0].layout = objLayout;
                                },
                            },
                        ],
                        language: {
                            url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
                        },
                    });
                    break;
            }
        },
    }).always(function () {
        Swal.close();
    });
});

/**
 *
 * @returns {Boolean}
 * Funcion para la consulta de los pozos
 */
async function Consultar() {
    alertaCargando("Por favor espere", "Realizando consulta");
    $("#referencias").show();
    deshabilitar();
    /**
     * Limpiamos la parte de acuiferos
     */
    /**
     * Limpia su porpia capa
     */
    map.off();
    map.remove();
    crearMapa();
    tabla.clear().draw();
    tablaPozo.clear().draw();
    $("#pantalla").hide();
    $("#botonMapa").hide();
    $("#pantalla2").hide();
    $("#divPrioridad").hide();
    var concesiones = $("#Concesiones option:selected").length;
    if (concesiones === 0) {
        await habilitar();
        $("#pantalla").hide();
        $("#botonMapa").hide();
        $("#pantalla2").hide();
        $("#divPrioridad").hide();
        await Swal.close();
    }
    //Se construyen las referencias
    data = "Accion=ConsultaPozo&modulo_id=4";
    citas = construirReferencias(data, false);
    const query = await concatConsesion();
    var cadena = "query=" + query + "&Accion=TituloAcu";
    var data = [];
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/titulo.php",
        data: cadena,
        /**
         * @param resp
         * Si el controlador devuelve la consulta se procederá con el proceso de interpretación de los datos
         */
        success: async function (resp) {
            /**
             * Primero se recorre el array con todos los estados devueltos por el controlador.
             */

            $.each(JSON.parse(resp), function (index, item) {
                data.push([
                    item,
                    item.id_titulo,
                    item.uso,
                    item.titular,
                    numeral(Number.parseFloat(item.vol_total)).format("0,0.00"),
                    numeral(Number.parseFloat(item.anexos_sup)).format("0,0.00"),
                    numeral(Number.parseFloat(item.vol_sup)).format("0,0.00"),
                    numeral(Number.parseFloat(item.anexos_sub)).format("0,0.00"),
                    numeral(Number.parseFloat(item.vol_sub)).format("0,0.00"),
                    numeral(Number.parseFloat(item.p_descarga)).format("0,0.00"),
                    numeral(Number.parseFloat(item.vol_desc)).format("0,0.00"),
                    numeral(Number.parseFloat(item.z_federales)).format("0,0.00"),
                    numeral(Number.parseFloat(item.superficie)).format("0,0.00"),
                ]);
            });
            tabla.destroy();
            tablaPozo.destroy();
            tabla = $("#example").DataTable({
                data: data,
                scrollX: true,
                columnDefs: [
                    { className: 'dt-body-right', targets: [4, 5, 6, 7, 8, 9, 10, 11, 12] },
                    {
                        targets: 0,
                        data: null,
                        defaultContent:
                            '<button class="btn btn-gob text-ligth  btn-block"><i class="fas fa-tint"></i></button>',
                    },
                ],
                dom: "Bfrtip",
                columns: [
                    {
                        title: "Gráfica",
                    },
                    {
                        title: "Título",
                    },
                    {
                        title: "Uso",
                    },
                    {
                        title: "Titular",
                    },
                    {
                        title: "Volumen de extracción de aguas nacionales (m³/año)",
                    },
                    {
                        title: "Número de anexos de aguas superficiales",
                    },
                    {
                        title: "Volumen de aguas superficiales (m³/año)",
                    },
                    {
                        title: "Número de anexos de aguas subterráneas",
                    },
                    {
                        title: "Volumen de aguas subterráneas (m³/año)",
                    },
                    {
                        title: "Número de anexos de descarga",
                    },
                    {
                        title: "Volumen de descarga (m³/día)",
                    },
                    {
                        title: "Número de anexos de zonas federales",
                    },
                    {
                        title: "Superficie (m²)",
                    },
                ],
                buttons: [
                    {
                        extend: "excelHtml5",
                        title: "Consulta títulos de concesión",
                        className: estiloboton,
                        text: "Exportar Excel",
                        exportOptions: {
                            columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                        },
                    },
                    {
                        extend: "pdfHtml5",
                        title: "Consulta títulos de concesión",
                        className: estiloboton,
                        text: "Exportar PDF",
                        orientation: "landscape",
                        pageSize: "A3",
                        exportOptions: {
                            columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                        },
                        customize: function (doc) {
                            //Remove the title created by datatTables
                            doc.content.splice(0, 1);
                            //Create a date string that we use in the footer. Format is dd-mm-yyyy
                            var now = new Date();
                            var jsDate =
                                now.getDate() +
                                "-" +
                                (now.getMonth() + 1) +
                                "-" +
                                now.getFullYear();
                            // It's important to create enough space at the top for a header !!!
                            doc.pageMargins = [20, 70, 20, 50];
                            // Set the font size fot the entire document
                            doc.defaultStyle.fontSize = 10;
                            // Set the fontsize for the table header
                            doc.styles.tableHeader.fontSize = 10;
                            doc["header"] = function () {
                                return {
                                    columns: [
                                        {
                                            image: logo,
                                            width: 200,
                                        },
                                        {
                                            alignment: "left",
                                            //italics: true,
                                            text: "Consulta títulos de concesión",
                                            fontSize: 12.5,
                                            margin: [10, 5],
                                        },
                                        {
                                            alignment: "right",
                                            fontSize: 10,
                                            text: jsDate.toString(),
                                        },
                                    ],
                                    margin: 20,
                                };
                            };
                            doc["footer"] = function (page, pages) {
                                return {
                                    columns: [
                                        {
                                            // This is the right column
                                            alignment: "center",
                                            text: [
                                                "Página ",
                                                {
                                                    text: page.toString(),
                                                },
                                                " de ",
                                                {
                                                    text: pages.toString(),
                                                },
                                            ],
                                        },
                                    ],
                                    margin: [50, 0],
                                };
                            };
                            var objLayout = {};
                            objLayout["hLineWidth"] = function (i) {
                                return 0.5;
                            };
                            objLayout["vLineWidth"] = function (i) {
                                return 0.5;
                            };
                            objLayout["hLineColor"] = function (i) {
                                return "#aaaaaa";
                            };
                            objLayout["vLineColor"] = function (i) {
                                return "#aaaaaa";
                            };
                            objLayout["paddingLeft"] = function (i) {
                                return 4;
                            };
                            objLayout["paddingRight"] = function (i) {
                                return 4;
                            };
                            doc.content[0].layout = objLayout;
                        },
                    },
                ],
                language: {
                    url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
                },
            });
            tablaPozo = $("#tablaPozo").DataTable({
                dom: "Bfrtip",
                columns: [
                    {
                        title: "Anexo",
                        className: "dt-body-justify",
                    },
                    {
                        title: "Título de Concesión",
                        className: "dt-body-justify",
                    },
                    {
                        title: "Región Hidrológica",
                        className: "dt-body-justify",
                    },
                    {
                        title: "Estado",
                        className: "dt-body-right",
                    },
                    {
                        title: "Municipio",
                        className: "dt-body-right",
                    },
                    {
                        title: "Acuífero",
                        className: "dt-body-right",
                    },
                    {
                        title: "Cuenca",
                        className: "dt-body-right",
                    },
                    {
                        title: "Volumen anual (m³)",
                        className: "dt-body-right",
                    },
                    {
                        title: "Latitud",
                        className: "dt-body-right",
                    },
                    {
                        title: "Longitud",
                        className: "dt-body-right",
                    },
                ],
                buttons: [
                    {
                        extend: "excelHtml5",
                        title: "Anexos título de concesión: ",
                        className: estiloboton,
                        text: "Exportar Excel",
                    },
                    {
                        extend: "pdfHtml5",
                        title: "Anexos título de concesión: ",
                        className: estiloboton,
                        text: "Exportar PDF",
                        orientation: "landscape",
                        pageSize: "A4",
                        customize: function (doc) {
                            //Remove the title created by datatTables
                            doc.content.splice(0, 1);
                            //Create a date string that we use in the footer. Format is dd-mm-yyyy
                            var now = new Date();
                            var jsDate =
                                now.getDate() +
                                "-" +
                                (now.getMonth() + 1) +
                                "-" +
                                now.getFullYear();
                            // It's important to create enough space at the top for a header !!!
                            doc.pageMargins = [20, 70, 20, 50];
                            // Set the font size fot the entire document
                            doc.defaultStyle.fontSize = 10;
                            // Set the fontsize for the table header
                            doc.styles.tableHeader.fontSize = 10;
                            doc["header"] = function () {
                                return {
                                    columns: [
                                        {
                                            image: logo,
                                            width: 200,
                                        },
                                        {
                                            alignment: "left",
                                            //italics: true,
                                            text: "Anexos título de concesión: " + titulo,
                                            fontSize: 12.5,
                                            margin: [10, 5],
                                        },
                                        {
                                            alignment: "right",
                                            fontSize: 10,
                                            text: jsDate.toString(),
                                        },
                                    ],
                                    margin: 20,
                                };
                            };
                            doc["footer"] = function (page, pages) {
                                return {
                                    columns: [
                                        {
                                            // This is the right column
                                            alignment: "center",
                                            text: [
                                                "Página ",
                                                {
                                                    text: page.toString(),
                                                },
                                                " de ",
                                                {
                                                    text: pages.toString(),
                                                },
                                            ],
                                        },
                                    ],
                                    margin: [50, 0],
                                };
                            };
                            var objLayout = {};
                            objLayout["hLineWidth"] = function (i) {
                                return 0.5;
                            };
                            objLayout["vLineWidth"] = function (i) {
                                return 0.5;
                            };
                            objLayout["hLineColor"] = function (i) {
                                return "#aaaaaa";
                            };
                            objLayout["vLineColor"] = function (i) {
                                return "#aaaaaa";
                            };
                            objLayout["paddingLeft"] = function (i) {
                                return 4;
                            };
                            objLayout["paddingRight"] = function (i) {
                                return 4;
                            };
                            doc.content[0].layout = objLayout;
                        },
                    },
                ],
                language: {
                    url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
                },
            });
            //Verifica si el mapa es prioridad
            var x = $('#Prioridad').prop('checked');
            if (x == false) {
                if (!map.hasLayer(OCSelect)) {
                    //Recargamos el mapa
                    var callBack = async function () {
                        document.getElementById("map").style.display = "block";
                        setTimeout(function () {
                            map.invalidateSize();
                        }, 100);
                    };
                    map.whenReady(callBack);
                    await loadShape();
                }
            }
        },
    }).always(function () {
        habilitar();
        Swal.close();
        Historial();
    });
}

/**
 *
 * @returns {undefined}
 * Funcion para guardar el historial
 */
async function Historial() {
    //Guardamos en es historial
    cadena = "Modulo=Pozos" + "&Accion=Historial";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/mapa.php",
        data: cadena,
        //Si el controlador devuelve una respuesta
        success: function (resp) {
            return true;
        },
    });
}

/**
 *
 * @param {type} ms
 * @returns {Promise}
 * Funcion que pone en pausa ñas funciones
 */
async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 *
 * @returns {undefined}
 * Funciones que deshabilita los controles de consulta
 */
async function deshabilitar() {
    $("#botonMapa").hide();
    $("#pantalla").hide();
    $("#pantalla2").hide();
    $("#divPrioridad").hide();
}

/**
 *
 * @returns {undefined}
 * Funciones que habilitasn los controles de consulta
 */
async function habilitar() {
    $("#botonMapa").show();
    $("#pantalla").show();
    $("#pantalla2").show();
    $("#divPrioridad").show();
}

function CambioTipo() {
    $val = $("#Tipos").val();
    if ($val == 1) {
        $("#divAcuifero").show();
    } else {
        $("#divAcuifero").hide();
    }
    $("#Organismos").multiselect("reset2");
    limpiarOrganismos();
}

async function getTitulo() {
    var S_acuifero = $("#Acuiferos option:selected").val();
    $val = $("#Tipos").val();
    if ($val == 1 && S_acuifero == 0) {
        swal(
            "Error!",
            "Debe seleccionar al menos un Acuífero",
            "warning"
        );
        await Swal.close();
    } else {
        alertaCargando("Por favor espere", "Cargando datos");
        var query = "(";
        //Estados
        if ($("#Estados option:selected").val() != null) {
            //Se recorre el select de tipos.
            $("#Estados option:selected").each(function () {
                query += "estado_id=" + $(this).val() + " or ";
            });
        }
        if ($("#Municipios option:selected").val() != null) {
            query = query.slice(0, -4);
            query += ") AND (";
            $("#Municipios option:selected").each(function () {
                query += "municipio_id=" + $(this).val() + " or ";
            });
        }
        if ($("#Acuiferos option:selected").val() != null && $val == 1) {
            query = query.slice(0, -4);
            query += ") AND (";
            $("#Acuiferos option:selected").each(function () {
                query += "acuifero_id=" + $(this).val() + " or ";
            });
        }
        //Usos
        if ($("#Usos option:selected").val() != null) {
            query = query.slice(0, -4);
            query += ") AND (";
            //Se recorre el select de tipos.
            $("#Usos option:selected").each(function () {
                query += "uso_id=" + $(this).val() + " or ";
            });
        }
        //Tipos
        if ($("#Tipos option:selected").val() != null) {
            query = query.slice(0, -4);
            query += ") AND (";
            //Se recorre el select de tipos.
            $("#Tipos option:selected").each(function () {
                query += "tipo_id=" + $(this).val() + " or ";
            });
        }
        query = query.slice(0, -4);
        query += ") GROUP BY titulo_id";
        //Se resetean las concesiones
        //console.log(query);
        $("#Concesiones").multiselect("reset");
        const cadena = "query=" + query + "&Accion=TituloAcu2";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/titulo.php",
            data: cadena,
            /**
             * @param resp
             * Si el controlador devuelve la consulta se procederá con el proceso de interpretación de los datos
             */
            success: function (resp) {
                /**
                 * Primero se recorre el array con todos los estados devueltos por el controlador.
                 */
                $.each(JSON.parse(resp), function (index, item) {
                    /**
                     * Por medio del plugin de multiselect, podemos agregar los objetos del array al select de acuiferos
                     */
                    data.push({
                        name: item.titulo_id,
                        value: item.titulo_id,
                        checked: false,
                    });
                });
                $("#Concesiones").empty();
                $("#Concesiones").multiselect("loadOptions", data);
            },
        }).always(function () {
            Swal.close();
        });
    }

}

async function getUsos() {
    alertaCargando("Por favor espere", "Cargando datos");
    var query = "(";
    //Estados
    if ($("#Estados option:selected").val() != null) {
        //Se recorre el select de tipos.
        $("#Estados option:selected").each(function () {
            query += "estado_id=" + $(this).val() + " or ";
        });
    }
    
    if ($("#Municipios option:selected").val() != null) {
        query = query.slice(0, -4);
        query += ") AND (";
        $("#Municipios option:selected").each(function () {
            query += "municipio_id=" + $(this).val() + " or ";
        });
    }
    if ($("#Acuiferos option:selected").val() != null && $val == 1) {
        query = query.slice(0, -4);
        query += ") AND (";
        $("#Acuiferos option:selected").each(function () {
            query += "acuifero_id=" + $(this).val() + " or ";
        });
    }
    //Tipos
    if ($("#Tipos option:selected").val() != null) {
        query = query.slice(0, -4);
        query += ") AND (";
        //Se recorre el select de tipos.
        $("#Tipos option:selected").each(function () {
            query += "tipo_id=" + $(this).val() + " or ";
        });
    }
    query = query.slice(0, -4);
    query += ") GROUP BY uso_id";
    //Se resetean las concesiones
    //console.log(query);
    $("#Concesiones").multiselect("reset");
    const cadena = "query=" + query + "&Accion=TituloAcu4";
    var data = [];
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/titulo.php",
        data: cadena,
        /**
         * @param resp
         * Si el controlador devuelve la consulta se procederá con el proceso de interpretación de los datos
         */
        success: function (resp) {
            console.log(resp);
            /**
             * Primero se recorre el array con todos los estados devueltos por el controlador.
             */
            $.each(JSON.parse(resp), function (index, item) {
                data.push(
                    '<option value="' +
                    item.uso_id +
                    '">' +
                    item.uso +
                    "</option>"
                );
                $("#Usos").html(data.join(""));
                $("#Usos").multiselect("reload");
            });
        },
    }).always(function () {
        Swal.close();
    });
}

async function concatConsesion() {
    var query = "(";
    //Se recorre el select de acuiferos.
    $("#Concesiones option:selected").each(function () {
        query += 'id_titulo="' + $(this).val() + '" or ';
    });
    query = query.slice(0, -4);
    query += ")";
    return query;
}

async function cargarMapa() {
    var x = $('#Prioridad').prop('checked');
    if (x == true) {
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

$('#Prioridad').change(async function () {
    var tipo = $("#Tipos option:selected").val();
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
            await loadShape(tipo);
        }
    }
});

