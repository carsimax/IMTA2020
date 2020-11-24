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
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Cargando Datos",
        allowEscapeKey: false,
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
                        name: item.nombre,
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
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Cargando Datos",
        allowEscapeKey: false,
    allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
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
     * Llamamos a la funcion que Carga los OC
     */
    getOC_SIG(function () {
        /**
         * Cargamos la funcion que carga los Estados
         */
        getEst_SIG(function () {
            /**
             * Cargamos la funcion de los Acuiferos
             */
            getMuni_SIG(function () {
                /**
                 * Cargamos Municipios
                 */
                getAcu_SIG(function () {
                    /**
                     * Agregamos los overlays
                     * @type {{Estados: *, Acuiferos: *, "Organismos de Cuenca": *}}
                     */
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
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Realizando consulta",
        allowEscapeKey: false,
    allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });

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
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //-------------------------Organismos de Cuenca-----------------------------
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
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
    //--------------------------------Municipio---------------------------------
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    await $("#Municipios option:selected")
        .each(async function () {
            Mun += "id_municipio=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            Mun = Mun.slice(0, -3);
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

    /**
     * Se verifica que el query de Organismos ese vacio
     */
    if (OC !== "" && Est !== "" && Mun !== "" && Acu !== "") {
        await sleep(1000);
        query =
            OC +
            " AND (" +
            Est +
            ") AND (" +
            Mun +
            ") AND (" +
            Mun +
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
        swal(
            "Algo está mal.",
            "Todos los filtros tienen que tener al menos un elemento seleccionado"
        );
        await habilitar();
        await habilitar();
        $("#pantalla").hide();
        $("#pantalla2").hide();
        $("#divPrioridad").hide();
        $("#botonMapa").hide();
        await Swal.close();
    }
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
