import mongoose from "mongoose";

const schema = new mongoose.Schema({
  serialNumber: Array,
  name: String,
  purchassPrice: { type: Number, default: 0 },
  sellPrice: { type: Number, default: 0 },
  hasShortCut: { type: Boolean, default: false },
});

const product = mongoose.model("product", schema);

export default product;
