
citas = "";
query = "";

// Se aplica el estilo a los selects
setEstiloSelect('#Organismos', 'Organismos de Cuenca', 'Buscar Organismos de Cuenca');
setEstiloSelect('#Estados', 'Estados', 'Buscar Estado');
setEstiloSelect('#Municipios', 'Municipios', 'Buscar Municipio');
setEstiloSelect('#Cultivos', 'Cultivos', 'Buscar Cultivo');



async function Anios() {
    await limpiarOrganismos();
    $("#Cultivos").multiselect("reset");
    $("#Organismos").multiselect("reset");
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Cargando Datos",
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    var query = '(';
    $("#Anios option:selected").each(function () {
        query += "anio_id=" + $(this).val() + " or ";
    });
    query = query.slice(0, -4) + ') GROUP BY id_organismo';
    if (query !== "") {
        /**
         * controlador
         * @type {string}
         */
        const cadena = "query=" + query + "&Accion=URTabla";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/unidadriego.php",
            data: cadena,
            /**
             * @param resp
             * Si el controlador devuelve la consulta se procederá con el proceso de interpretación de los datos
             */
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    /**
                     * Por medio del plugin de multiselect, podemos agregar los objetos del array al select de estados
                     */
                    data.push({
                        name: item.numero+'. '+item.OC,
                        value: item.id_organismo,
                        checked: false,
                    });
                });
                $("#Organismos").multiselect("loadOptions", data);
            }
        }).always(function () {
            Swal.close();
        });
    } else {
        Swal.close();
    }
}
/**
 *
 * @constructor
 * * Esta función controla todos los cambios del select de organismos de cuenca.
 * La función básicamente lo que realiza es leer todas las opciones seleccionadas desde la vista,
 * limpia las capas del mapa, limpia los select que dependen de él, prepara una sentencia MySQL y
 * retorna en este caso los estados que dependen de un organismo de cuenta además de los shapes de los organismos.
 *
 */
async function Organismos() {
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Cargando Datos",
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    /**
     * Esta línea de código llama a la función que limpia la capa de organismos de cuenca
     */
    await limpiarOrganismos();
    $("#Cultivos").multiselect("reset");
    var query = "(";
    /**
     * Se tiene que recorrer el select de organismos de cuenca para encontrar todos los elementos seleccionados.
     */
    $("#Anios option:selected").each(function () {
        query += "anio_id=" + $(this).val() + " or ";
    });
    query = query.slice(0, -4) + ') AND (';
    if ($("#Organismos option:selected").length != 0) {
        $("#Organismos option:selected").each(function () {
            query += "id_organismo=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') GROUP BY id_estado';
        /**
         * Antes de realizar la consulta a la base de datos,
         * es necesario verificar primero si el query contiene datos a buscar.
         */
        if (query !== "") {
            /**
             * @type {string}
             * Se crea una cadena que es la que se va a enviar por medio de Ajax,
             * este contiene tanto el query anteriormente descrito como la acción que va realizar en el controlador de mapa
             */
            const cadena = "query=" + query + "&Accion=URTabla";
            var data = [];
            /**
             * Se manda a llamar por medio de Ajax a la función de estados en el controlador de mapa
             */
            $.ajax({
                type: "POST",
                url: "/aplicacion/controlador/unidadriego.php",
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
                         * Por medio del plugin de multiselect, podemos agregar los objetos del array al select de estados
                         */
                        data.push({
                            name: item.estado,
                            value: item.id_estado,
                            checked: false,
                        });
                    });
                    $("#Estados").multiselect("loadOptions", data);
                },
            }).always(function () {
                Swal.close();
            });
        } else {
            Swal.close();
        }
    } else {
        Swal.close();
    }
}

/**
 *
 * @constructor
 *  Esta función controla todos los cambios del select de estados.
 * La función básicamente lo que realiza es leer todas las opciones seleccionadas desde la vista,
 * limpia las capas del mapa, limpia los select que dependen de él, prepara una sentencia MySQL y
 * retorna en este caso los Distritos que dependen de un organismo de cuenta además de los shapes de los organismos.
 *
 */
async function Estados() {
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Cargando Datos",
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    await limpiarEstados();
    $("#Cultivos").multiselect("reset");
    var query = "(";
    /**
     * Se tiene que recorrer el select de organismos de cuenca para encontrar todos los elementos seleccionados.
     */
    $("#Anios option:selected").each(function () {
        query += "anio_id=" + $(this).val() + " or ";
    });
    query = query.slice(0, -4) + ') AND (';
    if ($("#Organismos option:selected").length != 0 && $("#Estados option:selected").length != 0) {
        $("#Organismos option:selected").each(function () {
            query += "id_organismo=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') AND (';
        $("#Estados option:selected").each(function () {
            query += "id_estado=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') GROUP BY id_municipio';
        /**
         * Antes de realizar la consulta a la base de datos,
         * es necesario verificar primero si el query contiene datos a buscar.
         */
        if (query !== "") {
            /**
             * @type {string}
             * Se crea una cadena que es la que se va a enviar por medio de Ajax,
             * este contiene tanto el query anteriormente descrito como la acción que va realizar en el controlador de mapa
             */
            const cadena = "query=" + query + "&Accion=URTabla";
            var data = [];
            /**
             * Se manda a llamar por medio de Ajax a la función de estados en el controlador de mapa
             */
            $.ajax({
                type: "POST",
                url: "/aplicacion/controlador/unidadriego.php",
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
                         * Por medio del plugin de multiselect, podemos agregar los objetos del array al select de estados
                         */
                        data.push({
                            name: item.municipio,
                            value: item.id_municipio,
                            checked: false,
                        });
                    });
                    $("#Municipios").multiselect("loadOptions", data);
                },
            }).always(function () {
                Swal.close();
            });
        } else {
            Swal.close();
        }
    } else {
        Swal.close();
    }
}

/**
 * Funcion para obtener los cultivos
 */

async function getCultivos() {
    $("#Cultivos").multiselect("reset");
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Cargando Datos",
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    if ($("#Organismos option:selected").length != 0 &&
        $("#Estados option:selected").length != 0 &&
        $("#Municipios option:selected").length != 0) {
        var query = "(";
        /**
         * Se tiene que recorrer el select de organismos de cuenca para encontrar todos los elementos seleccionados.
         */
        $("#Anios option:selected").each(function () {
            query += "anio_id=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') AND (';
        $("#Organismos option:selected").each(function () {
            query += "id_organismo=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') AND (';
        $("#Estados option:selected").each(function () {
            query += "id_estado=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') AND (';
        $("#Municipios option:selected").each(function () {
            query += "id_municipio=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') GROUP BY cultivo_id';

        const cadena = "query=" + query + "&Accion=URTabla";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/unidadriego.php",
            data: cadena,
            //Si el controlador devuelve una respuesta
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    data.push({
                        name: item.cultivo,
                        value: item.cultivo_id,
                        checked: false,
                    });
                });
            },
        }).always(function () {
            $("#Cultivos").multiselect("loadOptions", data);
            Swal.close();
        });
    } else {
        Swal.close();
    }
}

/**
 *
 * @returns {Promise<void>}
 * @constructor
 * Funcion para realizar la consulta de las selecicones con sus respectivos shapes
 */
async function Consultar() {
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Realizando la consulta",
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    $('#nav-tab-acu a[href="#nav-01"]').tab("show");
    /**
     * Llmamos a deshabilitar y a limpiar los Distritos
     * */
    await deshabilitar();
    await limpiarDR();
    const OC = await selectOrganismo();
    const Est = await selectEst();
    const Mun = await selectMuni();
    const Anio = await selectAnio();
    const Cultivo = await selectCultivo();
    /**
     * * Se verifica que el query de Organismos ese vacio
     * */
    if (OC !== "" && Est !== "" && Mun !== "" && Cultivo !== "" && Anio !== "") {
        //Se obtiene la cita con la información de las unidades de riego
        cadena = "Accion=ConsultaAgricolaDTT&modulo_id=8&anios=anio_id=" + $( "#Anios" ).val();
        citas = "\n ";
        $.ajax({
            type: "GET",
            url: "/aplicacion/controlador/catalogo.php",
            data: cadena,
            success: function (resp) {
                document.getElementById("lista").innerHTML = "";
                $.each(JSON.parse(resp), function (index, item) {
                    citas += item.cita + " \n";
                    $("#lista").append("<li>" + item.cita + "</li>");
                });
            },
        });
        query = "(" + OC + ") AND (" + Est + ") AND (" + Mun + ") AND (" + Anio + ") AND (" + Cultivo + ")";
        await desgloce1(query);
        //Verifica si el mapa es prioridad
        var x = $('#Prioridad').prop('checked');
        if (x === false) {
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
        /**
         *
         * @returns {Promise<void>}
         * Esta funcion habilida el mapa y los elementos de la interfaz
         */
        await habilitar();
        /**
         *
         * @returns {Promise<void>}
         * Una  vez realizada la ocnsulta , se guarda en el historial
         */
        await Swal.close();
    } else {
        /**
         *
         * @returns {Promise<void>}
         * Si algun selector esta vacio, se muestra un mensaje de error.
         *
         */
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
 * Funcion que carga los shape de los estados
 * @returns {Promise<string>}
 *
 */
async function selectOrganismo() {
    var OC = "";
    $("#Organismos option:selected")
        .each(async function () {
            OC += "id_organismo=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            OC = OC.slice(0, -3);
        });
    return OC;
}

/**
 *
 * Funcion que carga los shape de los estados
 * @returns {Promise<string>}
 *
 */
async function selectEst() {
    var Est = "";
    $("#Estados option:selected")
        .each(async function () {
            Est += "id_estado=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            Est = Est.slice(0, -3);
        });
    return Est;
}

/**
 *
 * @returns {String|selectDR.DR}
 * Funcion que obtiene los Distritos de riego seleccionados
 *
 */
async function selectMuni() {
    var Muni = "";
    $("#Municipios option:selected")
        .each(async function () {
            Muni += 'id_municipio="' + $(this).val() + '" or ';
        })
        .promise()
        .always(async function () {
            Muni = Muni.slice(0, -3);
        });
    return Muni;
}

/**
 *
 * @returns {selectAnio.Anio|String}
 * Funcion que obtiene los anios seleccionados
 *
 */
async function selectAnio() {
    var Anio = "";
    $("#Anios option:selected")
        .each(async function () {
            Anio += "anio_id=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            Anio = Anio.slice(0, -3);
        });
    return Anio;
}

/**
 *
 * @returns {selectCultivo.Cultivos|String}
 * Funcion que obtiene los cultivos sleeccionados
 *
 */
async function selectCultivo() {
    var Cultivos = "";
    $("#Cultivos option:selected")
        .each(async function () {
            Cultivos += "cultivo_id=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            Cultivos = Cultivos.slice(0, -3);
        });
    return Cultivos;
}

/**
 *
 * @returns {undefined}
 *  Funcion que limpia la capa de organimos asi como de las capas que dependen directamente de ellas
 *
 */
async function limpiarOrganismos() {
    $("#Estados").multiselect("reset");
    await limpiarEstados();
}

/**
 *
 * @returns {undefined}
 * Funcion para limpiar la capa de estados
 *
 */
async function limpiarEstados() {
    $("#Municipios").multiselect("reset");
    await limpiarDR();
    //$("#Ciclos").multiselect("reset2");
}

/**
 *
 * @returns {undefined}
 * Funcion para limpiar la capa de Distritos
 *
 */
async function limpiarDR() {
    /**
     * Limpia su porpia capa
     */
    map.off();
    map.remove();
    crearMapa();
}

/**
 *
 * @returns {Promise<string>}
 * Funcion que concatena la cadena de los Distritos seleccionadoss
 *
 */
async function concatOrganismo() {
    /**
     *
     * @type String
     * Se crea la variable para ir concatenando el query
     *
     */
    var query = "";
    /**
     * Se tiene que recorrer el select de organismos de cuenca para encontrar todos los elementos seleccionados.
     */
    $("#Organismos option:selected").each(function () {
        query += "organismo_id=" + $(this).val() + " or ";
    });
    /**
     * Al final el query quedara con un or al final, la siguiente línea quita ese or sobrante.
     * @type {string}
     */
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
    var cadena = "query=" + query2 + "&Accion=URTabla";
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
        '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Concentrado agrícola por organismo de cuenca, año agrícola: '+ Anio +' </h3></div>'
    );
    /**
     * Funcion de ajax que se encarga de obtener la informacion
     *
     */
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/unidadriego.php",
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
                    '<table id="T1" class="table table-bordered  nowrap" style="width:100%">' +
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
        var cadena = "query=" + query2 + "&Accion=URTabla";
        /*
         * Se limpia el HTML y se coloca el encabezado
         */
        document.getElementById("nav-02").innerHTML = "";
        $("#nav-02").append(
            '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Concentrado agrícola por entidad federativa, año agrícola: '+Anio+'</h3></div>'
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
            url: "/aplicacion/controlador/unidadriego.php",
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
                        '<table id="T2' +
                        '"  class="table table-bordered  nowrap"  width="100%">' +
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



async function desgloce4() {
    if (!$("#nav-04").html()) {
        Swal.fire({
            title: "Por favor espere", // add html attribute if you want or remove
            html: "Cargando contenido",
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });
        /**
         * Creamos el desgloce por ciclo Agricola
         */
        //var query1=query+" GROUP by ciclo";
        await grafica1();
        var query4 = query + " GROUP BY id_organismo";
        await grafica4(query4);
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
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });
        var query2 = query + " GROUP by id_estado,id_municipio,cultivo_id ORDER BY id_estado,id_municipio,cultivo_id";
        /*
         *
         * @type String
         * Variable con los datos a enviar al controlador
         */
        var cadena = "query=" + query2 + "&Accion=URTabla";
        /*
         * Se limpia el html y se coloca el encabezado
         */
        document.getElementById("nav-05").innerHTML = "";
        $("#nav-05").append(
            '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Estadística agrícola por municipio, año agrícola: '+Anio+'</h3></div>'
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
            url: "/aplicacion/controlador/unidadriego.php",
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
                            $("#Estados option:selected").each(async function () {
                                var Estado = $(this).val();
                                cadena = "id=" + Estado + "&Accion=getEstadoid";
                                /*
                                 * Ajax para obtener el nombre del distrito de riego
                                 */
                                $.ajax({
                                    type: "POST",
                                    url: "/aplicacion/controlador/estado.php",
                                    data: cadena,
                                    /*
                                     *
                                     * @param {type} respDR
                                     * @returns {undefined}
                                     * Si se tiene una respiesta
                                     */
                                    success: async function (respEst) {
                                        /*
                                         *
                                         * @type String
                                         * Se crea una variable para colocar el nombre del distrito de riego
                                         */
                                        var Est = JSON.parse(respEst).nombre;
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
                                                item.anio_id === anio &&
                                                Estado === item.id_estado
                                            ) {
                                                /*
                                                 * Se colocan los datos en el array
                                                 */
                                                data.push([
                                                    item.municipio,
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
                                        var tabla = "#T4-" + anio + "-" + Estado;
                                        /*
                                         * Si el array tiene elementos
                                         */
                                        if (data.length > 0) {
                                            $("#body4-" + anio + "").append(
                                                '<div style="background-color: #621132" class="btn-gob col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h4>' + Est +', año agrícola: '+Anio+'</h4></div>' +
                                                /*
                                                 * Se crea la tabla
                                                 */
                                                '<div style="overflow-x:auto;">' +
                                                '<table id="T4-' +
                                                anio +
                                                "-" +
                                                Estado +
                                                '" class="table table-bordered nowrap"  width="100%">' +
                                                "<tfoot><tr>" +
                                                /*
                                                 * Se colocan los totales en el pie de la tabla
                                                 */
                                                '<td style="background-color:#52BE80" colspan="3" align="center"><b>Total general</b></th>' +
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
                                                        title: "Estado",
                                                    },
                                                    {
                                                        title: "Municipio",
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
                                                            numeral(Math.round(prod)).format("0,0") +
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
                                                            Est +
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
                                                            Est +
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
                                                                                Est +
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
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });
        var query2 = query + " GROUP by cultivo_id,id_organismo,id_estado"
        /*
         *
         * @type String
         * Variable para mandar los datos al controlador
         *
         */
        var cadena = "query=" + query2 + "&Accion=URTabla";
        /*
         * Se limpia el HTML y se coloca el encabezado
         */
        $("#nav-06").innerHTML = "";
        $("#nav-06").append(
            '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Concentrado nacional por cultivo, año agrícola: '+Anio+'</h3></div>'
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
            url: "/aplicacion/controlador/unidadriego.php",
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
                                            if (item.anio_id === anio && Cultivo === item.cultivo_id) {
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
                                                    item.estado,
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
                                                '<div style="background-color: #621132" class="btn-gob col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>' + JSON.parse(respC) +', año agrícola: '+Anio+'</h3></div>'
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
                                                        title: "Estado",
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
async function grafica1() {
    var Anio = $("#Anios :selected").text();
    //var cadena = "query=" + query2 + "&Accion=DTTTabla";
    document.getElementById("nav-04").innerHTML = "";
    $("#nav-04").append(
        '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Distribución de la superficie cosechada, año agrícola: '+Anio+'</h3></div>' +
        '<div class="row">' +
        '<div class="col-sm">' +
        '<div style="background-color: #621132" class="btn-gob col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h4>Superficie cosechada y valor de la producción, por organismo de cuenca, año agrícola: '+Anio+'</h4></div>' +
        '<canvas id="G-4"></canvas>' +
        '<canvas id="G-4-1"></canvas>' +
        "</div>" +
        "</div>"
    );
}

/**
 *
 * @param {type} query
 * @returns {undefined}
 * Graficas de la superfice cosechada por OC
 */
async function grafica4(query2) {
    console.log(query2);
    cadena = "query=" + query2 + "&Accion=URTabla";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/unidadriego.php",
        data: cadena,
        //Si el controlador devuelve una respuesta
        success: function (resp) {
            console.log(resp);
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

