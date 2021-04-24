/**
 * Variables para la capa de Pozos
 */
var PozosSelect = [];
var GroupoPozosSelect = L.layerGroup();
/**
 * Variables para la capa de Organismos de Cuenca
 */
var OCSelect = [];
var GroupoOCSelect = L.layerGroup();

//Variables para la capa de Regiones Hidrologicas
var RegionesHidrologicasSelect = [];
var GrupoRegionesHidrologicasSelect = L.layerGroup();
/**
 * Variables para la capa de Estados
 */
var EstSelect = [];
var GroupoEstSelect = L.layerGroup();
/**
 * Variables pára la capa de Acuiferos
 */
var AcuSelect = [];
var GroupoAcuSelect = L.layerGroup();
/**
 * Variables para la capa de Acuiferos
 */
var MunSelect = [];
var GroupoMunSelect = L.layerGroup();
/**
 * Variables para la capa de Presas
 */
var PresaSelect = [];
var GroupoPresaSelect = L.layerGroup();
/**
 * Variables para la capa de Distritos de Riego
 */
var DRSelect = [];
var GroupoDRSelect = L.layerGroup();
/**
 * Variables para la capá de los sitios de Monitoreo de Aguas Residuiales
 */
var SitioSelect = [];
var GroupoSitioSelect = L.layerGroup();

//Variables para la capa de las Estaciones Climatologicas
var EstacionesClimatologicasSelect = [];
var GrupoEstClimaSelect = L.layerGroup();

//Variables para la capa de las Estaciones Hidrometricas
var EstacionesHidrometricasSelect = [];
var GrupoEstHidroSelect = L.layerGroup();

// Legends

var legendAcuifero = L.control({ position: 'bottomright' }); //Acuiferos
var legendMarginacion = L.control({ position: 'bottomright' }); //Marginacion
var legendEstacionClimatologica = L.control({ position: 'bottomright' });//Estaciones Climatologicas


/**
 * Variabler de las propiedades del color de la capa de Organismo de Cuenca
 */
var colorOC = {
    weight: 2,
    color: "#000",
    fillColor: "#6f599e",
};

/**
 * Variable de las propiedades del color de la capa de Estado
 */
var colorEstado = {
    weight: 2,
    color: "#000",
    fillColor: "#101687",
};
/**
 * Variable de las propiedades del color de la capa de municipio
 */
var colorMuni = {
    weight: 1,
    color: "#000",
    fillColor: "#fcfc19"
};

/**
 * Funcion para Cargar los Organismos de ceunca
 * @param callback
 */
function getOC_SIG(callback) {
    let OC = '';
    /**
     * Obtenemos los Organismos de cuenca Obtenidos
     */
    $("#Organismos option:selected").each(async function () {
        OC += "id_organismo=" + $(this).val() + " or ";
    }).promise().always(async function () {
        OC = OC.slice(0, -3);
    });
    /**
     * Se limpia la capa actual de Organismos de Cuenca
     */
    GroupoOCSelect.clearLayers();
    /**
     * Se crea la variable JSON que contendra las coordenadas de los shapes
     */
    var OCSHP = {
        type: "FeatureCollection",
        name: "OC",
        crs: {
            type: "name",
            properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
        },
        features: [],
    };
    /**
     * Creacion de la variable que se envia al controlador
     */
    var sig = "query=" + OC + "&Accion=jsonOC";
    /**
     * Funcion Ajax donde se mandnan a traer los poligonos de los OC
     */
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/geoespacial.php",
        data: sig,
        success: function (resp) {
            /**
             * Para cada resultado de la consulta se coloca las coordenadas del poligono
             * dentro del json en el array de FEATURES
             */
            $.each(JSON.parse(resp), function (index, item) {
                OCSHP.features.push(JSON.parse(item.json));
            });
        },
    }).always(function () {
        /**
         * Una vez construido el JSON se manda este al MAPA de Leaflet
         */
        OCSelect = L.geoJson(OCSHP, {
            /**
             * Se establece el estilo de la capa
             */
            style: colorOC,
            /**
             *
             * @param {*} f
             * @param {*} l
             * Para cada poligono que se va colocar al mapa
             */
            onEachFeature: function popUp(f, l) {
                /**
                 * Se verifica que tenga proipíedes que extraer
                 */
                if (f.properties) {
                    var data_oc = "id=" + f.properties.CLAVE + "&Accion=getOC";
                    $.ajax({
                        type: "POST",
                        url: "/aplicacion/controlador/mapa.php",
                        data: data_oc,
                        success: function (organismo) {
                            $.each(JSON.parse(organismo), function (index, item) {
                                contenido =
                                    '<table class="table table-bordered"><thead><tr><th scope="col">Campo</th><th scope="col">Valor</th></tr></thead>' +
                                    '<tbody>' +
                                    //Organismo de Cuenca
                                    '<tr><th scope="row">Organismo de Cuenca</th><td>' + item.numero + ' - ' + item.nombre + '</td></tr>' +
                                    '</tbody></table>';
                            });
                        }
                    }).always(function () {
                        l.bindPopup(contenido);
                        /**
                         * Esta es la funcion que se le da al poligono para que cuando se
                         * coloque el cursor sobre lo remarque
                         */
                        l.on("mouseover", function () {
                            this.setStyle({
                                weight: 2,
                                fillOpacity: 0.5,
                            });
                        });
                        /**
                         * Esta funcion restable el estilo cuando
                         * se deja de posar el mouse sobre el poligono
                         */
                        l.on("mouseout", function () {
                            OCSelect.resetStyle(this);
                        });
                        /**
                         * Esta funcion es para cuendo se de clic al poligono
                         * haga un pequeño zoom y muestre la etiqueta.
                         */
                        l.on("click", function () {
                            map.fitBounds(this.getBounds());
                        });
                    });
                }
            },
        });
        /**
         * Esta lineas colocan la capa en el mapa
         */
        GroupoOCSelect.addTo(map);
        GroupoOCSelect.addLayer(OCSelect);
    }).done(function () {
        callback();
    });
}

function getRegionesHidrologicas_SIG(callback) {
    let RH = '';
    /**
     * Obtenemos los Organismos de cuenca Obtenidos
     */
    $("#RegHidrologicas option:selected").each(async function () {
        RH += "id_region_hidrologica=" + $(this).val() + " or ";
    }).promise().always(async function () {
        RH = RH.slice(0, -3);
    });
    /**
     * Se limpia la capa actual de Organismos de Cuenca
     */
    GrupoRegionesHidrologicasSelect.clearLayers();
    /**
     * Se crea la variable JSON que contendra las coordenadas de los shapes
     */
    var RegHidroJSON = {
        type: "FeatureCollection",
        name: "RH",
        crs: {
            type: "name",
            properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
        },
        features: [],
    };
    /**
     * Creacion de la variable que se envia al controlador
     */
    var sig = "query=" + RH + "&Accion=jsonRH";
    /**
     * Funcion Ajax donde se mandnan a traer los poligonos de los OC
     */
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/geoespacial.php",
        data: sig,
        success: function (resp) {
            /**
             * Para cada resultado de la consulta se coloca las coordenadas del poligono
             * dentro del json en el array de FEATURES
             */
            $.each(JSON.parse(resp), function (index, item) {
                RegHidroJSON.features.push(JSON.parse(item.json));
            });
        },
    }).always(function () {
        /**
         * Una vez construido el JSON se manda este al MAPA de Leaflet
         */
        RegionesHidrologicasSelect = L.geoJson(RegHidroJSON, {
            /**
             * Se establece el estilo de la capa
             */
            style: colorOC,
            /**
             *
             * @param {*} f
             * @param {*} l
             * Para cada poligono que se va colocar al mapa
             */
            onEachFeature: function popUp(f, l) {
                /**
                 * Se verifica que tenga proipíedes que extraer
                 */
                if (f.properties) {
                    var data_rh = "id=" + f.properties.CLAVE + "&Accion=getRH";
                    $.ajax({
                        type: "POST",
                        url: "/aplicacion/controlador/mapa.php",
                        data: data_rh,
                        success: function (region) {
                            $.each(JSON.parse(region), function (index, item) {
                                contenido =
                                    '<table class="table table-bordered"><thead><tr><th scope="col">Campo</th><th scope="col">Valor</th></tr></thead>' +
                                    '<tbody>' +
                                    '<tr><th scope="row">Región Hidrológica</th><td>' + item.nombre + '</td></tr>' +
                                    '</tbody></table>';
                            });
                        }
                    }).always(function () {
                        l.bindPopup(contenido);
                        /**
                         * Esta es la funcion que se le da al poligono para que cuando se
                         * coloque el cursor sobre lo remarque
                         */
                        l.on("mouseover", function () {
                            this.setStyle({
                                weight: 2,
                                fillOpacity: 0.5,
                            });
                        });
                        /**
                         * Esta funcion restable el estilo cuando
                         * se deja de posar el mouse sobre el poligono
                         */
                        l.on("mouseout", function () {
                            RegionesHidrologicasSelect.resetStyle(this);
                        });
                        /**
                         * Esta funcion es para cuendo se de clic al poligono
                         * haga un pequeño zoom y muestre la etiqueta.
                         */
                        l.on("click", function () {
                            map.fitBounds(this.getBounds());
                        });
                    });
                }
            },
        });
        /**
         * Esta lineas colocan la capa en el mapa
         */
        GrupoRegionesHidrologicasSelect.addTo(map);
        GrupoRegionesHidrologicasSelect.addLayer(RegionesHidrologicasSelect);
    }).done(function () {
        callback();
    });
}

/**
 * Funcion Para cargar los Estados
 * @param callback
 */
function getEst_SIG(callback) {
    let Est = '';
    /**
     * Obtenemos los Estados
     */
    $("#Estados option:selected").each(function () {
        Est += "id_estado=" + $(this).val() + " or ";
    }).promise().done(function () {
        Est = Est.slice(0, -3);
    });
    GroupoEstSelect.clearLayers();
    var EstadosSHP = {
        type: "FeatureCollection",
        name: "EstadosSHP",
        crs: {
            type: "name",
            properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
        },
        features: [],
    };

    var sig = "query=" + Est + "&Accion=jsonEST";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/geoespacial.php",
        data: sig,
        success: function (resp) {
            $.each(JSON.parse(resp), function (index, item) {
                EstadosSHP.features.push(JSON.parse(item.json));
            });
        },
    }).always(function () {
        EstSelect = L.geoJson(EstadosSHP, {
            style: colorEstado,
            onEachFeature: function popUp(f, l) {
                if (f.properties) {
                    var data_oc = "id=" + f.properties.COV_ID + "&Accion=getEstadoid";
                    $.ajax({
                        type: "POST",
                        url: "/aplicacion/controlador/estado.php",
                        data: data_oc,
                        success: function (estados) {
                            var item = JSON.parse(estados);
                            contenido =
                                '<table class="table table-bordered"><thead><tr><th scope="col">Campo</th><th scope="col">Valor</th></tr></thead>' +
                                '<tbody>' +
                                //Organismo de Cuenca
                                '<tr><th scope="row">Estado</th><td>' + item.nombre + '</td></tr>' +
                                '</tbody></table>';
                        }
                    }).always(function () {
                        l.bindPopup(contenido);
                        l.on("mouseover", function () {
                            this.setStyle({
                                weight: 2,
                                fillOpacity: 0.5,
                            });
                        });
                        l.on("mouseout", function () {
                            EstSelect.resetStyle(this);
                        });
                        l.on("click", function () {
                            map.fitBounds(this.getBounds());
                        });
                    });
                }
            },
        });
        GroupoEstSelect.addTo(map);
        GroupoEstSelect.addLayer(EstSelect);

    }).done(function () {
        callback();
    });
}

/**
 * Funcion para cargar Municipios
 * @param callback
 */
function getMuni_SIG(callback) {
    let Mun = '';
    $("#Municipios option:selected").each(function () {
        alert("Entre")
        Mun += "id_municipio=" + $(this).val() + " or ";
    }).promise().done(function () {
        Mun = Mun.slice(0, -3);
    });
    GroupoMunSelect.clearLayers();
    var municipioSHP = {
        type: "FeatureCollection",
        name: "municipioSHP",
        crs: {
            type: "name",
            properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
        },
        features: [],
    };

    var sig = "query=" + Mun + "&Accion=jsonMun";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/geoespacial.php",
        data: sig,
        success: function (resp) {
            $.each(JSON.parse(resp), function (index, item) {
                municipioSHP.features.push(JSON.parse(item.json));
            });
        },
    }).always(function () {
        MunSelect = L.geoJson(municipioSHP, {
            style: colorMuni,
            onEachFeature: function popUp(f, l) {
                if (f.properties) {
                    var data_oc = "id=" + f.properties.OID_1 + "&Accion=getMuniId";
                    $.ajax({
                        type: "POST",
                        url: "/aplicacion/controlador/mapa.php",
                        data: data_oc,
                        success: function (municipios) {
                            var item = JSON.parse(municipios)
                            contenido =
                                '<table class="table table-bordered"><thead><tr><th scope="col">Campo</th><th scope="col">Valor</th></tr></thead>' +
                                '<tbody>' +
                                //Organismo de Cuenca
                                '<tr><th scope="row">Municipio</th><td>' + item.municipio + '</td></tr>' +
                                //Organismo de Cuenca
                                '<tr><th scope="row">Estado</th><td>' + item.estado + '</td></tr>' +
                                '</tbody></table>';
                        }
                    }).always(function () {
                        l.bindPopup(contenido);
                        l.on("mouseover", function () {
                            this.setStyle({
                                weight: 2,
                                fillOpacity: 0.5,
                            });
                        });
                        l.on("mouseout", function () {
                            MunSelect.resetStyle(this);
                        });
                        l.on("click", function () {
                            map.fitBounds(this.getBounds());
                        });
                    });
                }
            },
        });
        GroupoMunSelect.addTo(map);
        GroupoMunSelect.addLayer(MunSelect);

    }).done(function () {
        callback();
    });
}

/**
 * Funcion para obtener los Acuiferos
 * @param callback
 */
function getAcu_SIG(callback) {
    let Acu = '';
    /**
     * Obtenemos los municipios
     */
    $("#Acuiferos option:selected").each(function () {
        Acu += "id_acuifero=" + $(this).val() + " or ";
    }).promise().done(function () {
        Acu = Acu.slice(0, -3);
    });
    GroupoAcuSelect.clearLayers();
    var AcuiferoSHP = {
        type: "FeatureCollection",
        name: "AcuiferoSHP",
        crs: {
            type: "name",
            properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
        },
        features: [],
    };

    var sig = "query=" + Acu + "&Accion=jsonACU";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/geoespacial.php",
        data: sig,
        success: function (resp) {
            $.each(JSON.parse(resp), function (index, item) {
                AcuiferoSHP.features.push(JSON.parse(item.json));
            });
        },
    }).always(function () {
        AcuSelect = L.geoJson(AcuiferoSHP, {
            onEachFeature: function popUp(f, l) {
                if (f.properties) {
                    var out = [];
                    var data_oc = "query=" + f.properties.id_acuif + "&Accion=Acuifero";
                    $.ajax({
                        type: "POST",
                        url: "/aplicacion/controlador/acuifero.php",
                        data: data_oc,
                        success: function (acuifero) {
                            $.each(JSON.parse(acuifero), function (index, item) {
                                contenido =
                                    '<table class="table table-bordered"><thead><tr><th scope="col">Campo</th><th scope="col">Valor</th></tr></thead>' +
                                    '<tbody>' +
                                    //Acuifero
                                    '<tr><th scope="row">Acuífero</th><td>' + item.id_acuifero + ' - ' + item.nombre + '</td></tr>' +
                                    //Estado
                                    '<tr><th scope="row">Estado</th><td>' + item.estado + '</td></tr>' +
                                    //Cuenca
                                    '<tr><th scope="row">Cuenca</th><td>' + item.cuenca + '</td></tr>' +
                                    //REPDA
                                    '<tr><th scope="row">Fecha REPDA</th><td>' + item.fecha_repda + '</td></tr>' +
                                    //Latitud
                                    '<tr><th scope="row">Latitud</th><td>' + Number.parseFloat(item.latitud).toFixed(2) + '</td></tr>' +
                                    //longitud
                                    '<tr><th scope="row">Longitud</th><td>' + Number.parseFloat(item.longitud).toFixed(2) + '</td></tr>' +
                                    //R
                                    '<tr><th scope="row">R (hm³)</th><td>' + Number.parseFloat(item.r).toFixed(2) + '</td></tr>' +
                                    //DNC
                                    '<tr><th scope="row">DNC (hm³)</th><td>' + Number.parseFloat(item.dnc).toFixed(2) + '</td></tr>' +
                                    //vcas
                                    '<tr><th scope="row">VCAS (hm³)</th><td>' + Number.parseFloat(item.vcas).toFixed(2) + '</td></tr>' +
                                    //veala
                                    '<tr><th scope="row">VEALA (hm³)</th><td>' + Number.parseFloat(item.veala).toFixed(2) + '</td></tr>' +
                                    //vaptyr
                                    '<tr><th scope="row">VAPTYR (hm³)</th><td>' + Number.parseFloat(item.vaptyr).toFixed(2) + '</td></tr>' +
                                    //vaprh
                                    '<tr><th scope="row">VAPRH (hm³)</th><td>' + Number.parseFloat(item.vaprh).toFixed(2) + '</td></tr>' +
                                    //dma
                                    '<tr><th scope="row">DMA (hm³)</th><td>' + Number.parseFloat(item.dma).toFixed(2) + '</td></tr>' +
                                    //dma
                                    '<tr><th scope="row">Disponibilidad</th><td>' + f.properties.dispon + '</td></tr>' +
                                    '</tbody></table>';

                            });
                        }
                    }).always(function () {
                        l.bindPopup(contenido);
                        if (f.properties.dispon === "Con disponibilidad") {
                            l.setStyle({
                                weight: 1,
                                color: "#000",
                                fillColor: "#1fa17a",
                                fillOpacity: 0.6,
                            });
                        } else {
                            l.setStyle({
                                weight: 1,
                                color: "#000",
                                fillColor: "#751230",
                                fillOpacity: 0.6,
                            });
                        }
                        l.on("click", function () {
                            map.fitBounds(this.getBounds());
                        });
                    });
                }
            }
        });
        GroupoAcuSelect.addTo(map);
        GroupoAcuSelect.addLayer(AcuSelect);
        legendAcuifero.addTo(map);
    }).done(function () {
        callback();
    });
}

/**
 * Funcion para obtener las presas
 * @param callback
 */
function getPresa_SIG(callback) {
    let Presa = '';
    $("#Presas option:selected").each(function () {
        Presa += "id_presa=" + $(this).val() + " or ";
    }).promise().done(function () {
        Presa = Presa.slice(0, -3);
    });
    GroupoPresaSelect.clearLayers();
    var presasSHP = {
        type: "FeatureCollection",
        name: "presasSHP",
        crs: {
            type: "name",
            properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" }
        },
        features: []
    };

    var sig = "query=" + Presa + "&Accion=jsonPresa";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/geoespacial.php",
        data: sig,
        success: function (resp) {
            $.each(JSON.parse(resp), function (index, item) {
                presasSHP.features.push(JSON.parse(item.json));
            });
        },
    }).always(function () {
        PresaSelect = L.geoJson(presasSHP, {
            onEachFeature: function popUp(f, l) {
                if (f.properties) {
                    var data_oc = "id=" + f.properties.id_presa + "&Accion=getPresaId";
                    $.ajax({
                        type: "POST",
                        url: "/aplicacion/controlador/presa.php",
                        data: data_oc,
                        success: function (presas) {
                            var item = JSON.parse(presas);
                            contenido =
                                '<table class="table table-bordered"><thead><tr><th scope="col">Campo</th><th scope="col">Valor</th></tr></thead>' +
                                '<tbody>' +
                                //presa
                                '<tr><th scope="row">Presa</th><td>' + item.nom_oficial + '</td></tr>' +
                                //Estado
                                '<tr><th scope="row">Estado</th><td>' + item.nombre + '</td></tr>' +
                                //presa
                                '<tr><th scope="row">Corriente</th><td>' + item.corriente + '</td></tr>' +
                                //presa
                                '<tr><th scope="row">Año Termino</th><td>' + item.anio_term + '</td></tr>' +
                                '</tbody></table>';
                        }
                    }).always(function () {
                        l.bindPopup(contenido);
                        l.on("click", function () {
                            centerLeafletMapOnMarker(map, this);
                        });
                    });
                }
            },
        });
        GroupoPresaSelect.addTo(map);
        GroupoPresaSelect.addLayer(PresaSelect);

    }).done(function () {
        callback();
    });
}

/**
 * Misma funcionalidad que getOC_SIG
 */
function getDR_SIG(callback) {
    let DR = '';
    $("#Distritos option:selected").each(function () {
        DR += 'distrito_riego_id="' + $(this).val() + '" or ';
    }).promise().done(function () {
        DR = DR.slice(0, -3);
    });
    GroupoDRSelect.clearLayers();
    var distritoSHP = {
        type: "FeatureCollection",
        name: "distritoSHP",
        crs: {
            type: "name",
            properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" }
        },
        features: []
    };
    var sig = "query=" + DR + "&Accion=jsonDR";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/geoespacial.php",
        data: sig,
        success: function (resp) {
            $.each(JSON.parse(resp), function (index, item) {
                distritoSHP.features.push(JSON.parse(item.json));
            });
        }
    }).always(function () {
        DRSelect = L.geoJson(distritoSHP, {
            style: colorMuni,
            onEachFeature: function popUp(f, l) {
                var out = [];
                if (f.properties) {
                    var data_oc = "id=" + f.properties.id_dr + "&Accion=getDRId";
                    $.ajax({
                        type: "POST",
                        url: "/aplicacion/controlador/distritoriego.php",
                        data: data_oc,
                        success: function (DRs) {
                            $.each(JSON.parse(DRs), function (index, item) {
                                contenido =
                                    '<table class="table table-bordered"><thead><tr><th scope="col">Campo</th><th scope="col">Valor</th></tr></thead>' +
                                    '<tbody>' +
                                    //Organismo de Cuenca
                                    '<tr><th scope="row">Distrito de Riego</th><td>' + item.id_distrito_riego + ' - ' + item.nom_dr + '</td></tr>' +
                                    //Organismo de Cuenca
                                    '<tr><th scope="row">Organismo de Cuenca</th><td>' + item.numero + ' - ' + item.organismo + '</td></tr>' +
                                    //Organismo de Cuenca
                                    '<tr><th scope="row">Estado</th><td>' + item.estado + '</td></tr>' +
                                    '</tbody></table>';
                            });
                        }
                    }).always(function () {
                        l.bindPopup(contenido);
                        l.on("mouseover", function () {
                            this.setStyle({
                                weight: 2,
                                fillOpacity: 0.5
                            });
                        });
                        l.on("mouseout", function () {
                            DRSelect.resetStyle(this);
                        });
                        l.on("click", function () {
                            map.fitBounds(this.getBounds());
                        });
                    });
                }
            }
        });
        GroupoDRSelect.addTo(map);
        GroupoDRSelect.addLayer(DRSelect);

    }).done(function () {
        callback();
    });
}


/**
 * Misma funcionalidad que getOC_SIG
 */
function getDTT_SIG(callback) {
    let DR = '';
    $("#Distritos option:selected").each(function () {
        DR += 'id_dtt="' + $(this).val() + '" or ';
    }).promise().done(function () {
        DR = DR.slice(0, -3);
    });
    GroupoDRSelect.clearLayers();
    var distritoSHP = {
        type: "FeatureCollection",
        name: "distritoSHP",
        crs: {
            type: "name",
            properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" }
        },
        features: []
    };
    var sig = "query=" + DR + "&Accion=jsonDTT";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/geoespacial.php",
        data: sig,
        success: function (resp) {
            $.each(JSON.parse(resp), function (index, item) {
                distritoSHP.features.push(JSON.parse(item.json));
            });
        }
    }).always(function () {
        DRSelect = L.geoJson(distritoSHP, {
            style: colorMuni,
            onEachFeature: function popUp(f, l) {
                if (f.properties) {
                    var data_oc = "id=" + f.properties.id_dtt + "&Accion=getDTTI";
                    $.ajax({
                        type: "POST",
                        url: "/aplicacion/controlador/dtt.php",
                        data: data_oc,
                        success: function (DTTs) {
                            $.each(JSON.parse(DTTs), function (index, item) {
                                contenido =
                                    '<table class="table table-bordered"><thead><tr><th scope="col">Campo</th><th scope="col">Valor</th></tr></thead>' +
                                    '<tbody>' +
                                    //Organismo de Cuenca
                                    '<tr><th scope="row">Distrito de Temporal Tecnificado</th><td>' + item.id_dtt + ' - ' + item.nombre + '</td></tr>' +
                                    //Organismo de Cuenca
                                    '<tr><th scope="row">Organismo de Cuenca</th><td>' + item.numero + ' - ' + item.organismo + '</td></tr>' +
                                    //Organismo de Cuenca
                                    '<tr><th scope="row">Estado</th><td>' + item.estado + '</td></tr>' +
                                    '</tbody></table>';
                            });
                        }
                    }).always(function () {
                        l.bindPopup(contenido);
                        l.on("mouseover", function () {
                            this.setStyle({
                                weight: 2,
                                fillOpacity: 0.5
                            });
                        });
                        l.on("mouseout", function () {
                            DRSelect.resetStyle(this);
                        });
                        l.on("click", function () {
                            map.fitBounds(this.getBounds());
                        });
                    });
                }
            }
        });
        GroupoDRSelect.addTo(map);
        GroupoDRSelect.addLayer(DRSelect);

    }).done(function () {
        callback();
    });
}

/**
 * Esta tiene una funcionalidad diferente
 * Ya que son puntos basados en LAT Y LON
 */
function getPozo_SIG(callback) {
    let concesiones = '';
    $("#Concesiones option:selected").each(function () {
        concesiones += 'id_titulo="' + $(this).val() + '" or ';
    }).promise().done(function () {
        concesiones = concesiones.slice(0, -3);
    });
    /**
     * Se limpia la capa actual de lo que se tenga cargado
     */
    GroupoPozosSelect.clearLayers();
    /**
     * Se crea la variable donde se alverga el JSON de los puntos de los pozos
     */
    var pozosSHP = {
        type: "FeatureCollection",
        name: "pozosSHP",
        crs: {
            type: "name",
            properties: {
                name: "urn:ogc:def:crs:OGC:1.3:CRS84",
            },
        },
        /**
         * Aqui se guardaran las corrdenadas
         */
        features: [],
    };
    /**
     * Se crea una variable para enviar a nuestro controlador
     */
    cadena = "query=" + concesiones + "&Accion=PozoQ";
    /**
     * Se crea una funcion Ajax que envia y obtiene las coordenadas de los pozos
     */
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/pozo.php",
        data: cadena,
        /**
         * @param resp
         * Si el controlador devuelve la consulta se procederá con el proceso de interpretación de los datos
         */
        success: function (resp) {
            //$("#infoReporteTituloP").val(resp);
            /**
             * Se crea una variable con las porpiedades de estilo de los puntos
             */
            geojsonMarkerOptions = {
                radius: 8,
                fillColor: "#2E86C1",
                color: "#0000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };
            /**
             * Para cada conjunto de coordenadas
             */
            $.each(JSON.parse(resp), function (index, item) {
                /**
                 * Se colocan en el array FEATURES del JSON las propiedades del Punto
                 */
                pozosSHP.features.push({
                    type: "Feature",
                    properties: {
                        ID: item.id_pozo,
                        TC: item.id_titulo,
                        RH: item.rh,
                        cuenca: item.cuenca_id,
                        Latitud: item.lat,
                        Longitud: item.lon,
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [item.lon, item.lat],
                    },
                });
            });
        }
    }).always(function () {
        /**
         * Aqui se encarga de mandar el JSON al MAPA de Leaflet
         */
        pozosL = L.geoJson(pozosSHP, {
            /**
             *
             * @param {*} feature
             * @param {*} latlng
             * Para cada punto se retorna sus corrdenadas en el MAPA
             */
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions);
            },
            /**
             * Para cada propiedad
             * @param f
             * @param l
             */
            onEachFeature: function popUp(f, l) {
                var out = [];
                if (f.properties) {
                    contenido =
                        '<table class="table table-bordered"><thead><tr><th scope="col">Campo</th><th scope="col">Valor</th></tr></thead>' +
                        '<tbody>' +
                        //Organismo de Cuenca
                        '<tr><th scope="row">Pozo</th><td>' + f.properties.ID + ' - ' + f.properties.TC + '</td></tr>' +
                        //Organismo de Cuenca
                        '<tr><th scope="row">Región Hidrológica</th><td>' + f.properties.RH + '</td></tr>' +
                        //Organismo de Cuenca
                        '<tr><th scope="row">Cuenca</th><td>' + f.properties.cuenca + '</td></tr>' +
                        //Organismo de Cuenca
                        '<tr><th scope="row">Latitud</th><td>' + f.properties.Latitud + '</td></tr>' +
                        //Organismo de Cuenca
                        '<tr><th scope="row">Longitud</th><td>' + f.properties.Longitud + '</td></tr>' +
                        '</tbody></table>';
                    l.bindPopup(contenido);
                    /**
                     * Funcion para cuando se de clic en el punto se haga zoom en el
                     * y se muestre su informacion
                     */
                    l.on("click", function () {
                        centerLeafletMapOnMarker(map, this);
                    });
                }
            }
        });
        /**
         * Esta lineas se encargan de poner La capa en el MAPA
         */
        GroupoPozosSelect.addLayer(pozosL);
        GroupoPozosSelect.addTo(map);
    }).done(function () {
        callback();
    });

}


//Obtiene las coordenadas de las estaciones Climatologicas y crea el archivo json para añadirlo al mapa
function getEstacionesSIG(callback) {
    //Se limpia la capa actual de lo que se tenga cargado
    GrupoEstClimaSelect.clearLayers();
    // Se crea la variable donde se alverga el JSON de los puntos de los pozos
    var estacionesCJSON = {
        type: "FeatureCollection",
        name: "estacionesCSHP",
        crs: {
            type: "name",
            properties: {
                name: "urn:ogc:def:crs:OGC:1.3:CRS84"
            }
        },
        features: []
    };
    var estacionesC = $("#EstacionClimatologica option:selected").length;// Se obtiene el numero de consesiones seleccionadas 
    if (estacionesC !== 0) {
        const query = concatQuery();//Se obtiene el query para obtener las estaciones seleccionadas
        cadena = "query=" + query + "&Accion=getInfoMap";
        $.ajax({ //Se crea una funcion Ajax que envia y obtiene las coordenadas de estaciones
            type: "POST",
            url: "/aplicacion/controlador/estacionclimatologica.php",
            data: cadena,
            success: function (resp) {
                //Se crea una variable con las porpiedades de estilo de los puntos
                $.each(JSON.parse(resp), function (index, item) {
                    estacionesCJSON.features.push({
                        type: "Feature",
                        properties: {
                            Clave: item.id_estacion_climatologica,
                            Nombre: item.nombre,
                            Cuenca: item.cuenca,
                            Tipo: item.tipo,
                            Estado: item.estado,
                            Municipio: item.municipio,
                            Situacion: item.situacion,
                            Latitud: item.latitud,
                            Longitud: item.longitud,
                            Color: item.color,
                        },
                        geometry: {
                            type: "Point",
                            coordinates: [item.longitud, item.latitud]
                        }
                    });
                });
            }
        }).always(function () {
            //Aqui se encarga de mandar el JSON al MAPA de Leaflet
            estacionesCLayer = L.geoJson(estacionesCJSON, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(
                        latlng,
                        {
                            radius: 6,
                            fillColor: feature.properties.Color,
                            weight: 1,
                            opacity: 1,
                            fillOpacity: 1,
                        }
                    );
                },
                onEachFeature: function popUp(f, l) {
                    var out = [];
                    if (f.properties) {
                        //Se añaden propiedades a la ventana emergente del mapa
                        out.push("Clave: " + f.properties.Clave);
                        l.bindPopup(out.join("<br />"));

                        out.push("Nombre: " + f.properties.Nombre);
                        l.bindPopup(out.join("<br />"));

                        out.push("Cuenca: " + f.properties.Cuenca);
                        l.bindPopup(out.join("<br />"));

                        out.push("Tipo: " + f.properties.Tipo);
                        l.bindPopup(out.join("<br />"));

                        out.push("Estado: " + f.properties.Estado);
                        l.bindPopup(out.join("<br />"));

                        out.push("Municipio: " + f.properties.Municipio);
                        l.bindPopup(out.join("<br />"));

                        out.push("Situacion: " + f.properties.Situacion);
                        l.bindPopup(out.join("<br />"));

                        out.push("Latitud: " + f.properties.Latitud);
                        l.bindPopup(out.join("<br />"));

                        out.push("Longitud: " + f.properties.Longitud);
                        l.bindPopup(out.join("<br />")).openPopup();

                    }
                }
            });
            /**
             * Esta lineas se encargan de poner La capa en el MAPA
             */
            GrupoEstClimaSelect.addLayer(estacionesCLayer);
            GrupoEstClimaSelect.addTo(map);

            legendEstacionClimatologica.addTo(map);


        }).done(function () {
            callback();
        });
    }
}




//Obtiene las coordenadas de las estaciones y crea el archivo json para añadirlo al mapa
function getEstacionesHidroSIG(callback) {
    GrupoEstHidroSelect.clearLayers();
    // Se crea la variable donde se alverga el JSON de los puntos de los pozos
    var estacionesHJSON = {
        type: "FeatureCollection",
        name: "estacionesHSHP",
        crs: {
            type: "name",
            properties: {
                name: "urn:ogc:def:crs:OGC:1.3:CRS84"
            }
        },
        features: []
    };
    var estacionesH = $("#EstacionHidrometrica option:selected").length;// Se obtiene el numero de consesiones seleccionadas 
    if (estacionesH !== 0) {
        const query = concatQuery();//Se obtiene el query para obtener las estaciones seleccionadas

        cadena = "query=" + query + "&Accion=getInfoMap";
        $.ajax({ //Se crea una funcion Ajax que envia y obtiene las coordenadas de estaciones
            type: "POST",
            url: "/aplicacion/controlador/estacionhidrometrica.php",
            data: cadena,
            success: function (resp) {
                //Se crea una variable con las porpiedades de estilo de los puntos
                $.each(JSON.parse(resp), function (index, item) {
                    estacionesHJSON.features.push({
                        type: "Feature",
                        properties: {
                            Clave: item.clave,
                            Nombre: item.nombre,
                            Corriente: item.corriente,
                            Cuenca: item.cuenca,
                            Estado: item.estado,
                            Municipio: item.municipio,
                            Latitud: item.latitud,
                            Longitud: item.longitud
                        },
                        geometry: {
                            type: "Point",
                            coordinates: [item.longitud, item.latitud]
                        }
                    });
                });
            }
        }).always(function () {
            //Aqui se encarga de mandar el JSON al MAPA de Leaflet
            estacionesHLayer = L.geoJson(estacionesHJSON, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(
                        latlng,
                        {
                            radius: 8,
                            fillColor: '#159BE3',
                            weight: 1,
                            opacity: 1,
                            fillOpacity: 1,
                        }
                    );
                },
                onEachFeature: function popUp(f, l) {
                    var out = [];
                    if (f.properties) {
                        //Se añaden propiedades a la ventana emergente del mapa
                        out.push("Clave: " + f.properties.Clave);
                        l.bindPopup(out.join("<br />"));

                        out.push("Nombre: " + f.properties.Nombre);
                        l.bindPopup(out.join("<br />"));

                        out.push("Corriente: " + f.properties.Corriente);
                        l.bindPopup(out.join("<br />"));

                        out.push("Cuenca: " + f.properties.Cuenca);
                        l.bindPopup(out.join("<br />"));


                        out.push("Estado: " + f.properties.Estado);
                        l.bindPopup(out.join("<br />"));

                        out.push("Municipio: " + f.properties.Municipio);
                        l.bindPopup(out.join("<br />"));

                        out.push("Latitud: " + f.properties.Latitud);
                        l.bindPopup(out.join("<br />"));

                        out.push("Longitud: " + f.properties.Longitud);
                        l.bindPopup(out.join("<br />")).openPopup();

                    }
                }
            });
            /**
             * Esta lineas se encargan de poner La capa en el MAPA
             */
            GrupoEstHidroSelect.addLayer(estacionesHLayer);
            GrupoEstHidroSelect.addTo(map);
        }).done(function () {
            callback();
        });
    }
}


/**
 * Lo mismo que en getPozo_SIG
 */
function getSitioDBO5_SIG(callback) {
    GroupoSitioSelect.clearLayers();
    var SitiosSHP = {
        type: "FeatureCollection",
        name: "SitiosSHP",
        crs: {
            type: "name",
            properties: {
                name: "urn:ogc:def:crs:OGC:1.3:CRS84"
            }
        },
        features: []
    };

    var Sitios = $("#Sitios option:selected").length;
    if (Sitios !== 0) {
        const OC = selectOrganismo();
        const Est = selectEst();
        const Mun = selectMun();
        const Anio = selectAnio();
        const Clave = selectClave();
        var query = "(" +
            OC +
            ") AND (" +
            Est +
            ") AND (" +
            Mun +
            ") AND (" +
            Anio +
            ") AND (" +
            Clave +
            ") AND valor is NOT NULL GROUP BY Clave";
        cadena = "query=" + query + "&Accion=puntoSitio";
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
            data: cadena,
            /**
             * @param resp
             * Si el controlador devuelve la consulta se procederá con el proceso de interpretación de los datos
             */
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    SitiosSHP.features.push({
                        type: "Feature",
                        properties: {
                            ID: item.Clave,
                            Estacion: item.Estacion,
                            Estado: item.estado,
                            Organismo: item.organismo,
                            Valor: item.Valor,
                            Clasi: item.Clasificacion,
                            Anio: item.anio,
                            cuenca: item.cuenca_id,
                            Latitud: item.lat,
                            Longitud: item.lon,
                            Color: item.Color,
                        },
                        geometry: {
                            type: "Point",
                            coordinates: [item.lon, item.lat],
                        },
                    });
                });
            },
        }).always(function () {
            sitiosL = L.geoJson(SitiosSHP, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(
                        latlng,
                        {
                            radius: 8,
                            fillColor: feature.properties.Color,
                            weight: 1,
                            opacity: 1,
                            fillOpacity: 1,
                        }
                    );
                },
                onEachFeature: function popUp(f, l) {
                    if (f.properties) {
                        contenido =
                            '<table class="table table-bordered"><thead><tr><th scope="col">Campo</th><th scope="col">Valor</th></tr></thead>' +
                            '<tbody>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Estación de monitoreo</th><td>' + f.properties.ID + ' - ' + f.properties.Estacion + '</td></tr>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Estado</th><td>' + f.properties.Estado + '</td></tr>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Región hidrológico-administrativa</th><td>' + f.properties.Organismo + '</td></tr>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Demanda Bioquímica de Oxigeno</th><td>' + f.properties.Valor + '</td></tr>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Clasificación</th><td>' + f.properties.Clasi + '</td></tr>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Año</th><td>' + f.properties.Anio + '</td></tr>' +
                            '</tbody></table>';
                        l.bindPopup(contenido);
                        l.on("click", function () {
                            centerLeafletMapOnMarker(map, this);
                        });
                    }
                },
            });
            GroupoSitioSelect.addLayer(sitiosL);
            GroupoSitioSelect.addTo(map);
        }).done(function () {
            callback();
        });
    }
}

/**
 * Similar a getPozo_SIG
 */
function getSitioDQO_SIG(callback) {
    GroupoSitioSelect.clearLayers();
    var SitiosSHP = {
        type: "FeatureCollection",
        name: "SitiosSHP",
        crs: {
            type: "name",
            properties: {
                name: "urn:ogc:def:crs:OGC:1.3:CRS84",
            },
        },
        features: [],
    };

    var Sitios = $("#Sitios option:selected").length;
    if (Sitios !== 0) {
        const OC = selectOrganismo();
        const Est = selectEst();
        const Mun = selectMun();
        const Anio = selectAnio();
        const Clave = selectClave();
        var query = "(" +
            OC +
            ") AND (" +
            Est +
            ") AND (" +
            Mun +
            ") AND (" +
            Anio +
            ") AND (" +
            Clave +
            ") AND valor is NOT NULL GROUP BY Clave";
        cadena = "query=" + query + "&Accion=puntoSitioDQO";
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
            data: cadena,
            /**
             * @param resp
             * Si el controlador devuelve la consulta se procederá con el proceso de interpretación de los datos
             */
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    SitiosSHP.features.push({
                        type: "Feature",
                        properties: {
                            ID: item.Clave,
                            Estacion: item.Estacion,
                            Estado: item.estado,
                            Organismo: item.organismo,
                            Valor: item.Valor,
                            Clasi: item.Clasificacion,
                            Anio: item.anio,
                            cuenca: item.cuenca_id,
                            Latitud: item.lat,
                            Longitud: item.lon,
                            Color: item.Color,
                        },
                        geometry: {
                            type: "Point",
                            coordinates: [item.lon, item.lat],
                        },
                    });
                });
            },
        }).always(function () {
            sitiosL = L.geoJson(SitiosSHP, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(
                        latlng,
                        {
                            radius: 8,
                            fillColor: feature.properties.Color,
                            weight: 1,
                            opacity: 1,
                            fillOpacity: 1,
                        }
                    );
                },
                onEachFeature: function popUp(f, l) {
                    if (f.properties) {
                        contenido =
                            '<table class="table table-bordered"><thead><tr><th scope="col">Campo</th><th scope="col">Valor</th></tr></thead>' +
                            '<tbody>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Estación de monitoreo</th><td>' + f.properties.ID + ' - ' + f.properties.Estacion + '</td></tr>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Estado</th><td>' + f.properties.Estado + '</td></tr>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Región hidrológico-administrativa</th><td>' + f.properties.Organismo + '</td></tr>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Demanda Química de Oxigeno</th><td>' + f.properties.Valor + '</td></tr>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Clasificación</th><td>' + f.properties.Clasi + '</td></tr>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Año</th><td>' + f.properties.Anio + '</td></tr>' +
                            '</tbody></table>';
                        l.bindPopup(contenido);
                        l.on("click", function () {
                            centerLeafletMapOnMarker(map, this);
                        });
                    }
                },
            });
            GroupoSitioSelect.addLayer(sitiosL);
            GroupoSitioSelect.addTo(map);
        }).done(function () {
            callback();
        });
    }
}

/**
 * Similar a getPozo_SIG
 */
function getSitioSST_SIG(callback) {
    GroupoSitioSelect.clearLayers();
    var SitiosSHP = {
        type: "FeatureCollection",
        name: "SitiosSHP",
        crs: {
            type: "name",
            properties: {
                name: "urn:ogc:def:crs:OGC:1.3:CRS84",
            },
        },
        features: [],
    };

    var Sitios = $("#Sitios option:selected").length;
    if (Sitios !== 0) {
        const OC = selectOrganismo();
        const Est = selectEst();
        const Mun = selectMun();
        const Anio = selectAnio();
        const Clave = selectClave();
        var query = "(" +
            OC +
            ") AND (" +
            Est +
            ") AND (" +
            Mun +
            ") AND (" +
            Anio +
            ") AND (" +
            Clave +
            ") AND valor is NOT NULL GROUP BY Clave";
        cadena = "query=" + query + "&Accion=puntoSitioSST";
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
            data: cadena,
            /**
             * @param resp
             * Si el controlador devuelve la consulta se procederá con el proceso de interpretación de los datos
             */
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    SitiosSHP.features.push({
                        type: "Feature",
                        properties: {
                            ID: item.Clave,
                            Estacion: item.Estacion,
                            Estado: item.estado,
                            Organismo: item.organismo,
                            Valor: item.Valor,
                            Clasi: item.Clasificacion,
                            Anio: item.anio,
                            cuenca: item.cuenca_id,
                            Latitud: item.lat,
                            Longitud: item.lon,
                            Color: item.Color,
                        },
                        geometry: {
                            type: "Point",
                            coordinates: [item.lon, item.lat],
                        },
                    });
                });
            },
        }).always(function () {
            sitiosL = L.geoJson(SitiosSHP, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(
                        latlng,
                        {
                            radius: 8,
                            fillColor: feature.properties.Color,
                            weight: 1,
                            opacity: 1,
                            fillOpacity: 1,
                        }
                    );
                },
                onEachFeature: function popUp(f, l) {
                    if (f.properties) {
                        contenido =
                            '<table class="table table-bordered"><thead><tr><th scope="col">Campo</th><th scope="col">Valor</th></tr></thead>' +
                            '<tbody>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Estación de monitoreo</th><td>' + f.properties.ID + ' - ' + f.properties.Estacion + '</td></tr>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Estado</th><td>' + f.properties.Estado + '</td></tr>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Región hidrológico-administrativa</th><td>' + f.properties.Organismo + '</td></tr>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Sólidos Suspendidos Totales</th><td>' + f.properties.Valor + '</td></tr>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Clasificación</th><td>' + f.properties.Clasi + '</td></tr>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Año</th><td>' + f.properties.Anio + '</td></tr>' +
                            '</tbody></table>';
                        l.bindPopup(contenido);
                        l.on("click", function () {
                            centerLeafletMapOnMarker(map, this);
                        });
                    }
                },
            });
            GroupoSitioSelect.addLayer(sitiosL);
            GroupoSitioSelect.addTo(map);
        }).done(function () {
            callback();
        });
    }
}

/**
 * Similar a getPozo_SIG
 */
function getSitioCF_SIG(callback) {
    GroupoSitioSelect.clearLayers();
    var SitiosSHP = {
        type: "FeatureCollection",
        name: "SitiosSHP",
        crs: {
            type: "name",
            properties: {
                name: "urn:ogc:def:crs:OGC:1.3:CRS84",
            },
        },
        features: [],
    };

    var Sitios = $("#Sitios option:selected").length;
    if (Sitios !== 0) {
        const OC = selectOrganismo();
        const Est = selectEst();
        const Mun = selectMun();
        const Anio = selectAnio();
        const Clave = selectClave();
        var query = "(" +
            OC +
            ") AND (" +
            Est +
            ") AND (" +
            Mun +
            ") AND (" +
            Anio +
            ") AND (" +
            Clave +
            ") AND valor is NOT NULL GROUP BY Clave";
        cadena = "query=" + query + "&Accion=puntoSitioCF";
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
            data: cadena,
            /**
             * @param resp
             * Si el controlador devuelve la consulta se procederá con el proceso de interpretación de los datos
             */
            success: function (resp) {
                $.each(JSON.parse(resp), function (index, item) {
                    SitiosSHP.features.push({
                        type: "Feature",
                        properties: {
                            ID: item.Clave,
                            Estacion: item.Estacion,
                            Estado: item.estado,
                            Organismo: item.organismo,
                            Valor: item.Valor,
                            Clasi: item.Clasificacion,
                            Anio: item.anio,
                            cuenca: item.cuenca_id,
                            Latitud: item.lat,
                            Longitud: item.lon,
                            Color: item.Color,
                        },
                        geometry: {
                            type: "Point",
                            coordinates: [item.lon, item.lat],
                        },
                    });
                });
            },
        }).always(function () {
            sitiosL = L.geoJson(SitiosSHP, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(
                        latlng,
                        {
                            radius: 8,
                            fillColor: feature.properties.Color,
                            weight: 1,
                            opacity: 1,
                            fillOpacity: 1,
                        }
                    );
                },
                onEachFeature: function popUp(f, l) {
                    if (f.properties) {
                        contenido =
                            '<table class="table table-bordered"><thead><tr><th scope="col">Campo</th><th scope="col">Valor</th></tr></thead>' +
                            '<tbody>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Estación de monitoreo</th><td>' + f.properties.ID + ' - ' + f.properties.Estacion + '</td></tr>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Estado</th><td>' + f.properties.Estado + '</td></tr>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Región hidrológico-administrativa</th><td>' + f.properties.Organismo + '</td></tr>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Coliformes fecales</th><td>' + f.properties.Valor + '</td></tr>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Clasificación</th><td>' + f.properties.Clasi + '</td></tr>' +
                            //Organismo de Cuenca
                            '<tr><th scope="row">Año</th><td>' + f.properties.Anio + '</td></tr>' +
                            '</tbody></table>';
                        l.bindPopup(contenido);
                        l.on("click", function () {
                            centerLeafletMapOnMarker(map, this);
                        });
                    }
                },
            });
            GroupoSitioSelect.addLayer(sitiosL);
            GroupoSitioSelect.addTo(map);
        }).done(function () {
            callback();
        });
    }
}

/**
 * Funcion Para cargar los Estados por marginacion
 * @param callback
 */

function getEstadoMarginacion_SIG(callback) {
    let Est = '';
    $("#Estados option:selected").each(function () {
        Est += "id_estado=" + $(this).val() + " or ";
    }).promise().done(function () {
        Est = Est.slice(0, -3);
    });
    GroupoEstSelect.clearLayers();
    var EstadosSHP = {
        type: "FeatureCollection",
        name: "EstadosSHP",
        features: [],
    };
    var sig = "query=" + Est + "&Accion=jsonEST";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/geoespacial.php",
        data: sig,
        success: function (resp) {
            $.each(JSON.parse(resp), function (index, item) {
                EstadosSHP.features.push(JSON.parse(item.json));
            });
        }
    }).always(function () {
        EstSelect = L.geoJson(EstadosSHP, {
            onEachFeature: function popUp(f, l) {
                if (f.properties) {
                    // Se extrae la informacion para añadirla al pop up del mapa
                    var idEstado = "id=" + f.properties.COV_ID + "&Accion=getInfoEstadoMapa";
                    $.ajax({
                        type: "POST",
                        url: "/aplicacion/controlador/estadomarginacion.php",
                        data: idEstado,
                        success: function (estados) {
                            var item = JSON.parse(estados);
                            contenido =
                                '<table class="table table-bordered"><thead><tr><th scope="col">Campo</th><th scope="col">Valor</th></tr></thead>' +
                                '<tbody>' +
                                '<tr><th scope="row">Estado</th><td>' + item.estado + '</td></tr>' +
                                '<tr><th scope="row">Pob. Tot.</th><td>' + item.pob_tot + '</td></tr>' +
                                '<tr><th scope="row">Analf.</th><td>' + item.analf + '</td></tr>' +
                                '<tr><th scope="row">IM.</th><td>' + item.im + '</td></tr>' +
                                '<tr><th scope="row">GM.</th><td>' + item.gm + '</td></tr>' +
                                '</tbody></table>';
                            setColorMarginacion(l, item.gm);
                        }
                    }).always(function () {
                        l.bindPopup(contenido);
                        l.on("click", function () {
                            map.fitBounds(this.getBounds());
                        });
                    });
                }
            },
        });
        GroupoEstSelect.addTo(map);
        GroupoEstSelect.addLayer(EstSelect);

        legendMarginacion.addTo(map);

    }).done(function () {
        callback();
    });
}



/**
 * Funcion para cargar Municipios
 * @param callback
 */
function getMunicipioMarginacion_SIG(callback) {
    let Mun = '';
    $("#Municipios option:selected").each(function () {
        Mun += "id_municipio=" + $(this).val() + " or ";
    }).promise().done(function () {
        Mun = Mun.slice(0, -3);
    });
    GroupoMunSelect.clearLayers();
    var municipioSHP = {
        type: "FeatureCollection",
        name: "municipioSHP",
        crs: {
            type: "name",
            properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
        },
        features: [],
    };

    var sig = "query=" + Mun + "&Accion=jsonMun";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/geoespacial.php",
        data: sig,
        success: function (resp) {
            $.each(JSON.parse(resp), function (index, item) {
                municipioSHP.features.push(JSON.parse(item.json));
            });
        },
    }).always(function () {
        MunSelect = L.geoJson(municipioSHP, {
            style: colorMuni,
            onEachFeature: function popUp(f, l) {
                if (f.properties) {
                    var idMuni = "id=" + f.properties.OID_1 + "&Accion=getInfoMunicipioMapa";
                    $.ajax({
                        type: "POST",
                        url: "/aplicacion/controlador/municipiomarginacion.php",
                        data: idMuni,
                        success: function (municipios) {
                            var item = JSON.parse(municipios);
                            contenido =
                                '<table class="table table-bordered"><thead><tr><th scope="col">Campo</th><th scope="col">Valor</th></tr></thead>' +
                                '<tbody>' +
                                '<tr><th scope="row">Estado</th><td>' + item.estado + '</td></tr>' +
                                '<tr><th scope="row">Estado</th><td>' + item.municipio + '</td></tr>' +
                                '<tr><th scope="row">Pob. Tot.</th><td>' + item.pob_tot + '</td></tr>' +
                                '<tr><th scope="row">Analf.</th><td>' + item.analf + '</td></tr>' +
                                '<tr><th scope="row">IM.</th><td>' + item.im + '</td></tr>' +
                                '<tr><th scope="row">GM.</th><td>' + item.gm + '</td></tr>' +
                                '</tbody></table>';
                            setColorMarginacion(l, item.gm);
                        }
                    }).always(function () {
                        l.bindPopup(contenido);
                        l.on("click", function () {
                            map.fitBounds(this.getBounds());
                        });
                    });
                }
            },
        });
        GroupoMunSelect.addTo(map);
        GroupoMunSelect.addLayer(MunSelect);

    }).done(function () {
        callback();
    });
}

// Se elige el color del shape dependiendo del grado de marginacion
function setColorMarginacion(l, gm) {
    var color;
    switch (gm) {
        case 'Muy bajo':
            // Verde
            color = '#72EA14';
            break;
        case 'Bajo':
            // Amarillo verde
            color = '#ACEA14';

            break;
        case 'Medio':
            // Amarillo
            color = '#E0EA14';
            break;
        case 'Alto':
            // Naranja
            color = '#EAB314';
            break;
        case 'Muy alto':
            // Rojo
            color = '#751230';
            break;
        default:
            break;
    }

    l.setStyle({
        weight: 1,
        color: "#000",
        fillColor: color,
        fillOpacity: 0.6,
    });
}

//Creacion de los legends 

legendMarginacion.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = "<div class='fila'><i class='columna' style='background:#751230'></i> Muy alto</div>" +
        "<div class='fila'><i class='columna' style='background:#EAB314'></i> Alto</div>" +
        "<div class='fila'><i class='columna' style='background:#E0EA14'></i> Medio</div>" +
        "<div class='fila'><i class='columna' style='background:#ACEA14'></i> Bajo</div>" +
        "<div class='fila'><i class='columna' style='background:#72EA14'></i> Muy Bajo</div>";
    return div;
};

// Creacion HTML de los legends
legendEstacionClimatologica.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML =
        "<div class='fila'><i class='columna' style='background:#69E315;'></i> Operando</div>" +
        "<div class='fila'><i class='columna' style='background:#FF0000;'></i> Suspendido</div>";
    return div;
};

legendAcuifero.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML =
        "<div class='fila'><i class='columna' style='background:#1fa17a;'></i> Con disponibilidad</div>" +
        "<div class='fila'><i class='columna' style='background:#751230;'></i> Sin disponibilidad</div>";
    return div;
};


/**
 * Funcion que hace zoom al punto de Leaflet
 * @param {*} map
 * @param {*} marker
 */
function centerLeafletMapOnMarker(map, marker) {
    /**
     * Obtiene las coordenadas del punto seleccionado
     */
    var latLngs = [marker.getLatLng()];
    var markerBounds = L.latLngBounds(latLngs);
    /**
     * Hacwe zoom al mapa con dichas coordenadas
     */
    map.fitBounds(markerBounds);
}

/**
 *  Función que crea las instancias al mapa
 */
function crearMapa() {
    /**
     * Se crea la variable map que contiene las coordenadas del país de México y el tipo de mapa que vamos a utilizar.
     */
    map = new L.Map("map", {
        center: [22.4326, -99.13],
        zoom: 5,
    });

    tile_layer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
}