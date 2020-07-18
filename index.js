import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to my node app");
});

app.listen(port, () => {
  console.log("app running on port ", port);
});
