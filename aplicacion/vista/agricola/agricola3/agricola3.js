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

 // Se aplica el estilo a los selects
 setEstiloSelect('#Organismos', 'Organismos de Cuenca', 'Buscar Organismos de Cuenca');
 setEstiloSelect('#Estados', 'Estados', 'Buscar Estado');
 setEstiloSelect('#Distritos', 'Distritos de Riego', 'Buscar Distrito');
 setEstiloSelect('#Tenencias', 'Tenencias', 'Buscar Tenencia');
 setEstiloSelect('#Fuentes', 'Fuentes', 'Buscar Fuente');
 setEstiloSelect('#Anios', 'Años', 'Buscar Años');
 
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

async function Anios() {
  await limpiarOrganismos();
  if($("#Anios option:selected").length!=0) {
    $("#Organismos").multiselect("reset");
    Swal.fire({
      title: "Por favor espere", // add html attribute if you want or remove
      html: "Cargando Datos",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    var query = '(';
    $("#Anios option:selected").each(function () {
      query += "anio_id=" + $(this).val() + " or ";
    });
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
              name: item.organismo,
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
  }else{
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
  Swal.fire({
    title: "Por favor espere", // add html attribute if you want or remove
    html: "Cargando Datos",
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
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

/**
 * Funcion que limpia la capa de organimos asi como de las capas que dependen directamente de ellas
 */
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
 * @returns {String|selectDR.DR}
 * Funcion que obtiene los  DR seleccionados
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

async function Consultar() {
  Swal.fire({
    title: "Realizando Consulta",
    html: "Cargando filtro", // add html attribute if you want or remove
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
  /**
   * Llmamos a deshabilitar y a limpiar los Distritos
   */
  await limpiarDR();
  await deshabilitar();
  const OC = await selectOrganismo();
  const Est = await selectEst();
  //Distrito
  const DR = await selectDR();
  //Anio
  const Anio = await selectAnio();
  //Tenecia
  const Tenencia = await selectTenencia();
  //fuentes
  const Fuente = await selectFuente();

  if (DR !== "" && Anio !== "" && Tenencia !== "" && Fuente !== "") {
    //Se obtiene la cita con la información de los acuiferos
    cadena = "Accion=ConsultaAgricolaHistorica&modulo_id=3&anios=" + Anio;
    citas = "\n ";
    $.ajax({
      type: "GET",
      url: "/aplicacion/controlador/catalogo.php",
      data: cadena,
      success: function (resp) {
        document.getElementById("lista").innerHTML = "";
        $.each(JSON.parse(resp), function (index, item) {
          citas += item.cita + " \n";
          $("#lista").append("<li>" + item.cita + "</li>");
        });
      },
    });
    /**
     *
     * @type String
     * Se crea la variable con la sentencia que se va a mandar al controlador
     *
     */
    var query ='(' + OC + ') AND (' + Est + ') AND (' + DR + ') AND (' + Anio + ') AND (' + Tenencia + ') AND (' + Fuente + ') GROUP by anio_id ORDER BY anio';
    var cadena = "query=" + query + "&Accion=DistritosVol2";
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
        document.getElementById("pantalla").innerHTML = "";
        $("#pantalla").append(
          '<div class="row">' +
            '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Informe estadístico histórico de superficies regadas y volúmenes de agua distribuidos en los distritos de riego</h3></div>' +
            '<hr class="red">' +
            '<div class="col-sm-12">' +
            "<h5>Total de usuarios por año agrícola</h5>" +
            '<hr class="red">' +
            "</div>" +
            //Grafica 1
            '<div class="col-sm-8">' +
            '<canvas id="grafica1"></canvas>' +
            "</div>" +
            //Tabla1
            '<div class="col-sm-4">' +
            '<div style="overflow-x:auto;">'+
            '<table id="tabla1" class="table table-bordered nowrap"  width="100%"></table>' +
            '</div>'+
            "</div>" +
            '<div class="col-sm-12">' +
            "<h5>Superficie regada por año agrícola (ha)</h5>" +
            '<hr class="red">' +
            "</div>" +
            //Grafica2
            '<div class="col-sm-8">' +
            '<canvas id="grafica2"></canvas>' +
            "</div>" +
            //Tabla2
            '<div class="col-sm-4">' +
            '<div style="overflow-x:auto;">'+
            '<table id="tabla2" class="table table-bordered nowrap"  width="100%"></table>' +
            '</div>'+
            "</div>" +
            //titulo 3
            '<div class="col-sm-12">' +
            "<h5>Volumen distribuido por año agrícola (miles m<sup>3</sup>)</h5>" +
            '<hr class="red">' +
            "</div>" +
            //Grafica 3
            '<div class="col-sm-8">' +
            '<canvas id="grafica3"></canvas>' +
            "</div>" +
            //tabla 3
            '<div class="col-sm-4">' +
            '<div style="overflow-x:auto;">'+
            '<table id="tabla3" class="table table-bordered  nowrap"  width="100%"></table>' +
            "</div>" +
            "</div>" +
            //titulo 4
            '<div class="col-sm-12">' +
            "<h5>Lámina bruta por año agrícola (cm)</h5>" +
            '<hr class="red">' +
            "</div>" +
            '<div class="col-sm-8">' +
            '<canvas id="grafica4"></canvas>' +
            "</div>" +
            //tabla 4
            '<div class="col-sm-4">' +
            '<div style="overflow-x:auto;">'+
            '<table id="tabla4" class="table table-bordered nowrap"  width="100%"></table>' +
            "</div></div></div>"
        );
        var etiquetas = [];
        var usuarios = [];
        var sup_regada = [];
        var vol_dist = [];
        var lamina = [];
        var t1 = [];
        var t2 = [];
        var t3 = [];
        var t4 = [];
        $.each(JSON.parse(resp2), function (index, item) {
          etiquetas.push(item.anio);
          usuarios.push(item.total_usu);
          sup_regada.push(item.sup_regada);
          vol_dist.push(item.vol_dist);
          lamina.push(item.Lamina);
          t1.push([item.anio, numeral(item.total_usu).format("0,0.00")]);
          t2.push([item.anio, numeral(item.sup_regada).format("0,0.00")]);
          t3.push([item.anio, numeral(item.vol_dist).format("0,0.00")]);
          t4.push([item.anio, numeral(item.Lamina).format("0,0.00")]);
        });
        var element = "grafica1";
        new Chart(document.getElementById(element), {
          type: "line",
          data: {
            labels: etiquetas,
            datasets: [
              {
                data: usuarios,
                borderColor: "#F8B12C",
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Total de usuarios",
                  },
                  ticks: {
                    min: 0,
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Año",
                  },
                },
              ],
            },
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
        });
        var element = "grafica2";
        new Chart(document.getElementById(element), {
          type: "line",
          data: {
            labels: etiquetas,
            datasets: [
              {
                data: sup_regada,
                borderColor: "#9D221E",
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Superficie regada (ha)",
                  },
                  ticks: {
                    min: 0,
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Año",
                  },
                },
              ],
            },
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
        });
        var element = "grafica3";
        new Chart(document.getElementById(element), {
          type: "line",
          data: {
            labels: etiquetas,
            datasets: [
              {
                data: vol_dist,
                borderColor: "#859D3C",
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Volumen distribuido (miles m3)",
                  },
                  ticks: {
                    min: 0,
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Año",
                  },
                },
              ],
            },
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
        });
        var element = "grafica4";
        new Chart(document.getElementById(element), {
          type: "line",
          data: {
            labels: etiquetas,
            datasets: [
              {
                data: lamina,
                borderColor: "#128C7E",
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Lámina bruta (cm)",
                  },
                  ticks: {
                    min: 0,
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Año",
                  },
                },
              ],
            },
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
        });

        //tablas
        var tabla1 = $("#tabla1").DataTable({
          columns: [
            {
              title: "Año",
            },
            {
              title: "Número total de usuarios",
            },
          ],
          data: t1,
          ordering: true,
          searching: false,
          paging: false,

          scrollY: "450px",
          columnDefs: [{ className: 'dt-body-right', targets: [1] }],
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
              title: "Total de usuarios por año agrícola",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
          ],
        });
        var tabla2 = $("#tabla2").DataTable({
          columns: [
            {
              title: "Año",
            },
            {
              title: "Superficie regada (ha)",
            },
          ],
          data: t2,

          ordering: true,
          searching: false,
          paging: false,

          scrollY: "450px",
          columnDefs: [{ className: 'dt-body-right', targets: [1] }],
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
              title: "Superficie regada por año agrícola (ha)",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
          ],
        });
        var tabla3 = $("#tabla3").DataTable({
          columns: [
            {
              title: "Año",
            },
            {
              title: "Volumen distribuido (miles m3)",
            },
          ],
          data: t3,

          ordering: true,
          searching: false,
          paging: false,

          scrollY: "450px",
          columnDefs: [{ className: 'dt-body-right', targets: [1] }],
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
              title: "Volumen distribuido por año agrícola (miles m3)",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
          ],
        });
        var tabla4 = $("#tabla4").DataTable({
          columns: [
            {
              title: "Año",
            },
            {
              title: "Lámina bruta (cm)",
            },
          ],
          data: t4,

          ordering: true,
          searching: false,
          paging: false,

          scrollY: "450px",
          columnDefs: [{ className: 'dt-body-right', targets: [1] }],
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
              title: "Lámina bruta por año agrícola (cm)",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
          ],
        });
      },
    }).always(async function () {
      await habilitar();
      await Historial();
      $("#botonMapa").hide();
      $("#divPrioridad").hide();
      await Swal.close();
    });
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
    await Swal.close();
    $("#pantalla").hide();
    $("#botonMapa").hide();
    $("#divPrioridad").hide();
    $("#referencias").hide();
  }
}
