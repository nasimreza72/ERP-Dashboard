import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import * as dataBase from "./library/database.js";
import { wooDB } from "./models/wc-data.js";


dotenv.config();
dataBase.connect();
const app = express();
app.use(cors());
app.use(express.json());


// This endpoint is used for registering a new user

app.post("/updateDB", async (req, res) => {

  wooDB.create(req.body)
    .then((wooDB) => res.send("successfully created"))
    .catch((e) => {
      console.log(e);
      res.status(400).send(e);
    });
});



/////////// LISTENING

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log("Listening on http://localhost:" + port);
});