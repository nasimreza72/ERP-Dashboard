import mongoose from "mongoose";

const { Schema, model } = mongoose;

const wooCommerceDBSchema = new Schema({
  wooCommerceDB: { type: Object }
});

const wooDB = model("wooDB", wooCommerceDBSchema);

export { wooDB };