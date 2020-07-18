import express from "express";
import dotenv from "dotenv";
import routes from "./src/routes";
import createTable from "./createTable";

// dotenv to be used to acces environmental variables
dotenv.config();

// creating database tables
// createTable();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/", routes);

app.listen(port, () => {
  console.log("app running on port ", port);
});
