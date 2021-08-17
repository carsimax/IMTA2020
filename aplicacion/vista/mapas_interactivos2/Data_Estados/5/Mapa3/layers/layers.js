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
    <img src="styles/legend/NodePozosporMunicipio_3_0.png" /> 0 - 0.5<br />\
    <img src="styles/legend/NodePozosporMunicipio_3_1.png" /> 0.5 - 1<br />'
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
var group_CDMX = new ol.layer.Group({
                                layers: [lyr_GoogleSatellite_0,lyr_Lmiteestatal_1,lyr_Lmitemunicipal_2,lyr_NodePozosporMunicipio_3,lyr_Acuferos_4,lyr_Poblaciones_5,],
                                title: "CDMX"});

lyr_GoogleSatellite_0.setVisible(true);lyr_Lmiteestatal_1.setVisible(true);lyr_Lmitemunicipal_2.setVisible(true);lyr_NodePozosporMunicipio_3.setVisible(true);lyr_Acuferos_4.setVisible(true);lyr_Poblaciones_5.setVisible(true);
var layersList = [group_CDMX];
lyr_Lmiteestatal_1.set('fieldAliases', {'CVE_ENT': 'CVE_ENT', 'NOM_ENT': 'NOM_ENT', 'CAPITAL': 'CAPITAL', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', });
lyr_Lmitemunicipal_2.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', 'Shape_Leng': 'Shape_Leng', 'Shape_Area': 'Shape_Area', });
lyr_NodePozosporMunicipio_3.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', 'Shape_Leng': 'Shape_Leng', 'Shape_Area': 'Shape_Area', 'PID': 'PID', 'ENTMUN2': 'ENTMUN2', 'Pozos_mun': 'Pozos_mun', });
lyr_Acuferos_4.set('fieldAliases', {'id_acuif': 'id_acuif', 'nom_acuif': 'nom_acuif', 'id_edo': 'id_edo', 'nom_edo': 'nom_edo', 'id_rha': 'id_rha', 'nom_rha': 'nom_rha', 'dispon': 'dispon', 'disp_hm3': 'disp_hm3', 'fecha_dof': 'fecha_dof', 'a�o': 'a�o', 'Shape_area': 'Shape_area', 'Shape_len': 'Shape_len', });
lyr_Poblaciones_5.set('fieldAliases', {'NO': 'NO', 'LATITUD': 'LATITUD', 'LONGITUD': 'LONGITUD', 'POBLACION': 'POBLACION', 'Capital': 'Capital', 'CDAD': 'CDAD', 'CIUDAD': 'CIUDAD', });
lyr_Lmiteestatal_1.set('fieldImages', {'CVE_ENT': 'TextEdit', 'NOM_ENT': 'TextEdit', 'CAPITAL': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'Range', 'COV_ID': 'Range', });
lyr_Lmitemunicipal_2.set('fieldImages', {'OBJECTID': 'TextEdit', 'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', 'Shape_Leng': 'TextEdit', 'Shape_Area': 'TextEdit', });
lyr_NodePozosporMunicipio_3.set('fieldImages', {'OBJECTID': 'TextEdit', 'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', 'Shape_Leng': 'TextEdit', 'Shape_Area': 'TextEdit', 'PID': 'TextEdit', 'ENTMUN2': 'TextEdit', 'Pozos_mun': 'TextEdit', });
lyr_Acuferos_4.set('fieldImages', {'id_acuif': 'TextEdit', 'nom_acuif': 'TextEdit', 'id_edo': 'TextEdit', 'nom_edo': 'TextEdit', 'id_rha': 'TextEdit', 'nom_rha': 'TextEdit', 'dispon': 'TextEdit', 'disp_hm3': 'TextEdit', 'fecha_dof': 'TextEdit', 'a�o': '', 'Shape_area': 'TextEdit', 'Shape_len': 'TextEdit', });
lyr_Poblaciones_5.set('fieldImages', {'NO': 'Range', 'LATITUD': 'TextEdit', 'LONGITUD': 'TextEdit', 'POBLACION': 'TextEdit', 'Capital': 'TextEdit', 'CDAD': 'TextEdit', 'CIUDAD': 'TextEdit', });
lyr_Lmiteestatal_1.set('fieldLabels', {});
lyr_Lmitemunicipal_2.set('fieldLabels', {});
lyr_NodePozosporMunicipio_3.set('fieldLabels', {});
lyr_Acuferos_4.set('fieldLabels', {});
lyr_Poblaciones_5.set('fieldLabels', {});
lyr_Poblaciones_5.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});