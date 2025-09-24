function obtenerDatos() {
    return Promise.resolve("Datos listos");
}

function obtenerConCallback(callback) {
    obtenerDatos()
    .then(resultado => callback(null, resultado))
    .catch(error => callback(error, null));
}

obtenerConCallback((err, data) => {
    if (err) return console.error("Error:", err);
    console.log("Callback recibió:", data);
});
