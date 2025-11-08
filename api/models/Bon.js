import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    clientId: { type: String, default: "" },
    clientName: { type: String, default: "" },
    totalPrice: Number,
    products: Array,
  },
  { timestamps: true }
);

const Bon = mongoose.model("bon", schema);

export default Bon;
