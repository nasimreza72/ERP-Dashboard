import mongoose from "mongoose";

const { Schema, model } = mongoose;

const wooCommerceDBSchema = new Schema({
  wooCommerceDB: { type: Array },
  name:{type: String}
});

const wooDB = model("wooDB", wooCommerceDBSchema);

export { wooDB };