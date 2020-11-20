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
    Swal.fire({
        title: "Por favor espere", // add html attribute if you want or remove
        html: "Cargando modulo",
        allowEscapeKey: false,
    allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    await $("#pantalla").hide();
    await $("#botonMapa").hide();
    await $("#divPrioridad").hide();
    await $("#referencias").hide();
    /**
     * @type {jQuery}
     * Cargamo la tabla por defecto
     */
    crearMapa();
    await $("#divFiltro").load("estacion(municipio)/estacion(municipio).php");
    await Swal.close();
});

//Tabla Presas
table = $("#tablaPresa").DataTable({
    columnDefs: [{ className: 'dt-body-right', targets: [5] }],
    dom: "Bfrtip",
    columns: [
        {
            title: "Volumen"
        }
    ],
    language: {
        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
    }
});

//Cambia los divs entre el principal y el mapa
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

  //Carga los shapes al mapa
async function loadShape() {
    Swal.fire({
        title: "Por favor espere",
        html: "Cargando Mapa Geoespacial",
        allowEscapeKey: false,
    allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
    
    getOC_SIG(function () {
        getEst_SIG(function () {
            getMuni_SIG(function () { 
                getEstacionesSIG(function () {
                    var overlays = {
                        "Organismos de Cuenca": GroupoOCSelect,
                        "Estados": GroupoEstSelect,
                        "Municipios": GroupoMunSelect,
                        "Estaciones Climatológicas": GrupoEstClimaSelect,
                    }
                    var lc = L.control.layers(null, overlays);
                    lc.addTo(map);
                    Swal.close();
                });
            });
        });
    });
}
