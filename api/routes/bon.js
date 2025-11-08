import express from "express";
import { addNewBon } from "../controllers/bon.js";

const router = express.Router();

router.post("/", addNewBon);

export default router;
