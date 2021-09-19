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
    $("#mapa1").append('<iframe src="Data_Estados/' + id + '/Mapa1/index.html"></iframe>');
    $("#img1").append('<img src="Data_Estados/' + id + '/Mapa1/banner (1).jpg" class="mapa__banner">');

    // Se busca el valor del estado para crear la descarga de la imagen
    var sel = document.getElementById("Estado");
    var estado = sel.options[sel.selectedIndex].text;
    document.getElementById("download_mapa_1").innerHTML = "";
    $("#download_mapa_1").append("<a href='../mapas_interactivos/mapas/"+estado+".jpg' download='Superficie Agrícola de Riego estado de "+estado+"' class='btn btn-gob' style='color: white;'><span><i class='fas fa-arrow-down'></i></span> Descargar infografía</a>");
}

function Mapa2() {
    var id = document.getElementById("Estado").value;
    document.getElementById("mapa2").innerHTML = "";
    document.getElementById("img2").innerHTML = "";
    $("#mapa2").append('<iframe src="Data_Estados/' + id + '/Mapa2/index.html"></iframe>');
    $("#img2").append('<img src="Data_Estados/' + id + '/Mapa2/banner (1).jpg" class="mapa__banner">');
    var sel = document.getElementById("Estado");
    var estado = sel.options[sel.selectedIndex].text;
    document.getElementById("download_mapa_2").innerHTML = "";
    $("#download_mapa_2").append("<a href='../mapas_interactivos/mapas/" + estado + "_2.jpg' download='Principales Cultivos Agrícolas de Volumen de Riego estado de " + estado + "' class='btn btn-gob' style='color: white;'><span><i class='fas fa-arrow-down'></i></span> Descargar infografía</a>");
}
function Mapa3() {
    var id = document.getElementById("Estado").value;
    document.getElementById("mapa3").innerHTML = "";
    document.getElementById("img3").innerHTML = "";
    $("#mapa3").append('<iframe src="Data_Estados/' + id + '/Mapa3/index.html"></iframe>');
    $("#img3").append('<img src="Data_Estados/' + id + '/Mapa3/banner (1).jpg" class="mapa__banner">');
    var sel = document.getElementById("Estado");
    var estado = sel.options[sel.selectedIndex].text;
    document.getElementById("download_mapa_3").innerHTML = "";
    $("#download_mapa_3").append("<a href='../mapas_interactivos/mapas/" + estado + "_3.jpg' download='Fuentes de Abastecimiento de Agua de Riego estado de " + estado + "' class='btn btn-gob' style='color: white;'><span><i class='fas fa-arrow-down'></i></span> Descargar infografía</a>");
}
function Mapa4() {
    var id = document.getElementById("Estado").value;
    document.getElementById("mapa4").innerHTML = "";
    document.getElementById("img4").innerHTML = "";
    $("#mapa4").append('<iframe src="Data_Estados/' + id + '/Mapa4/index.html"></iframe>');
    $("#img4").append('<img src="Data_Estados/' + id + '/Mapa4/banner (1).jpg" class="mapa__banner">');
    var sel = document.getElementById("Estado");
    var estado = sel.options[sel.selectedIndex].text;
    document.getElementById("download_mapa_4").innerHTML = "";
    $("#download_mapa_4").append("<a href='../mapas_interactivos/mapas/" + estado + "_4.jpg' download='Tipos de Vegetación estado de " + estado + "' class='btn btn-gob' style='color: white;'><span><i class='fas fa-arrow-down'></i></span> Descargar infografía</a>");
}
function Mapa5() {
    var id = document.getElementById("Estado").value;
    document.getElementById("mapa5").innerHTML = "";
    document.getElementById("img5").innerHTML = "";
    $("#mapa5").append('<iframe src="Data_Estados/' + id + '/Mapa5/index.html"></iframe>');
    $("#img5").append('<img src="Data_Estados/' + id + '/Mapa5/banner (1).jpg" class="mapa__banner">');
    var sel = document.getElementById("Estado");
    var estado = sel.options[sel.selectedIndex].text;
    document.getElementById("download_mapa_5").innerHTML = "";
    $("#download_mapa_5").append("<a href='../mapas_interactivos/mapas/" + estado + "_5.jpg' download='Condigicón de los Suelos estado de " + estado + "' class='btn btn-gob' style='color: white;'><span><i class='fas fa-arrow-down'></i></span> Descargar infografía</a>");
}
