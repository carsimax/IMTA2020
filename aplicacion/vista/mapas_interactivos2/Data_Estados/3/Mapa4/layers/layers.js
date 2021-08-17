var wms_layers = [];


        var lyr_GoogleSatellite_0 = new ol.layer.Tile({
            'title': 'Google Satellite',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' &middot; <a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>',
                url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
            })
        });
var format_LmiteEstatal_1 = new ol.format.GeoJSON();
var features_LmiteEstatal_1 = format_LmiteEstatal_1.readFeatures(json_LmiteEstatal_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_LmiteEstatal_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_LmiteEstatal_1.addFeatures(features_LmiteEstatal_1);
var lyr_LmiteEstatal_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_LmiteEstatal_1, 
                style: style_LmiteEstatal_1,
                interactive: true,
                title: '<img src="styles/legend/LmiteEstatal_1.png" /> Límite Estatal'
            });
var format_LmiteMunicipal_2 = new ol.format.GeoJSON();
var features_LmiteMunicipal_2 = format_LmiteMunicipal_2.readFeatures(json_LmiteMunicipal_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_LmiteMunicipal_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_LmiteMunicipal_2.addFeatures(features_LmiteMunicipal_2);
var lyr_LmiteMunicipal_2 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_LmiteMunicipal_2, 
                style: style_LmiteMunicipal_2,
                interactive: true,
                title: '<img src="styles/legend/LmiteMunicipal_2.png" /> Límite Municipal'
            });
var format_Municipios_3 = new ol.format.GeoJSON();
var features_Municipios_3 = format_Municipios_3.readFeatures(json_Municipios_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Municipios_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Municipios_3.addFeatures(features_Municipios_3);
var lyr_Municipios_3 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Municipios_3, 
                style: style_Municipios_3,
                interactive: true,
                title: '<img src="styles/legend/Municipios_3.png" /> Municipios'
            });
var format_TiposdeVegetacin_4 = new ol.format.GeoJSON();
var features_TiposdeVegetacin_4 = format_TiposdeVegetacin_4.readFeatures(json_TiposdeVegetacin_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_TiposdeVegetacin_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_TiposdeVegetacin_4.addFeatures(features_TiposdeVegetacin_4);
var lyr_TiposdeVegetacin_4 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_TiposdeVegetacin_4, 
                style: style_TiposdeVegetacin_4,
                interactive: true,
    title: 'Tipos de Vegetación<br />\
    <img src="styles/legend/TiposdeVegetacin_4_0.png" /> Agua<br />\
    <img src="styles/legend/TiposdeVegetacin_4_1.png" /> Arbustos<br />\
    <img src="styles/legend/TiposdeVegetacin_4_2.png" /> B. Ayarín<br />\
    <img src="styles/legend/TiposdeVegetacin_4_3.png" /> B. Cedro<br />\
    <img src="styles/legend/TiposdeVegetacin_4_4.png" /> B. Encino, encino-pino, pino, oyamel<br />\
    <img src="styles/legend/TiposdeVegetacin_4_5.png" /> B. Galería<br />\
    <img src="styles/legend/TiposdeVegetacin_4_6.png" /> B. Inducido<br />\
    <img src="styles/legend/TiposdeVegetacin_4_7.png" /> B. Mesófilo de M.<br />\
    <img src="styles/legend/TiposdeVegetacin_4_8.png" /> B. Mezquite<br />\
    <img src="styles/legend/TiposdeVegetacin_4_9.png" /> B. Tíscate<br />\
    <img src="styles/legend/TiposdeVegetacin_4_10.png" /> Chaparral<br />\
    <img src="styles/legend/TiposdeVegetacin_4_11.png" /> Dunas Costeras<br />\
    <img src="styles/legend/TiposdeVegetacin_4_12.png" /> Manglar<br />\
    <img src="styles/legend/TiposdeVegetacin_4_13.png" /> Matorral<br />\
    <img src="styles/legend/TiposdeVegetacin_4_14.png" /> Mezquital<br />\
    <img src="styles/legend/TiposdeVegetacin_4_15.png" /> No Aplicable<br />\
    <img src="styles/legend/TiposdeVegetacin_4_16.png" /> Pastizal<br />\
    <img src="styles/legend/TiposdeVegetacin_4_17.png" /> Popal<br />\
    <img src="styles/legend/TiposdeVegetacin_4_18.png" /> Pradera<br />\
    <img src="styles/legend/TiposdeVegetacin_4_19.png" /> Sabana<br />\
    <img src="styles/legend/TiposdeVegetacin_4_20.png" /> Selva<br />\
    <img src="styles/legend/TiposdeVegetacin_4_21.png" /> Sin Vegetación<br />\
    <img src="styles/legend/TiposdeVegetacin_4_22.png" /> Tular<br />\
    <img src="styles/legend/TiposdeVegetacin_4_23.png" /> Urbano <br />\
    <img src="styles/legend/TiposdeVegetacin_4_24.png" /> <br />'
        });
var format_Poblaciones_5 = new ol.format.GeoJSON();
var features_Poblaciones_5 = format_Poblaciones_5.readFeatures(json_Poblaciones_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Poblaciones_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Poblaciones_5.addFeatures(features_Poblaciones_5);
var lyr_Poblaciones_5 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Poblaciones_5, 
                style: style_Poblaciones_5,
                interactive: true,
                title: '<img src="styles/legend/Poblaciones_5.png" /> Poblaciones'
            });
var group_BajaCaliforniaSur = new ol.layer.Group({
                                layers: [lyr_GoogleSatellite_0,lyr_LmiteEstatal_1,lyr_LmiteMunicipal_2,lyr_Municipios_3,lyr_TiposdeVegetacin_4,lyr_Poblaciones_5,],
                                title: "Baja California Sur"});

lyr_GoogleSatellite_0.setVisible(true);lyr_LmiteEstatal_1.setVisible(true);lyr_LmiteMunicipal_2.setVisible(true);lyr_Municipios_3.setVisible(true);lyr_TiposdeVegetacin_4.setVisible(true);lyr_Poblaciones_5.setVisible(true);
var layersList = [group_BajaCaliforniaSur];
lyr_LmiteEstatal_1.set('fieldAliases', {'CVE_ENT': 'CVE_ENT', 'NOM_ENT': 'NOM_ENT', 'CAPITAL': 'CAPITAL', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', });
lyr_LmiteMunicipal_2.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', 'Shape_Leng': 'Shape_Leng', 'Shape_Area': 'Shape_Area', });
lyr_Municipios_3.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', 'Shape_Leng': 'Shape_Leng', 'Shape_Area': 'Shape_Area', });
lyr_TiposdeVegetacin_4.set('fieldAliases', {'TIP_INFO': 'TIP_INFO', 'CLAVE': 'CLAVE', 'TIP_ECOV': 'TIP_ECOV', 'TIP_VEG': 'TIP_VEG', 'DESVEG': 'DESVEG', 'FASE_VS': 'FASE_VS', 'OTROS': 'OTROS', 'CAL_POS': 'CAL_POS', 'USV': 'USV', });
lyr_Poblaciones_5.set('fieldAliases', {'NO': 'NO', 'LATITUD': 'LATITUD', 'LONGITUD': 'LONGITUD', 'POBLACION': 'POBLACION', 'Capital': 'Capital', 'CDAD': 'CDAD', 'CIUDAD': 'CIUDAD', });
lyr_LmiteEstatal_1.set('fieldImages', {'CVE_ENT': 'TextEdit', 'NOM_ENT': 'TextEdit', 'CAPITAL': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'Range', 'COV_ID': 'Range', });
lyr_LmiteMunicipal_2.set('fieldImages', {'OBJECTID': 'TextEdit', 'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', 'Shape_Leng': 'TextEdit', 'Shape_Area': 'TextEdit', });
lyr_Municipios_3.set('fieldImages', {'OBJECTID': 'TextEdit', 'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', 'Shape_Leng': 'TextEdit', 'Shape_Area': 'TextEdit', });
lyr_TiposdeVegetacin_4.set('fieldImages', {'TIP_INFO': 'TextEdit', 'CLAVE': 'TextEdit', 'TIP_ECOV': 'TextEdit', 'TIP_VEG': 'TextEdit', 'DESVEG': 'TextEdit', 'FASE_VS': 'TextEdit', 'OTROS': 'TextEdit', 'CAL_POS': 'TextEdit', 'USV': 'TextEdit', });
lyr_Poblaciones_5.set('fieldImages', {'NO': 'Range', 'LATITUD': 'TextEdit', 'LONGITUD': 'TextEdit', 'POBLACION': 'TextEdit', 'Capital': 'TextEdit', 'CDAD': 'TextEdit', 'CIUDAD': 'TextEdit', });
lyr_LmiteEstatal_1.set('fieldLabels', {});
lyr_LmiteMunicipal_2.set('fieldLabels', {});
lyr_Municipios_3.set('fieldLabels', {});
lyr_TiposdeVegetacin_4.set('fieldLabels', {});
lyr_Poblaciones_5.set('fieldLabels', {});
lyr_Poblaciones_5.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});