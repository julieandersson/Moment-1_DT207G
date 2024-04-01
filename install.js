/**
 * Installationsfil för ett databasbaserat CV
 */

// Installerar sqlite3
const sqlite3 = require("sqlite3").verbose();
// Skapar databasen och döper till cv
const db = new sqlite3.Database("./db/cv.db");

// Skapar tabeller för databasen
db.serialize(() => {
    db.run("DROP TABLE IF EXISTS courses;");
    db.run(`
        CREATE TABLE courses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          coursecode TEXT NOT NULL,
          coursename TEXT NOT NULL, 
          syllabus TEXT NOT NULL, 
          progression TEXT NOT NULL,
          created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
       );
    `);
});

db.close();