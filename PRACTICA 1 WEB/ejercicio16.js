//promesa
function obtenerNumero() {
    return new Promise(resolve => {
    setTimeout(() => resolve(42), 1000);
    });
}

obtenerNumero()
    .then(num => console.log("El número es", num))
    .catch(err => console.error(err));
//async/await
function obtenerNumero() {
    return new Promise(resolve => {
    setTimeout(() => resolve(42), 1000);
    });
}
async function mostrarNumero() {
    try {
    const num = await obtenerNumero();
    console.log("El número es", num);
    } catch (err) {
    console.error(err);
    }
}
mostrarNumero();