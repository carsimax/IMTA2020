/**
 * llama al api para construir archivos Shapefiles de GEOJSON 
 * @param {string} module nombre del modulo de consulta
 */
const getShapefiles = (module) => {
  const capas = document.getElementById("geoJSON").childNodes;
  const shapes = [];
  capas.forEach((capa) => shapes.push({
    id: capa.id,
    geoJSON: capa.textContent
  }));


  document.getElementById("button_download_shapefile").disabled = true;
  document.getElementById("button_download_shapefile").style.opacity = "0.7";
  document.getElementById("button_download_shapefile").textContent = "Generando capas";

  const data = {
    module,
    shapes
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch("http://sisuar.imta.mx/api", requestOptions)
    .then(response => response.json())
    .then(result => {
      document.getElementById("button_download_shapefile").disabled = false;
      document.getElementById("button_download_shapefile").style.opacity = "1";
      document.getElementById("button_download_shapefile").textContent = "Descargar capas";
      console.log(result)
      const link = document.createElement("a");
      link.href = result.src;
      link.click();
    })
    .catch(error => console.log('error', error));
}