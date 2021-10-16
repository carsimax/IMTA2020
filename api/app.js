const express = require("express");
var cors = require('cors')
const compressing = require('compressing');
const { convert } = require('geojson2shp');
var fs = require('fs');

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));


app.post('/', async function (req, res) {
  try {
    // const shapes = req.body;
    const { module, shapes } = req.body;

    const file_name = `SISUAR_${module}_${Date.now()}`;
    console.log(file_name);
    const folder_dir = `../temp/${file_name}`;
    const zip_dir = `../temp/${file_name}.tar`;
    const src = `/temp/${file_name}.tar`;

    fs.mkdirSync(folder_dir);
    for (const shape of shapes) {
      const path = `${folder_dir}/${shape.id}.zip`;
      await convert(JSON.parse(shape.geoJSON), path)
    }
    await compressing.zip.compressDir(folder_dir, zip_dir)

    res.json({ ok: true, message: 'se ha construido el shape', src })
    setTimeout(() => {
      fs.rmSync(folder_dir, { recursive: true });
      fs.rmSync(zip_dir, { recursive: true });
    }, 10000);
  } catch (error) {
    console.error(error);
    res.json({ ok: false, message: 'no se ha podido construir el shape' })
  }
});

var os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
  for (var k2 in interfaces[k]) {
    var address = interfaces[k][k2];
    if (address.family === 'IPv4' && !address.internal) {
      addresses.push(address.address);
    }
  }
}

console.log(addresses);



app.get('/', function (req, res) {
  res.send('Hola mundo')
});


app.listen(8000, () => {
  console.log("Started on PORT 8000");
})


