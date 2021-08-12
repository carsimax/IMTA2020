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
var format_NodePozosporMunicipio_3 = new ol.format.GeoJSON();
var features_NodePozosporMunicipio_3 = format_NodePozosporMunicipio_3.readFeatures(json_NodePozosporMunicipio_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_NodePozosporMunicipio_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_NodePozosporMunicipio_3.addFeatures(features_NodePozosporMunicipio_3);
var lyr_NodePozosporMunicipio_3 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_NodePozosporMunicipio_3, 
                style: style_NodePozosporMunicipio_3,
                interactive: true,
    title: 'No. de Pozos por Municipio<br />\
    <img src="styles/legend/NodePozosporMunicipio_3_0.png" /> 16 - 95<br />\
    <img src="styles/legend/NodePozosporMunicipio_3_1.png" /> 95 - 174<br />\
    <img src="styles/legend/NodePozosporMunicipio_3_2.png" /> 174 - 253<br />\
    <img src="styles/legend/NodePozosporMunicipio_3_3.png" /> 253 - 332<br />\
    <img src="styles/legend/NodePozosporMunicipio_3_4.png" /> 332 - 411<br />'
        });
var format_Acuferos_4 = new ol.format.GeoJSON();
var features_Acuferos_4 = format_Acuferos_4.readFeatures(json_Acuferos_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Acuferos_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Acuferos_4.addFeatures(features_Acuferos_4);
var lyr_Acuferos_4 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Acuferos_4, 
                style: style_Acuferos_4,
                interactive: true,
                title: '<img src="styles/legend/Acuferos_4.png" /> Acuíferos'
            });
var format_Presas_5 = new ol.format.GeoJSON();
var features_Presas_5 = format_Presas_5.readFeatures(json_Presas_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Presas_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Presas_5.addFeatures(features_Presas_5);
var lyr_Presas_5 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Presas_5, 
                style: style_Presas_5,
                interactive: true,
                title: '<img src="styles/legend/Presas_5.png" /> Presas'
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
var format_Municipios_7 = new ol.format.GeoJSON();
var features_Municipios_7 = format_Municipios_7.readFeatures(json_Municipios_7, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Municipios_7 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Municipios_7.addFeatures(features_Municipios_7);
var lyr_Municipios_7 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Municipios_7, 
                style: style_Municipios_7,
                interactive: true,
                title: '<img src="styles/legend/Municipios_7.png" /> Municipios'
            });
var group_Aguascalientes = new ol.layer.Group({
                                layers: [lyr_GoogleSatellite_0,lyr_Lmiteestatal_1,lyr_Lmitemunicipal_2,lyr_NodePozosporMunicipio_3,lyr_Acuferos_4,lyr_Presas_5,lyr_Poblaciones_6,lyr_Municipios_7,],
                                title: "Aguascalientes"});

lyr_GoogleSatellite_0.setVisible(true);lyr_Lmiteestatal_1.setVisible(true);lyr_Lmitemunicipal_2.setVisible(true);lyr_NodePozosporMunicipio_3.setVisible(true);lyr_Acuferos_4.setVisible(true);lyr_Presas_5.setVisible(true);lyr_Poblaciones_6.setVisible(true);lyr_Municipios_7.setVisible(true);
var layersList = [group_Aguascalientes];
lyr_Lmiteestatal_1.set('fieldAliases', {'CVE_ENT': 'CVE_ENT', 'NOM_ENT': 'NOM_ENT', 'CAPITAL': 'CAPITAL', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', });
lyr_Lmitemunicipal_2.set('fieldAliases', {'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', });
lyr_NodePozosporMunicipio_3.set('fieldAliases', {'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', 'PID': 'PID', 'ENTMUN2': 'ENTMUN2', 'Count_ENTM': 'Count_ENTM', 'Sum_SUP_M2': 'Sum_SUP_M2', 'DIP': 'DIP', });
lyr_Acuferos_4.set('fieldAliases', {'id_acuif': 'id_acuif', 'nom_acuif': 'nom_acuif', 'id_edo': 'id_edo', 'nom_edo': 'nom_edo', 'id_rha': 'id_rha', 'nom_rha': 'nom_rha', 'dispon': 'dispon', 'disp_hm3': 'disp_hm3', 'fecha_dof': 'fecha_dof', 'año': 'año', 'Shape_area': 'Shape_area', 'Shape_len': 'Shape_len', });
lyr_Presas_5.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'PRESANOM': 'PRESANOM', 'ALIAS': 'ALIAS', 'PRESID': 'PRESID', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_MUN': 'NOM_MUN', 'ENTMUN': 'ENTMUN', });
lyr_Poblaciones_6.set('fieldAliases', {'NO': 'NO', 'LATITUD': 'LATITUD', 'LONGITUD': 'LONGITUD', 'POBLACION': 'POBLACION', 'Capital': 'Capital', 'CDAD': 'CDAD', 'CIUDAD': 'CIUDAD', });
lyr_Municipios_7.set('fieldAliases', {'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', });
lyr_Lmiteestatal_1.set('fieldImages', {'CVE_ENT': 'TextEdit', 'NOM_ENT': 'TextEdit', 'CAPITAL': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'Range', 'COV_ID': 'Range', });
lyr_Lmitemunicipal_2.set('fieldImages', {'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', });
lyr_NodePozosporMunicipio_3.set('fieldImages', {'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', 'PID': 'TextEdit', 'ENTMUN2': 'TextEdit', 'Count_ENTM': 'TextEdit', 'Sum_SUP_M2': 'TextEdit', 'DIP': 'TextEdit', });
lyr_Acuferos_4.set('fieldImages', {'id_acuif': 'TextEdit', 'nom_acuif': 'TextEdit', 'id_edo': 'TextEdit', 'nom_edo': 'TextEdit', 'id_rha': 'TextEdit', 'nom_rha': 'TextEdit', 'dispon': 'TextEdit', 'disp_hm3': 'TextEdit', 'fecha_dof': 'TextEdit', 'año': 'TextEdit', 'Shape_area': 'TextEdit', 'Shape_len': 'TextEdit', });
lyr_Presas_5.set('fieldImages', {'OBJECTID': 'TextEdit', 'PRESANOM': 'TextEdit', 'ALIAS': 'TextEdit', 'PRESID': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_MUN': 'TextEdit', 'ENTMUN': 'TextEdit', });
lyr_Poblaciones_6.set('fieldImages', {'NO': 'Range', 'LATITUD': 'TextEdit', 'LONGITUD': 'TextEdit', 'POBLACION': 'TextEdit', 'Capital': 'TextEdit', 'CDAD': 'TextEdit', 'CIUDAD': 'TextEdit', });
lyr_Municipios_7.set('fieldImages', {'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', });
lyr_Lmiteestatal_1.set('fieldLabels', {});
lyr_Lmitemunicipal_2.set('fieldLabels', {});
lyr_NodePozosporMunicipio_3.set('fieldLabels', {});
lyr_Acuferos_4.set('fieldLabels', {});
lyr_Presas_5.set('fieldLabels', {});
lyr_Poblaciones_6.set('fieldLabels', {});
lyr_Municipios_7.set('fieldLabels', {});
lyr_Municipios_7.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});