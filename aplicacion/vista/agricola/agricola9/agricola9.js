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

        const query = concatQuery();
        const cadena = "query=" + query + "&Accion=getConsulta";
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/estimacionvolumetrica.php",
            data: cadena,
            success: function (resp) {
                alert("Aqui ya esta la informacion: agricola9.js linea 161")
                alert(resp);
            }
        });


        // await desgloce1(query);

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
    var query2 = query + " GROUP by id_organismo"
    var cadena = "query=" + query2 + "&Accion=DTTTabla";
    /**
     * Se limpian todas las secciones del html en caso de que exista contenido
     */
    document.getElementById("nav-01").innerHTML = "";
    document.getElementById("nav-02").innerHTML = "";
    document.getElementById("nav-03").innerHTML = "";
    document.getElementById("nav-04").innerHTML = "";
    document.getElementById("nav-05").innerHTML = "";
    document.getElementById("nav-06").innerHTML = "";
    /**
     * Se coloca el encabezado
     */
    $("#nav-01").append(
        '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Concentrado agrícola por organismo de cuenca: año agrícola: ' + Anio + '</h3></div>'
    );
    /**
     * Funcion de ajax que se encarga de obtener la informacion
     *
     */
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/agricola.php",
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
            var COS = 0;
            var PROD = 0;
            var VAL = 0;
            var REND = 0;
            var PMR = 0;
            var id = "";
            /**
             * Se itera sobre cala elemento devuelto por el controlador
             */
            $.each(JSON.parse(resp), function (index, item) {
                /**
                 * Se colocan los datos al array
                 */
                data.push([
                    item.numero + ". " + item.OC,
                    numeral(Math.round(item.SEM)).format("0,0"),
                    numeral(Math.round(item.COS)).format("0,0"),
                    numeral(item.PROD).format("0,0.00"),
                    numeral(item.VAL).format("0,0.00"),
                    numeral(item.REND).format("0,0.00"),
                    numeral(Math.round(item.PMR)).format("0,0.00"),
                ]);
                /**
                 * Se suma el acumulado para sacar el total
                 */
                SEM += parseFloat(item.SEM);
                COS += parseFloat(item.COS);
                PROD += parseFloat(item.PROD);
                VAL += parseFloat(item.VAL);
                REND += parseFloat(item.REND);
                PMR += parseFloat(item.PMR);
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
                    numeral(Math.round(COS)).format("0,0") +
                    "</b></td>" +
                    '<td style="background-color:#CCD1D1" align="right"><b>' +
                    numeral(PROD).format("0,0.00") +
                    "</b></td>" +
                    '<td style="background-color:#CCD1D1" align="right"><b>' +
                    numeral(VAL).format("0,0.00") +
                    "</b></td>" +
                    '<td style="background-color:#CCD1D1" align="right" ><b>' +
                    numeral(parseFloat(PROD / COS).toFixed(2)).format("0,0.00") +
                    "</b></td>" +
                    '<td style="background-color:#CCD1D1" align="right"><b>' +
                    numeral(Math.round(VAL / PROD)).format("0,0.00") +
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
                            title: "Organismo de Cuenca",
                        },
                        {
                            title: "Superficie sembrada (ha)",
                        },
                        {
                            title: "Superficie cosechada (ha)",
                        },
                        {
                            title: "Producción (ton)",
                        },
                        {
                            title: "Valor de la cosecha (miles $)",
                        },
                        {
                            title: "Rend. (ton/ha)",
                        },
                        {
                            title: "P.M.R ($/ton)",
                        },
                    ],
                    columnDefs: [
                        { className: 'dt-body-right', targets: [1, 2, 3, 4, 5, 6] },
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
                                "Concentrado agrícola por organismo de cuenca",
                            className: "btn btn-gob btn-sm",
                            text: "Exportar Excel",
                        },
                        {
                            extend: "pdfHtml5",
                            title:
                                "Concentrado agrícola por organismo de cuenca",
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
                                                    "Concentrado agrícola por organismo de cuenca",
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
        var query2 = query + " GROUP by id_estado"
        var cadena = "query=" + query2 + "&Accion=DTTTabla";
        /*
         * Se limpia el HTML y se coloca el encabezado
         */
        document.getElementById("nav-02").innerHTML = "";
        $("#nav-02").append(
            '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Concentrado agrícola por entidad federativa, año agrícola: ' + Anio + '</h3></div>'
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
            url: "/aplicacion/controlador/agricola.php",
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
                var COS = 0;
                var PROD = 0;
                var VAL = 0;
                var REND = 0;
                var PMR = 0;
                /*
                 * Para cada elemento de la consulta
                 */
                $.each(JSON.parse(resp), function (index, item) {
                    /**
                     * si el anio del elementoactual es el mismo que el seleccionado
                     */

                    var id = "";
                    /*
                     * Se concatenan los ceros a el id del estado
                     */
                    if (item.id_estado < 10) {
                        id = "00" + item.id_estado;
                    } else {
                        id = "0" + item.id_estado;
                    }
                    /*
                     * Se colocan los daros en el array
                     */
                    data.push([
                        id + ". " + item.estado,
                        numeral(Math.round(item.SEM)).format("0,0"),
                        numeral(Math.round(item.COS)).format("0,0"),
                        numeral(item.PROD).format("0,0.00"),
                        numeral(item.VAL).format("0,0.00"),
                        numeral(item.REND).format("0,0.00"),
                        numeral(Math.round(item.PMR)).format("0,0.00"),
                    ]);
                    /*
                     * Se colocan los acumulados
                     */
                    SEM += parseFloat(item.SEM);
                    COS += parseFloat(item.COS);
                    PROD += parseFloat(item.PROD);
                    VAL += parseFloat(item.VAL);
                    REND += parseFloat(item.REND);
                    PMR += parseFloat(item.PMR);
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
                        '<td style="background-color:#CCD1D1" align="center"><b>Suma Total</b></th>' +
                        '<td style="background-color:#CCD1D1" align="right"><b>' +
                        numeral(Math.round(SEM)).format("0,0") +
                        "</b></td>" +
                        '<td style="background-color:#CCD1D1" align="right"><b>' +
                        numeral(Math.round(COS)).format("0,0") +
                        "</b></td>" +
                        '<td style="background-color:#CCD1D1" align="right"><b>' +
                        numeral(PROD).format("0,0.00") +
                        "</b></td>" +
                        '<td style="background-color:#CCD1D1" align="right"><b>' +
                        numeral(VAL).format("0,0.00") +
                        "</b></td>" +
                        '<td style="background-color:#CCD1D1" align="right" ><b>' +
                        numeral(parseFloat(PROD / COS).toFixed(2)).format("0,0.00") +
                        "</b></td>" +
                        '<td style="background-color:#CCD1D1" align="right"><b>' +
                        numeral(Math.round(VAL / PROD)).format("0,0.00") +
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
                                title: "Superficie sembrada (ha)",
                            },
                            {
                                title: "Superficie cosechada (ha)",
                            },
                            {
                                title: "Producción (ton)",
                            },
                            {
                                title: "Valor de la cosecha (miles $)",
                            },
                            {
                                title: "Rend. (ton/ha)",
                            },
                            {
                                title: "P.M.R ($/ton)",
                            },
                        ],
                        /*
                         * Se colocan los datos
                         */
                        data: data,
                        /*
                         * Parametros del comportamiento de la tabla
                         */

                        columnDefs: [
                            { className: 'dt-body-right', targets: [1, 2, 3, 4, 5, 6] },
                        ],
                        searching: false,
                        paging: false,
                        ordering: false,
                        language: {
                            url:
                                "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
                        },
                        dom: "Bfrtip",
                        /*
                         * Creacion del boton para eexportar a excel
                         */
                        buttons: [
                            {
                                extend: "excelHtml5",
                                title:
                                    "Concentrado agrícola por entidad federativa",
                                className: "btn btn-gob btn-sm",
                                text: "Exportar Excel",
                            },
                            {
                                extend: "pdfHtml5",
                                title:
                                    "Concentrado agrícola por entidad federativa",
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
                                                        "Concentrado agrícola por entidad federativa",
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
 * @returns {undefined}
 * Funcion para mostrar el desgloce 2
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
        /*
         *
         * @type String
         * * Variable para enviar la sentancia al controlador
         * *
         * */
        var query2 = query + " GROUP by dtt_id"
        var cadena = "query=" + query2 + "&Accion=DTTTabla";
        /**
         * Se limpia el html y se coloca el encabezados
         */
        document.getElementById("nav-03").innerHTML = "";
        $("#nav-03").append(
            '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Concentrado agrícola por distrito de temporal tecnificado (organismo de cuenca),año agrícola: ' + Anio + '</h3></div>'
        );
        /**
         *
         * @type type
         * Variable de las tablas
         */
        var tablas = {};
        /**
         * Ajax que oobtiene los datos a mostrar en el desgloce 2
         */
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/agricola.php",
            data: cadena,
            /**
             *
             * @param {type} resp2
             * @returns {undefined}
             * Si el controlador devuelve una respuesta
             *
             */
            success: function (resp2) {
                /*
                 * Se coloca la seccion respectiva al anio seleccionado
                 */
                $("#nav-03").append(
                    '<div class="panel-body" id="body">' + "</div>"
                );
                /*
                 * Se itera sobre los organismos de cuenca seleccionados
                 */
                $("#Organismos option:selected").each(async function () {
                    var rha = $(this).val();
                    cadena = "id=" + rha + "&Accion=rha";
                    /**
                     * Por medio de ajax se obtiene el nombre del OC
                     */
                    $.ajax({
                        type: "POST",
                        url: "/aplicacion/controlador/mapa.php",
                        data: cadena,
                        /*
                         *
                         * @param {type} respOC
                         * @returns {undefined}
                         * Si el controlador devuelve una respuesta
                         *
                         */
                        success: async function (respOC) {
                            /**
                             *
                             * @type String
                             * Se obtiene el nombre completo del OC
                             */
                            var OC = "Organismo de cuenca ";
                            $.each(JSON.parse(respOC), function (index, item) {
                                OC += item.nombre;
                            });
                            /*
                             *
                             * @type Array
                             * Se crean las variables que almacenan los datos
                             */
                            var data = [];
                            var SEM = 0;
                            var COS = 0;
                            var PROD = 0;
                            var VAL = 0;
                            var REND = 0;
                            var PMR = 0;
                            var id = "";
                            /**
                             * Se itera sobre el array de los datos obtenidos de la consulta de los datos estadisticos
                             */
                            $.each(JSON.parse(resp2), function (index, item) {
                                /**
                                 * Si el elemento actual coincide en anio y el el organismo de cuenca
                                 */
                                if (rha === item.id_organismo) {
                                    /**
                                     * Se colocan los datos en array
                                     */
                                    data.push([
                                        item.dtt_id + ". " + item.nombre,
                                        numeral(Math.round(item.SEM)).format("0,0"),
                                        numeral(Math.round(item.COS)).format("0,0"),
                                        numeral(Math.round(item.PROD)).format("0,0.00"),
                                        numeral(item.VAL).format("0,0.00"),
                                        numeral(item.REND).format("0,0.00"),
                                        numeral(Math.round(item.PMR)).format("0,0.00"),
                                    ]);
                                    /*
                                     * Se suman los acumulados
                                     */
                                    SEM += parseFloat(item.SEM);
                                    COS += parseFloat(item.COS);
                                    PROD += parseFloat(item.PROD);
                                    VAL += parseFloat(item.VAL);
                                    REND += parseFloat(item.REND);
                                    PMR += parseFloat(item.PMR);
                                    id = item.numero;
                                }
                            });
                            /*
                             *
                             * @type String
                             * Se crea la variable de la tabla
                             *
                             */
                            var tabla = "#T3-" + rha;
                            /**
                             * Si el array  contiene datos
                             */
                            if (data.length > 0) {
                                /*
                                 * Se cocola en encabezado y la tabla del respectivo OC
                                 */
                                $("#body").append(
                                    '<div style="background-color: #621132" class="btn-gob col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h4>' +
                                    OC + ', año agrícola: ' + Anio +
                                    "</h4></div>" +
                                    '<div style="overflow-x:auto;">' +
                                    '<table id="T3-' + rha + '" class="table table-bordered nowrap"  width="100%">' +
                                    "<tfoot><tr>" +
                                    /*
                                     * Se colocan los acumulados al pie de la tabla
                                     */
                                    '<td style="background-color:#CCD1D1" align="center"><b>Total Organismo de Cuenca</b></th>' +
                                    '<td style="background-color:#CCD1D1" align="right"><b>' +
                                    numeral(Math.round(parseFloat(SEM).toFixed(2))).format(
                                        "0,0"
                                    ) +
                                    "</b></td>" +
                                    '<td style="background-color:#CCD1D1" align="right"><b>' +
                                    numeral(Math.round(parseFloat(COS).toFixed(2))).format(
                                        "0,0"
                                    ) +
                                    "</b></td>" +
                                    '<td style="background-color:#CCD1D1" align="right"><b>' +
                                    numeral(Math.round(parseFloat(PROD).toFixed(2))).format(
                                        "0,0.00"
                                    ) +
                                    "</b></td>" +
                                    '<td style="background-color:#CCD1D1" align="right"><b>' +
                                    numeral(VAL).format(
                                        "0,0.00"
                                    ) +
                                    "</b></td>" +
                                    '<td style="background-color:#CCD1D1" align="right" ><b>' +
                                    numeral(parseFloat(PROD / COS).toFixed(2)).format(
                                        "0,0.00"
                                    ) +
                                    "</b></td>" +
                                    '<td style="background-color:#CCD1D1" align="right"><b>' +
                                    numeral(
                                        Math.round(parseFloat(VAL / PROD).toFixed(2))
                                    ).format("0,0.00") +
                                    "</b></td>" +
                                    "</tr></tfoot></table>" +
                                    '</div>'
                                );
                                /*
                                 * Se inicializa la tabla en datatables
                                 */
                                $(tabla).DataTable({
                                    /*
                                     * Se crean las columnas a mostrar
                                     */
                                    columns: [
                                        {
                                            title: "Distrito de Temporal Tecnificado",
                                        },
                                        {
                                            title: "Superficie sembrada (ha)",
                                        },
                                        {
                                            title: "Superficie cosechada (ha)",
                                        },
                                        {
                                            title: "Producción (ton)",
                                        },
                                        {
                                            title: "Valor de la cosecha (miles $)",
                                        },
                                        {
                                            title: "Rend. (ton/ha)",
                                        },
                                        {
                                            title: "P.M.R ($/ton)",
                                        },
                                    ],
                                    /*
                                     * Se le da el rray de datos que debe meter
                                     */
                                    data: data,
                                    searching: false,
                                    paging: false,
                                    ordering: false,
                                    /*
                                     * Paramatros del comportamiento de la tabla
                                     */
                                    columnDefs: [
                                        {
                                            className: 'dt-body-right',
                                            targets: [1, 2, 3, 4, 5, 6],
                                        },
                                    ],
                                    language: {
                                        url:
                                            "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
                                    },
                                    dom: "Bfrtip",
                                    /*
                                     * Creacion del boton para exportar excel
                                     */
                                    buttons: [
                                        {
                                            extend: "excelHtml5",
                                            title: "Concentrado distrital: " + OC,
                                            className: "btn btn-gob btn-sm",
                                            text: "Exportar Excel",
                                        },
                                        {
                                            extend: "pdfHtml5",
                                            title: "Concentrado distrital: " + OC,
                                            className: "btn btn-gob btn-sm",
                                            text: "Exportar PDF",
                                            messageBottom: citas,
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
                                                                text: "Concentrado distrital: " + OC,
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
                                }); //Fin de datables
                            } //Fin del if
                        },
                    }); //Fin del AJAX de los  OC
                }); //Fin de la iteraicon de los  OC
            },
        }).done(function () {
            Swal.close();
        }); //Fin del AJAX para obtener los datos
    }
}

async function desgloce4() {
    if (!$("#nav-04").html()) {
        Swal.fire({
            title: "Por favor espere", // add html attribute if you want or remove
            html: "Cargando contenido",
            allowEscapeKey: false,
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });
        /**
         * Creamos el desgloce por ciclo Agricola
         */
        var query1 = query + " GROUP by ciclo";
        await grafica1(query1);
        var query4 = query + " GROUP BY id_organismo";
        await grafica4(query4);
        var query7 = query + " GROUP BY id_organismo,id_ciclo";
        await grafica7(query7);
        Swal.close();
    }
}

/**
 *
 * @param {type} query
 * @returns {undefined}
 * Funcion Desgloce por cultivo y DR
 */
async function desgloce5() {
    var Anio = $("#Anios :selected").text();
    if (!$("#nav-05").html()) {
        Swal.fire({
            title: "Por favor espere", // add html attribute if you want or remove
            html: "Cargando contenido",
            allowEscapeKey: false,
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });
        var query2 = query + " GROUP by dtt_id,ciclo_id,cultivo_id ORDER BY dtt_id,ciclo_id,cultivo"
        /*
         *
         * @type String
         * Variable con los datos a enviar al controlador
         */
        var cadena = "query=" + query2 + "&Accion=DTTTabla";
        /*
         * Se limpia el html y se coloca el encabezado
         */
        document.getElementById("nav-05").innerHTML = "";
        $("#nav-05").append(
            '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Estadística agrícola por distrito de temporal tecnificado (cultivo), año agrícola: ' + Anio + '</h3></div>'
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
            url: "/aplicacion/controlador/agricola.php",
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
                            $("#nav-05").append(
                                '<div class="panel-body" id="body4-' + anio + '">' + "</div>"
                            );
                            /*
                             * Se itera sobre los DR seleccionados
                             */
                            $("#Distritos option:selected").each(async function () {
                                var DR = $(this).val();
                                cadena = "id=" + DR + "&Accion=DTTs";
                                /*
                                 * Ajax para obtener el nombre del distrito de riego
                                 */
                                $.ajax({
                                    type: "POST",
                                    url: "/aplicacion/controlador/agricola.php",
                                    data: cadena,
                                    /*
                                     *
                                     * @param {type} respDR
                                     * @returns {undefined}
                                     * Si se tiene una respiesta
                                     */
                                    success: async function (respDR) {
                                        /*
                                         *
                                         * @type String
                                         * Se crea una variable para colocar el nombre del distrito de riego
                                         */
                                        var DRS = "";
                                        $.each(JSON.parse(respDR), function (index, item) {
                                            DRS += item.id_dtt + " ";
                                            DRS += item.nombre + ", ";
                                            DRS += item.variable;
                                        });
                                        /*
                                         *
                                         * @type Array
                                         * Se crean las variables para colocar los datos obtenidos
                                         *
                                         */
                                        var data = [];
                                        var SEM = 0;
                                        var COS = 0;
                                        var PROD = 0;
                                        var VAL = 0;
                                        var REND = 0;
                                        var PMR = 0;
                                        /*
                                         * Para cada elemento de la consulta
                                         */
                                        $.each(JSON.parse(resp2), function (index, item) {
                                            /*
                                             * Si el anio y el distrito de riego coinciden
                                             */
                                            if (
                                                item.anioagricola_id === anio &&
                                                DR === item.dtt_id
                                            ) {
                                                /*
                                                 * Se colocan los datos en el array
                                                 */
                                                data.push([
                                                    item.ciclo,
                                                    '-',
                                                    item.cultivo,
                                                    numeral(Math.round(item.SEM)).format("0,0"),
                                                    numeral(Math.round(item.COS)).format("0,0"),
                                                    numeral(Math.round(item.PROD)).format("0,0.00"),
                                                    numeral(item.VAL).format("0,0.00"),
                                                    numeral(item.REND).format("0,0.00"),
                                                    numeral(Math.round((item.PMR * 1000))).format("0,0.00"),
                                                ]);
                                                /*
                                                 * Se suman los acumulados
                                                 */
                                                SEM += parseFloat(item.SEM);
                                                COS += parseFloat(item.COS);
                                                PROD += parseFloat(item.PROD);
                                                VAL += parseFloat(item.VAL);
                                                REND += parseFloat(item.REND);
                                                PMR += parseFloat(item.PMR);
                                            }
                                        });
                                        /*
                                         *
                                         * @type String
                                         * Se crea la variable para la tabla creada
                                         */
                                        var tabla = "#T4-" + anio + "-" + DR;
                                        /*
                                         * Si el array tiene elementos
                                         */
                                        if (data.length > 0) {
                                            $("#body4-" + anio + "").append(
                                                '<div style="background-color: #621132" class="btn-gob col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h4>' +
                                                DRS + ', año agrícola: ' + Anio +
                                                "</h4></div>" +
                                                /*
                                                 * Se crea la tabla
                                                 */
                                                '<div style="overflow-x:auto;">' +
                                                '<table id="T4-' +
                                                anio +
                                                "-" +
                                                DR +
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
                                                numeral(Math.round(COS)).format("0,0.00") +
                                                "</b></td>" +
                                                '<td style="background-color:#52BE80" align="right"><b>' +
                                                numeral(Math.round(PROD)).format("0,0.00") +
                                                "</b></td>" +
                                                '<td style="background-color:#52BE80" align="right"><b>' +
                                                numeral(parseFloat(VAL).toFixed(2)).format(
                                                    "0,0.00"
                                                ) +
                                                "</b></td>" +
                                                '<td style="background-color:#52BE80" align="right" ><b>' +
                                                numeral(parseFloat(PROD / COS).toFixed(2)).format(
                                                    "0,0.00"
                                                ) +
                                                "</b></td>" +
                                                '<td style="background-color:#52BE80" align="right"><b>' +
                                                numeral(Math.round(((VAL / PROD) * 1000))).format("0,0.00") +
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
                                                        title: "Ciclo",
                                                    },
                                                    {
                                                        title: "Modalidad",
                                                    },
                                                    {
                                                        title: "Cultivo",
                                                    },
                                                    {
                                                        title: "Superficie sembrada (ha)",
                                                    },
                                                    {
                                                        title: "Superficie cosechada (ha)",
                                                    },
                                                    {
                                                        title: "Producción (ton)",
                                                    },
                                                    {
                                                        title: "Valor de la cosecha (miles $)",
                                                    },
                                                    {
                                                        title: "Rend. (ton/ha)",
                                                    },
                                                    {
                                                        title: "P.M.R ($/ton)",
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
                                                        var sc = rows
                                                            .data()
                                                            .pluck(4)
                                                            .reduce(function (a, b) {
                                                                return (
                                                                    parseFloat(numeral(a.toString()).value()) +
                                                                    parseFloat(numeral(b.toString()).value()) * 1
                                                                );
                                                            }, 0);
                                                        /*
                                                         *
                                                         * @type type
                                                         * Funcion para obtener la produccion
                                                         *
                                                         */
                                                        var prod = rows
                                                            .data()
                                                            .pluck(5)
                                                            .reduce(function (a, b) {
                                                                return (
                                                                    parseFloat(numeral(a.toString()).value()) +
                                                                    parseFloat(numeral(b.toString()).value()) * 1
                                                                );
                                                            }, 0);
                                                        /*
                                                         *
                                                         * @type type
                                                         * Funcion para obtener el subtotal del valor de la cosecha
                                                         */
                                                        var vc = rows
                                                            .data()
                                                            .pluck(6)
                                                            .reduce(function (a, b) {
                                                                return (
                                                                    parseFloat(numeral(a.toString()).value()) +
                                                                    parseFloat(numeral(b.toString()).value()) * 1
                                                                );
                                                            }, 0);
                                                        /*
                                                         *
                                                         * @type Number
                                                         * obener el sibtotal del rendimiento
                                                         */
                                                        var rend = prod / sc;
                                                        /*
                                                         *
                                                         * @type Number
                                                         * Obtener el PMR
                                                         */
                                                        var pmr = (vc / prod) * 1000;
                                                        /**
                                                         * Si algun dato no es un numero
                                                         */
                                                        if (!isFinite(rend)) rend = 0;
                                                        if (!isFinite(pmr)) pmr = 0;
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
                                                            numeral(Math.round(sc)).format("0,0") +
                                                            "</b></td>" +
                                                            '<td style="background-color:#A9DFBF"  align="right" ><b>' +
                                                            numeral(Math.round(prod)).format("0,0.00") +
                                                            "</b></td>" +
                                                            '<td style="background-color:#A9DFBF"  align="right"><b>' +
                                                            numeral(parseFloat(vc).toFixed(2)).format(
                                                                "0,0.00"
                                                            ) +
                                                            "</b></td>" +
                                                            '<td style="background-color:#A9DFBF"  align="right"><b>' +
                                                            numeral(parseFloat(rend).toFixed(2)).format(
                                                                "0,0.00"
                                                            ) +
                                                            "</b></td>" +
                                                            '<td style="background-color:#A9DFBF"  align="right" ><b>' +
                                                            numeral(Math.round(pmr)).format("0,0.00") +
                                                            "</b></td>"
                                                        );
                                                    },
                                                },
                                                columnDefs: [
                                                    { targets: [0], visible: false },
                                                    {
                                                        className: 'dt-body-right',
                                                        targets: [3, 4, 5, 6, 7, 8],
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
                                                            "Concentrado distrito " +
                                                            DRS +
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
                                                            "Concentrado distrito " +
                                                            DRS +
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
                                                                                "Concentrado distrito " +
                                                                                DRS +
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
                                }); //Fin AJAX DR
                            }); //Fin de la iteracion DR
                        },
                    }); //Fin AJAX Anio
                }); //Fin iteracion de anio
            },
        }).always(function () {
            Swal.close();
        }); //Fin AJAX para obtener la consulta
    }
} //Fin de la funcion del desgloce 4




/*
 *
 * @param {type} query
 * @returns {undefined}
 * Funcion para obtener el desgloce por cultvo
 *
 */
async function desgloce6() {
    var Anio = $("#Anios :selected").text();
    if (!$("#nav-06").html()) {
        Swal.fire({
            title: "Por favor espere", // add html attribute if you want or remove
            html: "Cargando contenido",
            allowEscapeKey: false,
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });
        var query2 = query + " GROUP by cultivo_id,id_organismo,dtt_id"
        /*
         *
         * @type String
         * Variable para mandar los datos al controlador
         *
         */
        var cadena = "query=" + query2 + "&Accion=DTTTabla";
        /*
         * Se limpia el HTML y se coloca el encabezado
         */
        $("#nav-06").innerHTML = "";
        $("#nav-06").append(
            '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Concentrado nacional por cultivo, año agrícola: ' + Anio + '</h3></div>'
        );
        /*
         *
         * @type type
         * Variable para almacenar las tablas
         *
         */
        var tablas = {};
        /*
         * Ajax para obtener el array de la consulta
         *
         */
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/agricola.php",
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
                 * Se itera sobre los anios
                 */
                $("#Anios option:selected").each(async function () {
                    var anio = $(this).val();
                    cadena = "id=" + anio + "&Accion=Anio";
                    /*
                     * Ajax que obtiene el anio seleccionado
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
                             * Se coloca la seccion del anio
                             */
                            $("#nav-06").append(
                                '<div class="panel-body" id="body5-' + anio + '">' + "</div>>"
                            );
                            /*
                             * Se itera sobre los cultivos
                             */
                            $("#Cultivos option:selected").each(async function () {
                                var Cultivo = $(this).val();
                                cadena = "id=" + Cultivo + "&Accion=Cultivo";
                                /*
                                 * Ajax para obtener el cultivo seleccionado
                                 */
                                $.ajax({
                                    type: "POST",
                                    url: "/aplicacion/controlador/mapa.php",
                                    data: cadena,
                                    /*
                                     *
                                     * @param {type} respC
                                     * @returns {undefined}
                                     * Si el controlador devuelve una respuesta
                                     */
                                    success: async function (respC) {
                                        /*
                                         *
                                         * @type Array
                                         * Se crean las variables donde se colocaran los datos extraidos
                                         */
                                        var data = [];
                                        var SEM = 0;
                                        var COS = 0;
                                        var PROD = 0;
                                        var VAL = 0;
                                        var REND = 0;
                                        var PMR = 0;
                                        /*
                                         * Se itera sobre el resultado de la consulta
                                         */
                                        $.each(JSON.parse(resp2), function (index, item) {
                                            /*
                                             * Si el anio y el cultivo coincide
                                             */
                                            if (item.anioagricola_id === anio && Cultivo === item.cultivo_id) {
                                                /*
                                                 *
                                                 * @type Number
                                                 * Se crean las variables para calcular el rendimiento
                                                 * el valor y el pmr
                                                 */
                                                var VAL1 = 0;
                                                var REND1 = 0;
                                                var PMR1 = 0;
                                                /*
                                                 * Si el valor es mayor a cero
                                                 */
                                                if (item.VAL > 0) {
                                                    VAL1 = item.VAL;
                                                }
                                                /*
                                                 * Si el rendimiento es mayor a cero
                                                 */
                                                if (item.REND > 0) {
                                                    REND1 = item.REND;
                                                }
                                                /*
                                                 * Si el pmr es mayor a cero
                                                 */
                                                if (item.PMR > 0) {
                                                    PMR1 = item.PMR;
                                                }
                                                /*
                                                 * Se colocan los datos al array
                                                 */
                                                data.push([
                                                    item.numero + ". " + item.OC,
                                                    item.dtt_id + ". " + item.nombre,
                                                    numeral(Math.round(item.SEM)).format("0,0"),
                                                    numeral(Math.round(item.COS)).format("0,0"),
                                                    numeral(Math.round(item.PROD)).format("0,0.00"),
                                                    numeral(VAL1).format("0,0.00"),
                                                    numeral(REND1).format("0,0.00"),
                                                    numeral(Math.round((PMR1 * 1000))).format("0,0.00"),
                                                ]);
                                                /*
                                                 * Se colocan el acumulado
                                                 */
                                                SEM += parseFloat(item.SEM);
                                                COS += parseFloat(item.COS);
                                                PROD += parseFloat(item.PROD);
                                                VAL += parseFloat(VAL1);
                                                REND += parseFloat(REND1);
                                            }
                                        });
                                        /*
                                         *
                                         * @type String
                                         * Se crea la variable a la tabla
                                         */
                                        var tabla = "#T5-" + anio + "-" + Cultivo;
                                        /*
                                         * Si existen datos en array
                                         */
                                        if (data.length > 0) {
                                            var REND1 = PROD / COS;
                                            var PMR1 = VAL / PROD;
                                            if (!isFinite(REND1)) REND1 = 0;
                                            if (!isFinite(PMR1)) PMR1 = 0;
                                            /*
                                             * Se coloca el encabezado
                                             */
                                            $("#body5-" + anio + "").append(
                                                '<div style="background-color: #621132" class="btn-gob col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>' +
                                                JSON.parse(respC) + ', año agrícola: ' + Anio +
                                                "</h3></div>"
                                            );
                                            /*
                                             * Se coloca la tabla
                                             */
                                            $("#body5-" + anio + "").append(
                                                '<div style="overflow-x:auto;">' +
                                                '<table id="T5-' +
                                                anio +
                                                "-" +
                                                Cultivo +
                                                '" class="table table-bordered nowrap"  width="100%">' +
                                                "<tfoot><tr>" +
                                                /*
                                                 * Se colocan los totales en el pie de la tabla
                                                 */
                                                '<td style="background-color:#52BE80" colspan="2" align="center"><b>Total General</b></td>' +
                                                '<td style="background-color:#52BE80" align="right"><b>' +
                                                numeral(Math.round(SEM)).format("0,0") +
                                                "</b></td>" +
                                                '<td style="background-color:#52BE80" align="right"><b>' +
                                                numeral(Math.round(COS)).format("0,0") +
                                                "</b></td>" +
                                                '<td style="background-color:#52BE80" align="right"><b>' +
                                                numeral(Math.round(PROD)).format("0,0.00") +
                                                "</b></td>" +
                                                '<td style="background-color:#52BE80" align="right"><b>' +
                                                numeral(parseFloat(VAL).toFixed(2)).format("0,0.00") +
                                                "</b></td>" +
                                                '<td style="background-color:#52BE80" align="right" ><b>' +
                                                numeral(parseFloat(REND1).toFixed(2)).format("0,0.00") +
                                                "</b></td>" +
                                                '<td style="background-color:#52BE80" align="right"><b>' +
                                                numeral(Math.round(parseFloat(PMR1).toFixed(2))).format(
                                                    "0,0.00"
                                                ) +
                                                "</b></td>" +
                                                "</tr></tfoot></table>" +
                                                '</div>'
                                            );
                                            /*
                                             * Inicializacion en datatables
                                             */
                                            tabla5 = $(tabla).DataTable({
                                                /*
                                                 * Creacion de las columnas
                                                 */
                                                columns: [
                                                    {
                                                        title: "Organismo de cuenca",
                                                    },
                                                    {
                                                        title: "Distrito de Temporal Tecnificado",
                                                    },
                                                    {
                                                        title: "Superficie sembrada (ha)",
                                                    },
                                                    {
                                                        title: "Superficie cosechada (ha)",
                                                    },
                                                    {
                                                        title: "Producción (ton)",
                                                    },
                                                    {
                                                        title: "Valor de la cosecha (miles $)",
                                                    },
                                                    {
                                                        title: "Rend. (ton/ha)",
                                                    },
                                                    {
                                                        title: "P.M.R ($/ton)",
                                                    },
                                                ],
                                                /*
                                                 * Se colocan los datos
                                                 */
                                                data: data,
                                                /*
                                                 * Se colocan los parametros del comportamiento de la tabla
                                                 */
                                                order: [0, "asc"],
                                                ordering: false,
                                                searching: false,
                                                /*
                                                 * Funcion que crea los subtotals de la talba
                                                 */
                                                rowGroup: {
                                                    dataSrc: [0],
                                                    startRender: function (rows, group) {
                                                        var ss = rows
                                                            .data()
                                                            .pluck(2)
                                                            .reduce(function (a, b) {
                                                                return (
                                                                    parseFloat(numeral(a.toString()).value()) +
                                                                    parseFloat(numeral(b.toString()).value()) * 1
                                                                );
                                                            }, 0);

                                                        var sc = rows
                                                            .data()
                                                            .pluck(3)
                                                            .reduce(function (a, b) {
                                                                return (
                                                                    parseFloat(numeral(a.toString()).value()) +
                                                                    parseFloat(numeral(b.toString()).value()) * 1
                                                                );
                                                            }, 0);

                                                        var prod = rows
                                                            .data()
                                                            .pluck(4)
                                                            .reduce(function (a, b) {
                                                                return (
                                                                    parseFloat(numeral(a.toString()).value()) +
                                                                    parseFloat(numeral(b.toString()).value()) * 1
                                                                );
                                                            }, 0);
                                                        var vc = rows
                                                            .data()
                                                            .pluck(5)
                                                            .reduce(function (a, b) {
                                                                return (
                                                                    parseFloat(numeral(a.toString()).value()) +
                                                                    parseFloat(numeral(b.toString()).value()) * 1
                                                                );
                                                            }, 0);

                                                        var rend = prod / sc;
                                                        var pmr = (vc / prod) * 1000;
                                                        if (!isFinite(rend)) rend = 0;
                                                        if (!isFinite(pmr)) pmr = 0;
                                                        /*
                                                         * Se retorna el subtotal
                                                         */
                                                        return $("<tr/>").append(
                                                            '<td style="background-color:#A9DFBF" colspan="1"><b>' +
                                                            group +
                                                            "</b></td>" +
                                                            '<td style="background-color:#A9DFBF" align="right" ><b>' +
                                                            numeral(Math.round(ss)).format("0,0") +
                                                            "</b></td>" +
                                                            '<td style="background-color:#A9DFBF" align="right" ><b>' +
                                                            numeral(Math.round(sc)).format("0,0") +
                                                            "</b></td>" +
                                                            '<td style="background-color:#A9DFBF" align="right" ><b>' +
                                                            numeral(Math.round(prod)).format("0,0.00") +
                                                            "</b></td>" +
                                                            '<td style="background-color:#A9DFBF" align="right"><b>' +
                                                            numeral(parseFloat(vc).toFixed(2)).format(
                                                                "0,0.00"
                                                            ) +
                                                            "</b></td>" +
                                                            '<td style="background-color:#A9DFBF" align="right"><b>' +
                                                            numeral(parseFloat(rend).toFixed(2)).format(
                                                                "0,0.00"
                                                            ) +
                                                            "</b></td>" +
                                                            '<td style="background-color:#A9DFBF"align="right" ><b>' +
                                                            numeral(Math.round(pmr)).format("0,0.00") +
                                                            "</b></td>"
                                                        );
                                                    },
                                                },
                                                columnDefs: [
                                                    { targets: [0], visible: false },
                                                    {
                                                        className: 'dt-body-right',
                                                        targets: [2, 3, 4, 5, 6, 7],
                                                    },
                                                ],
                                                language: {
                                                    url:
                                                        "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
                                                },
                                                paging: false,
                                                dom: "Bfrtip",
                                                /*
                                                 * Se crea el boton para exportar el excel
                                                 */
                                                buttons: [
                                                    {
                                                        extend: "excelHtml5",
                                                        title:
                                                            "Concentrado distrito " +
                                                            JSON.parse(respC) +
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
                                                            "Concentrado distrito " +
                                                            JSON.parse(respC) +
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
                                                                                "Concentrado distrito " +
                                                                                JSON.parse(respC) +
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
                                            }); //Fin de data tables
                                        }
                                    },
                                });
                            }); //Fin de iteracion de cultivos
                        },
                    });
                }); //Fin de la iteracion de anios
            },
        }).always(function () {
            Swal.close();
        }); //Fin del ajax de la consulta
    }
} //Fin de la funcion desgloce por  cultivo

/**
 *
 * @param {type} query
 * @returns {undefined}
 * Funcion que crea las graficas
 */
async function grafica1(query2) {
    var Anio = $("#Anios :selected").text();
    var cadena = "query=" + query2 + "&Accion=DTTTabla";
    document.getElementById("nav-04").innerHTML = "";
    /*
     * Ajax para obtener los datos para la grafica
     */
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/agricola.php",
        data: cadena,
        /*
         *S i el controlador devuelve una respuesta
         */
        success: function (resp) {
            /*
             * Se coloca el bloque respectivo al anio y los canvas para colocar las graficas
             */
            $("#nav-04").append(
                '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Distribución de la superficie cosechada, año agrícola: ' + Anio + '</h3></div>' +
                '<div class="row">' +
                '<div class="col-sm">' +
                '<div style="background-color: #621132" class="btn-gob col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h4>Ciclo agrícola, año agrícola: ' + Anio + '</h4></div>' +
                '<canvas id="G-1"></canvas>' +
                "</div>" +
                "</div>" +
                '<div class="row">' +
                '<div class="col-sm">' +
                '<div style="background-color: #621132" class="btn-gob col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h4>Superficie cosechada y valor de la producción, por organismo de cuenca, año agrícola: ' + Anio + '</h4></div>' +
                '<canvas id="G-4"></canvas>' +
                '<canvas id="G-4-1"></canvas>' +
                "</div>" +
                "</div>" +
                '<div class="row">' +
                '<div class="col-sm">' +
                '<div style="background-color: #621132" class="btn-gob col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h4>Distribución de la superficie cosechada por organismo de cuenca y ciclo agrícola, año agrícola: ' + Anio + '</h4></div>' +
                '<canvas id="G-7"></canvas>' +
                "</div>" +
                "</div>"
            );
            /*
             * Variables donde se coclocaran los datos extraidos
             */
            var total = 0;
            var OI = 0;
            var PV = 0;
            var PER = 0;
            var SC = 0;
            /*
             * Se iteran sobre los elementos
             */
            $.each(JSON.parse(resp), function (index, item) {
                total += parseFloat(item.COS);
                /*
                 * Dependiendo el tipo de ciclo se acumulan los datos
                 */
                switch (item.ciclo) {
                    case "Otoño-Invierno":
                        OI = item.COS;
                        break;
                    case "Primavera-Verano":
                        PV = item.COS;
                        break;
                    case "Perennes":
                        PER = item.COS;
                        break;
                    case "Segundos Cultivos":
                        SC = item.COS;
                        break;
                }
            });
            /*
             * Se crea la grafica con ChartJs
             */
            var element = "G-1";
            new Chart(document.getElementById(element), {
                type: "pie",
                data: {
                    /*
                     * Se colocan las etiquetas
                     */
                    labels: [
                        "Perenes",

                        "Otoño - Invierno",
                        "Primavera - Verano",
                    ],
                    datasets: [
                        {
                            /*
                             * Se colocan los datos
                             */
                            backgroundColor: ["#E67E22", "#E74C3C", "#F4D03F", "#154360"],
                            data: [
                                ((PER * 100) / total).toFixed(2),

                                ((OI * 100) / total).toFixed(2),
                                ((PV * 100) / total).toFixed(2),
                            ],
                        },
                    ],
                },
                options: {
                    title: {
                        display: true,
                    },
                },
            }); //Fin de la creacion de la grafica
        },
    }); //Fin del ajax para obtener los datos
}

/**
 *
 * @param {type} query
 * @returns {undefined}
 * Graficas de la superfice cosechada por OC
 */
async function grafica4(query2) {
    cadena = "query=" + query2 + "&Accion=DTTTabla";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/agricola.php",
        data: cadena,
        //Si el controlador devuelve una respuesta
        success: function (resp) {
            var Cosechada = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var Prod = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            $.each(JSON.parse(resp), function (index, item) {
                $("#Organismos option:selected").each(async function () {
                    if (item.id_organismo === $(this).val()) {
                        Cosechada[$(this).val() - 1] = item.COS / 1000;
                        Prod[$(this).val() - 1] = item.VAL / 1000000;
                    }
                });
            });
            var etiquetas = [
                "I",
                "II",
                "III",
                "IV",
                "V",
                "VI",
                "VII",
                "VIII",
                "IX",
                "X",
                "XI",
                "XII",
                "XIII",
            ];
            var etiquetas2 = [
                "I",
                "II",
                "III",
                "IV",
                "V",
                "VI",
                "VII",
                "VIII",
                "IX",
                "X",
                "XI",
                "XII",
                "XIII",
            ];
            /**
             * Quitamos Cosechas en 0
             */
            while (Cosechada.includes(0)) {
                var posicion = Cosechada.indexOf(0);
                Cosechada.splice(posicion, 1);
                etiquetas.splice(posicion, 1);
            }
            var element = "G-4";
            new Chart(document.getElementById(element), {
                type: "horizontalBar",
                data: {
                    labels: etiquetas,
                    datasets: [
                        {
                            label: "Superficie Cosechada",
                            data: Cosechada,
                            backgroundColor: "#154360", // green
                        },
                    ],
                },
                options: {
                    scales: {
                        xAxes: [
                            {
                                stacked: true,
                            },
                        ],
                        yAxes: [
                            {
                                stacked: true,
                            },
                        ],
                    },
                    title: {
                        display: true,
                        text: "Superficie Cosechada (miles ha)",
                    },
                },
            });
            /**
             * Quitamos Produccion en ceros
             * @type {string}
             */
            while (Prod.includes(0)) {
                var posicion = Prod.indexOf(0);
                Prod.splice(posicion, 1);
                etiquetas2.splice(posicion, 1);
            }
            var element = "G-4-1";
            new Chart(document.getElementById(element), {
                type: "horizontalBar",
                data: {
                    labels: etiquetas2,
                    datasets: [
                        {
                            label: "Valor de la producción",
                            data: Prod,
                            backgroundColor: "#154360", // green
                        },
                    ],
                },
                options: {
                    scales: {
                        xAxes: [
                            {
                                stacked: true,
                            },
                        ],
                        yAxes: [
                            {
                                stacked: true,
                            },
                        ],
                    },
                    title: {
                        display: true,
                        text: "Valor de la producción (millones $)",
                    },
                },
            });
        },
    });
}

/**
 *
 * @param {type} query
 * @returns {undefined}
 * Funcion para Distribución de la superficie cosechada por organismo de cuenca y ciclo agrícola
 */
async function grafica7(query2) {
    cadena = "query=" + query2 + "&Accion=DTTTabla";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/agricola.php",
        data: cadena,
        //Si el controlador devuelve una respuesta
        success: function (resp) {
            var OI = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var PV = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var P = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var SC = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var etiquetas = [
                "I",
                "II",
                "III",
                "IV",
                "V",
                "VI",
                "VII",
                "VIII",
                "IX",
                "X",
                "XI",
                "XII",
                "XIII",
            ];
            $.each(JSON.parse(resp), function (index, item) {
                $("#Organismos option:selected").each(async function () {
                    if (item.id_organismo === $(this).val() && item.id_ciclo === "1") {
                        OI[$(this).val() - 1] = item.COS / 1000;
                    }
                    if (item.id_organismo === $(this).val() && item.id_ciclo === "2") {
                        PV[$(this).val() - 1] = item.COS / 1000;
                    }
                    if (item.id_organismo === $(this).val() && item.id_ciclo === "3") {
                        P[$(this).val() - 1] = item.COS / 1000;
                    }
                    if (item.id_organismo === $(this).val() && item.id_ciclo === "4") {
                        SC[$(this).val() - 1] = item.COS / 1000;
                    }
                });
            });
            var i = 0
            var bandera = true;
            while (bandera) {
                if (OI[i] === PV[i] && PV[i] === P[i] && P[i] === SC[i]) {
                    OI.splice(i, 1);
                    PV.splice(i, 1);
                    P.splice(i, 1);
                    SC.splice(i, 1);
                    etiquetas.splice(i, 1);
                    i = 0;
                } else {
                    i++;
                }
                if (i === (OI.length)) {
                    bandera = false;
                }
            }
            var element = "G-7";
            new Chart(document.getElementById(element), {
                type: "bar",
                data: {
                    labels: etiquetas,
                    datasets: [
                        {
                            label: "Otoño-Invierno",
                            data: OI,
                            backgroundColor: "#154360", // green
                        },
                        {
                            label: "Primavera-Verano",
                            data: PV,
                            backgroundColor: "#F7DC6F", // yellow
                        },
                        {
                            label: "Perennes",
                            data: P,
                            backgroundColor: "#2ECC71", // yellow
                        },
                        {
                            label: "Segundos Cultivos",
                            data: SC,
                            backgroundColor: "#F39C12", // yellow
                        },
                    ],
                },
                options: {
                    scales: {
                        xAxes: [
                            {
                                stacked: true,
                            },
                        ],
                        yAxes: [
                            {
                                stacked: true,
                            },
                        ],
                    },
                    title: {
                        display: true,
                        text: "Superficie Cosechada (miles ha)",
                    },
                },
            });
        },
    });
}

