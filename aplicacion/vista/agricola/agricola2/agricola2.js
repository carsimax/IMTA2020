/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 *
 * Este script es el encargado de realizar y mostrar toda la información relacionada con
 * la consulta de la estadística agrícola, Informe estadístico de superficies regadas y volúmenes de agua
 * d i s t r i b u i d o s e n l o s distritos de riego
 *
 */

$("#map").show();

// Se aplica el estilo a los selects
setEstiloSelect('#Organismos', 'Organismos de Cuenca', 'Buscar Organismos de Cuenca');
setEstiloSelect('#Estados', 'Estados', 'Buscar Estado');
setEstiloSelect('#Tenencias', 'Tenencias', 'Buscar Modalidad');
setEstiloSelect('#Fuentes', 'Fuentes', 'Buscar Cultivo');
setEstiloSelect('#Distritos', 'Distritos de Riego', 'Buscar Distrito');


async function Anios() {
  $('#Anios').addClass('green');
  limpiarAnios();
  var query = '(';
  $("#Anios option:selected").each(function () { query += "anio_id=" + $(this).val() + " or "; });
  query = query.slice(0, -4) + ')';
  if (query !== "") {
    /**
     * controlador
     * @type {string}
     */
    const cadena = "query=" + query + "&Accion=getOrganismos2";
    var data = [];
    $.ajax({
      type: "POST",
      url: "/aplicacion/controlador/distritoriego.php",
      data: cadena,
      /**
       * @param resp
       * Si el controlador devuelve la consulta se procederá con el proceso de interpretación de los datos
       */
      success: function (resp) {
        $.each(JSON.parse(resp), function (index, item) {
          /**
           * Por medio del plugin de multiselect, podemos agregar los objetos del array al select de estados
           */
          data.push({
            name: item.numero + '. ' + item.organismo,
            value: item.id_organismo,
            checked: false,
          });
        });
        $("#Organismos").multiselect("loadOptions", data);
      }
    }).always(function () {
      Swal.close();
    });
  } else {
    Swal.close();
  }
}

/**
 *
 * @constructor
 * * Esta función controla todos los cambios del select de organismos de cuenca.
 * La función básicamente lo que realiza es leer todas las opciones seleccionadas desde la vista,
 * limpia las capas del mapa, limpia los select que dependen de él, prepara una sentencia MySQL y
 * retorna en este caso los estados que dependen de un organismo de cuenta además de los shapes de los organismos.
 *
 */
async function Organismos() {


  await limpiarOrganismos();
  var query = "(";
  /**
   * Se tiene que recorrer el select de organismos de cuenca para encontrar todos los elementos seleccionados.
   */
  $("#Anios option:selected").each(function () {
    query += "anio_id=" + $(this).val() + " or ";
  });
  query = query.slice(0, -4) + ') AND (';
  if ($("#Organismos option:selected").length != 0) {
    $("#Organismos option:selected").each(function () {
      query += "id_organismo=" + $(this).val() + " or ";
    });
    query = query.slice(0, -4) + ')';
    /**
     * Antes de realizar la consulta a la base de datos,
     * es necesario verificar primero si el query contiene datos a buscar.
     */
    if (query !== "") {
      /**
       * @type {string}
       * Se crea una cadena que es la que se va a enviar por medio de Ajax,
       * este contiene tanto el query anteriormente descrito como la acción que va realizar en el controlador de mapa
       */
      const cadena = "query=" + query + "&Accion=getEstados2";

      var data = [];
      /**
       * Se manda a llamar por medio de Ajax a la función de estados en el controlador de mapa
       */
      $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/distritoriego.php",
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
  } else {
    Swal.close();
  }
}

/**
 *
 * @constructor
 *  Esta función controla todos los cambios del select de estados.
 * La función básicamente lo que realiza es leer todas las opciones seleccionadas desde la vista,
 * limpia las capas del mapa, limpia los select que dependen de él, prepara una sentencia MySQL y
 * retorna en este caso los Distritos que dependen de un organismo de cuenta además de los shapes de los organismos.
 *
 */
async function Estados() {
  await limpiarEstados();
}

async function Fuentes() {
  $("#Distritos").multiselect("reset");
  if ($("#Organismos option:selected").length != 0 &&
    $("#Estados option:selected").length != 0 &&
    $("#Tenencias option:selected").length != 0 &&
    $("#Fuentes option:selected").length != 0) {
    var query = "(";
    /**
     * Se tiene que recorrer el select de organismos de cuenca para encontrar todos los elementos seleccionados.
     */
    $("#Anios option:selected").each(function () {
      query += "anio_id=" + $(this).val() + " or ";
    });
    query = query.slice(0, -4) + ') AND (';
    $("#Organismos option:selected").each(function () {
      query += "id_organismo=" + $(this).val() + " or ";
    });
    query = query.slice(0, -4) + ') AND (';
    $("#Estados option:selected").each(function () {
      query += "id_estado=" + $(this).val() + " or ";
    });
    query = query.slice(0, -4) + ') AND (';
    $("#Tenencias option:selected").each(function () {
      query += 'tenencia_id=' + $(this).val() + ' or ';
    });
    query = query.slice(0, -4) + ') AND (';
    $("#Fuentes option:selected").each(function () {
      query += "fuente_id=" + $(this).val() + " or ";
    });
    query = query.slice(0, -4) + ')';
    const cadena = "query=" + query + "&Accion=getDRProduccion2";
    var data = [];
    $.ajax({
      type: "POST",
      url: "/aplicacion/controlador/distritoriego.php",
      data: cadena,
      /**
       * @param resp
       * Si el controlador devuelve la consulta se procederá con el proceso de interpretación de los datos
       */
      success: function (resp) {
        $.each(JSON.parse(resp), function (index, item) {
          /**
           * Por medio del plugin de multiselect, podemos agregar los objetos del array al select de Distritos
           */
          data.push({
            name: item.id_distrito_riego + " - " + item.nom_dr,
            value: item.id_distrito_riego,
            checked: false,
          });
        });
        $("#Distritos").multiselect("loadOptions", data);
      }
    }).always(function () {
      Swal.close();
    });
  } else {
    Swal.close();
  }
}


async function Distritos() {
  isFormCompleted('#Distritos');
}

/**
 * Funcion para realizar la consulta de las selecicones con sus respectivos shapes
 * @returns {Promise<void>}
 * @constructor
 */
async function Consultar() {
  Swal.fire({
    title: "Por favor espere", // add html attribute if you want or remove
    html: "Realizando la consulta",
    allowEscapeKey: false,
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
  $('#nav-tab-acu a[href="#nav-03"]').tab("show");
  /**
   * Llmamos a deshabilitar y a limpiar los Distritos
   */
  await deshabilitar();
  await limpiarDR();
  const OC = await selectOrganismo();
  const Est = await selectEst();
  const DR = await selectDR();
  const Anio = await selectAnio();
  const Tenencia = await selectTenencia();
  const Fuente = await selectFuente();
  /**
   * Se verifica que el query de Organismos ese vacio
   */
  if (DR !== "" && Anio !== "" && Tenencia !== "" && Fuente !== "") {
    //Se construye las referencias 
    data = "Accion=ConsultaAgricola&modulo_id=3&anios=" + Anio;
    citas = construirReferencias(data, true);

    var query = '(' + OC + ') AND (' + Est + ') AND (' + DR + ') AND (' + Anio + ') AND (' + Tenencia + ') AND (' + Fuente + ') GROUP by distrito_riego_id,id_tenencia,fuente_id,anio_id ORDER BY fuente DESC,id_tenencia';
    /**
     * Funcion para el desgloce 1
     */
    await desgloce1(query);
    //Verifica si el mapa es prioridad
    var x = $('#Prioridad').prop('checked');
    if (x == false) {
      if (!map.hasLayer(OCSelect)) {
        //Recargamos el mapa
        var callBack = async function () {
          document.getElementById("map").style.display = "block";
          setTimeout(function () {
            map.invalidateSize();
          }, 100);
        };
        map.whenReady(callBack);
        await loadShape();
      }
    }
    /**
     * Obtenemos las graficas
     */
    query = '(' + OC + ') AND (' + Est + ') AND (' + DR + ') AND (' + Anio + ') AND (' + Tenencia + ') AND (' + Fuente + ')GROUP by fuente_id';
    /**
     *
     * @returns {Promise<void>}
     * Funcion que muestra las graficas
     */
    await grafica7(query);
    query = '(' + OC + ') AND (' + Est + ') AND (' + DR + ') AND (' + Anio + ') AND (' + Tenencia + ') AND (' + Fuente + ') GROUP BY id_organismo';
    await desgloce3(query);
    query = '(' + OC + ') AND (' + Est + ') AND (' + DR + ') AND (' + Anio + ') AND (' + Tenencia + ') AND (' + Fuente + ') GROUP BY id_estado';
    await desgloce4(query);
    await habilitar();
    await Historial();
    $("#referencias").show();
  } else {
    swal(
      "Algo está mal.",
      "Todos los filtros tienen que tener al menos un elemento seleccionado"
    );
    await habilitar();
    $("#pantalla").hide();
    $("#divPrioridad").hide();
    $("#referencias").hide();
    $("#botonMapa").hide();
    await Swal.close();
  }
}

/**
 * Funcion para guardar la consulta en el historial
 * @returns {Promise<void>}
 * @constructor
 */
async function Historial() {
  //Guardamos en es historial
  cadena = "Modulo=Estadística Agrícola" + "&Accion=Historial";
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/mapa.php",
    data: cadena,
    //Si el controlador devuelve una respuesta
    success: function (resp) {
      return true;
    },
  });
}



async function limpiarAnios() {
  $("#Organismos").multiselect("reset");
  await limpiarOrganismos();
}


//Funcion que limpia la capa de organimos asi como de las capas que dependen directamente de ellas
async function limpiarOrganismos() {
  $("#Estados").multiselect("reset");
  await limpiarEstados();
}

/**
 * Funcion para limpiar la capa de estados
 */
async function limpiarEstados() {
  $("#Distritos").multiselect("reset");
  await limpiarDR();
  $("#Tenencias").multiselect("reset2");
  $("#Fuentes").multiselect("reset2");
}

/**
 * Funcion para limpiar la capa de Distritos
 */
async function limpiarDR() {
  map.off();
  map.remove();
  crearMapa();
  document.getElementById("nav-01").innerHTML = "";
  document.getElementById("nav-02").innerHTML = "";
  $("#pantalla").hide();
  $("#referencias").hide();
  $("#botonMapa").hide();
}

/**
 * Funcion que hace que la funciones se pausen durante un tiempo determindo
 * @param ms
 * @returns {Promise<unknown>}
 */
/**
 * Funcion que concatena la cadena de los Distritos seleccionadoss
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
 *
 * Funcion que carga los shape de los estados
 * @returns {Promise<string>}
 *
 */
async function selectOrganismo() {
  var OC = "";
  $("#Organismos option:selected")
    .each(async function () {
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
 * Funcion que carga los shape de los estados
 * @returns {Promise<string>}
 *
 */
async function selectEst() {
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
 * @returns {String|selectDR.DR}
 * Funcion que obtiene los Distritos de riego seleccionados
 *
 */
async function selectDR() {
  var DR = "";
  $("#Distritos option:selected")
    .each(async function () {
      DR += 'distrito_riego_id="' + $(this).val() + '" or ';
    })
    .promise()
    .always(async function () {
      DR = DR.slice(0, -3);
    });
  return DR;
}

/**
 *
 * @returns {selectAnio.Anio|String}
 * Funcione que obtiene los anios Seleccionados
 */
async function selectAnio() {
  var Anio = "";
  $("#Anios option:selected")
    .each(async function () {
      Anio += "anio_id=" + $(this).val() + " or ";
    })
    .promise()
    .always(async function () {
      Anio = Anio.slice(0, -3);
    });
  return Anio;
}
/**
 *
 * @returns {selectTenencia.Tenencias|String}
 * Funcion que obtiene las tenencias seleccionadas
 */
async function selectTenencia() {
  var Tenencias = "";
  $("#Tenencias option:selected")
    .each(async function () {
      Tenencias += "tenencia_id=" + $(this).val() + " or ";
    })
    .promise()
    .always(async function () {
      Tenencias = Tenencias.slice(0, -3);
    });
  return Tenencias;
}

/**
 *
 * @returns {String|selectFuente.Fuentes}
 * Funcion que obtiene las fuentes seleccionadas
 */
async function selectFuente() {
  var Fuentes = "";
  $("#Fuentes option:selected")
    .each(async function () {
      Fuentes += "fuente_id=" + $(this).val() + " or ";
    })
    .promise()
    .always(async function () {
      Fuentes = Fuentes.slice(0, -3);
    });
  return Fuentes;
}

async function desgloce3(query) {
  var Anio = $("#Anios :selected").text();
  var cadena = "query=" + query + "&Accion=DistritosVol";
  document.getElementById("nav-03").innerHTML = "";
  $("#nav-03").append(
    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Concentrado hidrométrico por organismo de cuenca, año agrícola: ' + Anio + '</h3></div>'
  );
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/mapa.php",
    data: cadena,
    /**
     *
     * @param {type} resp2
     * @returns {undefined}
     * Si el controlador devuelve una respuesta
     */
    success: async function (resp2) {
      var data = [];
      var USUARIO = 0;
      var REGADA = 0;
      var VOLUMEN = 0;
      var LAMINA = 0;
      $.each(JSON.parse(resp2), function (index, item) {
        data.push([
          item.numero,
          item.organismo,
          numeral(item.usuario_total).format("0,0.00"),
          numeral(Math.round(item.regada_total)).format("0,0.00"),
          numeral(Math.round(item.volumen_total)).format("0,0.00"),
          numeral(Math.round(item.lamina_total)).format("0,0.00"),
        ]);
        USUARIO += parseInt(item.usuario_total);
        REGADA += parseFloat(item.regada_total);
        VOLUMEN += parseFloat(item.volumen_total);

      });
      if (data.length > 0) {
        /**
         * Se inserta la seccion al html
         */
        $("#nav-03").append(
          '<div style="overflow-x:auto;">' +
          '<table id="T3" class="table table-bordered  nowrap" style="width:100%">' +
          '<tfoot><tr>' +
          /**
           * Se colocan los totales antes obtenidos
           */
          '<td style="background-color:#CCD1D1" align="center"><b>Suma Total:</b></th>' +
          '<td style="background-color:#CCD1D1" align="center"></th>' +
          '<td style="background-color:#CCD1D1" align="right"><b>' + numeral(USUARIO).format("0,0.00") + '</b></td>' +
          '<td style="background-color:#CCD1D1" align="right"><b>' + numeral(Math.round(REGADA)).format("0,0.00") + '</b></td>' +
          '<td style="background-color:#CCD1D1" align="right"><b>' + numeral(Math.round(VOLUMEN)).format("0,0.00") + '</b></td>' +
          '<td style="background-color:#CCD1D1" align="right"><b>' + numeral(Math.round((VOLUMEN / REGADA) * 10)).format("0,0.00") + '</b></td>' +
          '</tr></tfoot></table>' +
          '</div>'
        );
        $("#T3").DataTable({
          /*
           *
           * Se crean las columnas que van a ir en la tabla
           *
           */
          columns: [
            {
              title: "Número",
            },
            {
              title: "Organismo de Cuenca",
            },
            {
              title: "Usuarios (Número)",
            },
            {
              title: "Superficie física regada (ha)",
            },
            {
              title: "Volumen distribuido (miles de m³)",
            },
            {
              title: "Lámina bruta (cm)",
            },
          ],
          columnDefs: [
            { className: 'dt-body-right', targets: [2, 3, 4, 5] },
          ],
          /**
           * Se colocan los datos obenidos
           */
          data: data,
          searching: false,
          paging: false,
          ordering: false,
          /**
           * Se colocan parametros para el comportamiento de la tabla
           */
          language: {
            url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
          },
          dom: "Bfrtip",
          /**
           * Se colocan el boton para exportar la tabla en excel
           */
          buttons: [
            {
              extend: "excelHtml5",
              title:
                "Concentrado hidrométrico por organismo de cuenca",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
            {
              extend: "pdfHtml5",
              title:
                "Concentrado hidrométrico por organismo de cuenca",
              className: "btn btn-gob btn-sm",
              text: "Exportar PDF",
              messageBottom: citas,
              orientation: "landscape",
              pageSize: "A4",
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
                        text:
                          "Concentrado hidrométrico por organismo de cuenca",
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
                          {
                            text: page.toString(),
                          },
                          " de ",
                          {
                            text: pages.toString(),
                          },
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
        });
      }
    }
  });
}


async function desgloce4(query) {
  var Anio = $("#Anios :selected").text();
  var cadena = "query=" + query + "&Accion=DistritosVol";
  document.getElementById("nav-04").innerHTML = "";
  $("#nav-04").append(
    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Concentrado hidrométrico por entidad federativa, año agrícola: ' + Anio + '</h3></div>'
  );
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/mapa.php",
    data: cadena,
    /**
     *
     * @param {type} resp2
     * @returns {undefined}
     * Si el controlador devuelve una respuesta
     */
    success: async function (resp2) {
      var data = [];
      var USUARIO = 0;
      var REGADA = 0;
      var VOLUMEN = 0;
      var LAMINA = 0;
      $.each(JSON.parse(resp2), function (index, item) {
        data.push([
          item.id_estado,
          item.estado,
          numeral(item.usuario_total).format("0,0.00"),
          numeral(Math.round(item.regada_total)).format("0,0.00"),
          numeral(Math.round(item.volumen_total)).format("0,0.00"),
          numeral(Math.round(item.lamina_total)).format("0,0.00"),
        ]);
        USUARIO += parseInt(item.usuario_total);
        REGADA += parseFloat(item.regada_total);
        VOLUMEN += parseFloat(item.volumen_total);

      });
      if (data.length > 0) {
        /**
         * Se inserta la seccion al html
         */
        $("#nav-04").append(
          '<div style="overflow-x:auto;">' +
          '<table id="T4" class="table table-bordered  nowrap" style="width:100%">' +
          '<tfoot><tr>' +
          /**
           * Se colocan los totales antes obtenidos
           */
          '<td style="background-color:#CCD1D1" align="center"><b>Suma Total:</b></th>' +
          '<td style="background-color:#CCD1D1" align="center"></th>' +
          '<td style="background-color:#CCD1D1" align="right"><b>' + numeral(USUARIO).format("0,0.00") + '</b></td>' +
          '<td style="background-color:#CCD1D1" align="right"><b>' + numeral(Math.round(REGADA)).format("0,0.00") + '</b></td>' +
          '<td style="background-color:#CCD1D1" align="right"><b>' + numeral(Math.round(VOLUMEN)).format("0,0.00") + '</b></td>' +
          '<td style="background-color:#CCD1D1" align="right"><b>' + numeral(Math.round((VOLUMEN / REGADA) * 10)).format("0,0.00") + '</b></td>' +
          '</tr></tfoot></table>' +
          '</div>'
        );
        $("#T4").DataTable({
          /*
           *
           * Se crean las columnas que van a ir en la tabla
           *
           */
          columns: [
            {
              title: "Número",
            },
            {
              title: "Estado",
            },
            {
              title: "Usuarios (Número)",
            },
            {
              title: "Superficie física regada (ha)",
            },
            {
              title: "Volumen distribuido (miles de m³)",
            },
            {
              title: "Lámina bruta (cm)",
            },
          ],
          columnDefs: [
            { className: 'dt-body-right', targets: [2, 3, 4, 5] },
          ],
          /**
           * Se colocan los datos obenidos
           */
          data: data,
          searching: false,
          paging: false,
          ordering: false,
          /**
           * Se colocan parametros para el comportamiento de la tabla
           */
          language: {
            url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
          },
          dom: "Bfrtip",
          /**
           * Se colocan el boton para exportar la tabla en excel
           */
          buttons: [
            {
              extend: "excelHtml5",
              title:
                "Concentrado hidrométrico por entidad federativa",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
            {
              extend: "pdfHtml5",
              title:
                "Concentrado hidrométrico por entidad federativa",
              className: "btn btn-gob btn-sm",
              text: "Exportar PDF",
              messageBottom: citas,
              orientation: "landscape",
              pageSize: "A4",
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
                        text:
                          "Concentrado hidrométrico por entidad federativa",
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
                          {
                            text: page.toString(),
                          },
                          " de ",
                          {
                            text: pages.toString(),
                          },
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
        });
      }
    }
  });
}

/**
 *
 * @param {type} query
 * @returns {undefined}
 * Funcion Desgloce por Organismo
 */
async function desgloce1(query) {
  var Anio = $("#Anios :selected").text();
  var cadena = "query=" + query + "&Accion=DistritosVol";
  /*
   * Se limpia el HMTL y se coloca el encabezdado
   */
  $("#nav-02").innerHTML = "";
  $("#nav-02").append(
    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Superficies físicas regadas y volúmenes distribuidos por distrito de riego, año agrícola: ' + Anio + '</h3></div>'
  );
  /*
   * ajax para obtener la consulta
   */
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/mapa.php",
    data: cadena,
    /**
     *
     * @param {type} resp2
     * @returns {undefined}
     * Si el controlador devuelve una respuesta
     */
    success: async function (resp2) {
      /*
       * Se itera sobre los anios seleccionados
       */
      $("#Anios option:selected").each(async function () {
        var anio = $(this).val();
        cadena = "id=" + anio + "&Accion=Anio";
        /*
         * Ajax apara obtener el anio seleccionado
         */
        $.ajax({
          type: "POST",
          url: "/aplicacion/controlador/mapa.php",
          data: cadena,
          /*
           *
           * @param {type} resp
           * @returns {undefined}
           * Si el controlador devuelve una respuesta
           *
           */
          success: async function (resp) {
            /*
             * Se coloca la seccion del anio seleccionado
             */
            $("#nav-02").append(
              '<div class="panel-body" id="body-' + anio + '">' + "</div>"
            );
            /*
             * Se iteran sobre los distritos seleccionado
             */
            $("#Distritos option:selected").each(function () {
              var DR = $(this).val();
              cadena = "id=" + DR + "&Accion=DR";
              /*
               * Ajax que obtiene el distrito de riego
               */
              $.ajax({
                type: "POST",
                url: "/aplicacion/controlador/mapa.php",
                data: cadena,
                /*
                 *
                 * @param {type} respDR
                 * @returns {undefined}
                 * Si el controlador devuelve una respuesta
                 *
                 */
                success: function (respDR) {
                  /*
                   *
                   * @type String
                   * Se crea la variable que obtiene el nombre completo del DR
                   */
                  var DRS = "";
                  $.each(JSON.parse(respDR), function (index, item) {
                    DRS += item.id_distrito_riego + " ";
                    DRS += item.nom_dr + ", ";
                    DRS += item.variable;
                  });
                  /*
                   * Se inserta la tabla por html
                   */
                  $("#body-" + anio + "").append(
                    '<div style="overflow-x:auto;">' +
                    '<table id="T8-' +
                    anio +
                    "-" +
                    DR +
                    '" class="display compact nowrap" style="width:100%" border="1">' +
                    "<thead>" +
                    '<tr><td colspan="13">Concentrado Distrital.</td><td colspan="3" align="right">Año agrícola : ' +
                    (parseInt(JSON.parse(resp)) - 1) +
                    "/" +
                    JSON.parse(resp) +
                    " </td></tr>" +
                    '<tr><td colspan="16" align="right">Distrito de Riego: ' +
                    DRS +
                    " </td></tr>" +
                    "<tr>" +
                    '<td style="background-color:#CCD1D1" rowspan="2"></td>' +
                    '<td style="background-color:#CCD1D1" colspan="3" align="center"><b>Gravedad Presas</b></td>' +
                    '<td style="background-color:#CCD1D1" colspan="3" align="center"><b>Gravedad Derivación</b></td>' +
                    '<td style="background-color:#CCD1D1" colspan="3" align="center"><b>Bombeo Corrientes</b></td>' +
                    '<td style="background-color:#CCD1D1" colspan="3" align="center"><b>Bombeo Pozos</b></td>' +
                    '<td style="background-color:#CCD1D1" colspan="3" align="center"><b>Resumen</b></td>' +
                    "</tr><tr>" +
                    '<td style="background-color:#CCD1D1" align="center"><b>Ejidal</b></td><td style="background-color:#CCD1D1" align="center"><b>Privada</b></td><td style="background-color:#CCD1D1" align="center"><b>Total</b></td>' +
                    '<td style="background-color:#CCD1D1" align="center"><b>Ejidal</b></td><td style="background-color:#CCD1D1" align="center"><b>Privada</b></td><td style="background-color:#CCD1D1" align="center"><b>Total</b></td>' +
                    '<td style="background-color:#CCD1D1" align="center"><b>Ejidal</b></td><td style="background-color:#CCD1D1" align="center"><b>Privada</b></td><td style="background-color:#CCD1D1" align="center"><b>Total</b></td>' +
                    '<td style="background-color:#CCD1D1" align="center"><b>Ejidal</b></td><td style="background-color:#CCD1D1" align="center"><b>Privada</b></td><td style="background-color:#CCD1D1" align="center"><b>Total</b></td>' +
                    '<td style="background-color:#CCD1D1" align="center"><b>Ejidal</b></td><td style="background-color:#CCD1D1" align="center"><b>Privada</b></td><td style="background-color:#CCD1D1" align="center"><b>Total</b></td>' +
                    "</tr></thead>" +
                    "<tbody>" +
                    '<tr><td style="background-color:#EB984E" colspan="16"><b>   Área física en el que se obtuvo solo un cultivo en el año agrícola</b></td></tr>' +
                    "<tr>" +
                    "<td>Número de usuarios</td>" +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-NU_GP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU_GP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU_GP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-NU_GD_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU_GD_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU_GD_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-NU_BC_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU_BC_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU_BC_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-NU_BP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU_BP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU_BP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-NU_T_E"></td> <td align="right" id="' +
                    anio +
                    DR +
                    '-NU_T_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU_T_T"></td>' +
                    "</tr>" +
                    "<tr>" +
                    "<td>Superfice regada (ha)</td>" +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-SR_GP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR_GP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR_GP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-SR_GD_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR_GD_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR_GD_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-SR_BC_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR_BC_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR_BC_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-SR_BP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR_BP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR_BP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-SR_T_E"></td> <td align="right" id="' +
                    anio +
                    DR +
                    '-SR_T_P"></td> <td align="right" id="' +
                    anio +
                    DR +
                    '-SR_T_T"></td>' +
                    "</tr>" +
                    "<tr>" +
                    "<td>Vol. Dist. (miles m³)</td>" +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-VD_GP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD_GP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD_GP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-VD_GD_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD_GD_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD_GD_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-VD_BC_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD_BC_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD_BC_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-VD_BP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD_BP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD_BP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-VD_T_E"></td><td align="right"  id="' +
                    anio +
                    DR +
                    '-VD_T_P"></td> <td align="right" id="' +
                    anio +
                    DR +
                    '-VD_T_T"></td>' +
                    "</tr>" +
                    "<tr>" +
                    "<td>Lámina bruta (cm)</td>" +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-La_GP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La_GP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La_GP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-La_GD_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La_GD_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La_GD_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-La_BC_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La_BC_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La_BC_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-La_BP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La_BP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La_BP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-La_T_E"></td><td align="right"  id="' +
                    anio +
                    DR +
                    '-La_T_P"></td> <td align="right" id="' +
                    anio +
                    DR +
                    '-La_T_T"></td>' +
                    "</tr>" +
                    '<tr><td style="background-color:#EB984E" colspan="16"><b>Área física que se sembró y cosechó dos veces en el año agrícola</b></td></tr>' +
                    "<tr>" +
                    "<td>Número de usuarios</td>" +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-NU2_GP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU2_GP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU2_GP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-NU2_GD_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU2_GD_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU2_GD_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-NU2_BC_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU2_BC_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU2_BC_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-NU2_BP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU2_BP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU2_BP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-NU2_T_E"></td> <td align="right" id="' +
                    anio +
                    DR +
                    '-NU2_T_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU2_T_T"></td>' +
                    "</tr>" +
                    "<tr>" +
                    "<td>Superfice regada (ha)</td>" +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-SR2_GP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR2_GP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR2_GP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-SR2_GD_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR2_GD_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR2_GD_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-SR2_BC_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR2_BC_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR2_BC_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-SR2_BP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR2_BP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR2_BP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-SR2_T_E"></td> <td align="right" id="' +
                    anio +
                    DR +
                    '-SR2_T_P"></td> <td align="right" id="' +
                    anio +
                    DR +
                    '-SR2_T_T"></td>' +
                    "</tr>" +
                    "<tr>" +
                    "<td>Vol. Dist. (miles m³)</td>" +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-VD2_GP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD2_GP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD2_GP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-VD2_GD_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD2_GD_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD2_GD_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-VD2_BC_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD2_BC_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD2_BC_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-VD2_BP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD2_BP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD2_BP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-VD2_T_E"></td><td align="right"  id="' +
                    anio +
                    DR +
                    '-VD2_T_P"></td> <td align="right" id="' +
                    anio +
                    DR +
                    '-VD2_T_T"></td>' +
                    "</tr>" +
                    "<tr>" +
                    "<td>Lámina bruta (cm)</td>" +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-La2_GP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La2_GP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La2_GP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-La2_GD_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La2_GD_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La2_GD_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-La2_BC_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La2_BC_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La2_BC_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-La2_BP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La2_BP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La2_BP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-La2_T_E"></td><td align="right"  id="' +
                    anio +
                    DR +
                    '-La2_T_P"></td> <td align="right" id="' +
                    anio +
                    DR +
                    '-La2_T_T"></td>' +
                    "</tr>" +
                    '<tr><td style="background-color:#EB984E" colspan="16"><b>Área física total regada en el año agrícola</b></td></tr>' +
                    "<tr>" +
                    "<td>Número de usuarios</td>" +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-NU3_GP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU3_GP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU3_GP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-NU3_GD_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU3_GD_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU3_GD_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-NU3_BC_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU3_BC_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU3_BC_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-NU3_BP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU3_BP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU3_BP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-NU3_T_E"></td> <td align="right" id="' +
                    anio +
                    DR +
                    '-NU3_T_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-NU3_T_T"></td>' +
                    "</tr>" +
                    "<tr>" +
                    "<td>Superfice regada (ha)</td>" +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-SR3_GP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR3_GP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR3_GP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-SR3_GD_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR3_GD_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR3_GD_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-SR3_BC_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR3_BC_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR3_BC_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-SR3_BP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR3_BP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-SR3_BP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-SR3_T_E"></td> <td align="right" id="' +
                    anio +
                    DR +
                    '-SR3_T_P"></td> <td align="right" id="' +
                    anio +
                    DR +
                    '-SR3_T_T"></td>' +
                    "</tr>" +
                    "<tr>" +
                    "<td>Vol. Dist. (miles m³)</td>" +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-VD3_GP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD3_GP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD3_GP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-VD3_GD_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD3_GD_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD3_GD_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-VD3_BC_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD3_BC_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD3_BC_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-VD3_BP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD3_BP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-VD3_BP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-VD3_T_E"></td><td align="right"  id="' +
                    anio +
                    DR +
                    '-VD3_T_P"></td> <td align="right" id="' +
                    anio +
                    DR +
                    '-VD3_T_T"></td>' +
                    "</tr>" +
                    "<tr>" +
                    "<td>Lámina bruta (cm)</td>" +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-La3_GP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La3_GP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La3_GP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-La3_GD_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La3_GD_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La3_GD_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-La3_BC_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La3_BC_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La3_BC_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-La3_BP_E"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La3_BP_P"></td><td align="right" id="' +
                    anio +
                    DR +
                    '-La3_BP_T"></td>' +
                    '<td align="right" id="' +
                    anio +
                    DR +
                    '-La3_T_E"></td><td align="right"  id="' +
                    anio +
                    DR +
                    '-La3_T_P"></td> <td align="right" id="' +
                    anio +
                    DR +
                    '-La3_T_T"></td>' +
                    "</tr>" +
                    "</tbody></table></div></div>" +
                    '<br><input class="btn btn-gob btn-fill  btn-block" type="button" onclick="fnExcelReport(\'T8-' +
                    anio +
                    "-" +
                    DR +
                    "', '" +
                    DRS +
                    '\')" value="Exportar Excel"><hr>'
                  );
                  /**
                   * Se colocan los datos existentes en la tabla
                   */
                  llenarTabla(JSON.parse(resp2), anio, DR);
                  /**
                   * Calculos para gravedad presas.
                   */
                  llenarGravedadP(anio, DR);
                  llenarGravedadP2(anio, DR);
                  llenarGravedadP3(anio, DR);
                  /**
                   * Calculos para Gravedad Derivación
                   */
                  llenarGravedadD(anio, DR);
                  llenarGravedadD2(anio, DR);
                  llenarGravedadD3(anio, DR);
                  /**
                   *
                   * Bombeo Corrientes
                   */
                  llenarBombeoC(anio, DR);
                  llenarBombeoC2(anio, DR);
                  llenarBombeoC3(anio, DR);
                  /**
                   *
                   * @param {type} anio
                   * @param {type} DR
                   * @returns {undefined}
                   * Bombeo Pozo
                   */
                  llenarBombeoP(anio, DR);
                  llenarBombeoP2(anio, DR);
                  llenarBombeoP3(anio, DR);
                  /**
                   *
                   * @param {type} anio
                   * @param {type} DR
                   * @returns {undefined}
                   * Obtener el resumen total
                   */
                  llenarTotal(anio, DR);
                  llenarTotal2(anio, DR);
                  llenarTotal3(anio, DR);
                },
              });
            });
          },
        });
      });
    },
  });
}

/**
 *
 * @param {type} Datos
 * @param {type} anio
 * @param {type} DR
 * @returns {undefined}
 * Funcion que llena la tabla insertada con los datos
 */
async function llenarTabla(Datos, anio, DR) {
  /**
   * Se itera sobre los elementos del array de los datos
   */
  $.each(Datos, async function (index, item) {
    /**
     * Si el anio y el distrito de riego coinciden con el elemento actual
     */
    if (item.distrito_riego_id === DR && item.anio_id === anio) {
      /*
       * Switch para determinar la fuente
       */
      switch (item.fuente_id) {
        case "1":
          /*
           * Switch para determinar la tenencia
           */
          switch (item.tenencia_id) {
            case "4":
              //Seccion 1
              if (item.usuarios1 > 0)
                document.getElementById(
                  anio + DR + "-NU_GP_E"
                ).innerHTML = numeral(item.usuarios1).format("0,0.00");
              if (item.superficie_regada1 > 0)
                document.getElementById(
                  anio + DR + "-SR_GP_E"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada1).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido1 > 0)
                document.getElementById(
                  anio + DR + "-VD_GP_E"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido1).toFixed(1)
                ).format("0,0.00");
              //Seccion 2
              if (item.usuarios2 > 0)
                document.getElementById(
                  anio + DR + "-NU2_GP_E"
                ).innerHTML = numeral(item.usuarios2).format("0,0.00");
              if (item.superficie_regada2 > 0)
                document.getElementById(
                  anio + DR + "-SR2_GP_E"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada2).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido2 > 0)
                document.getElementById(
                  anio + DR + "-VD2_GP_E"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido2).toFixed(1)
                ).format("0,0.00");
              //Seccion 3
              if (item.usuarios3 > 0)
                document.getElementById(
                  anio + DR + "-NU3_GP_E"
                ).innerHTML = numeral(item.usuarios3).format("0,0.00");
              if (item.superficie_regada3 > 0)
                document.getElementById(
                  anio + DR + "-SR3_GP_E"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada3).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido3 > 0)
                document.getElementById(
                  anio + DR + "-VD3_GP_E"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido3).toFixed(1)
                ).format("0,0.00");
              break;
            case "5":
              //Seccion1
              if (item.usuarios1 > 0)
                document.getElementById(
                  anio + DR + "-NU_GP_P"
                ).innerHTML = numeral(item.usuarios1).format("0,0.00");
              if (item.superficie_regada1 > 0)
                document.getElementById(
                  anio + DR + "-SR_GP_P"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada1).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido1 > 0)
                document.getElementById(
                  anio + DR + "-VD_GP_P"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido1).toFixed(1)
                ).format("0,0.00");
              //Seccion 2
              if (item.usuarios2 > 0)
                document.getElementById(
                  anio + DR + "-NU2_GP_P"
                ).innerHTML = numeral(item.usuarios2).format("0,0.00");
              if (item.superficie_regada2 > 0)
                document.getElementById(
                  anio + DR + "-SR2_GP_P"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada2).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido2 > 0)
                document.getElementById(
                  anio + DR + "-VD2_GP_P"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido2).toFixed(1)
                ).format("0,0.00");
              //Seccion 3
              if (item.usuarios3 > 0)
                document.getElementById(
                  anio + DR + "-NU3_GP_P"
                ).innerHTML = numeral(item.usuarios3).format("0,0.00");
              if (item.superficie_regada3 > 0)
                document.getElementById(
                  anio + DR + "-SR3_GP_P"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada3).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido3 > 0)
                document.getElementById(
                  anio + DR + "-VD3_GP_P"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido3).toFixed(1)
                ).format("0,0.00");
              break;
          }
          break;
        case "2":
          /*
           * Switch para determinar la tenencia
           */
          switch (item.tenencia_id) {
            case "4":
              if (item.usuarios1 > 0)
                document.getElementById(
                  anio + DR + "-NU_GD_E"
                ).innerHTML = numeral(item.usuarios1).format("0,0.00");
              if (item.superficie_regada1 > 0)
                document.getElementById(
                  anio + DR + "-SR_GD_E"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada1).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido1 > 0)
                document.getElementById(
                  anio + DR + "-VD_GD_E"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido1).toFixed(1)
                ).format("0,0.00");
              //Seccion 2
              if (item.usuarios2 > 0)
                document.getElementById(
                  anio + DR + "-NU2_GD_E"
                ).innerHTML = numeral(item.usuarios2).format("0,0.00");
              if (item.superficie_regada2 > 0)
                document.getElementById(
                  anio + DR + "-SR2_GD_E"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada2).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido2 > 0)
                document.getElementById(
                  anio + DR + "-VD2_GD_E"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido2).toFixed(1)
                ).format("0,0.00");
              //Seccion 3
              if (item.usuarios3 > 0)
                document.getElementById(
                  anio + DR + "-NU3_GD_E"
                ).innerHTML = numeral(item.usuarios3).format("0,0.00");
              if (item.superficie_regada3 > 0)
                document.getElementById(
                  anio + DR + "-SR3_GD_E"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada3).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido3 > 0)
                document.getElementById(
                  anio + DR + "-VD3_GD_E"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido3).toFixed(1)
                ).format("0,0.00");
              break;
            case "5":
              if (item.usuarios1 > 0)
                document.getElementById(
                  anio + DR + "-NU_GD_P"
                ).innerHTML = numeral(item.usuarios1).format("0,0.00");
              if (item.superficie_regada1 > 0)
                document.getElementById(
                  anio + DR + "-SR_GD_P"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada1).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido1 > 0)
                document.getElementById(
                  anio + DR + "-VD_GD_P"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido1).toFixed(1)
                ).format("0,0.00");
              //Seccion 2
              if (item.usuarios2 > 0)
                document.getElementById(
                  anio + DR + "-NU2_GD_P"
                ).innerHTML = numeral(item.usuarios2).format("0,0.00");
              if (item.superficie_regada2 > 0)
                document.getElementById(
                  anio + DR + "-SR2_GD_P"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada2).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido2 > 0)
                document.getElementById(
                  anio + DR + "-VD2_GD_P"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido2).toFixed(1)
                ).format("0,0.00");
              //Seccion 3
              if (item.usuarios3 > 0)
                document.getElementById(
                  anio + DR + "-NU3_GD_P"
                ).innerHTML = numeral(item.usuarios3).format("0,0.00");
              if (item.superficie_regada3 > 0)
                document.getElementById(
                  anio + DR + "-SR3_GD_P"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada3).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido3 > 0)
                document.getElementById(
                  anio + DR + "-VD3_GD_P"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido3).toFixed(1)
                ).format("0,0.00");
              break;
          }
          break;
        case "3":
          /*
           * Switch para determinar la tenencia
           */
          switch (item.tenencia_id) {
            case "4":
              if (item.usuarios1 > 0)
                document.getElementById(
                  anio + DR + "-NU_BP_E"
                ).innerHTML = numeral(item.usuarios1).format("0,0.00");
              if (item.superficie_regada1 > 0)
                document.getElementById(
                  anio + DR + "-SR_BP_E"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada1).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido1 > 0)
                document.getElementById(
                  anio + DR + "-VD_BP_E"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido1).toFixed(1)
                ).format("0,0.00");
              //Seccion 2
              if (item.usuarios2 > 0)
                document.getElementById(
                  anio + DR + "-NU2_BP_E"
                ).innerHTML = numeral(item.usuarios2).format("0,0.00");
              if (item.superficie_regada2 > 0)
                document.getElementById(
                  anio + DR + "-SR2_BP_E"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada2).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido2 > 0)
                document.getElementById(
                  anio + DR + "-VD2_BP_E"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido2).toFixed(1)
                ).format("0,0.00");
              //Seccion 3
              if (item.usuarios3 > 0)
                document.getElementById(
                  anio + DR + "-NU3_BP_E"
                ).innerHTML = numeral(item.usuarios3).format("0,0.00");
              if (item.superficie_regada3 > 0)
                document.getElementById(
                  anio + DR + "-SR3_BP_E"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada3).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido3 > 0)
                document.getElementById(
                  anio + DR + "-VD3_BP_E"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido3).toFixed(1)
                ).format("0,0.00");
              break;
            case "5":
              if (item.usuarios1 > 0)
                document.getElementById(
                  anio + DR + "-NU_BP_P"
                ).innerHTML = numeral(item.usuarios1).format("0,0.00");
              if (item.superficie_regada1 > 0)
                document.getElementById(
                  anio + DR + "-SR_BP_P"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada1).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido1 > 0)
                document.getElementById(
                  anio + DR + "-VD_BP_P"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido1).toFixed(1)
                ).format("0,0.00");
              //Seccion 2
              if (item.usuarios2 > 0)
                document.getElementById(
                  anio + DR + "-NU2_BP_P"
                ).innerHTML = numeral(item.usuarios2).format("0,0.00");
              if (item.superficie_regada2 > 0)
                document.getElementById(
                  anio + DR + "-SR2_BP_P"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada2).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido2 > 0)
                document.getElementById(
                  anio + DR + "-VD2_BP_P"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido2).toFixed(1)
                ).format("0,0.00");
              //Seccion 3
              if (item.usuarios3 > 0)
                document.getElementById(
                  anio + DR + "-NU3_BP_P"
                ).innerHTML = numeral(item.usuarios3).format("0,0.00");
              if (item.superficie_regada3 > 0)
                document.getElementById(
                  anio + DR + "-SR3_BP_P"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada3).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido3 > 0)
                document.getElementById(
                  anio + DR + "-VD3_BP_P"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido3).toFixed(1)
                ).format("0,0.00");
              break;
          }
          break;
        case "4":
          /*
           * Switch para determinar la tenencia
           */
          switch (item.tenencia_id) {
            case "4":
              if (item.usuarios1 > 0)
                document.getElementById(
                  anio + DR + "-NU_BC_E"
                ).innerHTML = numeral(item.usuarios1).format("0,0.00");
              if (item.superficie_regada1 > 0)
                document.getElementById(
                  anio + DR + "-SR_BC_E"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada1).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido1 > 0)
                document.getElementById(
                  anio + DR + "-VD_BC_E"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido1).toFixed(1)
                ).format("0,0.00");
              //Seccion 2
              if (item.usuarios2 > 0)
                document.getElementById(
                  anio + DR + "-NU2_BC_E"
                ).innerHTML = numeral(item.usuarios2).format("0,0.00");
              if (item.superficie_regada2 > 0)
                document.getElementById(
                  anio + DR + "-SR2_BC_E"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada2).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido2 > 0)
                document.getElementById(
                  anio + DR + "-VD2_BC_E"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido2).toFixed(1)
                ).format("0,0.00");
              //Seccion 3
              if (item.usuarios3 > 0)
                document.getElementById(
                  anio + DR + "-NU3_BC_E"
                ).innerHTML = numeral(item.usuarios3).format("0,0.00");
              if (item.superficie_regada3 > 0)
                document.getElementById(
                  anio + DR + "-SR3_BC_E"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada3).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido3 > 0)
                document.getElementById(
                  anio + DR + "-VD3_BC_E"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido3).toFixed(1)
                ).format("0,0.00");
              break;
            case "5":
              if (item.usuarios1 > 0)
                document.getElementById(
                  anio + DR + "-NU_BC_P"
                ).innerHTML = numeral(item.usuarios1).format("0,0.00");
              if (item.superficie_regada1 > 0)
                document.getElementById(
                  anio + DR + "-SR_BC_P"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada1).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido1 > 0)
                document.getElementById(
                  anio + DR + "-VD_BC_P"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido1).toFixed(1)
                ).format("0,0.00");
              //Session 2
              if (item.usuarios2 > 0)
                document.getElementById(
                  anio + DR + "-NU2_BC_P"
                ).innerHTML = numeral(item.usuarios2).format("0,0.00");
              if (item.superficie_regada2 > 0)
                document.getElementById(
                  anio + DR + "-SR2_BC_P"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada2).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido2 > 0)
                document.getElementById(
                  anio + DR + "-VD2_BC_P"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido2).toFixed(1)
                ).format("0,0.00");
              //Seccion 3
              if (item.usuarios3 > 0)
                document.getElementById(
                  anio + DR + "-NU3_BC_P"
                ).innerHTML = numeral(item.usuarios3).format("0,0.00");
              if (item.superficie_regada3 > 0)
                document.getElementById(
                  anio + DR + "-SR3_BC_P"
                ).innerHTML = numeral(
                  parseFloat(item.superficie_regada3).toFixed(1)
                ).format("0,0.00");
              if (item.volumen_distribuido3 > 0)
                document.getElementById(
                  anio + DR + "-VD3_BC_P"
                ).innerHTML = numeral(
                  parseFloat(item.volumen_distribuido3).toFixed(1)
                ).format("0,0.00");
              break;
          }
          break;
      }
    }
  });
}

/*
 *
 * @param {type} anio
 * @param {type} DR
 * @returns {undefined}
 * Funcion para calcular el total de Gravdad presas de menos de un cultivo
 */
async function llenarGravedadP(anio, DR) {
  /**
   *
   * @type Number
   * Calculamos el total
   * Para el nuemero de usuarios
   * Gravedad presas.
   */
  var v1 = 0;
  var v2 = 0;
  var Total = 0;
  if ($("#" + anio + DR + "-NU_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU_GP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU_GP_P").text()).value();
  }
  Total = v1 + v2;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU_GP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type Number
   * Calculamos el total
   * Para la superficie regada
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-SR_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR_GP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_GP_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR_GP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type Number
   * Calculamos el total
   * Volumen distribuido
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD_GP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD_GP_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD_GP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type Number
   * Calculamos el total
   * Lamina bruto
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR_GP_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_GP_E").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La_GP_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD_GP_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_GP_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR_GP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_GP_P").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La_GP_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD_GP_T").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_GP_T").text()).value();
  }
  if ($("#" + anio + DR + "-SR_GP_T").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_GP_T").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La_GP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
}

/*
 *
 * @param {type} anio
 * @param {type} DR
 * @returns {undefined}
 * Funcion para calcular el total de Gravdad presas de mas de un cultivo
 */
async function llenarGravedadP2(anio, DR) {
  /**
   *
   * @type NU2mber
   * CalcuLa2mos el total
   * Para el NU2emero de usuarios
   * Gravedad presas.
   */
  var v1 = 0;
  var v2 = 0;
  var Total = 0;
  if ($("#" + anio + DR + "-NU2_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU2_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU2_GP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU2_GP_P").text()).value();
  }
  Total = v1 + v2;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU2_GP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU2mber
   * CalcuLa2mos el total
   * Para La2 superficie regada
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-SR2_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR2_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_GP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_GP_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR2_GP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU2mber
   * CalcuLa2mos el total
   * Volumen distribuido
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD2_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD2_GP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD2_GP_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD2_GP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU2mber
   * CalcuLa2mos el total
   * La2mina bruto
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD2_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_GP_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_GP_E").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La2_GP_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD2_GP_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_GP_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_GP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_GP_P").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La2_GP_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD2_GP_T").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_GP_T").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_GP_T").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_GP_T").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La2_GP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
}
/*
 *
 * @param {type} anio
 * @param {type} DR
 * @returns {undefined}
 * Funcion para calcular el total de Gravdad presas total
 */
async function llenarGravedadP3(anio, DR) {
  /**
   *
   * @type NU3mber
   * CalcuLa3mos el total
   * Para el NU3emero de usuarios
   * Gravedad presas.
   */
  var v1 = 0;
  var v2 = 0;
  var Total = 0;
  if ($("#" + anio + DR + "-NU3_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU3_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU3_GP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU3_GP_P").text()).value();
  }
  Total = v1 + v2;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU3_GP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU3mber
   * CalcuLa3mos el total
   * Para La3 superficie regada
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-SR3_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR3_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_GP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_GP_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR3_GP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU3mber
   * CalcuLa3mos el total
   * Volumen distribuido
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD3_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD3_GP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD3_GP_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD3_GP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU3mber
   * CalcuLa3mos el total
   * La3mina bruto
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD3_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_GP_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_GP_E").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La3_GP_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD3_GP_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_GP_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_GP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_GP_P").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La3_GP_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD3_GP_T").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_GP_T").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_GP_T").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_GP_T").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La3_GP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
}

/**
 *
 * @param {type} anio
 * @param {type} DR
 * @returns {undefined}
 * Funcion para calcular el total de Gravdad Derivacion de menos de un cultivo
 */
async function llenarGravedadD(anio, DR) {
  /**
   *
   * @type Number
   * Calculamos el total
   * Para el nuemero de usuarios
   * Gravedad presas.
   */
  var v1 = 0;
  var v2 = 0;
  var Total = 0;
  if ($("#" + anio + DR + "-NU_GD_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU_GD_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU_GD_P").text()).value();
  }
  Total = v1 + v2;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU_GD_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type Number
   * Calculamos el total
   * Para la superficie regada
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-SR_GD_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR_GD_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_GD_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR_GD_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type Number
   * Calculamos el total
   * Volumen distribuido
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD_GD_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_GD_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD_GD_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD_GD_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type Number
   * Calculamos el total
   * Lamina bruto
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD_GD_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_GD_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR_GD_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_GD_E").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La_GD_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD_GD_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_GD_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_GD_P").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La_GD_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD_GD_T").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_GD_T").text()).value();
  }
  if ($("#" + anio + DR + "-SR_GD_T").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_GD_T").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La_GD_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
}
/**
 *
 * @param {type} anio
 * @param {type} DR
 * @returns {undefined}
 * Funcion para calcular el total de Gravdad Derivacion de mas de un cultivo
 */
async function llenarGravedadD2(anio, DR) {
  /**
   *
   * @type NU2mber
   * CalcuLa2mos el total
   * Para el NU2emero de usuarios
   * Gravedad presas.
   */
  var v1 = 0;
  var v2 = 0;
  var Total = 0;
  if ($("#" + anio + DR + "-NU2_GD_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU2_GD_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU2_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU2_GD_P").text()).value();
  }
  Total = v1 + v2;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU2_GD_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU2mber
   * CalcuLa2mos el total
   * Para La2 superficie regada
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-SR2_GD_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR2_GD_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_GD_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR2_GD_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU2mber
   * CalcuLa2mos el total
   * Volumen distribuido
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD2_GD_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_GD_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD2_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD2_GD_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD2_GD_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU2mber
   * CalcuLa2mos el total
   * La2mina bruto
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD2_GD_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_GD_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_GD_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_GD_E").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La2_GD_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD2_GD_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_GD_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_GD_P").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La2_GD_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD2_GD_T").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_GD_T").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_GD_T").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_GD_T").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La2_GD_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
}
/**
 *
 * @param {type} anio
 * @param {type} DR
 * @returns {undefined}
 * Funcion para calcular el total de Gravdad Derivacion total
 */
async function llenarGravedadD3(anio, DR) {
  /**
   *
   * @type NU3mber
   * CalcuLa3mos el total
   * Para el NU3emero de usuarios
   * Gravedad presas.
   */
  var v1 = 0;
  var v2 = 0;
  var Total = 0;
  if ($("#" + anio + DR + "-NU3_GD_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU3_GD_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU3_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU3_GD_P").text()).value();
  }
  Total = v1 + v2;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU3_GD_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU3mber
   * CalcuLa3mos el total
   * Para La3 superficie regada
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-SR3_GD_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR3_GD_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_GD_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR3_GD_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU3mber
   * CalcuLa3mos el total
   * Volumen distribuido
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD3_GD_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_GD_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD3_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD3_GD_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD3_GD_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU3mber
   * CalcuLa3mos el total
   * La3mina bruto
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD3_GD_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_GD_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_GD_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_GD_E").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La3_GD_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD3_GD_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_GD_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_GD_P").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La3_GD_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD3_GD_T").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_GD_T").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_GD_T").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_GD_T").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La3_GD_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
}

/**
 *
 * @param {type} anio
 * @param {type} DR
 * @returns {undefined}
 * Funcion para calcular el total deBombreo corrientes  de menos de un cultivo
 */
async function llenarBombeoC(anio, DR) {
  /**
   *
   * @type Number
   * Calculamos el numeral(Total).format("0,0.00")
   * Para el nuemero de usuarios
   * Gravedad presas.
   */
  var v1 = 0;
  var v2 = 0;
  var Total = 0;
  if ($("#" + anio + DR + "-NU_BC_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU_BC_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU_BC_P").text()).value();
  }
  Total = v1 + v2;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU_BC_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type Number
   * Calculamos el total
   * Para la superficie regada
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-SR_BC_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR_BC_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_BC_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR_BC_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type Number
   * Calculamos el total
   * Volumen distribuido
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD_BC_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD_BC_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD_BC_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD_BC_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type Number
   * Calculamos el total
   * Lamina bruto
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD_BC_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR_BC_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_BC_E").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La_BC_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD_BC_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_BC_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR_BC_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_BC_P").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La_BC_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD_BC_T").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_BC_T").text()).value();
  }
  if ($("#" + anio + DR + "-SR_BC_T").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_BC_T").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La_BC_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
}
/**
 *
 * @param {type} anio
 * @param {type} DR
 * @returns {undefined}
 * Funcion para calcular el total de Bombreo corrientes  de mas de un cultivo
 */
async function llenarBombeoC2(anio, DR) {
  /**
   *
   * @type NU2mber
   * CalcuLa2mos el total
   * Para el NU2emero de usuarios
   * Gravedad presas.
   */
  var v1 = 0;
  var v2 = 0;
  var Total = 0;
  if ($("#" + anio + DR + "-NU2_BC_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU2_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU2_BC_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU2_BC_P").text()).value();
  }
  Total = v1 + v2;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU2_BC_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU2mber
   * CalcuLa2mos el total
   * Para La2 superficie regada
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-SR2_BC_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR2_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_BC_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_BC_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR2_BC_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU2mber
   * CalcuLa2mos el total
   * Volumen distribuido
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD2_BC_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD2_BC_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD2_BC_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD2_BC_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU2mber
   * CalcuLa2mos el total
   * La2mina bruto
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD2_BC_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_BC_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_BC_E").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La2_BC_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD2_BC_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_BC_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_BC_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_BC_P").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La2_BC_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD2_BC_T").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_BC_T").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_BC_T").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_BC_T").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La2_BC_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
}
/**
 *
 * @param {type} anio
 * @param {type} DR
 * @returns {undefined}
 * Funcion para calcular el total de Bombreo corrientes total
 */
async function llenarBombeoC3(anio, DR) {
  /**
   *
   * @type NU3mber
   * CalcuLa3mos el total
   * Para el NU3emero de usuarios
   * Gravedad presas.
   */
  var v1 = 0;
  var v2 = 0;
  var Total = 0;
  if ($("#" + anio + DR + "-NU3_BC_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU3_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU3_BC_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU3_BC_P").text()).value();
  }
  Total = v1 + v2;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU3_BC_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU3mber
   * CalcuLa3mos el total
   * Para La3 superficie regada
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-SR3_BC_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR3_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_BC_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_BC_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR3_BC_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU3mber
   * CalcuLa3mos el total
   * Volumen distribuido
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD3_BC_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD3_BC_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD3_BC_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD3_BC_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU3mber
   * CalcuLa3mos el total
   * La3mina bruto
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD3_BC_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_BC_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_BC_E").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La3_BC_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD3_BC_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_BC_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_BC_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_BC_P").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La3_BC_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD3_BC_T").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_BC_T").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_BC_T").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_BC_T").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La3_BC_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
}

/**
 *
 * @param {type} anio
 * @param {type} DR
 * @returns {undefined}
 * Funcion para calcular el total de Bombreo pozos  de menos de un cultivo
 */
async function llenarBombeoP(anio, DR) {
  /**
   *
   * @type Number
   * Calculamos el total
   * Para el nuemero de usuarios
   * Gravedad presas.
   */
  var v1 = 0;
  var v2 = 0;
  var Total = 0;
  if ($("#" + anio + DR + "-NU_BP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU_BP_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU_BP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU_BP_P").text()).value();
  }
  Total = v1 + v2;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU_BP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type Number
   * Calculamos el total
   * Para la superficie regada
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-SR_BP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR_BP_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR_BP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_BP_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR_BP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type Number
   * Calculamos el total
   * Volumen distribuido
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD_BP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_BP_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD_BP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD_BP_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD_BP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type Number
   * Calculamos el total
   * Lamina bruto
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD_BP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_BP_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR_BP_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_BP_E").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La_BP_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD_BP_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_BP_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR_BP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_BP_P").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La_BP_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD_BP_T").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_BP_T").text()).value();
  }
  if ($("#" + anio + DR + "-SR_BP_T").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_BP_T").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La_BP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
}

/**
 *
 * @param {type} anio
 * @param {type} DR
 * @returns {undefined}
 *Funcion para calcular el total de Bombreo pozos  de mas de un cultivo
 */
async function llenarBombeoP2(anio, DR) {
  /**
   *
   * @type NU2mber
   * CalcuLa2mos el total
   * Para el NU2emero de usuarios
   * Gravedad presas.
   */
  var v1 = 0;
  var v2 = 0;
  var Total = 0;
  if ($("#" + anio + DR + "-NU2_BP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU2_BP_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU2_BP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU2_BP_P").text()).value();
  }
  Total = v1 + v2;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU2_BP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU2mber
   * CalcuLa2mos el total
   * Para La2 superficie regada
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-SR2_BP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR2_BP_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_BP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_BP_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR2_BP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU2mber
   * CalcuLa2mos el total
   * Volumen distribuido
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD2_BP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_BP_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD2_BP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD2_BP_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD2_BP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU2mber
   * CalcuLa2mos el total
   * La2mina bruto
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD2_BP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_BP_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_BP_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_BP_E").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La2_BP_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD2_BP_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_BP_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_BP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_BP_P").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La2_BP_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD2_BP_T").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_BP_T").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_BP_T").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_BP_T").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La2_BP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
}
/*
 *
 * @param {type} anio
 * @param {type} DR
 * @returns {undefined}
 * Funcion para calcular el total de Bombreo pozos  total
 */
async function llenarBombeoP3(anio, DR) {
  /**
   *
   * @type NU3mber
   * CalcuLa3mos el total
   * Para el NU3emero de usuarios
   * Gravedad presas.
   */
  var v1 = 0;
  var v2 = 0;
  var Total = 0;
  if ($("#" + anio + DR + "-NU3_BP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU3_BP_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU3_BP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU3_BP_P").text()).value();
  }
  Total = v1 + v2;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU3_BP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU3mber
   * CalcuLa3mos el total
   * Para La3 superficie regada
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-SR3_BP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR3_BP_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_BP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_BP_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR3_BP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU3mber
   * CalcuLa3mos el total
   * Volumen distribuido
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD3_BP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_BP_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD3_BP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD3_BP_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD3_BP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  /**
   *
   * @type NU3mber
   * CalcuLa3mos el total
   * La3mina bruto
   * Gravedad presas.
   */
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD3_BP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_BP_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_BP_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_BP_E").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La3_BP_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD3_BP_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_BP_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_BP_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_BP_P").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La3_BP_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD3_BP_T").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_BP_T").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_BP_T").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_BP_T").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La3_BP_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
}

/**
 *
 * @param {type} anio
 * @param {type} DR
 * @returns {undefined}
 * Calcula lso subtotales de la lamina de menos de un cultivo
 */
async function llenarTotal(anio, DR) {
  /**
   *
   * @type Number
   * Numero de usuarios
   */
  var Total = 0;
  var v1 = 0;
  var v2 = 0;
  var v3 = 0;
  var v4 = 0;

  if ($("#" + anio + DR + "-NU_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU_GD_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU_GD_E").text()).value();
  }

  if ($("#" + anio + DR + "-NU_BC_E").text() !== "") {
    v3 = numeral($("#" + anio + DR + "-NU_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU_BP_E").text() !== "") {
    v4 = numeral($("#" + anio + DR + "-NU_BP_E").text()).value();
  }

  Total = v1 + v2 + v3 + v4;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU_T_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  Total = 0;
  v1 = 0;
  v2 = 0;
  v3 = 0;
  v4 = 0;
  if ($("#" + anio + DR + "-NU_GP_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU_GP_P").text()).value();
  }
  if ($("#" + anio + DR + "-NU_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU_GD_P").text()).value();
  }

  if ($("#" + anio + DR + "-NU_BC_P").text() !== "") {
    v3 = numeral($("#" + anio + DR + "-NU_BC_P").text()).value();
  }
  if ($("#" + anio + DR + "-NU_BP_P").text() !== "") {
    v4 = numeral($("#" + anio + DR + "-NU_BP_P").text()).value();
  }

  Total = v1 + v2 + v3 + v4;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU_T_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  Total = 0;
  v1 = 0;
  v2 = 0;
  if ($("#" + anio + DR + "-NU_T_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU_T_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU_T_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU_T_P").text()).value();
  }
  Total = v1 + v2;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU_T_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  ///SR
  Total = 0;
  v1 = 0;
  v2 = 0;
  v3 = 0;
  v4 = 0;
  if ($("#" + anio + DR + "-SR_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR_GD_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_GD_E").text()).value();
  }

  if ($("#" + anio + DR + "-SR_BC_E").text() !== "") {
    v3 = numeral($("#" + anio + DR + "-SR_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR_BP_E").text() !== "") {
    v4 = numeral($("#" + anio + DR + "-SR_BP_E").text()).value();
  }

  Total = parseFloat(v1 + v2 + v3 + v4).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR_T_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  Total = parseFloat(v1 + v2 + v3 + v4).toFixed(1);
  if ($("#" + anio + DR + "-SR_GP_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR_GP_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_GD_P").text()).value();
  }

  if ($("#" + anio + DR + "-SR_BC_P").text() !== "") {
    v3 = numeral($("#" + anio + DR + "-SR_BC_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR_BP_P").text() !== "") {
    v4 = numeral($("#" + anio + DR + "-SR_BP_P").text()).value();
  }

  Total = parseFloat(v1 + v2 + v3 + v4).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR_T_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  Total = 0;
  v1 = 0;
  v2 = 0;
  if ($("#" + anio + DR + "-SR_T_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR_T_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR_T_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_T_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR_T_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  //VD
  Total = 0;
  v1 = 0;
  v2 = 0;
  v3 = 0;
  v4 = 0;
  if ($("#" + anio + DR + "-VD_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD_GD_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD_GD_E").text()).value();
  }

  if ($("#" + anio + DR + "-VD_BC_E").text() !== "") {
    v3 = numeral($("#" + anio + DR + "-VD_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD_BP_E").text() !== "") {
    v4 = numeral($("#" + anio + DR + "-VD_BP_E").text()).value();
  }

  Total = parseFloat(v1 + v2 + v3 + v4).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD_T_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  Total = parseFloat(v1 + v2 + v3 + v4).toFixed(1);
  if ($("#" + anio + DR + "-VD_GP_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_GP_P").text()).value();
  }
  if ($("#" + anio + DR + "-VD_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD_GD_P").text()).value();
  }

  if ($("#" + anio + DR + "-VD_BC_P").text() !== "") {
    v3 = numeral($("#" + anio + DR + "-VD_BC_P").text()).value();
  }
  if ($("#" + anio + DR + "-VD_BP_P").text() !== "") {
    v4 = numeral($("#" + anio + DR + "-VD_BP_P").text()).value();
  }

  Total = parseFloat(v1 + v2 + v3 + v4).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD_T_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  Total = 0;
  v1 = 0;
  v2 = 0;
  if ($("#" + anio + DR + "-VD_T_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_T_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD_T_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD_T_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD_T_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  //Lamina
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD_T_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_T_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR_T_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_T_E").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La_T_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD_T_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_T_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR_T_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_T_P").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La_T_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD_T_T").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD_T_T").text()).value();
  }
  if ($("#" + anio + DR + "-SR_T_T").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR_T_T").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La_T_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
}
/**
 *
 * @param {type} anio
 * @param {type} DR
 * @returns {undefined}
 * Calcula lso subtotales de la lamina de mas de un cultivo
 */
async function llenarTotal2(anio, DR) {
  /**
   *
   * @type NU2mber
   * NU2mero de usuarios
   */
  var Total = 0;
  var v1 = 0;
  var v2 = 0;
  var v3 = 0;
  var v4 = 0;

  if ($("#" + anio + DR + "-NU2_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU2_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU2_GD_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU2_GD_E").text()).value();
  }

  if ($("#" + anio + DR + "-NU2_BC_E").text() !== "") {
    v3 = numeral($("#" + anio + DR + "-NU2_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU2_BP_E").text() !== "") {
    v4 = numeral($("#" + anio + DR + "-NU2_BP_E").text()).value();
  }

  Total = v1 + v2 + v3 + v4;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU2_T_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  Total = 0;
  v1 = 0;
  v2 = 0;
  v3 = 0;
  v4 = 0;
  if ($("#" + anio + DR + "-NU2_GP_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU2_GP_P").text()).value();
  }
  if ($("#" + anio + DR + "-NU2_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU2_GD_P").text()).value();
  }

  if ($("#" + anio + DR + "-NU2_BC_P").text() !== "") {
    v3 = numeral($("#" + anio + DR + "-NU2_BC_P").text()).value();
  }
  if ($("#" + anio + DR + "-NU2_BP_P").text() !== "") {
    v4 = numeral($("#" + anio + DR + "-NU2_BP_P").text()).value();
  }

  Total = v1 + v2 + v3 + v4;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU2_T_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  Total = 0;
  v1 = 0;
  v2 = 0;
  if ($("#" + anio + DR + "-NU2_T_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU2_T_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU2_T_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU2_T_P").text()).value();
  }
  Total = v1 + v2;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU2_T_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  ///SR2
  Total = 0;
  v1 = 0;
  v2 = 0;
  v3 = 0;
  v4 = 0;
  if ($("#" + anio + DR + "-SR2_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR2_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_GD_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_GD_E").text()).value();
  }

  if ($("#" + anio + DR + "-SR2_BC_E").text() !== "") {
    v3 = numeral($("#" + anio + DR + "-SR2_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_BP_E").text() !== "") {
    v4 = numeral($("#" + anio + DR + "-SR2_BP_E").text()).value();
  }

  Total = parseFloat(v1 + v2 + v3 + v4).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR2_T_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  Total = parseFloat(v1 + v2 + v3 + v4).toFixed(1);
  if ($("#" + anio + DR + "-SR2_GP_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR2_GP_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_GD_P").text()).value();
  }

  if ($("#" + anio + DR + "-SR2_BC_P").text() !== "") {
    v3 = numeral($("#" + anio + DR + "-SR2_BC_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_BP_P").text() !== "") {
    v4 = numeral($("#" + anio + DR + "-SR2_BP_P").text()).value();
  }

  Total = parseFloat(v1 + v2 + v3 + v4).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR2_T_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  Total = 0;
  v1 = 0;
  v2 = 0;
  if ($("#" + anio + DR + "-SR2_T_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR2_T_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_T_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_T_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR2_T_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  //VD2
  Total = 0;
  v1 = 0;
  v2 = 0;
  v3 = 0;
  v4 = 0;
  if ($("#" + anio + DR + "-VD2_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD2_GD_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD2_GD_E").text()).value();
  }

  if ($("#" + anio + DR + "-VD2_BC_E").text() !== "") {
    v3 = numeral($("#" + anio + DR + "-VD2_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD2_BP_E").text() !== "") {
    v4 = numeral($("#" + anio + DR + "-VD2_BP_E").text()).value();
  }

  Total = parseFloat(v1 + v2 + v3 + v4).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD2_T_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  Total = parseFloat(v1 + v2 + v3 + v4).toFixed(1);
  if ($("#" + anio + DR + "-VD2_GP_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_GP_P").text()).value();
  }
  if ($("#" + anio + DR + "-VD2_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD2_GD_P").text()).value();
  }

  if ($("#" + anio + DR + "-VD2_BC_P").text() !== "") {
    v3 = numeral($("#" + anio + DR + "-VD2_BC_P").text()).value();
  }
  if ($("#" + anio + DR + "-VD2_BP_P").text() !== "") {
    v4 = numeral($("#" + anio + DR + "-VD2_BP_P").text()).value();
  }

  Total = parseFloat(v1 + v2 + v3 + v4).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD2_T_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  Total = 0;
  v1 = 0;
  v2 = 0;
  if ($("#" + anio + DR + "-VD2_T_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_T_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD2_T_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD2_T_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD2_T_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  //La2mina
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD2_T_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_T_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_T_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_T_E").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La2_T_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD2_T_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_T_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_T_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_T_P").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La2_T_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD2_T_T").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD2_T_T").text()).value();
  }
  if ($("#" + anio + DR + "-SR2_T_T").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR2_T_T").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La2_T_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
}
/**
 *
 * @param {type} anio
 * @param {type} DR
 * @returns {undefined}
 * Calcula lso subtotales de la lamina total
 */
async function llenarTotal3(anio, DR) {
  /**
   *
   * @type NU3mber
   * NU3mero de usuarios
   */
  var Total = 0;
  var v1 = 0;
  var v2 = 0;
  var v3 = 0;
  var v4 = 0;

  if ($("#" + anio + DR + "-NU3_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU3_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU3_GD_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU3_GD_E").text()).value();
  }

  if ($("#" + anio + DR + "-NU3_BC_E").text() !== "") {
    v3 = numeral($("#" + anio + DR + "-NU3_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU3_BP_E").text() !== "") {
    v4 = numeral($("#" + anio + DR + "-NU3_BP_E").text()).value();
  }

  Total = v1 + v2 + v3 + v4;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU3_T_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  Total = 0;
  v1 = 0;
  v2 = 0;
  v3 = 0;
  v4 = 0;
  if ($("#" + anio + DR + "-NU3_GP_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU3_GP_P").text()).value();
  }
  if ($("#" + anio + DR + "-NU3_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU3_GD_P").text()).value();
  }

  if ($("#" + anio + DR + "-NU3_BC_P").text() !== "") {
    v3 = numeral($("#" + anio + DR + "-NU3_BC_P").text()).value();
  }
  if ($("#" + anio + DR + "-NU3_BP_P").text() !== "") {
    v4 = numeral($("#" + anio + DR + "-NU3_BP_P").text()).value();
  }

  Total = v1 + v2 + v3 + v4;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU3_T_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  Total = 0;
  v1 = 0;
  v2 = 0;
  if ($("#" + anio + DR + "-NU3_T_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-NU3_T_E").text()).value();
  }
  if ($("#" + anio + DR + "-NU3_T_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-NU3_T_P").text()).value();
  }
  Total = v1 + v2;
  if (Total > 0) {
    document.getElementById(anio + DR + "-NU3_T_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  ///SR3
  Total = 0;
  v1 = 0;
  v2 = 0;
  v3 = 0;
  v4 = 0;
  if ($("#" + anio + DR + "-SR3_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR3_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_GD_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_GD_E").text()).value();
  }

  if ($("#" + anio + DR + "-SR3_BC_E").text() !== "") {
    v3 = numeral($("#" + anio + DR + "-SR3_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_BP_E").text() !== "") {
    v4 = numeral($("#" + anio + DR + "-SR3_BP_E").text()).value();
  }

  Total = parseFloat(v1 + v2 + v3 + v4).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR3_T_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  Total = parseFloat(v1 + v2 + v3 + v4).toFixed(1);
  if ($("#" + anio + DR + "-SR3_GP_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR3_GP_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_GD_P").text()).value();
  }

  if ($("#" + anio + DR + "-SR3_BC_P").text() !== "") {
    v3 = numeral($("#" + anio + DR + "-SR3_BC_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_BP_P").text() !== "") {
    v4 = numeral($("#" + anio + DR + "-SR3_BP_P").text()).value();
  }

  Total = parseFloat(v1 + v2 + v3 + v4).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR3_T_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  Total = 0;
  v1 = 0;
  v2 = 0;
  if ($("#" + anio + DR + "-SR3_T_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-SR3_T_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_T_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_T_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-SR3_T_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
  //VD3
  Total = 0;
  v1 = 0;
  v2 = 0;
  v3 = 0;
  v4 = 0;
  if ($("#" + anio + DR + "-VD3_GP_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_GP_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD3_GD_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD3_GD_E").text()).value();
  }

  if ($("#" + anio + DR + "-VD3_BC_E").text() !== "") {
    v3 = numeral($("#" + anio + DR + "-VD3_BC_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD3_BP_E").text() !== "") {
    v4 = numeral($("#" + anio + DR + "-VD3_BP_E").text()).value();
  }

  Total = parseFloat(v1 + v2 + v3 + v4).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD3_T_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  Total = parseFloat(v1 + v2 + v3 + v4).toFixed(1);
  if ($("#" + anio + DR + "-VD3_GP_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_GP_P").text()).value();
  }
  if ($("#" + anio + DR + "-VD3_GD_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD3_GD_P").text()).value();
  }

  if ($("#" + anio + DR + "-VD3_BC_P").text() !== "") {
    v3 = numeral($("#" + anio + DR + "-VD3_BC_P").text()).value();
  }
  if ($("#" + anio + DR + "-VD3_BP_P").text() !== "") {
    v4 = numeral($("#" + anio + DR + "-VD3_BP_P").text()).value();
  }

  Total = parseFloat(v1 + v2 + v3 + v4).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD3_T_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  Total = 0;
  v1 = 0;
  v2 = 0;
  if ($("#" + anio + DR + "-VD3_T_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_T_E").text()).value();
  }
  if ($("#" + anio + DR + "-VD3_T_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-VD3_T_P").text()).value();
  }
  Total = parseFloat(v1 + v2).toFixed(1);
  if (Total > 0) {
    document.getElementById(anio + DR + "-VD3_T_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  //La3mina
  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD3_T_E").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_T_E").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_T_E").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_T_E").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La3_T_E").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD3_T_P").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_T_P").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_T_P").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_T_P").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La3_T_P").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }

  v1 = 0;
  v2 = 0;
  Total = 0;
  if ($("#" + anio + DR + "-VD3_T_T").text() !== "") {
    v1 = numeral($("#" + anio + DR + "-VD3_T_T").text()).value();
  }
  if ($("#" + anio + DR + "-SR3_T_T").text() !== "") {
    v2 = numeral($("#" + anio + DR + "-SR3_T_T").text()).value();
  }
  Total = parseFloat((v1 / v2) * 10).toFixed(1);
  if (isFinite(Total)) {
    document.getElementById(anio + DR + "-La3_T_T").innerHTML = numeral(
      Total
    ).format("0,0.00");
  }
}

/**
 *
 * @param {type} query
 * @returns {undefined}
 * Funcion para realizar las graficas de la secion siete
 */
async function grafica7(query) {
  var Anio = $("#Anios :selected").text();
  var cadena = "query=" + query + "&Accion=DistritosVol";
  $("#nav-01").innerHTML = "";
  $("#nav-01").append(
    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Análisis de superficies físicas regadas y volúmenes distribuidos, año agrícola: ' + Anio + '</h3></div>'
  );
  /**
   * Ajax para obtener los datos
   */
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/mapa.php",
    data: cadena,
    /*
     * Si el controlador devuelve una respuesta
     */
    success: function (resp) {
      /*
       * Se coloca la seccion del anio
       * Se colocan los canvas de las graficas
       */
      $("#nav-01").append('<div class="row">' +
        '<div class="col-sm">' +
        '<div style="background-color: #621132" class="btn-gob col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h5>Distribución de la superficie física regada por tipo de aprovechamiento, año agrícola: ' + Anio + '</h5></div>' +
        '<canvas id="G-7"></canvas>' +
        '</div>' +
        '<div class="col-sm">' +
        '<div style="background-color: #621132" class="btn-gob col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h5>Distribución porcentual de la intensidad en el uso de la tierra para la superficie física regada, año agrícola: ' + Anio + '</h5></div>' +
        '<canvas id="G-7-3"></canvas>' +
        '</div></div>'
      );
      /**
       *
       * @type Number
       * Variables que guardan los valores de la consulta
       */
      var total = 0;
      var GP = 0;
      var GD = 0;
      var BP = 0;
      var BC = 0;
      var T1 = 0;
      var T2 = 0;
      /**
       * Se itera sobre los valores resultantes de la consulta
       */
      $.each(JSON.parse(resp), function (index, item) {
        total += parseFloat(item.Total);
        T1 += parseFloat(item.Total1);
        T2 += parseFloat(item.Total2);
        /*
         * Switch para determinar el tipo de fuente
         */
        switch (item.fuente_id) {
          case "1":
            GP = item.Total;
            break;
          case "2":
            GD = item.Total;
            break;
          case "3":
            BP = item.Total;
            break;
          case "4":
            BC = item.Total;
            break;
        }
      });
      /*
       * Se crea la grafica Distribución de la superficie física regada por tipo de aprovechamiento. con ChartJs
       */
      var element = "G-7";
      new Chart(document.getElementById(element), {
        type: "pie",
        data: {
          /**
           * Se colocan las etiquetas
           */
          labels: [
            "Gravedad presas",
            "Gravedad derivación",
            "Bombeo pozos",
            "Bombeo corrientes",
          ],
          datasets: [
            {
              /*
               * Se colocan los datos
               */
              backgroundColor: ["#154360", "#2ECC71", "#E74C3C", "#F1C40F"],
              data: [
                ((GP * 100) / total).toFixed(2),
                ((GD * 100) / total).toFixed(2),
                ((BP * 100) / total).toFixed(2),
                ((BC * 100) / total).toFixed(2),
              ],
            },
          ],
        },
        options: {
          title: {
            display: true,
          },
        },
      });
      /*
       * Se crea la grafica Distribución de la superficie física regada por tipo de aprovechamientoDistribución porcentual de la intensidad en el uso de la tierra para la superficie física regada con ChartJs
       */
      element = "G-7-3";
      new Chart(document.getElementById(element), {
        type: "pie",
        data: {
          labels: ["Una vez", "Dos veces"],
          datasets: [
            {
              backgroundColor: ["#154360", "#2ECC71"],
              data: [
                ((T1 * 100) / total).toFixed(2),
                ((T2 * 100) / total).toFixed(2),
              ],
            },
          ],
        },
        options: {
          title: {
            display: true,
          },
        },
      });
    },
  }).always(function () {
    Swal.close();
  });
}


function fnExcelReport(IDTABLA) {
  var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
  var textRange; var j = 0;
  tab = document.getElementById(IDTABLA); // id of table

  for (j = 0; j < tab.rows.length; j++) {
    tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
    //tab_text=tab_text+"</tr>";
  }

  tab_text = tab_text + "</table>";
  tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
  tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
  tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
  {
    txtArea1.document.open("txt/html", "replace");
    txtArea1.document.write(tab_text);
    txtArea1.document.close();
    txtArea1.focus();
    sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");
  }
  else                 //other browser not tested on IE 11
    sa = window.open('data:application/vnd.ms-Excel,' + encodeURIComponent(tab_text));

  console.log(sa);

  return (sa);
}