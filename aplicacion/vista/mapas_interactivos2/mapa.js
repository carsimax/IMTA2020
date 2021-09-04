/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */

function CambiarMapa() {
    $('#myTab a[href="#tab1"]').tab("show");
    var id = document.getElementById("Estado").value;
    document.getElementById("mapa1").innerHTML = "";
    document.getElementById("img1").innerHTML = "";
    $("#mapa1").append('<iframe src="Data_Estados/' + id + '/Mapa1/index.html" width="100%" height="100%"></iframe>');
    $("#img1").append('<img src="Data_Estados/' + id + '/Mapa1/banner (1).jpg" class="mapa__banner">');
}

function Mapa2() {
    var id = document.getElementById("Estado").value;
    document.getElementById("mapa2").innerHTML = "";
    document.getElementById("img2").innerHTML = "";
    $("#mapa2").append('<iframe src="Data_Estados/' + id + '/Mapa2/index.html" width="100%" height="100%"></iframe>');
    $("#img2").append('<img src="Data_Estados/' + id + '/Mapa2/banner (1).jpg" class="mapa__banner">');

}
function Mapa3() {
    var id = document.getElementById("Estado").value;
    document.getElementById("mapa3").innerHTML = "";
    document.getElementById("img3").innerHTML = "";
    $("#mapa3").append('<iframe src="Data_Estados/' + id + '/Mapa3/index.html" width="100%" height="100%"></iframe>');
    $("#img3").append('<img src="Data_Estados/' + id + '/Mapa3/banner (1).jpg" class="mapa__banner">');
}
function Mapa4() {
    var id = document.getElementById("Estado").value;
    document.getElementById("mapa4").innerHTML = "";
    document.getElementById("img4").innerHTML = "";
    $("#mapa4").append('<iframe src="Data_Estados/' + id + '/Mapa4/index.html" width="100%" height="100%"></iframe>');
    $("#img4").append('<img src="Data_Estados/' + id + '/Mapa4/banner (1).jpg" class="mapa__banner">');
}
function Mapa5() {
    var id = document.getElementById("Estado").value;
    document.getElementById("mapa5").innerHTML = "";
    document.getElementById("img5").innerHTML = "";
    $("#mapa5").append('<iframe src="Data_Estados/' + id + '/Mapa5/index.html" width="100%" height="100%"></iframe>');
    $("#img5").append('<img src="Data_Estados/' + id + '/Mapa5/banner (1).jpg" class="mapa__banner">');
}
