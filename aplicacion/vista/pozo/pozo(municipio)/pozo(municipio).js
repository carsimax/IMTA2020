/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */

setEstiloSelect('#Acuiferos', 'Acuíferos', 'Buscar Acuífero');
setEstiloSelect('#Usos', 'Usos', 'Buscar Uso');
setEstiloSelect('#Concesiones', 'Concesiones', 'Buscar Concesión');

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
                data.push(
                    "<option disabled selected value='0'> -- Seleccione una opción -- </option>"
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
            },
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
                $("#Municipios").empty();
                data.push(
                    "<option disabled selected value> -- Seleccione una opción -- </option>"
                );
                $.each(JSON.parse(resp), function (index, item) {
                    /**
                     * Por medio del plugin de multiselect, podemos agregar los objetos del array al select de acuiferos
                     */

                    data.push(
                        '<option value="' +
                        item.id_municipio +
                        '">' +
                        item.nombre +
                        "</option>"
                    );
                });
                $("#Municipios").html(data.join(""));
                $("#Municipios").multiselect("reload");
            },
        }).always(function () {
            Swal.close();
        });
    } else {
        Swal.close();
    }
}

async function Municipios() {


    if ($('#Municipios').val() === null) {
        $('#Municipios').removeClass('green');
    } else {
        $('#Municipios').addClass('green');
    }
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
        const cadena = "query=" + query + "&Accion=Acuiferos(Muni)2";
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

async function Concesiones() {
    isFormCompleted('#Concesiones');
}

/*
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
    $('#Municipios option:eq(0)').prop('selected', true);
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

async function limpiarAcuifero() {
    /**
     * Limpia su porpia capa
     */
    map.off();
    map.remove();
    crearMapa();
    $("#pantalla").hide();
    $("#botonMapa").hide();
    $("#pantalla2").hide();
    $("#divPrioridad").hide();
    $("#Concesiones").multiselect("reset");
    $("#Usos").multiselect("reset2")

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

/**
 * Funcion que concatena los municipios seleccionados del select
 * @returns {Promise<string>}
 */
async function concatMunicipio() {
    $val = $("#Tipos").val();
    var query = "";
    /**
     * Se tiene que recorrer el select de organismos de cuenca para encontrar todos los elementos seleccionados.
     */
    $("#Municipios option:selected").each(function () {
        query += "pozo.municipio_id=" + $(this).val() + " or ";
    });
    /**
     * Al final el query quedara con un or al final, la siguiente línea quita ese or sobrante.
     * @type {string}
     */
    query = query.slice(0, -3);
    query += " AND pozo.tipo_id=" + $val;
    return query;
}

async function acuferoTitulo() {
    var query = "(";
    //Se recorre el select de acuiferos.
    $("#Acuiferos option:selected").each(function () {
        query += "acuifero_id=" + $(this).val() + " or ";
    });
    //municipios
    if ($("#Municipios option:selected").val() != null) {
        query = query.slice(0, -4);
        query += ") AND (";
        //Se recorre el select de tipos.
        $("#Municipios option:selected").each(function () {
            query += "muni_id=" + $(this).val() + " or ";
        });
    }
    //Tipos
    if ($("#Tipos option:selected").val() != null) {
        query = query.slice(0, -4);
        query += ") AND (";
        //Se recorre el select de tipos.
        $("#Tipos option:selected").each(function () {
            query += "tipo_id=" + $(this).val() + " or ";
        });
    }
    //Usos
    if ($("#Usos option:selected").val() != null) {
        query = query.slice(0, -4);
        query += ") AND (";
        //Se recorre el select de tipos.
        $("#Usos option:selected").each(function () {
            query += "uso_id=" + $(this).val() + " or ";
        });
    }
    //Estados
    if ($("#Estados option:selected").val() != null) {
        query = query.slice(0, -4);
        query += ") AND (";
        //Se recorre el select de tipos.
        $("#Estados option:selected").each(function () {
            query += "estado_id=" + $(this).val() + " or ";
        });
    }
    query = query.slice(0, -4);
    query += ")";
    return query;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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
     * Cargamos los OC
     */
    getOC_SIG(function () {
        /**
         * Cargamos los Estados
         */
        getEst_SIG(function () {
            /**
             * Cargamos los Municipios
             */
            getAcu_SIG(function () {
                /**
                 * Si Esta seleccionado los acuferos
                 */
                if ($("#Acuiferos option:selected").val() != null && $val == 1) {


                    /**
                     * Obtenemos los acuiferos
                     */
                    getMuni_SIG(function () {

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
                                "Municipios": GroupoMunSelect,
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
                            "Municipios": GroupoMunSelect,
                            "Pozos": GroupoPozosSelect,
                        }
                        var lc = L.control.layers(null, overlays);
                        lc.addTo(map);
                        Swal.close();
                    });
                }
            });
        });
    });
}