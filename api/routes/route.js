import express from "express";
import auth from "./auth.js";
import admin from "./admin.js";
import product from "./product.js";
import bon from "./bon.js";
const router = express.Router();

router.use("/auth", auth);
router.use("/admin", admin);
router.use("/product", product);
router.use("/bon", bon);
export default router;
