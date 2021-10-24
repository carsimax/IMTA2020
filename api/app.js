const express = require("express");
var cors = require('cors')
const compressing = require('compressing');
const { convert } = require('geojson2shp');
var mysql = require('mysql');
var fs = require('fs');

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));



var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'geoespacial'
});

connection.connect();


const query = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, elements) => {
      if (error) {
        return reject(error);
      }
      return resolve(elements);
    });
  });
};

app.post('/', async function (req, res) {
  try {
    const points = ['pozos', 'estaciones_climatologicas', 'estaciones_hidrologicas', 'sitio_db05', 'sitios_dqo', 'sitios_sst', 'sitios_cf'];
    const { querys, module } = req.body;
    // SE OBTIENEN LOS PATHS A UTILZAR
    const file_name = `SISUAR_${module}_${Date.now()}`;
    const folder_dir = `../temp/${file_name}`;
    const zip_dir = `../temp/${file_name}.zip`;
    const src = `/temp/${file_name}.zip`;
    fs.mkdirSync(folder_dir);

    // SE REALIZAN LAS CONSULTAS
    for (const consulta of querys) {
      let features = [];
      //SE CONSULTA A LA BASE DE DATOS GEOESPACIAL
      
      const path = `${folder_dir}/${consulta.id}.zip`;
      const isPoint = points.some((element) => element === consulta.id);
      if (isPoint) {
        const parsedInformation = JSON.parse(consulta.query);
        features = [...parsedInformation]
      }else{
        const rows = await query(consulta.query);
        rows.forEach((row) => features.push(JSON.parse(row.json)));
        // SE REALIZA LA CONV DEL SHAPE
        
      }
      await convert(features, path)
      
    }

    // SE COMPRIMEN TODOS LOS SHAPES EN UNA SOLA CARPETA
    await compressing.zip.compressDir(folder_dir, zip_dir);

    res.json({ ok: true, message: 'se ha construido el shape', src });

    setTimeout(() => {
      fs.rmSync(folder_dir, { recursive: true });
      fs.rmSync(zip_dir, { recursive: true });
    }, 10000);
  } catch (error) {
    console.log(error);
    res.json({ ok: false, message: 'no se ha podido realizar la consulta' })

  }
});


app.get('/', function (req, res) {
  res.send('Hola mundo')
});


app.listen(8000, () => {
  console.log("Started on PORT 8000");
});



// app.post('/', async function (req, res) {
//   try {
//     const { module, shapes } = req.body;
//     const file_name = `SISUAR_${module}_${Date.now()}`;
//     const folder_dir = `../temp/${file_name}`;
//     const zip_dir = `../temp/${file_name}.tar`;
//     const src = `/temp/${file_name}.tar`;

//     fs.mkdirSync(folder_dir);

//     for (const shape of shapes) {
//       const path = `${folder_dir}/${shape.id}.zip`;
//       await convert(JSON.parse(shape.geoJSON), path)
//     }

//     await compressing.zip.compressDir(folder_dir, zip_dir)


//     res.json({ ok: true, message: 'se ha construido el shape', src });

//     setTimeout(() => {
//       fs.rmSync(folder_dir, { recursive: true });
//       fs.rmSync(zip_dir, { recursive: true });
//     }, 10000);
//   } catch (error) {
//     console.error(error);
//     res.json({ ok: false, message: 'no se ha podido construir el shape' })
//   }
// });