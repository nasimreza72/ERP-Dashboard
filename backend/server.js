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

app.get("/updateDB", async (req, res) => {

 let DBLIST = await wooDB.find({})

 console.log("DB list -----", DBLIST.length, DBLIST[0].wooCommerceDB[0])

  fetch("https://staging87.advancedpharmacy.eu/green/de/wp-json/wc/v3/orders?consumer_key=ck_5eebd818583e24974632065506d94ddc635aea70&consumer_secret=cs_eba5bc2813c5fbd4a7508a18df46da10cadce662")
  .then((response) => response.json())
  .then((result) => {

   //wooDB.create({wooCommerceDB: {"DATALIST": DBLIST[0].wooCommerceDB[0]}})
   wooDB.create({wooCommerceDB: {"DATALIST": {name: "---Nasim---"}}})
   .then((wooDB) => res.send("successfully created"))
   .catch((e) => {
     console.log(e);
     res.status(400).send(e);
   });


   wooDB.countDocuments((err, count) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`There are ${count} documents in the collection.`);
  });

   console.log("result length------->", result.length)

  })

});


/////////// LISTENING

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log("Listening on http://localhost:" + port);
});