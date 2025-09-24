const fs = require("fs");

function leerArchivoPromesa(ruta) {
    return new Promise((resolve, reject) => {
    fs.readFile(ruta, "utf8", (err, data) => {
        if (err) reject(err);
        else resolve(data);
    });
    });
}

leerArchivoPromesa("a.txt")
    .then(data => console.log("Contenido:", data))
    .catch(err => console.error(err));