import mongoose from "mongoose";

const schema = new mongoose.Schema({
  serialNumber: Array,
  name: String,
});

const product = mongoose.model("product", schema);

export default product;
