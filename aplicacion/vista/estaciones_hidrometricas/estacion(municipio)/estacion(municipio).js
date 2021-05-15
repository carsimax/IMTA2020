//Se aplica el estilo para los selects de la vista
setEstiloSelect('#RegHidrologicas', 'Regiones Hidrológicas', 'Buscar Región');
setEstiloSelect('#Estados', 'Estados', 'Buscar Estado');
setEstiloSelect('#Municipios', 'Municipios', 'Buscar Municipios');
setEstiloSelect('#Cuencas', 'Cuencas', 'Buscar Cuencas');
setEstiloSelect('#EstacionHidrometrica', 'Estaciones Hidrométricas', 'Buscar Estación');


//Controla la información del select de estados dependiendo de los valores seleccionados en el select de Regiones
async function Regiones() {
    await limpiarRegiones();
    const query = concatValoresSelect('#RegHidrologicas', 'region_id=');
    if (query !== "") {
        const cadena = "query=" + query + "&Accion=getEstados";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/estacionhidrometrica.php",
            data: cadena,
            success: function (resp) {
                $("#Estados").empty();
                $.each(JSON.parse(resp), function (index, item) {
                    data.push('<option value="' + item.estado_id + '">' + item.nombre + "</option>");
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
    query = "(" + concatValoresSelect('#Estados', 'estacion_hidrometrica.estado_id=') + ') AND (' + concatValoresSelect('#RegHidrologicas', 'region_id=') + ')';
    if (query !== "") {
        const cadena = "query=" + query + "&Accion=getMunicipios";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/estacionhidrometrica.php",
            data: cadena,
            success: function (resp) {
                $("#Municipios").empty();
                $.each(JSON.parse(resp), function (index, item) {
                    data.push('<option value="' + item.municipio_id + '">' + item.nombre + "</option>");
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
    const query = concatValoresSelect('#Municipios', 'municipio_id=');
    if (query !== "") {
        const cadena = "query=" + query + "&Accion=MunicipiosCuencaHidrologica";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/mapa.php",
            data: cadena,
            success: function (resp) {
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
    const query = concatQuery();
    if (query !== "") {
        const cadena = "query=" + query + "&Accion=EstacionHidrometrica(Municipio)";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/mapa.php",
            data: cadena,
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    data.push({
                        name: item.nombre, value: item.id_estacion_hidrometrica, checked: false
                    });
                });
            }
        }).always(function () {
            $("#EstacionHidrometrica").multiselect("loadOptions", data);
        });
    }
}

async function Estaciones() {
    isFormCompleted('#EstacionHidrometrica');
}



/*
 * Funcion que limpia la capa de organimos asi como de las capas que dependen directamente de ellas
 */
async function limpiarRegiones() {
    $("#Estados").multiselect("reset");
    await limpiarEstados();
}

/**
 * Funcion para limpiar la capa de estados
 */
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
    $("#EstacionHidrometrica").multiselect("reset");
    limpiarEstaciones();

}

//Elimina los resultados de la busqueda
function limpiarEstaciones() {
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
    query = query + concatValoresSelect('#RegHidrologicas', 'region_id=');
    query = query + ") AND (";
    query = query + concatValoresSelect('#Estados', 'estacion_hidrometrica.estado_id=');
    query = query + ") AND (";
    query = query + concatValoresSelect('#Municipios', 'municipio_id=');
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
    //Se valida que se haya seleccionado algo
    var EstH = concatValoresSelect('#EstacionHidrometrica', 'id_estacion_hidrometrica=');
    //Busqueda tabular
    if (EstH !== "") {
        //Se obtiene la cita con la información de las presas, para obtener el id del modulo, consultar en la bd
        var data = "Accion=ConsultaEstacionHidrometrica&modulo_id=5";
        citas = construirReferencias(data, false);
        //Se extrae la información tabular de la base de datos
        var cadena = "query=" + EstH + " GROUP by id_estacion_hidrometrica" + "&Accion=EstacionesHidrometricas";

        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/mapa.php",
            data: cadena,
            //Si el controlador devuelve una respuesta
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    data.push([
                        item.nombre,
                        item.corriente,
                        item.cuenca,
                        item.estado,
                        item.municipio
                    ]);
                });
            }
        }).always(async function () {
            table.destroy();
            await generarTablaEstacionHidrometrica(data); //Se genera la tabla con la información obtenida del AJAX
            habilitar();
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
            await Swal.close();
        });


    } else {
        await habilitar();
        $("#pantalla").hide();
        $("#botonMapa").hide();
        $("#divPrioridad").hide();
        $("#referencias").hide();
    }
    await Historial();
}

async function Historial() {
    //Guardamos en es historial
    cadena = "Modulo=Estaciones%20Hidrometricas" + "&Accion=Historial";
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

async function generarTablaEstacionHidrometrica(data) {
    table = $("#tablaEstacionHidrometrica").DataTable({
        data: data,
        dom: "Bfrtip",
        columns: [
            {
                title: "Nombre"
            },
            {
                title: "Corriente"
            },
            {
                title: "Cuenca"
            },
            {
                title: "Estado"
            },
            {
                title: "Municipio"
            }
        ],
        buttons: [
            {
                extend: "excelHtml5",
                title: "Consulta de Estaciones Hidrométricas",
                className: estiloboton,
                text: "Exportar Excel",
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]
                }
            },
            {
                extend: "pdfHtml5",
                title: "Consulta de Estaciones Hidrométricas",
                className: estiloboton,
                text: "Exportar PDF",
                messageBottom: citas,
                orientation: "portrait",
                pageSize: "A4",
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]
                },
                customize: function (doc) {
                    doc.content.splice(0, 1);
                    var now = new Date();
                    var jsDate = now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
                    doc.pageMargins = [20, 70, 20, 50];
                    doc.defaultStyle.fontSize = 10;
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
                                    text: "Consulta de Estaciones Hidrométricas",
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



