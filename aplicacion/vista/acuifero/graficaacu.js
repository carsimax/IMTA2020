/*
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */

/**
 * Funcion que grafica los organismos de cuenca
 * @param datos
 */
function graficaOC(datos) {
    document.getElementById("divGrafica").innerHTML = "";
    document.getElementById("divGrafica").innerHTML = "<canvas id=\"densityChart\"></canvas>";
    densityCanvas = document.getElementById("densityChart").getContext("2d");
    var chartOptions = {
        responsive: true,
        title: {
            display: true,
            text: datos.Organismo
        },
        tooltips: {
            mode: 'index',
            intersect: true
        },
        scales: {
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: 'Hectómetros cúbicos (hm³)'
                    },
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                }],
        }
    };

    rData = {
        label: 'R',
        data: [datos.R],
        backgroundColor: '#02ca33'
    };
    dncData = {
        label: 'DNC',
        data: [datos.DNC],
        backgroundColor: '#1850c0'
    };
    veasData = {
        label: 'VCAS',
        data: [datos.VEAS],
        backgroundColor: '#e76137'
    };

    dmaData = {
        label: 'DMA',
        data: [datos.DMA],
        backgroundColor: '#ffa202'
    };
    dispoData = {
        labels: [datos.Organismo],
        datasets: [rData, dncData, veasData, dmaData]
    };
    barChart = new Chart(densityCanvas, {
        type: 'bar',
        data: dispoData,
        options: chartOptions
    });

}
/**
 * Funcion que grafica los estados
 * @param datos
 */
function graficaEst(datos) {
    document.getElementById("divGrafica").innerHTML = "";
    document.getElementById("divGrafica").innerHTML = "<canvas id=\"densityChart\"></canvas>";
    densityCanvas = document.getElementById("densityChart").getContext("2d");
    var chartOptions = {
        responsive: true,
        title: {
            display: true,
            text: datos.Organismo
        },
        tooltips: {
            mode: 'index',
            intersect: true
        },
        scales: {
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: 'Hectómetros cúbicos (hm³)'
                    },
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                }],
        }
    };

    rData = {
        label: 'R',
        data: [datos.R],
        backgroundColor: '#02ca33'
    };
    dncData = {
        label: 'DNC',
        data: [datos.DNC],
        backgroundColor: '#1850c0'
    };
    veasData = {
        label: 'VCAS',
        data: [datos.VEAS],
        backgroundColor: '#e76137'
    };

    dmaData = {
        label: 'DMA',
        data: [datos.DMA],
        backgroundColor: '#ffa202'
    };
    dispoData = {
        labels: [datos.Estado],
        datasets: [rData, dncData, veasData, dmaData]
    };
    barChart = new Chart(densityCanvas, {
        type: 'bar',
        data: dispoData,
        options: chartOptions
    });

}
/**
 * Funcion que grafica los acuiferos
 * @param datos
 */
function graficaAcu(datos) {
    document.getElementById("divGrafica").innerHTML = "";
    document.getElementById("divGrafica").innerHTML = "<canvas id=\"densityChart\"></canvas>";
    densityCanvas = document.getElementById("densityChart").getContext("2d");
    var veas = 0;
    var chartOptions = {
        responsive: true,
        title: {
            display: true,
            text: datos.Organismo
        },
        tooltips: {
            mode: 'index',
            intersect: true
        },
        scales: {
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: 'Hectómetros cúbicos (hm³)'
                    },
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                }],
        }
    };

    rData = {
        label: 'R',
        data: [datos.R],
        backgroundColor: '#02ca33'
    };
    dncData = {
        label: 'DNC',
        data: [datos.DNC],
        backgroundColor: '#1850c0'
    };

    veasData = {
        label: 'VCAS',
        data: [datos.VEAS],
        backgroundColor: '#e76137'
    };

    dmaData = {
        label: 'DMA',
        data: [datos.DMA],
        backgroundColor: '#ffa202'
    };
    dispoData = {
        labels: [datos.Acuifero],
        datasets: [rData, dncData, veasData, dmaData]
    };
    barChart = new Chart(densityCanvas, {
        type: 'bar',
        data: dispoData,
        options: chartOptions
    });

}
/**
 * Funcion que grafica los municipio
 * @param datos
 */
function graficaMun(datos) {
    document.getElementById("divGrafica").innerHTML = "";
    document.getElementById("divGrafica").innerHTML = "<canvas id=\"densityChart\"></canvas>";
    densityCanvas = document.getElementById("densityChart").getContext("2d");
    l = datos.Estado + "-" + datos.Municipio;
    var chartOptions = {
        responsive: true,
        title: {
            display: true,
            text: l
        },
        tooltips: {
            mode: 'index',
            intersect: true
        },
        scales: {
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: 'Hectómetros cúbicos (hm³)'
                    },
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                }],
        }
    };

    rData = {
        label: 'R',
        data: [datos.R],
        backgroundColor: '#02ca33'
    };
    dncData = {
        label: 'DNC',
        data: [datos.DNC],
        backgroundColor: '#1850c0'
    };
    veasData = {
        label: 'VCAS',
        data: [datos.VEAS],
        backgroundColor: '#e76137'
    };

    dmaData = {
        label: 'DMA',
        data: [datos.DMA],
        backgroundColor: '#ffa202'
    };
    dispoData = {
        labels: [l],
        datasets: [rData, dncData, veasData, dmaData]
    };
    barChart = new Chart(densityCanvas, {
        type: 'bar',
        data: dispoData,
        options: chartOptions
    });

}