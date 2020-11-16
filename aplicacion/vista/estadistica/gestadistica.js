/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */

/* Este script está dedicado a generar las gráficas de las estadísticas de las visitas a la plataforma.
 * Únicamente se contienen las funciones respectivas a la generación de las graficas de los diferentes
 * sectores en un lapso de tiempo establecido por el usuario.
 */

/*
 La función graficarAll() está diseñada para generar una grafica de todas las
 visitas a la plataforma sin ninguna restricción temporal.
 Solamente muestra las visitas de los módulos por sector.
 */
function graficarAll() {
    /*
     En esta parte de la función se tiene que generar un array de datos
     para cada uno de los módulos que están disponibles en la plataforma.
     */
    var etiquetas = [];
    var acuifero = [];
    var pozo = [];
    var agricola = [];
    var presa = [];

    //Se crea una cadena que contiene la acción a realizar en el controlado.
    cadena = "Accion=Toda";


    /*
     Aquí se manda a llamar a una función Ajax en la se mandan los datos a el
     controlador de las estadísticas y esta misma espera una respuesta del mismo.
     */
    $.ajax({
        //Se definen los parámetros de la función
        type: "POST",
        url: "/aplicacion/controlador/estadisticas.php",
        data: cadena,

        //Si la función del controlador devuelve una respuesta, se continua con la ejecución del script.
        success: function (resp) {

            /*
             La primera parte a realizar es obtener las etiquetas que van a ir en nuestra grafica.
             En este caso las etiquetas son los tipos de usuarios que pueden acceder a la plataforma,
             Esto sirve para si en un futuro se requieren mas tipos de usuario, no se realice una modificación de este código.
             */
            $.each(JSON.parse(resp), function (index, item) {
                etiquetas.push(item.sector);
            });

            /*
             Ya que los datos de las etiquetas se obtienen directamente de una consulta Mysql,
             es necesario quitar los valores repetidos. Para este caso utilizamos un set para
             únicamente dejar los valores únicos así no tener problemas con las etiquetas posteriormente.
             */
            etiquetas = [...new Set(etiquetas)];

            /*
             Una vez obtenidas las etiquetas es necesario, hacer un ciclo que recorra cada uno de los
             objetos del array devuelto por nuestro controlador.
             */
            $.each(JSON.parse(resp), function (index, item) {

                //En esta parte se tiene que realizar un ciclo para recorrer a nuestras etiquetas.
                etiquetas.forEach(function (valor, indice, array) {

                    /*
                     Si el valor del sector que se esta tomando del ciclo de las etiquetas es igual
                     al valor del sector del ciclo del array de los datos devueltos del controlador entrara a un switch.
                     */
                    if (valor == item.sector) {

                        /*
                         Este switch determina dependiendo el valor del atributo modulo a cuál pertenece.
                         Dependiendo el caso se agregará en alguno de los arrays correspondientes a alguno de los módulos.
                         */
                        switch (item.modulo) {
                            case 'Acuíferos':
                                acuifero.push(item.consultas);
                                break;
                            case 'Pozos':
                                pozo.push(item.consultas);
                                break;
                            case 'Estadística Agrícola':
                                agricola.push(item.consultas);
                                break;
                            case 'Presas':
                                presa.push(item.consultas);
                                break;
                        }
                    }

                    //Esto se realizara para cada etiqueta dentro del array de etiquetas.
                });

                //Esto se realizara para objeto del array devuelto por el controlador.
            });

            /*Para que la grafica siempre esta actualizada en su última actualización de datos, es necesario
             limpiar la sección HTML donde se contiene el mismo.
             Para esto hacemos referencia al div donde se encuentra la grafica y quitamos lo que esta dentro del div.
             */
            document.getElementById("divGrafica").innerHTML = "";

            //Posteriormente se inserta nuevamente el código HTML del canvas que es la que contiene la grafica generada.
            document.getElementById("divGrafica").innerHTML = "<canvas id=\"densityChart\"></canvas>";

            //Obtenemos la variable que hace referencia a la sección del canvas.
            densityCanvas = document.getElementById("densityChart").getContext("2d");

            /*
             Finalmente, como no sabemos en un futuro cuantas etiquetas contenidas la plataforma.
             Se teniente que hacer que el canvas tenga un tamaño dinámico, que cambie conforme al numero de etiquetas,
             esto es para que la grafica tenga el espacio necesario y pueda visualizarse de forma correcta.
             */
            densityCanvas.height = ((etiquetas.length) * 40);

            //Esta variable define los parámetros de la gráfica.
            var chartOptions = {
                responsive: true,
                barValueSpacing: 0,
                scales: {
                    yAxes: [{
                            ticks: {
                                min: 0,
                            }
                        }]
                }
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a acuíferos.
            acuiferoData = {
                label: 'Consulta Acuíferos',
                data: acuifero,
                backgroundColor: 'rgba(0,255,46,0.6)'
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a pozos
            pozoData = {
                label: 'Consulta Pozos',
                data: pozo,
                backgroundColor: 'rgba(208,0,102,0.6)'
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a Estadística agrícola
            agricolaData = {
                label: 'Consulta Estadistíca Agrícola',
                data: agricola,
                backgroundColor: 'rgba(255,75,24,0.6)'
            }

            //Esta es la variable de la configuración para la barra que contiene las consultas a presas
            presalaData = {
                label: 'Consulta Presas',
                data: presa,
                backgroundColor: 'rgba(237,255,46,0.6)'
            };

            //Esta variable contiene las etiquetas y los datos a contener de cada una.
            estadisticaData = {
                labels: etiquetas,
                datasets: [acuiferoData, pozoData, agricolaData, presalaData]
            };

            //La variable barCart se genera la gráfica con todos los datos anteriores
            barChart = new Chart(densityCanvas, {
                type: 'horizontalBar',
                data: estadisticaData,
                options: chartOptions
            });

        }
    });
}

/*
 La función graficarSectores() está diseñada para generar una grafica de todas las
 visitas a la plataforma con restricción temporal.
 Solamente muestra las visitas de los módulos por sector.
 */
function graficarSectores(fechaInicio, fechaFin) {
    /*
     En esta parte de la función se tiene que generar un array de datos
     para cada uno de los módulos que están disponibles en la plataforma.
     */
    var acuifero = [];
    var pozo = [];
    var agricola = [];
    var etiquetas = [];
    var presa = [];

    //Se crea una cadena que contiene la acción a realizar en el controlado.
    cadena = "FI=" + fechaInicio + "&FF=" + fechaFin + "&Accion=TodaFecha";

    /*
     Aquí se manda a llamar a una función Ajax en la se mandan los datos a el
     controlador de las estadísticas y esta misma espera una respuesta del mismo.
     */
    $.ajax({
        //Se definen los parámetros de la función
        type: "GET",
        url: "/aplicacion/controlador/estadisticas.php",
        data: cadena,

        //Si la función del controlador devuelve una respuesta, se continua con la ejecución del script.
        success: function (resp) {

            /*
             La primera parte a realizar es obtener las etiquetas que van a ir en nuestra grafica.
             En este caso las etiquetas son los tipos de usuarios que pueden acceder a la plataforma,
             Esto sirve para si en un futuro se requieren mas tipos de usuario, no se realice una modificación de este código.
             */
            $.each(JSON.parse(resp), function (index, item) {
                etiquetas.push(item.sector);
            });

            /*
             Ya que los datos de las etiquetas se obtienen directamente de una consulta Mysql,
             es necesario quitar los valores repetidos. Para este caso utilizamos un set para
             únicamente dejar los valores únicos así no tener problemas con las etiquetas posteriormente.
             */
            etiquetas = [...new Set(etiquetas)];

            /*
             Una vez obtenidas las etiquetas es necesario, hacer un ciclo que recorra cada uno de los
             objetos del array devuelto por nuestro controlador.
             */
            $.each(JSON.parse(resp), function (index, item) {

                //En esta parte se tiene que realizar un ciclo para recorrer a nuestras etiquetas.
                etiquetas.forEach(function (valor, indice, array) {

                    /*
                     Si el valor del sector que se esta tomando del ciclo de las etiquetas es igual
                     al valor del sector del ciclo del array de los datos devueltos del controlador entrara a un switch.
                     */
                    if (valor == item.sector) {

                        /*
                         Este switch determina dependiendo el valor del atributo modulo a cuál pertenece.
                         Dependiendo el caso se agregará en alguno de los arrays correspondientes a alguno de los módulos.
                         */
                        switch (item.modulo) {
                            case 'Acuíferos':
                                acuifero.push(item.consultas);
                                break;
                            case 'Pozos':
                                pozo.push(item.consultas);
                                break;
                            case 'Agricola':
                                agricola.push(item.consultas);
                                break;
                            case 'Presas':
                                presa.push(item.consultas);
                                break;
                        }
                    }

                    //Esto se realizara para cada etiqueta dentro del array de etiquetas.
                });

                //Esto se realizara para objeto del array devuelto por el controlador.
            });

            /*Para que la grafica siempre esta actualizada en su última actualización de datos, es necesario
             limpiar la sección HTML donde se contiene el mismo.
             Para esto hacemos referencia al div donde se encuentra la grafica y quitamos lo que esta dentro del div.
             */
            document.getElementById("divGrafica").innerHTML = "";

            //Posteriormente se inserta nuevamente el código HTML del canvas que es la que contiene la grafica generada.
            document.getElementById("divGrafica").innerHTML = "<canvas id=\"densityChart\"></canvas>";

            //Obtenemos la variable que hace referencia a la sección del canvas.
            densityCanvas = document.getElementById("densityChart").getContext("2d");

            /*
             Finalmente, como no sabemos en un futuro cuantas etiquetas contenidas la plataforma.
             Se teniente que hacer que el canvas tenga un tamaño dinámico, que cambie conforme al numero de etiquetas,
             esto es para que la grafica tenga el espacio necesario y pueda visualizarse de forma correcta.
             */
            densityCanvas.height = ((etiquetas.length) * 40);

            //Esta variable define los parámetros de la gráfica.
            var chartOptions = {
                responsive: true,
                barValueSpacing: 0,
                scales: {
                    yAxes: [{
                            ticks: {
                                min: 0,
                            }
                        }]
                }
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a acuíferos.
            acuiferoData = {
                label: 'Consulta Acuíferos',
                data: acuifero,
                backgroundColor: 'rgba(0,255,46,0.6)'
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a pozos
            pozoData = {
                label: 'Consulta Pozos',
                data: pozo,
                backgroundColor: 'rgba(208,0,102,0.6)'
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a Estadística agrícola
            agricolaData = {
                label: 'Consulta Estadística Agrícola',
                data: agricola,
                backgroundColor: 'rgba(255,75,24,0.6)'
            }

            //Esta es la variable de la configuración para la barra que contiene las consultas a presas
            presalaData = {
                label: 'Consulta Presas',
                data: presa,
                backgroundColor: 'rgba(237,255,46,0.6)'
            };

            //Esta variable contiene las etiquetas y los datos a contener de cada una.
            estadisticaData = {
                labels: etiquetas,
                datasets: [acuiferoData, pozoData, agricolaData, presalaData]
            };

            //La variable barCart se genera la gráfica con todos los datos anteriores
            barChart = new Chart(densityCanvas, {
                type: 'horizontalBar',
                data: estadisticaData,
                options: chartOptions
            });

        }
    });
}

/*
 La función graficarEducativo() está diseñada para generar una grafica de todas las
 visitas a la plataforma con restricción temporal del sector educativo.
 Solamente muestra las visitas de los módulos por institucion.
 */
function graficarEducativo(fechaInicio, fechaFin) {

    var acuifero = [];
    var pozo = [];
    var agricola = [];
    var etiquetas = [];
    var presa = [];
    cadena = "FI=" + fechaInicio + "&FF=" + fechaFin + "&Accion=Educativo";
    //Se manda a llamar al controlador que me devolvera los estados
    $.ajax({
        //Se definen los parámetros de la función
        type: "GET",
        url: "/aplicacion/controlador/estadisticas.php",
        data: cadena,

        //Si la función del controlador devuelve una respuesta, se continua con la ejecución del script.
        success: function (resp) {

            /*
             La primera parte a realizar es obtener las etiquetas que van a ir en nuestra grafica.
             En este caso las etiquetas son los tipos de usuarios que pueden acceder a la plataforma,
             Esto sirve para si en un futuro se requieren mas tipos de usuario, no se realice una modificación de este código.
             */
            $.each(JSON.parse(resp), function (index, item) {
                etiquetas.push(item.institucion);
            });

            /*
             Ya que los datos de las etiquetas se obtienen directamente de una consulta Mysql,
             es necesario quitar los valores repetidos. Para este caso utilizamos un set para
             únicamente dejar los valores únicos así no tener problemas con las etiquetas posteriormente.
             */
            etiquetas = [...new Set(etiquetas)];

            /*
             Una vez obtenidas las etiquetas es necesario, hacer un ciclo que recorra cada uno de los
             objetos del array devuelto por nuestro controlador.
             */
            $.each(JSON.parse(resp), function (index, item) {

                //En esta parte se tiene que realizar un ciclo para recorrer a nuestras etiquetas.
                etiquetas.forEach(function (valor, indice, array) {

                    /*
                     Si el valor del sector que se esta tomando del ciclo de las etiquetas es igual
                     al valor del sector del ciclo del array de los datos devueltos del controlador entrara a un switch.
                     */
                    if (valor == item.institucion) {

                        /*
                         Este switch determina dependiendo el valor del atributo modulo a cuál pertenece.
                         Dependiendo el caso se agregará en alguno de los arrays correspondientes a alguno de los módulos.
                         */
                        switch (item.modulo) {
                            case 'Acuíferos':
                                acuifero.push(item.consultas);
                                break;
                            case 'Pozos':
                                pozo.push(item.consultas);
                                break;
                            case 'Agricola':
                                agricola.push(item.consultas);
                                break;
                            case 'Presas':
                                presa.push(item.consultas);
                                break;
                        }
                    }

                    //Esto se realizara para cada etiqueta dentro del array de etiquetas.
                });

                //Esto se realizara para objeto del array devuelto por el controlador.
            });

            /*Para que la grafica siempre esta actualizada en su última actualización de datos, es necesario
             limpiar la sección HTML donde se contiene el mismo.
             Para esto hacemos referencia al div donde se encuentra la grafica y quitamos lo que esta dentro del div.
             */
            document.getElementById("divGrafica").innerHTML = "";

            //Posteriormente se inserta nuevamente el código HTML del canvas que es la que contiene la grafica generada.
            document.getElementById("divGrafica").innerHTML = "<canvas id=\"densityChart\"></canvas>";

            //Obtenemos la variable que hace referencia a la sección del canvas.
            densityCanvas = document.getElementById("densityChart").getContext("2d");

            /*
             Finalmente, como no sabemos en un futuro cuantas etiquetas contenidas la plataforma.
             Se teniente que hacer que el canvas tenga un tamaño dinámico, que cambie conforme al numero de etiquetas,
             esto es para que la grafica tenga el espacio necesario y pueda visualizarse de forma correcta.
             */
            densityCanvas.height = ((etiquetas.length) * 40);

            //Esta variable define los parámetros de la gráfica.
            var chartOptions = {
                responsive: true,
                barValueSpacing: 0,
                scales: {
                    yAxes: [{
                            ticks: {
                                min: 0,
                            }
                        }]
                }
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a acuíferos.
            acuiferoData = {
                label: 'Consulta Acuíferos',
                data: acuifero,
                backgroundColor: 'rgba(0,255,46,0.6)'
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a pozos
            pozoData = {
                label: 'Consulta Pozos',
                data: pozo,
                backgroundColor: 'rgba(208,0,102,0.6)'
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a Estadística agrícola
            agricolaData = {
                label: 'Consulta Estadística Agrícola',
                data: agricola,
                backgroundColor: 'rgba(255,75,24,0.6)'
            }

            //Esta es la variable de la configuración para la barra que contiene las consultas a presas
            presalaData = {
                label: 'Consulta Presas',
                data: presa,
                backgroundColor: 'rgba(237,255,46,0.6)'
            };

            //Esta variable contiene las etiquetas y los datos a contener de cada una.
            estadisticaData = {
                labels: etiquetas,
                datasets: [acuiferoData, pozoData, agricolaData, presalaData]
            };

            //La variable barCart se genera la gráfica con todos los datos anteriores
            barChart = new Chart(densityCanvas, {
                type: 'horizontalBar',
                data: estadisticaData,
                options: chartOptions
            });

        }
    });
}

/*
 La función graficarEducativo() está diseñada para generar una grafica de todas las
 visitas a la plataforma con restricción temporal del sector publico.
 Solamente muestra las visitas de los módulos por institucion.
 */
function graficarPublico(fechaInicio, fechaFin) {
    var acuifero = [];
    var pozo = [];
    var agricola = [];
    var etiquetas = [];
    var presa = [];
    cadena = "FI=" + fechaInicio + "&FF=" + fechaFin + "&Accion=Publico";
    //Se manda a llamar al controlador que me devolvera los estados
    $.ajax({
        //Se definen los parámetros de la función
        type: "GET",
        url: "/aplicacion/controlador/estadisticas.php",
        data: cadena,

        //Si la función del controlador devuelve una respuesta, se continua con la ejecución del script.
        success: function (resp) {

            /*
             La primera parte a realizar es obtener las etiquetas que van a ir en nuestra grafica.
             En este caso las etiquetas son los tipos de usuarios que pueden acceder a la plataforma,
             Esto sirve para si en un futuro se requieren mas tipos de usuario, no se realice una modificación de este código.
             */
            $.each(JSON.parse(resp), function (index, item) {
                etiquetas.push(item.institucion);
            });

            /*
             Ya que los datos de las etiquetas se obtienen directamente de una consulta Mysql,
             es necesario quitar los valores repetidos. Para este caso utilizamos un set para
             únicamente dejar los valores únicos así no tener problemas con las etiquetas posteriormente.
             */
            etiquetas = [...new Set(etiquetas)];

            /*
             Una vez obtenidas las etiquetas es necesario, hacer un ciclo que recorra cada uno de los
             objetos del array devuelto por nuestro controlador.
             */
            $.each(JSON.parse(resp), function (index, item) {

                //En esta parte se tiene que realizar un ciclo para recorrer a nuestras etiquetas.
                etiquetas.forEach(function (valor, indice, array) {

                    /*
                     Si el valor del sector que se esta tomando del ciclo de las etiquetas es igual
                     al valor del sector del ciclo del array de los datos devueltos del controlador entrara a un switch.
                     */
                    if (valor == item.institucion) {

                        /*
                         Este switch determina dependiendo el valor del atributo modulo a cuál pertenece.
                         Dependiendo el caso se agregará en alguno de los arrays correspondientes a alguno de los módulos.
                         */
                        switch (item.modulo) {
                            case 'Acuíferos':
                                acuifero.push(item.consultas);
                                break;
                            case 'Pozos':
                                pozo.push(item.consultas);
                                break;
                            case 'Agricola':
                                agricola.push(item.consultas);
                                break;
                            case 'Presas':
                                presa.push(item.consultas);
                                break;
                        }
                    }

                    //Esto se realizara para cada etiqueta dentro del array de etiquetas.
                });

                //Esto se realizara para objeto del array devuelto por el controlador.
            });

            /*Para que la grafica siempre esta actualizada en su última actualización de datos, es necesario
             limpiar la sección HTML donde se contiene el mismo.
             Para esto hacemos referencia al div donde se encuentra la grafica y quitamos lo que esta dentro del div.
             */
            document.getElementById("divGrafica").innerHTML = "";

            //Posteriormente se inserta nuevamente el código HTML del canvas que es la que contiene la grafica generada.
            document.getElementById("divGrafica").innerHTML = "<canvas id=\"densityChart\"></canvas>";

            //Obtenemos la variable que hace referencia a la sección del canvas.
            densityCanvas = document.getElementById("densityChart").getContext("2d");

            /*
             Finalmente, como no sabemos en un futuro cuantas etiquetas contenidas la plataforma.
             Se teniente que hacer que el canvas tenga un tamaño dinámico, que cambie conforme al numero de etiquetas,
             esto es para que la grafica tenga el espacio necesario y pueda visualizarse de forma correcta.
             */
            densityCanvas.height = ((etiquetas.length) * 40);

            //Esta variable define los parámetros de la gráfica.
            var chartOptions = {
                responsive: true,
                barValueSpacing: 0,
                scales: {
                    yAxes: [{
                            ticks: {
                                min: 0,
                            }
                        }]
                }
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a acuíferos.
            acuiferoData = {
                label: 'Consulta Acuíferos',
                data: acuifero,
                backgroundColor: 'rgba(0,255,46,0.6)'
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a pozos
            pozoData = {
                label: 'Consulta Pozos',
                data: pozo,
                backgroundColor: 'rgba(208,0,102,0.6)'
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a Estadística agrícola
            agricolaData = {
                label: 'Consulta Estadística Agrícola',
                data: agricola,
                backgroundColor: 'rgba(255,75,24,0.6)'
            }

            //Esta es la variable de la configuración para la barra que contiene las consultas a presas
            presalaData = {
                label: 'Consulta Presas',
                data: presa,
                backgroundColor: 'rgba(237,255,46,0.6)'
            };

            //Esta variable contiene las etiquetas y los datos a contener de cada una.
            estadisticaData = {
                labels: etiquetas,
                datasets: [acuiferoData, pozoData, agricolaData, presalaData]
            };

            //La variable barCart se genera la gráfica con todos los datos anteriores
            barChart = new Chart(densityCanvas, {
                type: 'horizontalBar',
                data: estadisticaData,
                options: chartOptions
            });

        }
    });
}

/*
 La función graficarEducativo() está diseñada para generar una grafica de todas las
 visitas a la plataforma con restricción temporal del sector privado.
 Solamente muestra las visitas de los módulos por institucion.
 */
function graficarPrivado(fechaInicio, fechaFin) {
    var acuifero = [];
    var pozo = [];
    var agricola = [];
    var etiquetas = [];
    var presa = [];
    cadena = "FI=" + fechaInicio + "&FF=" + fechaFin + "&Accion=Privado";
    //Se manda a llamar al controlador que me devolvera los estados
    $.ajax({
        //Se definen los parámetros de la función
        type: "GET",
        url: "/aplicacion/controlador/estadisticas.php",
        data: cadena,

        //Si la función del controlador devuelve una respuesta, se continua con la ejecución del script.
        success: function (resp) {

            /*
             La primera parte a realizar es obtener las etiquetas que van a ir en nuestra grafica.
             En este caso las etiquetas son los tipos de usuarios que pueden acceder a la plataforma,
             Esto sirve para si en un futuro se requieren mas tipos de usuario, no se realice una modificación de este código.
             */
            $.each(JSON.parse(resp), function (index, item) {
                etiquetas.push(item.institucion);
            });

            /*
             Ya que los datos de las etiquetas se obtienen directamente de una consulta Mysql,
             es necesario quitar los valores repetidos. Para este caso utilizamos un set para
             únicamente dejar los valores únicos así no tener problemas con las etiquetas posteriormente.
             */
            etiquetas = [...new Set(etiquetas)];

            /*
             Una vez obtenidas las etiquetas es necesario, hacer un ciclo que recorra cada uno de los
             objetos del array devuelto por nuestro controlador.
             */
            $.each(JSON.parse(resp), function (index, item) {

                //En esta parte se tiene que realizar un ciclo para recorrer a nuestras etiquetas.
                etiquetas.forEach(function (valor, indice, array) {

                    /*
                     Si el valor del sector que se esta tomando del ciclo de las etiquetas es igual
                     al valor del sector del ciclo del array de los datos devueltos del controlador entrara a un switch.
                     */
                    if (valor == item.institucion) {

                        /*
                         Este switch determina dependiendo el valor del atributo modulo a cuál pertenece.
                         Dependiendo el caso se agregará en alguno de los arrays correspondientes a alguno de los módulos.
                         */
                        switch (item.modulo) {
                            case 'Acuíferos':
                                acuifero.push(item.consultas);
                                break;
                            case 'Pozos':
                                pozo.push(item.consultas);
                                break;
                            case 'Agricola':
                                agricola.push(item.consultas);
                                break;
                            case 'Presas':
                                presa.push(item.consultas);
                                break;
                        }
                    }

                    //Esto se realizara para cada etiqueta dentro del array de etiquetas.
                });

                //Esto se realizara para objeto del array devuelto por el controlador.
            });

            /*Para que la grafica siempre esta actualizada en su última actualización de datos, es necesario
             limpiar la sección HTML donde se contiene el mismo.
             Para esto hacemos referencia al div donde se encuentra la grafica y quitamos lo que esta dentro del div.
             */
            document.getElementById("divGrafica").innerHTML = "";

            //Posteriormente se inserta nuevamente el código HTML del canvas que es la que contiene la grafica generada.
            document.getElementById("divGrafica").innerHTML = "<canvas id=\"densityChart\"></canvas>";

            //Obtenemos la variable que hace referencia a la sección del canvas.
            densityCanvas = document.getElementById("densityChart").getContext("2d");

            /*
             Finalmente, como no sabemos en un futuro cuantas etiquetas contenidas la plataforma.
             Se teniente que hacer que el canvas tenga un tamaño dinámico, que cambie conforme al numero de etiquetas,
             esto es para que la grafica tenga el espacio necesario y pueda visualizarse de forma correcta.
             */
            densityCanvas.height = ((etiquetas.length) * 40);

            //Esta variable define los parámetros de la gráfica.
            var chartOptions = {
                responsive: true,
                barValueSpacing: 0,
                scales: {
                    yAxes: [{
                            ticks: {
                                min: 0,
                            }
                        }]
                }
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a acuíferos.
            acuiferoData = {
                label: 'Consulta Acuíferos',
                data: acuifero,
                backgroundColor: 'rgba(0,255,46,0.6)'
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a pozos
            pozoData = {
                label: 'Consulta Pozos',
                data: pozo,
                backgroundColor: 'rgba(208,0,102,0.6)'
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a Estadística agrícola
            agricolaData = {
                label: 'Consulta Estadística Agrícola',
                data: agricola,
                backgroundColor: 'rgba(255,75,24,0.6)'
            }

            //Esta es la variable de la configuración para la barra que contiene las consultas a presas
            presalaData = {
                label: 'Consulta Presas',
                data: presa,
                backgroundColor: 'rgba(237,255,46,0.6)'
            };

            //Esta variable contiene las etiquetas y los datos a contener de cada una.
            estadisticaData = {
                labels: etiquetas,
                datasets: [acuiferoData, pozoData, agricolaData, presalaData]
            };

            //La variable barCart se genera la gráfica con todos los datos anteriores
            barChart = new Chart(densityCanvas, {
                type: 'horizontalBar',
                data: estadisticaData,
                options: chartOptions
            });

        }
    });
}

/*
 La función graficarEducativo() está diseñada para generar una grafica de todas las
 visitas a la plataforma con restricción temporal del sector sin especificar.
 Solamente muestra las visitas de los módulos por institucion.
 */
function graficarSE(fechaInicio, fechaFin) {
    var acuifero = [];
    var pozo = [];
    var agricola = [];
    var etiquetas = [];
    var presa = [];
    cadena = "FI=" + fechaInicio + "&FF=" + fechaFin + "&Accion=SE";
    //Se manda a llamar al controlador que me devolvera los estados
    $.ajax({
        //Se definen los parámetros de la función
        type: "GET",
        url: "/aplicacion/controlador/estadisticas.php",
        data: cadena,

        //Si la función del controlador devuelve una respuesta, se continua con la ejecución del script.
        success: function (resp) {

            /*
             La primera parte a realizar es obtener las etiquetas que van a ir en nuestra grafica.
             En este caso las etiquetas son los tipos de usuarios que pueden acceder a la plataforma,
             Esto sirve para si en un futuro se requieren mas tipos de usuario, no se realice una modificación de este código.
             */
            $.each(JSON.parse(resp), function (index, item) {
                etiquetas.push(item.institucion);
            });

            /*
             Ya que los datos de las etiquetas se obtienen directamente de una consulta Mysql,
             es necesario quitar los valores repetidos. Para este caso utilizamos un set para
             únicamente dejar los valores únicos así no tener problemas con las etiquetas posteriormente.
             */
            etiquetas = [...new Set(etiquetas)];

            /*
             Una vez obtenidas las etiquetas es necesario, hacer un ciclo que recorra cada uno de los
             objetos del array devuelto por nuestro controlador.
             */
            $.each(JSON.parse(resp), function (index, item) {

                //En esta parte se tiene que realizar un ciclo para recorrer a nuestras etiquetas.
                etiquetas.forEach(function (valor, indice, array) {

                    /*
                     Si el valor del sector que se esta tomando del ciclo de las etiquetas es igual
                     al valor del sector del ciclo del array de los datos devueltos del controlador entrara a un switch.
                     */
                    if (valor == item.institucion) {

                        /*
                         Este switch determina dependiendo el valor del atributo modulo a cuál pertenece.
                         Dependiendo el caso se agregará en alguno de los arrays correspondientes a alguno de los módulos.
                         */
                        switch (item.modulo) {
                            case 'Acuíferos':
                                acuifero.push(item.consultas);
                                break;
                            case 'Pozos':
                                pozo.push(item.consultas);
                                break;
                            case 'Agricola':
                                agricola.push(item.consultas);
                                break;
                            case 'Presas':
                                presa.push(item.consultas);
                                break;
                        }
                    }

                    //Esto se realizara para cada etiqueta dentro del array de etiquetas.
                });

                //Esto se realizara para objeto del array devuelto por el controlador.
            });

            /*Para que la grafica siempre esta actualizada en su última actualización de datos, es necesario
             limpiar la sección HTML donde se contiene el mismo.
             Para esto hacemos referencia al div donde se encuentra la grafica y quitamos lo que esta dentro del div.
             */
            document.getElementById("divGrafica").innerHTML = "";

            //Posteriormente se inserta nuevamente el código HTML del canvas que es la que contiene la grafica generada.
            document.getElementById("divGrafica").innerHTML = "<canvas id=\"densityChart\"></canvas>";

            //Obtenemos la variable que hace referencia a la sección del canvas.
            densityCanvas = document.getElementById("densityChart").getContext("2d");

            /*
             Finalmente, como no sabemos en un futuro cuantas etiquetas contenidas la plataforma.
             Se teniente que hacer que el canvas tenga un tamaño dinámico, que cambie conforme al numero de etiquetas,
             esto es para que la grafica tenga el espacio necesario y pueda visualizarse de forma correcta.
             */
            densityCanvas.height = ((etiquetas.length) * 40);

            //Esta variable define los parámetros de la gráfica.
            var chartOptions = {
                responsive: true,
                barValueSpacing: 0,
                scales: {
                    yAxes: [{
                            ticks: {
                                min: 0,
                            }
                        }]
                }
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a acuíferos.
            acuiferoData = {
                label: 'Consulta Acuíferos',
                data: acuifero,
                backgroundColor: 'rgba(0,255,46,0.6)'
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a pozos
            pozoData = {
                label: 'Consulta Pozos',
                data: pozo,
                backgroundColor: 'rgba(208,0,102,0.6)'
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a Estadística agrícola
            agricolaData = {
                label: 'Consulta Estadística Agrícola',
                data: agricola,
                backgroundColor: 'rgba(255,75,24,0.6)'
            }

            //Esta es la variable de la configuración para la barra que contiene las consultas a presas
            presalaData = {
                label: 'Consulta Presas',
                data: presa,
                backgroundColor: 'rgba(237,255,46,0.6)'
            };

            //Esta variable contiene las etiquetas y los datos a contener de cada una.
            estadisticaData = {
                labels: etiquetas,
                datasets: [acuiferoData, pozoData, agricolaData, presalaData]
            };

            //La variable barCart se genera la gráfica con todos los datos anteriores
            barChart = new Chart(densityCanvas, {
                type: 'horizontalBar',
                data: estadisticaData,
                options: chartOptions
            });

        }
    });
}

/*
 La función graficarEducativo() está diseñada para generar una grafica de todas las
 visitas a la plataforma con restricción temporal y nivel eductivo.
 Solamente muestra las visitas de los módulos por nivel educativo.
 */
function graficarNE(fechaInicio, fechaFin) {
    var acuifero = [];
    var pozo = [];
    var agricola = [];
    var etiquetas = [];
    var presa = [];
    cadena = "FI=" + fechaInicio + "&FF=" + fechaFin + "&Accion=NE";
    //Se manda a llamar al controlador que me devolvera los estados
    $.ajax({
        //Se definen los parámetros de la función
        type: "GET",
        url: "/aplicacion/controlador/estadisticas.php",
        data: cadena,

        //Si la función del controlador devuelve una respuesta, se continua con la ejecución del script.
        success: function (resp) {

            /*
             La primera parte a realizar es obtener las etiquetas que van a ir en nuestra grafica.
             En este caso las etiquetas son los tipos de usuarios que pueden acceder a la plataforma,
             Esto sirve para si en un futuro se requieren mas tipos de usuario, no se realice una modificación de este código.
             */
            $.each(JSON.parse(resp), function (index, item) {
                etiquetas.push(item.grado);
            });

            /*
             Ya que los datos de las etiquetas se obtienen directamente de una consulta Mysql,
             es necesario quitar los valores repetidos. Para este caso utilizamos un set para
             únicamente dejar los valores únicos así no tener problemas con las etiquetas posteriormente.
             */
            etiquetas = [...new Set(etiquetas)];

            /*
             Una vez obtenidas las etiquetas es necesario, hacer un ciclo que recorra cada uno de los
             objetos del array devuelto por nuestro controlador.
             */
            $.each(JSON.parse(resp), function (index, item) {

                //En esta parte se tiene que realizar un ciclo para recorrer a nuestras etiquetas.
                etiquetas.forEach(function (valor, indice, array) {

                    /*
                     Si el valor del sector que se esta tomando del ciclo de las etiquetas es igual
                     al valor del sector del ciclo del array de los datos devueltos del controlador entrara a un switch.
                     */
                    if (valor == item.grado) {

                        /*
                         Este switch determina dependiendo el valor del atributo modulo a cuál pertenece.
                         Dependiendo el caso se agregará en alguno de los arrays correspondientes a alguno de los módulos.
                         */
                        switch (item.modulo) {
                            case 'Acuíferos':
                                acuifero.push(item.consultas);
                                break;
                            case 'Pozos':
                                pozo.push(item.consultas);
                                break;
                            case 'Agricola':
                                agricola.push(item.consultas);
                                break;
                            case 'Presas':
                                presa.push(item.consultas);
                                break;
                        }
                    }

                    //Esto se realizara para cada etiqueta dentro del array de etiquetas.
                });

                //Esto se realizara para objeto del array devuelto por el controlador.
            });

            /*Para que la grafica siempre esta actualizada en su última actualización de datos, es necesario
             limpiar la sección HTML donde se contiene el mismo.
             Para esto hacemos referencia al div donde se encuentra la grafica y quitamos lo que esta dentro del div.
             */
            document.getElementById("divGrafica").innerHTML = "";

            //Posteriormente se inserta nuevamente el código HTML del canvas que es la que contiene la grafica generada.
            document.getElementById("divGrafica").innerHTML = "<canvas id=\"densityChart\"></canvas>";

            //Obtenemos la variable que hace referencia a la sección del canvas.
            densityCanvas = document.getElementById("densityChart").getContext("2d");

            /*
             Finalmente, como no sabemos en un futuro cuantas etiquetas contenidas la plataforma.
             Se teniente que hacer que el canvas tenga un tamaño dinámico, que cambie conforme al numero de etiquetas,
             esto es para que la grafica tenga el espacio necesario y pueda visualizarse de forma correcta.
             */
            densityCanvas.height = ((etiquetas.length) * 40);

            //Esta variable define los parámetros de la gráfica.
            var chartOptions = {
                responsive: true,
                barValueSpacing: 0,
                scales: {
                    yAxes: [{
                            ticks: {
                                min: 0,
                            }
                        }]
                }
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a acuíferos.
            acuiferoData = {
                label: 'Consulta Acuíferos',
                data: acuifero,
                backgroundColor: 'rgba(0,255,46,0.6)'
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a pozos
            pozoData = {
                label: 'Consulta Pozos',
                data: pozo,
                backgroundColor: 'rgba(208,0,102,0.6)'
            };

            //Esta es la variable de la configuración para la barra que contiene las consultas a Estadística agrícola
            agricolaData = {
                label: 'Consulta Estadística Agrícola',
                data: agricola,
                backgroundColor: 'rgba(255,75,24,0.6)'
            }

            //Esta es la variable de la configuración para la barra que contiene las consultas a presas
            presalaData = {
                label: 'Consulta Presas',
                data: presa,
                backgroundColor: 'rgba(237,255,46,0.6)'
            };

            //Esta variable contiene las etiquetas y los datos a contener de cada una.
            estadisticaData = {
                labels: etiquetas,
                datasets: [acuiferoData, pozoData, agricolaData, presalaData]
            };

            //La variable barCart se genera la gráfica con todos los datos anteriores
            barChart = new Chart(densityCanvas, {
                type: 'horizontalBar',
                data: estadisticaData,
                options: chartOptions
            });

        }
    });
}