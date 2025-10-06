import mongoose from "mongoose";

const schema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "EMP",
  },
});

const emp = mongoose.model("employee", schema);

export default emp;
