/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */

function CambiarMapa() {
    var id = document.getElementById("Estado").value;
    document.getElementById("mapa1").innerHTML = "";
    document.getElementById("mapa2").innerHTML = "";
    document.getElementById("mapa3").innerHTML = "";
    document.getElementById("mapa4").innerHTML = "";
    document.getElementById("mapa5").innerHTML = "";
    document.getElementById("mapa5").innerHTML = "";
    document.getElementById("banner1").innerHTML = "";
    document.getElementById("banner2").innerHTML = "";
    document.getElementById("banner3").innerHTML = "";
    document.getElementById("banner4").innerHTML = "";
    document.getElementById("banner5").innerHTML = "";

    $("#mapa1").append('<iframe src="Data_Estados/' + id + '/Mapa1/index.html" width="100%" height="100%"></iframe>');
    $("#mapa2").append('<iframe src="Data_Estados/' + id + '/Mapa2/index.html" width="100%" height="100%"></iframe>');
    $("#mapa3").append('<iframe src="Data_Estados/' + id + '/Mapa3/index.html" width="100%" height="100%"></iframe>');
    $("#mapa4").append('<iframe src="Data_Estados/' + id + '/Mapa4/index.html" width="100%" height="100%"></iframe>');
    $("#mapa5").append('<iframe src="Data_Estados/' + id + '/Mapa5/index.html" width="100%" height="100%"></iframe>');

    // <img src="./Data_Estados/1/Mapa1/banner.jpg" class="mapa__banner" id="banner1">
    $("#banner1").append('<img src="./Data_Estados/' + id + '/Mapa1/banner.jpg" class="mapa__banner">');
    $("#banner2").append('<img src="./Data_Estados/' + id + '/Mapa2/banner.jpg" class="mapa__banner">');
    $("#banner3").append('<img src="./Data_Estados/' + id + '/Mapa3/banner.jpg" class="mapa__banner">');
    $("#banner4").append('<img src="./Data_Estados/' + id + '/Mapa4/banner.jpg" class="mapa__banner">');
    $("#banner5").append('<img src="./Data_Estados/' + id + '/Mapa5/banner.jpg" class="mapa__banner">');
}