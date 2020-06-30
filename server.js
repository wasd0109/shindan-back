const express = require("express");
const knex = require("knex");
const cors = require("cors");
require("dotenv").config();

const app = express();
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "wasd0109",
    password: process.env.DATABASE_PASSWORD,
    database: "shindan",
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/questions", (req, res) => {
  db.select("*")
    .from("questions")
    .then((data) => res.json(data));
});

app.get("/scores", (req, res) => {
  db("scoring")
    .avg("score")
    .then((data) => res.json(data));
});

app.post("/scores", (req, res) => {
  const { score, date } = req.body;
  db.insert({ score: score, date: date }).into("scoring").catch(console.log);
  res.send("Success");
});

app.listen(3000);
