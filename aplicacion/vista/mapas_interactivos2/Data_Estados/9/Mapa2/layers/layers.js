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
var format_UnidadesdeRiego_3 = new ol.format.GeoJSON();
var features_UnidadesdeRiego_3 = format_UnidadesdeRiego_3.readFeatures(json_UnidadesdeRiego_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_UnidadesdeRiego_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_UnidadesdeRiego_3.addFeatures(features_UnidadesdeRiego_3);
var lyr_UnidadesdeRiego_3 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_UnidadesdeRiego_3, 
                style: style_UnidadesdeRiego_3,
                interactive: true,
                title: '<img src="styles/legend/UnidadesdeRiego_3.png" /> Unidades de Riego'
            });
var format_Poblaciones_4 = new ol.format.GeoJSON();
var features_Poblaciones_4 = format_Poblaciones_4.readFeatures(json_Poblaciones_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Poblaciones_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Poblaciones_4.addFeatures(features_Poblaciones_4);
var lyr_Poblaciones_4 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Poblaciones_4, 
                style: style_Poblaciones_4,
                interactive: true,
                title: '<img src="styles/legend/Poblaciones_4.png" /> Poblaciones'
            });
var group_CDMX = new ol.layer.Group({
                                layers: [lyr_GoogleSatellite_0,lyr_Lmiteestatal_1,lyr_Lmitemunicipal_2,lyr_UnidadesdeRiego_3,lyr_Poblaciones_4,],
                                title: "CDMX"});

lyr_GoogleSatellite_0.setVisible(true);lyr_Lmiteestatal_1.setVisible(true);lyr_Lmitemunicipal_2.setVisible(true);lyr_UnidadesdeRiego_3.setVisible(true);lyr_Poblaciones_4.setVisible(true);
var layersList = [group_CDMX];
lyr_Lmiteestatal_1.set('fieldAliases', {'CVE_ENT': 'CVE_ENT', 'NOM_ENT': 'NOM_ENT', 'CAPITAL': 'CAPITAL', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', });
lyr_Lmitemunicipal_2.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'CVEGEO': 'CVEGEO', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_ENT': 'NOM_ENT', 'AREA': 'AREA', 'PERIMETER': 'PERIMETER', 'COV_': 'COV_', 'COV_ID': 'COV_ID', 'NOM_MUN': 'NOM_MUN', 'Shape_Leng': 'Shape_Leng', 'Shape_Area': 'Shape_Area', });
lyr_UnidadesdeRiego_3.set('fieldAliases', {'TIPO': 'TIPO', 'nom_dtt': 'nom_dtt', 'nom_dr': 'nom_dr', 'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_MUN': 'NOM_MUN', 'ENTMUN': 'ENTMUN', 'Area_ha': 'Area_ha', });
lyr_Poblaciones_4.set('fieldAliases', {'NO': 'NO', 'LATITUD': 'LATITUD', 'LONGITUD': 'LONGITUD', 'POBLACION': 'POBLACION', 'Capital': 'Capital', 'CDAD': 'CDAD', 'CIUDAD': 'CIUDAD', });
lyr_Lmiteestatal_1.set('fieldImages', {'CVE_ENT': 'TextEdit', 'NOM_ENT': 'TextEdit', 'CAPITAL': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'Range', 'COV_ID': 'Range', });
lyr_Lmitemunicipal_2.set('fieldImages', {'OBJECTID': 'TextEdit', 'CVEGEO': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_ENT': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETER': 'TextEdit', 'COV_': 'TextEdit', 'COV_ID': 'TextEdit', 'NOM_MUN': 'TextEdit', 'Shape_Leng': 'TextEdit', 'Shape_Area': 'TextEdit', });
lyr_UnidadesdeRiego_3.set('fieldImages', {'TIPO': 'TextEdit', 'nom_dtt': 'TextEdit', 'nom_dr': 'TextEdit', 'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_MUN': 'TextEdit', 'ENTMUN': 'TextEdit', 'Area_ha': 'TextEdit', });
lyr_Poblaciones_4.set('fieldImages', {'NO': 'Range', 'LATITUD': 'TextEdit', 'LONGITUD': 'TextEdit', 'POBLACION': 'TextEdit', 'Capital': 'TextEdit', 'CDAD': 'TextEdit', 'CIUDAD': 'TextEdit', });
lyr_Lmiteestatal_1.set('fieldLabels', {});
lyr_Lmitemunicipal_2.set('fieldLabels', {});
lyr_UnidadesdeRiego_3.set('fieldLabels', {});
lyr_Poblaciones_4.set('fieldLabels', {});
lyr_Poblaciones_4.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});