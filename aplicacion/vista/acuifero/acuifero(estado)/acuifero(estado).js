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
setEstiloSelect('#Acuiferos', 'Acuífero', 'Buscar Acuífero');

/**
 * Esta función controla todos los cambios del select de estados.
 * La función lee todas las opciones seleccionadas desde la vista,
 * limpia las capas del mapa, limpia los select que dependen de él, prepara una sentencia MySQL y
 * retorna en este caso los acuiferos que dependen de un organismo de cuenta además de los shapes de los organismos.
 * @constructor
 */
async function Estados() {

    await limpiarEstados();
    const query = await concatEstado();
    if (query !== "") {
        const cadena = "query=" + query + "&Accion=Acuiferos(Estado)";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/mapa.php",
            data: cadena,
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
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
            getAcu_SIG(function () {
                var overlays = {
                    "Organismos de Cuenca": GroupoOCSelect,
                    "Estados": GroupoEstSelect,
                    "Acuiferos": GroupoAcuSelect,
                }
                var lc = L.control.layers(null, overlays);
                lc.addTo(map);
                Swal.close();
            });
        });
    });
}

/**
 * Funcion para realizar la consulta de las selecicones con sus respectivos shapes
 * @returns {Promise<void>}
 * @constructor
 */
async function Consultar() {
    alertaCargando("Por favor espere", "Realizando consulta");
    $('#nav-tab-acu a[href="#nav-OC"]').tab("show");
    $("#referencias").show();
    /**
     * Llamamos a la función que deshabilita el mapa y los botones durante la consulta.
     * @type Promise<string>|String|loadShapeOrganismo.OC
     */
    await deshabilitar();

    /**
     *
     * @type String|loadShapeOrganismo.OC|Promise<string>
     * Esta función limpia la capa acuífero y las tablas.
     */
    await limpiarAcuifero();

    var OC = "";
    var Est = "";
    var Acu = "";
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
    await $("#Acuiferos option:selected")
        .each(async function () {
            Acu += "id_acuifero=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            Acu = Acu.slice(0, -3);
        });

    if (Acu !== "" && OC !== "" && Est !== "") {
        /**
         *
         * @type String
         * Se crea la variable que contiene todas las opciones de la consulta seleccionadas.
         */
        const query =
            "(" + OC + ")" +
            " AND (" +
            Est +
            ") AND (" +
            Acu +
            ") GROUP by id_organismo,id_estado,id_acuifero";

        // console.log(query)

        /**
         *
         * @type String
         * Se crea la variable que contiene la acción que va hacia el controlador y la variable antes creada
         */
        var cadena = "query=" + query + "&Accion=Acuiferos";
        // console.log(cadena);
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
                 * Se crea el array con todos los organismos de cuenca seleccionados
                 */
                var Organismos = Object.values(
                    groupBy(JSON.parse(resp), "id_organismo")
                );
                /**
                 * Se filtran por cada organimsp
                 */
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
                success: async function (resp) {
                    document.getElementById("lista").innerHTML = "";
                    $.each(JSON.parse(resp), function (index, item) {
                        citas += item.cita + " \n";
                        $("#lista").append("<li class='text-left'>" + item.cita + "</li>");
                    });
                    await tablaOC.destroy();
                    await tablaEst.destroy();
                    await tablaAcu.destroy();
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
                },
            }).always(async function () {
                await habilitar();


                await Swal.close();
            });
        });
    } else {
        /**
         *
         * @returns {Promise<void>}
         * En caso de algun error, se notificara al usuario.
         */

        swal(
            "Algo está mal.",
            "Todos los filtros tienen que tener al menos un elemento seleccionado."
        );
        await habilitar();
        $("#pantalla").hide();
        $("#pantalla2").hide();
        $("#divPrioridad").hide();
        $("#botonMapa").hide();
        await Swal.close();
    }
    /**
     *
     * @returns {Promise<void>}
     * Se aniade al historial la consulta realizada
     */
    await Historial();
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
    $("#Acuiferos").multiselect("reset");
    await limpiarAcuifero();
}

/**
 * Funcion para limpiar la capa de acuiferos
 */
async function limpiarAcuifero() {
    /**
     * Se limpian las tablas de la interfaz
     */
    tablaOC.clear().draw();
    tablaEst.clear().draw();
    tablaAcu.clear().draw();
    map.off();
    map.remove();
    crearMapa();
    $("#pantalla").hide();
    $("#pantalla2").hide();
    $("#divPrioridad").hide();
    $("#botonMapa").hide();
}



async function mostrarDEstado() {
    if (!tablaEst.data().any()) {
        alertaCargando("Por favor espere", "Generando tabla");
        const OC = await obtenerOrganismo();
        const Est = await obtenerEstado();
        const Acu = await obtenerAcuifero();
        if (Acu !== "" && OC !== "" && Est !== "") {
            /**
             *
             * @type String
             * Se crea la variable que contiene todas las opciones de la consulta seleccionadas.
             */
            const query =
                "(" + OC + ")" +
                " AND (" +
                Est +
                ") AND (" +
                Acu +
                ") GROUP by id_organismo,id_estado,id_acuifero";

            /**
             *
             * @type String
             * Se crea la variable que contiene la acción que va hacia el controlador y la variable antes creada
             */
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

async function mostrarDAcuifero() {
    if (!tablaAcu.data().any()) {
      alertaCargando("Por favor espere", "Generando tabla");
      const OC = await obtenerOrganismo();
      const Est = await obtenerEstado();
      const Acu = await obtenerAcuifero();
      if (Acu !== "" && OC !== "" && Est !== "") {
        const query =
        "("+ OC +")" +
        " AND (" +
        Est +
        ") AND (" +
        Acu +
        ") GROUP by id_organismo,id_estado,id_acuifero";
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