/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */
/* global layerscontrol, capaOrganismo, capaEstado, capaPresa, table, moment, tableV, map, shp */
// alert(typeof($('#Organismos').val()));

// Se aplica estilo a los selects
setEstiloSelect('#Organismos', 'Organismos de Cuenca', 'Buscar Organismo');
setEstiloSelect('#Estados', 'Estados', 'Buscar Estado');
setEstiloSelect('#Presas', 'Presas', 'Buscar Presa');



/**
 * Esta función controla todos los cambios del select de organismos de cuenca.
 * La función básicamente lo que realiza es leer todas las opciones seleccionadas desde la vista,
 * limpia las capas del mapa, limpia los select que dependen de él, prepara una sentencia MySQL y
 * retorna en este caso los estados que dependen de un organismo de cuenta además de los shapes de los organismos.
 * @constructor
 */

async function Organismos() {
    await limpiarOrganismos();
    const query = await concatOrganismo();
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
        const cadena = "query=" + query + "&Accion=Estados";
        var data = [];
        /**
         * Se manda a llamar por medio de Ajax a la función de estados en el controlador de mapa
         */
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/mapa.php",
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
}

/**
 * Esta función controla todos los cambios del select de estados.
 * La función básicamente lo que realiza es leer todas las opciones seleccionadas desde la vista,
 * limpia las capas del mapa, limpia los select que dependen de él, prepara una sentencia MySQL y
 * retorna en este caso los Presas que dependen de un organismo de cuenta además de los shapes de los organismos.
 * @constructor
 */
async function Estados() {
    await limpiarEstados();
    const query = await concatEstado();
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
        const cadena = "query=" + query + "&Accion=Presas(Estado)";
        var data = [];
        /**
         * Se manda a llamar por medio de Ajax a la función de estados en el controlador de mapa
         */
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/mapa.php",
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
                     * Por medio del plugin de multiselect, podemos agregar los objetos del array al select de Presas
                     */
                    data.push({
                        name: item.nom_oficial,
                        value: item.id_presa,
                        checked: false,
                    });
                });
                $("#Presas").multiselect("loadOptions", data);
            },
        }).always(function () {
            Swal.close();
        });
    } else {
        Swal.close();
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
     * Cargamos los OC
     */
    getOC_SIG(function () {
        /**
         * Cargamos los estados
         */
        getEst_SIG(function () {
            /**
             * Cargamos las presas
             */
            getPresa_SIG(function () {
                /**
                 * Colocamos los Layers
                 */
                var overlays = {
                    "Organismos de Cuenca": GroupoOCSelect,
                    "Estados": GroupoEstSelect,
                    "Presas": GroupoPresaSelect,
                }
                var lc = L.control.layers(null, overlays);
                lc.addTo(map);
                Swal.close();
            });
        });
    });
}

async function Consultar() {
    Swal.fire({
        title: "Por favor espere",
        html: "Cargando realizando consulta", // add html attribute if you want or remove
        allowEscapeKey: false,
    allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    }); 
    /**
     * Limpiamos la parte de Presas
     */
    await deshabilitar();
    await limpiarPresa();
    var OC = "";
    var Est = "";
    var Pres = "";
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //-------------------------Organismos de Cuenca-----------------------------
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //Colocamos los shapes
    $("#Organismos option:selected")
        .each(async function () {
            OC += "id_organismo=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            OC = OC.slice(0, -3);
        });
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //--------------------------------Estados-----------------------------------
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------

    await $("#Estados option:selected")
        .each(async function () {
            Est += "id_estado=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            Est = Est.slice(0, -3);
        });

    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //--------------------------------Presas-----------------------------------
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    await $("#Presas option:selected")
        .each(async function () {
            Pres += "id_presa=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            Pres = Pres.slice(0, -3);
        });

    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //-----------------------Busqueda TABULAR-----------------------------------
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    /**
     * Se verifica que el query de Organismos ese vacio
     */
    if (Pres !== "" && OC !== "" && Est !== "") {
        //Se obtiene la cita con la información de las presas
        data = "Accion=getCitaConsulta&modulo_id=2";
        citas = construirReferencias(data, false);

        const query = Pres + " GROUP by id_presa";
        var cadena = "query=" + query + "&Accion=Presas";
        data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/mapa.php",
            data: cadena,
            //Si el controlador devuelve una respuesta
            success: async function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    data.push([
                        item.id_presa,
                        item.nombre_oficial,
                        item.nom_comun,
                        item.corriente,
                        item.nombre,
                        item.anio_term,
                    ]);
                });
                table.destroy();
                table = $("#tablaPresa").DataTable({
                    data: data,
                    columnDefs: [
                        { className: 'dt-body-right', targets: [5] },
                        {
                            targets: 0,
                            data: null,
                            defaultContent:
                                '<button class="btn btn-gob text-ligth  btn-block"><i class="fas fa-water"></i></button>',
                        },
                    ],
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
                                                    { text: page.toString() },
                                                    " de ",
                                                    { text: pages.toString() },
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
        }).always(async function () {
            await habilitar();
            await Swal.close();
        });
    } else {
        swal(
            "Algo está mal.",
            "Todos los filtros tienen que tener al menos un elemento seleccionado"
        );
        await habilitar();
        await $("#pantalla").hide();
        await $("#pantalla2").hide();
        await $("#divPrioridad").hide();
        $("#botonMapa").hide();
        await Swal.close();
    }
    await Historial();
}

async function Historial() {
    //Guardamos en es historial
    cadena = "Modulo=Presas" + "&Accion=Historial";
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
 * Funcion que limpia la capa de organimos asi como de las capas que dependen directamente de ellas
 */
async function limpiarOrganismos() {
    /**
     * Limpia la capa de la cual dependen de organismos
     */
    $("#Estados").multiselect("reset");
    await limpiarEstados();
}

/**
 * Funcion para limpiar la capa de estados
 */
async function limpiarEstados() {
    /**
     * Llamos a limpiar Presifero
     */
    $("#Presas").multiselect("reset");
    await limpiarPresa();
}

/**
 * Funcion para limpiar la capa de Presas
 */
async function limpiarPresa() {
    map.off();
    map.remove();
    crearMapa();
    /**
     * Se limpia la tabla de Presas
     */
    table.clear().draw();
    tableV.clear().draw();
    $("#pantalla").hide();
    $("#botonMapa").hide();
    $("#pantalla2").hide();
    $("#divPrioridad").hide();
}

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function deshabilitar() {
    $("#consultar").prop("disabled", true);
    $("#pantalla").hide();
    $("#pantalla2").hide();
    $("#divPrioridad").hide();
    $("#botonMapa").hide();
}

function habilitar() {
    $("#consultar").prop("disabled", false);
    $("#pantalla").show();
    $("#pantalla2").show();
    $("#divPrioridad").show();
    $("#botonMapa").show();
}

/**
 * Funcion que concatena la cadena de los acuiferos seleccionadoss
 * @returns {Promise<string>}
 */
async function concatOrganismo() {
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
    var query = "";
    /**
     * Se tiene que recorrer el select de organismos de cuenca para encontrar todos los elementos seleccionados.
     */
    $("#Estados option:selected").each(function () {
        query += "edo_id=" + $(this).val() + " or ";
    });
    /**
     * Al final el query quedara con un or al final, la siguiente línea quita ese or sobrante.
     * @type {string}
     */
    query = query.slice(0, -3);
    return query;
}
