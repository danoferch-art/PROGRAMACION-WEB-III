function login(usuario, pass) {
    return new Promise((resolve, reject) => {
    if (usuario === "dan" && pass === "1234") resolve({ id: 1, nombre: "Dan" });
    else reject("Credenciales inválidas");
    });
}
function obtenerPedidos(userId) {
    return Promise.resolve([{ id: 101, total: 50 }, { id: 102, total: 75 }]);
}

function calcularTotal(pedidos) {
    return Promise.resolve(pedidos.reduce((acc, p) => acc + p.total, 0));
}
login("dan", "1234")
    .then(user => {
    return obtenerPedidos(user.id).then(pedidos => {
        return calcularTotal(pedidos).then(total => {
        console.log(`Usuario: ${user.nombre}, Total de pedidos: $${total}`);
        });
    });
    })
    .catch(err => console.error(err));
//Async/await
async function proceso() {
    try {
    const user = await login("dan", "1234");
    const pedidos = await obtenerPedidos(user.id);
    const total = await calcularTotal(pedidos);

    console.log(`Usuario: ${user.nombre}, Total de pedidos: $${total}`);
    } catch (err) {
    console.error("Error:", err);
    }
}

proceso();
