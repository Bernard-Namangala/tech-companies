import express from "express";
import dotenv from "dotenv";
import routes from "./src/routes";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/", routes);

app.listen(port, () => {
  console.log("app running on port ", port);
});
