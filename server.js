const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/cv.db");

const express = require("express");
const bodyParser = require("body-parser"); // läser in formulärdatan
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public")); // Statiska filer
app.use(bodyParser.urlencoded({extended: true }));

/**
 * Routing
 */

// Hämtar startsidan 
app.get("/", (req, res) => {
    res.render("index");
});

// Hämtar sida för att lägga till ny kurs
app.get("/create", (req, res) => {

    res.render("create");
});

app.post("/create", (req, res) => {
    res.render("create");
})

// Hämtar om-sidan
app.get("/aboutsite", (req, res) => {
    res.render("aboutsite");
});

// Starta
app.listen(port, () => {
    console.log("Server startad på port: " + port);
})