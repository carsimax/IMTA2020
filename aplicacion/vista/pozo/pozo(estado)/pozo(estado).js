/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */

/**
 * Se aplica el estilo al select de organismo de cuenca
 */

/**
 * Se aplica el estilo para el select de los estados
 */
/**
 * Se aplica el estilo al select de los acuiferos
 */

$("#Usos").multiselect({
    columns: 1,
    search: true,
    selectAll: true,
    texts: {
        placeholder: "Seleccione el uso del título",
        search: "Buscar uso",
    },
});
$("#Concesiones").multiselect({
    columns: 1,
    search: true,
    selectAll: true,
    texts: {
        placeholder: "Seleccione una concesión",
        search: "Buscar concesión",
    },
});

/**
 * Esta función controla todos los cambios del select de organismos de cuenca.
 * La función básicamente lo que realiza es leer todas las opciones seleccionadas desde la vista,
 * limpia las capas del mapa, limpia los select que dependen de él, prepara una sentencia MySQL y
 * retorna en este caso los estados que dependen de un organismo de cuenta además de los shapes de los organismos.
 * @constructor
 */
async function Organismos() {
    Swal.fire({
        title: "Por favor espere",
        html: "Cargando Datos", // add html attribute if you want or remove
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    /**;
     * Esta línea de código llama a la función que limpia la capa de organismos de cuenca
     */
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
                data.push(
                    "<option disabled selected value> -- Seleccione una opción -- </option>"
                );
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
    Swal.fire({
        title: "Por favor espere",
        html: "Cargando Datos", // add html attribute if you want or remove
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
    tabla.clear().draw();
    tablaPozo.clear().draw();
    $("#pantalla").hide();
    $("#botonMapa").hide();
    $("#pantalla2").hide();
    $("#divPrioridad").hide();
    $("#Concesiones").multiselect("reset");
    $("#Usos").multiselect("reset2");
    //$("#Concesiones").empty();
    /**
     * Se limpia la tabla de acuiferos
     */
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
            if ($("#Acuiferos option:selected").val() != null && $val == 1) {
                /**
                 * Obtenemos los acuiferos
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
            } else {
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
                        "Pozos": GroupoPozosSelect,
                    }
                    var lc = L.control.layers(null, overlays);
                    lc.addTo(map);
                    Swal.close();
                });
            }
        });
    });
}