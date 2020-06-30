const express = require("express");
const knex = require("knex");
const cors = require("cors");

const app = express();
const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/questions", (req, res) => {
  db.select("*")
    .from("questions")
    .orderBy("id")
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

app.get("/scores", (req, res) => {
  db("scoring")
    .avg("score")
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

app.post("/scores", (req, res) => {
  const { score, date } = req.body;
  db.insert({ score: score, date: date })
    .into("scoring")
    .catch((err) => console.log(err));
  res.send("Success");
});

app.listen(process.env.PORT || 3000);
