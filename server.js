// Requerir express
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const appRoutes = require("./src/routes");

// inicializar mi app
const app = express();

hbs.registerPartials(__dirname + "/src/views/partials", (err) => {});

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/src/views"));

// el modulo <path> corrige este error
// C:\users\joaqu\Desktop
// __dirname + "/src/views/partials" => C:\users\joaqu\Desktop/src/views/partials
// /ghost/home/desktop
// __dirname + "/src/views/partials" => /user/home/proyecto/src/views/partials


// midleware
app.use(bodyParser.json());

// rutas
app.use(appRoutes);

module.exports = app;
