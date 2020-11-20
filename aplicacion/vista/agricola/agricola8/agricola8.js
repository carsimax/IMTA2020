/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 *
 *
 *  Este script es el encargado de realizar y mostrar toda la información relacionada con
 * la consulta de la estadística agrícola,
 *  específicamente el Informe estadístico de producción agrícola
 */

 //Se aplica estilos a los selects
setEstiloSelect('#Organismos', 'Organismos de Cuenca', 'Buscar Organismos de Cuenca');
setEstiloSelect('#Estados', 'Estados', 'Buscar Estado');
setEstiloSelect('#Municipios', 'Municipios', 'Buscar Municipio');
setEstiloSelect('#Cultivos', 'Cultivos', 'Buscar Cultivo');
setEstiloSelect('#Anios', 'Años', 'Buscar Año');


citas = "";
query = "";

async function Anios() {
  await limpiarOrganismos();
  if($("#Anios option:selected").length!=0) {
    $("#Cultivos").multiselect("reset");
    $("#Organismos").multiselect("reset");
    Swal.fire({
      title: "Por favor espere", // add html attribute if you want or remove
      html: "Cargando Datos",
      allowEscapeKey: false,
    allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    var query = '(';
    $("#Anios option:selected").each(function () {
      query += "anio_id=" + $(this).val() + " or ";
    });
    query = query.slice(0, -4) + ') GROUP BY id_organismo';
    if (query !== "") {
      /**
       * controlador
       * @type {string}
       */
      const cadena = "query=" + query + "&Accion=URTabla";
      var data = [];
      $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/unidadriego.php",
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
              name: item.numero+'. '+item.OC,
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
    allowEscapeKey: false,
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
  /**
   * Esta línea de código llama a la función que limpia la capa de organismos de cuenca
   */
  await limpiarOrganismos();
  $("#Cultivos").multiselect("reset");
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
    query = query.slice(0, -4) + ') GROUP BY id_estado';
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
      const cadena = "query=" + query + "&Accion=URTabla";
      var data = [];
      /**
       * Se manda a llamar por medio de Ajax a la función de estados en el controlador de mapa
       */
      $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/unidadriego.php",
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
  Swal.fire({
    title: "Por favor espere", // add html attribute if you want or remove
    html: "Cargando Datos",
    allowEscapeKey: false,
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
  await limpiarEstados();
  $("#Cultivos").multiselect("reset");
  var query = "(";
  /**
   * Se tiene que recorrer el select de organismos de cuenca para encontrar todos los elementos seleccionados.
   */
  $("#Anios option:selected").each(function () {
    query += "anio_id=" + $(this).val() + " or ";
  });
  query = query.slice(0, -4) + ') AND (';
  if ($("#Organismos option:selected").length != 0 && $("#Estados option:selected").length != 0 ) {
    $("#Organismos option:selected").each(function () {
      query += "id_organismo=" + $(this).val() + " or ";
    });
    query = query.slice(0, -4) + ') AND (';
    $("#Estados option:selected").each(function () {
      query += "id_estado=" + $(this).val() + " or ";
    });
    query = query.slice(0, -4) + ') GROUP BY id_municipio';
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
      const cadena = "query=" + query + "&Accion=URTabla";
      var data = [];
      /**
       * Se manda a llamar por medio de Ajax a la función de estados en el controlador de mapa
       */
      $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/unidadriego.php",
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
  } else {
    Swal.close();
  }
}

/**
 *
 * @returns {Promise<void>}
 * @constructor
 * Funcion para guardar la consulta en el historial
 */
async function Historial() {
  /**
   *
   * Guardamos en es historial
   *
   */
  cadena = "Modulo=Estadística Agrícola" + "&Accion=Historial";
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/mapa.php",
    data: cadena,
    /**
     *
     * @param {type} resp
     * @returns {Boolean}
     * Si el controlador devuelve una respuesta
     *
     */
    success: function (resp) {
      return true;
    },
  });
}

/**
 *
 * @returns {undefined}
 *  Funcion que limpia la capa de organimos asi como de las capas que dependen directamente de ellas
 *
 */
async function limpiarOrganismos() {
  $("#Estados").multiselect("reset");
  await limpiarEstados();
}

/**
 *
 * @returns {undefined}
 * Funcion para limpiar la capa de estados
 *
 */
async function limpiarEstados() {
  //$("#Distritos").multiselect("reset");
  $("#Municipios").multiselect("reset");
  await limpiarDR();
  //$("#Ciclos").multiselect("reset2");

}

/**
 *
 * @returns {undefined}
 * Funcion para limpiar la capa de Distritos
 *
 */
async function limpiarDR() {
  map.off();
  map.remove();
  crearMapa();
}

/**
 *
 * @returns {Promise<string>}
 * Funcion que concatena la cadena de los Distritos seleccionadoss
 *
 */
async function concatOrganismo() {
  /**
   *
   * @type String
   * Se crea la variable para ir concatenando el query
   *
   */
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
  /*prueba prueba prueba */

  var query = "";
  query = "(" + (await concatOrganismo()) + ")";
  query = query + "AND (";

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
  query = query + ");";
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
async function selectMuni() {
  var Muni = "";
  $("#Municipios option:selected")
      .each(async function () {
        Muni += 'id_municipio="' + $(this).val() + '" or ';
      })
      .promise()
      .always(async function () {
        Muni = Muni.slice(0, -3);
      });
  return Muni;
}
/**
 *
 * @returns {selectAnio.Anio|String}
 * Funcion que obtiene los anios seleccionados
 *
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
 * @returns {selectCultivo.Cultivos|String}
 * Funcion que obtiene los cultivos sleeccionados
 *
 */
async function selectCultivo() {
  var Cultivos = "";
  $("#Cultivos option:selected")
      .each(async function () {
        Cultivos += "cultivo_id=" + $(this).val() + " or ";
      })
      .promise()
      .always(async function () {
        Cultivos = Cultivos.slice(0, -3);
      });
  return Cultivos;
}


/**
 * Funcion para obtener los cultivos
 */
async function getCultivos() {
  $("#Cultivos").multiselect("reset");
  Swal.fire({
    title: "Por favor espere", // add html attribute if you want or remove
    html: "Cargando Datos",
    allowEscapeKey: false,
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
  if ($("#Organismos option:selected").length != 0 &&
      $("#Estados option:selected").length != 0 &&
      $("#Municipios option:selected").length != 0) {
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
    $("#Municipios option:selected").each(function () {
      query += "id_municipio=" + $(this).val() + " or ";
    });
    query = query.slice(0, -4) + ') GROUP BY cultivo_id';

    const cadena = "query=" + query + "&Accion=URTabla";
    var data = [];
    $.ajax({
      type: "POST",
      url: "/aplicacion/controlador/unidadriego.php",
      data: cadena,
      //Si el controlador devuelve una respuesta
      success: function (resp) {
        $.each(JSON.parse(resp), function (index, item) {
          data.push({
            name: item.cultivo,
            value: item.cultivo_id,
            checked: false,
          });
        });
      },
    }).always(function () {
      $("#Cultivos").multiselect("loadOptions", data);
      Swal.close();
    });
  } else {
    Swal.close();
  }
}


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

  /**
   * Llmamos a deshabilitar y a limpiar los Distritos
   */
  await deshabilitar();
  await limpiarDR();
  const OC = await selectOrganismo();
  const Est = await selectEst();
  const Mun = await selectMuni();
  const Anio = await selectAnio();
  const Cultivo = await selectCultivo();

  if (OC !== "" && Est !== "" && Mun !== "" && Cultivo !== "" && Anio !== "") {
    //Se obtiene la cita con la información de las unidades de riego
    cadena = "Accion=ConsultaAgricolaHistorica&modulo_id=8&anios=" + Anio.replace(/anioagricola_id/g, 'anio_id');
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
    query = "(" + OC + ") AND (" + Est + ") AND (" + Mun + ") AND (" + Anio + ") AND (" + Cultivo + ") GROUP by anio_id ORDER BY anio";
    var cadena = "query=" + query + "&Accion=URTabla";
    $.ajax({
      type: "POST",
      url: "/aplicacion/controlador/unidadriego.php",
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
            '<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom"><h3>Informe estadístico histórico de producción agrícola</h3></div>' +
            //Titulo1
            '<div class="col-sm-12">' +
            "<h5>Superficie sembrada y cosechada por año agrícola (ha)</h5>" +
            '<hr class="red">' +
            "</div>" +
            //Grafica1
            '<div class="col-sm-8">' +
            '<canvas id="grafica1"></canvas>' +
            "</div>" +
            //Tabla1
            '<div class="col-sm-4" style="overflow-x:auto;">' +
            '<table id="tabla1" class="table table-bordered  nowrap"  width="100%"></table>' +
            "</div>" +
            //Titulo2
            '<div class="col-sm-12">' +
            "<h5>Producción por año agrícola (miles ton)</h5>" +
            '<hr class="red">' +
            "</div>" +
            //Grafica2
            '<div class="col-sm-8">' +
            '<canvas id="grafica2"></canvas>' +
            "</div>" +
            //Tabla2
            '<div class="col-sm-4" style="overflow-x:auto;">' +
            '<table id="tabla2" class="table table-bordered  nowrap"  width="100%"></table>' +
            "</div>" +
            //Titulo3
            '<div class="col-sm-12">' +
            "<h5>Valor de la cosecha por año agrícola (millones $)</h5>" +
            '<hr class="red">' +
            "</div>" +
            //Grafica3
            '<div class="col-sm-8">' +
            '<canvas id="grafica3"></canvas>' +
            "</div>" +
            //Tabla3
            '<div class="col-sm-4" style="overflow-x:auto;">' +
            '<table id="tabla3" class="table table-bordered  nowrap"  width="100%"></table>' +
            "</div>" +
            //Titulo 4
            '<div class="col-sm-12">' +
            "<h5>Rendimiento por año agrícola (ton/ha)</h5>" +
            '<hr class="red">' +
            "</div>" +
            //Grafica4
            '<div class="col-sm-8">' +
            '<canvas id="grafica4"></canvas>' +
            "</div>" +
            //Tabla4
            '<div class="col-sm-4" style="overflow-x:auto;">' +
            '<table id="tabla4" class="table table-bordered nowrap"  width="100%"></table>' +
            "</div>" +
            //Titulo 5
            '<div class="col-sm-12">' +
            "<h5>P.M.R por año agrícola ($/ton)</h5>" +
            '<hr class="red">' +
            "</div>" +
            //Grafica5
            '<div class="col-sm-8">' +
            '<canvas id="grafica5"></canvas>' +
            "</div>" +
            //Tabla5
            '<div class="col-sm-4" style="overflow-x:auto;">' +
            '<table id="tabla5" class="table table-bordered  nowrap"  width="100%"></table>' +
            "</div></div>"
        );
        var etiquetas = [];
        var sup_sem = [];
        var sup_cos = [];
        var prod = [];
        var valor = [];
        var rend = [];
        var pmr = [];
        var t1 = [];
        var t2 = [];
        var t3 = [];
        var t4 = [];
        var t5 = [];
        $.each(JSON.parse(resp2), function (index, item) {
          etiquetas.push(item.anio);
          sup_sem.push(Math.round(item.SEM));
          sup_cos.push(Math.round(item.COS));
          t1.push([
            item.anio,
            numeral(Math.round(item.SEM)).format("0,0"),
            numeral(Math.round(item.COS)).format("0,0"),
          ]);
          prod.push(parseFloat(item.PROD).toFixed(2));
          t2.push([
            item.anio,
            numeral(parseFloat(item.PROD).toFixed(2)).format("0,0.00"),
          ]);
          valor.push(parseFloat(item.VAL).toFixed(2));
          t3.push([
            item.anio,
            numeral(parseFloat(item.VAL).toFixed(2)).format("0,0.00"),
          ]);
          rend.push(parseFloat(item.PROD / item.COS).toFixed(2));
          t4.push([
            item.anio,
            numeral(parseFloat(item.PROD / item.COS).toFixed(2)).format(
              "0,0.00"
            ),
          ]);
          pmr.push(Math.round(item.VAL / item.PROD));
          t5.push([
            item.anio,
            numeral(Math.round(item.VAL / item.PROD)).format("0,0.00"),
          ]);
        });
        var element = "grafica1";
        new Chart(document.getElementById(element), {
          type: "line",
          data: {
            labels: etiquetas,
            datasets: [
              {
                label: "Superfice Sembrada",
                data: sup_sem,
                borderColor: "#F8B12C",
                fill: false,
              },
              {
                label: "Superfice Cosechada",
                data: sup_cos,
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
                    labelString: "Superficie sembrada y cosechada (ha)",
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
              display: true,
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
                data: prod,
                borderColor: "#7B2556",
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
                    labelString: "Producción (miles ton)",
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
                data: valor,
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
                    labelString: "Valor de la cosecha (millones $)",
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
                data: rend,
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
                    labelString: "Rendimiento (ton/ha)",
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
        var element = "grafica5";
        new Chart(document.getElementById(element), {
          type: "line",
          data: {
            labels: etiquetas,
            datasets: [
              {
                data: pmr,
                borderColor: "#FEF34F",
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
                    labelString: "P.M.R ($/ton)",
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

        //Tablas
        var tabla1 = $("#tabla1").DataTable({
          columns: [
            {
              title: "Año",
            },
            {
              title: "Superficie sembrada (ha)",
            },
            {
              title: "Superficie cosechada (ha)",
            },
          ],
          data: t1,
          ordering: true,
          paging: false,
          searching: false,
          scrollY: "450px",
          columnDefs: [{ className: 'dt-body-right', targets: [1, 2] }],
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
              title: "Superficie sembrada y cosechada por año agrícola (ha)",
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
              title: "Producción(miles ton)",
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
              title: "Producción por año agrícola (miles ton)",
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
              title: "Valor de la cosecha (millones $)",
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
              title: "Valor de la cosecha por año agrícola (millones $)",
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
              title: "Rendimiento (ton/ha)",
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
              title: "Rendimiento por año agrícola (ton/ha)",
              className: "btn btn-gob btn-sm",
              text: "Exportar Excel",
            },
          ],
        });
        var tabla5 = $("#tabla5").DataTable({
          columns: [
            {
              title: "Año",
            },
            {
              title: "P.M.R ($/ton)",
            },
          ],
          data: t5,

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
              title: "P.M.R por año agrícola ($/ton)",
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
      await sleep(1000);
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
