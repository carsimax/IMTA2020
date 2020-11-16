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
 * Se aplica el estilo al select de los Distritos
 */
$("#Distritos").multiselect({
  columns: 1,
  search: true,
  selectAll: true,
  texts: {
    placeholder: "Seleccione un Distrito",
    search: "Buscar Distrito",
  },
});

/**
 *Se inicializa el multiselect  Ciclos agricolas
 */
$("#Ciclos").multiselect({
  columns: 1,
  search: true,
  selectAll: true,
  texts: {
    placeholder: "Seleccione un Ciclo Agrícola",
    search: "Buscar Ciclo",
  },
});

/**
 * Se inicializa el multiselect  Modalidades
 */
$("#Modalidades").multiselect({
  columns: 1,
  search: true,
  selectAll: true,
  texts: {
    placeholder: "Seleccione una Modalidad",
    search: "Buscar Modalidad",
  },
});
/**
 * Se inicializa el multiselect  Cultivos
 */
$("#Cultivos").multiselect({
  columns: 1,
  search: true,
  selectAll: true,
  texts: {
    placeholder: "Seleccione un Cultivo",
    search: "Buscar Cultivo",
  },
});
/**
 * Se inicializa el multiselect  Tenencias
 */
$("#Tenencias").multiselect({
  columns: 1,
  search: true,
  selectAll: true,
  texts: {
    placeholder: "Seleccione una Tenencia",
    search: "Buscar Tenencia",
  },
});
/**
 * Se aplica el estilo al select de Anios
 */
$("#Anios").multiselect({
  columns: 1,
  search: true,
  selectAll: true,
  texts: {
    placeholder: "Seleccione un rango de años",
    search: "Buscar Año",
  },
});
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
  Swal.fire({
    title: "Por favor espere", // add html attribute if you want or remove
    html: "Cargando Datos",
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
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
  Swal.fire({
    title: "Por favor espere", // add html attribute if you want or remove
    html: "Realizando la consulta",
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });

  /**
   * Llmamos a deshabilitar y a limpiar los Distritos
   */
  await deshabilitar();
  /**
   *
   * @type String|selectOrganismo.OC|Promise<string>
   * Se carga los shapes de organismos de cuenca
   */
  const OC = await selectOrganismo();
  /**
   *
   * @type String|selectEst.Est|Promise<string>
   * Se cargan los shapes de los estados.
   */
  const Est = await selectEst();
  /**
   *
   * @type String|selectDR.DR
   * Se caragan los shapes de los distritos de riego
   */
  const DR = await selectDR();
  /**
   *
   * @type selectAnio.Anio|String
   * Se obtienen los anios seleccionados
   */
  const Anio = await selectAnio();
  /**
   *
   * @type selectMod.Modalidades|String
   * Se obtienen las modalidades seleccionadas
   */
  const Mod = await selectMod();
  /**
   *
   * @type selectCiclo.Ciclos|String
   * Se obtienen los ciclos seleccionados
   */
  const Ciclo = await selectCiclo();

  /**
   *
   * @type selectTenencia.Tenencias|String
   * Se obtieenen las tenencias seleccionadas
   */
  const Tenencia = await selectTenencia();
  /**
   *
   * @type selectCultivo.Cultivos|String
   * Se obtienen los cultivos seleccionados
   */
  const Cultivo = await selectCultivo();
  /**
   * Se verifica que el query de Organismos ese vacio
   */
  if (OC !== "" && Est !== "" && DR !== "" && Anio !== "") {
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
    var query =
      "(" +
      OC +
      ") AND (" +
      Est +
      ") AND (" +
      DR +
      ") AND (" +
      Anio +
      ") AND (" +
      Mod +
      ") AND (" +
      Ciclo +
      ") AND (" +
      Tenencia +
      ") AND (" +
      Cultivo +
      ") GROUP by anio_id ORDER BY anio";
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
            '<div style="overflow-x:auto;">'+
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
            '<div style="overflow-x:auto;">'+
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
            '<div style="overflow-x:auto;">'+
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
            '<div style="overflow-x:auto;">'+
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
            '<div style="overflow-x:auto;">'+
            '<table id="tabla5" class="table table-bordered nowrap"  width="100%"></table>' +
            "</div></div></div>"
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
          columnDefs: [{ className: "text-right", targets: [1, 2] }],
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
          columnDefs: [{ className: "text-right", targets: [1] }],
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
          columnDefs: [{ className: "text-right", targets: [1] }],
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
          columnDefs: [{ className: "text-right", targets: [1] }],
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
          columnDefs: [{ className: "text-right", targets: [1] }],
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
