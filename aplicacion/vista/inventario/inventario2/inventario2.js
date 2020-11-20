/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 *
 *
 *  Este script es el encargado de realizar y mostrar toda la información relacionada con
 * la consulta de la estadística agrícola,
 *  específicamente el Informe estadístico de producción agrícola
 */

/**
 * Se aplica el estilo al select de organismo de cuenca
 */
citas = "";
query = '';
$("#Organismos").multiselect({
    columns: 1,
    search: true,
    selectAll: false,
    texts: {
        placeholder: "Seleccione un Organismo de Cuenca",
        search: "Buscar Organismos de Cuenca",
    },
    onOptionClick: function( element, option ) {
        var maxSelect = 1;

        // too many selected, deselect this option
        if( $(element).val().length > maxSelect ) {
            if( $(option).is(':checked') ) {
                var thisVals = $(element).val();

                thisVals.splice(
                    thisVals.indexOf( $(option).val() ), 1
                );

                $(element).val( thisVals );

                $(option).prop( 'checked', false ).closest('li')
                    .toggleClass('selected');
            }
        }
        // max select reached, disable non-checked checkboxes
        else if( $(element).val().length == maxSelect ) {
            $(element).next('.ms-options-wrap')
                .find('li:not(.selected)').addClass('disabled')
                .find('input[type="checkbox"]')
                .attr( 'disabled', 'disabled' );
        }
            // max select not reached, make sure any disabled
        // checkboxes are available
        else {
            $(element).next('.ms-options-wrap')
                .find('li.disabled').removeClass('disabled')
                .find('input[type="checkbox"]')
                .removeAttr( 'disabled' );
        }
    }
});

/**
 * Se aplica el estilo para el select de los estados
 */
$("#Estados").multiselect({
    columns: 1,
    search: true,
    selectAll: false,
    texts: {
        placeholder: "Seleccione un Estado",
        search: "Buscar Estado",
    },
    onOptionClick: function( element, option ) {
        var maxSelect = 1;

        // too many selected, deselect this option
        if( $(element).val().length > maxSelect ) {
            if( $(option).is(':checked') ) {
                var thisVals = $(element).val();

                thisVals.splice(
                    thisVals.indexOf( $(option).val() ), 1
                );

                $(element).val( thisVals );

                $(option).prop( 'checked', false ).closest('li')
                    .toggleClass('selected');
            }
        }
        // max select reached, disable non-checked checkboxes
        else if( $(element).val().length == maxSelect ) {
            $(element).next('.ms-options-wrap')
                .find('li:not(.selected)').addClass('disabled')
                .find('input[type="checkbox"]')
                .attr( 'disabled', 'disabled' );
        }
            // max select not reached, make sure any disabled
        // checkboxes are available
        else {
            $(element).next('.ms-options-wrap')
                .find('li.disabled').removeClass('disabled')
                .find('input[type="checkbox"]')
                .removeAttr( 'disabled' );
        }
    }
});

/**
 * Se aplica el estilo al select de los Distritos
 */
$("#Distritos").multiselect({
    columns: 1,
    search: true,
    selectAll: false,
    texts: {
        placeholder: "Seleccione un Distrito",
        search: "Buscar Distrito",
    },
    onOptionClick: function( element, option ) {
        var maxSelect = 1;

        // too many selected, deselect this option
        if( $(element).val().length > maxSelect ) {
            if( $(option).is(':checked') ) {
                var thisVals = $(element).val();

                thisVals.splice(
                    thisVals.indexOf( $(option).val() ), 1
                );

                $(element).val( thisVals );

                $(option).prop( 'checked', false ).closest('li')
                    .toggleClass('selected');
            }
        }
        // max select reached, disable non-checked checkboxes
        else if( $(element).val().length == maxSelect ) {
            $(element).next('.ms-options-wrap')
                .find('li:not(.selected)').addClass('disabled')
                .find('input[type="checkbox"]')
                .attr( 'disabled', 'disabled' );
        }
            // max select not reached, make sure any disabled
        // checkboxes are available
        else {
            $(element).next('.ms-options-wrap')
                .find('li.disabled').removeClass('disabled')
                .find('input[type="checkbox"]')
                .removeAttr( 'disabled' );
        }
    }
});

/**
 *Se inicializa el multiselect  Ciclos agricolas
$("#Fuentes").multiselect({
    columns: 1,
    search: true,
    selectAll: true,
    texts: {
        placeholder: "Seleccione una Fuente",
        search: "Buscar Fuente",
    },
});*/

/**
 *Se inicializa el multiselect  Ciclos agricolas
 */
$("#Modulos").multiselect({
    columns: 1,
    search: true,
    selectAll: true,
    texts: {
        placeholder: "Seleccione un Modulo",
        search: "Buscar Modulos",
    },
});

/**
 *
 * @constructor
 * * Esta función controla todos los cambios del select de organismos de cuenca.
 * La función básicamente lo que realiza es leer todas las opciones seleccionadas desde la vista,
 * limpia las capas del mapa, limpia los select que dependen de él, prepara una sentencia MySQL y
 * retorna en este caso los estados que dependen de un organismo de cuenta además de los shapes de los organismos.
 *
 */
async function Organismos() {
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Cargando Datos",
        allowEscapeKey: false,
    allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    $("#Modulos").multiselect("reset");
    /**
     * Esta línea de código llama a la función que limpia la capa de organismos de cuenca
     */
    await limpiarOrganismos();
    var query = "(";
    if ($("#Organismos option:selected").length != 0) {
        $("#Organismos option:selected").each(function () {
            query += "id_organismo=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') GROUP BY id_estado';
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
            const cadena = "query=" + query + "&Accion=InventarioTabla";
            var data = [];
            /**
             * Se manda a llamar por medio de Ajax a la función de estados en el controlador de mapa
             */
            $.ajax({
                type: "POST",
                url: "/aplicacion/controlador/inventariodr.php",
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
                         * Por medio del plugin de multiselect, podemos agregar los objetos del array al select de estados
                         */
                        data.push({
                            name: item.estado,
                            value: item.id_estado,
                            checked: false,
                        });
                    });
                    $("#Estados").multiselect("loadOptions", data);
                },
            }).always(function () {
                Swal.close();
            });
        } else {
            Swal.close();
        }
    } else {
        Swal.close();
    }
}

/**
 *
 * @constructor
 *  Esta función controla todos los cambios del select de estados.
 * La función básicamente lo que realiza es leer todas las opciones seleccionadas desde la vista,
 * limpia las capas del mapa, limpia los select que dependen de él, prepara una sentencia MySQL y
 * retorna en este caso los Distritos que dependen de un organismo de cuenta además de los shapes de los organismos.
 *
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
    await limpiarEstados();
    $("#Modulos").multiselect("reset");
    var query = "(";
    if ($("#Organismos option:selected").length != 0 && $("#Estados option:selected").length != 0) {
        $("#Organismos option:selected").each(function () {
            query += "id_organismo=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') AND (';
        $("#Estados option:selected").each(function () {
            query += "id_estado=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') GROUP BY id_distrito_riego';
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
            const cadena = "query=" + query + "&Accion=InventarioTabla";
            var data = [];
            /**
             * Se manda a llamar por medio de Ajax a la función de estados en el controlador de mapa
             */
            $.ajax({
                type: "POST",
                url: "/aplicacion/controlador/inventariodr.php",
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
                         * Por medio del plugin de multiselect, podemos agregar los objetos del array al select de estados
                         */
                        data.push({
                            name: item.id_distrito_riego + ' - ' + item.distrito,
                            value: item.id_distrito_riego,
                            checked: false,
                        });
                    });
                    $("#Distritos").multiselect("loadOptions", data);
                },
            }).always(function () {
                Swal.close();
            });
        } else {
            Swal.close();
        }
    } else {
        Swal.close();
    }
}

async function Distrito() {
    await limpiarDR();
}

/**
 * Obtener Modulos
 * @returns {Promise<void>}
 */
async function getModulos() {
    $("#Modulos").multiselect("reset");
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Cargando Datos",
        allowEscapeKey: false,
    allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    if ($("#Organismos option:selected").length != 0 &&
        $("#Estados option:selected").length != 0 &&
        $("#Distritos option:selected").length != 0) {
        var query = "(";
        /**
         * Se tiene que recorrer el select de organismos de cuenca para encontrar todos los elementos seleccionados.
        $("#Fuentes option:selected").each(function () {
            query += "id_fuente=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') AND (';*/
        $("#Organismos option:selected").each(function () {
            query += "id_organismo=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') AND (';
        $("#Estados option:selected").each(function () {
            query += "id_estado=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') AND (';
        $("#Distritos option:selected").each(function () {
            query += "id_distrito_riego=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') AND (grupo=\'Modulo\'or grupo=\'SRL\' or grupo=\'OCRM\') GROUP BY id_modulo';
        const cadena = "query=" + query + "&Accion=InventarioTabla";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/inventariodr.php",
            data: cadena,
            //Si el controlador devuelve una respuesta
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    if (item.nom_oficial === '') {
                        data.push({
                            name: item.nombre,
                            value: item.id_modulo,
                            checked: false,
                        });
                    } else {
                        data.push({
                            name: item.nom_oficial,
                            value: item.id_modulo,
                            checked: false,
                        });
                    }
                });
            },
        }).always(function () {
            $("#Modulos").multiselect("loadOptions", data);
            Swal.close();
        });
    } else {
        Swal.close();
    }
}

/**
 *
 * @returns {Promise<void>}
 * @constructor
 * Funcion para realizar la consulta de las selecicones con sus respectivos shapes
 */
async function Consultar() {
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Realizando la consulta",
        allowEscapeKey: false,
    allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    $('#nav-tab-acu a[href="#nav-01"]').tab("show");
    /**
     * Llmamos a deshabilitar y a limpiar los Distritos
     */
    await deshabilitar();
    const OC = await selectOrganismo();
    const Est = await selectEst();
    const DR = await selectDR();
    //const Fuente = await selectFuente();
    const Mod=await selectModulo();
    /**
     * Se verifica que el query de Organismos ese vacio
     */
    if (OC !== "" && Est !== "" && DR !== "" && Mod !== "") {
        //AJAX que se encarga de extraer las citas de la información seleccionda
        query = "(" + OC + ") AND (" + Est + ") AND (" + DR + ") AND (" + Mod + ")";
        await desgloce1(query);
        await habilitar();
        await Historial();
    } else {
        /**
         *
         * @returns {Promise<void>}
         * Si algun selector esta vacio, se muestra un mensaje de error.
         *
         */
        swal(
            "Algo está mal.",
            "Todos los filtros tienen que tener al menos un elemento seleccionado"
        );
        await habilitar();
        $("#pantalla").hide();
        $("#divPrioridad").hide();
        $("#botonMapa").hide();
        $("#referencias").hide();
        await Swal.close();
    }
}

/**
 *
 * @returns {Promise<void>}
 * @constructor
 * Funcion para guardar la consulta en el historial
 */
async function Historial() {
    /**
     *
     * Guardamos en es historial
     *
     */
    cadena = "Modulo=Estadística Agrícola" + "&Accion=Historial";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/mapa.php",
        data: cadena,
        /**
         *
         * @param {type} resp
         * @returns {Boolean}
         * Si el controlador devuelve una respuesta
         *
         */
        success: function (resp) {
            return true;
        },
    });
}

/**
 *
 * @returns {undefined}
 *  Funcion que limpia la capa de organimos asi como de las capas que dependen directamente de ellas
 *
 */
async function limpiarOrganismos() {
    $("#Estados").multiselect("reset");
    await limpiarEstados();
}

/**
 *
 * @returns {undefined}
 * Funcion para limpiar la capa de estados
 *
 */
async function limpiarEstados() {
    $("#Distritos").multiselect("reset");
    await limpiarDR();
}

/**
 *
 * @returns {undefined}
 * Funcion para limpiar la capa de Distritos
 *
 */
async function limpiarDR() {
    /**
     * Limpia su porpia capa
     */
    map.off();
    map.remove();
    crearMapa();
    //$("#Fuentes").multiselect("reset2");
    $("#Modulos").multiselect("reset");
}

/**
 * Funcion que concatena los estados seleccionados del select
 * @returns {Promise<string>}
 */
async function concatEstado() {
    /*prueba prueba prueba */

    var query = "";
    query = "(" + (await concatOrganismo()) + ")";
    query = query + "AND (";

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
    query = query + ");";
    return query;
}

/**
 *
 * Funcion que carga los shape de los estados
 * @returns {Promise<string>}
 *
 */
async function selectOrganismo() {
    var OC = "";
    $("#Organismos option:selected")
        .each(async function () {
            OC += "id_organismo=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            OC = OC.slice(0, -3);
        });
    return OC;
}

/**
 *
 * Funcion que carga los shape de los estados
 * @returns {Promise<string>}
 *
 */
async function selectEst() {
    var Est = "";
    $("#Estados option:selected")
        .each(async function () {
            Est += "id_estado=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            Est = Est.slice(0, -3);
        });
    return Est;
}

/**
 *
 * @returns {String|selectDR.DR}
 * Funcion que obtiene los Distritos de riego seleccionados
 *
 */
async function selectDR() {
    var DR = "";
    $("#Distritos option:selected")
        .each(async function () {
            DR += 'id_distrito_riego="' + $(this).val() + '" or ';
        })
        .promise()
        .always(async function () {
            DR = DR.slice(0, -3);
        });
    return DR;
}

async function selectModulo() {
    var Mod = "";
    $("#Modulos option:selected")
        .each(async function () {
            Mod += 'id_modulo="' + $(this).val() + '" or ';
        })
        .promise()
        .always(async function () {
            Mod = Mod.slice(0, -3);
        });
    return Mod;
}

/**
 *
 * @returns {selectTenencia.Tenencias|String}
 * Funciones que obtienen lasa tenencias seleccionadas
 *
 */
async function selectFuente() {
    var Fuentes = "";
    $("#Fuentes option:selected")
        .each(async function () {
            Fuentes += "id_fuente=" + $(this).val() + " or ";
        })
        .promise()
        .always(async function () {
            Fuentes = Fuentes.slice(0, -3);
        });
    return Fuentes;
}

/**
 *
 * @param {type} query
 * @returns {undefined}
 * Desgloce por Organismo
 * Funcion que muestra el primer desgloce de informacion estadistica
 */
async function desgloce1(query) {
    document.getElementById("nav-01").innerHTML = "";
    document.getElementById("nav-02").innerHTML = "";
    document.getElementById("nav-03").innerHTML = "";
    var query2 = query + " GROUP by id_organismo,id_estado,id_distrito_riego,id_modulo ORDER BY id_organismo,id_estado,id_distrito_riego,id_modulo";
    /*
     *
     * @type String
     * Variable con los datos a enviar al controlador
     */
    var cadena = "query=" + query2 + "&Accion=InventarioTabla";
    /*
     * Se limpia el html y se coloca el encabezado
     */
    $("#nav-01").append(
        '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Inventario de Obras Por Organismo de Cuenca</h3></div>'
    );

    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/inventariodr.php",
        data: cadena,
        /*
         *
         * @param {type} resp2
         * @returns {undefined}
         * Si el controlador devuelve una respuesta
         *
         */
        success: function (resp2) {

            /*
             * Se coloca la seccion del anio seleccionado
             */
            $("#nav-01").append(
                '<div class="panel-body" id="body1">' + "</div>"
            );
            /*
             * Se itera sobre los DR seleccionados
             */
            $("#Organismos option:selected").each(async function () {
                var OC = $(this).val();
                var data = [];
                var OT_sup_dominada = 0;
                var OT_sup_regable = 0;
                var OT_usuarios = 0;
                var OT_presa_almacenamiento = 0;
                var OT_presa_derivacio = 0;
                var OT_diques = 0;
                var OT_ptas_bomb = 0;
                var OT_pozos = 0;
                var OT_principal_rev_conc = 0;
                var OT_principal_rev_mamp = 0;
                var OT_principal_sin_rev = 0;
                var OT_principal_suma = 0;
                var OT_secundario_rev_conc = 0;
                var OT_secundario_rev_mamp = 0;
                var OT_secundario_sin_rev = 0;
                var OT_secundario_suma = 0;
                var OT_entubado = 0;
                var OT_entubados_total = 0;
                var OT_red_drenaje_principal = 0;
                var OT_red_drenaje_secundario = 0;
                var OT_red_drenaje_suma = 0;
                var OT_red_caminos_pavimentados = 0;
                var OT_red_caminos_revestidos = 0;
                var OT_red_caminos_terraceria = 0;
                var OT_red_caminos_total = 0;
                var OT_estructuras_canales = 0;
                var OT_etructura_drenes = 0;
                var OT_estructuras_caminos = 0;
                var OT_estructuras_suma = 0;
                var OT_edificios_casetas = 0;
                var OT_obras_diveversas = 0;
                var OC_sup_dominada = 0;
                var OC_sup_regable = 0;
                var OC_usuarios = 0;
                var OC_presa_almacenamiento = 0;
                var OC_presa_derivacio = 0;
                var OC_diques = 0;
                var OC_ptas_bomb = 0;
                var OC_pozos = 0;
                var OC_principal_rev_conc = 0;
                var OC_principal_rev_mamp = 0;
                var OC_principal_sin_rev = 0;
                var OC_principal_suma = 0;
                var OC_secundario_rev_conc = 0;
                var OC_secundario_rev_mamp = 0;
                var OC_secundario_sin_rev = 0;
                var OC_secundario_suma = 0;
                var OC_entubado = 0;
                var OC_entubados_total = 0;
                var OC_red_drenaje_principal = 0;
                var OC_red_drenaje_secundario = 0;
                var OC_red_drenaje_suma = 0;
                var OC_red_caminos_pavimentados = 0;
                var OC_red_caminos_revestidos = 0;
                var OC_red_caminos_terraceria = 0;
                var OC_red_caminos_total = 0;
                var OC_estructuras_canales = 0;
                var OC_etructura_drenes = 0;
                var OC_estructuras_caminos = 0;
                var OC_estructuras_suma = 0;
                var OC_edificios_casetas = 0;
                var OC_obras_diveversas = 0;
                $.each(JSON.parse(resp2), function (index, item) {
                    var nombre_mod;
                    if (OC === item.id_organismo) {
                        if (item.nom_oficial === '') {
                            nombre_mod = item.nombre;
                        } else {
                            nombre_mod = item.nom_oficial;
                        }

                        data.push([
                            item.estado,
                            item.id_distrito_riego + '-' + item.distrito,
                            nombre_mod,
                            item.aprovechameinto,
                            numeral(item.sup_dominada).format("0,0.00"),
                            numeral(item.sup_regable).format("0,0.00"),
                            numeral(item.usuarios).format("0,0"),
                            numeral(item.presa_almacenamiento).format("0,0"),
                            numeral(item.presa_derivacio).format("0,0"),
                            numeral(item.diques).format("0,0"),
                            numeral(item.ptas_bomb).format("0,0"),
                            numeral(item.pozos).format("0,0"),
                            numeral(item.principal_rev_conc).format("0,0.00"),
                            numeral(item.principal_rev_mamp).format("0,0.00"),
                            numeral(item.principal_sin_rev).format("0,0.00"),
                            numeral(item.principal_suma).format("0,0.00"),
                            numeral(item.secundario_rev_conc).format("0,0.00"),
                            numeral(item.secundario_rev_mamp).format("0,0.00"),
                            numeral(item.secundario_sin_rev).format("0,0.00"),
                            numeral(item.secundario_suma).format("0,0.00"),
                            numeral(item.entubado).format("0,0.00"),
                            numeral(item.entubados_total).format("0,0.00"),
                            numeral(item.red_drenaje_principal).format("0,0.00"),
                            numeral(item.red_drenaje_secundario).format("0,0.00"),
                            numeral(item.red_drenaje_suma).format("0,0.00"),
                            numeral(item.red_caminos_pavimentados).format("0,0.00"),
                            numeral(item.red_caminos_revestidos).format("0,0.00"),
                            numeral(item.red_caminos_terraceria).format("0,0.00"),
                            numeral(item.red_caminos_total).format("0,0.00"),
                            numeral(item.estructuras_canales).format("0,0"),
                            numeral(item.etructura_drenes).format("0,0"),
                            numeral(item.estructuras_caminos).format("0,0"),
                            numeral(item.estructuras_suma).format("0,0"),
                            numeral(item.edificios_casetas).format("0,0"),
                            numeral(item.obras_diveversas).format("0,0")
                        ]);
                        if (item.grupo === 'OCRM') {
                            OC_sup_dominada += parseFloat(item.sup_dominada)
                            OC_sup_regable += parseFloat(item.sup_regable)
                            OC_usuarios += parseFloat(item.usuarios)
                            OC_presa_almacenamiento += parseFloat(item.presa_almacenamiento)
                            OC_presa_derivacio += parseFloat(item.presa_derivacio)
                            OC_diques += parseFloat(item.diques)
                            OC_ptas_bomb += parseFloat(item.ptas_bomb)
                            OC_pozos += parseFloat(item.pozos)
                            OC_principal_rev_conc += parseFloat(item.principal_rev_conc)
                            OC_principal_rev_mamp += parseFloat(item.principal_rev_mamp)
                            OC_principal_sin_rev += parseFloat(item.principal_sin_rev)
                            OC_principal_suma += parseFloat(item.principal_suma)
                            OC_secundario_rev_conc += parseFloat(item.secundario_rev_conc)
                            OC_secundario_rev_mamp += parseFloat(item.secundario_rev_mamp)
                            OC_secundario_sin_rev += parseFloat(item.secundario_sin_rev)
                            OC_secundario_suma += parseFloat(item.secundario_suma)
                            OC_entubado += parseFloat(item.entubado)
                            OC_entubados_total += parseFloat(item.entubados_total)
                            OC_red_drenaje_principal += parseFloat(item.red_drenaje_principal)
                            OC_red_drenaje_secundario += parseFloat(item.red_drenaje_secundario)
                            OC_red_drenaje_suma += parseFloat(item.red_drenaje_suma)
                            OC_red_caminos_pavimentados += parseFloat(item.red_caminos_pavimentados)
                            OC_red_caminos_revestidos += parseFloat(item.red_caminos_revestidos)
                            OC_red_caminos_terraceria += parseFloat(item.red_caminos_terraceria)
                            OC_red_caminos_total += parseFloat(item.red_caminos_total)
                            OC_estructuras_canales += parseFloat(item.estructuras_canales)
                            OC_etructura_drenes += parseFloat(item.etructura_drenes)
                            OC_estructuras_caminos += parseFloat(item.estructuras_caminos)
                            OC_estructuras_suma += parseFloat(item.estructuras_suma)
                            OC_edificios_casetas += parseFloat(item.edificios_casetas)
                            OC_obras_diveversas += parseFloat(item.obras_diveversas)
                        }
                        else {
                            OT_sup_dominada += parseFloat(item.sup_dominada)
                            OT_sup_regable += parseFloat(item.sup_regable)
                            OT_usuarios += parseFloat(item.usuarios)
                            OT_presa_almacenamiento += parseFloat(item.presa_almacenamiento)
                            OT_presa_derivacio += parseFloat(item.presa_derivacio)
                            OT_diques += parseFloat(item.diques)
                            OT_ptas_bomb += parseFloat(item.ptas_bomb)
                            OT_pozos += parseFloat(item.pozos)
                            OT_principal_rev_conc += parseFloat(item.principal_rev_conc)
                            OT_principal_rev_mamp += parseFloat(item.principal_rev_mamp)
                            OT_principal_sin_rev += parseFloat(item.principal_sin_rev)
                            OT_principal_suma += parseFloat(item.principal_suma)
                            OT_secundario_rev_conc += parseFloat(item.secundario_rev_conc)
                            OT_secundario_rev_mamp += parseFloat(item.secundario_rev_mamp)
                            OT_secundario_sin_rev += parseFloat(item.secundario_sin_rev)
                            OT_secundario_suma += parseFloat(item.secundario_suma)
                            OT_entubado += parseFloat(item.entubado)
                            OT_entubados_total += parseFloat(item.entubados_total)
                            OT_red_drenaje_principal += parseFloat(item.red_drenaje_principal)
                            OT_red_drenaje_secundario += parseFloat(item.red_drenaje_secundario)
                            OT_red_drenaje_suma += parseFloat(item.red_drenaje_suma)
                            OT_red_caminos_pavimentados += parseFloat(item.red_caminos_pavimentados)
                            OT_red_caminos_revestidos += parseFloat(item.red_caminos_revestidos)
                            OT_red_caminos_terraceria += parseFloat(item.red_caminos_terraceria)
                            OT_red_caminos_total += parseFloat(item.red_caminos_total)
                            OT_estructuras_canales += parseFloat(item.estructuras_canales)
                            OT_etructura_drenes += parseFloat(item.etructura_drenes)
                            OT_estructuras_caminos += parseFloat(item.estructuras_caminos)
                            OT_estructuras_suma += parseFloat(item.estructuras_suma)
                            OT_edificios_casetas += parseFloat(item.edificios_casetas)
                            OT_obras_diveversas += parseFloat(item.obras_diveversas)
                        }
                    }
                });
                var T_sup_dominada = OC_sup_dominada + OT_sup_dominada;
                var T_sup_regable = OC_sup_regable + OT_sup_regable;
                var T_usuarios = OC_usuarios + OT_usuarios;
                var T_presa_almacenamiento = OC_presa_almacenamiento + OT_presa_almacenamiento;
                var T_presa_derivacio = OC_presa_derivacio + OT_presa_derivacio;
                var T_diques = OC_diques + OT_diques;
                var T_ptas_bomb = OC_ptas_bomb + OT_ptas_bomb;
                var T_pozos = OC_pozos + OT_pozos;
                var T_principal_rev_conc = OC_principal_rev_conc + OT_principal_rev_conc;
                var T_principal_rev_mamp = OC_principal_rev_mamp + OT_principal_rev_mamp;
                var T_principal_sin_rev = OC_principal_sin_rev + OT_principal_sin_rev;
                var T_principal_suma = OC_principal_suma + OT_principal_suma;
                var T_secundario_rev_conc = OC_secundario_rev_conc + OT_secundario_rev_conc;
                var T_secundario_rev_mamp = OC_secundario_rev_mamp + OT_secundario_rev_mamp;
                var T_secundario_sin_rev = OC_secundario_sin_rev + OT_secundario_sin_rev;
                var T_secundario_suma = OC_secundario_suma + OT_secundario_suma;
                var T_entubado = OC_entubado + OT_entubado;
                var T_entubados_total = OC_entubados_total + OT_entubados_total;
                var T_red_drenaje_principal = OC_red_drenaje_principal + OT_red_drenaje_principal;
                var T_red_drenaje_secundario = OC_red_drenaje_secundario + OT_red_drenaje_secundario;
                var T_red_drenaje_suma = OC_red_drenaje_suma + OT_red_drenaje_suma;
                var T_red_caminos_pavimentados = OC_red_caminos_pavimentados + OT_red_caminos_pavimentados;
                var T_red_caminos_revestidos = OC_red_caminos_revestidos + OT_red_caminos_revestidos;
                var T_red_caminos_terraceria = OC_red_caminos_terraceria + OT_red_caminos_terraceria;
                var T_red_caminos_total = OC_red_caminos_total + OT_red_caminos_total;
                var T_estructuras_canales = OC_estructuras_canales + OT_estructuras_canales;
                var T_etructura_drenes = OC_etructura_drenes + OT_etructura_drenes;
                var T_estructuras_caminos = OC_estructuras_caminos + OT_estructuras_caminos;
                var T_estructuras_suma = OC_estructuras_suma + OT_estructuras_suma;
                var T_edificios_casetas = OC_edificios_casetas + OT_edificios_casetas;
                var T_obras_diveversas = OC_obras_diveversas + OT_obras_diveversas;
                var tabla = "#T1-" + OC;

                if (data.length > 0) {
                    $("#body1").append(
                        '<h4>' + $(this).text() + '</h4>' +
                        '<div style="overflow-x:auto;">' +
                        '<table id="T1-' + OC + '" cellpadding="0" cellspacing="0" border="0" class="table table-bordered  nowrap"  width="100%">' +
                        '<tfoot>' +
                        '<tr>' +
                        '<td style="background-color:#52BE80" colspan="4" align="center"><b>Obras Transferidas</b></th>' +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_sup_dominada).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_sup_regable).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_usuarios).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_presa_almacenamiento).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_presa_derivacio).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_diques).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_ptas_bomb).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_pozos).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_principal_rev_conc).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_principal_rev_mamp).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_principal_sin_rev).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_principal_suma).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_secundario_rev_conc).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_secundario_rev_mamp).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_secundario_sin_rev).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_secundario_suma).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_entubado).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_entubados_total).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_red_drenaje_principal).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_red_drenaje_secundario).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_red_drenaje_suma).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_red_caminos_pavimentados).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_red_caminos_revestidos).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_red_caminos_terraceria).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_red_caminos_total).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_estructuras_canales).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_etructura_drenes).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_estructuras_caminos).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_estructuras_suma).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_edificios_casetas).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OT_obras_diveversas).format("0,0") + "</b></td>" +
                        '</tr>' +
                        '<tr>' +
                        '<td style="background-color:#52BE80" colspan="4" align="center"><b>Obras Cabeza Res Mayor</b></th>' +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_sup_dominada).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_sup_regable).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_usuarios).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_presa_almacenamiento).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_presa_derivacio).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_diques).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_ptas_bomb).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_pozos).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_principal_rev_conc).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_principal_rev_mamp).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_principal_sin_rev).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_principal_suma).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_secundario_rev_conc).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_secundario_rev_mamp).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_secundario_sin_rev).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_secundario_suma).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_entubado).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_entubados_total).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_red_drenaje_principal).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_red_drenaje_secundario).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_red_drenaje_suma).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_red_caminos_pavimentados).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_red_caminos_revestidos).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_red_caminos_terraceria).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_red_caminos_total).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_estructuras_canales).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_etructura_drenes).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_estructuras_caminos).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_estructuras_suma).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_edificios_casetas).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(OC_obras_diveversas).format("0,0") + "</b></td>" +
                        '</tr>' +
                        '<tr>' +
                        '<td style="background-color:#52BE80" colspan="4" align="center"><b>Total Region</b></th>' +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_sup_dominada).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_sup_regable).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_usuarios).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_presa_almacenamiento).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_presa_derivacio).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_diques).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_ptas_bomb).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_pozos).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_principal_rev_conc).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_principal_rev_mamp).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_principal_sin_rev).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_principal_suma).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_secundario_rev_conc).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_secundario_rev_mamp).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_secundario_sin_rev).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_secundario_suma).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_entubado).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_entubados_total).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_red_drenaje_principal).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_red_drenaje_secundario).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_red_drenaje_suma).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_red_caminos_pavimentados).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_red_caminos_revestidos).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_red_caminos_terraceria).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_red_caminos_total).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_estructuras_canales).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_etructura_drenes).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_estructuras_caminos).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_estructuras_suma).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_edificios_casetas).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_obras_diveversas).format("0,0") + "</b></td>" +
                        '</tr>' +
                        '</tfoot></table><hr>' +
                        '</div>'
                    );
                    tabla4 = $(tabla).DataTable({
                        /*
                         * Se crean las columnas
                         */
                        columns: [
                            {
                                title: "Estado",
                            },
                            {
                                title: "Distrito de Riego",
                            },
                            {
                                title: "Modulo",
                            },
                            {
                                title: "Fuente",
                            },
                            {
                                title: "Superficie Dominada (ha)",
                            },
                            {
                                title: "Superficie Regable (ha)",
                            },
                            {
                                title: "Usuarios",
                            },
                            {
                                title: "Presas Almacenamiento (pza)",
                            },
                            {
                                title: "Presas Derivacióm (pza)",
                            },
                            {
                                title: "Diques (pza)",
                            },
                            {
                                title: "Puertas de Bombeo (pza)",
                            },
                            {
                                title: "Pozos (pza)",
                            },
                            {
                                title: "Principal Rev. Conc (km)",
                            },
                            {
                                title: "Principal Rev. Mamp (km)",
                            },
                            {
                                title: "Principal Sin Rev (km)",
                            },
                            {
                                title: "Principal Suma (km)",
                            },
                            {
                                title: "Secundario Rev. Conc (km)",
                            },
                            {
                                title: "Secundario Rev. Mamp (km)",
                            },
                            {
                                title: "Secundario Sin Rev (km)",
                            },
                            {
                                title: "Secundario Suma (km)",
                            },
                            {
                                title: "Entubados (km)",
                            },
                            {
                                title: "Total (km)",
                            },
                            {
                                title: "Red Drenaje Principales (km)",
                            },
                            {
                                title: "Red Drenaje Secundarios (km)",
                            },
                            {
                                title: "Suma Red Drenaje (km)",
                            },
                            {
                                title: "Red Caminos Pavimentados (km)",
                            },
                            {
                                title: "Red Caminos Revestidos (km)",
                            },
                            {
                                title: "Red Caminos Terracerias (km)",
                            },
                            {
                                title: "Suma Red Caminos (km)",
                            },
                            {
                                title: "Estructuras en Canales (pza)",
                            },
                            {
                                title: "Estructuras en Drenes (pza)",
                            },
                            {
                                title: "Estructuras en Caminos (pza)",
                            },
                            {
                                title: "Suma Estructuras (pza)",
                            },
                            {
                                title: "Casetas y Edificios (pza)",
                            },
                            {
                                title: "Obras Diversas(pza)",
                            },
                        ],
                        /*
                         * Se colocan los datos de la tabla
                         */
                        data: data,
                        /*
                         * Parametros del comportamiento de la tabla
                         */
                        order: [0, "asc"],
                        ordering: false,
                        searching: false,
                        /*
                         * Funcion para obtener los sibtotales
                         */
                        rowGroup: {
                            dataSrc: [0],
                            startRender: function (rows, group) {
                                /*
                                 *
                                 * @type type
                                 * Se obtiene el subtotal de la superficie sembrada
                                 */
                                var sup_dom = rows.data().pluck(4).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);

                                var sup_reg = rows.data().pluck(5).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);

                                var usu = rows.data().pluck(6).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);

                                var p_almacenamiento = rows.data().pluck(7).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);

                                var p_derivacion = rows.data().pluck(8).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);

                                var diques = rows.data().pluck(9).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);

                                var ptas_bombeo = rows.data().pluck(10).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);

                                var pozos = rows.data().pluck(11).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);

                                var rev_conc = rows.data().pluck(12).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);

                                var principal_rev_mamp = rows.data().pluck(13).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var principal_sin_rev = rows.data().pluck(14).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var principal_suma = rows.data().pluck(15).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var secundario_rev_conc = rows.data().pluck(16).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var secundario_rev_mamp = rows.data().pluck(17).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var secundario_sin_rev = rows.data().pluck(18).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var secundario_suma = rows.data().pluck(19).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var entubado = rows.data().pluck(20).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var entubados_total = rows.data().pluck(21).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var red_drenaje_principal = rows.data().pluck(22).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var red_drenaje_secundario = rows.data().pluck(23).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var red_drenaje_suma = rows.data().pluck(24).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var red_caminos_pavimentados = rows.data().pluck(25).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var red_caminos_revestidos = rows.data().pluck(26).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var red_caminos_terraceria = rows.data().pluck(27).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var red_caminos_total = rows.data().pluck(28).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var estructuras_canales = rows.data().pluck(29).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var etructura_drenes = rows.data().pluck(30).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var estructuras_caminos = rows.data().pluck(31).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var estructuras_suma = rows.data().pluck(32).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var edificios_casetas = rows.data().pluck(33).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                var obras_diveversas = rows.data().pluck(34).reduce(function (a, b) {
                                    return (parseFloat(numeral(a.toString()).value()) + parseFloat(numeral(b.toString()).value()) * 1);
                                }, 0);
                                return $("<tr/>").append(
                                    '<td style="background-color:#A9DFBF" colspan="3"><b>' + group + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(sup_dom)).format("0,0.00") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(sup_reg)).format("0,0.00") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(usu)).format("0,0") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(p_almacenamiento)).format("0,0") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(p_derivacion)).format("0,0") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(diques)).format("0,0") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(ptas_bombeo)).format("0,0") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(pozos)).format("0,0") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(rev_conc)).format("0,0.00") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(principal_rev_mamp)).format("0,0.00") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(principal_sin_rev)).format("0,0.00") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(principal_suma)).format("0,0.00") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(secundario_rev_conc)).format("0,0.00") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(secundario_rev_mamp)).format("0,0.00") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(secundario_sin_rev)).format("0,0.00") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(secundario_suma)).format("0,0.00") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(entubado)).format("0,0.00") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(entubados_total)).format("0,0.00") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(red_drenaje_principal)).format("0,0.00") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(red_drenaje_secundario)).format("0,0.00") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(red_drenaje_suma)).format("0,0.00") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(red_caminos_pavimentados)).format("0,0.00") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(red_caminos_revestidos)).format("0,0.00") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(red_caminos_terraceria)).format("0,0.00") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(red_caminos_total)).format("0,0.00") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(estructuras_canales)).format("0,0") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(etructura_drenes)).format("0,0") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(estructuras_caminos)).format("0,0") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(estructuras_suma)).format("0,0") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(edificios_casetas)).format("0,0") + "</b></td>" +
                                    '<td style="background-color:#A9DFBF" align="right" ><b>' + numeral(Math.round(obras_diveversas)).format("0,0") + "</b></td>"
                                );
                            },
                        },
                        columnDefs: [
                            {targets: [0], visible: false},
                            {
                                className: 'dt-body-right',
                                targets: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,34],
                            },
                        ],
                        language: {
                            url:
                                "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
                        },
                        paging: false,
                        dom: "Bfrtip",
                        /*
                         * Creacion del boton de exportar en excel
                         */
                        buttons: [
                            {
                                extend: "excelHtml5",
                                title: "Inventario de Obras Organismo de Cuenca: " + OC,
                                className: "btn btn-gob btn-sm",
                                text: "Exportar Excel",
                            },
                            {
                                extend: "pdfHtml5",
                                title: "Inventario de Obras Organismo de Cuenca: " + OC,
                                className: "btn btn-gob btn-sm",
                                text: "Exportar PDF",
                                messageBottom: citas,
                                orientation: "landscape",
                                pageSize: "A4",
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
                                                    text: "Inventario de Obras Organismo de Cuenca: " + OC,
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
                                                        {
                                                            text: page.toString(),
                                                        },
                                                        " de ",
                                                        {
                                                            text: pages.toString(),
                                                        },
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
                    });
                }
            }); //Fin de la iteracion DR
        },
    }).always(function () {
        Swal.close();
    }); //Fin AJAX para obtener la consulta
}


async function desgloce2() {
    if (!$("#nav-02").html()) {
        Swal.fire({
            title: "Por favor espere", // add html attribute if you want or remove
            html: "Cargando contenido",
            allowEscapeKey: false,
    allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });
        var query2 = query;
        /*
         *
         * @type String
         * Variable con los datos a enviar al controlador
         */
        var cadena = "query=" + query2 + "&Accion=InventarioTabla";
        $("#nav-02").append(
            '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Resumen Nacional del Inventario de Obras</h3></div>'
        );
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/inventariodr.php",
            data: cadena,
            /*
             *
             * @param {type} resp2
             * @returns {undefined}
             * Si el controlador devuelve una respuesta
             *
             */
            success: function (resp2) {
                /*
                 * Se coloca la seccion del anio seleccionado
                 */
                $("#nav-02").append(
                    '<div class="panel-body" id="body2">' + "</div>"
                );
                var sup_dom = 0;
                var sup_regable = 0;
                var usu = 0;
                var presa_alma = 0;
                var presa_deriv = 0;
                var diques = 0;
                var plantas_bomb = 0;
                var pozos = 0;
                var principal_rev_conc = 0;
                var principal_rev_mamp = 0;
                var principal_sin_rev = 0;
                var principal_suma = 0;
                var secundario_rev_conc = 0;
                var secundario_rev_mamp = 0;
                var secundario_sin_rev = 0;
                var secundario_suma = 0;
                var entubado = 0;
                var entubados_total = 0;
                var canales = 0;
                var red_drenaje_principal = 0;
                var red_drenaje_secundario = 0;
                var red_drenaje = 0;
                var red_caminos_pavimentados = 0;
                var red_caminos_revestidos = 0;
                var red_caminos_terraceria = 0;
                var red_caminos_total = 0;
                var estructuras_canales = 0;
                var etructura_drenes = 0;
                var estructuras_caminos = 0;
                var estructuras_suma = 0;
                var edificios_casetas = 0;
                var obras_diveversas = 0;
                $.each(JSON.parse(resp2), function (index, item) {
                    sup_dom += item.sup_dominada;
                    sup_regable += item.sup_regable;
                    usu += item.usuarios;
                    presa_alma += item.presa_almacenamiento;
                    presa_deriv += item.presa_derivacio;
                    diques += item.diques;
                    plantas_bomb += item.ptas_bomb;
                    pozos += item.pozos;
                    principal_rev_conc += item.principal_rev_conc;
                    principal_rev_mamp += item.principal_rev_mamp;
                    principal_sin_rev += item.principal_sin_rev;
                    principal_suma += item.principal_suma;
                    secundario_rev_conc += item.secundario_rev_conc;
                    secundario_rev_mamp += item.secundario_rev_mamp;
                    secundario_sin_rev += item.secundario_sin_rev;
                    secundario_suma += item.secundario_suma;
                    entubado += item.entubado;
                    entubados_total += item.entubados_total;
                    //Suma de los canales
                    canales += parseFloat(item.principal_suma) + parseFloat(item.secundario_suma) + parseFloat(item.entubado);
                    //
                    red_drenaje_principal += item.red_drenaje_principal
                    red_drenaje_secundario += item.red_drenaje_secundario;
                    red_drenaje += item.red_drenaje_suma;
                    //
                    red_caminos_pavimentados += item.red_caminos_pavimentados;
                    red_caminos_revestidos += item.red_caminos_revestidos;
                    red_caminos_terraceria += item.red_caminos_terraceria;
                    red_caminos_total += item.red_caminos_total;
                    //
                    estructuras_canales += item.estructuras_canales;
                    etructura_drenes += item.etructura_drenes;
                    estructuras_caminos += item.estructuras_caminos;
                    estructuras_suma += item.estructuras_suma;
                    edificios_casetas += item.edificios_casetas;
                    obras_diveversas += item.obras_diveversas;


                });
                $("#body2").append(
                    '<div style="overflow-x:auto;">' +
                    '<table id="T2" cellpadding="0" cellspacing="0" border="0" class="table table-bordered  nowrap"  width="100%">' +
                    '<thead><tr>' +
                    '<th style="background-color:#A9DFBF" scope="col">Tipo de Obra</th>' +
                    '<th style="background-color:#A9DFBF" scope="col">Unidad</th>' +
                    '<th style="background-color:#A9DFBF" scope="col">Cantidad</th>' +
                    '</tr></thead>' +
                    '<tbody>' +
                    //Superfice dominada
                    '<tr>' +
                    '<td>Superficie Dominada</td>' +
                    '<td>ha</td>' +
                    '<td align="right">' + numeral(Math.round(sup_dom)).format("0,0") + '</td>' +
                    '</tr>' +
                    //Superfice REgable
                    '<tr>' +
                    '<td>Superficie Regable</td>' +
                    '<td>ha</td>' +
                    '<td align="right">' + numeral(Math.round(sup_regable)).format("0,0") + '</td>' +
                    '</tr>' +
                    //usuarios
                    '<tr>' +
                    '<td>Usuarios</td>' +
                    '<td>nº</td>' +
                    '<td align="right">' + numeral(Math.round(usu)).format("0,0") + '</td>' +
                    '</tr>' +
                    //presas de Almacenamiento
                    '<tr>' +
                    '<td>Presas de Almacenamiento</td>' +
                    '<td>pza</td>' +
                    '<td align="right">' + numeral(Math.round(presa_alma)).format("0,0") + '</td>' +
                    '</tr>' +
                    //presas Derivadoras
                    '<tr>' +
                    '<td>Presas Derivadoras</td>' +
                    '<td>pza</td>' +
                    '<td align="right">' + numeral(Math.round(presa_deriv)).format("0,0") + '</td>' +
                    '</tr>' +
                    //Diques
                    '<tr>' +
                    '<td>Diques</td>' +
                    '<td>pza</td>' +
                    '<td align="right">' + numeral(Math.round(diques)).format("0,0") + '</td>' +
                    '</tr>' +
                    //Plantas de Bombeo
                    '<tr>' +
                    '<td>Plantas de Bombeo</td>' +
                    '<td>pza</td>' +
                    '<td align="right">' + numeral(Math.round(plantas_bomb)).format("0,0") + '</td>' +
                    '</tr>' +
                    //Pozos
                    '<tr>' +
                    '<td>Pozos</td>' +
                    '<td>pza</td>' +
                    '<td align="right">' + numeral(Math.round(pozos)).format("0,0") + '</td>' +
                    '</tr>' +
                    //Canales
                    '<tr>' +
                    '<td ><b>Canales</b></td >' +
                    '<td>km</td>' +
                    '<td align="right">' + numeral(canales).format("0,0.000") + '</td>' +
                    '</tr>' +
                    //Principales
                    '<tr>' +
                    '<td><pre>  Principales</pre></td >' +
                    '<td>km</td>' +
                    '<td align="right">' + numeral(principal_suma).format("0,0.000") + '</td>' +
                    '</tr>' +
                    //Revestidos con concreto
                    '<tr>' +
                    '<td><pre>      *Revestidos con concreto </pre></td >' +
                    '<td>km</td>' +
                    '<td align="right">' + numeral(principal_rev_conc).format("0,0.000") + '</td>' +
                    '</tr>' +
                    //Revestidos con mamposteria
                    '<tr>' +
                    '<td><pre>      *Revestidos con mamposteria</pre></td >' +
                    '<td>km</td>' +
                    '<td align="right">' + numeral(principal_rev_mamp).format("0,0.000") + '</td>' +
                    '</tr>' +
                    //Sin revestir
                    '<tr>' +
                    '<td><pre>      *Sin revestir</pre></td >' +
                    '<td>km</td>' +
                    '<td align="right">' + numeral(principal_sin_rev).format("0,0.000") + '</td>' +
                    '</tr>' +
                    //Secundarios
                    '<tr>' +
                    '<td><pre>  Secundarios</pre></td >' +
                    '<td>km</td>' +
                    '<td align="right">' + numeral(secundario_suma).format("0,0.000") + '</td>' +
                    '</tr>' +
                    //Revestidos con concreto
                    '<tr>' +
                    '<td><pre>      *Revestidos con concreto </pre></td >' +
                    '<td>km</td>' +
                    '<td align="right">' + numeral(secundario_rev_conc).format("0,0.000") + '</td>' +
                    '</tr>' +
                    //Revestidos con mamposteria
                    '<tr>' +
                    '<td><pre>      *Revestidos con mamposteria</pre></td >' +
                    '<td>km</td>' +
                    '<td align="right">' + numeral(secundario_rev_mamp).format("0,0.000") + '</td>' +
                    '</tr>' +
                    //Sin revestir
                    '<tr>' +
                    '<td><pre>      *Sin revestir</pre></td >' +
                    '<td>km</td>' +
                    '<td align="right">' + numeral(secundario_sin_rev).format("0,0.000") + '</td>' +
                    '</tr>' +
                    //Entubados
                    '<tr>' +
                    '<td><pre>  Entubados</pre></td >' +
                    '<td>km</td>' +
                    '<td align="right">' + numeral(entubado).format("0,0.000") + '</td>' +
                    '</tr>' +
                    //Drenes
                    '<tr>' +
                    '<td ><b>Drenes</b></td >' +
                    '<td>km</td>' +
                    '<td align="right">' + numeral(red_drenaje).format("0,0.000") + '</td>' +
                    '</tr>' +
                    //Principales
                    '<tr>' +
                    '<td><pre>  Principales</pre></td >' +
                    '<td>km</td>' +
                    '<td align="right">' + numeral(red_drenaje_principal).format("0,0.000") + '</td>' +
                    '</tr>' +
                    //Secundarios
                    '<tr>' +
                    '<td><pre>  Secundarios</pre></td >' +
                    '<td>km</td>' +
                    '<td align="right">' + numeral(red_drenaje_secundario).format("0,0.000") + '</td>' +
                    '</tr>' +
                    //Caminos
                    '<tr>' +
                    '<td ><b>Caminos</b></td >' +
                    '<td>km</td>' +
                    '<td align="right">' + numeral(red_caminos_total).format("0,0.000") + '</td>' +
                    '</tr>' +
                    //Principales
                    '<tr>' +
                    '<td><pre>  Pavimentados</pre></td >' +
                    '<td>km</td>' +
                    '<td align="right">' + numeral(red_caminos_pavimentados).format("0,0.000") + '</td>' +
                    '</tr>' +
                    //Revestidos
                    '<tr>' +
                    '<td><pre>  Revestidos</pre></td >' +
                    '<td>km</td>' +
                    '<td align="right">' + numeral(red_caminos_revestidos).format("0,0.000") + '</td>' +
                    '</tr>' +
                    //Secundarios
                    '<tr>' +
                    '<td><pre>  Terracerias</pre></td >' +
                    '<td>km</td>' +
                    '<td align="right">' + numeral(red_caminos_terraceria).format("0,0.000") + '</td>' +
                    '</tr>' +

                    //Estructuras
                    '<tr>' +
                    '<td ><b>Estructuras</b></td >' +
                    '<td>pza</td>' +
                    '<td align="right">' + numeral(Math.round(estructuras_suma)).format("0,0") + '</td>' +
                    '</tr>' +
                    //canales
                    '<tr>' +
                    '<td><pre>  En canales</pre></td >' +
                    '<td>pza</td>' +
                    '<td align="right">' + numeral(Math.round(estructuras_canales)).format("0,0") + '</td>' +
                    '</tr>' +
                    //drenes
                    '<tr>' +
                    '<td><pre>  En drenes</pre></td >' +
                    '<td>pza</td>' +
                    '<td align="right">' + numeral(Math.round(etructura_drenes)).format("0,0") + '</td>' +
                    '</tr>' +
                    //caminos
                    '<tr>' +
                    '<td><pre>  En caminos</pre></td >' +
                    '<td>pza</td>' +
                    '<td align="right">' + numeral(Math.round(estructuras_caminos)).format("0,0") + '</td>' +
                    '</tr>' +
                    //Edificios
                    '<tr>' +
                    '<td>Edificiosa</td>' +
                    '<td>pza</td>' +
                    '<td align="right">' + numeral(Math.round(edificios_casetas)).format("0,0") + '</td>' +
                    '</tr>' +
                    //Obras Diversas
                    '<tr>' +
                    '<td>Obras Diversas</td>' +
                    '<td>pza</td>' +
                    '<td align="right">' + numeral(Math.round(obras_diveversas)).format("0,0") + '</td>' +
                    '</tr>' +
                    '</table></div>'
                );
                var tabla = "#T2";
                tabla2 = $(tabla).DataTable({
                    ordering: false,
                    searching: false,
                    language: {
                        url:
                            "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
                    },
                    paging: false,
                    dom: "Bfrtip",
                    /*
                     * Creacion del boton de exportar en excel
                     */
                    buttons: [
                        {
                            extend: "excelHtml5",
                            title: "Resumen Nacional del Inventario de Obra",
                            className: "btn btn-gob btn-sm",
                            text: "Exportar Excel",
                        },
                        {
                            extend: "pdfHtml5",
                            title: "Resumen Nacional del Inventario de Obra",
                            className: "btn btn-gob btn-sm",
                            text: "Exportar PDF",
                            messageBottom: citas,
                            orientation: "landscape",
                            pageSize: "A4",
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
                                                text: "Resumen Nacional del Inventario de Obra",
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
                                                    {
                                                        text: page.toString(),
                                                    },
                                                    " de ",
                                                    {
                                                        text: pages.toString(),
                                                    },
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
                });
            },
        }).always(function () {
            Swal.close();
        })
    }
}


async function desgloce3() {
    if (!$("#nav-03").html()) {
        Swal.fire({
            title: "Por favor espere", // add html attribute if you want or remove
            html: "Cargando contenido",
            allowEscapeKey: false,
    allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });

        document.getElementById("nav-03").innerHTML = "";
        $("#nav-03").append(
            '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Resumen por Distrito de Riego del Inventario de Obras.</h3></div>'
        );
        var query2 = query + " GROUP by id_distrito_riego ORDER BY id_distrito_riego";
        /*
         *
         * @type String
         * Variable con los datos a enviar al controlador
         */
        var cadena = "query=" + query2 + "&Accion=InventarioTabla";
        /*
         * Se limpia el html y se coloca el encabezado
         */
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/inventariodr.php",
            data: cadena,
            /*
             *
             * @param {type} resp2
             * @returns {undefined}
             * Si el controlador devuelve una respuesta
             *
             */
            success: async function (resp2) {
                /*
                 * Se coloca la seccion del anio seleccionado
                 */
                $("#nav-03").append(
                    '<div class="panel-body" id="body3">' + "</div>"
                );
                var data = [];
                var OT_sup_dominada = 0;
                var OT_sup_regable = 0;
                var OT_usuarios = 0;
                var OT_presa_almacenamiento = 0;
                var OT_presa_derivacio = 0;
                var OT_diques = 0;
                var OT_ptas_bomb = 0;
                var OT_pozos = 0;
                var OT_principal_rev_conc = 0;
                var OT_principal_rev_mamp = 0;
                var OT_principal_sin_rev = 0;
                var OT_principal_suma = 0;
                var OT_secundario_rev_conc = 0;
                var OT_secundario_rev_mamp = 0;
                var OT_secundario_sin_rev = 0;
                var OT_secundario_suma = 0;
                var OT_entubado = 0;
                var OT_entubados_total = 0;
                var OT_red_drenaje_principal = 0;
                var OT_red_drenaje_secundario = 0;
                var OT_red_drenaje_suma = 0;
                var OT_red_caminos_pavimentados = 0;
                var OT_red_caminos_revestidos = 0;
                var OT_red_caminos_terraceria = 0;
                var OT_red_caminos_total = 0;
                var OT_estructuras_canales = 0;
                var OT_etructura_drenes = 0;
                var OT_estructuras_caminos = 0;
                var OT_estructuras_suma = 0;
                var OT_edificios_casetas = 0;
                var OT_obras_diveversas = 0;
                var OC_sup_dominada = 0;
                var OC_sup_regable = 0;
                var OC_usuarios = 0;
                var OC_presa_almacenamiento = 0;
                var OC_presa_derivacio = 0;
                var OC_diques = 0;
                var OC_ptas_bomb = 0;
                var OC_pozos = 0;
                var OC_principal_rev_conc = 0;
                var OC_principal_rev_mamp = 0;
                var OC_principal_sin_rev = 0;
                var OC_principal_suma = 0;
                var OC_secundario_rev_conc = 0;
                var OC_secundario_rev_mamp = 0;
                var OC_secundario_sin_rev = 0;
                var OC_secundario_suma = 0;
                var OC_entubado = 0;
                var OC_entubados_total = 0;
                var OC_red_drenaje_principal = 0;
                var OC_red_drenaje_secundario = 0;
                var OC_red_drenaje_suma = 0;
                var OC_red_caminos_pavimentados = 0;
                var OC_red_caminos_revestidos = 0;
                var OC_red_caminos_terraceria = 0;
                var OC_red_caminos_total = 0;
                var OC_estructuras_canales = 0;
                var OC_etructura_drenes = 0;
                var OC_estructuras_caminos = 0;
                var OC_estructuras_suma = 0;
                var OC_edificios_casetas = 0;
                var OC_obras_diveversas = 0;
                $.each(JSON.parse(resp2), function (index, item) {
                    data.push([
                        item.id_distrito_riego + '-' + item.distrito,
                        numeral(item.sup_dominada).format("0,0.00"),
                        numeral(item.sup_regable).format("0,0.00"),
                        numeral(item.usuarios).format("0,0"),
                        numeral(item.presa_almacenamiento).format("0,0"),
                        numeral(item.presa_derivacio).format("0,0"),
                        numeral(item.diques).format("0,0"),
                        numeral(item.ptas_bomb).format("0,0"),
                        numeral(item.pozos).format("0,0"),
                        numeral(item.principal_rev_conc).format("0,0.00"),
                        numeral(item.principal_rev_mamp).format("0,0.00"),
                        numeral(item.principal_sin_rev).format("0,0.00"),
                        numeral(item.principal_suma).format("0,0.00"),
                        numeral(item.secundario_rev_conc).format("0,0.00"),
                        numeral(item.secundario_rev_mamp).format("0,0.00"),
                        numeral(item.secundario_sin_rev).format("0,0.00"),
                        numeral(item.secundario_suma).format("0,0.00"),
                        numeral(item.entubado).format("0,0.00"),
                        numeral(item.entubados_total).format("0,0.00"),
                        numeral(item.red_drenaje_principal).format("0,0.00"),
                        numeral(item.red_drenaje_secundario).format("0,0.00"),
                        numeral(item.red_drenaje_suma).format("0,0.00"),
                        numeral(item.red_caminos_pavimentados).format("0,0.00"),
                        numeral(item.red_caminos_revestidos).format("0,0.00"),
                        numeral(item.red_caminos_terraceria).format("0,0.00"),
                        numeral(item.red_caminos_total).format("0,0.00"),
                        numeral(item.estructuras_canales).format("0,0"),
                        numeral(item.etructura_drenes).format("0,0"),
                        numeral(item.estructuras_caminos).format("0,0"),
                        numeral(item.estructuras_suma).format("0,0"),
                        numeral(item.edificios_casetas).format("0,0"),
                        numeral(item.obras_diveversas).format("0,0")
                    ]);
                    if (item.grupo === 'OCRM') {
                        OC_sup_dominada += parseFloat(item.sup_dominada)
                        OC_sup_regable += parseFloat(item.sup_regable)
                        OC_usuarios += parseFloat(item.usuarios)
                        OC_presa_almacenamiento += parseFloat(item.presa_almacenamiento)
                        OC_presa_derivacio += parseFloat(item.presa_derivacio)
                        OC_diques += parseFloat(item.diques)
                        OC_ptas_bomb += parseFloat(item.ptas_bomb)
                        OC_pozos += parseFloat(item.pozos)
                        OC_principal_rev_conc += parseFloat(item.principal_rev_conc)
                        OC_principal_rev_mamp += parseFloat(item.principal_rev_mamp)
                        OC_principal_sin_rev += parseFloat(item.principal_sin_rev)
                        OC_principal_suma += parseFloat(item.principal_suma)
                        OC_secundario_rev_conc += parseFloat(item.secundario_rev_conc)
                        OC_secundario_rev_mamp += parseFloat(item.secundario_rev_mamp)
                        OC_secundario_sin_rev += parseFloat(item.secundario_sin_rev)
                        OC_secundario_suma += parseFloat(item.secundario_suma)
                        OC_entubado += parseFloat(item.entubado)
                        OC_entubados_total += parseFloat(item.entubados_total)
                        OC_red_drenaje_principal += parseFloat(item.red_drenaje_principal)
                        OC_red_drenaje_secundario += parseFloat(item.red_drenaje_secundario)
                        OC_red_drenaje_suma += parseFloat(item.red_drenaje_suma)
                        OC_red_caminos_pavimentados += parseFloat(item.red_caminos_pavimentados)
                        OC_red_caminos_revestidos += parseFloat(item.red_caminos_revestidos)
                        OC_red_caminos_terraceria += parseFloat(item.red_caminos_terraceria)
                        OC_red_caminos_total += parseFloat(item.red_caminos_total)
                        OC_estructuras_canales += parseFloat(item.estructuras_canales)
                        OC_etructura_drenes += parseFloat(item.etructura_drenes)
                        OC_estructuras_caminos += parseFloat(item.estructuras_caminos)
                        OC_estructuras_suma += parseFloat(item.estructuras_suma)
                        OC_edificios_casetas += parseFloat(item.edificios_casetas)
                        OC_obras_diveversas += parseFloat(item.obras_diveversas)
                    }
                    else {
                        OT_sup_dominada += parseFloat(item.sup_dominada)
                        OT_sup_regable += parseFloat(item.sup_regable)
                        OT_usuarios += parseFloat(item.usuarios)
                        OT_presa_almacenamiento += parseFloat(item.presa_almacenamiento)
                        OT_presa_derivacio += parseFloat(item.presa_derivacio)
                        OT_diques += parseFloat(item.diques)
                        OT_ptas_bomb += parseFloat(item.ptas_bomb)
                        OT_pozos += parseFloat(item.pozos)
                        OT_principal_rev_conc += parseFloat(item.principal_rev_conc)
                        OT_principal_rev_mamp += parseFloat(item.principal_rev_mamp)
                        OT_principal_sin_rev += parseFloat(item.principal_sin_rev)
                        OT_principal_suma += parseFloat(item.principal_suma)
                        OT_secundario_rev_conc += parseFloat(item.secundario_rev_conc)
                        OT_secundario_rev_mamp += parseFloat(item.secundario_rev_mamp)
                        OT_secundario_sin_rev += parseFloat(item.secundario_sin_rev)
                        OT_secundario_suma += parseFloat(item.secundario_suma)
                        OT_entubado += parseFloat(item.entubado)
                        OT_entubados_total += parseFloat(item.entubados_total)
                        OT_red_drenaje_principal += parseFloat(item.red_drenaje_principal)
                        OT_red_drenaje_secundario += parseFloat(item.red_drenaje_secundario)
                        OT_red_drenaje_suma += parseFloat(item.red_drenaje_suma)
                        OT_red_caminos_pavimentados += parseFloat(item.red_caminos_pavimentados)
                        OT_red_caminos_revestidos += parseFloat(item.red_caminos_revestidos)
                        OT_red_caminos_terraceria += parseFloat(item.red_caminos_terraceria)
                        OT_red_caminos_total += parseFloat(item.red_caminos_total)
                        OT_estructuras_canales += parseFloat(item.estructuras_canales)
                        OT_etructura_drenes += parseFloat(item.etructura_drenes)
                        OT_estructuras_caminos += parseFloat(item.estructuras_caminos)
                        OT_estructuras_suma += parseFloat(item.estructuras_suma)
                        OT_edificios_casetas += parseFloat(item.edificios_casetas)
                        OT_obras_diveversas += parseFloat(item.obras_diveversas)
                    }
                });
                var T_sup_dominada = OC_sup_dominada + OT_sup_dominada;
                var T_sup_regable = OC_sup_regable + OT_sup_regable;
                var T_usuarios = OC_usuarios + OT_usuarios;
                var T_presa_almacenamiento = OC_presa_almacenamiento + OT_presa_almacenamiento;
                var T_presa_derivacio = OC_presa_derivacio + OT_presa_derivacio;
                var T_diques = OC_diques + OT_diques;
                var T_ptas_bomb = OC_ptas_bomb + OT_ptas_bomb;
                var T_pozos = OC_pozos + OT_pozos;
                var T_principal_rev_conc = OC_principal_rev_conc + OT_principal_rev_conc;
                var T_principal_rev_mamp = OC_principal_rev_mamp + OT_principal_rev_mamp;
                var T_principal_sin_rev = OC_principal_sin_rev + OT_principal_sin_rev;
                var T_principal_suma = OC_principal_suma + OT_principal_suma;
                var T_secundario_rev_conc = OC_secundario_rev_conc + OT_secundario_rev_conc;
                var T_secundario_rev_mamp = OC_secundario_rev_mamp + OT_secundario_rev_mamp;
                var T_secundario_sin_rev = OC_secundario_sin_rev + OT_secundario_sin_rev;
                var T_secundario_suma = OC_secundario_suma + OT_secundario_suma;
                var T_entubado = OC_entubado + OT_entubado;
                var T_entubados_total = OC_entubados_total + OT_entubados_total;
                var T_red_drenaje_principal = OC_red_drenaje_principal + OT_red_drenaje_principal;
                var T_red_drenaje_secundario = OC_red_drenaje_secundario + OT_red_drenaje_secundario;
                var T_red_drenaje_suma = OC_red_drenaje_suma + OT_red_drenaje_suma;
                var T_red_caminos_pavimentados = OC_red_caminos_pavimentados + OT_red_caminos_pavimentados;
                var T_red_caminos_revestidos = OC_red_caminos_revestidos + OT_red_caminos_revestidos;
                var T_red_caminos_terraceria = OC_red_caminos_terraceria + OT_red_caminos_terraceria;
                var T_red_caminos_total = OC_red_caminos_total + OT_red_caminos_total;
                var T_estructuras_canales = OC_estructuras_canales + OT_estructuras_canales;
                var T_etructura_drenes = OC_etructura_drenes + OT_etructura_drenes;
                var T_estructuras_caminos = OC_estructuras_caminos + OT_estructuras_caminos;
                var T_estructuras_suma = OC_estructuras_suma + OT_estructuras_suma;
                var T_edificios_casetas = OC_edificios_casetas + OT_edificios_casetas;
                var T_obras_diveversas = OC_obras_diveversas + OT_obras_diveversas;
                /*
                 *
                 * @type String
                 * Se crea la variable de la tabla
                 */
                var tabla = "#T3";
                /*
                 * Si existen los datos en el array
                 */
                if (data.length > 0) {
                    $("#body3").append(
                        '<div style="overflow-x:auto;">' +
                        '<table id="T3" class="table table-bordered  nowrap"  width="100%">' +
                        '<tfoot>' +
                        '<tr>' +
                        '<td style="background-color:#52BE80" align="center"><b>Total Nacional</b></th>' +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_sup_dominada).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_sup_regable).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_usuarios).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_presa_almacenamiento).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_presa_derivacio).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_diques).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_ptas_bomb).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_pozos).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_principal_rev_conc).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_principal_rev_mamp).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_principal_sin_rev).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_principal_suma).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_secundario_rev_conc).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_secundario_rev_mamp).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_secundario_sin_rev).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_secundario_suma).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_entubado).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_entubados_total).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_red_drenaje_principal).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_red_drenaje_secundario).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_red_drenaje_suma).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_red_caminos_pavimentados).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_red_caminos_revestidos).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_red_caminos_terraceria).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_red_caminos_total).format("0,0.00") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_estructuras_canales).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_etructura_drenes).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_estructuras_caminos).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_estructuras_suma).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_edificios_casetas).format("0,0") + "</b></td>" +
                        '<td style="background-color:#52BE80" align="right"><b>' + numeral(T_obras_diveversas).format("0,0") + "</b></td>" +
                        '</tr>' +
                        '</tfoot></table><hr>' +
                        '</div>'
                    );
                    tabla5 = $(tabla).DataTable({
                        /*
                         * Se crean las columnas
                         */
                        columns: [
                            {
                                title: "Distrito de Riego",
                            },
                            {
                                title: "Superficie Dominada (ha)",
                            },
                            {
                                title: "Superficie Regable (ha)",
                            },
                            {
                                title: "Usuarios",
                            },
                            {
                                title: "Presas Almacenamiento (pza)",
                            },
                            {
                                title: "Presas Derivacióm (pza)",
                            },
                            {
                                title: "Diques (pza)",
                            },
                            {
                                title: "Puertas de Bombeo (pza)",
                            },
                            {
                                title: "Pozos (pza)",
                            },
                            {
                                title: "Principal Rev. Conc (km)",
                            },
                            {
                                title: "Principal Rev. Mamp (km)",
                            },
                            {
                                title: "Principal Sin Rev (km)",
                            },
                            {
                                title: "Principal Suma (km)",
                            },
                            {
                                title: "Secundario Rev. Conc (km)",
                            },
                            {
                                title: "Secundario Rev. Mamp (km)",
                            },
                            {
                                title: "Secundario Sin Rev (km)",
                            },
                            {
                                title: "Secundario Suma (km)",
                            },
                            {
                                title: "Entubados (km)",
                            },
                            {
                                title: "Total (km)",
                            },
                            {
                                title: "Red Drenaje Principales (km)",
                            },
                            {
                                title: "Red Drenaje Secundarios (km)",
                            },
                            {
                                title: "Suma Red Drenaje (km)",
                            },
                            {
                                title: "Red Caminos Pavimentados (km)",
                            },
                            {
                                title: "Red Caminos Revestidos (km)",
                            },
                            {
                                title: "Red Caminos Terracerias (km)",
                            },
                            {
                                title: "Suma Red Caminos (km)",
                            },
                            {
                                title: "Estructuras en Canales (pza)",
                            },
                            {
                                title: "Estructuras en Drenes (pza)",
                            },
                            {
                                title: "Estructuras en Caminos (pza)",
                            },
                            {
                                title: "Suma Estructuras (pza)",
                            },
                            {
                                title: "Casetas y Edificios (pza)",
                            },
                            {
                                title: "Obras Diversas(pza)",
                            },
                        ],
                        /*
                         * Se colocan los datos de la tabla
                         */
                        data: data,
                        /*
                         * Parametros del comportamiento de la tabla
                         */
                        order: [0, "asc"],
                        ordering: false,
                        searching: false,
                        /*
                         * Funcion para obtener los sibtotales
                         */
                        columnDefs: [
                            {
                                className: 'dt-body-right',
                                targets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
                            },
                        ],
                        language: {
                            url:
                                "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
                        },
                        paging: false,
                        dom: "Bfrtip",
                        /*
                         * Creacion del boton de exportar en excel
                         */
                        buttons: [
                            {
                                extend: "excelHtml5",
                                title: "Resumen por Distrito de Riego del Inventario de Obras",
                                className: "btn btn-gob btn-sm",
                                text: "Exportar Excel",
                            },
                            {
                                extend: "pdfHtml5",
                                title: "Resumen por Distrito de Riego del Inventario de Obras",
                                className: "btn btn-gob btn-sm",
                                text: "Exportar PDF",
                                messageBottom: citas,
                                orientation: "landscape",
                                pageSize: "A4",
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
                                                    text: "Resumen por Distrito de Riego del Inventario de Obras",
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
                                                        {
                                                            text: page.toString(),
                                                        },
                                                        " de ",
                                                        {
                                                            text: pages.toString(),
                                                        },
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
                    });
                }
            },
        }).always(function () {
            Swal.close();
        }); //Fin del AJAX de la obtecion de los datos
    }
}


async function getCultivos() {
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Cargando Datos",
        allowEscapeKey: false,
    allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    $("#Cultivos").multiselect("reset");
    if ($("#Distritos option:selected").length != 0) {
        var query = "(";
        /**
         * Se tiene que recorrer el select de organismos de cuenca para encontrar todos los elementos seleccionados.
         */
        $("#Anios option:selected").each(function () {
            query += "anio_id=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') AND (';
        $("#Organismos option:selected").each(function () {
            query += "id_organismo=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') AND (';
        $("#Estados option:selected").each(function () {
            query += "id_estado=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') AND (';
        $("#Ciclos option:selected").each(function () {
            query += "ciclo_id=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') AND (';
        $("#Modalidades option:selected").each(function () {
            query += 'modalidad="' + $(this).val() + '" or ';
        });
        query = query.slice(0, -4) + ') AND (';
        $("#Tenencias option:selected").each(function () {
            query += "tenencia_id=" + $(this).val() + " or ";
        });
        query = query.slice(0, -4) + ') AND (';
        $("#Distritos option:selected").each(function () {
            query += 'id_distrito_riego="' + $(this).val() + '" or ';
        });
        query = query.slice(0, -4) + ')';
        const cadena = "query=" + query + "&Accion=CultivosConsulta";
        var data = [];
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/cultivo.php",
            data: cadena,
            //Si el controlador devuelve una respuesta
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    data.push({
                        name: item.cultivo,
                        value: item.id_cultivo,
                        checked: false,
                    });
                });
                $("#Cultivos").multiselect("loadOptions", data);
            },
        }).always(function () {
            Swal.close();
        });
    } else {
        Swal.close();
    }
}


