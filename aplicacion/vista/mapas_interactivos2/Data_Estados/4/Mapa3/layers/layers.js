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
var format_Acuferos_3 = new ol.format.GeoJSON();
var features_Acuferos_3 = format_Acuferos_3.readFeatures(json_Acuferos_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Acuferos_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Acuferos_3.addFeatures(features_Acuferos_3);
var lyr_Acuferos_3 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Acuferos_3, 
                style: style_Acuferos_3,
                interactive: true,
                title: '<img src="styles/legend/Acuferos_3.png" /> Acuíferos'
            });
var format_NodePozosporMunicipio_4 = new ol.format.GeoJSON();
var features_NodePozosporMunicipio_4 = format_NodePozosporMunicipio_4.readFeatures(json_NodePozosporMunicipio_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_NodePozosporMunicipio_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_NodePozosporMunicipio_4.addFeatures(features_NodePozosporMunicipio_4);
var lyr_NodePozosporMunicipio_4 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_NodePozosporMunicipio_4, 
                style: style_NodePozosporMunicipio_4,
                interactive: true,
    title: 'No. de Pozos por Municipio<br />\
    <img src="styles/legend/NodePozosporMunicipio_4_0.png" /> 12 - 217<br />\
    <img src="styles/legend/NodePozosporMunicipio_4_1.png" /> 217 - 421<br />\
    <img src="styles/legend/NodePozosporMunicipio_4_2.png" /> 421 - 626<br />\
    <img src="styles/legend/NodePozosporMunicipio_4_3.png" /> 626 - 830<br />\
    <img src="styles/legend/NodePozosporMunicipio_4_4.png" /> 830 - 1035<br />'
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
var group_Campeche = new ol.layer.Group({
                                layers: [lyr_GoogleSatellite_0,lyr_Lmiteestatal_1,lyr_LmiteMunicipal_2,lyr_Acuferos_3,lyr_NodePozosporMunicipio_4,lyr_Municipios_5,lyr_Poblaciones_6,],
                                title: "Campeche"});

lyr_GoogleSatellite_0.setVisible(true);lyr_Lmiteestatal_1.setVisible(true);lyr_LmiteMunicipal_2.setVisible(true);lyr_Acuferos_3.setVisible(true);lyr_NodePozosporMunicipio_4.setVisible(true);lyr_Municipios_5.setVisible(true);lyr_Poblaciones_6.setVisible(true);
var layersList = [group_Campeche];
lyr_Lmiteestatal_1.set('fieldAliases', {'CVE_ENT': 'CVE_ENT', 'NOM_ENT': 'NOM_ENT', 'CAPITAL': 'CAPITAL', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', });
lyr_LmiteMunicipal_2.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', });
lyr_Acuferos_3.set('fieldAliases', {'id_acuif': 'id_acuif', 'nom_acuif': 'nom_acuif', 'id_edo': 'id_edo', 'nom_edo': 'nom_edo', 'id_rha': 'id_rha', 'nom_rha': 'nom_rha', 'dispon': 'dispon', 'disp_hm3': 'disp_hm3', 'fecha_dof': 'fecha_dof', 'a�o': 'a�o', 'Shape_area': 'Shape_area', 'Shape_len': 'Shape_len', });
lyr_NodePozosporMunicipio_4.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', 'PID': 'PID', 'ENTMUN2': 'ENTMUN2', 'Pozos_mun': 'Pozos_mun', });
lyr_Municipios_5.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', });
lyr_Poblaciones_6.set('fieldAliases', {'NO': 'NO', 'LATITUD': 'LATITUD', 'LONGITUD': 'LONGITUD', 'POBLACION': 'POBLACION', 'Capital': 'Capital', 'CDAD': 'CDAD', 'CIUDAD': 'CIUDAD', });
lyr_Lmiteestatal_1.set('fieldImages', {'CVE_ENT': 'TextEdit', 'NOM_ENT': 'TextEdit', 'CAPITAL': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'Range', 'COV_ID': 'Range', });
lyr_LmiteMunicipal_2.set('fieldImages', {'OBJECTID': 'TextEdit', 'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', });
lyr_Acuferos_3.set('fieldImages', {'id_acuif': 'TextEdit', 'nom_acuif': 'TextEdit', 'id_edo': 'TextEdit', 'nom_edo': 'TextEdit', 'id_rha': 'TextEdit', 'nom_rha': 'TextEdit', 'dispon': 'TextEdit', 'disp_hm3': 'TextEdit', 'fecha_dof': 'TextEdit', 'a�o': '', 'Shape_area': 'TextEdit', 'Shape_len': 'TextEdit', });
lyr_NodePozosporMunicipio_4.set('fieldImages', {'OBJECTID': 'TextEdit', 'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', 'PID': 'TextEdit', 'ENTMUN2': 'TextEdit', 'Pozos_mun': 'TextEdit', });
lyr_Municipios_5.set('fieldImages', {'OBJECTID': 'TextEdit', 'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', });
lyr_Poblaciones_6.set('fieldImages', {'NO': 'Range', 'LATITUD': 'TextEdit', 'LONGITUD': 'TextEdit', 'POBLACION': 'TextEdit', 'Capital': 'TextEdit', 'CDAD': 'TextEdit', 'CIUDAD': 'TextEdit', });
lyr_Lmiteestatal_1.set('fieldLabels', {});
lyr_LmiteMunicipal_2.set('fieldLabels', {});
lyr_Acuferos_3.set('fieldLabels', {});
lyr_NodePozosporMunicipio_4.set('fieldLabels', {});
lyr_Municipios_5.set('fieldLabels', {});
lyr_Poblaciones_6.set('fieldLabels', {});
lyr_Poblaciones_6.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});