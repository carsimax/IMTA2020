/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */

//Se aplcia el estilo a los selects 
setEstiloSelect('#Usos', 'Usos', 'Buscar Uso');
setEstiloSelect('#Concesiones', 'Concesiones', 'Buscar Concesión');
setEstiloSelect('#Organismos', 'Organismos', 'Buscar Organizmo');
setEstiloSelect('#Estados', 'Estados', 'Buscar Estado');


/**
 * Esta función controla todos los cambios del select de organismos de cuenca.
 * La función básicamente lo que realiza es leer todas las opciones seleccionadas desde la vista,
 * limpia las capas del mapa, limpia los select que dependen de él, prepara una sentencia MySQL y
 * retorna en este caso los estados que dependen de un organismo de cuenta además de los shapes de los organismos.
 * @constructor
 */
async function Organismos() {
    $('#Organismos').addClass('green');
    await limpiarOrganismos();
    const query = await concatOrganismo();
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
                $("#Estados").empty();
                $.each(JSON.parse(resp), function (index, item) {
                    /**
                     * Por medio del plugin de multiselect, podemos agregar los objetos del array al select de acuiferos
                     */
                    data.push(
                        '<option value="' +
                        item.id_estado +
                        '">' +
                        item.estado +
                        "</option>"
                    );
                });
                $("#Estados").html(data.join(""));
                $("#Estados").multiselect("reload");
            }
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
 * retorna en este caso los acuiferos que dependen de un organismo de cuenta además de los shapes de los organismos.
 * @constructor
 */
async function Estados() {
    $('#Estados').addClass('green');
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
        /**
         * Se manda a llamar por medio de Ajax a la función de estados en el controlador de mapa
         */
        var data = [];
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
                $("#Acuiferos").empty();

                data.push(
                    "<option disabled selected value='0'> -- Seleccione una opción -- </option>"
                );
                $.each(JSON.parse(resp), function (index, item) {
                    /**
                     * Por medio del plugin de multiselect, podemos agregar los objetos del array al select de acuiferos
                     */
                    data.push(
                        '<option value="' +
                        item.id_acuifero +
                        '">' +
                        item.nombre +
                        "</option>"
                    );
                });
                $("#Acuiferos").html(data.join(""));
                $("#Acuiferos").multiselect("reload");
            },
        }).always(function () {
            $val = $("#Tipos").val();
            if ($val != 1) {
                getUsos();
            }
            Swal.close();
        });
    } else {
        Swal.close();
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

    $("#Acuiferos").multiselect("reset");
    $('#Acuiferos option:eq(0)').prop('selected', true)

    await limpiarAcuifero();
}

/**
 * Funcion para limpiar la capa de acuiferos
 */
async function limpiarAcuifero() {
    //Se valida para asignarle el la clase green
    if ($('#Acuiferos').val() === null) {
        $('#Acuiferos').removeClass('green');
    } else {
        $('#Acuiferos').addClass('green');
    }

    /**
     * Limpia su porpia capa
     */
    map.off();
    map.remove();
    crearMapa();
    tabla.clear().draw();
    tablaPozo.clear().draw();
    $("#pantalla").hide();
    $("#botonMapa").hide();
    $("#pantalla2").hide();
    $("#divPrioridad").hide();
    $("#Concesiones").multiselect("reset");
    $("#Usos").multiselect("reset");
    //$("#Concesiones").empty();
    /**
     * Se limpia la tabla de acuiferos
     */
}

async function limpiarAcuifero2() {
    //Se valida para asignarle el la clase green
    if ($('#Acuiferos').val() === null) {
        $('#Acuiferos').removeClass('green');
    } else {
        $('#Acuiferos').addClass('green');
    }

    /**
     * Limpia su porpia capa
     */
    map.off();
    map.remove();
    crearMapa();
    tabla.clear().draw();
    tablaPozo.clear().draw();
    $("#pantalla").hide();
    $("#botonMapa").hide();
    $("#pantalla2").hide();
    $("#divPrioridad").hide();
    $("#Concesiones").multiselect("reset");
    $("#Usos").multiselect("reset");
    getUsos();
    //$("#Concesiones").empty();
    /**
     * Se limpia la tabla de acuiferos
     */
}


//Se valida el valor del select de titulos para poder habilitar el boton de consulta
async function Concesiones() {
    isFormCompleted('#Concesiones');
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
        query += "estado_id=" + $(this).val() + " or ";
    });
    /**
     * Al final el query quedara con un or al final, la siguiente línea quita ese or sobrante.
     * @type {string}
     */
    query = query.slice(0, -3);
    return query;
}

async function loadShape(tipo) {
    await map.off();
    await map.remove();
    crearMapa();
    alertaCargando("Por favor espere", "Cargando mapa geoespacial");
    if (tipo === "1") {
        /**
     * Cargamos los OC
     */
        getOC_SIG(function () {
            /**
             * Cargamos los Estados
             */
            getEst_SIG(function () {
                /**
                 * Si Esta seleccionado los acuferos
                 */
                getAcu_SIG(function () {
                    /**
                     * Cargamos los Pozos
                     */
                    getPozo_SIG(function () {
                        /**
                         * Añadimos los overlays
                         * @type {{Pozos: *, Estados: *, Acuiferos: *, "Organismos de Cuenca": *}}
                         */
                        var overlays = {
                            "Organismos de Cuenca": GroupoOCSelect,
                            "Estados": GroupoEstSelect,
                            "Acuiferos": GroupoAcuSelect,
                            "Pozos": GroupoPozosSelect,
                        }
                        var lc = L.control.layers(null, overlays);
                        lc.addTo(map);
                        Swal.close();
                    });
                });
            });
        });
    } else {
        getOC_SIG(function () {
            getEst_SIG(function () {
                getPozo_SIG(function () {
                    /**
                     * Añadimos los overlays
                     * @type {{Pozos: *, Estados: *, Acuiferos: *, "Organismos de Cuenca": *}}
                     */
                    var overlays = {
                        "Organismos de Cuenca": GroupoOCSelect,
                        "Estados": GroupoEstSelect,
                        "Pozos": GroupoPozosSelect,
                    }
                    var lc = L.control.layers(null, overlays);
                    lc.addTo(map);
                    Swal.close();
                });
            });
        });
    }
}