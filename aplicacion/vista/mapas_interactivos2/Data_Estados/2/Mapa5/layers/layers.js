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
var format_SinEvidenciadeDegradacin_3 = new ol.format.GeoJSON();
var features_SinEvidenciadeDegradacin_3 = format_SinEvidenciadeDegradacin_3.readFeatures(json_SinEvidenciadeDegradacin_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_SinEvidenciadeDegradacin_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_SinEvidenciadeDegradacin_3.addFeatures(features_SinEvidenciadeDegradacin_3);
var lyr_SinEvidenciadeDegradacin_3 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_SinEvidenciadeDegradacin_3, 
                style: style_SinEvidenciadeDegradacin_3,
                interactive: true,
                title: '<img src="styles/legend/SinEvidenciadeDegradacin_3.png" /> Sin Evidencia de Degradación'
            });
var format_GradodeDegradacin_4 = new ol.format.GeoJSON();
var features_GradodeDegradacin_4 = format_GradodeDegradacin_4.readFeatures(json_GradodeDegradacin_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_GradodeDegradacin_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_GradodeDegradacin_4.addFeatures(features_GradodeDegradacin_4);
var lyr_GradodeDegradacin_4 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_GradodeDegradacin_4, 
                style: style_GradodeDegradacin_4,
                interactive: true,
    title: 'Grado de Degradación<br />\
    <img src="styles/legend/GradodeDegradacin_4_0.png" /> Extremo<br />\
    <img src="styles/legend/GradodeDegradacin_4_1.png" /> Fuerte<br />\
    <img src="styles/legend/GradodeDegradacin_4_2.png" /> Ligero<br />\
    <img src="styles/legend/GradodeDegradacin_4_3.png" /> Moderado<br />'
        });
var format_Municipios_5 = new ol.format.GeoJSON();
var features_Municipios_5 = format_Municipios_5.readFeatures(json_Municipios_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Municipios_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Municipios_5.addFeatures(features_Municipios_5);
var lyr_Municipios_5 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Municipios_5, 
                style: style_Municipios_5,
                interactive: true,
                title: '<img src="styles/legend/Municipios_5.png" /> Municipios'
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
var group_BajaCalifornia = new ol.layer.Group({
                                layers: [lyr_GoogleSatellite_0,lyr_Lmiteestatal_1,lyr_Lmitemunicipal_2,lyr_SinEvidenciadeDegradacin_3,lyr_GradodeDegradacin_4,lyr_Municipios_5,lyr_Poblaciones_6,],
                                title: "Baja California"});

lyr_GoogleSatellite_0.setVisible(true);lyr_Lmiteestatal_1.setVisible(true);lyr_Lmitemunicipal_2.setVisible(true);lyr_SinEvidenciadeDegradacin_3.setVisible(true);lyr_GradodeDegradacin_4.setVisible(true);lyr_Municipios_5.setVisible(true);lyr_Poblaciones_6.setVisible(true);
var layersList = [group_BajaCalifornia];
lyr_Lmiteestatal_1.set('fieldAliases', {'CVE_ENT': 'CVE_ENT', 'NOM_ENT': 'NOM_ENT', 'CAPITAL': 'CAPITAL', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', });
lyr_Lmitemunicipal_2.set('fieldAliases', {'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', });
lyr_SinEvidenciadeDegradacin_3.set('fieldAliases', {'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', });
lyr_GradodeDegradacin_4.set('fieldAliases', {'TIPO': 'TIPO', 'GRADO': 'GRADO', 'causa': 'causa', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_MUN': 'NOM_MUN', 'ENTMUN': 'ENTMUN', });
lyr_Municipios_5.set('fieldAliases', {'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', });
lyr_Poblaciones_6.set('fieldAliases', {'NO': 'NO', 'LATITUD': 'LATITUD', 'LONGITUD': 'LONGITUD', 'POBLACION': 'POBLACION', 'Capital': 'Capital', 'CDAD': 'CDAD', 'CIUDAD': 'CIUDAD', });
lyr_Lmiteestatal_1.set('fieldImages', {'CVE_ENT': 'TextEdit', 'NOM_ENT': 'TextEdit', 'CAPITAL': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'Range', 'COV_ID': 'Range', });
lyr_Lmitemunicipal_2.set('fieldImages', {'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', });
lyr_SinEvidenciadeDegradacin_3.set('fieldImages', {'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', });
lyr_GradodeDegradacin_4.set('fieldImages', {'TIPO': 'TextEdit', 'GRADO': 'TextEdit', 'causa': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_MUN': 'TextEdit', 'ENTMUN': 'TextEdit', });
lyr_Municipios_5.set('fieldImages', {'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', });
lyr_Poblaciones_6.set('fieldImages', {'NO': 'Range', 'LATITUD': 'TextEdit', 'LONGITUD': 'TextEdit', 'POBLACION': 'TextEdit', 'Capital': 'TextEdit', 'CDAD': 'TextEdit', 'CIUDAD': 'TextEdit', });
lyr_Lmiteestatal_1.set('fieldLabels', {});
lyr_Lmitemunicipal_2.set('fieldLabels', {});
lyr_SinEvidenciadeDegradacin_3.set('fieldLabels', {});
lyr_GradodeDegradacin_4.set('fieldLabels', {});
lyr_Municipios_5.set('fieldLabels', {});
lyr_Poblaciones_6.set('fieldLabels', {});
lyr_Poblaciones_6.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});