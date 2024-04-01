const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/cv.db");

const express = require("express");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));