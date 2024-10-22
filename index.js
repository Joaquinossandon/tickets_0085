const app = require("./server");
const sequelize = require("./src/database");

async function run() {
    await sequelize.sync();
    // levantar la aplicación
    app.listen(3000, () => {
        console.log("El servidor se está ejecutando en http://localhost:3000");
    });
}

run();
