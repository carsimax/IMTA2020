
/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */

/* global tablaOC, tablaEst, tablaAcu, tablaMun, map */
citas = "";

$(document).ready(async function () {
  /**
   * @type {jQuery}
   * Cargamo la tabla por defecto
   */
  $("#pantalla").hide();
  $("#pantalla2").hide();
  $("#divPrioridad").hide();
  $("#botonMapa").hide();
  $("#download_shapefile").hide();
  crearMapa();
});
/**
 * Esta función esta al pendiente de los cambios que se
 * presenten en el select de los filtro de búsqueda de los acuiferos
 */
$(document).on("change", "input[type=radio]", async function () {
  Swal.fire({
    title: "Por favor espere", // add html attribute if you want or remove
    html: "Cargando modulo",
    allowEscapeKey: false,
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
  var filtro = $('[name="filtro"]:checked').val();
  /**
   * Se remueve el mapa, para así evitar datos basura de mapas anteriores.
   */
  await map.off();
  await map.remove();
  /**
   * Se limpia la seccion de los filtros
   * @type {string}
   */
  document.getElementById("divFiltro").innerHTML = "";
  document.getElementById("tablaDesglose").innerHTML = "";
  document.getElementById("lista").innerHTML = "";
  /**
   * Se eilimina el div tabla
   */
  $("#tabla").remove();
  /**
   * Se carga la sección de código HTML correspondiente al filtro seleccionado.
   */
  await $("#divFiltro").load(filtro.toLowerCase() + "/" + filtro.toLowerCase() + ".php");
  await $("#tablaDesglose").load(filtro.toLowerCase() + "/" + filtro.toLowerCase() + "t.php");
  /**
   * Se crea nuevamente el mapa
   */
  crearMapa();
  await $("#botonMapa").hide();
  await $("#pantalla").hide();
  await $("#pantalla2").hide();
  await $("#divPrioridad").hide();
  await $("#download_shapefile").hide();
  await Swal.close();
});
/**
 * Funcion que puede pausar la ejecucion de las lineas de codigo
 * @param ms
 * @returns {Promise<unknown>}
 */
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Funcion que deshabilita las funciones de busqueda
 */
async function deshabilitar() {
  $("#consultar").prop("disabled", true);
  $("#pantalla").hide();
  $("#botonMapa").hide();
  $("#download_shapefile").hide();
}

/**
 * Funciones que habilitan las unfiones de busqueda
 */
async function habilitar() {
  $("#consultar").prop("disabled", false);
  $("#pantalla").show();
  $("#pantalla2").show();
  $("#divPrioridad").show();
  $("#botonMapa").show();
}

/**
 * Funcion que concatena la cadena de los acuiferos seleccionadoss
 * @returns {Promise<string>}
 */
async function concatOrganismo() {
  var query = "";
  /**
   * Se tiene que recorrer el select de organismos de cuenca para encontrar todos los elementos seleccionados.
   */
  $("#Organismos option:selected").each(function () {
    query += "organismo_id=" + $(this).val() + " or ";
  });
  /**
   * Al final el query quedara con un or al final, la siguiente línea quita ese or sobrante.
   * @type {string}
   */
  query = query.slice(0, -3);
  return query;
}

/**
 * Funcion que concatena los estados seleccionados del select
 * @returns {Promise<string>}
 */
async function concatEstado() {
  var query = "";
  /**
   * Se tiene que recorrer el select de organismos de cuenca para encontrar todos los elementos seleccionados.
   */
  $("#Estados option:selected").each(function () {
    query += "estado_id=" + $(this).val() + " or ";
  });
  /**
   * Al final el query quedara con un or al final, la siguiente línea quita ese or sobrante.
   * @type {string}
   */
  query = query.slice(0, -3);
  return query;
}

/**
 * Funcion que concatena los municipios seleccionados del select
 * @returns {Promise<string>}
 */
async function concatMunicipio() {
  var query = "";
  /**
   * Se tiene que recorrer el select de organismos de cuenca para encontrar todos los elementos seleccionados.
   */
  $("#Municipios option:selected").each(function () {
    query += "municipio_id=" + $(this).val() + " or ";
  });
  /**
   * Al final el query quedara con un or al final, la siguiente línea quita ese or sobrante.
   * @type {string}
   */
  query = query.slice(0, -3);
  return query;
}

/**
 *
 * @returns {String|obtenerOrganismo.OC}
 * Funcion pra cpncatenar los OC
 */
async function obtenerOrganismo() {
  var OC = "";
  $("#Organismos option:selected")
    .each(function () {
      OC += "id_organismo=" + $(this).val() + " or ";
    })
    .promise()
    .always(async function () {
      OC = OC.slice(0, -3);
    });
  return OC;
}

/**
 *
 * @returns {String|obtenerEstado.Est}
 * Funcion para concatenar los estados
 */
async function obtenerEstado() {
  var Est = "";
  $("#Estados option:selected")
    .each(async function () {
      Est += "id_estado=" + $(this).val() + " or ";
    })
    .promise()
    .always(async function () {
      Est = Est.slice(0, -3);
    });
  return Est;
}
/**
 *
 * @returns {String|obtenerAcuifero.Acu}
 * Funcion para concatenar los acuiferos
 */
async function obtenerAcuifero() {
  var Acu = "";
  $("#Acuiferos option:selected")
    .each(function () {
      Acu += "id_acuifero=" + $(this).val() + " or ";
    })
    .promise()
    .always(async function () {
      Acu = Acu.slice(0, -3);
    });
  return Acu;
}
/**
 *
 * @returns {obtenerMunicipio.Mun|String}
 * Funcion para concatenart los Municipíos
 */
async function obtenerMunicipio() {
  var Mun = "";
  $("#Municipios option:selected")
    .each(function () {
      Mun += "id_municipio=" + $(this).val() + " or ";
    })
    .promise()
    .always(async function () {
      Mun = Mun.slice(0, -3);
    });
  return Mun;
}

/**
 * Esta función controla todos los cambios del select de organismos de cuenca.
 * La función básicamente lo que realiza es leer todas las opciones seleccionadas desde la vista,
 * limpia las capas del mapa, limpia los select que dependen de él, prepara una sentencia MySQL y
 * retorna en este caso los estados que dependen de un organismo de cuenta además de los shapes de los organismos.
 * @constructor
 */
async function Organismos() {

  // });

  await limpiarOrganismos();
  const query = await concatOrganismo();
  if (query !== "") {
    const cadena = "query=" + query + "&Accion=Estados";
    var data = [];
    /**
     * Se manda a llamar por medio de Ajax a la función de estados en el controlador de mapa
     */
    $.ajax({
      type: "POST",
      url: "/aplicacion/controlador/mapa.php",
      data: cadena,
      /**
       * @param resp
       * Si el controlador devuelve la consulta se procederá con el proceso de interpretación de los datos
       */
      success: function (resp) {
        /**
         * Primero se recorre el array con todos los estados devueltos por el controlador.
         */
        $.each(JSON.parse(resp), function (index, item) {
          /**
           * Por medio del plugin de multiselect, podemos agregar los objetos del array al select de estados
           */
          data.push({
            name: item.estado,
            value: item.id_estado,
            checked: false,
          });
        });
        $("#Estados").multiselect("loadOptions", data);
      },
    }).always(function () {
      Swal.close();
    });
  } else {
    Swal.close();
  }
}

/**
 * Funcion para guardar la consulta en el historial
 * @returns {Promise<void>}
 * @constructor
 */
async function Historial() {
  /**
   * Se crea la variable para mandar a guardar en el historial
   */
  var cadena = "Modulo=Acuíferos" + "&Accion=Historial";
  /**
   * Se manda todo por medio de ajax
   */
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/mapa.php",
    data: cadena,
    //Si el controlador devuelve una respuesta
    success: function (resp) {
      /**
       *
       * @returns {undefined}
       * Si se inserto en la bd se retorna true
       */
      return true;
    },
  });
}

async function mostrarDOrganismo(data) {
  tablaOC = $("#OC").DataTable({
    "order": [[1, "asc"]],
    data: data,
    columnDefs: [
      { className: 'dt-body-right', targets: [2, 3, 4, 5, 6, 7, 8] },
      {
        targets: 0,
        data: null,
        defaultContent:
          '<button data-toggle="modal" data-target="#graficaModal" class="btn btn-gob btn-fill  btn-block"><i class="far fa-chart-bar"></i></button>',
      },
    ],
    dom: "Bfrtip",
    columns: [
      {
        title: "Gráfica",
      },
      {
        title: "Organismo de Cuenca",
      },
      {
        title: "R (hm³)",
      },
      {
        title: "DNC (hm³)",
      },
      {
        title: "VCAS (hm³)",
      },
      {
        title: "VEALA (hm³)",
      },
      {
        title: "VAPTYR (hm³)",
      },
      {
        title: "VAPRH (hm³)",
      },
      {
        title: "DMA (hm³)",
      },
    ],
    buttons: [
      {
        extend: "excelHtml5",
        title: "Disponibilidad de acuíferos por Organismo de cuenca ",
        className: estiloboton,
        text: "Exportar Excel",
        exportOptions: {
          columns: [1, 2, 3, 4, 5, 6, 7, 8],
        },
      },
      {
        extend: "pdfHtml5",
        title: "Consulta acuíferos por Organismo de cuenca",
        className: estiloboton,
        text: "Exportar PDF",
        messageBottom: citas,
        orientation: "portrait",
        pageSize: "A4",
        exportOptions: {
          columns: [1, 2, 3, 4, 5, 6, 7, 8],
        },
        customize: function (doc) {
          //Remove the title created by datatTables
          doc.content.splice(0, 1);
          //Create a date string that we use in the footer. Format is dd-mm-yyyy
          var now = new Date();
          var jsDate =
            now.getDate() +
            "-" +
            (now.getMonth() + 1) +
            "-" +
            now.getFullYear();
          // It's important to create enough space at the top for a header !!!
          doc.pageMargins = [20, 70, 20, 50];
          // Set the font size fot the entire document
          doc.defaultStyle.fontSize = 10;
          // Set the fontsize for the table header
          doc.styles.tableHeader.fontSize = 10;
          doc["header"] = function () {
            return {
              columns: [
                {
                  image: logo,
                  width: 200,
                },
                {
                  alignment: "left",
                  //italics: true,
                  text: "Disponibilidad de acuíferos por Organismo de cuenca",
                  fontSize: 12.5,
                  margin: [10, 5],
                },
                {
                  alignment: "right",
                  fontSize: 10,
                  text: jsDate.toString(),
                },
              ],
              margin: 20,
            };
          };
          doc["footer"] = function (page, pages) {
            return {
              columns: [
                {
                  // This is the right column
                  alignment: "center",
                  text: [
                    "Página ",
                    { text: page.toString() },
                    " de ",
                    { text: pages.toString() },
                  ],
                },
              ],
              margin: [50, 0],
            };
          };
          var objLayout = {};
          objLayout["hLineWidth"] = function (i) {
            return 0.5;
          };
          objLayout["vLineWidth"] = function (i) {
            return 0.5;
          };
          objLayout["hLineColor"] = function (i) {
            return "#aaaaaa";
          };
          objLayout["vLineColor"] = function (i) {
            return "#aaaaaa";
          };
          objLayout["paddingLeft"] = function (i) {
            return 4;
          };
          objLayout["paddingRight"] = function (i) {
            return 4;
          };
          doc.content[0].layout = objLayout;
        },
      },
    ],
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
      decimal: ".",
      thousands: ",",
    },
  });
}

async function Acuiferos() {
  alertaCargando("Por favor espere", "Cargando selección");
  await Swal.close();
}


async function cargarMapa() {
  var x = $('#Prioridad').prop('checked');
  if (x == true) {
    document.getElementById("download_shapefile").style.display = "block";
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

$('#Prioridad').change(async function () {
var x = $(this).prop('checked');

  if (x) {
    //El mapa del modal al auxiliar
    document.getElementById("download_shapefile").style.display = "none";
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
    document.getElementById("download_shapefile").style.display = "block";
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
