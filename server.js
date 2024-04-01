/**
 * Server-fil för CV
 */

const express = require("express");
const bodyParser = require("body-parser"); // läser in formulärdatan
const sqlite3 = require("sqlite3").verbose();

// Ansluter till databasen
const db = new sqlite3.Database("./db/cv.db");

// Inställningar
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
    // Läs ut befintliga kurser till startsidan
    db.all("SELECT * FROM courses ORDER BY id DESC;", (err, rows) => {
        if(err) {
            console.error(err.message);
        }
    res.render("index", {
        error: "",
        rows: rows
    });
   });
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

// Lägg till ny kurs på sidan
app.post("/create", (req, res) => {
    // Läs in datan från formulär
    let coursecode = req.body.coursecode;
    let coursename = req.body.coursename;
    let syllabus = req.body.syllabus;
    let progression = req.body.progression;

    let errors = [];

    // Kontroll, ange felmeddelande om något fält inte är ifyllt
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

    res.render("create", {
        errors: errors,
        coursecode: coursecode,
        coursename: coursename,
        syllabus: syllabus,
        progression: progression
    });

    // Vid korrekt inmatning, lagra datan, nollställ och redirect till startsidan
    } else {
        const stmt = db.prepare("INSERT INTO courses(coursecode, coursename, syllabus, progression)VALUES(?, ?, ?, ?);"); // Prepare-statement
        stmt.run(coursecode, coursename, syllabus, progression);
        stmt.finalize();
        res.redirect("/");
    }
});

app.get("/delete/:id", (req, res) => {
    let id = req.params.id;

    //Radera specifikt inlägg
    db.run("DELETE FROM courses WHERE id=?;", id, (err) => {
        if(err) {
            console.error(err.message);
        }

        //Redirect till startsidan
        res.redirect("/");
    });
});

// Hämtar om-sidan
app.get("/aboutsite", (req, res) => {
    res.render("aboutsite");
});

// Starta
app.listen(port, () => {
    console.log("Server startad på port: " + port);
})