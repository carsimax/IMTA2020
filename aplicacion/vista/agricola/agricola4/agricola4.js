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

// Se aplica el estilo a los selects
setEstiloSelect('#Organismos', 'Organismos de Cuenca', 'Buscar Organismos de Cuenca');
setEstiloSelect('#Estados', 'Estados', 'Buscar Estado');
setEstiloSelect('#Distritos', 'Distritos de Riego', 'Buscar Distrito');
setEstiloSelect('#Ciclos', 'Ciclos', 'Buscar Ciclo');
setEstiloSelect('#Modalidades', 'Modalidades', 'Buscar Modalidad');
setEstiloSelect('#Cultivos', 'Cultivos', 'Buscar Cultivo');
setEstiloSelect('#Tenencias', 'Tenencias', 'Buscar Tenencia');
setEstiloSelect('#Anios', 'Años', 'Buscar Año');



async function Anios() {
  limpiarAnios();
  if ($("#Anios option:selected").length != 0) {
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
      const cadena = "query=" + query + "&Accion=getOrganismos";
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
      const cadena = "query=" + query + "&Accion=getEstados";
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

async function Tenencias() {
  $("#Distritos").multiselect("reset");
  $("#Cultivos").multiselect("reset");
  if ($("#Organismos option:selected").length != 0 &&
    $("#Estados option:selected").length != 0 &&
    $("#Ciclos option:selected").length != 0 &&
    $("#Modalidades option:selected").length != 0 &&
    $("#Tenencias option:selected").length != 0) {
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
    $("#Ciclos option:selected").each(function () {
      query += "ciclo_id=" + $(this).val() + " or ";
    });
    query = query.slice(0, -4) + ') AND (';
    $("#Modalidades option:selected").each(function () {
      query += 'modalidad="' + $(this).val() + '" or ';
    });
    query = query.slice(0, -4) + ') AND (';
    $("#Tenencias option:selected").each(function () {
      query += "tenencia_id=" + $(this).val() + " or ";
    });
    query = query.slice(0, -4) + ')';
    const cadena = "query=" + query + "&Accion=getDRProduccion";
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

async function Cultivos() {
  isFormCompleted('#Cultivos');
}

/**
 *
 * @returns {undefined}
 *  Funcion que limpia la capa de organimos asi como de las capas que dependen directamente de ellas
 *
 */

async function limpiarAnios() {
  $("#Organismos").multiselect("reset");
  await limpiarOrganismos();
}


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
  $("#Distritos").multiselect("reset");
  await limpiarDR();
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
  $("#Cultivos").multiselect("reset");
  $("#Ciclos").multiselect("reset2");
  $("#Modalidades").multiselect("reset2");
  $("#Tenencias").multiselect("reset2");
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
 * @returns {selectMod.Modalidades|String}
 * Funcion que obtiene las modalidades seleccionadas
 *
 */
async function selectMod() {
  var Modalidades = "";
  $("#Modalidades option:selected")
    .each(async function () {
      Modalidades += 'modalidad="' + $(this).val() + '" or ';
    })
    .promise()
    .always(async function () {
      Modalidades = Modalidades.slice(0, -3);
    });
  return Modalidades;
}

/**
 *
 * @returns {selectCiclo.Ciclos|String}
 * Funcion que obtiene los ciclos seleccionados
 *
 */
async function selectCiclo() {
  var Ciclos = "";
  $("#Ciclos option:selected")
    .each(async function () {
      Ciclos += "ciclo_id=" + $(this).val() + " or ";
    })
    .promise()
    .always(async function () {
      Ciclos = Ciclos.slice(0, -3);
    });
  return Ciclos;
}

/**
 *
 * @returns {selectTenencia.Tenencias|String}
 * Funciones que obtienen lasa tenencias seleccionadas
 *
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

async function getCultivos() {
  alertaCargando("Por favor espere", "Cargando datos");
  $("#Cultivos").multiselect("reset");
  if ($("#Distritos option:selected").length != 0) {
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
    $("#Ciclos option:selected").each(function () {
      query += "ciclo_id=" + $(this).val() + " or ";
    });
    query = query.slice(0, -4) + ') AND (';
    $("#Modalidades option:selected").each(function () {
      query += 'modalidad="' + $(this).val() + '" or ';
    });
    query = query.slice(0, -4) + ') AND (';
    $("#Tenencias option:selected").each(function () {
      query += "tenencia_id=" + $(this).val() + " or ";
    });
    query = query.slice(0, -4) + ') AND (';
    $("#Distritos option:selected").each(function () {
      query += 'id_distrito_riego="' + $(this).val() + '" or ';
    });
    query = query.slice(0, -4) + ')';
    const cadena = "query=" + query + "&Accion=CultivosConsulta";
    var data = [];
    $.ajax({
      type: "POST",
      url: "/aplicacion/controlador/cultivo.php",
      data: cadena,
      //Si el controlador devuelve una respuesta
      success: function (resp) {
        $.each(JSON.parse(resp), function (index, item) {
          data.push({
            name: item.cultivo,
            value: item.id_cultivo,
            checked: false,
          });
        });
        $("#Cultivos").multiselect("loadOptions", data);
      },
    }).always(function () {
      Swal.close();
    });
  } else {
    Swal.close();
  }
}

async function Consultar() {
  alertaCargando("Por favor espere", "Realizando consulta");
  deshabilitar();
  const OC = await selectOrganismo();
  const Est = await selectEst();
  const DR = await selectDR();
  const Anio = await selectAnio();
  const Mod = await selectMod();
  const Ciclo = await selectCiclo();
  const Tenencia = await selectTenencia();
  const Cultivo = await selectCultivo();

  if (OC !== "" && Est !== "" && DR !== "" && Anio !== "") {
    data = "Accion=ConsultaAgricolaHistorica&modulo_id=3&anios=" + Anio;
    citas = construirReferencias(data, false);
    //Se crea la variable con la sentencia que se va a mandar al controlador     
    var query = "(" + OC + ") AND (" + Est + ") AND (" + DR + ") AND (" + Anio + ") AND (" + Mod + ") AND (" + Ciclo + ") AND (" + Tenencia + ") AND (" + Cultivo + ") GROUP by anio_id ORDER BY anio";
    var cadena = "query=" + query + "&Accion=DistritosOC2";
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
          '<div class="col-sm-4">' +
          '<div style="overflow-x:auto;">' +
          '<table id="tabla1" class="table table-bordered  nowrap"  width="100%"></table>' +
          "</div>" +
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
          '<div class="col-sm-4">' +
          '<div style="overflow-x:auto;">' +
          '<table id="tabla2" class="table table-bordered  nowrap"  width="100%"></table>' +
          "</div>" +
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
          '<div class="col-sm-4">' +
          '<div style="overflow-x:auto;">' +
          '<table id="tabla3" class="table table-bordered  nowrap"  width="100%"></table>' +
          "</div>" +
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
          '<div class="col-sm-4">' +
          '<div style="overflow-x:auto;">' +
          '<table id="tabla4" class="table table-bordered  nowrap"  width="100%"></table>' +
          "</div>" +
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
          '<div class="col-sm-4">' +
          '<div style="overflow-x:auto;">' +
          '<table id="tabla5" class="table table-bordered nowrap"  width="100%"></table>' +
          "</div></div>" +
          //Titulo 6
          '<div class="col-sm-12">' +
          "<h5>Volumen neto por año agrícola (miles de m³)*</h5> <p class='font-weight-light'>*Estimado con lámina de riego promedio.</p>" +
          '<hr class="red">' +
          "</div>" +
          //Grafica 6
          '<div class="col-sm-8">' +
          '<canvas id="grafica6"></canvas>' +
          "</div>" +
          //Tabla 6
          '<div class="col-sm-4">' +
          '<div style="overflow-x:auto;">' +
          '<table id="tabla6" class="table table-bordered nowrap"  width="100%"></table>' +
          "</div></div>" +
          //Titulo 7
          '<div class="col-sm-12">' +
          "<h5>Volumen bruto por año agrícola (miles de m³)**</h5> <p class='font-weight-light'>**Estimado con lámina de riego y eficiencia de conducción promedio.</p>" +
          '<hr class="red">' +
          "</div>" +
          //Grafica 7
          '<div class="col-sm-8">' +
          '<canvas id="grafica7"></canvas>' +
          "</div>" +
          //Tabla 7
          '<div class="col-sm-4">' +
          '<div style="overflow-x:auto;">' +
          '<table id="tabla7" class="table table-bordered nowrap"  width="100%"></table>' +
          "</div></div></div>"
        );
        var etiquetas = [];
        var sup_sem = [];
        var sup_cos = [];
        var prod = [];
        var valor = [];
        var vol_neto = [];
        var vol_bruto = [];
        var rend = [];
        var pmr = [];
        var t1 = [];
        var t2 = [];
        var t3 = [];
        var t4 = [];
        var t5 = [];
        var t6 = [];
        var t7 = [];
        $.each(JSON.parse(resp2), function (index, item) {
          etiquetas.push(item.anio);
          sup_sem.push(Math.round(item.SEM));
          sup_cos.push(Math.round(item.COS));
          t1.push([
            item.anio,
            numeral(Math.round(item.SEM)).format("0,0.00"),
            numeral(Math.round(item.COS)).format("0,0.00"),
          ]);
          prod.push(parseFloat(item.PROD / 1000).toFixed(2));
          t2.push([
            item.anio,
            numeral(parseFloat(item.PROD / 1000).toFixed(2)).format("0,0.00"),
          ]);
          valor.push(parseFloat(item.VAL / 1000000).toFixed(2));
          t3.push([
            item.anio,
            numeral(parseFloat(item.VAL / 1000000).toFixed(2)).format("0,0.00"),
          ]);
          rend.push(parseFloat(item.PROD / item.COS).toFixed(2));
          t4.push([
            item.anio,
            numeral(parseFloat(item.PROD / item.COS).toFixed(2)).format(
              "0,0.00"
            ),
          ]);
          pmr.push((item.VAL / item.PROD));
          t5.push([
            item.anio,
            numeral((item.VAL / item.PROD)).format("0,0.00"),
          ]);

          vol_neto.push(parseFloat(item.VOL_NETO).toFixed(2));
          t6.push([
            item.anio,
            numeral(parseFloat(item.VOL_NETO).toFixed(2)).format("0,0.00"),

          ]);

          vol_bruto.push(parseFloat(item.VOL_BRUTO).toFixed(2));
          t7.push([
            item.anio,
            numeral(parseFloat(item.VOL_BRUTO).toFixed(2)).format("0,0.00"),

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

        var element = "grafica6";
        new Chart(document.getElementById(element), {
          type: "line",
          data: {
            labels: etiquetas,
            datasets: [
              {
                data: vol_neto,
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
                    labelString: "Volumen neto (miles de m³)",
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

        var element = "grafica7";
        new Chart(document.getElementById(element), {
          type: "line",
          data: {
            labels: etiquetas,
            datasets: [
              {
                data: vol_bruto,
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
                    labelString: "Volumen bruto (miles de m³)",
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
        $("#tabla1").DataTable({
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
              className: estiloboton,
              text: "Exportar Excel",
            },
          ],
        });
        $("#tabla2").DataTable({
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
              className: estiloboton,
              text: "Exportar Excel",
            },
          ],
        });
        $("#tabla3").DataTable({
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
              className: estiloboton,
              text: "Exportar Excel",
            },
          ],
        });
        $("#tabla4").DataTable({
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
              className: estiloboton,
              text: "Exportar Excel",
            },
          ],
        });
        $("#tabla5").DataTable({
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
              className: estiloboton,
              text: "Exportar Excel",
            },
          ],
        });
        $("#tabla6").DataTable({
          columns: [
            {
              title: "Año",
            },
            {
              title: "Volumen neto (miles de m³)*",
            },
          ],
          data: t6,

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
              className: estiloboton,
              text: "Exportar Excel",
            },
          ],
        });
        $("#tabla7").DataTable({
          columns: [
            {
              title: "Año",
            },
            {
              title: "Volumen bruto (miles de m³)*",
            },
          ],
          data: t7,
          ordering: true,
          searching: false,
          paging: false,
          scrollY: "450px",
          columnDefs: [{ className: 'dt-body-right', targets: [1] }],
          language: {
            url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
          },
          dom: "Bfrtip",
          buttons: [
            {
              extend: "excelHtml5",
              title: "Volumen bruto por año agrícola (miles de m³)",
              className: estiloboton,
              text: "Exportar Excel",
            },
          ],
        });
      },
    }).always(async function () {
      habilitar();
      await Historial();
      $("#botonMapa").hide();
      $("#divPrioridad").hide();
      await sleep(1000);
      await Swal.close();
    });
  } else {
    habilitar();
    await Swal.close();
    $("#pantalla").hide();
    $("#botonMapa").hide();
    $("#divPrioridad").hide();
    $("#referencias").hide();
  }
}

/**
*
* @returns {Promise<void>}
* @constructor
* Funcion para guardar la consulta en el historial
*/
async function Historial() {
  cadena = "Modulo=Estadística Agrícola" + "&Accion=Historial";
  $.ajax({
    type: "POST",
    url: "/aplicacion/controlador/mapa.php",
    data: cadena,
    success: function (resp) {
      return true;
    },
  });
}