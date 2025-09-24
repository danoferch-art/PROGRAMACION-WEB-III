// Con callbacks
const fs = require("fs");

fs.readFile("a.txt", "utf8", (err, dataA) => {
    if (err) return console.error(err);

    fs.readFile("b.txt", "utf8", (err, dataB) => {
    if (err) return console.error(err);

    fs.writeFile("c.txt", dataA + dataB, (err) => {
        if (err) return console.error(err);
        console.log("Archivo creado ✅");
    });
    });
});
// Con async/await
const fs = require("fs").promises;

async function combinar() {
    try {
    const dataA = await fs.readFile("a.txt", "utf8");
    const dataB = await fs.readFile("b.txt", "utf8");
    await fs.writeFile("c.txt", dataA + dataB);
    console.log("Archivo creado ✅");
    } catch (err) {
    console.error(err);
    }
}

combinar();
