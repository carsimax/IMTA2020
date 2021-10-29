//Se aplica el estilo para los selects de la vista
setEstiloSelect('#Organismos', 'Organismos de Cuenca', 'Buscar Organismos de Cuenca');
setEstiloSelect('#Estados', 'Estados', 'Buscar Estado');
setEstiloSelect('#Municipios', 'Municipios', 'Buscar Municipios');
setEstiloSelect('#Cuencas', 'Cuencas', 'Buscar Cuencas');
setEstiloSelect('#TipoEstacion', 'Tipos', 'Buscar Tipo');
setEstiloSelect('#EstacionClimatologica', 'Estaciones Climatológicas', 'Buscar Estación');


async function Organismos() {
    await limpiarOrganismos();
    const query = await concatValoresSelect('#Organismos', 'organismo_id=');
    if (query !== "") {
        const cadena = "query=" + query + "&Accion=Estados";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/mapa.php",
            data: cadena,
            success: function (resp) {
                $("#Estados").empty();
                $.each(JSON.parse(resp), function (index, item) {
                    data.push('<option value="' + item.id_estado + '">' + item.estado + "</option>");
                });
            }
        }).always(function () {
            //Elimina los estados que contiene el select y añade los nuevos
            $("#Estados").html(data.join(""));
            $("#Estados").multiselect("reload");
        });
    }
}

//Obtiene los municipios correspondientes y los vacía en el select de municipios del valor seleccionado del estado
async function Estados() {
    await limpiarEstados();
    const query = await concatValoresSelect('#Estados', 'estado_id=');
    if (query !== "") {
        const cadena = "query=" + query + "&Accion=Municipios";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/mapa.php",
            data: cadena,
            success: function (resp) {
                //Se vacia el select de municipios
                $("#Municipios").empty();
                $.each(JSON.parse(resp), function (index, item) {
                    data.push('<option value="' + item.id_municipio + '">' + item.nombre_mun+ ' - '+item.nombre_est + "</option>");
                });
            }
        }).always(function () {
            $("#Municipios").html(data.join(""));
            $("#Municipios").multiselect("reload");
        });
    }
}

//Extrae las cuencas de los municipios seleccionados y los vacia en su select correspondiente
async function Municipios() {
    await limpiarMunicipio();
    const query = await concatValoresSelect('#Municipios', 'municipio_id=');
    if (query !== "") {
        const cadena = "query=" + query + "&Accion=MunicipiosCuenca";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/mapa.php",
            data: cadena,
            success: function (resp) {
                //Se vacia el select de cuencas
                $("#Cuencas").empty();
                $.each(JSON.parse(resp), function (index, item) {
                    data.push('<option value="' + item.cuenca_id + '">' + item.nombre + "</option>");
                });
            }
        }).always(function () {
            $("#Cuencas").html(data.join(""));
            $("#Cuencas").multiselect("reload");
        });
    }
}
//Extrae las cuencas de los municipios seleccionados y los vacia en su select correspondiente
async function Cuencas() {
    await limpiarCuencas();
}

async function TipoEstacion() {
    await limpiarEstaciones();
    const query = concatQuery();

    if (query !== "") {
        const cadena = "query=" + query + "&Accion=EstacionClimatologica(Municipio)";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/mapa.php",
            data: cadena,
            success: function (resp) {

                $.each(JSON.parse(resp), function (index, item) {
                    data.push({
                        name: item.nombre, value: item.id_estacion_climatologica, checked: false
                    });
                });
            }
        }).always(function () {
            $("#EstacionClimatologica").multiselect("loadOptions", data);
        });
    }
}

async function Estaciones() {
    isFormCompleted('#EstacionClimatologica');
}




//Funcion que limpia la capa de organimos asi como de las capas que dependen directamente de ellas
async function limpiarOrganismos() {
    $("#Estados").multiselect("reset");
    await limpiarEstados();
}


//Funcion para limpiar la capa de estados
async function limpiarEstados() {
    $("#Municipios").multiselect("reset");
    await limpiarMunicipio();
}

//Funcion para limpiar la capa de estadosim
async function limpiarMunicipio() {
    $("#Cuencas").multiselect("reset");
    await limpiarCuencas();

}
//Resetea el select que contiene los tipos de estacion
async function limpiarCuencas() {
    $("#TipoEstacion").multiselect("reset");
    var data = [];
    data.push({ name: "Climatológico", value: 2, checked: false });
    data.push({ name: "Observatorio", value: 1, checked: false });
    $("#TipoEstacion").multiselect("loadOptions", data);
    limpiarEstaciones();

}

//Elimina los resultados de la busqueda
function limpiarEstaciones() {
    $("#EstacionClimatologica").multiselect("reset");
    map.off();
    map.remove();
    crearMapa();
    $("#pantalla").hide();
    $("#botonMapa").hide();
    $("#divPrioridad").hide();
    $("#referencias").hide();

}


//Prepara el query para mostrar las estaciones climatologicas tomando en cuenta los valores de los selects anteriores
function concatQuery() {
    var query = "(";
    query = query + concatValoresSelect('#Municipios', 'municipio_id=');
    query = query + ") AND (";
    query = query + concatValoresSelect('#TipoEstacion', 'tipo_estacion_id=');
    query = query + ") AND (";
    query = query + concatValoresSelect('#Cuencas', ' cuenca_id=');
    query = query + ")";
    return query;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


async function deshabilitar() {
    $("#consultar").prop("disabled", true);
    $("#pantalla").hide();
    $("#botonMapa").hide();
    $("#referencias").hide();
}

async function habilitar() {
    $("#consultar").prop("disabled", false);
    $("#pantalla").show();
    $("#divPrioridad").show();
    $("#botonMapa").show();
    $("#referencias").show();
}


async function Consultar() {
    alertaCargando("Por favor espere", "Realizando consulta");
    // Se verifica que el ultimo select tenga cosas seleccionadas
    var EstC = concatValoresSelect('#EstacionClimatologica', 'id_estacion_climatologica=');
    if (EstC !== "") {
        data = "Accion=getCitaConsulta&modulo_id=6";
        citas = construirReferencias(data, false);
        var cadena = "query=" + EstC + " GROUP by id_estacion_climatologica" + "&Accion=EstacionesClimatologicas";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/mapa.php",
            data: cadena,
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    data.push([
                        item.nombre,
                        item.cuenca,
                        item.subcuenca,
                        item.tipo,
                        item.estado,
                        item.municipio,
                        item.fechainicio,
                        item.fechafin,
                        item.situacion
                    ]);
                });
            }
        }).always(async function () {
            table.destroy();
            await generarTablaEstacionClimatologica(data); //Se genera la tabla con la información obtenida del AJAX
            habilitar();
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
            await Swal.close();
        });
    } else {
        habilitar();
        $("#pantalla").hide();
        $("#botonMapa").hide();
        $("#divPrioridad").hide();
        $("#referencias").hide();
        await Swal.close();
    }
    await Historial();
}

async function generarTablaEstacionClimatologica(data) {
    table = $("#tablaEstacionClimatoogica").DataTable({
        data: data,
        dom: "Bfrtip",
        columns: [
            {
                title: "Nombre"
            },
            {
                title: "Cuenca"
            },
            {
                title: "Subcuenca"
            },
            {
                title: "Tipo"
            },
            {
                title: "Estado"
            },
            {
                title: "Municipio"
            },
            {
                title: 'Fecha de Inicio'
            },
            {
                title: 'Fecha de Termino'
            },
            {
                title: 'Situación'
            }
        ],
        buttons: [
            {
                extend: "excelHtml5",
                title: "Consulta de Estaciones Climatológicas",
                className: estiloboton,
                text: "Exportar Excel",
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                }
            },
            {
                extend: "pdfHtml5",
                title: "Consulta de Estaciones Climatológicas",
                className: estiloboton,
                text: "Exportar PDF",
                messageBottom: citas,
                orientation: "portrait",
                pageSize: "A4",
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
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
                                    width: 200
                                },
                                {
                                    alignment: "left",
                                    //italics: true,
                                    text: "Consulta de Estaciones Climatológicas",
                                    fontSize: 12.5,
                                    margin: [10, 5]
                                },
                                {
                                    alignment: "right",
                                    fontSize: 10,
                                    text: jsDate.toString()
                                }
                            ],
                            margin: 20
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
                                        { text: pages.toString() }
                                    ]
                                }
                            ],
                            margin: [50, 0]
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
                }
            }
        ],
        language: {
            url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
        }
    });
}

async function Historial() {
    //Guardamos en es historial
    cadena = "Modulo=Estaciones%20Climatologicas" + "&Accion=Historial";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/mapa.php",
        data: cadena,
        //Si el controlador devuelve una respuesta
        success: function (resp) {
            return true;
        }
    });
}

