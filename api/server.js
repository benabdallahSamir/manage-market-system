import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import router from "./routes/route.js";
import connectDB from "./utils/mongooseConnection.js";

env.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic route
app.use("/api", router);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT,async () => {
  await connectDB();
  console.log(`http://localhost:${PORT}`);
});
