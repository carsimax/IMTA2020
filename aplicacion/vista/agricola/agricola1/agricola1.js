/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 *
 *
 *  Este script es el encargado de realizar y mostrar toda la información relacionada con
 * la consulta de la estadística agrícola,
 *  específicamente el Informe estadístico de producción agrícola
 */

/**
 * Se aplica el estilo al select de organismo de cuenca
 */
citas = "";
query = '';
$("#Organismos").multiselect({
    columns: 1,
    search: true,
    selectAll: true,
    texts: {
        placeholder: "Seleccione un Organismo de Cuenca",
        search: "Buscar Organismos de Cuenca",
    },
});

/**
 * Se aplica el estilo para el select de los estados
 */
$("#Estados").multiselect({
    columns: 1,
    search: true,
    selectAll: true,
    texts: {
        placeholder: "Seleccione un Estado",
        search: "Buscar Estado",
    },
});

/**
 * Se aplica el estilo al select de los Distritos
 */
$("#Distritos").multiselect({
    columns: 1,
    search: true,
    selectAll: true,
    texts: {
        placeholder: "Seleccione un Distrito",
        search: "Buscar Distrito",
    },
});

/**
 *Se inicializa el multiselect  Ciclos agricolas
 */
$("#Ciclos").multiselect({
    columns: 1,
    search: true,
    selectAll: true,
    texts: {
        placeholder: "Seleccione un Ciclo Agrícola",
        search: "Buscar Ciclo",
    },
});

/**
 * Se inicializa el multiselect  Modalidades
 */
$("#Modalidades").multiselect({
    columns: 1,
    search: true,
    selectAll: true,
    texts: {
        placeholder: "Seleccione una Modalidad",
        search: "Buscar Modalidad",
    },
});

/**
 * Se inicializa el multiselect  Cultivos
 */
$("#Cultivos").multiselect({
    columns: 1,
    search: true,
    selectAll: true,
    texts: {
        placeholder: "Seleccione un Cultivo",
        search: "Buscar Cultivo",
    },
});

/**
 * Se inicializa el multiselect  Tenencias
 */
$("#Tenencias").multiselect({
    columns: 1,
    search: true,
    selectAll: true,
    texts: {
        placeholder: "Seleccione una Tenencia",
        search: "Buscar Tenencia",
    },
});


async function Anios() {
    await limpiarOrganismos();
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
    query = query.slice(0, -4) + ')';
    if (query !== "") {
        /**
         * controlador
         * @type {string}
         */
        const cadena = "query=" + query + "&Accion=getOrganismos";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/distritoriego.php",
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
                        name: item.organismo,
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
        query = query.slice(0, -4) + ')';
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
            const cadena = "query=" + query + "&Accion=getEstados";
            var data = [];
            /**
             * Se manda a llamar por medio de Ajax a la función de estados en el controlador de mapa
             */
            $.ajax({
                type: "POST",
                url: "/aplicacion/controlador/distritoriego.php",
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


async function Estados() {
    await limpiarEstados();
}

async function Tenencias() {
    $("#Distritos").multiselect("reset");
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
        $("#Ciclos option:selected").length != 0 &&
        $("#Modalidades option:selected").length != 0 &&
        $("#Tenencias option:selected").length != 0) {
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
        $("#Ciclos option:selected").each(function () {
            query += "ciclo_id=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') AND (';
        $("#Modalidades option:selected").each(function () {
            query += 'modalidad="' + $(this).val() + '" or ';
        });
        query = query.slice(0, -4) + ') AND (';
        $("#Tenencias option:selected").each(function () {
            query += "tenencia_id=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ')';
        const cadena = "query=" + query + "&Accion=getDRProduccion";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/distritoriego.php",
            data: cadena,
            /**
             * @param resp
             * Si el controlador devuelve la consulta se procederá con el proceso de interpretación de los datos
             */
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    /**
                     * Por medio del plugin de multiselect, podemos agregar los objetos del array al select de Distritos
                     */
                    data.push({
                        name: item.id_distrito_riego + " - " + item.nom_dr,
                        value: item.id_distrito_riego,
                        checked: false,
                    });
                });
                $("#Distritos").multiselect("loadOptions", data);
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
     */
    await deshabilitar();
    const OC = await selectOrganismo();
    const Est = await selectEst();
    const DR = await selectDR();
    const Anio = await selectAnio();
    const Mod = await selectMod();
    const Ciclo = await selectCiclo();
    const Tenencia = await selectTenencia();
    const Cultivo = await selectCultivo();
    /**
     * Se verifica que el query de Organismos ese vacio
     */
    if (OC !== "" && Est !== "" && DR !== "" && Mod !== "" && Ciclo !== "" && Cultivo !== "" && Anio !== "") {
        //AJAX que se encarga de extraer las citas de la información seleccionda
        cadena = "Accion=ConsultaAgricola&modulo_id=3&anios=" + Anio;
        citas = "\n ";
        $.ajax({
            type: "GET",
            url: "/aplicacion/controlador/catalogo.php",
            data: cadena,
            success: async function (resp) {
                document.getElementById("lista").innerHTML = "";
                $.each(JSON.parse(resp), function (index, item) {
                    citas += item.cita + " \n";
                    $("#lista").append("<li>" + item.cita + "</li>");
                });
                /**
                 *
                 * @type String
                 * Se crea la variable con la sentencia que se va a mandar al controlador
                 *
                 */
                query = "(" + OC + ") AND (" + Est + ") AND (" + DR + ") AND (" + Anio + ") AND (" + Mod + ") AND (" + Ciclo + ") AND (" + Tenencia + ") AND (" + Cultivo + ")";
                /**
                 *
                 * @returns {Promise<void>}
                 * Esta funcion es la que se encarga de mostrar el primer desgloce.
                 *
                 */
                await desgloce1(query);
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
            Historial();
        });
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
 * @returns {Promise<void>}
 * @constructor
 * Funcion para guardar la consulta en el historial
 */
async function Historial() {
    /**
     *
     * Guardamos en es historial
     *
     */
    cadena = "Modulo=Estadística Agrícola" + "&Accion=Historial";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/mapa.php",
        data: cadena,
        /**
         *
         * @param {type} resp
         * @returns {Boolean}
         * Si el controlador devuelve una respuesta
         *
         */
        success: function (resp) {
            return true;
        },
    });
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
    $("#Distritos").multiselect("reset");
    await limpiarDR();
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
    $("#Ciclos").multiselect("reset2");
    $("#Modalidades").multiselect("reset2");
    $("#Tenencias").multiselect("reset2");
}

/**
 * Funcion que concatena los estados seleccionados del select
 * @returns {Promise<string>}
 */
async function concatEstado() {
    /*prueba prueba prueba */

    var query = "";
    query = "(" + (await concatOrganismo()) + ")";
    query = query + "AND (";

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
async function selectDR() {
    var DR = "";
    $("#Distritos option:selected")
        .each(async function () {
            DR += 'distrito_riego_id="' + $(this).val() + '" or ';
        })
        .promise()
        .always(async function () {
            DR = DR.slice(0, -3);
        });
    return DR;
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
 * @returns {selectMod.Modalidades|String}
 * Funcion que obtiene las modalidades seleccionadas
 *
 */
async function selectMod() {
    var Modalidades = "";
    $("#Modalidades option:selected")
        .each(async function () {
            Modalidades += 'modalidad="' + $(this).val() + '" or ';
        })
        .promise()
        .always(async function () {
            Modalidades = Modalidades.slice(0, -3);
        });
    return Modalidades;
}

/**
 *
 * @returns {selectCiclo.Ciclos|String}
 * Funcion que obtiene los ciclos seleccionados
 *
 */
async function selectCiclo() {
    var Ciclos = "";
    $("#Ciclos option:selected")
        .each(async function () {
            Ciclos += "ciclo_id=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            Ciclos = Ciclos.slice(0, -3);
        });
    return Ciclos;
}

/**
 *
 * @returns {selectTenencia.Tenencias|String}
 * Funciones que obtienen lasa tenencias seleccionadas
 *
 */
async function selectTenencia() {
    var Tenencias = "";
    $("#Tenencias option:selected")
        .each(async function () {
            Tenencias += "tenencia_id=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            Tenencias = Tenencias.slice(0, -3);
        });
    return Tenencias;
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
 * @param {type} query
 * @returns {undefined}
 * Desgloce por Organismo
 * Funcion que muestra el primer desgloce de informacion estadistica
 */
async function desgloce1(query) {
    var Anio = $("#Anios :selected").text();
    var query2 = query + " GROUP by id_organismo,anio_id"
    /**
     *
     * @type String
     * Se crea una variable que se guarda el query y la accion que va a realizar el controlador
     */
    var cadena = "query=" + query2 + "&Accion=DistritosOC";
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
        '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Concentrado de producción agrícola de los Distritos de Riego por Organismo de Cuenca '+Anio+'</h3></div>'
    );
    /**
     * Funcion de ajax que se encarga de obtener la informacion
     *
     */
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/mapa.php",
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
                    numeral((item.PROD / 1000).toFixed(2)).format("0,0.00"),
                    numeral((item.VAL / 1000000).toFixed(2)).format("0,0.00"),
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
                    '<div style="overflow-x:auto;">'+
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
                    numeral(parseFloat(PROD / 1000).toFixed(2)).format("0,0.00") +
                    "</b></td>" +
                    '<td style="background-color:#CCD1D1" align="right"><b>' +
                    numeral(parseFloat(VAL / 1000000).toFixed(2)).format("0,0.00") +
                    "</b></td>" +
                    '<td style="background-color:#CCD1D1" align="right" ><b>' +
                    numeral(parseFloat(PROD / COS).toFixed(2)).format("0,0.00") +
                    "</b></td>" +
                    '<td style="background-color:#CCD1D1" align="right"><b>' +
                    numeral(Math.round(VAL / PROD)).format("0,0.00") +
                    "</b></td>" +
                    "</tr></tfoot></table>"+
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
                            title: "Producción (miles ton)",
                        },
                        {
                            title: "Valor de la cosecha (millones $)",
                        },
                        {
                            title: "Rend. (ton/ha)",
                        },
                        {
                            title: "P.M.R ($/ton)",
                        },
                    ],
                    columnDefs: [
                        {className: 'dt-body-right', targets: [1, 2, 3, 4, 5, 6]},
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
                                "Concentrado de producción agrícola de los distritos de riego por organismo de cuenca",
                            className: "btn btn-gob btn-sm",
                            text: "Exportar Excel",
                        },
                        {
                            extend: "pdfHtml5",
                            title:
                                "Concentrado de producción agrícola de los distritos de riego por organismo de cuenca",
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
                                                    "Concentrado de producción agrícola de los distritos de riego por organismo de cuenca",
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
    }).always(function () {
        Swal.close();
    }); //Fin del ajax de la obtencion de los datos
} //Fin de la funcion del desgloce 1

/**
 *
 * @param {type} query
 * @returns {undefined}
 * Funcion para el desgloce distrital
 *
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
        var query2 = query + " GROUP by id_organismo,anio_id,distrito_riego_id ORDER by id_organismo"
        /**
         *
         * @type String
         * Creacion de la cadena para el desgloce 2
         */
        var cadena = "query=" + query2 + "&Accion=DistritosOC";
        /**
         * Se limpia el html y se coloca el encabezados
         */
        document.getElementById("nav-02").innerHTML = "";
        $("#nav-02").append(
            '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Concentrado distrital '+Anio+'</h3></div>'
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
            url: "/aplicacion/controlador/mapa.php",
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
                $("#nav-02").append(
                    '<div class="panel-body" id="body2"></div>'
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
                            var OC = '';
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
                                        item.distrito_riego_id + ". " + item.nom_dr,
                                        numeral(Math.round(item.SEM)).format("0,0"),
                                        numeral(Math.round(item.COS)).format("0,0"),
                                        numeral(Math.round(item.PROD)).format("0,0.00"),
                                        numeral((item.VAL / 1000).toFixed(2)).format("0,0.00"),
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
                            var tabla = "#T2-" + rha;
                            /**
                             * Si el array  contiene datos
                             */
                            if (data.length > 0) {
                                /*
                                 * Se cocola en encabezado y la tabla del respectivo OC
                                 */
                                $("#body2").append(
                                    '<h4> <b>Organismo de cuenca: </b>' + OC + ' '+Anio+'</h4>' +
                                    '<div style="overflow-x:auto;">'+
                                    '<table id="T2-' + rha + '" class="table table-bordered nowrap" style="width:100%">' +
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
                                    numeral(parseFloat(VAL / 1000).toFixed(2)).format(
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
                                    "</tr></tfoot></table>"+
                                    '</div><hr>'

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
                                            title: "Distrito de riego",
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
        }).always(function () {
            Swal.close();
        }); //Fin del AJAX para obtener los datos
    }
} //Fin de la funcion del desgloce 2

/**
 *
 * @param {type} query
 * @returns {undefined}
 * Funcion para mostrar Desgloce por entidad federativa.
 */
async function desgloce3() {
    var Anio = $("#Anios :selected").text();
    if (!$("#nav-03").html()) {
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
        var cadena = "query=" + query2 + "&Accion=DistritosOC";
        /*
         * Se limpia el HTML y se coloca el encabezado
         */
        document.getElementById("nav-03").innerHTML = "";
        $("#nav-03").append(
            '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Concentrado Concentrado Agrícola por Entidad Federativa '+Anio+'</h3></div>'
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
            url: "/aplicacion/controlador/mapa.php",
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
                var tabla = "#T3";
                /*
                 * Si existen los datos en el array
                 */
                if (data.length > 0) {
                    $("#nav-03").append(
                        /*
                         * Se coloca el encabezado del anio
                         */
                        '<div class="panel-body">' +
                        /*
                         * Se coloca la tabla
                         */
                        '<div style="overflow-x:auto;">' +
                        '<table id="T3" class="table table-bordered  nowrap"  width="100%">' +
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
                                title: "Producción)",
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
                                    "Concentrado Concentrado Agrícola por Entidad Federativa",
                                className: "btn btn-gob btn-sm",
                                text: "Exportar Excel",
                            },
                            {
                                extend: "pdfHtml5",
                                title:
                                    "Concentrado Concentrado Agrícola por Entidad Federativa",
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
                                                        "Concentrado Concentrado Agrícola por Entidad Federativa",
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
 * Funcion Desgloce por cultivo y DR
 */
async function desgloce4() {
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
        var query2 = query + " GROUP by modalidad,distrito_riego_id,ciclo_id,cultivo_id ORDER BY ciclo_id,modalidad,cultivo"
        /*
         *
         * @type String
         * Variable con los datos a enviar al controlador
         */
        var cadena = "query=" + query2 + "&Accion=DistritosOC";
        /*
         * Se limpia el html y se coloca el encabezado
         */
        document.getElementById("nav-05").innerHTML = "";
        $("#nav-05").append(
            '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Estadística agrícola por distrito de riego'+Anio+'</h3></div>'
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
            url: "/aplicacion/controlador/mapa.php",
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
                 * Se coloca la seccion del anio seleccionado
                 */
                $("#nav-05").append(
                    '<div class="panel-body" id="body4"></div>'
                );
                /*
                 * Se itera sobre los DR seleccionados
                 */
                $("#Distritos option:selected").each(async function () {
                    var DR = $(this).val();
                    cadena = "id=" + DR + "&Accion=DR";
                    /*
                     * Ajax para obtener el nombre del distrito de riego
                     */
                    $.ajax({
                        type: "POST",
                        url: "/aplicacion/controlador/mapa.php",
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
                                DRS += item.id_distrito_riego + " ";
                                DRS += item.nom_dr + ", ";
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
                                if (DR === item.distrito_riego_id) {
                                    /*
                                     * Se colocan los datos en el array
                                     */
                                    data.push([
                                        item.ciclo,
                                        item.modalidad,
                                        item.cultivo,
                                        numeral(Math.round(item.SEM)).format("0,0"),
                                        numeral(Math.round(item.COS)).format("0,0"),
                                        numeral(Math.round(item.PROD)).format("0,0.00"),
                                        numeral((item.VAL / 1000).toFixed(2)).format("0,0.00"),
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
                                }
                            });
                            /*
                             *
                             * @type String
                             * Se crea la variable para la tabla creada
                             */
                            var tabla = "#T4-" + DR;
                            /*
                             * Si el array tiene elementos
                             */
                            if (data.length > 0) {
                                $("#body4").append(
                                    '<h4>' + DRS +' '+Anio+'</h4>' +
                                    /*
                                     * Se crea la tabla
                                     */
                                    '<div style="overflow-x:auto;">'+
                                    '<table id="T4-' + DR + '" class="table table-bordered nowrap"  width="100%">' +
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
                                    numeral(parseFloat(VAL / 1000).toFixed(2)).format(
                                        "0,0.00"
                                    ) +
                                    "</b></td>" +
                                    '<td style="background-color:#52BE80" align="right" ><b>' +
                                    numeral(parseFloat(PROD / COS).toFixed(2)).format(
                                        "0,0.00"
                                    ) +
                                    "</b></td>" +
                                    '<td style="background-color:#52BE80" align="right"><b>' +
                                    numeral(Math.round(VAL / PROD)).format("0,0.00") +
                                    "</b></td>" +
                                    "</tr></tfoot></table>"+
                                    '</div><hr>'

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
                                        {targets: [0], visible: false},
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
                                            title: "Concentrado distrito " + DRS,
                                            className: "btn btn-gob btn-sm",
                                            text: "Exportar Excel",
                                        },
                                        {
                                            extend: "pdfHtml5",
                                            title: "Concentrado distrito " + DRS,
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
                                                                text:"Concentrado distrito " + DRS ,
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
async function desgloce5() {
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
        var query2 = query + " GROUP by cultivo_id,id_organismo,distrito_riego_id"
        /*
         *
         * @type String
         * Variable para mandar los datos al controlador
         *
         */
        var cadena = "query=" + query2 + "&Accion=DistritosOC";
        /*
         * Se limpia el HTML y se coloca el encabezado
         */
        $("#nav-06").innerHTML = "";
        $("#nav-06").append(
            '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Concentrado nacional por cultivo'+Anio+'</h3></div>'
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
            url: "/aplicacion/controlador/mapa.php",
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
                 * Se coloca la seccion del anio
                 */
                $("#nav-06").append(
                    '<div class="panel-body" id="body5"></div>'
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
                                if (Cultivo === item.cultivo_id) {
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
                                        VAL1 = item.VAL / 1000;
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
                                        item.distrito_riego_id + ". " + item.nom_dr,
                                        numeral(Math.round(item.SEM)).format("0,0"),
                                        numeral(Math.round(item.COS)).format("0,0"),
                                        numeral(Math.round(item.PROD)).format("0,0.00"),
                                        numeral(VAL1.toFixed(2)).format("0,0.00"),
                                        numeral(REND1).format("0,0.00"),
                                        numeral(Math.round(PMR1)).format("0,0.00"),
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
                            var tabla = "#T5-" + Cultivo;
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
                                $("#body5").append(
                                    '<h4>' + JSON.parse(respC)+' '+Anio+'</h4>'
                                );
                                /*
                                 * Se coloca la tabla
                                 */
                                $("#body5").append(
                                    '<div style="overflow-x:auto;">'+
                                    '<table id="T5-' + Cultivo + '" class="table table-bordered nowrap"  width="100%">' +
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
                                    "</tr></tfoot></table>"+
                                    '</div><hr>'
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
                                            title: "Distrito de riego",
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
                                                numeral(Math.round(prod)).format("0,0") +
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
                                        {targets: [0], visible: false},
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
                                                JSON.parse(respC),
                                            className: "btn btn-gob btn-sm",
                                            text: "Exportar Excel",
                                        },
                                        {
                                            extend: "pdfHtml5",
                                            title:
                                                "Concentrado distrito " +
                                                JSON.parse(respC),
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
                                                                    JSON.parse(respC),
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
    var anio = $("#Anios option:selected").text();
    var cadena = "query=" + query2 + "&Accion=DistritosOC";
    document.getElementById("nav-04").innerHTML = "";
    /*
     * Ajax para obtener los datos para la grafica
     */
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/mapa.php",
        data: cadena,
        /*
         *S i el controlador devuelve una respuesta
         */
        success: function (resp) {
            /*
             * Se coloca el bloque respectivo al anio y los canvas para colocar las graficas
             */
            $("#nav-04").append(
                '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Distribución de la superficie cosechada '+anio+'</h3></div>' +
                '<div class="row">' +
                '<div class="col-sm">' +
                '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h4>Ciclo agrícola / <b>Año Agrícola: </b>'+anio+'</h4></div>' +
                '<canvas id="G-1"></canvas>' +
                "</div>" +
                "</div>" +
                '<div class="row">' +
                '<div class="col-sm">' +
                '<div class="col-sm-6 pt-3 pb-2 mb-3 border-bottom"><h4>Tenencia de la tierra / <b>Año Agrícola: </b>'+anio+'</h4></div>' +
                '<canvas id="G-2"></canvas>' +
                "</div>" +
                '<div class="col-sm">' +
                '<div class="col-sm-6 pt-3 pb-2 mb-3 border-bottom"><h4>Modalidad de agricultura / <b>Año Agrícola: </b>'+anio+'</h4></div>' +
                '<canvas id="G-3"></canvas>' +
                "</div>" +
                "</div>" +
                '<div class="row">' +
                '<div class="col-sm">' +
                '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h4>Superficie cosechada y valor de la producción, por organismo de cuenca / <b>Año Agrícola: </b>'+anio+'</h4></div>' +
                '<canvas id="G-4"></canvas>' +
                '<canvas id="G-4-1"></canvas>' +
                "</div>" +
                "</div>" +
                '<div class="row">' +
                '<div class="col-sm">' +
                '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h4>Distribución de la superficie cosechada por organismo de cuenca, según la tenencia de tierra / <b>Año Agrícola: </b>'+anio+'</h4></div>' +
                '<canvas id="G-5"></canvas>' +
                "</div>" +
                "</div>" +
                '<div class="row">' +
                '<div class="col-sm">' +
                '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h4>Superficie cosechada por modalidad de agricultura (riego o temporal) / <b>Año Agrícola: </b>'+anio+'</h4></div>' +
                '<canvas id="G-6"></canvas>' +
                "</div>" +
                "</div>" +
                '<div class="row">' +
                '<div class="col-sm">' +
                '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h4>Distribución de la superficie cosechada por organismo de cuenca y ciclo agrícola / <b>Año Agrícola: </b>'+anio+'</h4></div>' +
                '<canvas id="G-7"></canvas>' +
                "</div>" +
                "</div>" +
                '<div class="row">' +
                '<div class="col-sm">' +
                '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h4>Distribución por entidad federativa de la superficie cosechada por modalidad de agricultura / <b>Año Agrícola: </b>'+anio+'</h4></div>' +
                '<canvas id="G-8"></canvas>' +
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
                        "Segundos Cultivos",
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
                                ((SC * 100) / total).toFixed(2),
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
 * Funcion para las graficas por  tipo de tenencia
 */
async function grafica2(query2) {
    cadena = "query=" + query2 + "&Accion=DistritosOC";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/mapa.php",
        data: cadena,
        //Si el controlador devuelve una respuesta
        success: function (resp) {
            var total = 0;
            var Particular = 0;
            var Social = 0;
            $.each(JSON.parse(resp), function (index, item) {
                total += parseFloat(item.COS);
                switch (item.tenencia_id) {
                    case "1":
                        Social = item.COS;
                        break;
                    case "2":
                        Particular = item.COS;
                        break;
                }
            });
            var element = "G-2";
            new Chart(document.getElementById(element), {
                type: "pie",
                data: {
                    labels: ["Particular", "Social"],
                    datasets: [
                        {
                            backgroundColor: ["#E74C3C", "#154360"],
                            data: [
                                ((Particular * 100) / total).toFixed(2),
                                ((Social * 100) / total).toFixed(2),
                            ],
                        },
                    ],
                },
                options: {
                    title: {
                        display: true,
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
 * Graficas por tipo de modalidad
 */
async function grafica3(query2) {
    cadena = "query=" + query2 + "&Accion=DistritosOC";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/mapa.php",
        data: cadena,
        //Si el controlador devuelve una respuesta
        success: function (resp) {
            var total = 0;
            var Temp = 0;
            var Riego = 0;
            $.each(JSON.parse(resp), function (index, item) {
                total += parseFloat(item.COS);
                switch (item.modalidad) {
                    case "Temporal":
                        Temp = item.COS;
                        break;
                    case "Riego":
                        Riego = item.COS;
                        break;
                }
            });
            var element = "G-3";
            new Chart(document.getElementById(element), {
                type: "pie",
                data: {
                    labels: ["Temporal", "Riego"],
                    datasets: [
                        {
                            backgroundColor: ["#E67E22", "#F4D03F"],
                            data: [
                                ((Temp * 100) / total).toFixed(2),
                                ((Riego * 100) / total).toFixed(2),
                            ],
                        },
                    ],
                },
                options: {
                    title: {
                        display: true,
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
 * Graficas de la superfice cosechada por OC
 */
async function grafica4(query2) {
    cadena = "query=" + query2 + "&Accion=DistritosOC";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/mapa.php",
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
            while (Cosechada.includes(0)){
                var posicion=Cosechada.indexOf(0);
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
            while (Prod.includes(0)){
                var posicion=Prod.indexOf(0);
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
 * Funcion de la Distribución de la superficie cosechada por organismo de cuenca,según la tenencia de tierra
 *
 */
async function grafica5(query2) {
    cadena = "query=" + query2 + "&Accion=DistritosOC";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/mapa.php",
        data: cadena,
        //Si el controlador devuelve una respuesta
        success: function (resp) {
            var Social = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var Particular = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            $.each(JSON.parse(resp), function (index, item) {
                $("#Organismos option:selected").each(async function () {
                    if (item.id_organismo === $(this).val() && item.tenencia_id === "1") {
                        Social[$(this).val() - 1] = item.COS / 1000;
                    }
                    if (item.id_organismo === $(this).val() && item.tenencia_id === "2") {
                        Particular[$(this).val() - 1] = item.COS / 1000;
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
            var i=0
            var bandera=true;
            while (bandera){
                if(Social[i]=== Particular[i]){
                    Social.splice(i, 1);
                    Particular.splice(i, 1);
                    etiquetas.splice(i, 1);
                    i=0;
                }else{
                    i++;
                }
                if (i=== (Social.length)){
                    bandera=false;
                }
            }
            var element = "G-5";
            new Chart(document.getElementById(element), {
                type: "bar",
                data: {
                    labels: etiquetas,
                    datasets: [
                        {
                            label: "Social",
                            data: Social,
                            backgroundColor: "#F39C12", // green
                        },
                        {
                            label: "Particular",
                            data: Particular,
                            backgroundColor: "#154360", // yellow
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

/**
 *
 * @param {type} query
 * @returns {undefined}
 * Funcion para Superficie cosechada por modalidad de agricultura (riego o temporal)
 */
async function grafica6(query2) {
    cadena = "query=" + query2 + "&Accion=DistritosOC";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/mapa.php",
        data: cadena,
        //Si el controlador devuelve una respuesta
        success: function (resp) {
            var Riego = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var Temporal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            $.each(JSON.parse(resp), function (index, item) {
                $("#Organismos option:selected").each(async function () {
                    if (
                        item.id_organismo === $(this).val() &&
                        item.modalidad === "Riego"
                    ) {
                        Riego[$(this).val() - 1] = item.COS / 1000;
                    }
                    if (
                        item.id_organismo === $(this).val() &&
                        item.modalidad === "Temporal"
                    ) {
                        Temporal[$(this).val() - 1] = item.COS / 1000;
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
            var i=0
            var bandera=true;
            while (bandera){

                if(Riego[i]=== Temporal[i]){
                    Riego.splice(i, 1);
                    Temporal.splice(i, 1);
                    etiquetas.splice(i, 1);
                    i=0;
                }else{
                    i++;
                }
                if (i=== (Riego.length)){
                    bandera=false;
                }
            }
            //console.log(Riego);
            //console.log(Temporal);
            etiquetas = [...new Set(etiquetas)];
            var element = "G-6";
            new Chart(document.getElementById(element), {
                type: "bar",
                data: {
                    labels: etiquetas,
                    datasets: [
                        {
                            label: "Riego",
                            data: Riego,
                            backgroundColor: "#F39C12", // green
                        },
                        {
                            label: "Temporal",
                            data: Temporal,
                            backgroundColor: "#154360", // yellow
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

/**
 *
 * @param {type} query
 * @returns {undefined}
 * Funcion para Distribución de la superficie cosechada por organismo de cuenca y ciclo agrícola
 */
async function grafica7(query2) {
    cadena = "query=" + query2 + "&Accion=DistritosOC";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/mapa.php",
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
            var i=0
            var bandera=true;
            while (bandera){
                if(OI[i]===PV[i] && PV[i]===P[i] && P[i]===SC[i]){
                    OI.splice(i, 1);
                    PV.splice(i, 1);
                    P.splice(i, 1);
                    SC.splice(i, 1);
                    etiquetas.splice(i, 1);
                    i=0;
                }else{
                    i++;
                }
                if (i=== (OI.length)){
                    bandera=false;
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

/**
 *
 * @param {type} query
 * @returns {undefined}
 * Funcion para Distribución por entidad federativa de la superficie cosechada por modalidad de agricultura (riego/temporal)
 */
async function grafica8(query2) {
    cadena = "query=" + query2 + "&Accion=DistritosOC";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/mapa.php",
        data: cadena,
        //Si el controlador devuelve una respuesta
        success: function (resp) {
            var Riego = [];
            var Temporal = [];

            for (var i = 0; i < 33; i++) {
                Riego.push(0);
                Temporal.push(0);
            }

            $.each(JSON.parse(resp), function (index, item) {
                $("#Estados option:selected").each(async function () {
                    if (item.id_estado === $(this).val() && item.modalidad === "Riego") {
                        Riego[$(this).val() - 1] = item.COS / 1000;
                    }
                    if (
                        item.id_estado === $(this).val() &&
                        item.modalidad === "Temporal"
                    ) {
                        Temporal[$(this).val() - 1] = item.COS / 1000;
                    }
                });
            });
            var etiquetas = [
                "AGS.",
                "BC.",
                "BCS.",
                "CAMP.",
                "COAH.",
                "COL.",
                "CHIS.",
                "CHIH.",
                "CDMX.",
                "DGO.",
                "GTO.",
                "GRO.",
                "HGO.",
                "JAL.",
                "EDOMEX.",
                "MICH.",
                "MOR.",
                "NAY.",
                "NL.",
                "OAX.",
                "PUE.",
                "QRO.",
                "Q.ROO.",
                "SLP.",
                "SIN.",
                "SON.",
                "TAB.",
                "TAMPS.",
                "TLAX.",
                "VER.",
                "YUC.",
                "ZAC.",
                "LAGUNERA.",
            ];
            var i=0
            var bandera=true;
            while (bandera){

                if(Riego[i]=== Temporal[i]){
                    Riego.splice(i, 1);
                    Temporal.splice(i, 1);
                    etiquetas.splice(i, 1);
                    i=0;
                }else{
                    i++;
                }
                if (i=== (Riego.length)){
                    bandera=false;
                }
            }
            etiquetas = [...new Set(etiquetas)];
            var element = "G-8";
            new Chart(document.getElementById(element), {
                type: "bar",
                data: {
                    labels: etiquetas,
                    datasets: [
                        {
                            label: "Riego",
                            data: Riego,
                            backgroundColor: "#F39C12", // green
                        },
                        {
                            label: "Temporal",
                            data: Temporal,
                            backgroundColor: "#154360", // yellow
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
    }).always(function () {
        Swal.close();
    });
}

async function getCultivos() {
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Cargando Datos",
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    $("#Cultivos").multiselect("reset");
    if ($("#Distritos option:selected").length != 0) {
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
        $("#Ciclos option:selected").each(function () {
            query += "ciclo_id=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') AND (';
        $("#Modalidades option:selected").each(function () {
            query += 'modalidad="' + $(this).val() + '" or ';
        });
        query = query.slice(0, -4) + ') AND (';
        $("#Tenencias option:selected").each(function () {
            query += "tenencia_id=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') AND (';
        $("#Distritos option:selected").each(function () {
            query += 'id_distrito_riego="' + $(this).val() + '" or ';
        });
        query = query.slice(0, -4) + ')';
        const cadena = "query=" + query + "&Accion=CultivosConsulta";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/cultivo.php",
            data: cadena,
            //Si el controlador devuelve una respuesta
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    data.push({
                        name: item.cultivo,
                        value: item.id_cultivo,
                        checked: false,
                    });
                });
                $("#Cultivos").multiselect("loadOptions", data);
            },
        }).always(function () {
            Swal.close();
        });
    } else {
        Swal.close();
    }
}


/**
 *
 * @returns {undefined}
 * Funcion que se encarga de mostrar las graficas de estadistica
 */
async function mostrarG1() {
    if (!$("#nav-04").html()) {
        Swal.fire({
            title: "Por favor espere", // add html attribute if you want or remove
            html: "Cargando contenido",
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });
        var query1 = query + " GROUP by ciclo";
        await grafica1(query1);
        var query2 = query + " GROUP by tenencia_id";
        await grafica2(query2);
        var query3 = query + " GROUP by modalidad";
        await grafica3(query3);
        var query4 = query + " GROUP BY id_organismo";
        await grafica4(query4);
        var query5 = query + " GROUP BY id_organismo,tenencia_id";
        await grafica5(query5);
        var query6 = query + " GROUP BY id_organismo,modalidad";
        await grafica6(query6);
        var query7 = query + " GROUP BY id_organismo,id_ciclo";
        await grafica7(query7);
        var query8 = query + " GROUP BY id_estado,modalidad ORDER BY id_estado";
        await grafica8(query8);
    }
}
