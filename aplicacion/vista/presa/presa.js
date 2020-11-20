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
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Cargando modulo",
        allowEscapeKey: false,
    allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    await $("#pantalla").hide();
    await $("#pantalla2").hide();
    await $("#divPrioridad").hide();
    await $("#botonMapa").hide();
    /**
     * @type {jQuery}
     * Cargamo la tabla por defecto
     */
    crearMapa();
    await $("#divFiltro").load("presa(estado)/presa(estado).php");
    await Swal.close();
});

//Tabla Presas
table = $("#tablaPresa").DataTable({
    columnDefs: [{className: 'dt-body-right', targets: [5]}],
    dom: "Bfrtip",
    columns: [
        {
            title: "Volumen",
        },
        {
            title: "Nombre Oficial",
        },
        {
            title: "Nombre Común",
        },
        {
            title: "Corriente",
        },
        {
            title: "Estado",
        },
        {
            title: "Año Termino",
        },
    ],
    buttons: [
        {
            extend: "excelHtml5",
            title: "Consulta de presas",
            className: "btn btn-gob btn-sm",
            text: "Exportar Excel",
            exportOptions: {
                columns: [1, 2, 3, 4, 5],
            },
        },
        {
            extend: "pdfHtml5",
            title: "Consulta de presas",
            className: "btn btn-gob btn-sm",
            text: "Exportar PDF",
            messageBottom: citas,
            orientation: "portrait",
            pageSize: "A4",
            exportOptions: {
                columns: [1, 2, 3, 4, 5],
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
                                text: "Consulta de presas",
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
                                    {text: page.toString()},
                                    " de ",
                                    {text: pages.toString()},
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

//Tabla para Presa Volumen
tableV = $("#tablaVolumen").DataTable({
    columnDefs: [{className: 'dt-body-right', targets: [3, 4, 5, 6]}],
    dom: "Bfrtip",
    columns: [
        {
            title: "Gráfica",
        },
        {
            title: "Presa",
        },
        {
            title: "Año",
        },
        {
            title: "Altura de la cortina (m)",
        },
        {
            title: "Capacidad al NAME (hm³)",
        },
        {
            title: "Capacidad al NAMO (hm³)",
        },
        {
            title: "Vol. de almacenamiento (hm³)",
        },
    ],
    buttons: [
        {
            extend: "excelHtml5",
            title: "Volumen de presas",
            className: "btn btn-gob btn-sm",
            text: "Exportar Excel",
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6],
            },
        },
        {
            extend: "pdfHtml5",
            title: "Volumen de presas",
            className: "btn btn-gob btn-sm",
            text: "Exportar PDF",
            messageBottom: citas,
            orientation: "portrait",
            pageSize: "A4",
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6],
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
                                text: "Volumen de presas",
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
                                    {text: page.toString()},
                                    " de ",
                                    {text: pages.toString()},
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

/**
 * Esta función esta al pendiente de los cambios que se
 * presenten en el select de los filtro de búsqueda de los acuiferos
 */
function cambio() {
    /**
     *
     * @type {*|jQuery|string|undefined}
     * Obtiene el valo del filtro
     */
    $val = $("#filtro").val();

    /**
     * Si el filtro esta vacio
     */
    if ($val === "0") {
        /**
         * @type {string}
         * Se vacia la seccion de los filtros
         */
        document.getElementById("divFiltro").innerHTML = "";
        $("#referencias").hide();
        document.getElementById("lista").innerHTML = "";
    }
    /**
     * Se remueve el mapa, para así evitar datos basura de mapas anteriores.
     */
    map.off();
    map.remove();
    /**
     * Se limpia la seccion de los filtros
     * @type {string}
     */
    document.getElementById("divFiltro").innerHTML = "";
    $("#referencias").hide();
    document.getElementById("lista").innerHTML = "";
    /**
     * Se carga la sección de código HTML correspondiente al filtro seleccionado.
     */
    $("#divFiltro").load($val + "/" + $val + ".php");
    /**
     * Se crea nuevamente el mapa
     */
    crearMapa();
}

//Funcion que llena la tabla de presa volumen
$("#tablaPresa").on("click", "button", async function () {
    Swal.fire({
        title: "Cargando Contenido",
        allowEscapeKey: false,
    allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    //$("#botonesVolumen").hide();
    document.getElementById("divVolumen").scrollIntoView();
    var data = table.row($(this).parents("tr")).data();
    var id = data[0];
    cadena = "id=" + id + "&Accion=PresaVolumen";
    data = [];
    //Se manda a llamar al controlador que me devolvera los Presas
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/mapa.php",
        data: cadena,
        //Si el controlador devuelve una respuesta
        success: function (resp) {
            //$("#infoReporteV").val(resp);
            //Para cada uno de los registros del array
            //Se agrega un registro a la tabla que contiene la informacion de los Presas
            $.each(JSON.parse(resp), function (index, item) {
                document.getElementById("tituloV").innerHTML = "";
                document.getElementById("tituloV").innerHTML =
                    "<h3 class='panel-title'>Presa: " +
                    item.presa_id +
                    " - " +
                    item.nom_oficial +
                    "</h3>";
                data.push([
                    item,
                    item.presa_id + " - " + item.nom_oficial,
                    item.anio,
                    numeral(Number.parseFloat(item.alt_cort)).format("0,0.00"),
                    numeral(Number.parseFloat(item.cap_name)).format("0,0.00"),
                    numeral(Number.parseFloat(item.cap_namo)).format("0,0.00"),
                    numeral(Number.parseFloat(item.vol_alma)).format("0,0.00"),
                ]);
            });
            tableV.destroy();
            tableV = $("#tablaVolumen").DataTable({
                data: data,
                columnDefs: [
                    {className: 'dt-body-right', targets: [3, 4, 5, 6]},
                    {
                        targets: 0,
                        data: null,
                        defaultContent:
                            '<button data-toggle="modal" data-target="#graficaModal" class="btn btn-gob text-ligth  btn-block"><i class="far fa-chart-bar"></i></button>',
                    },
                ],
                dom: "Bfrtip",
                columns: [
                    {
                        title: "Gráfica",
                    },
                    {
                        title: "Presa",
                    },
                    {
                        title: "Año",
                    },
                    {
                        title: "Altura de la cortina (m)",
                    },
                    {
                        title: "Capacidad al NAME (hm³)",
                    },
                    {
                        title: "Capacidad al NAMO (hm³)",
                    },
                    {
                        title: "Vol. de almacenamiento (hm³)",
                    },
                ],
                buttons: [
                    {
                        extend: "excelHtml5",
                        title: "Volumen de presas",
                        className: "btn btn-gob btn-sm",
                        text: "Exportar Excel",
                        exportOptions: {
                            columns: [1, 2, 3, 4, 5, 6],
                        },
                    },
                    {
                        extend: "pdfHtml5",
                        title: "Volumen de presas",
                        className: "btn btn-gob btn-sm",
                        text: "Exportar PDF",
                        messageBottom: citas,
                        orientation: "portrait",
                        pageSize: "A4",
                        exportOptions: {
                            columns: [1, 2, 3, 4, 5, 6],
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
                                            text: "Volumen de presas",
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
                                                {text: page.toString()},
                                                " de ",
                                                {text: pages.toString()},
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
        }
    }).always(function () {
        Swal.close();
    });
});

$("#tablaVolumen").on("click", "button", function () {
    var data = tableV.row($(this).parents("tr")).data();
    graficarPresa(data[0]);
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