import express from "express";
import connectToDatabase from "./config/database";
import bodyParser from "body-parser";
import userController from "./controllers/users";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

app.get("/", (req, res) => {
  res.send("GET");
});

app.use("/users", userController);

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
