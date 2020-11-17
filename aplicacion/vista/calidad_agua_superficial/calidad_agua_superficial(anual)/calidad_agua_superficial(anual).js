/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */

/**
 * Se aplica el estilo al select de organismo de cuenca
 */
$("#Organismos").multiselect({
  columns: 1,
  search: true,
  selectAll: true,
  texts: {
    placeholder: "Seleccione un Organismo de Cuenca",
    search: "Buscar Organismos de Cuenca",
  },
});
/**
 * Se aplica el estilo para el select de los estados
 */
$("#Estados").multiselect({
  columns: 1,
  search: true,
  selectAll: true,
  texts: {
    placeholder: "Seleccione un Estado",
    search: "Buscar Estado",
  },
});
/**
 * Se aplica el estilo al select de los acuiferos
 */
$("#Sitios").multiselect({
  columns: 1,
  search: true,
  selectAll: true,
  texts: {
    placeholder: "Seleccione un Monitoreo",
    search: "Buscar Sitio de Monitoreo",
  },
});
/**
 * Se aplica el estilo al select de los municipio
 */
$("#Municipios").multiselect({
  columns: 1,
  search: true,
  selectAll: true,
  texts: {
    placeholder: "Seleccione un Municipio",
    search: "Buscar Municipio",
  },
});
var query = '';

async function Anios() {
  await limpiarOrganismos();
  Organismos();
}
/**
* Esta función controla todos los cambios del select de organismos de cuenca.
* La función básicamente lo que realiza es leer todas las opciones seleccionadas desde la vista,
* limpia las capas del mapa, limpia los select que dependen de él, prepara una sentencia MySQL y
* retorna en este caso los estados que dependen de un organismo de cuenta además de los shapes de los organismos.
* @constructor
*/
async function Organismos() {
  Swal.fire({
    title: "Por favor espere", // add html attribute if you want or remove
    html: "Cargando Datos",
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
  /**
   * Esta línea de código llama a la función que limpia la capa de organismos de cuenca
   */
  await limpiarOrganismos();
  /**
   * @type {string}
   * La variable query nos permite guardar la sentencia SQL para consultar los estados
   */
  const query = await concatOrganismo();
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
    const cadena = "query=" + query + "&Accion=Estados";
    var data = [];
    /**
     * Se manda a llamar por medio de Ajax a la función de estados en el controlador de mapa
     */
    $.ajax({
      type: "POST",
      url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
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
* Esta función controla todos los cambios del select de estados.
* La función básicamente lo que realiza es leer todas las opciones seleccionadas desde la vista,
* limpia las capas del mapa, limpia los select que dependen de él, prepara una sentencia MySQL y
* retorna en este caso los acuiferos que dependen de un organismo de cuenta además de los shapes de los organismos.
* @constructor
*/
async function Estados() {
  Swal.fire({
    title: "Por favor espere", // add html attribute if you want or remove
    html: "Cargando Datos",
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
  /**
   * Esta línea de código llama a la función que limpia la capa de organismos de cuenca
   */
  await limpiarEstados();
  const query = await concatEstado();
  if (query !== "") {
    /**
     * @type {string}
     * Se crea una cadena que es la que se va a enviar por medio de Ajax,
     * este contiene tanto el query anteriormente descrito como la acción que va realizar en el controlador de mapa
     */
    const cadena = "query=" + query + "&Accion=&Accion=Municipios";
    var data = [];
    /**
     * Se manda a llamar por medio de Ajax a la función de estados en el controlador de mapa
     */
    $.ajax({
      type: "POST",
      url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
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
           * Por medio del plugin de multiselect, podemos agregar los objetos del array al select de acuiferos
           */
          data.push({
            name: item.municipio,
            value: item.id_municipio,
            checked: false,
          });
        });
        $("#Municipios").multiselect("loadOptions", data);
      },
    }).always(function () {
      Swal.close();
    });
  } else {
    Swal.close();
  }
}

/**
* Funcion que limpia la capa de organimos asi como de las capas que dependen directamente de ellas
*/
async function limpiarOrganismos() {
  /**
   * Limpia la capa de la cual dependen de organismos
   */
  $("#Estados").multiselect("reset");
  await limpiarEstados();
}

/**
 * Funcion para limpiar la capa de estados
 */
async function limpiarEstados() {
  /**
   * Llamos a limpiar acuifero
   */
  $("#Municipios").multiselect("reset");
  await limpiarMunicipio();
}

//Funcion para limpiar la capa de estadosim
async function limpiarMunicipio() {
  /**
   * Llamos a limpiar acuifero
   */
  $("#Acuiferos").multiselect("reset");
  await limpiarAcuifero();
}

/**
 * Funcion para limpiar la capa de acuiferos
 */
async function limpiarAcuifero() {
  /**
   * Limpia su porpia capa
   */
  map.off();
  map.remove();
  crearMapa();
  $("#Sitios").multiselect("reset");
  /**
   * Se limpia la tabla de acuiferos
   */
  //tablaOC.clear().draw();
  //tablaEst.clear().draw();
  //tablaMun.clear().draw();
  //tablaAcu.clear().draw();
  $("#pantalla").hide();
  $("#divPrioridad").hide();
  $("#botonMapa").hide();
}


/**
 * Funcion que concatena la cadena de los acuiferos seleccionadoss
 * @returns {Promise<string>}
 */
async function concatOrganismo() {
  var query = "(";
  /**
   * Se tiene que recorrer el select de organismos de cuenca para encontrar todos los elementos seleccionados.
   */
  if ($("#Organismos option:selected").val() != null) {
    $("#Organismos option:selected").each(function () {
      query += "id_organismo=" + $(this).val() + " or ";
    });
    query = query.slice(0, -3);
    query = query += ") AND (";
  }
  $("#Anios option:selected").each(async function () {
    query += "id_anio=" + $(this).val() + " or ";
  });
  /**
   * Al final el query quedara con un or al final, la siguiente línea quita ese or sobrante.
   * @type {string}
   */
  query = query.slice(0, -3);
  query = query += ") AND (";
  var indicador = $("#indicador :selected").val();
  query = query += indicador += " IS NOT NULL)";
  return query;
}

/**
 * Funcion que concatena los estados seleccionados del select
 * @returns {Promise<string>}
 */
async function concatEstado() {
  var query = "(";
  /**
   * Se tiene que recorrer el select de organismos de cuenca para encontrar todos los elementos seleccionados.
   */
  $("#Organismos option:selected").each(function () {
    query += "id_organismo=" + $(this).val() + " or ";
  });
  query = query.slice(0, -3);
  query = query += ") AND (";
  $("#Estados option:selected").each(function () {
    query += "id_estado=" + $(this).val() + " or ";
  });
  query = query.slice(0, -3);
  query = query += ") AND (";
  $("#Anios option:selected").each(async function () {
    query += "id_anio=" + $(this).val() + " or ";
  });
  /**
   * Al final el query quedara con un or al final, la siguiente línea quita ese or sobrante.
   * @type {string}
   */
  query = query.slice(0, -3);
  query = query += ") AND (";
  var indicador = $("#indicador :selected").val();
  query = query += indicador += " IS NOT NULL)";
  return query;
}

async function getPuntosMonitoreo() {
  Swal.fire({
    title: "Por favor espere", // add html attribute if you want or remove
    html: "Cargando Datos",
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
  var query = "(";
  /**
   * Se tiene que recorrer el select de organismos de cuenca para encontrar todos los elementos seleccionados.
   */
  $("#Organismos option:selected").each(function () {
    query += "id_organismo=" + $(this).val() + " or ";
  });
  query = query.slice(0, -3);
  query = query += ") AND (";
  $("#Estados option:selected").each(function () {
    query += "id_estado=" + $(this).val() + " or ";
  });
  query = query.slice(0, -3);
  query = query += ") AND (";
  //Municipios
  if ($("#Municipios option:selected").val() != null) {
    //Se recorre el select de tipos.
    $("#Municipios option:selected").each(function () {
      query += 'id_municipio=' + $(this).val() + ' or ';
    });
  }
  //Años
  if ($("#Anios option:selected").val() != null) {
    query = query.slice(0, -4);
    query += ") AND (";
    //Se recorre el select de tipos.
    $("#Anios option:selected").each(function () {
      query += "id_anio=" + $(this).val() + " or ";
    });
  }
  query = query.slice(0, -4);
  query = query += ") AND (";
  var indicador = $("#indicador :selected").val();
  query = query += indicador += " IS NOT NULL)";
  //console.log(query);
  const cadena = "query=" + query + "&Accion=getSitiosConsulta";
  var data = [];
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
    data: cadena,
    //Si el controlador devuelve una respuesta
    success: function (resp) {
      $("#Sitios").multiselect("reset");
      $.each(JSON.parse(resp), function (index, item) {
        data.push({
          name: item.nom_sitio,
          value: item.id_sitio,
          checked: false,
        });
      });
      $("#Sitios").multiselect("loadOptions", data);
    },
  }).always(function () {
    Swal.close();
  });
}



async function Consultar() {
  Swal.fire({
    title: "Por favor espere", // add html attribute if you want or remove
    html: "Realizando la consulta",
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
  $('#nav-tab-acu a[href="#nav-01"]').tab("show");
  document.getElementById("nav-01").innerHTML = "";
  document.getElementById("nav-02").innerHTML = "";
  document.getElementById("nav-03").innerHTML = "";
  document.getElementById("nav-04").innerHTML = "";
  document.getElementById("nav-01-tab").innerHTML = "";
  document.getElementById("nav-02-tab").innerHTML = "";
  document.getElementById("nav-03-tab").innerHTML = "";
  document.getElementById("nav-04-tab").innerHTML = "";
  $("#nav-01-tab").append(
    'Distribución porcentual por Organismo de Cuenca'
  );
  $("#nav-02-tab").append(
    'Estaciones de monitoreo'
  );
  $("#nav-03-tab").append(
    'Distribución porcentual por Estado'
  );
  $("#nav-04-tab").append(
    'Distribución porcentual por Municipio'
  );
  await deshabilitar();
  await map.off();
  await map.remove();
  crearMapa();

  //Ontenemos los valores
  const OC = await selectOrganismo();
  const Est = await selectEst();
  const Mun = await selectMun();
  const Anio = await selectAnio();
  const Clave = await selectClave();
  if (OC !== "" && Est !== "" && Mun !== "" && Anio !== "" && Clave !== "") {
    query = "(" +
      OC +
      ") AND (" +
      Est +
      ") AND (" +
      Mun +
      ") AND (" +
      Anio +
      ") AND (" +
      Clave +
      ")";
    var indicador = $("#indicador :selected").val();
    switch (indicador) {
      case 'DBO_TOT':
        await distribucion1(query);
        break;
      case 'DQO_TOT':
        await distribucion2(query);
        break;
      case 'SST':
        await distribucion3(query);
        break;
      case 'COLI_FEC':
        await distribucion4(query);
        break;
    }
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
    await habilitar();
  } else {
    /**
     *
     * @returns {Promise<void>}
     * Si algun selector esta vacio, se muestra un mensaje de error.
     *
     */
    swal(
      "Algo está mal.",
      "Todos los filtros tienen que tener al menos un elemento seleccionado"
    );
    await habilitar();
    $("#pantalla").hide();
    $("#botonMapa").hide();
    $("#referencias").hide();
    await Swal.close();
  }
}

async function distribucion1(query) {
  /**
   * Se limpian todas las secciones del html en caso de que exista contenido
   */
  $("#nav-01").append(
    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Distribución porcentual por Organismo de Cuenca Demanda Bioquímica de Oxígeno</h3></div>'
  );
  /**
   * Tabla Oc
   */
  var query2 = query + ' AND valor is NOT NULL GROUP BY organismo ORDER BY oc_clave';
  var cadena = "query=" + query2 + "&Accion=distribucionDBO5";
  //Funcion para la tabla1
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
    data: cadena,
    success: async function (resp) {
      var data = [];
      var Excelente = 0;
      var Buena = 0;
      var Aceptable = 0;
      var Contaminada = 0;
      var Fuerte = 0;
      var Total = 0;
      $.each(JSON.parse(resp), function (index, item) {
        data.push([
          item.oc_clave + ' - ' + item.organismo,
          numeral((item.Excelente / item.total)).format("0.00%"),
          numeral((item.Buena_Calidad / item.total)).format("0.00%"),
          numeral((item.Aceptable / item.total)).format("0.00%"),
          numeral((item.Contaminada / item.total)).format("0.00%"),
          numeral((item.Fuertemente_Contaminada / item.total)).format("0.00%"),
        ]);
        Excelente += parseFloat(item.Excelente);
        Buena += parseFloat(item.Buena_Calidad);
        Aceptable += parseFloat(item.Aceptable);
        Contaminada += parseFloat(item.Contaminada);
        Fuerte += parseFloat(item.Fuertemente_Contaminada);
        Total += parseFloat(item.total);
      });
      if (data.length > 0) {
        $("#nav-01").append(
          '<table id="DBO5" class="table table-bordered responsive nowrap" style="width:100%">' +
          '<thead>' +
          '<tr>' +
          '<th>Organismo de Cuenca</th>' +
          '<th style="background-color:#2874a6;color:white">Excelente</th>' +
          '<th style="background-color:#239b56;color:white">Buena Calidad</th>' +
          '<th style="background-color:#f1c40f;color:white">Aceptable</th>' +
          '<th style="background-color: #e67e22 ;color:white">Contaminada</th>' +
          '<th style="background-color:#c0392b;color:white">Fuertemente Contaminada</th>' +
          '</tr>' +
          '</thead>' +
          "<tfoot><tr>" +
          /**
           * Se colocan los totales antes obtenidos
           */
          '<td style="background-color:#CCD1D1" align="center"><b>Nacional</b></th>' +
          '<td style="background-color:#2874a6;color:white" align="right"><b>' +
          numeral((Excelente / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#239b56;color:white" align="right"><b>' +
          numeral((Buena / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#f1c40f;color:white" align="right"><b>' +
          numeral((Aceptable / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color: #e67e22 ;color:white" align="right"><b>' +
          numeral((Contaminada / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#c0392b;color:white" align="right" ><b>' +
          numeral((Fuerte / Total)).format("0.00%") +
          "</b></td>" +
          "</tr></tfoot></table><br>"
        );
        $("#DBO5").DataTable({
          /*
           *
           * Se crean las columnas que van a ir en la tabla
           *
           */
          columnDefs: [
            { className: 'dt-body-right', targets: [1, 2, 3, 4, 5] },
          ],
          /**
           * Se colocan los datos obenidos
           */
          data: data,
          pageLength: 13,
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
                "Distribución porcentual por Organismo de Cuenca Demanda Bioquímica de Oxígeno",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
            {
              extend: "pdfHtml5",
              title:
                "Distribución porcentual por Organismo de Cuenca Demanda Bioquímica de Oxígeno",
              className: "btn btn-gob btn-sm",
              text: "Exportar PDF",
              //messageBottom: citas,
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
                          "Distribución porcentual por Organismo de Cuenca Demanda Bioquímica de Oxígeno",
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
    },
  }).always(async function () {
    await Swal.close();
  });
}

async function distribucion1Est(query) {
  $("#nav-03").append(
    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Distribución porcentual por Estado Demanda Bioquímica de Oxígeno</h3></div>'
  );
  /**
   * Tabla Estado
   */
  var query2 = query + ' AND valor is NOT NULL GROUP BY estado_id ORDER BY estado';
  var cadena = "query=" + query2 + "&Accion=distribucionDBO5";
  //Funcion para la tabla1
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
    data: cadena,
    success: async function (resp) {
      var data = [];
      var Excelente = 0;
      var Buena = 0;
      var Aceptable = 0;
      var Contaminada = 0;
      var Fuerte = 0;
      var Total = 0;
      $.each(JSON.parse(resp), function (index, item) {
        data.push([
          item.estado,
          numeral((item.Excelente / item.total)).format("0.00%"),
          numeral((item.Buena_Calidad / item.total)).format("0.00%"),
          numeral((item.Aceptable / item.total)).format("0.00%"),
          numeral((item.Contaminada / item.total)).format("0.00%"),
          numeral((item.Fuertemente_Contaminada / item.total)).format("0.00%"),
        ]);
        Excelente += parseFloat(item.Excelente);
        Buena += parseFloat(item.Buena_Calidad);
        Aceptable += parseFloat(item.Aceptable);
        Contaminada += parseFloat(item.Contaminada);
        Fuerte += parseFloat(item.Fuertemente_Contaminada);
        Total += parseFloat(item.total);
      });
      if (data.length > 0) {
        $("#nav-03").append(
          '<table id="DBO5Est" class="table table-bordered responsive nowrap" style="width:100%">' +
          '<thead>' +
          '<tr>' +
          '<th>Estado</th>' +
          '<th style="background-color:#2874a6;color:white">Excelente</th>' +
          '<th style="background-color:#239b56;color:white">Buena Calidad</th>' +
          '<th style="background-color:#f1c40f;color:white">Aceptable</th>' +
          '<th style="background-color: #e67e22 ;color:white">Contaminada</th>' +
          '<th style="background-color:#c0392b;color:white">Fuertemente Contaminada</th>' +
          '</tr>' +
          '</thead>' +
          "<tfoot><tr>" +
          /**
           * Se colocan los totales antes obtenidos
           */
          '<td style="background-color:#CCD1D1" align="center"><b>Nacional</b></th>' +
          '<td style="background-color:#2874a6;color:white" align="right"><b>' +
          numeral((Excelente / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#239b56;color:white" align="right"><b>' +
          numeral((Buena / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#f1c40f;color:white" align="right"><b>' +
          numeral((Aceptable / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color: #e67e22 ;color:white" align="right"><b>' +
          numeral((Contaminada / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#c0392b;color:white" align="right" ><b>' +
          numeral((Fuerte / Total)).format("0.00%") +
          "</b></td>" +
          "</tr></tfoot></table><br>"
        );
        $("#DBO5Est").DataTable({
          /*
           *
           * Se crean las columnas que van a ir en la tabla
           *
           */
          columnDefs: [
            { className: 'dt-body-right', targets: [1, 2, 3, 4, 5] },
          ],
          /**
           * Se colocan los datos obenidos
           */
          data: data,
          pageLength: 32,
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
                "Distribución porcentual por Estado Demanda Bioquímica de Oxígeno",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
            {
              extend: "pdfHtml5",
              title:
                "Distribución porcentual por Estado Bioquímica de Oxígeno",
              className: "btn btn-gob btn-sm",
              text: "Exportar PDF",
              //messageBottom: citas,
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
                          "Distribución porcentual por Estado Demanda Bioquímica de Oxígeno",
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
    },
  }).always(async function () {
    await Swal.close();
  });
}

async function distribucion1Mun(query) {
  $("#nav-04").append(
    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Distribución porcentual por Municipio Demanda Bioquímica de Oxígeno</h3></div>'
  );
  /**
  * Tabla Muni
  */
  var query2 = query + ' AND valor is NOT NULL GROUP BY municipio_id ORDER BY estado,municipio';
  var cadena = "query=" + query2 + "&Accion=distribucionDBO5";
  //Funcion para la tabla1
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
    data: cadena,
    success: async function (resp) {
      var data = [];
      var Excelente = 0;
      var Buena = 0;
      var Aceptable = 0;
      var Contaminada = 0;
      var Fuerte = 0;
      var Total = 0;
      $.each(JSON.parse(resp), function (index, item) {
        data.push([
          item.estado,
          item.municipio,
          numeral((item.Excelente / item.total)).format("0.00%"),
          numeral((item.Buena_Calidad / item.total)).format("0.00%"),
          numeral((item.Aceptable / item.total)).format("0.00%"),
          numeral((item.Contaminada / item.total)).format("0.00%"),
          numeral((item.Fuertemente_Contaminada / item.total)).format("0.00%"),
        ]);
        Excelente += parseFloat(item.Excelente);
        Buena += parseFloat(item.Buena_Calidad);
        Aceptable += parseFloat(item.Aceptable);
        Contaminada += parseFloat(item.Contaminada);
        Fuerte += parseFloat(item.Fuertemente_Contaminada);
        Total += parseFloat(item.total);
      });
      if (data.length > 0) {
        $("#nav-04").append(
          '<table id="DBO5Mun" class="table table-bordered responsive nowrap" style="width:100%">' +
          '<thead>' +
          '<tr>' +
          '<th>Estado</th>' +
          '<th>Municipio</th>' +
          '<th style="background-color:#2874a6;color:white">Excelente</th>' +
          '<th style="background-color:#239b56;color:white">Buena Calidad</th>' +
          '<th style="background-color:#f1c40f;color:white">Aceptable</th>' +
          '<th style="background-color: #e67e22 ;color:white">Contaminada</th>' +
          '<th style="background-color:#c0392b;color:white">Fuertemente Contaminada</th>' +
          '</tr>' +
          '</thead>' +
          "<tfoot><tr>" +
          /**
           * Se colocan los totales antes obtenidos
           */
          '<td style="background-color:#CCD1D1" align="center"><b>Nacional</b></th>' +
          '<td style="background-color:#CCD1D1" align="center"><b></b></th>' +
          '<td style="background-color:#2874a6;color:white" align="right"><b>' +
          numeral((Excelente / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#239b56;color:white" align="right"><b>' +
          numeral((Buena / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#f1c40f;color:white" align="right"><b>' +
          numeral((Aceptable / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color: #e67e22 ;color:white" align="right"><b>' +
          numeral((Contaminada / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#c0392b;color:white" align="right" ><b>' +
          numeral((Fuerte / Total)).format("0.00%") +
          "</b></td>" +
          "</tr></tfoot></table><br>"
        );
        $("#DBO5Mun").DataTable({
          /*
           *
           * Se crean las columnas que van a ir en la tabla
           *
           */
          columnDefs: [
            { className: 'dt-body-right', targets: [2, 3, 4, 5, 6] },
          ],
          /**
           * Se colocan los datos obenidos
           */
          data: data,
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
                "Distribución porcentual por Municipio Demanda Bioquímica de Oxígeno",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
            {
              extend: "pdfHtml5",
              title:
                "Distribución porcentual por Municipio Bioquímica de Oxígeno",
              className: "btn btn-gob btn-sm",
              text: "Exportar PDF",
              //messageBottom: citas,
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
                          "Distribución porcentual por Municipio Demanda Bioquímica de Oxígeno",
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
    },
  }).always(async function () {
    await Swal.close();
  });
}

async function distribucion1Estacion(query) {
  $("#nav-02").append(
    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Estaciones de monitoreo Demanda Bioquímica de Oxígeno</h3></div>'
  );
  /**
   * Tabla Estaciones
   */
  var query2 = query + ' AND valor is NOT NULL GROUP BY Clave ORDER BY Clave';
  var cadena = "query=" + query2 + "&Accion=distribucionDBO5Estaciones";
  //Funcion para la tabla1
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
    data: cadena,
    success: async function (resp2) {
      var data2 = [];
      $.each(JSON.parse(resp2), function (index, item) {
        data2.push([
          index + 1,
          item.Clave,
          item.Estacion,
          item.Sistema,
          item.Clasificacion,
          numeral(item.Valor).format("0.00"),
          item.Indicador_de_calidad,
          item.Siglas,
          item.color
        ]);
      });

      if (data2.length > 0) {
        $("#nav-02").append(
          '<table id="DBO5Estaciones" class="table table-bordered responsive nowrap" style="width:100%">' +
          '</table><br>'
        );
        $("#DBO5Estaciones").DataTable({
          /*
           *
           * Se crean las columnas que van a ir en la tabla
           *
           */
          columns: [
            {
              title: "N°",
            },
            {
              title: "Clave",
            },
            {
              title: "Estación",
            },
            {
              title: "Sistema",
            },
            {
              title: "Clasificación",
            },
            {
              title: "Valor",
            },
            {
              title: "Indicador de calidad",
            },
            {
              title: "Siglas",
            },
          ],
          columnDefs: [
            { className: 'dt-body-right', targets: [5] },
            {
              targets: 4,
              render: function (data, type, row) {
                var color = 'black';
                if (data == 'Excelente') {
                  color = '#2874a6';
                }
                if (data == 'Buena Calidad') {
                  color = '#239b56';
                }
                if (data == 'Aceptable') {
                  color = '#f1c40f';
                }
                if (data == 'Contaminada') {
                  color = '#e67e22';
                }
                if (data == 'Fuertemente contaminada') {
                  color = '#c0392b';
                }
                return '<b style="color:' + color + '">' + data + '</b>';
              }
            }
          ],
          /**
           * Se colocan los datos obenidos
           */
          data: data2,
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
                "Estaciones de monitoreo Demanda Bioquímica de Oxígeno",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
            {
              extend: "pdfHtml5",
              title:
                "Estaciones de monitoreo Demanda Bioquímica de Oxígeno",
              className: "btn btn-gob btn-sm",
              text: "Exportar PDF",
              //messageBottom: citas,
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
                          "Estaciones de monitoreo Demanda Bioquímica de Oxígeno",
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
    },
  }).always(async function () {
    await Swal.close();
  });
}

async function distribucion2(query) {
  /**
   * Se limpian todas las secciones del html en caso de que exista contenido
   */
  $("#nav-01").append(
    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Distribución porcentual por Organismo de Cuenca Demanda Química de Oxígeno</h3></div>'
  );
  /**
   * Tabla Oc
   */
  var query2 = query + ' AND valor is NOT NULL GROUP BY organismo ORDER BY oc_clave';
  var cadena = "query=" + query2 + "&Accion=distribucionDQO";
  //Funcion para la tabla1
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
    data: cadena,
    success: async function (resp) {
      var data = [];
      var Excelente = 0;
      var Buena = 0;
      var Aceptable = 0;
      var Contaminada = 0;
      var Fuerte = 0;
      var Total = 0;
      $.each(JSON.parse(resp), function (index, item) {
        data.push([
          item.oc_clave + ' - ' + item.organismo,
          numeral((item.Excelente / item.total)).format("0.00%"),
          numeral((item.Buena_Calidad / item.total)).format("0.00%"),
          numeral((item.Aceptable / item.total)).format("0.00%"),
          numeral((item.Contaminada / item.total)).format("0.00%"),
          numeral((item.Fuertemente_Contaminada / item.total)).format("0.00%"),
        ]);
        Excelente += parseFloat(item.Excelente);
        Buena += parseFloat(item.Buena_Calidad);
        Aceptable += parseFloat(item.Aceptable);
        Contaminada += parseFloat(item.Contaminada);
        Fuerte += parseFloat(item.Fuertemente_Contaminada);
        Total += parseFloat(item.total);
      });
      if (data.length > 0) {
        $("#nav-01").append(
          '<table id="DQO" class="table table-bordered responsive nowrap" style="width:100%">' +
          '<thead>' +
          '<tr>' +
          '<th>Organismo de Cuenca</th>' +
          '<th style="background-color:#2874a6;color:white">Excelente</th>' +
          '<th style="background-color:#239b56;color:white">Buena Calidad</th>' +
          '<th style="background-color:#f1c40f;color:white">Aceptable</th>' +
          '<th style="background-color: #e67e22 ;color:white">Contaminada</th>' +
          '<th style="background-color:#c0392b;color:white">Fuertemente Contaminada</th>' +
          '</tr>' +
          '</thead>' +
          "<tfoot><tr>" +
          /**
           * Se colocan los totales antes obtenidos
           */
          '<td style="background-color:#CCD1D1" align="center"><b>Nacional</b></th>' +
          '<td style="background-color:#2874a6;color:white" align="right"><b>' +
          numeral((Excelente / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#239b56;color:white" align="right"><b>' +
          numeral((Buena / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#f1c40f;color:white" align="right"><b>' +
          numeral((Aceptable / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color: #e67e22 ;color:white" align="right"><b>' +
          numeral((Contaminada / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#c0392b;color:white" align="right" ><b>' +
          numeral((Fuerte / Total)).format("0.00%") +
          "</b></td>" +
          "</tr></tfoot></table><br>"
        );
        $("#DQO").DataTable({
          /*
           *
           * Se crean las columnas que van a ir en la tabla
           *
           */
          columnDefs: [
            { className: 'dt-body-right', targets: [1, 2, 3, 4, 5] },
          ],
          /**
           * Se colocan los datos obenidos
           */
          data: data,
          pageLength: 13,
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
                "Distribución porcentual por Organismo de Cuenca Demanda Química de Oxígeno",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
            {
              extend: "pdfHtml5",
              title:
                "Distribución porcentual por Organismo de Cuenca Demanda Química de Oxígeno",
              className: "btn btn-gob btn-sm",
              text: "Exportar PDF",
              //messageBottom: citas,
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
                          "Distribución porcentual por Organismo de Cuenca Demanda Química de Oxígeno",
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
    },
  }).always(async function () {
    await Swal.close();
  });
}

async function distribucion2Est(query) {
  $("#nav-03").append(
    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Distribución porcentual por Estado Demanda Química de Oxígeno</h3></div>'
  );
  /**
   * Tabla Estado
   */
  var query2 = query + ' AND valor is NOT NULL GROUP BY estado_id ORDER BY estado';
  var cadena = "query=" + query2 + "&Accion=distribucionDQO";
  //Funcion para la tabla1
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
    data: cadena,
    success: async function (resp) {
      var data = [];
      var Excelente = 0;
      var Buena = 0;
      var Aceptable = 0;
      var Contaminada = 0;
      var Fuerte = 0;
      var Total = 0;
      $.each(JSON.parse(resp), function (index, item) {
        data.push([
          item.estado,
          numeral((item.Excelente / item.total)).format("0.00%"),
          numeral((item.Buena_Calidad / item.total)).format("0.00%"),
          numeral((item.Aceptable / item.total)).format("0.00%"),
          numeral((item.Contaminada / item.total)).format("0.00%"),
          numeral((item.Fuertemente_Contaminada / item.total)).format("0.00%"),
        ]);
        Excelente += parseFloat(item.Excelente);
        Buena += parseFloat(item.Buena_Calidad);
        Aceptable += parseFloat(item.Aceptable);
        Contaminada += parseFloat(item.Contaminada);
        Fuerte += parseFloat(item.Fuertemente_Contaminada);
        Total += parseFloat(item.total);
      });
      if (data.length > 0) {
        $("#nav-03").append(
          '<table id="DQOEst" class="table table-bordered responsive nowrap" style="width:100%">' +
          '<thead>' +
          '<tr>' +
          '<th>Estado</th>' +
          '<th style="background-color:#2874a6;color:white">Excelente</th>' +
          '<th style="background-color:#239b56;color:white">Buena Calidad</th>' +
          '<th style="background-color:#f1c40f;color:white">Aceptable</th>' +
          '<th style="background-color: #e67e22 ;color:white">Contaminada</th>' +
          '<th style="background-color:#c0392b;color:white">Fuertemente Contaminada</th>' +
          '</tr>' +
          '</thead>' +
          "<tfoot><tr>" +
          /**
           * Se colocan los totales antes obtenidos
           */
          '<td style="background-color:#CCD1D1" align="center"><b>Nacional</b></th>' +
          '<td style="background-color:#2874a6;color:white" align="right"><b>' +
          numeral((Excelente / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#239b56;color:white" align="right"><b>' +
          numeral((Buena / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#f1c40f;color:white" align="right"><b>' +
          numeral((Aceptable / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color: #e67e22 ;color:white" align="right"><b>' +
          numeral((Contaminada / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#c0392b;color:white" align="right" ><b>' +
          numeral((Fuerte / Total)).format("0.00%") +
          "</b></td>" +
          "</tr></tfoot></table><br>"
        );
        $("#DQOEst").DataTable({
          /*
           *
           * Se crean las columnas que van a ir en la tabla
           *
           */
          columnDefs: [
            { className: 'dt-body-right', targets: [1, 2, 3, 4, 5] },
          ],
          /**
           * Se colocan los datos obenidos
           */
          data: data,
          pageLength: 32,
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
                "Distribución porcentual por Estado Demanda Química de Oxígeno",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
            {
              extend: "pdfHtml5",
              title:
                "Distribución porcentual por Estado Bioquímica de Oxígeno",
              className: "btn btn-gob btn-sm",
              text: "Exportar PDF",
              //messageBottom: citas,
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
                          "Distribución porcentual por Estado Demanda Química de Oxígeno",
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
    },
  }).always(async function () {
    await Swal.close();
  });
}

async function distribucion2Mun(query) {
  $("#nav-04").append(
    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Distribución porcentual por Municipio Demanda Química de Oxígeno</h3></div>'
  );
  /**
  * Tabla Muni
  */
  var query2 = query + ' AND valor is NOT NULL GROUP BY municipio_id ORDER BY estado,municipio';
  var cadena = "query=" + query2 + "&Accion=distribucionDQO";
  //Funcion para la tabla1
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
    data: cadena,
    success: async function (resp) {
      var data = [];
      var Excelente = 0;
      var Buena = 0;
      var Aceptable = 0;
      var Contaminada = 0;
      var Fuerte = 0;
      var Total = 0;
      $.each(JSON.parse(resp), function (index, item) {
        data.push([
          item.estado,
          item.municipio,
          numeral((item.Excelente / item.total)).format("0.00%"),
          numeral((item.Buena_Calidad / item.total)).format("0.00%"),
          numeral((item.Aceptable / item.total)).format("0.00%"),
          numeral((item.Contaminada / item.total)).format("0.00%"),
          numeral((item.Fuertemente_Contaminada / item.total)).format("0.00%"),
        ]);
        Excelente += parseFloat(item.Excelente);
        Buena += parseFloat(item.Buena_Calidad);
        Aceptable += parseFloat(item.Aceptable);
        Contaminada += parseFloat(item.Contaminada);
        Fuerte += parseFloat(item.Fuertemente_Contaminada);
        Total += parseFloat(item.total);
      });
      if (data.length > 0) {
        $("#nav-04").append(
          '<table id="DQOMun" class="table table-bordered responsive nowrap" style="width:100%">' +
          '<thead>' +
          '<tr>' +
          '<th>Estado</th>' +
          '<th>Municipio</th>' +
          '<th style="background-color:#2874a6;color:white">Excelente</th>' +
          '<th style="background-color:#239b56;color:white">Buena Calidad</th>' +
          '<th style="background-color:#f1c40f;color:white">Aceptable</th>' +
          '<th style="background-color: #e67e22 ;color:white">Contaminada</th>' +
          '<th style="background-color:#c0392b;color:white">Fuertemente Contaminada</th>' +
          '</tr>' +
          '</thead>' +
          "<tfoot><tr>" +
          /**
           * Se colocan los totales antes obtenidos
           */
          '<td style="background-color:#CCD1D1" align="center"><b>Nacional</b></th>' +
          '<td style="background-color:#CCD1D1" align="center"><b></b></th>' +
          '<td style="background-color:#2874a6;color:white" align="right"><b>' +
          numeral((Excelente / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#239b56;color:white" align="right"><b>' +
          numeral((Buena / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#f1c40f;color:white" align="right"><b>' +
          numeral((Aceptable / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color: #e67e22 ;color:white" align="right"><b>' +
          numeral((Contaminada / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#c0392b;color:white" align="right" ><b>' +
          numeral((Fuerte / Total)).format("0.00%") +
          "</b></td>" +
          "</tr></tfoot></table><br>"
        );
        $("#DQOMun").DataTable({
          /*
           *
           * Se crean las columnas que van a ir en la tabla
           *
           */
          columnDefs: [
            { className: 'dt-body-right', targets: [2, 3, 4, 5, 6] },
          ],
          /**
           * Se colocan los datos obenidos
           */
          data: data,
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
                "Distribución porcentual por Municipio Demanda Química de Oxígeno",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
            {
              extend: "pdfHtml5",
              title:
                "Distribución porcentual por Municipio Bioquímica de Oxígeno",
              className: "btn btn-gob btn-sm",
              text: "Exportar PDF",
              //messageBottom: citas,
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
                          "Distribución porcentual por Municipio Demanda Química de Oxígeno",
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
    },
  }).always(async function () {
    await Swal.close();
  });
}

async function distribucion2Estacion(query) {
  $("#nav-02").append(
    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Estaciones de monitoreo Demanda Química de Oxígeno</h3></div>'
  );
  /**
   * Tabla Estaciones
   */
  var query2 = query + ' AND valor is NOT NULL GROUP BY Clave ORDER BY Clave';
  var cadena = "query=" + query2 + "&Accion=distribucionDQOEstaciones";
  //Funcion para la tabla1
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
    data: cadena,
    success: async function (resp2) {
      var data2 = [];
      $.each(JSON.parse(resp2), function (index, item) {
        data2.push([
          index + 1,
          item.Clave,
          item.Estacion,
          item.Sistema,
          item.Clasificacion,
          numeral(item.Valor).format("0.00"),
          item.Indicador_de_calidad,
          item.Siglas,
          item.color
        ]);
      });

      if (data2.length > 0) {
        $("#nav-02").append(
          '<table id="DQOEstaciones" class="table table-bordered responsive nowrap" style="width:100%">' +
          '</table><br>'
        );
        $("#DQOEstaciones").DataTable({
          /*
           *
           * Se crean las columnas que van a ir en la tabla
           *
           */
          columns: [
            {
              title: "N°",
            },
            {
              title: "Clave",
            },
            {
              title: "Estación",
            },
            {
              title: "Sistema",
            },
            {
              title: "Clasificación",
            },
            {
              title: "Valor",
            },
            {
              title: "Indicador de calidad",
            },
            {
              title: "Siglas",
            },
          ],
          columnDefs: [
            { className: 'dt-body-right', targets: [5] },
            {
              targets: 4,
              render: function (data, type, row) {
                var color = 'black';
                if (data == 'Excelente') {
                  color = '#2874a6';
                }
                if (data == 'Buena Calidad') {
                  color = '#239b56';
                }
                if (data == 'Aceptable') {
                  color = '#f1c40f';
                }
                if (data == 'Contaminada') {
                  color = '#e67e22';
                }
                if (data == 'Fuertemente contaminada') {
                  color = '#c0392b';
                }
                return '<b style="color:' + color + '">' + data + '</b>';
              }
            }
          ],
          /**
           * Se colocan los datos obenidos
           */
          data: data2,
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
                "Estaciones de monitoreo Demanda Química de Oxígeno",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
            {
              extend: "pdfHtml5",
              title:
                "Estaciones de monitoreo Demanda Química de Oxígeno",
              className: "btn btn-gob btn-sm",
              text: "Exportar PDF",
              //messageBottom: citas,
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
                          "Estaciones de monitoreo Demanda Química de Oxígeno",
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
    },
  }).always(async function () {
    await Swal.close();
  });
}

async function distribucion3(query) {
  /**
   * Se limpian todas las secciones del html en caso de que exista contenido
   */
  $("#nav-01").append(
    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Distribución porcentual por Organismo de Cuenca Organismo de Cuenca Sólidos Suspendidos Totales</h3></div>'
  );
  /**
   * Tabla Oc
   */
  var query2 = query + ' AND valor is NOT NULL GROUP BY organismo ORDER BY oc_clave';
  var cadena = "query=" + query2 + "&Accion=distribucionSST";
  //Funcion para la tabla1
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
    data: cadena,
    success: async function (resp) {
      var data = [];
      var Excelente = 0;
      var Buena = 0;
      var Aceptable = 0;
      var Contaminada = 0;
      var Fuerte = 0;
      var Total = 0;
      $.each(JSON.parse(resp), function (index, item) {
        data.push([
          item.oc_clave + ' - ' + item.organismo,
          numeral((item.Excelente / item.total)).format("0.00%"),
          numeral((item.Buena_Calidad / item.total)).format("0.00%"),
          numeral((item.Aceptable / item.total)).format("0.00%"),
          numeral((item.Contaminada / item.total)).format("0.00%"),
          numeral((item.Fuertemente_Contaminada / item.total)).format("0.00%"),
        ]);
        Excelente += parseFloat(item.Excelente);
        Buena += parseFloat(item.Buena_Calidad);
        Aceptable += parseFloat(item.Aceptable);
        Contaminada += parseFloat(item.Contaminada);
        Fuerte += parseFloat(item.Fuertemente_Contaminada);
        Total += parseFloat(item.total);
      });
      if (data.length > 0) {
        $("#nav-01").append(
          '<table id="SST" class="table table-bordered responsive nowrap" style="width:100%">' +
          '<thead>' +
          '<tr>' +
          '<th>Organismo de Cuenca</th>' +
          '<th style="background-color:#2874a6;color:white">Excelente</th>' +
          '<th style="background-color:#239b56;color:white">Buena Calidad</th>' +
          '<th style="background-color:#f1c40f;color:white">Aceptable</th>' +
          '<th style="background-color: #e67e22 ;color:white">Contaminada</th>' +
          '<th style="background-color:#c0392b;color:white">Fuertemente Contaminada</th>' +
          '</tr>' +
          '</thead>' +
          "<tfoot><tr>" +
          /**
           * Se colocan los totales antes obtenidos
           */
          '<td style="background-color:#CCD1D1" align="center"><b>Nacional</b></th>' +
          '<td style="background-color:#2874a6;color:white" align="right"><b>' +
          numeral((Excelente / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#239b56;color:white" align="right"><b>' +
          numeral((Buena / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#f1c40f;color:white" align="right"><b>' +
          numeral((Aceptable / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color: #e67e22 ;color:white" align="right"><b>' +
          numeral((Contaminada / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#c0392b;color:white" align="right" ><b>' +
          numeral((Fuerte / Total)).format("0.00%") +
          "</b></td>" +
          "</tr></tfoot></table><br>"
        );
        $("#SST").DataTable({
          /*
           *
           * Se crean las columnas que van a ir en la tabla
           *
           */
          columnDefs: [
            { className: 'dt-body-right', targets: [1, 2, 3, 4, 5] },
          ],
          /**
           * Se colocan los datos obenidos
           */
          data: data,
          pageLength: 13,
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
                "Distribución porcentual por Organismo de Cuenca Organismo de Cuenca Sólidos Suspendidos Totales",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
            {
              extend: "pdfHtml5",
              title:
                "Distribución porcentual por Organismo de Cuenca Organismo de Cuenca Sólidos Suspendidos Totales",
              className: "btn btn-gob btn-sm",
              text: "Exportar PDF",
              //messageBottom: citas,
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
                          "Distribución porcentual por Organismo de Cuenca Organismo de Cuenca Sólidos Suspendidos Totales",
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
    },
  }).always(async function () {
    await Swal.close();
  });
}

async function distribucion3Est(query) {
  $("#nav-03").append(
    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Distribución porcentual por Estado Organismo de Cuenca Sólidos Suspendidos Totales</h3></div>'
  );
  /**
   * Tabla Estado
   */
  var query2 = query + ' AND valor is NOT NULL GROUP BY estado_id ORDER BY estado';
  var cadena = "query=" + query2 + "&Accion=distribucionSST";
  //Funcion para la tabla1
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
    data: cadena,
    success: async function (resp) {
      var data = [];
      var Excelente = 0;
      var Buena = 0;
      var Aceptable = 0;
      var Contaminada = 0;
      var Fuerte = 0;
      var Total = 0;
      $.each(JSON.parse(resp), function (index, item) {
        data.push([
          item.estado,
          numeral((item.Excelente / item.total)).format("0.00%"),
          numeral((item.Buena_Calidad / item.total)).format("0.00%"),
          numeral((item.Aceptable / item.total)).format("0.00%"),
          numeral((item.Contaminada / item.total)).format("0.00%"),
          numeral((item.Fuertemente_Contaminada / item.total)).format("0.00%"),
        ]);
        Excelente += parseFloat(item.Excelente);
        Buena += parseFloat(item.Buena_Calidad);
        Aceptable += parseFloat(item.Aceptable);
        Contaminada += parseFloat(item.Contaminada);
        Fuerte += parseFloat(item.Fuertemente_Contaminada);
        Total += parseFloat(item.total);
      });
      if (data.length > 0) {
        $("#nav-03").append(
          '<table id="SSTEst" class="table table-bordered responsive nowrap" style="width:100%">' +
          '<thead>' +
          '<tr>' +
          '<th>Estado</th>' +
          '<th style="background-color:#2874a6;color:white">Excelente</th>' +
          '<th style="background-color:#239b56;color:white">Buena Calidad</th>' +
          '<th style="background-color:#f1c40f;color:white">Aceptable</th>' +
          '<th style="background-color: #e67e22 ;color:white">Contaminada</th>' +
          '<th style="background-color:#c0392b;color:white">Fuertemente Contaminada</th>' +
          '</tr>' +
          '</thead>' +
          "<tfoot><tr>" +
          /**
           * Se colocan los totales antes obtenidos
           */
          '<td style="background-color:#CCD1D1" align="center"><b>Nacional</b></th>' +
          '<td style="background-color:#2874a6;color:white" align="right"><b>' +
          numeral((Excelente / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#239b56;color:white" align="right"><b>' +
          numeral((Buena / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#f1c40f;color:white" align="right"><b>' +
          numeral((Aceptable / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color: #e67e22 ;color:white" align="right"><b>' +
          numeral((Contaminada / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#c0392b;color:white" align="right" ><b>' +
          numeral((Fuerte / Total)).format("0.00%") +
          "</b></td>" +
          "</tr></tfoot></table><br>"
        );
        $("#SSTEst").DataTable({
          /*
           *
           * Se crean las columnas que van a ir en la tabla
           *
           */
          columnDefs: [
            { className: 'dt-body-right', targets: [1, 2, 3, 4, 5] },
          ],
          /**
           * Se colocan los datos obenidos
           */
          data: data,
          pageLength: 32,
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
                "Distribución porcentual por Estado Organismo de Cuenca Sólidos Suspendidos Totales",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
            {
              extend: "pdfHtml5",
              title:
                "Distribución porcentual por Estado Bioquímica de Oxígeno",
              className: "btn btn-gob btn-sm",
              text: "Exportar PDF",
              //messageBottom: citas,
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
                          "Distribución porcentual por Estado Organismo de Cuenca Sólidos Suspendidos Totales",
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
    },
  }).always(async function () {
    await Swal.close();
  });
}

async function distribucion3Mun(query) {
  $("#nav-04").append(
    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Distribución porcentual por Municipio Sólidos Suspendidos Totales</h3></div>'
  );
  /**
  * Tabla Muni
  */
  var query2 = query + ' AND valor is NOT NULL GROUP BY municipio_id ORDER BY estado,municipio';
  var cadena = "query=" + query2 + "&Accion=distribucionSST";
  //Funcion para la tabla1
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
    data: cadena,
    success: async function (resp) {
      var data = [];
      var Excelente = 0;
      var Buena = 0;
      var Aceptable = 0;
      var Contaminada = 0;
      var Fuerte = 0;
      var Total = 0;
      $.each(JSON.parse(resp), function (index, item) {
        data.push([
          item.estado,
          item.municipio,
          numeral((item.Excelente / item.total)).format("0.00%"),
          numeral((item.Buena_Calidad / item.total)).format("0.00%"),
          numeral((item.Aceptable / item.total)).format("0.00%"),
          numeral((item.Contaminada / item.total)).format("0.00%"),
          numeral((item.Fuertemente_Contaminada / item.total)).format("0.00%"),
        ]);
        Excelente += parseFloat(item.Excelente);
        Buena += parseFloat(item.Buena_Calidad);
        Aceptable += parseFloat(item.Aceptable);
        Contaminada += parseFloat(item.Contaminada);
        Fuerte += parseFloat(item.Fuertemente_Contaminada);
        Total += parseFloat(item.total);
      });
      if (data.length > 0) {
        $("#nav-04").append(
          '<table id="SSTMun" class="table table-bordered responsive nowrap" style="width:100%">' +
          '<thead>' +
          '<tr>' +
          '<th>Estado</th>' +
          '<th>Municipio</th>' +
          '<th style="background-color:#2874a6;color:white">Excelente</th>' +
          '<th style="background-color:#239b56;color:white">Buena Calidad</th>' +
          '<th style="background-color:#f1c40f;color:white">Aceptable</th>' +
          '<th style="background-color: #e67e22 ;color:white">Contaminada</th>' +
          '<th style="background-color:#c0392b;color:white">Fuertemente Contaminada</th>' +
          '</tr>' +
          '</thead>' +
          "<tfoot><tr>" +
          /**
           * Se colocan los totales antes obtenidos
           */
          '<td style="background-color:#CCD1D1" align="center"><b>Nacional</b></th>' +
          '<td style="background-color:#CCD1D1" align="center"><b></b></th>' +
          '<td style="background-color:#2874a6;color:white" align="right"><b>' +
          numeral((Excelente / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#239b56;color:white" align="right"><b>' +
          numeral((Buena / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#f1c40f;color:white" align="right"><b>' +
          numeral((Aceptable / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color: #e67e22 ;color:white" align="right"><b>' +
          numeral((Contaminada / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#c0392b;color:white" align="right" ><b>' +
          numeral((Fuerte / Total)).format("0.00%") +
          "</b></td>" +
          "</tr></tfoot></table><br>"
        );
        $("#SSTMun").DataTable({
          /*
           *
           * Se crean las columnas que van a ir en la tabla
           *
           */
          columnDefs: [
            { className: 'dt-body-right', targets: [2, 3, 4, 5, 6] },
          ],
          /**
           * Se colocan los datos obenidos
           */
          data: data,
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
                "Distribución porcentual por Municipio Sólidos Suspendidos Totales",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
            {
              extend: "pdfHtml5",
              title:
                "Distribución porcentual por Municipio Bioquímica de Oxígeno",
              className: "btn btn-gob btn-sm",
              text: "Exportar PDF",
              //messageBottom: citas,
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
                          "Distribución porcentual por Municipio Sólidos Suspendidos Totales",
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
    },
  }).always(async function () {
    await Swal.close();
  });
}

async function distribucion3Estacion(query) {
  $("#nav-02").append(
    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Estaciones de monitoreo Sólidos Suspendidos Totales</h3></div>'
  );
  /**
   * Tabla Estaciones
   */
  var query2 = query + ' AND valor is NOT NULL GROUP BY Clave ORDER BY Clave';
  var cadena = "query=" + query2 + "&Accion=distribucionSSTEstaciones";
  //Funcion para la tabla1
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
    data: cadena,
    success: async function (resp2) {
      var data2 = [];
      $.each(JSON.parse(resp2), function (index, item) {
        data2.push([
          index + 1,
          item.Clave,
          item.Estacion,
          item.Sistema,
          item.Clasificacion,
          numeral(item.Valor).format("0.00"),
          item.Indicador_de_calidad,
          item.Siglas,
          item.color
        ]);
      });

      if (data2.length > 0) {
        $("#nav-02").append(
          '<table id="SSTEstaciones" class="table table-bordered responsive nowrap" style="width:100%">' +
          '</table><br>'
        );
        $("#SSTEstaciones").DataTable({
          /*
           *
           * Se crean las columnas que van a ir en la tabla
           *
           */
          columns: [
            {
              title: "N°",
            },
            {
              title: "Clave",
            },
            {
              title: "Estación",
            },
            {
              title: "Sistema",
            },
            {
              title: "Clasificación",
            },
            {
              title: "Valor",
            },
            {
              title: "Indicador de calidad",
            },
            {
              title: "Siglas",
            },
          ],
          columnDefs: [
            { className: 'dt-body-right', targets: [5] },
            {
              targets: 4,
              render: function (data, type, row) {
                var color = 'black';
                if (data == 'Excelente') {
                  color = '#2874a6';
                }
                if (data == 'Buena Calidad') {
                  color = '#239b56';
                }
                if (data == 'Aceptable') {
                  color = '#f1c40f';
                }
                if (data == 'Contaminada') {
                  color = '#e67e22';
                }
                if (data == 'Fuertemente contaminada') {
                  color = '#c0392b';
                }
                return '<b style="color:' + color + '">' + data + '</b>';
              }
            }
          ],
          /**
           * Se colocan los datos obenidos
           */
          data: data2,
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
                "Estaciones de monitoreo Sólidos Suspendidos Totales",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
            {
              extend: "pdfHtml5",
              title:
                "Estaciones de monitoreo Sólidos Suspendidos Totales",
              className: "btn btn-gob btn-sm",
              text: "Exportar PDF",
              //messageBottom: citas,
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
                          "Estaciones de monitoreo Sólidos Suspendidos Totales",
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
    },
  }).always(async function () {
    await Swal.close();
  });
}

async function distribucion4(query) {
  /**
   * Se limpian todas las secciones del html en caso de que exista contenido
   */
  $("#nav-01").append(
    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Distribución porcentual por Organismo de Cuenca Organismo de Cuenca Coliformes fecales</h3></div>'
  );
  /**
   * Tabla Oc
   */
  var query2 = query + ' AND valor is NOT NULL GROUP BY organismo ORDER BY oc_clave';
  var cadena = "query=" + query2 + "&Accion=distribucionCF";
  //Funcion para la tabla1
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
    data: cadena,
    success: async function (resp) {
      var data = [];
      var Excelente = 0;
      var Buena = 0;
      var Aceptable = 0;
      var Contaminada = 0;
      var Fuerte = 0;
      var Total = 0;
      $.each(JSON.parse(resp), function (index, item) {
        data.push([
          item.oc_clave + ' - ' + item.organismo,
          numeral((item.Excelente / item.total)).format("0.00%"),
          numeral((item.Buena_Calidad / item.total)).format("0.00%"),
          numeral((item.Aceptable / item.total)).format("0.00%"),
          numeral((item.Contaminada / item.total)).format("0.00%"),
          numeral((item.Fuertemente_Contaminada / item.total)).format("0.00%"),
        ]);
        Excelente += parseFloat(item.Excelente);
        Buena += parseFloat(item.Buena_Calidad);
        Aceptable += parseFloat(item.Aceptable);
        Contaminada += parseFloat(item.Contaminada);
        Fuerte += parseFloat(item.Fuertemente_Contaminada);
        Total += parseFloat(item.total);
      });
      if (data.length > 0) {
        $("#nav-01").append(
          '<table id="CF" class="table table-bordered responsive nowrap" style="width:100%">' +
          '<thead>' +
          '<tr>' +
          '<th>Organismo de Cuenca</th>' +
          '<th style="background-color:#2874a6;color:white">Excelente</th>' +
          '<th style="background-color:#239b56;color:white">Buena Calidad</th>' +
          '<th style="background-color:#f1c40f;color:white">Aceptable</th>' +
          '<th style="background-color: #e67e22 ;color:white">Contaminada</th>' +
          '<th style="background-color:#c0392b;color:white">Fuertemente Contaminada</th>' +
          '</tr>' +
          '</thead>' +
          "<tfoot><tr>" +
          /**
           * Se colocan los totales antes obtenidos
           */
          '<td style="background-color:#CCD1D1" align="center"><b>Nacional</b></th>' +
          '<td style="background-color:#2874a6;color:white" align="right"><b>' +
          numeral((Excelente / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#239b56;color:white" align="right"><b>' +
          numeral((Buena / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#f1c40f;color:white" align="right"><b>' +
          numeral((Aceptable / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color: #e67e22 ;color:white" align="right"><b>' +
          numeral((Contaminada / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#c0392b;color:white" align="right" ><b>' +
          numeral((Fuerte / Total)).format("0.00%") +
          "</b></td>" +
          "</tr></tfoot></table><br>"
        );
        $("#CF").DataTable({
          /*
           *
           * Se crean las columnas que van a ir en la tabla
           *
           */
          columnDefs: [
            { className: 'dt-body-right', targets: [1, 2, 3, 4, 5] },
          ],
          /**
           * Se colocan los datos obenidos
           */
          data: data,
          pageLength: 13,
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
                "Distribución porcentual por Organismo de Cuenca Organismo de Cuenca Coliformes fecales",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
            {
              extend: "pdfHtml5",
              title:
                "Distribución porcentual por Organismo de Cuenca Organismo de Cuenca Coliformes fecales",
              className: "btn btn-gob btn-sm",
              text: "Exportar PDF",
              //messageBottom: citas,
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
                          "Distribución porcentual por Organismo de Cuenca Organismo de Cuenca Coliformes fecales",
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
    },
  }).always(async function () {
    await Swal.close();
  });
}

async function distribucion4Est(query) {
  $("#nav-03").append(
    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Distribución porcentual por Estado Coliformes fecales</h3></div>'
  );
  /**
   * Tabla Estado
   */
  var query2 = query + ' AND valor is NOT NULL GROUP BY estado_id ORDER BY estado';
  var cadena = "query=" + query2 + "&Accion=distribucionCF";
  //Funcion para la tabla1
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
    data: cadena,
    success: async function (resp) {
      var data = [];
      var Excelente = 0;
      var Buena = 0;
      var Aceptable = 0;
      var Contaminada = 0;
      var Fuerte = 0;
      var Total = 0;
      $.each(JSON.parse(resp), function (index, item) {
        data.push([
          item.estado,
          numeral((item.Excelente / item.total)).format("0.00%"),
          numeral((item.Buena_Calidad / item.total)).format("0.00%"),
          numeral((item.Aceptable / item.total)).format("0.00%"),
          numeral((item.Contaminada / item.total)).format("0.00%"),
          numeral((item.Fuertemente_Contaminada / item.total)).format("0.00%"),
        ]);
        Excelente += parseFloat(item.Excelente);
        Buena += parseFloat(item.Buena_Calidad);
        Aceptable += parseFloat(item.Aceptable);
        Contaminada += parseFloat(item.Contaminada);
        Fuerte += parseFloat(item.Fuertemente_Contaminada);
        Total += parseFloat(item.total);
      });
      if (data.length > 0) {
        $("#nav-03").append(
          '<table id="CFEst" class="table table-bordered responsive nowrap" style="width:100%">' +
          '<thead>' +
          '<tr>' +
          '<th>Estado</th>' +
          '<th style="background-color:#2874a6;color:white">Excelente</th>' +
          '<th style="background-color:#239b56;color:white">Buena Calidad</th>' +
          '<th style="background-color:#f1c40f;color:white">Aceptable</th>' +
          '<th style="background-color: #e67e22 ;color:white">Contaminada</th>' +
          '<th style="background-color:#c0392b;color:white">Fuertemente Contaminada</th>' +
          '</tr>' +
          '</thead>' +
          "<tfoot><tr>" +
          /**
           * Se colocan los totales antes obtenidos
           */
          '<td style="background-color:#CCD1D1" align="center"><b>Nacional</b></th>' +
          '<td style="background-color:#2874a6;color:white" align="right"><b>' +
          numeral((Excelente / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#239b56;color:white" align="right"><b>' +
          numeral((Buena / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#f1c40f;color:white" align="right"><b>' +
          numeral((Aceptable / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color: #e67e22 ;color:white" align="right"><b>' +
          numeral((Contaminada / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#c0392b;color:white" align="right" ><b>' +
          numeral((Fuerte / Total)).format("0.00%") +
          "</b></td>" +
          "</tr></tfoot></table><br>"
        );
        $("#CFEst").DataTable({
          /*
           *
           * Se crean las columnas que van a ir en la tabla
           *
           */
          columnDefs: [
            { className: 'dt-body-right', targets: [1, 2, 3, 4, 5] },
          ],
          /**
           * Se colocan los datos obenidos
           */
          data: data,
          pageLength: 32,
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
                "Distribución porcentual por Estado Coliformes fecales",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
            {
              extend: "pdfHtml5",
              title:
                "Distribución porcentual por Estado Bioquímica de Oxígeno",
              className: "btn btn-gob btn-sm",
              text: "Exportar PDF",
              //messageBottom: citas,
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
                          "Distribución porcentual por Estado Coliformes fecales",
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
    },
  }).always(async function () {
    await Swal.close();
  });
}

async function distribucion4Mun(query) {
  $("#nav-04").append(
    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Distribución porcentual por Municipio Coliformes fecales</h3></div>'
  );
  /**
  * Tabla Muni
  */
  var query2 = query + ' AND valor is NOT NULL GROUP BY municipio_id ORDER BY estado,municipio';
  var cadena = "query=" + query2 + "&Accion=distribucionCF";
  //Funcion para la tabla1
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
    data: cadena,
    success: async function (resp) {
      var data = [];
      var Excelente = 0;
      var Buena = 0;
      var Aceptable = 0;
      var Contaminada = 0;
      var Fuerte = 0;
      var Total = 0;
      $.each(JSON.parse(resp), function (index, item) {
        data.push([
          item.estado,
          item.municipio,
          numeral((item.Excelente / item.total)).format("0.00%"),
          numeral((item.Buena_Calidad / item.total)).format("0.00%"),
          numeral((item.Aceptable / item.total)).format("0.00%"),
          numeral((item.Contaminada / item.total)).format("0.00%"),
          numeral((item.Fuertemente_Contaminada / item.total)).format("0.00%"),
        ]);
        Excelente += parseFloat(item.Excelente);
        Buena += parseFloat(item.Buena_Calidad);
        Aceptable += parseFloat(item.Aceptable);
        Contaminada += parseFloat(item.Contaminada);
        Fuerte += parseFloat(item.Fuertemente_Contaminada);
        Total += parseFloat(item.total);
      });
      if (data.length > 0) {
        $("#nav-04").append(
          '<table id="CFMun" class="table table-bordered responsive nowrap" style="width:100%">' +
          '<thead>' +
          '<tr>' +
          '<th>Estado</th>' +
          '<th>Municipio</th>' +
          '<th style="background-color:#2874a6;color:white">Excelente</th>' +
          '<th style="background-color:#239b56;color:white">Buena Calidad</th>' +
          '<th style="background-color:#f1c40f;color:white">Aceptable</th>' +
          '<th style="background-color: #e67e22 ;color:white">Contaminada</th>' +
          '<th style="background-color:#c0392b;color:white">Fuertemente Contaminada</th>' +
          '</tr>' +
          '</thead>' +
          "<tfoot><tr>" +
          /**
           * Se colocan los totales antes obtenidos
           */
          '<td style="background-color:#CCD1D1" align="center"><b>Nacional</b></th>' +
          '<td style="background-color:#CCD1D1" align="center"><b></b></th>' +
          '<td style="background-color:#2874a6;color:white" align="right"><b>' +
          numeral((Excelente / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#239b56;color:white" align="right"><b>' +
          numeral((Buena / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#f1c40f;color:white" align="right"><b>' +
          numeral((Aceptable / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color: #e67e22 ;color:white" align="right"><b>' +
          numeral((Contaminada / Total)).format("0.00%") +
          "</b></td>" +
          '<td style="background-color:#c0392b;color:white" align="right" ><b>' +
          numeral((Fuerte / Total)).format("0.00%") +
          "</b></td>" +
          "</tr></tfoot></table><br>"
        );
        $("#CFMun").DataTable({
          /*
           *
           * Se crean las columnas que van a ir en la tabla
           *
           */
          columnDefs: [
            { className: 'dt-body-right', targets: [2, 3, 4, 5, 6] },
          ],
          /**
           * Se colocan los datos obenidos
           */
          data: data,
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
                "Distribución porcentual por Municipio Coliformes fecales",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
            {
              extend: "pdfHtml5",
              title:
                "Distribución porcentual por Municipio Bioquímica de Oxígeno",
              className: "btn btn-gob btn-sm",
              text: "Exportar PDF",
              //messageBottom: citas,
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
                          "Distribución porcentual por Municipio Coliformes fecales",
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
    },
  }).always(async function () {
    await Swal.close();
  });
}

async function distribucion4Estacion(query) {
  $("#nav-02").append(
    '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Estaciones de monitoreo Coliformes fecales</h3></div>'
  );
  /**
   * Tabla Estaciones
   */
  var query2 = query + ' AND valor is NOT NULL GROUP BY Clave ORDER BY Clave';
  var cadena = "query=" + query2 + "&Accion=distribucionCFEstaciones";
  //Funcion para la tabla1
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/sitiomonitoreosuperficial.php",
    data: cadena,
    success: async function (resp2) {
      var data2 = [];
      $.each(JSON.parse(resp2), function (index, item) {
        data2.push([
          index + 1,
          item.Clave,
          item.Estacion,
          item.Sistema,
          item.Clasificacion,
          numeral(item.Valor).format("0.00"),
          item.Indicador_de_calidad,
          item.Siglas,
          item.color
        ]);
      });

      if (data2.length > 0) {
        $("#nav-02").append(
          '<table id="CFEstaciones" class="table table-bordered responsive nowrap" style="width:100%">' +
          '</table><br>'
        );
        $("#CFEstaciones").DataTable({
          /*
           *
           * Se crean las columnas que van a ir en la tabla
           *
           */
          columns: [
            {
              title: "N°",
            },
            {
              title: "Clave",
            },
            {
              title: "Estación",
            },
            {
              title: "Sistema",
            },
            {
              title: "Clasificación",
            },
            {
              title: "Valor",
            },
            {
              title: "Indicador de calidad",
            },
            {
              title: "Siglas",
            },
          ],
          columnDefs: [
            { className: 'dt-body-right', targets: [5] },
            {
              targets: 4,
              render: function (data, type, row) {
                var color = 'black';
                if (data == 'Excelente') {
                  color = '#2874a6';
                }
                if (data == 'Buena Calidad') {
                  color = '#239b56';
                }
                if (data == 'Aceptable') {
                  color = '#f1c40f';
                }
                if (data == 'Contaminada') {
                  color = '#e67e22';
                }
                if (data == 'Fuertemente contaminada') {
                  color = '#c0392b';
                }
                return '<b style="color:' + color + '">' + data + '</b>';
              }
            }
          ],
          /**
           * Se colocan los datos obenidos
           */
          data: data2,
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
                "Estaciones de monitoreo Coliformes fecales",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
            {
              extend: "pdfHtml5",
              title:
                "Estaciones de monitoreo Coliformes fecales",
              className: "btn btn-gob btn-sm",
              text: "Exportar PDF",
              //messageBottom: citas,
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
                          "Estaciones de monitoreo Coliformes fecales",
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
    },
  }).always(async function () {
    await Swal.close();
  });
}


/**
 *
 * Funcion que carga los shape de los estados
 * @returns {Promise<string>}
 *
 */
function selectOrganismo() {
  var OC = "";
  $("#Organismos option:selected")
    .each(async function () {
      OC += "organismo_id=" + $(this).val() + " or ";
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
function selectEst() {
  var Est = "";
  $("#Estados option:selected")
    .each(async function () {
      Est += "estado_id=" + $(this).val() + " or ";
    })
    .promise()
    .always(async function () {
      Est = Est.slice(0, -3);
    });
  return Est;
}

/**
 *
 * @returns {String|selectMun.Mun}
 * Funcion que obtiene los Distritos de riego seleccionados
 *
 */
function selectMun() {
  var Mun = "";
  $("#Municipios option:selected")
    .each(async function () {
      Mun += 'municipio_id="' + $(this).val() + '" or ';
    })
    .promise()
    .always(async function () {
      Mun = Mun.slice(0, -3);
    });
  return Mun;
}
/**
 *
 * @returns {selectAnio.Anio|String}
 * Funcion que obtiene los anios seleccionados
 *
 */
function selectAnio() {
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

function selectClave() {
  var Clave = "";
  $("#Sitios option:selected")
    .each(async function () {
      Clave += 'Clave="' + $(this).val() + '" or ';
    })
    .promise()
    .always(async function () {
      Clave = Clave.slice(0, -3);
    });
  return Clave;
}

async function loadShape() {
  await map.off();
  await map.remove();
  crearMapa();
  Swal.fire({
    title: "Por favor espere", // add html attribute if you want or remove
    html: "Cargando Mapa Geoespacial",
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
  /**
   * Cargamos Organismos
   */
  getOC_SIG(function () {
    /**
     * Cargamos Estados
     */
    getEst_SIG(function () {
      /**
       * Cargamos Municipios
       */
      getMuni_SIG(function () {
        var indicador = $("#indicador :selected").val();
        switch (indicador) {
          case 'DBO_TOT':
            getSitioDBO5_SIG(function () {
              var overlays = {
                "Organismos de Cuenca": GroupoOCSelect,
                "Estados": GroupoEstSelect,
                "Municipios": GroupoMunSelect,
                "Sitios de Monitoreo": GroupoSitioSelect,
              }
              var lc = L.control.layers(null, overlays);
              lc.addTo(map);
              Swal.close();
            });
            break;
          case 'DQO_TOT':
            getSitioDQO_SIG(function () {
              var overlays = {
                "Organismos de Cuenca": GroupoOCSelect,
                "Estados": GroupoEstSelect,
                "Municipios": GroupoMunSelect,
                "Sitios de Monitoreo": GroupoSitioSelect,
              }
              var lc = L.control.layers(null, overlays);
              lc.addTo(map);
              Swal.close();
            })
            break;
          case 'SST':
            getSitioSST_SIG(function () {
              var overlays = {
                "Organismos de Cuenca": GroupoOCSelect,
                "Estados": GroupoEstSelect,
                "Municipios": GroupoMunSelect,
                "Sitios de Monitoreo": GroupoSitioSelect,
              }
              var lc = L.control.layers(null, overlays);
              lc.addTo(map);
              Swal.close();
            });
            break;
          case 'COLI_FEC':
            getSitioCF_SIG(function () {
              var overlays = {
                "Organismos de Cuenca": GroupoOCSelect,
                "Estados": GroupoEstSelect,
                "Municipios": GroupoMunSelect,
                "Sitios de Monitoreo": GroupoSitioSelect,
              }
              var lc = L.control.layers(null, overlays);
              lc.addTo(map);
              Swal.close();
            });
            break;
        }
      });
    });
  });
}



/**
 * Funcion que esta al pendiente de las pestañas de los acuiferos
 */
async function mostrarDEstado() {
  Swal.fire({
    title: "Por favor espere", // add html attribute if you want or remove
    html: "Cargando contenido",
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
  if (!$("#nav-03").html()) {
    var indicador = $("#indicador :selected").val();
    switch (indicador) {
      case 'DBO_TOT':
        await distribucion1Est(query);
        break;
      case 'DQO_TOT':
        await distribucion2Est(query);
        break;
      case 'SST':
        await distribucion3Est(query);
        break;
      case 'COLI_FEC':
        await distribucion4Est(query);
        break;
    }
  } else {
    await Swal.close();
  }
}


/**
 * Funcion que esta al pendiente de las pestañas de los acuiferos
 */
async function mostrarDMuni() {
  Swal.fire({
    title: "Por favor espere", // add html attribute if you want or remove
    html: "Cargando contenido",
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
  if (!$("#nav-04").html()) {
    var indicador = $("#indicador :selected").val();
    switch (indicador) {
      case 'DBO_TOT':
        await distribucion1Mun(query);
        break;
      case 'DQO_TOT':
        await distribucion2Mun(query);
        break;
      case 'SST':
        await distribucion3Mun(query);
        break;
      case 'COLI_FEC':
        await distribucion4Mun(query);
        break;
    }
  } else {
    await Swal.close();
  }
}


/**
 * Funcion que esta al pendiente de las pestañas de los acuiferos
 */
async function mostrarDEstacion() {
  Swal.fire({
    title: "Por favor espere", // add html attribute if you want or remove
    html: "Cargando contenido",
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
  if (!$("#nav-02").html()) {
    var indicador = $("#indicador :selected").val();
    switch (indicador) {
      case 'DBO_TOT':
        await distribucion1Estacion(query);
        break;
      case 'DQO_TOT':
        await distribucion2Estacion(query);
        break;
      case 'SST':
        await distribucion3Estacion(query);
        break;
      case 'COLI_FEC':
        await distribucion4Estacion(query);
        break;
    }
  } else {
    await Swal.close();
  }
}