/**
 * Se aplica el estilo al select de organismo de cuenca
 */
citas = "";
query = "";

// Se aplica el estilo a los selects
setEstiloSelect('#Estados', 'Estados', 'Buscar Estado');
setEstiloSelect('#Municipios', 'Municipios', 'Buscar Municipio');
setEstiloSelect('#Ciclos', 'Ciclos', 'Buscar Ciclo');
setEstiloSelect('#Cultivos', 'Cultivos', 'Buscar Cultivo');
setEstiloSelect('#Anios', 'Años', 'Buscar Años');


function Anios() {
    limpiarOrganismos();
    $('#Anios').addClass('green');
    $("#Estados").multiselect("reset");
    const query = concatValoresSelect('#Anios', 'anio_id=');
    if (query !== "") {
        const cadena = "query=" + query + "&Accion=getEstados";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/estimacionvolumetrica.php",
            data: cadena,
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    data.push({
                        name: item.nombre,
                        value: item.id_estado,
                        checked: false,
                    });
                });
                $("#Estados").multiselect("loadOptions", data);
            }
        });
    }
}


function Estados() {
    limpiarEstados();
    $("#Municipios").multiselect("reset");
    const query = concatValoresSelect('#Estados', 'estimacion_volumetrica_cultivo.estado_id=');
    if (query !== "") {
        const cadena = "query=" + query + "&Accion=getMunicipios";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/estimacionvolumetrica.php",
            data: cadena,
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    data.push({
                        name: item.nombre,
                        value: item.id_municipio,
                        checked: false,
                    });
                });
                $("#Municipios").multiselect("loadOptions", data);
            }
        });
    }
}

function Municipios() {
    $("#Ciclos").multiselect("reset");
    const query = concatValoresSelect('#Municipios', 'municipio_id=');
    if (query !== "") {
        const cadena = "query=" + query + "&Accion=getCiclos";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/estimacionvolumetrica.php",
            data: cadena,
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    data.push({
                        name: item.nombre,
                        value: item.id_ciclo,
                        checked: false,
                    });
                });
                $("#Ciclos").multiselect("loadOptions", data);
            }
        });
    }
}


async function Ciclos() {
    $("#Cultivos").multiselect("reset");
    const query = concatValoresSelect('#Ciclos', 'ciclo_id=');
    if (query !== "") {
        const cadena = "query=" + query + "&Accion=getCultivos";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/estimacionvolumetrica.php",
            data: cadena,
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    data.push({
                        name: item.nombre,
                        value: item.id_cultivo,
                        checked: false,
                    });
                });
                $("#Cultivos").multiselect("loadOptions", data);
            }
        });
    }
}


async function Cultivos() {
    isFormCompleted('#Cultivos');
}


//Prepara el query para mostrar las estaciones climatologicas tomando en cuenta los valores de los selects anteriores
function concatQuery() {
    var query = "(";
    query = query + concatValoresSelect('#Anios', 'anio_id=');
    query = query + ") AND (";
    query = query + concatValoresSelect('#Estados', 'estimacion_volumetrica_cultivo.estado_id=');
    query = query + ") AND (";
    query = query + concatValoresSelect('#Municipios', 'municipio_id=');
    query = query + ") AND (";
    query = query + concatValoresSelect('#Ciclos', 'ciclo_id=');
    query = query + ") AND (";
    query = query + concatValoresSelect('#Cultivos', 'cultivo_id=');
    query = query + ")";
    return query;
}

async function Consultar() {
    Swal.fire({
        title: "Por favor espere",
        html: "Realizando la consulta",
        allowEscapeKey: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    $('#nav-tab-acu a[href="#nav-01"]').tab("show");
    await deshabilitar();
    const cultivos = concatValoresSelect('#Cultivos', 'cultivo_id=');
    if (cultivos !== "") {
        data = "Accion=ConsultaAcuifero&modulo_id=12";
        citas = construirReferencias(data, false);
        query = concatQuery();
        var query2 = query + " GROUP by anio"
        var cadena = "query=" + query2 + "&Accion=getConsulta";

        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/estimacionvolumetrica.php",
            data: cadena,
            /**
             *
             * @param {type} resp2
             * @returns {undefined}
             * Si el controlador devuelve una respuesta
             */
            success: async function (resp2) {
                document.getElementById("pantalla").innerHTML = "";
                $("#pantalla").append(
                    '<div class="row">' +
                    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Informe estadístico histórico de producción agrícola</h3></div>' +
                    //Titulo1
                    '<div class="col-sm-12">' +
                    "<h5>Superficie sembrada (ha)</h5>" +
                    '<hr class="red">' +
                    "</div>" +
                    //Grafica1
                    '<div class="col-sm-8">' +
                    '<canvas id="grafica1"></canvas>' +
                    "</div>" +
                    //Tabla1
                    '<div class="col-sm-4">' +
                    '<div style="overflow-x:auto;">' +
                    '<table id="tabla1"  class="table table-bordered  nowrap"  width="100%"></table>' +
                    "</div>" +
                    "</div>" +
                    //Titulo2
                    '<div class="col-sm-12">' +
                    "<h5>Volumen Neto (miles m<sup>3</sup>)</h5>" +
                    '<hr class="red">' +
                    "</div>" +
                    //Grafica2
                    '<div class="col-sm-8">' +
                    '<canvas id="grafica2"></canvas>' +
                    "</div>" +
                    //Tabla2
                    '<div class="col-sm-4" style="overflow-x:auto;">' +
                    '<table id="tabla2" class="table table-bordered  nowrap"  width="100%"></table>' +
                    "</div></div>"
                );
                var etiquetas = [];
                var sup_sem = [];
                var vol_net = [];
                var t1 = [];
                var t2 = [];

                $.each(JSON.parse(resp2), function (index, item) {
                    etiquetas.push(item.anio);
                    sup_sem.push(Math.round(item.SEM));
                    t1.push([
                        item.anio,
                        numeral(Math.round(item.SEM)).format("0,0"),
                    ]);
                    vol_net.push(parseFloat(item.VOL_NET).toFixed(2));
                    t2.push([
                        item.anio,
                        numeral(parseFloat(item.VOL_NET).toFixed(2)).format("0,0.00"),
                    ]);
                });
                var element = "grafica1";
                new Chart(document.getElementById(element), {
                    type: "line",
                    data: {
                        labels: etiquetas,
                        datasets: [
                            {
                                data: sup_sem,
                                borderColor: "#F8B12C",
                                fill: false,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            yAxes: [
                                {
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Superficie Sembrada (ha)",
                                    },
                                    ticks: {
                                        min: 0,
                                    },
                                },
                            ],
                            xAxes: [
                                {
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Año",
                                    },
                                },
                            ],
                        },
                        title: {
                            display: false,
                        },
                        legend: {
                            display: false,
                        },
                    },
                });

                var element = "grafica2";
                new Chart(document.getElementById(element), {
                    type: "line",
                    data: {
                        labels: etiquetas,
                        datasets: [
                            {
                                data: vol_net,
                                borderColor: "#7B2556",
                                fill: false,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            yAxes: [
                                {
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Volumen Neto (miles m3)",
                                    },
                                    ticks: {
                                        min: 0,
                                    },
                                },
                            ],
                            xAxes: [
                                {
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Año",
                                    },
                                },
                            ],
                        },
                        title: {
                            display: false,
                        },
                        legend: {
                            display: false,
                        },
                    },
                });
                //Tablas
                var tabla1 = $("#tabla1").DataTable({
                    columns: [
                        {
                            title: "Año",
                        },
                        {
                            title: "Superficie sembrada (ha)",
                        },
                    ],
                    data: t1,
                    ordering: true,
                    paging: false,
                    searching: false,
                    scrollY: "450px",
                    columnDefs: [{ className: 'dt-body-right', targets: [1] }],
                    language: {
                        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
                    },
                    dom: "Bfrtip",
                    /**
                     * Se colocan el boton para exportar la tabla en excel
                     */
                    buttons: [
                        {
                            extend: "excelHtml5",
                            title: "Superficie sembrada y cosechada por año agrícola (ha)",
                            className: "btn btn-gob btn-sm",
                            text: "Exportar Excel",
                        },
                    ],
                });
                var tabla2 = $("#tabla2").DataTable({
                    columns: [
                        {
                            title: "Año",
                        },
                        {
                            title: "Volumen Neto (miles m<sup>3</sup>)",
                        },
                    ],
                    data: t2,
                    ordering: true,
                    searching: false,
                    paging: false,
                    scrollY: "450px",
                    columnDefs: [{ className: 'dt-body-right', targets: [1] }],
                    language: {
                        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
                    },
                    dom: "Bfrtip",
                    /**
                     * Se colocan el boton para exportar la tabla en excel
                     */
                    buttons: [
                        {
                            extend: "excelHtml5",
                            title: "Producción por año agrícola (miles ton)",
                            className: "btn btn-gob btn-sm",
                            text: "Exportar Excel",
                        },
                    ],
                });
            },
        }).always(async function () {
            await habilitar();
            $("#botonMapa").hide();
            $("#divPrioridad").hide();
            await sleep(1000);
            await Swal.close();
        });
    } else {
        swal(
            "Algo está mal.",
            "Todos los filtros tienen que tener al menos un elemento seleccionado"
        );
        await habilitar();
        $("#pantalla").hide();
        $("#divPrioridad").hide();
        $("#botonMapa").hide();
        $("#referencias").hide();
        await Swal.close();
    }
}


/**
 *
 * @returns {undefined}
 *  Funcion que limpia la capa de organimos asi como de las capas que dependen directamente de ellas
 *
 */
async function limpiarOrganismos() {
    $("#Estados").multiselect("reset");
    limpiarEstados();
}

/**
 *
 * @returns {undefined}
 * Funcion para limpiar la capa de estados
 *
 */
async function limpiarEstados() {
    $("#Municipios").multiselect("reset");
    $("#Ciclos").multiselect("reset");
}



/**
 *
 * @returns {Promise<string>}
 * Funcion que concatena la cadena de los Distritos seleccionadoss
 *
 */
async function concatOrganismo() {
    var query = "";
    $("#Organismos option:selected").each(function () {
        query += "organismo_id=" + $(this).val() + " or ";
    });
    query = query.slice(0, -3);
    return query;
}

/**
 * Funcion que concatena los estados seleccionados del select
 * @returns {Promise<string>}
 */
async function concatEstado() {
    /*prueba prueba prueba */

    var query = "";
    query = "(";

    /**
     * Se tiene que recorrer el select de organismos de cuenca para encontrar todos los elementos seleccionados.
     */
    $("#Estados option:selected").each(function () {
        query += "estado_id=" + $(this).val() + " or ";
    });
    /**
     * Al final el query quedara con un or al final, la siguiente línea quita ese or sobrante.
     * @type {string}
     */
    query = query.slice(0, -3);
    query = query + ");";
    return query;
}


/**
 *
 * @param query
 * @returns {Promise<void>}
 * Esta funcion muestra el desglose por Organismo de Cuenca
 */
async function desgloce1(query) {
    var Anio = $("#Anios :selected").text();
    /**
     *
     * @type String
     * Se crea una variable que se guarda el query y la accion que va a realizar el controlador
     */
    var query2 = query + " GROUP by estado"
    var cadena = "query=" + query2 + "&Accion=getConsulta";
    /**
     * Se limpian todas las secciones del html en caso de que exista contenido
     */
    document.getElementById("nav-01").innerHTML = "";
    document.getElementById("nav-02").innerHTML = "";
    document.getElementById("nav-03").innerHTML = "";
    /**
     * Se coloca el encabezado
     */
    $("#nav-01").append(
        '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Concentrado estatal de la estimación volumétrica por coeficientes de cultivo: ' + Anio + '</h3></div>'
    );
    /**
     * Funcion de ajax que se encarga de obtener la informacion
     *
     */
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/estimacionvolumetrica.php",
        data: cadena,
        /**
         *
         * @param {type} resp2
         * @returns {undefined}
         * Si el controlador devuelve una respuesta
         *
         */
        success: async function (resp) {
            /**
             *
             * @type Array
             * Se crean las variables que se encargar de guardar los datos extraidos de la consulta.
             *
             */
            var data = [];
            var SEM = 0;
            var VOL_NET = 0;
            /**
             * Se itera sobre cala elemento devuelto por el controlador
             */
            $.each(JSON.parse(resp), function (index, item) {
                /**
                 * Se colocan los datos al array
                 */
                data.push([
                    item.Estado,
                    numeral(Math.round(item.SEM)).format("0,0"),
                    numeral(Math.round(item.VOL_NET)).format("0,0"),
                ]);
                /**
                 * Se suma el acumulado para sacar el total
                 */
                SEM += parseFloat(item.SEM);
                VOL_NET += parseFloat(item.VOL_NET);
            });
            /**
             * Si existen datos en la tabla
             * Se crea una seccion de los datos
             */
            if (data.length > 0) {
                /**
                 * Se inserta la seccion al html
                 */
                $("#nav-01").append(
                    '<div style="overflow-x:auto;">' +
                    '<table id="T1" class="table table-bordered nowrap" style="width:100%">' +
                    "<tfoot><tr>" +
                    /**
                     * Se colocan los totales antes obtenidos
                     */
                    '<td style="background-color:#CCD1D1" align="center"><b>Suma Total:</b></th>' +
                    '<td style="background-color:#CCD1D1" align="right"><b>' +
                    numeral(Math.round(SEM)).format("0,0") +
                    "</b></td>" +
                    '<td style="background-color:#CCD1D1" align="right"><b>' +
                    numeral(Math.round(VOL_NET)).format("0,0") +
                    "</b></td>" +
                    "</tr></tfoot></table>" +
                    '</div>'
                );
                /**
                 *
                 * Se inicializa la tabla con datatables
                 *
                 */
                $("#T1").DataTable({
                    /*
                     *
                     * Se crean las columnas que van a ir en la tabla
                     *
                     */
                    columns: [
                        {
                            title: "Entidad federativa",
                        },
                        {
                            title: "Superficie sembrada (ha)",
                        },
                        {
                            title: "Volumen Neto (miles m<sup>3</sup>)",
                        },
                    ],
                    columnDefs: [
                        { className: 'dt-body-right', targets: [1, 2] },
                    ],
                    /**
                     * Se colocan los datos obenidos
                     */
                    data: data,
                    searching: false,
                    paging: false,
                    ordering: false,
                    /**
                     * Se colocan parametros para el comportamiento de la tabla
                     */
                    language: {
                        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
                    },
                    dom: "Bfrtip",
                    /**
                     * Se colocan el boton para exportar la tabla en excel
                     */
                    buttons: [
                        {
                            extend: "excelHtml5",
                            title:
                                "Concentrado estatal de la estimación volumétrica por coeficientes de cultivo",
                            className: "btn btn-gob btn-sm",
                            text: "Exportar Excel",
                        },
                        {
                            extend: "pdfHtml5",
                            title:
                                "Concentrado estatal de la estimación volumétrica por coeficientes de cultivo",
                            className: "btn btn-gob btn-sm",
                            text: "Exportar PDF",
                            messageBottom: citas,
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
                                                text:
                                                    "Concentrado estatal de la estimación volumétrica por coeficientes de cultivo",
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
                });
            } //Fin del if
        },
    }); //Fin del ajax de la obtencion de los datos
}