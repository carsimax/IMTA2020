/*Archivo encargado de ocultar y mostrar la animación de cargando durante se ejecuta el AJAX en el proceso de inserción
 *por medio de un archivo de Excel a la base de datos, este archivo se carga en todas las vistas encargadas del proceso de inserción de información por Excel*/
var $loading = $('#cargando').hide();
var $archivo = $("#formUpload").show();
var $continuar = $("#continuar").show();
var $cancelar = $("#cancelar").show();
$(document)
        .ajaxStart(function () {
            $loading.show();
            $archivo.hide();
            $continuar.hide();
            $cancelar.hide();
        })
        .ajaxStop(function () {
            $loading.hide();
            $archivo.show();
            $continuar.show();
            $cancelar.show();
        });