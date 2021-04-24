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
        // TODO: HABILITAR LA CITA DE ESTA INFORMACION
        query = concatQuery();
        await desgloce1(query);
        //Verifica si el mapa es prioridad
        var x = $('#Prioridad').prop('checked');
        if (x == false) {
            //Recargamos el mapa
            var callBack = async function () {
                document.getElementById("map").style.display = "block";
                setTimeout(function () {
                    map.invalidateSize();
                }, 100);
            };
            map.whenReady(callBack);
            await loadShape2();
        }
        await habilitar();

        await Swal.close();
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
                    '<div style="ocflow-x:auto;">' +
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

/**
 *
 * @returns {undefined}
 * Fyuncion que muestra el desgloce 3
 */
async function desgloce2() {
    var Anio = $("#Anios :selected").text();
    if (!$("#nav-02").html()) {
        Swal.fire({
            title: "Por favor espere", // add html attribute if you want or remove
            html: "Cargando contenido",
            allowEscapeKey: false,
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });
        /*
        *
        * @type String
        * * Variable para enviar la sentancia al controlador
        * *
        * */
        var query2 = query + " GROUP by estado,municipio"
        var cadena = "query=" + query2 + "&Accion=getConsulta";
        /*
         * Se limpia el HTML y se coloca el encabezado
         */
        document.getElementById("nav-02").innerHTML = "";
        $("#nav-02").append(
            '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Concentrado municipal de la estimación volumétrica por coeficientes de cultivo, año agrícola: ' + Anio + '</h3></div>'
        );
        /*
         *
         * @type type
         * Variable para guardar las tablas
         *
         */
        var tablas = {};
        /*
         * Ajax para obtener la consulta de los datos
         */
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/estimacionvolumetrica.php",
            data: cadena,
            /*
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
                 * Las variables para almacenar los datos
                 */
                var data = [];
                var SEM = 0;
                var VOL_NET = 0;
                /*
                 * Para cada elemento de la consulta
                 */
                $.each(JSON.parse(resp), function (index, item) {
                    /*
                     * Se colocan los daros en el array
                     */
                    data.push([
                        item.Estado,
                        item.Municipio,
                        numeral(Math.round(item.SEM)).format("0,0"),
                        numeral(Math.round(item.VOL_NET)).format("0,0"),
                    ]);
                    /*
                     * Se colocan los acumulados
                     */
                    SEM += parseFloat(item.SEM);
                    VOL_NET += parseFloat(item.VOL_NET);
                });
                /*
                 *
                 * @type String
                 * Se crea la variable de la tabla
                 */
                var tabla = "#T2";
                /*
                 * Si existen los datos en el array
                 */
                if (data.length > 0) {
                    $("#nav-02").append(
                        /*
                         * Se coloca el encabezado del anio
                         */
                        '<div class="panel-body">' +
                        /*
                         * Se coloca la tabla
                         */
                        '<div style="overflow-x:auto;">' +
                        '<table id="T2" class="table table-bordered  nowrap"  width="100%">' +
                        "<tfoot><tr>" +
                        /*
                         * Se coloca el footer con los totales
                         */
                        '<td style="background-color:#CCD1D1" colspan="2" align="center"><b>Suma Total</b></th>' +
                        '<td style="background-color:#CCD1D1" align="right"><b>' +
                        numeral(Math.round(SEM)).format("0,0") +
                        "</b></td>" +
                        '<td style="background-color:#CCD1D1" align="right"><b>' +
                        numeral(Math.round(VOL_NET)).format("0,0") +
                        "</b></td>" +
                        "</tr></tfoot></table>" +
                        "</div>" +
                        "</div>"
                    );
                    /*
                     * Se crea la instancia de datatables
                     */
                    tabla3 = $(tabla).DataTable({
                        /*
                         * Se crean las columnas a mostrar
                         */
                        columns: [
                            {
                                title: "Entidad federativa",
                            },
                            {
                                title: "Municpio",
                            },
                            {
                                title: "Superficie sembrada (ha)",
                            },
                            {
                                title: "Volumen Neto (miles m<sup>3</sup>)",
                            },
                        ],
                        /*
                         * Se colocan los datos
                         */
                        data: data,
                        /**
                         * Se colocan los datos obenidos
                         */
                        data: data,
                        searching: false,
                        ordering: false,
                        /*
                         * Funcion para obtener los sibtotales
                         */
                        rowGroup: {
                            dataSrc: [0],
                            startRender: function (rows, group) {
                                /*
                                 *
                                 * @type type
                                 * Se obtiene el subtotal de la superficie sembrada
                                 */
                                var ss = rows
                                    .data()
                                    .pluck(2)
                                    .reduce(function (a, b) {
                                        return (
                                            parseFloat(numeral(a.toString()).value()) +
                                            parseFloat(numeral(b.toString()).value()) * 1
                                        );
                                    }, 0);
                                /**
                                 *
                                 * @type type
                                 * Funcion para obtener el subtotal de la superficie cosechada
                                 */
                                var vn = rows
                                    .data()
                                    .pluck(3)
                                    .reduce(function (a, b) {
                                        return (
                                            parseFloat(numeral(a.toString()).value()) +
                                            parseFloat(numeral(b.toString()).value()) * 1
                                        );
                                    }, 0)
                                return $("<tr/>").append(
                                    '<td style="background-color:#A9DFBF" colspan="1"><b>' +
                                    group +
                                    "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' +
                                    numeral(Math.round(ss)).format("0,0") +
                                    "</b></td>" +
                                    '<td style="background-color:#A9DFBF"  align="right" ><b>' +
                                    numeral(Math.round(vn)).format("0,0") +
                                    "</b></td>"
                                );
                            },
                        },
                        columnDefs: [
                            { targets: [0], visible: false },
                            {
                                className: 'dt-body-right',
                                targets: [2, 3],
                            },
                        ],
                        language: {
                            url:
                                "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
                        },
                        paging: false,
                        dom: "Bfrtip",
                        /*
                         * Creacion del boton de exportar en excel
                         */
                        buttons: [
                            {
                                extend: "excelHtml5",
                                title:
                                    "Concentrado municipal de la estimación volumétrica por coeficientes de cultivo",
                                className: "btn btn-gob btn-sm",
                                text: "Exportar Excel",
                            },
                            {
                                extend: "pdfHtml5",
                                title:
                                    "Concentrado municipal de la estimación volumétrica por coeficientes de cultivo",
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
                                                        "Concentrado municipal de la estimación volumétrica por coeficientes de cultivo",
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

                    }); //Fin del datatables
                }
            },
        }).always(function () {
            Swal.close();
        }); //Fin del AJAX de la obtecion de los datos
    }
}


/**
 *
 * @param {type} query
 * @returns {undefined}
 * Funcion Desgloce por cultivo y Cultivo
 */
async function desgloce3() {
    var Anio = $("#Anios :selected").text();
    if (!$("#nav-03").html()) {
        Swal.fire({
            title: "Por favor espere", // add html attribute if you want or remove
            html: "Cargando contenido",
            allowEscapeKey: false,
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });
        var query2 = query + " GROUP by estado,municipio,ciclo,cultivo"
        var cadena = "query=" + query2 + "&Accion=getConsulta";
        /*
         * Se limpia el html y se coloca el encabezado
         */
        document.getElementById("nav-03").innerHTML = "";
        $("#nav-03").append(
            '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Concentrado por cultivo de la estimación volumétrica por coeficientes de cultivo, año agrícola: ' + Anio + '</h3></div>'
        );
        /*
         *
         * @type type
         * Array donde se guardan las
         */
        var tablas = {};
        /*
         * Ajax para obtener los datos
         */
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/estimacionvolumetrica.php",
            data: cadena,
            /*
             *
             * @param {type} resp2
             * @returns {undefined}
             * Si el controlador devuelve una respuesta
             *
             */
            success: function (resp2) {
                /*
                 * Se itera sobre los anios seleccionados
                 */
                $("#Anios option:selected").each(async function () {
                    var anio = $(this).val();
                    cadena = "id=" + anio + "&Accion=Anio";
                    /*
                     * Ajax para obtener los valores del anio
                     */
                    $.ajax({
                        type: "POST",
                        url: "/aplicacion/controlador/mapa.php",
                        data: cadena,
                        /*
                         *
                         * @param {type} resp
                         * @returns {undefined}
                         * Si el controlador devuelve una respuesta
                         */
                        success: function (resp) {
                            /*
                             * Se coloca la seccion del anio seleccionado
                             */
                            $("#nav-03").append(
                                '<div class="panel-body" id="body3-' + anio + '">' + "</div>"
                            );
                            /*
                             * Se itera sobre los Cultivo seleccionados
                             */
                            $("#Cultivos option:selected").each(async function () {
                                var Cultivo = $(this).val();
                                cadena = "id=" + Cultivo + "&Accion=Cultivo";
                                /*
                                 * Ajax para obtener el nombre del distrito de riego
                                 */
                                $.ajax({
                                    type: "POST",
                                    url: "/aplicacion/controlador/mapa.php",
                                    data: cadena,
                                    /*
                                     *
                                     * @param {type} respCultivo
                                     * @returns {undefined}
                                     * Si se tiene una respiesta
                                     */
                                    success: async function (respC) {
                                        /*
                                         *
                                         * @type String
                                         * Se crea una variable para colocar el nombre del distrito de riego
                                         */
                                        var CUL = JSON.parse(respC);
                                        /*
                                         *
                                         * @type Array
                                         * Se crean las variables para colocar los datos obtenidos
                                         *
                                         */
                                        var data = [];
                                        var SEM = 0;
                                        var VOL_NET = 0;
                                        /*
                                         * Para cada elemento de la consulta
                                         */
                                        $.each(JSON.parse(resp2), function (index, item) {
                                            /*
                                             * Si el anio y el distrito de riego coinciden
                                             */
                                            if (
                                                item.id_anio === anio &&
                                                Cultivo === item.id_cultivo
                                            ) {
                                                /*
                                                 * Se colocan los datos en el array
                                                 */
                                                data.push([
                                                    item.Estado,
                                                    item.Municipio,
                                                    item.Ciclo,
                                                    numeral(Math.round(item.SEM)).format("0,0"),
                                                    numeral(Math.round(item.VOL_NET)).format("0,0"),
                                                ]);
                                                /*
                                                 * Se suman los acumulados
                                                 */
                                                SEM += parseFloat(item.SEM);
                                                VOL_NET += parseFloat(item.VOL_NET);
                                            }
                                        });
                                        /*
                                         *
                                         * @type String
                                         * Se crea la variable para la tabla creada
                                         */
                                        var tabla = "#T3-" + anio + "-" + Cultivo;
                                        /*
                                         * Si el array tiene elementos
                                         */
                                        if (data.length > 0) {
                                            $("#body3-" + anio + "").append(
                                                '<div style="background-color: #621132" class="btn-gob col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h4>' +
                                                CUL + ', año agrícola: ' + Anio +
                                                "</h4></div>" +
                                                /*
                                                 * Se crea la tabla
                                                 */
                                                '<div style="overflow-x:auto;">' +
                                                '<table id="T3-' +
                                                anio +
                                                "-" +
                                                Cultivo +
                                                '" class="table table-bordered nowrap"  width="100%">' +
                                                "<tfoot><tr>" +
                                                /*
                                                 * Se colocan los totales en el pie de la tabla
                                                 */
                                                '<td style="background-color:#52BE80" colspan="3" align="center"><b>Total general</b></th>' +
                                                '<td style="background-color:#52BE80" align="right"><b>' +
                                                numeral(Math.round(SEM)).format("0,0.00") +
                                                "</b></td>" +
                                                '<td style="background-color:#52BE80" align="right"><b>' +
                                                numeral(Math.round(VOL_NET)).format("0,0.00") +
                                                "</b></td>" +
                                                "</tr></tfoot></table>" +
                                                '</div>'
                                            );
                                            /*
                                             * Se inicializa en datables
                                             */
                                            tabla4 = $(tabla).DataTable({
                                                /*
                                                 * Se crean las columnas
                                                 */
                                                columns: [
                                                    {
                                                        title: "Estado",
                                                    },
                                                    {
                                                        title: "Municipio",
                                                    },
                                                    {
                                                        title: "Ciclo",
                                                    },
                                                    {
                                                        title: "Superficie sembrada (ha)",
                                                    },
                                                    {
                                                        title: "Volumen Neto (miles m<sup>3</sup>)",
                                                    },
                                                ],
                                                /*
                                                 * Se colocan los datos de la tabla
                                                 */
                                                data: data,
                                                /*
                                                 * Parametros del comportamiento de la tabla
                                                 */
                                                order: [0, "asc"],
                                                ordering: false,
                                                searching: false,
                                                /*
                                                 * Funcion para obtener los sibtotales
                                                 */
                                                rowGroup: {
                                                    dataSrc: [0],
                                                    startRender: function (rows, group) {
                                                        /*
                                                         *
                                                         * @type type
                                                         * Se obtiene el subtotal de la superficie sembrada
                                                         */
                                                        var ss = rows
                                                            .data()
                                                            .pluck(3)
                                                            .reduce(function (a, b) {
                                                                return (
                                                                    parseFloat(numeral(a.toString()).value()) +
                                                                    parseFloat(numeral(b.toString()).value()) * 1
                                                                );
                                                            }, 0);
                                                        /**
                                                         *
                                                         * @type type
                                                         * Funcion para obtener el subtotal de la superficie cosechada
                                                         */
                                                        var vn = rows
                                                            .data()
                                                            .pluck(4)
                                                            .reduce(function (a, b) {
                                                                return (
                                                                    parseFloat(numeral(a.toString()).value()) +
                                                                    parseFloat(numeral(b.toString()).value()) * 1
                                                                );
                                                            }, 0);
                                                        /*
                                                         * Se retorna los subtotales
                                                         */
                                                        return $("<tr/>").append(
                                                            '<td style="background-color:#A9DFBF" colspan="2"><b>' +
                                                            group +
                                                            "</b></td>" +
                                                            '<td style="background-color:#A9DFBF" align="right" ><b>' +
                                                            numeral(Math.round(ss)).format("0,0") +
                                                            "</b></td>" +
                                                            '<td style="background-color:#A9DFBF"  align="right" ><b>' +
                                                            numeral(Math.round(vn)).format("0,0") +
                                                            "</b></td>"
                                                        );
                                                    },
                                                },
                                                columnDefs: [
                                                    { targets: [0], visible: false },
                                                    {
                                                        className: 'dt-body-right',
                                                        targets: [3, 4],
                                                    },
                                                ],
                                                language: {
                                                    url:
                                                        "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
                                                },
                                                paging: false,
                                                dom: "Bfrtip",
                                                /*
                                                 * Creacion del boton de exportar en excel
                                                 */
                                                buttons: [
                                                    {
                                                        extend: "excelHtml5",
                                                        title:
                                                            "Concentrado por cultivo de la estimación volumétrica por coeficientes de  " +
                                                            CUL +
                                                            " Año agrícola : " +
                                                            (parseInt(JSON.parse(resp)) - 1) +
                                                            " - " +
                                                            JSON.parse(resp),
                                                        className: "btn btn-gob btn-sm",
                                                        text: "Exportar Excel",
                                                    },
                                                    {
                                                        extend: "pdfHtml5",
                                                        title:
                                                            "Concentrado por cultivo de la estimación volumétrica por coeficientes de  " +
                                                            CUL +
                                                            " Año agrícola : " +
                                                            (parseInt(JSON.parse(resp)) - 1) +
                                                            " - " +
                                                            JSON.parse(resp),
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
                                                                                "Concentrado por cultivo de la estimación volumétrica por coeficientes de  " +
                                                                                CUL +
                                                                                " Año agrícola : " +
                                                                                (parseInt(JSON.parse(resp)) - 1) +
                                                                                " - " +
                                                                                JSON.parse(resp),
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
                                            }); //Fin del datables
                                        }
                                    },
                                }); //Fin AJAX Cultivo
                            }); //Fin de la iteracion Cultivo
                        },
                    }); //Fin AJAX Anio
                }); //Fin iteracion de anio
            },
        }).always(function () {
            Swal.close();
        }); //Fin AJAX para obtener la consulta
    }
} //Fin de la funcion del desgloce 4


