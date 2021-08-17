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
var format_SinEvidenciadeDegradacin_4 = new ol.format.GeoJSON();
var features_SinEvidenciadeDegradacin_4 = format_SinEvidenciadeDegradacin_4.readFeatures(json_SinEvidenciadeDegradacin_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_SinEvidenciadeDegradacin_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_SinEvidenciadeDegradacin_4.addFeatures(features_SinEvidenciadeDegradacin_4);
var lyr_SinEvidenciadeDegradacin_4 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_SinEvidenciadeDegradacin_4, 
                style: style_SinEvidenciadeDegradacin_4,
                interactive: true,
                title: '<img src="styles/legend/SinEvidenciadeDegradacin_4.png" /> Sin Evidencia de Degradación'
            });
var format_GradodeDegradacin_5 = new ol.format.GeoJSON();
var features_GradodeDegradacin_5 = format_GradodeDegradacin_5.readFeatures(json_GradodeDegradacin_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_GradodeDegradacin_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_GradodeDegradacin_5.addFeatures(features_GradodeDegradacin_5);
var lyr_GradodeDegradacin_5 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_GradodeDegradacin_5, 
                style: style_GradodeDegradacin_5,
                interactive: true,
    title: 'Grado de Degradación<br />\
    <img src="styles/legend/GradodeDegradacin_5_0.png" /> Extremo<br />\
    <img src="styles/legend/GradodeDegradacin_5_1.png" /> Fuerte<br />\
    <img src="styles/legend/GradodeDegradacin_5_2.png" /> Ligero<br />\
    <img src="styles/legend/GradodeDegradacin_5_3.png" /> Moderado<br />'
        });
var format_Poblaciones_6 = new ol.format.GeoJSON();
var features_Poblaciones_6 = format_Poblaciones_6.readFeatures(json_Poblaciones_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Poblaciones_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Poblaciones_6.addFeatures(features_Poblaciones_6);
var lyr_Poblaciones_6 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Poblaciones_6, 
                style: style_Poblaciones_6,
                interactive: true,
                title: '<img src="styles/legend/Poblaciones_6.png" /> Poblaciones'
            });
var group_BajaCaliforniaSur = new ol.layer.Group({
                                layers: [lyr_GoogleSatellite_0,lyr_LmiteEstatal_1,lyr_LmiteMunicipal_2,lyr_Municipios_3,lyr_SinEvidenciadeDegradacin_4,lyr_GradodeDegradacin_5,lyr_Poblaciones_6,],
                                title: "Baja California Sur"});

lyr_GoogleSatellite_0.setVisible(true);lyr_LmiteEstatal_1.setVisible(true);lyr_LmiteMunicipal_2.setVisible(true);lyr_Municipios_3.setVisible(true);lyr_SinEvidenciadeDegradacin_4.setVisible(true);lyr_GradodeDegradacin_5.setVisible(true);lyr_Poblaciones_6.setVisible(true);
var layersList = [group_BajaCaliforniaSur];
lyr_LmiteEstatal_1.set('fieldAliases', {'CVE_ENT': 'CVE_ENT', 'NOM_ENT': 'NOM_ENT', 'CAPITAL': 'CAPITAL', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', });
lyr_LmiteMunicipal_2.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', 'Shape_Leng': 'Shape_Leng', 'Shape_Area': 'Shape_Area', });
lyr_Municipios_3.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', 'Shape_Leng': 'Shape_Leng', 'Shape_Area': 'Shape_Area', });
lyr_SinEvidenciadeDegradacin_4.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', 'Shape_Leng': 'Shape_Leng', 'Shape_Area': 'Shape_Area', });
lyr_GradodeDegradacin_5.set('fieldAliases', {'TIPO': 'TIPO', 'GRADO': 'GRADO', 'causa': 'causa', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_MUN': 'NOM_MUN', 'ENTMUN': 'ENTMUN', });
lyr_Poblaciones_6.set('fieldAliases', {'NO': 'NO', 'LATITUD': 'LATITUD', 'LONGITUD': 'LONGITUD', 'POBLACION': 'POBLACION', 'Capital': 'Capital', 'CDAD': 'CDAD', 'CIUDAD': 'CIUDAD', });
lyr_LmiteEstatal_1.set('fieldImages', {'CVE_ENT': 'TextEdit', 'NOM_ENT': 'TextEdit', 'CAPITAL': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'Range', 'COV_ID': 'Range', });
lyr_LmiteMunicipal_2.set('fieldImages', {'OBJECTID': 'TextEdit', 'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', 'Shape_Leng': 'TextEdit', 'Shape_Area': 'TextEdit', });
lyr_Municipios_3.set('fieldImages', {'OBJECTID': 'TextEdit', 'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', 'Shape_Leng': 'TextEdit', 'Shape_Area': 'TextEdit', });
lyr_SinEvidenciadeDegradacin_4.set('fieldImages', {'OBJECTID': 'TextEdit', 'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', 'Shape_Leng': 'TextEdit', 'Shape_Area': 'TextEdit', });
lyr_GradodeDegradacin_5.set('fieldImages', {'TIPO': 'TextEdit', 'GRADO': 'TextEdit', 'causa': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_MUN': 'TextEdit', 'ENTMUN': 'TextEdit', });
lyr_Poblaciones_6.set('fieldImages', {'NO': 'Range', 'LATITUD': 'TextEdit', 'LONGITUD': 'TextEdit', 'POBLACION': 'TextEdit', 'Capital': 'TextEdit', 'CDAD': 'TextEdit', 'CIUDAD': 'TextEdit', });
lyr_LmiteEstatal_1.set('fieldLabels', {});
lyr_LmiteMunicipal_2.set('fieldLabels', {});
lyr_Municipios_3.set('fieldLabels', {});
lyr_SinEvidenciadeDegradacin_4.set('fieldLabels', {});
lyr_GradodeDegradacin_5.set('fieldLabels', {});
lyr_Poblaciones_6.set('fieldLabels', {});
lyr_Poblaciones_6.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});