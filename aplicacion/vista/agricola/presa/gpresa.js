function graficarPresa(datos) {
    document.getElementById("divGrafica").innerHTML = "";
    document.getElementById("divGrafica").innerHTML = "<canvas id=\"densityChart\"></canvas>";
    densityCanvas = document.getElementById("densityChart").getContext("2d");
    var chartOptions = {
        responsive: true,
        barValueSpacing: 0,
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Hectómetros cúbicos (hm³)'
                }
            }]
        }
    };

    var nameData = {
        label: 'Capacidad al NAME (hm³)',
        data: [datos.cap_name],
        backgroundColor: 'rgba(97,208,0,0.6)'
    };

    var namoData = {
        label: 'Capacidad al NAMO (hm³)',
        data: [datos.cap_namo],
        backgroundColor: 'rgba(255,90,0,0.6)'
    };

    var almaData = {
        label: 'Vol. de almacenamiento (hm³)',
        data: [datos.vol_alma],
        backgroundColor: 'rgba(255,61,123,0.64)'
    };

    presaData = {
        labels: [datos.nom_oficial],
        datasets: [nameData, namoData, almaData]
    };
    barChart = new Chart(densityCanvas, {
        type: 'bar',
        data: presaData,
        options: chartOptions,

    });

}