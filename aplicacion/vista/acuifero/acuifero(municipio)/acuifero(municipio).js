/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */

// Se aplica estilo a los selectores
setEstiloSelect('#Organismos', 'Organismos de Cuenca', 'Buscar Organismo');
setEstiloSelect('#Estados', 'Estados', 'Buscar Estado');
setEstiloSelect('#Acuiferos', 'Acuífero', 'Buscar Acuífero');
setEstiloSelect('#Municipios', 'Municipios', 'Buscar Municipio');



/**
 * Esta función controla todos los cambios del select de estados.
 * La función básicamente lo que realiza es leer todas las opciones seleccionadas desde la vista,
 * limpia las capas del mapa, limpia los select que dependen de él, prepara una sentencia MySQL y
 * retorna en este caso los acuiferos que dependen de un organismo de cuenta además de los shapes de los organismos.
 * @constructor
 */
async function Estados() {

    /**
     * Esta línea de código llama a la función que limpia la capa de organismos de cuenca
     */
    await limpiarEstados();
    const query = await concatEstado();
    if (query !== "") {
        /**
         * @type {string}
         * Se crea una cadena que es la que se va a enviar por medio de Ajax,
         * este contiene tanto el query anteriormente descrito como la acción que va realizar en el controlador de mapa
         */
        const cadena = "query=" + query + "&Accion=&Accion=Municipios";
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
                     * Por medio del plugin de multiselect, podemos agregar los objetos del array al select de acuiferos
                     */
                    data.push({
                        name: item.nombre_mun + ' - ' + item.nombre_est,
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
}

/**
 *Funcion de los municipios
 * @constructor
 */
async function Municipios() {
    alertaCargando("Por favor espere", "Cargando datos");
    /**
     * Esta línea de código llama a la función que limpia la capa de organismos de cuenca
     */
    await limpiarMunicipio();
    const query = await concatMunicipio();
    if (query !== "") {
        /**
         * @type {string}
         * Se crea una cadena que es la que se va a enviar por medio de Ajax,
         * este contiene tanto el query anteriormente descrito como la acción que va realizar en el controlador de mapa
         */
        const cadena = "query=" + query + "&Accion=Acuiferos(Muni)";
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
                     * Por medio del plugin de multiselect, podemos agregar los objetos del array al select de acuiferos
                     */
                    data.push({
                        name: item.nombre,
                        value: item.id_acuifero,
                        checked: false,
                    });
                });
                $("#Acuiferos").multiselect("loadOptions", data);
            },
        }).always(function () {
            Swal.close();
        });
    } else {
        Swal.close();
    }
}

async function Acuiferos() {
    isFormCompleted('#Acuiferos');
}


async function loadShape() {
    await map.off();
    await map.remove();
    crearMapa();
    alertaCargando("Por favor espere", "Cargando mapa geoespacial");

    getOC_SIG(function () {
        getEst_SIG(function () {
            getMuni_SIG(function () {
                getAcu_SIG(function () {
                    var overlays = {
                        "Organismos de Cuenca": GroupoOCSelect,
                        "Estados": GroupoEstSelect,
                        "Municipios": GroupoMunSelect,
                        "Acuiferos": GroupoAcuSelect,
                    }
                    var lc = L.control.layers(null, overlays);
                    lc.addTo(map);
                    Swal.close();
                });
            });
        });
    });
}

/**
 * Funcion que realiza la busqueda de los shape
 * @returns {Promise<void>}
 * @constructor
 */
async function Consultar() {
    $("#referencias").show();
    $('#nav-tab-acu a[href="#nav-OC"]').tab("show");
    /**
     * Limpiamos la parte de acuiferos
     */
    await deshabilitar();
    await limpiarAcuifero();
    var OC = "";
    var Est = "";
    var Acu = "";
    var Mun = "";
    //Colocamos los shapes
    await $("#Organismos option:selected")
        .each(async function () {
            OC += "id_organismo=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            OC = OC.slice(0, -3);
        });

    await $("#Estados option:selected")
        .each(async function () {
            Est += "id_estado=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            Est = Est.slice(0, -3);
        });

    await $("#Municipios option:selected")
        .each(async function () {
            Mun += "id_municipio=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            Mun = Mun.slice(0, -3);
        });

    await $("#Acuiferos option:selected")
        .each(async function () {
            Acu += "id_acuifero=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            Acu = Acu.slice(0, -3);
        });
    if (Acu !== "") {
        alertaCargando("Por favor espere", "Realizando consulta");
        await sleep(1000);
        query =
            "(" + OC + ")" +
            " AND (" +
            Est +
            ") AND (" +
            Mun +
            ") AND (" +
            Acu +
            ") GROUP by id_organismo,id_estado,id_municipio,id_acuifero";
        var cadena = "query=" + query + "&Accion=Acuiferos";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/mapa.php",
            data: cadena,
            //Si el controlador devuelve una respuesta
            success: function (resp) {
                //Primero se desglosara por Acuifero
                var groupBy = function (miarray, prop) {
                    return miarray.reduce(function (groups, item) {
                        var val = item[prop];
                        groups[val] = groups[val] || {
                            id_organismo: item.id_organismo,
                            id_estado: item.id_estado,
                            id_municipio: item.id_municipio,
                            id_acuifero: item.id_acuifero,
                            Organismo: item.Organismo,
                            Estado: item.Estado,
                            Municipio: item.Municipio,
                            Acuifero: item.Acuifero,
                            R: 0,
                            DNC: 0,
                            VCAS: 0,
                            VEALA: 0,
                            VAPTYR: 0,
                            VAPRH: 0,
                            DMA: 0,
                            VEAS: 0,
                            Disp: 0,
                        };
                        groups[val].R += parseFloat(item.R);
                        groups[val].DNC += parseFloat(item.DNC);
                        groups[val].VCAS += parseFloat(item.VCAS);
                        groups[val].VEALA += parseFloat(item.VEALA);
                        groups[val].VAPTYR += parseFloat(item.VAPTYR);
                        groups[val].VAPRH += parseFloat(item.VAPRH);
                        groups[val].DMA += parseFloat(item.DMA);
                        groups[val].VEAS += parseFloat(item.VEAS);
                        groups[val].Disp += parseFloat(item.Disp);
                        return groups;
                    }, {});
                };
                var Organismos = Object.values(
                    groupBy(JSON.parse(resp), "id_organismo")
                );
                //$("#infoReporteOC").val(JSON.stringify(Organismos));

                $.each(Organismos, function (index, item) {
                    data.push([
                        item,
                        item.Organismo,
                        numeral(Number.parseFloat(item.R)).format("0,0.00"),
                        numeral(Number.parseFloat(item.DNC)).format("0,0.00"),
                        numeral(Number.parseFloat(item.VCAS)).format("0,0.00"),
                        numeral(Number.parseFloat(item.VEALA)).format("0,0.00"),
                        numeral(Number.parseFloat(item.VAPTYR)).format("0,0.00"),
                        numeral(Number.parseFloat(item.VAPRH)).format("0,0.00"),
                        numeral(Number.parseFloat(item.DMA)).format("0,0.00"),
                    ]);
                });
            },
        }).always(async function () {
            cadena = "Accion=ConsultaAcuifero&modulo_id=1";
            citas = "\n ";
            $.ajax({
                type: "GET",
                url: "/aplicacion/controlador/catalogo.php",
                data: cadena,
                success: function (resp) {
                    document.getElementById("lista").innerHTML = "";
                    $.each(JSON.parse(resp), function (index, item) {
                        citas += item.cita + " \n";
                        $("#lista").append("<li class='text-left'>" + item.cita + "</li>");
                    });
                },
            }).always(async function () {
                /**
                 *
                 * @returns {Promise<void>}
                 * Cuando la funcion ajax termina,
                 * Habilitara los botones y el mapa nuevamente
                 */
                await habilitar();
                //tablaOC.clear().draw();
                //tablaOC.rows.add(data).draw();
                tablaOC.destroy();
                tablaEst.destroy();
                tablaAcu.destroy();
                tablaMun.destroy();
                //Tabla de Organismos de cuenca
                await mostrarDOrganismo(data);
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
                await Swal.close();
            });
        });
    } else {
        advertencia("Todos los filtros tienen que tener al menos un elemento seleccionado");
    }
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
     * Llamos a limpiar acuifero
     */
    $("#Municipios").multiselect("reset");
    await limpiarMunicipio();
}

//Funcion para limpiar la capa de estadosim
async function limpiarMunicipio() {
    /**
     * Llamos a limpiar acuifero
     */
    $("#Acuiferos").multiselect("reset");
    await limpiarAcuifero();
}

/**
 * Funcion para limpiar la capa de acuiferos
 */
async function limpiarAcuifero() {
    /**
     * Limpia su porpia capa
     */
    map.off();
    map.remove();
    crearMapa();
    /**
     * Se limpia la tabla de acuiferos
     */
    tablaOC.clear().draw();
    tablaEst.clear().draw();
    tablaMun.clear().draw();
    tablaAcu.clear().draw();
    $("#pantalla").hide();
    $("#pantalla2").hide();
    $("#divPrioridad").hide();
    $("#botonMapa").hide();
}


async function mostrarMunicipio2() {
    if (!tablaMun.data().any()) {
        alertaCargando("Por favor espere", "Generando tabla");
        /**
         * @type {string}
         * La variable query nos permite guardar la sentencia SQL para consultar los acuiferos
         */
        const OC = await obtenerOrganismo();
        const Est = await obtenerEstado();
        const Mun = await obtenerMunicipio();
        const Acu = await obtenerAcuifero();
        /**
         * Se verifica que el query de Organismos ese vacio
         */
        if (Acu !== "" && OC !== "" && Est !== "" && Mun !== "") {
            query =
                "(" + OC + ")" +
                " AND (" +
                Est +
                ") AND (" +
                Mun +
                ") AND (" +
                Acu +
                ") GROUP by id_organismo,id_estado,id_municipio,id_acuifero";
            var cadena = "query=" + query + "&Accion=Acuiferos";
            data = [];
            $.ajax({
                type: "POST",
                url: "/aplicacion/controlador/mapa.php",
                data: cadena,
                //Si el controlador devuelve una respuesta
                success: async function (resp) {
                    //Primero se desglosara por Acuifero
                    var groupBy = function (miarray, prop) {
                        return miarray.reduce(function (groups, item) {
                            var val = item[prop];
                            groups[val] = groups[val] || {
                                id_organismo: item.id_organismo,
                                id_estado: item.id_estado,
                                id_municipio: item.id_municipio,
                                id_acuifero: item.id_acuifero,
                                Organismo: item.Organismo,
                                Estado: item.Estado,
                                Municipio: item.Municipio,
                                Acuifero: item.Acuifero,
                                R: 0,
                                DNC: 0,
                                VCAS: 0,
                                VEALA: 0,
                                VAPTYR: 0,
                                VAPRH: 0,
                                DMA: 0,
                                VEAS: 0,
                                Disp: 0,
                            };
                            groups[val].R += parseFloat(item.R);
                            groups[val].DNC += parseFloat(item.DNC);
                            groups[val].VCAS += parseFloat(item.VCAS);
                            groups[val].VEALA += parseFloat(item.VEALA);
                            groups[val].VAPTYR += parseFloat(item.VAPTYR);
                            groups[val].VAPRH += parseFloat(item.VAPRH);
                            groups[val].DMA += parseFloat(item.DMA);
                            groups[val].VEAS += parseFloat(item.VEAS);
                            groups[val].Disp += parseFloat(item.Disp);
                            return groups;
                        }, {});
                    };
                    var Municipios = Object.values(
                        groupBy(JSON.parse(resp), "id_municipio")
                    );
                    //$("#infoReporteMun").val(JSON.stringify(Municipios));
                    $.each(Municipios, function (index, item) {
                        data.push([
                            item,
                            item.Estado,
                            item.Municipio,
                            numeral(Number.parseFloat(item.R)).format("0,0.00"),
                            numeral(Number.parseFloat(item.DNC)).format("0,0.00"),
                            numeral(Number.parseFloat(item.VCAS)).format("0,0.00"),
                            numeral(Number.parseFloat(item.VEALA)).format("0,0.00"),
                            numeral(Number.parseFloat(item.VAPTYR)).format("0,0.00"),
                            numeral(Number.parseFloat(item.VAPRH)).format("0,0.00"),
                            numeral(Number.parseFloat(item.DMA)).format("0,0.00"),
                        ]);
                    });
                    tablaMun = $("#Mun").DataTable({
                        "order": [[1, "asc"], [2, "asc"]],
                        data: data,
                        columnDefs: [
                            { className: 'dt-body-right', targets: [3, 4, 5, 6, 7, 8, 9] },
                            {
                                targets: 0,
                                data: null,
                                defaultContent:
                                    '<button data-toggle="modal" data-target="#graficaModal" class="btn btn-gob btn-fill  btn-block"><i class="far fa-chart-bar"></i></button>',
                            },
                        ],
                        dom: "Bfrtip",
                        columns: [
                            {
                                title: "Gráfica",
                            },
                            {
                                title: "Estado",
                            },
                            {
                                title: "Municipio",
                            },
                            {
                                title: "R (hm³)",
                            },
                            {
                                title: "DNC (hm³)",
                            },
                            {
                                title: "VCAS (hm³)",
                            },
                            {
                                title: "VEALA (hm³)",
                            },
                            {
                                title: "VAPTYR (hm³)",
                            },
                            {
                                title: "VAPRH (hm³)",
                            },
                            {
                                title: "DMA (hm³)",
                            },
                        ],
                        buttons: [
                            {
                                extend: "excelHtml5",
                                title: "Disponibilidad de acuíferos por municipio",
                                className: estiloboton,
                                text: "Exportar Excel",
                                exportOptions: {
                                    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                                },
                            },
                            {
                                extend: "pdfHtml5",
                                title: "Disponibilidad de acuíferos por municipio",
                                className: estiloboton,
                                text: "Exportar PDF",
                                messageBottom: citas,
                                orientation: "portrait",
                                pageSize: "A4",
                                exportOptions: {
                                    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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
                                                    text: "Disponibilidad de acuíferos por municipio",
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
                },
            }).always(async function () {
                await Swal.close();
            });
        }
    }
}

async function mostrarDEstado2() {
    if (!tablaEst.data().any()) {
        alertaCargando("Por favor espere", "Generando tabla");
        const OC = await obtenerOrganismo();
        const Est = await obtenerEstado();
        const Mun = await obtenerMunicipio();
        const Acu = await obtenerAcuifero();
        /**
         * Se verifica que el query de Organismos ese vacio
         */
        if (Acu !== "" && OC !== "" && Est !== "" && Mun !== "") {
            query =
                "(" + OC + ")" +
                " AND (" +
                Est +
                ") AND (" +
                Mun +
                ") AND (" +
                Acu +
                ") GROUP by id_organismo,id_estado,id_municipio,id_acuifero";
            var cadena = "query=" + query + "&Accion=Acuiferos";
            /**
             *
             * @type Array
             * Array de datos
             */
            data = [];
            /**
             *
             * @param {type} resp
             * @returns {undefined}
             * Se manda a llamar a una función Ajax que realiza la consulta de los datos a la base de datos.
             */
            $.ajax({
                type: "POST",
                url: "/aplicacion/controlador/mapa.php",
                data: cadena,
                //Si el controlador devuelve una respuesta
                success: function (resp) {
                    /**
                     *
                     * @param {type} miarray
                     * @param {type} prop
                     * @returns {unresolved}
                     * Primero se crea una variable que se encarga de agrupar los datos dependiedo el pararametro recibido
                     */
                    var groupBy = function (miarray, prop) {
                        return miarray.reduce(function (groups, item) {
                            var val = item[prop];
                            groups[val] = groups[val] || {
                                id_organismo: item.id_organismo,
                                id_estado: item.id_estado,
                                id_acuifero: item.id_acuifero,
                                Organismo: item.Organismo,
                                Estado: item.Estado,
                                Acuifero: item.Acuifero,
                                R: 0,
                                DNC: 0,
                                VCAS: 0,
                                VEALA: 0,
                                VAPTYR: 0,
                                VAPRH: 0,
                                DMA: 0,
                                VEAS: 0,
                                Disp: 0,
                            };
                            groups[val].R += parseFloat(item.R);
                            groups[val].DNC += parseFloat(item.DNC);
                            groups[val].VCAS += parseFloat(item.VCAS);
                            groups[val].VEALA += parseFloat(item.VEALA);
                            groups[val].VAPTYR += parseFloat(item.VAPTYR);
                            groups[val].VAPRH += parseFloat(item.VAPRH);
                            groups[val].DMA += parseFloat(item.DMA);
                            groups[val].VEAS += parseFloat(item.VEAS);
                            groups[val].Disp += parseFloat(item.Disp);
                            return groups;
                        }, {});
                    };
                    /**
                     *
                     * @type Array
                     * Se crea el array con todos los estados de cuenca seleccionados
                     */
                    var Estados = Object.values(groupBy(JSON.parse(resp), "id_estado"));
                    /**
                     * Se filtran por cada estado
                     */
                    $.each(Estados, function (index, item) {
                        data.push([
                            item,
                            item.Estado,
                            numeral(Number.parseFloat(item.R)).format("0,0.00"),
                            numeral(Number.parseFloat(item.DNC)).format("0,0.00"),
                            numeral(Number.parseFloat(item.VCAS)).format("0,0.00"),
                            numeral(Number.parseFloat(item.VEALA)).format("0,0.00"),
                            numeral(Number.parseFloat(item.VAPTYR)).format("0,0.00"),
                            numeral(Number.parseFloat(item.VAPRH)).format("0,0.00"),
                            numeral(Number.parseFloat(item.DMA)).format("0,0.00"),
                        ]);
                    });
                    tablaEst = $("#Est").DataTable({
                        "order": [[1, "asc"]],
                        data: data,
                        columnDefs: [
                            { className: 'dt-body-right', targets: [2, 3, 4, 5, 6, 7, 8] },
                            {
                                targets: 0,
                                data: null,
                                defaultContent:
                                    '<button data-toggle="modal" data-target="#graficaModal" class="btn btn-gob btn-fill  btn-block"><i class="far fa-chart-bar"></i></button>',
                            },
                        ],
                        dom: "Bfrtip",
                        columns: [
                            {
                                title: "Gráfica",
                            },
                            {
                                title: "Estado",
                            },
                            {
                                title: "R (hm³)",
                            },
                            {
                                title: "DNC (hm³)",
                            },
                            {
                                title: "VCAS (hm³)",
                            },
                            {
                                title: "VEALA (hm³)",
                            },
                            {
                                title: "VAPTYR (hm³)",
                            },
                            {
                                title: "VAPRH (hm³)",
                            },
                            {
                                title: "DMA (hm³)",
                            },
                        ],
                        buttons: [
                            {
                                extend: "excelHtml5",
                                title: "Disponibilidad de acuíferos por Estado",
                                className: estiloboton,
                                text: "Exportar Excel",
                                exportOptions: {
                                    columns: [1, 2, 3, 4, 5, 6, 7, 8],
                                },
                            },
                            {
                                extend: "pdfHtml5",
                                title: "Disponibilidad de acuíferos por Estado",
                                className: estiloboton,
                                text: "Exportar PDF",
                                messageBottom: citas,
                                orientation: "portrait",
                                pageSize: "A4",
                                exportOptions: {
                                    columns: [1, 2, 3, 4, 5, 6, 7, 8],
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
                                                    text: "Disponibilidad de acuíferos por Estado",
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
                },
            }).always(async function () {
                await Swal.close();
            });
        }
    }
}

async function mostrarDAcuifero2() {
    if (!tablaAcu.data().any()) {
        alertaCargando("Por favor espere", "Generando tabla");
        const OC = await obtenerOrganismo();
        const Est = await obtenerEstado();
        const Mun = await obtenerMunicipio();
        const Acu = await obtenerAcuifero();
        /**
         * Se verifica que el query de Organismos ese vacio
         */
        if (Acu !== "" && OC !== "" && Est !== "" && Mun !== "") {
            query =
                "(" + OC + ")" +
                " AND (" +
                Est +
                ") AND (" +
                Mun +
                ") AND (" +
                Acu +
                ") GROUP by id_organismo,id_estado,id_municipio,id_acuifero";
            var cadena = "query=" + query + "&Accion=Acuiferos";
            var data = [];
            $.ajax({
                type: "POST",
                url: "/aplicacion/controlador/mapa.php",
                data: cadena,
                success: async function (resp) {
                    var groupBy = function (miarray, prop) {
                        return miarray.reduce(function (groups, item) {
                            var val = item[prop];
                            groups[val] = groups[val] || {
                                id_organismo: item.id_organismo,
                                id_estado: item.id_estado,
                                id_acuifero: item.id_acuifero,
                                Organismo: item.Organismo,
                                Estado: item.Estado,
                                Acuifero: item.Acuifero,
                                R: 0,
                                DNC: 0,
                                VCAS: 0,
                                VEALA: 0,
                                VAPTYR: 0,
                                VAPRH: 0,
                                DMA: 0,
                                VEAS: 0,
                                Disp: 0,
                            };
                            groups[val].R += parseFloat(item.R);
                            groups[val].DNC += parseFloat(item.DNC);
                            groups[val].VCAS += parseFloat(item.VCAS);
                            groups[val].VEALA += parseFloat(item.VEALA);
                            groups[val].VAPTYR += parseFloat(item.VAPTYR);
                            groups[val].VAPRH += parseFloat(item.VAPRH);
                            groups[val].DMA += parseFloat(item.DMA);
                            groups[val].VEAS += parseFloat(item.VEAS);
                            groups[val].Disp += parseFloat(item.Disp);
                            return groups;
                        }, {});
                    };
                    /**
                     *
                     * @type Array
                     * Se crea el array con todos los Acuiferos
                     */
                    var Acuiferos = Object.values(
                        groupBy(JSON.parse(resp), "id_acuifero")
                    );
                    $.each(Acuiferos, function (index, item) {
                        data.push([
                            item,
                            item.Estado,
                            item.Acuifero,
                            numeral(Number.parseFloat(item.R)).format("0,0.00"),
                            numeral(Number.parseFloat(item.DNC)).format("0,0.00"),
                            numeral(Number.parseFloat(item.VCAS)).format("0,0.00"),
                            numeral(Number.parseFloat(item.VEALA)).format("0,0.00"),
                            numeral(Number.parseFloat(item.VAPTYR)).format("0,0.00"),
                            numeral(Number.parseFloat(item.VAPRH)).format("0,0.00"),
                            numeral(Number.parseFloat(item.DMA)).format("0,0.00")
                        ]);
                    });
                    tablaAcu = $("#Acu").DataTable({
                        "order": [[1, "asc"], [2, "asc"]],
                        data: data,
                        columnDefs: [
                            { className: 'dt-body-right', targets: [3, 4, 5, 6, 7, 8, 9] },
                            {
                                targets: 0,
                                data: null,
                                defaultContent:
                                    '<button data-toggle="modal" data-target="#graficaModal" class="btn btn-gob btn-fill  btn-block"><i class="far fa-chart-bar"></i></button>',
                            },
                        ],
                        dom: "Bfrtip",
                        columns: [
                            {
                                title: "Gráfica",
                            },
                            {
                                title: "Estado",
                            },
                            {
                                title: "Acuífero",
                            },
                            {
                                title: "R (hm³)",
                            },
                            {
                                title: "DNC (hm³)",
                            },
                            {
                                title: "VCAS (hm³)",
                            },
                            {
                                title: "VEALA (hm³)",
                            },
                            {
                                title: "VAPTYR (hm³)",
                            },
                            {
                                title: "VAPRH (hm³)",
                            },
                            {
                                title: "DMA (hm³)",
                            },
                        ],
                        buttons: [
                            {
                                extend: "excelHtml5",
                                title: "Disponibilidad de acuíferos",
                                className: estiloboton,
                                text: "Exportar Excel",
                                exportOptions: {
                                    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                                },
                            },
                            {
                                extend: "pdfHtml5",
                                title: "Disponibilidad de acuíferos",
                                className: estiloboton,
                                text: "Exportar PDF",
                                messageBottom: citas,
                                orientation: "portrait",
                                pageSize: "A4",
                                exportOptions: {
                                    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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
                                                    text: "Disponibilidad de acuíferos",
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
                },
            }).always(async function () {
                await Swal.close();
            });
        }
    }
}