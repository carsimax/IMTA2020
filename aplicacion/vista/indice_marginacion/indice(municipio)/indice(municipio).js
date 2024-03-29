//Se aplica el estilo para los selects de la vista
setEstiloSelect('#Estados', 'Seleccione Estados', 'Buscar Estado');
setEstiloSelect('#Municipios', 'Seleccione Municipio', 'Buscar Municipio');


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

//Funcion que se activa con el onchange del selectores de año.
async function Anios() {
    await limpiarEstados();
}

// Obtiene los municipios de los estados seleccionados 
async function Estados() {
    await limpiarEstados();
    const query = await concatValoresSelect('#Estados', 'estado_id=');
    if (query !== "") {
        const cadena = "query=" + query + "&Accion=Municipios";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/municipiomarginacion.php",
            data: cadena,
            success: function (resp) {
                //Se vacia el select de municipios
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

async function limpiarEstados() {
    $("#Municipios").multiselect("reset");
    await limpiarMunicipio();

}

async function limpiarMunicipio() {
    map.off();
    map.remove();
    crearMapa();
    $("#pantalla").hide();
    $("#botonMapa").hide();
    $("#divPrioridad").hide();
    $("#referencias").hide();
}

async function Consultar() {
    var valores = "(" + concatValoresSelect('#Municipios', 'municipio_id=') + ") AND (" + concatValoresSelect('#Anios', 'anio_id=') + ")";
    //Busqueda tabular
    if (valores !== "") {
        Swal.fire({
            title: "Por favor espere",
            html: "Realizando consulta", // add html attribute if you want or remove
            allowEscapeKey: false,
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });
        data = "Accion=ConsultaIndiceMarginacion&Filtro=Municipio&Anio=" + $("#Anios option:selected").val() + "&modulo_id=7";
        citas = construirReferencias(data, true);
        crearGlosario();
        //Se extrae la información tabular de la base de datos
        var cadena = "query=" + valores + "&Accion=consultaMunicipio";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/municipiomarginacion.php",
            data: cadena,
            //Si el controlador devuelve una respuesta
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    data.push([
                        item.municipio,
                        item.estado,
                        numeral(Number.parseFloat(item.pob_tot)).format("0,0"),
                        item.analf,
                        item.sprim,
                        item.ovsde,
                        item.ovsee,
                        item.ovsae,
                        item.vhac,
                        item.ovpt,
                        item.gm
                    ]);
                });
            }
        }).always(async function () {
            table.destroy();
            await generarTablaIndiceMarginacion(data); //Se genera la tabla con la información obtenida del AJAX
            habilitar();
            var x = $('#Prioridad').prop('checked');
            if (x == false) {
                if (!map.hasLayer(EstSelect)) {
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
        advertencia("Todos los filtros tienen que tener al menos un elemento seleccionado")
        await habilitar();
        $("#pantalla").hide();
        $("#botonMapa").hide();
        $("#divPrioridad").hide();
        $("#referencias").hide();
        await Swal.close();
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

async function generarTablaIndiceMarginacion(data) {
    table = $("#tablaIndiceMarginacion").DataTable({
        data: data,
        dom: "Bfrtip",
        columns: [
            {
                title: "Municipio"
            },
            {
                title: "Estado"
            },
            {
                title: "Pob. Tot."
            },
            {
                title: "Analf.",

            },
            {
                title: "Sprim.",
            },
            {
                title: "Ovsde.",
            },
            {
                title: "Ovsee."
            },
            {
                title: "Ovsae."
            },
            {
                title: "Vhac."
            },
            {
                title: "Ovpt."
            },
            {
                title: "GM."
            }

        ],
        buttons: [
            {
                extend: "excelHtml5",
                title: "Consulta de Índice de Marginación " + $("#Anios option:selected").text(),
                className: estiloboton,
                text: "Exportar Excel",
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                }
            },
            {
                extend: "pdfHtml5",
                title: "Consulta de Índice de Marginación " + $("#Anios option:selected").text(),
                className: estiloboton,
                text: "Exportar PDF",
                messageBottom: citas,
                orientation: "portrait",
                pageSize: "A4",
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
                                    text: "Consulta Índice de Marginación",
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
        },
        columnDefs: [{ className: 'dt-body-right', targets: [1, 2, 3, 4, 5, 6, 7, 8] }]

    });

}

function crearGlosario() {
    document.getElementById("glosario").innerHTML = "";

    $("#glosario").append("<li><b>Pob. Tot. :</b> Población total.</li>");
    $("#glosario").append("<li><b>Analf. :</b> Porcentaje de población de 15 años o más analfabeta.</li>");
    $("#glosario").append("<li><b>Sprim. :</b> Porcentaje de población de 15 años o más sin primaria completa.</li>");
    $("#glosario").append("<li><b>Ovsde. :</b> Porcentaje de ocupantes en viviendas sin drenaje ni excusado.</li>");
    $("#glosario").append("<li><b>Ovsee. :</b> Porcentaje de ocupantes en viviendas sin energía eléctrica.</li>");
    $("#glosario").append("<li><b>Ovsae. :</b> Porcentaje de ocupantes en viviendas sin agua entubada.</li>");
    $("#glosario").append("<li><b>Vhac. :</b> Porcentaje de viviendas con algún nivel de hacinamiento.</li>");
    $("#glosario").append("<li><b>Ovpt. :</b> Porcentaje de ocupantes en viviendas con piso de tierra.</li>");
    $("#glosario").append("<li><b>GM. :</b> Grado de marginación.</li>");

}


//Carga los shapes al mapa
async function loadShape() {

    Swal.fire({
        title: "Por favor espere",
        html: "Cargando Mapa Geoespacial",
        allowEscapeKey: false,
    allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });

    getEst_SIG(function () {
        getMunicipioMarginacion_SIG(function () {
            var overlays = {

                "Estados": GroupoEstSelect,
                "Municipios": GroupoMunSelect
            }
            var lc = L.control.layers(null, overlays);
            lc.addTo(map);
            Swal.close();
        });
    });
}
