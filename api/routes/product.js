import express from "express";
import {
  addProduct,
  getProduct,
  searchProduct,
  updateProduct,
} from "../controllers/product.js";

const router = express.Router();

router.post("/", addProduct);
router.put("/", updateProduct);
router.get("/", getProduct);
router.get("/search/:query", searchProduct);

export default router;
