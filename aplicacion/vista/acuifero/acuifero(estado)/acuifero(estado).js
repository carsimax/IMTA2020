/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */

/* global layerscontrol, capaOrganismo, capaEstado, capaAcuifero, tablaOC, moment, tablaEst, tablaAcu, shp, Pace */

/**
 * Se aplica el estilo al select de organismo de cuenca
 */
//Tabla de Organismos de cuenca
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
 * Se aplica el estilo al select de los acuiferos
 */
$("#Acuiferos").multiselect({
    columns: 1,
    search: true,
    selectAll: true,
    texts: {
        placeholder: "Seleccione un Acuífero",
        search: "Buscar Acuífero",
    },
});

/**
 * Esta función controla todos los cambios del select de estados.
 * La función lee todas las opciones seleccionadas desde la vista,
 * limpia las capas del mapa, limpia los select que dependen de él, prepara una sentencia MySQL y
 * retorna en este caso los acuiferos que dependen de un organismo de cuenta además de los shapes de los organismos.
 * @constructor
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
    /**
     * Esta línea de código llama a la función que limpia la capa de organismos de cuenca
     */
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
        const cadena = "query=" + query + "&Accion=Acuiferos(Estado)";
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

async function loadShape() {
    await map.off();
    await map.remove();
    crearMapa();
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Cargando Mapa Geoespacial",
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    /**
     * Llamamos a la funcion que Carga los OC
     */
    getOC_SIG(function () {
        /**
         * Cargamos la funcion que carga los Estados
         */
        getEst_SIG(function (){
            /**
             * Cargamos la funcion de los Acuiferos
             */
            getAcu_SIG(function (){
                /**
                 * Agregamos los overlays
                 * @type {{Estados: *, Acuiferos: *, "Organismos de Cuenca": *}}
                 */
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
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Realizando consulta",
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
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
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //-------------------------Organismos de Cuenca-----------------------------
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
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
    //--------------------------------ACUIFERO-----------------------------------
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    await $("#Acuiferos option:selected")
        .each(async function () {
            Acu += "id_acuifero=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            Acu = Acu.slice(0, -3);
        });

    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //-----------------------Busqueda TABULAR-----------------------------------
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    if (Acu !== "" && OC !== "" && Est !== "") {
        /**
         *
         * @type String
         * Se crea la variable que contiene todas las opciones de la consulta seleccionadas.
         */
        const query =
            OC +
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
                        $("#lista").append("<li>" + item.cita + "</li>");
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
