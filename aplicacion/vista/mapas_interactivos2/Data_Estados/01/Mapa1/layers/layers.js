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
var format_SinEvidenciadeDegradacin_2 = new ol.format.GeoJSON();
var features_SinEvidenciadeDegradacin_2 = format_SinEvidenciadeDegradacin_2.readFeatures(json_SinEvidenciadeDegradacin_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_SinEvidenciadeDegradacin_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_SinEvidenciadeDegradacin_2.addFeatures(features_SinEvidenciadeDegradacin_2);
var lyr_SinEvidenciadeDegradacin_2 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_SinEvidenciadeDegradacin_2, 
                style: style_SinEvidenciadeDegradacin_2,
                interactive: true,
                title: '<img src="styles/legend/SinEvidenciadeDegradacin_2.png" /> Sin Evidencia de Degradación'
            });
var format_DegradacindelSuelo_3 = new ol.format.GeoJSON();
var features_DegradacindelSuelo_3 = format_DegradacindelSuelo_3.readFeatures(json_DegradacindelSuelo_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_DegradacindelSuelo_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_DegradacindelSuelo_3.addFeatures(features_DegradacindelSuelo_3);
var lyr_DegradacindelSuelo_3 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_DegradacindelSuelo_3, 
                style: style_DegradacindelSuelo_3,
                interactive: true,
    title: 'Degradación del Suelo<br />\
    <img src="styles/legend/DegradacindelSuelo_3_0.png" /> Extremo<br />\
    <img src="styles/legend/DegradacindelSuelo_3_1.png" /> Fuerte<br />\
    <img src="styles/legend/DegradacindelSuelo_3_2.png" /> Ligero<br />\
    <img src="styles/legend/DegradacindelSuelo_3_3.png" /> Moderado<br />'
        });
var format_LmiteMunicipal_4 = new ol.format.GeoJSON();
var features_LmiteMunicipal_4 = format_LmiteMunicipal_4.readFeatures(json_LmiteMunicipal_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_LmiteMunicipal_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_LmiteMunicipal_4.addFeatures(features_LmiteMunicipal_4);
var lyr_LmiteMunicipal_4 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_LmiteMunicipal_4, 
                style: style_LmiteMunicipal_4,
                interactive: true,
                title: '<img src="styles/legend/LmiteMunicipal_4.png" /> Límite Municipal'
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
var group_Aguascalientes = new ol.layer.Group({
                                layers: [lyr_GoogleSatellite_0,lyr_LmiteEstatal_1,lyr_SinEvidenciadeDegradacin_2,lyr_DegradacindelSuelo_3,lyr_LmiteMunicipal_4,lyr_Poblaciones_5,],
                                title: "Aguascalientes"});

lyr_GoogleSatellite_0.setVisible(true);lyr_LmiteEstatal_1.setVisible(true);lyr_SinEvidenciadeDegradacin_2.setVisible(true);lyr_DegradacindelSuelo_3.setVisible(true);lyr_LmiteMunicipal_4.setVisible(true);lyr_Poblaciones_5.setVisible(true);
var layersList = [group_Aguascalientes];
lyr_LmiteEstatal_1.set('fieldAliases', {'CVE_ENT': 'CVE_ENT', 'NOM_ENT': 'NOM_ENT', 'CAPITAL': 'CAPITAL', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', });
lyr_SinEvidenciadeDegradacin_2.set('fieldAliases', {'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', });
lyr_DegradacindelSuelo_3.set('fieldAliases', {'TIPO': 'TIPO', 'GRADO': 'GRADO', 'causa': 'causa', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_MUN': 'NOM_MUN', 'ENTMUN': 'ENTMUN', });
lyr_LmiteMunicipal_4.set('fieldAliases', {'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', });
lyr_Poblaciones_5.set('fieldAliases', {'NO': 'NO', 'LATITUD': 'LATITUD', 'LONGITUD': 'LONGITUD', 'POBLACION': 'POBLACION', 'Capital': 'Capital', 'CDAD': 'CDAD', 'CIUDAD': 'CIUDAD', });
lyr_LmiteEstatal_1.set('fieldImages', {'CVE_ENT': 'TextEdit', 'NOM_ENT': 'TextEdit', 'CAPITAL': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'Range', 'COV_ID': 'Range', });
lyr_SinEvidenciadeDegradacin_2.set('fieldImages', {'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', });
lyr_DegradacindelSuelo_3.set('fieldImages', {'TIPO': 'TextEdit', 'GRADO': 'TextEdit', 'causa': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_MUN': 'TextEdit', 'ENTMUN': 'TextEdit', });
lyr_LmiteMunicipal_4.set('fieldImages', {'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', });
lyr_Poblaciones_5.set('fieldImages', {'NO': 'Range', 'LATITUD': 'TextEdit', 'LONGITUD': 'TextEdit', 'POBLACION': 'TextEdit', 'Capital': 'TextEdit', 'CDAD': 'TextEdit', 'CIUDAD': 'TextEdit', });
lyr_LmiteEstatal_1.set('fieldLabels', {});
lyr_SinEvidenciadeDegradacin_2.set('fieldLabels', {});
lyr_DegradacindelSuelo_3.set('fieldLabels', {});
lyr_LmiteMunicipal_4.set('fieldLabels', {});
lyr_Poblaciones_5.set('fieldLabels', {});
lyr_Poblaciones_5.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});