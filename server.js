
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
    res.render("create", {
        errors: [],
        coursecode: "",
        coursename: "",
        syllabus: "",
        progression: ""
    });
});

app.post("/create", (req, res) => {
    // Läs in datan från formulär
    let coursecode = req.body.coursecode;
    let coursename = req.body.coursename;
    let syllabus = req.body.syllabus;
    let progression = req.body.progression;

    let errors = [];

    // Kontroll
    if (coursecode === "") {
        errors.push("Ange en korrekt kurskod");
    }

    if (coursename === "") {
        errors.push("Ange ett korrekt kursnamn");
    }

    if (syllabus === "") {
        errors.push("Ange en länk till kursplanen");
    }

    if (progression === "") {
        errors.push("Ange progression");
    }
    
    res.render("create", {
        errors: errors,
        coursecode: coursecode,
        coursename: coursename,
        syllabus: syllabus,
        progression: progression
    });
})

// Hämtar om-sidan
app.get("/aboutsite", (req, res) => {
    res.render("aboutsite");
});

// Starta
app.listen(port, () => {
    console.log("Server startad på port: " + port);
})