/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */
citas = "";
$(document).ready(async function () {
    await $("#pantalla").hide();
    await $("#pantalla2").hide();
    await $("#divPrioridad").hide();
    await $("#botonMapa").hide();
    crearMapa();
    await $("#divFiltro").load("presa(estado)/presa(estado).php");
    await Swal.close();
});

//Tabla Presas
table = $("#tablaPresa").DataTable({
    columnDefs: [
        { className: 'dt-body-right', targets: [3, 4, 5] },
        {
            targets: 0,
            data: null,
            defaultContent:
                '<button class="btn btn-gob text-ligth  btn-block"><i class="fas fa-water"></i></button>',
        },
    ],
    dom: "Bfrtip",
    columns: [
        {
            title: "Ver detalle",
        },
        {
            title: "Nombre Oficial",
        },
        {
            title: "Corriente",
        },
        {
            title: "Altura de la cortina (m)"
        },
        {
            title: "Capacidad al NAME (hm³)",
        },
        {
            title: "Capacidad al NAMO (hm³)",
        },
        {
            title: "Estado",
        },
        {
            title: "Año Termino",
        },
    ],
    buttons: botonPresa,
    language: {
        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
    }
});

//Tabla para Presa Volumen
tableV = $("#tablaVolumen").DataTable({
    columnDefs: [
        { className: 'dt-body-right', targets: [1, 2] },

    ],
    dom: "Bfrtip",
    columns: [
        {
            title: "Vol. de almacenamiento (hm³)"
        },
        {
            title: "Año"
        }
    ],
    buttons: botonDetallePresa,
    language: {
        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
    },
});

/**
 * Esta función esta al pendiente de los cambios que se
 * presenten en el select de los filtro de búsqueda de los acuiferos
 */
function cambio() {
    $val = $("#filtro").val();
    if ($val === "0") {
        document.getElementById("divFiltro").innerHTML = "";
        $("#referencias").hide();
        document.getElementById("lista").innerHTML = "";
    }
    map.off();
    map.remove();
    document.getElementById("divFiltro").innerHTML = "";
    $("#referencias").hide();
    document.getElementById("lista").innerHTML = "";
    $("#divFiltro").load($val + "/" + $val + ".php");
    crearMapa();
}

//Funcion que llena la tabla de presa volumen
$("#tablaPresa").on("click", "button", async function () {
    alertaCargando("Por favor espere", "Cargando contenido");
    document.getElementById("divVolumen").scrollIntoView();
    var data = table.row($(this).parents("tr")).data();
    var id = data[0];
    cadena = "id=" + id + "&Accion=PresaVolumen";
    data = [];
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/mapa.php",
        data: cadena,
        success: function (resp) {
            $.each(JSON.parse(resp), function (index, item) {
                document.getElementById("tituloV").innerHTML = "";
                document.getElementById("tituloV").innerHTML =
                    "<h3 class='panel-title'>Presa: " +
                    item.presa_id +
                    " - " +
                    item.nom_oficial +
                    "</h3>";
                data.push([
                    item.presa_id + " - " + item.nom_oficial,
                    numeral(Number.parseFloat(item.vol_alma)).format("0,0.00"),
                    item.anio,
                ]);
            });
            tableV.destroy();
            tableV = $("#tablaVolumen").DataTable({
                data: data,
                columnDefs: [
                    { className: 'dt-body-right', targets: [1, 2] },
                ],
                dom: "Bfrtip",
                columns: [
                    {
                        title: "Presa"
                    }
                    ,
                    {
                        title: "Vol. de almacenamiento (hm³)"
                    },
                    {
                        title: "Año"
                    }
                ],
                buttons: botonDetallePresa,
                language: {
                    url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
                },
            });
        }
    }).always(function () {
        Swal.close();
    });
});

$("#tablaVolumen").on("click", "button", function () {
    var data = tableV.row($(this).parents("tr")).data();
    graficarPresa(data[0]);
});

$('#Prioridad').change(async function () {
    var x = $(this).prop('checked');
    if (x) {
        //El mapa del modal al auxiliar
        $('#map').detach().appendTo('#SeccionModal');
        $('#tabla').detach().appendTo('#pantalla');
        //Cambiamos el titulo del modal
        document.getElementById("exampleModalLabel").innerHTML = "";
        $("#exampleModalLabel").append('Mapa Geoespacial');
        document.getElementById("botonMapa").innerHTML = "";
        $("#botonMapa").append('<i class="fa fa-map my-float"></i><b> Ver Mapa</b>');
    } else {
        //El mapa del modal al auxiliar
        $('#map').detach().appendTo('#pantalla');
        $('#tabla').detach().appendTo('#SeccionModal');
        //Recargamos el mapa
        var callBack = async function () {
            document.getElementById("map").style.display = "block";
            setTimeout(function () {
                map.invalidateSize();
            }, 100);
        };
        map.whenReady(callBack);
        //Cambiamos el titulo del modal
        document.getElementById("exampleModalLabel").innerHTML = "";
        $("#exampleModalLabel").append('Información Tabular');
        document.getElementById("botonMapa").innerHTML = "";
        $("#botonMapa").append('<i class="fa fa-table my-float"></i><b> Ver Tablas</b>');
        if (!map.hasLayer(OCSelect)) {
            await loadShape();
        }
    }
});

async function cargarMapa() {
    var x = $('#Prioridad').prop('checked');
    if (x == true) {
        if (!map.hasLayer(OCSelect)) {
            await loadShape();
            var callBack = async function () {
                document.getElementById("exampleModal").style.display = "block";
                setTimeout(function () {
                    map.invalidateSize();
                }, 100);
            };
            map.whenReady(callBack);
        }
    }
}