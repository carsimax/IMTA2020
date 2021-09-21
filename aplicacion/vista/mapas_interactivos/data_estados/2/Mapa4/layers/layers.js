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
var format_Lmiteestatal_1 = new ol.format.GeoJSON();
var features_Lmiteestatal_1 = format_Lmiteestatal_1.readFeatures(json_Lmiteestatal_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Lmiteestatal_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Lmiteestatal_1.addFeatures(features_Lmiteestatal_1);
var lyr_Lmiteestatal_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Lmiteestatal_1, 
                style: style_Lmiteestatal_1,
                interactive: true,
                title: '<img src="styles/legend/Lmiteestatal_1.png" /> Límite estatal'
            });
var format_Lmitemunicipal_2 = new ol.format.GeoJSON();
var features_Lmitemunicipal_2 = format_Lmitemunicipal_2.readFeatures(json_Lmitemunicipal_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Lmitemunicipal_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Lmitemunicipal_2.addFeatures(features_Lmitemunicipal_2);
var lyr_Lmitemunicipal_2 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Lmitemunicipal_2, 
                style: style_Lmitemunicipal_2,
                interactive: true,
                title: '<img src="styles/legend/Lmitemunicipal_2.png" /> Límite municipal'
            });
var format_TiposdeVegetacin_3 = new ol.format.GeoJSON();
var features_TiposdeVegetacin_3 = format_TiposdeVegetacin_3.readFeatures(json_TiposdeVegetacin_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_TiposdeVegetacin_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_TiposdeVegetacin_3.addFeatures(features_TiposdeVegetacin_3);
var lyr_TiposdeVegetacin_3 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_TiposdeVegetacin_3, 
                style: style_TiposdeVegetacin_3,
                interactive: true,
    title: 'Tipos de Vegetación<br />\
    <img src="styles/legend/TiposdeVegetacin_3_0.png" /> Agua<br />\
    <img src="styles/legend/TiposdeVegetacin_3_1.png" /> Arbustos<br />\
    <img src="styles/legend/TiposdeVegetacin_3_2.png" /> B. Ayarín<br />\
    <img src="styles/legend/TiposdeVegetacin_3_3.png" /> B. Cedro<br />\
    <img src="styles/legend/TiposdeVegetacin_3_4.png" /> B. Encino, encino-pino, pino, oyamel<br />\
    <img src="styles/legend/TiposdeVegetacin_3_5.png" /> B. Galería<br />\
    <img src="styles/legend/TiposdeVegetacin_3_6.png" /> B. Inducido<br />\
    <img src="styles/legend/TiposdeVegetacin_3_7.png" /> B. Mesófilo de M.<br />\
    <img src="styles/legend/TiposdeVegetacin_3_8.png" /> B. Mezquite<br />\
    <img src="styles/legend/TiposdeVegetacin_3_9.png" /> B. Tíscate<br />\
    <img src="styles/legend/TiposdeVegetacin_3_10.png" /> Chaparral<br />\
    <img src="styles/legend/TiposdeVegetacin_3_11.png" /> Dunas Costeras<br />\
    <img src="styles/legend/TiposdeVegetacin_3_12.png" /> Manglar<br />\
    <img src="styles/legend/TiposdeVegetacin_3_13.png" /> Matorral<br />\
    <img src="styles/legend/TiposdeVegetacin_3_14.png" /> Mezquital<br />\
    <img src="styles/legend/TiposdeVegetacin_3_15.png" /> No Aplicable<br />\
    <img src="styles/legend/TiposdeVegetacin_3_16.png" /> Pastizal<br />\
    <img src="styles/legend/TiposdeVegetacin_3_17.png" /> Popal<br />\
    <img src="styles/legend/TiposdeVegetacin_3_18.png" /> Pradera<br />\
    <img src="styles/legend/TiposdeVegetacin_3_19.png" /> Sabana<br />\
    <img src="styles/legend/TiposdeVegetacin_3_20.png" /> Selva<br />\
    <img src="styles/legend/TiposdeVegetacin_3_21.png" /> Sin Vegetación<br />\
    <img src="styles/legend/TiposdeVegetacin_3_22.png" /> Tular<br />\
    <img src="styles/legend/TiposdeVegetacin_3_23.png" /> Urbano <br />\
    <img src="styles/legend/TiposdeVegetacin_3_24.png" /> <br />'
        });
var format_Municipios_4 = new ol.format.GeoJSON();
var features_Municipios_4 = format_Municipios_4.readFeatures(json_Municipios_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Municipios_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Municipios_4.addFeatures(features_Municipios_4);
var lyr_Municipios_4 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Municipios_4, 
                style: style_Municipios_4,
                interactive: true,
                title: '<img src="styles/legend/Municipios_4.png" /> Municipios'
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
var group_BajaCalifornia = new ol.layer.Group({
                                layers: [lyr_GoogleSatellite_0,lyr_Lmiteestatal_1,lyr_Lmitemunicipal_2,lyr_TiposdeVegetacin_3,lyr_Municipios_4,lyr_Poblaciones_5,],
                                title: "Baja California"});

lyr_GoogleSatellite_0.setVisible(true);lyr_Lmiteestatal_1.setVisible(true);lyr_Lmitemunicipal_2.setVisible(true);lyr_TiposdeVegetacin_3.setVisible(true);lyr_Municipios_4.setVisible(true);lyr_Poblaciones_5.setVisible(true);
var layersList = [group_BajaCalifornia];
lyr_Lmiteestatal_1.set('fieldAliases', {'CVE_ENT': 'CVE_ENT', 'NOM_ENT': 'NOM_ENT', 'CAPITAL': 'CAPITAL', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', });
lyr_Lmitemunicipal_2.set('fieldAliases', {'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', });
lyr_TiposdeVegetacin_3.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'TIP_INFO': 'TIP_INFO', 'CLAVE': 'CLAVE', 'TIP_ECOV': 'TIP_ECOV', 'TIP_VEG': 'TIP_VEG', 'DESVEG': 'DESVEG', 'FASE_VS': 'FASE_VS', 'OTROS': 'OTROS', 'CAL_POS': 'CAL_POS', 'USV': 'USV', 'Shape_Leng': 'Shape_Leng', 'Shape_Area': 'Shape_Area', });
lyr_Municipios_4.set('fieldAliases', {'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', });
lyr_Poblaciones_5.set('fieldAliases', {'NO': 'NO', 'LATITUD': 'LATITUD', 'LONGITUD': 'LONGITUD', 'POBLACION': 'POBLACION', 'Capital': 'Capital', 'CDAD': 'CDAD', 'CIUDAD': 'CIUDAD', });
lyr_Lmiteestatal_1.set('fieldImages', {'CVE_ENT': 'TextEdit', 'NOM_ENT': 'TextEdit', 'CAPITAL': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'Range', 'COV_ID': 'Range', });
lyr_Lmitemunicipal_2.set('fieldImages', {'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', });
lyr_TiposdeVegetacin_3.set('fieldImages', {'OBJECTID': 'TextEdit', 'TIP_INFO': 'TextEdit', 'CLAVE': 'TextEdit', 'TIP_ECOV': 'TextEdit', 'TIP_VEG': 'TextEdit', 'DESVEG': 'TextEdit', 'FASE_VS': 'TextEdit', 'OTROS': 'TextEdit', 'CAL_POS': 'TextEdit', 'USV': 'TextEdit', 'Shape_Leng': 'TextEdit', 'Shape_Area': 'TextEdit', });
lyr_Municipios_4.set('fieldImages', {'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', });
lyr_Poblaciones_5.set('fieldImages', {'NO': 'Range', 'LATITUD': 'TextEdit', 'LONGITUD': 'TextEdit', 'POBLACION': 'TextEdit', 'Capital': 'TextEdit', 'CDAD': 'TextEdit', 'CIUDAD': 'TextEdit', });
lyr_Lmiteestatal_1.set('fieldLabels', {});
lyr_Lmitemunicipal_2.set('fieldLabels', {});
lyr_TiposdeVegetacin_3.set('fieldLabels', {});
lyr_Municipios_4.set('fieldLabels', {});
lyr_Poblaciones_5.set('fieldLabels', {});
lyr_Poblaciones_5.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});