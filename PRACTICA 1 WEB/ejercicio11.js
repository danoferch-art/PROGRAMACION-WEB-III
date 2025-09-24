function paso1() {
    return Promise.resolve("Encadenamiento 1");
}
function paso2(msg) {
    return Promise.resolve(msg + "Encadenamiento 2");
}
function paso3(msg) {
    return Promise.resolve(msg + "Encadenamiento 3");
}
paso1()
    .then(resultado1 => paso2(resultado1))
    .then(resultado2 => paso3(resultado2))
    .then(final => console.log(final))
    .catch(error => console.error(error));