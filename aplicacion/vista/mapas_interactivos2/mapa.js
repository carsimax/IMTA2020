/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */

function CambiarMapa() {
    var id =document.getElementById("Estado").value;
    document.getElementById("mapa1").innerHTML = "";
    document.getElementById("mapa2").innerHTML = "";
    document.getElementById("mapa3").innerHTML = "";
    document.getElementById("mapa4").innerHTML = "";
    document.getElementById("mapa5").innerHTML = "";
    $("#mapa1").append('<iframe src="Data_Estados/'+id+'/Mapa1/index.html" width="100%" height="100%"></iframe>');
    $("#mapa2").append('<iframe src="Data_Estados/'+id+'/Mapa2/index.html" width="100%" height="100%"></iframe>');
    $("#mapa3").append('<iframe src="Data_Estados/'+id+'/Mapa3/index.html" width="100%" height="100%"></iframe>');
    $("#mapa3").append('<iframe src="Data_Estados/'+id+'/Mapa4/index.html" width="100%" height="100%"></iframe>');
    $("#mapa3").append('<iframe src="Data_Estados/'+id+'/Mapa5/index.html" width="100%" height="100%"></iframe>');
}