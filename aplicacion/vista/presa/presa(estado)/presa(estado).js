/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */

// Se aplica estilo a los selects
setEstiloSelect('#Organismos', 'Organismos de Cuenca', 'Buscar Organismo');
setEstiloSelect('#Estados', 'Estados', 'Buscar Estado');
setEstiloSelect('#Presas', 'Presas', 'Buscar Presa');

async function Organismos() {
    await limpiarOrganismos();
    const query = await concatOrganismo();
    if (query !== "") {
        const cadena = "query=" + query + "&Accion=Estados";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/mapa.php",
            data: cadena,
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    data.push({
                        name: item.estado,
                        value: item.id_estado,
                        checked: false,
                    });
                });
                $("#Estados").multiselect("loadOptions", data);
            },
        });
    }
}

function Estados() {
    isFormCompleted('#Estados');
}

async function loadShape() {
    await map.off();
    await map.remove();
    crearMapa();
    alertaCargando("Por favor espere", "Cargando mapa geoespacial");
    getOC_SIG(function () {
        getEst_SIG(function () {
            getPresa_SIG(function () {
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
    alertaCargando("Por favor espere", "Realizando consulta");
    deshabilitar();
    var OC = "(";
    var Est = "(";
    await $("#Organismos option:selected")
        .each(async function () {
            OC += "id_organismo=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            OC = OC.slice(0, -3);
            OC += ")";
        });

    await $("#Estados option:selected")
        .each(async function () {
            Est += "id_estado=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            Est = Est.slice(0, -3);
            Est += ")";
        });
    if (OC !== "" && Est !== "") {
        //Se obtiene la cita con la información de las presas
        data = "Accion=getCitaConsulta&modulo_id=2";
        citas = construirReferencias(data, false);
        var query = "query=" + Est + "&Accion=Presas";
        data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/mapa.php",
            data: query,
            success: async function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    data.push([
                        item.id_presa,
                        item.nombre_oficial,
                        item.corriente,
                        numeral(Number.parseFloat(item.alt_cort)).format("0,0.00"),
                        numeral(Number.parseFloat(item.cap_name)).format("0,0.00"),
                        numeral(Number.parseFloat(item.cap_namo)).format("0,0.00"),
                        item.estado,
                        item.anio_term,
                    ]);
                });
                table.destroy();
                
                table = $("#tablaPresa").DataTable({
                    data: data,
                    columnDefs: [
                        { className: 'dt-body-right', targets: [3, 4, 5, 7] },
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
                            title: "Ver detalle",
                        },
                        {
                            title: "Nombre Oficial",
                        },
                        {
                            title: "Corriente",
                        },
                        {
                            title: "Altura de la cortina (m)"
                        },
                        {
                            title: "Capacidad al NAME (hm³)",
                        },
                        {
                            title: "Capacidad al NAMO (hm³)",
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
                            className: estiloboton,
                            text: "Exportar Excel",
                            exportOptions: {
                                columns: [1, 2, 3, 4, 5, 6, 7],
                            },
                        },
                        {
                            extend: "pdfHtml5",
                            title: "Consulta de presas",
                            className: estiloboton,
                            text: "Exportar PDF",
                            messageBottom: citas,
                            orientation: "portrait",
                            pageSize: "A4",
                            exportOptions: {
                                columns: [1, 2, 3, 4, 5, 6, 7],
                            },
                            customize: function (doc) {
                                doc.content.splice(0, 1);
                                var now = new Date();
                                var jsDate =
                                    now.getDate() +
                                    "-" +
                                    (now.getMonth() + 1) +
                                    "-" +
                                    now.getFullYear();
                                doc.pageMargins = [20, 70, 20, 50];
                                doc.defaultStyle.fontSize = 10;
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
                    }
                });
                //Verifica si el mapa es prioridad
                var x = $('#Prioridad').prop('checked');
                if (x == false) {
                    if (!map.hasLayer(OCSelect)) {
                        document.getElementById("download_shapefile").style.display = "block";
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
            habilitar();
            await Swal.close();
        });
    } else {
        habilitar();
        await $("#pantalla").hide();
        await $("#pantalla2").hide();
        await $("#divPrioridad").hide();
        $("#botonMapa").hide();
        await Swal.close();
    }
    await Historial();
    var session=document.getElementById("sesionStatus").value;
    if(session!=1){
        table.buttons().disable();
    }
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
    $("#Estados").multiselect("reset");
    await limpiarEstados();
}

/**
 * Funcion para limpiar la capa de estados
 */
async function limpiarEstados() {
    map.off();
    map.remove();
    crearMapa();
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
    $("#Organismos option:selected").each(function () {
        query += "organismo_id=" + $(this).val() + " or ";
    });
    query = query.slice(0, -3);
    return query;
}


async function concatEstado() {
    var query = "";
    $("#Estados option:selected").each(function () {
        query += "edo_id=" + $(this).val() + " or ";
    });
    query = query.slice(0, -3);
    return query;
}
