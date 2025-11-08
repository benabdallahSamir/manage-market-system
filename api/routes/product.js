import express from "express";
import {
  addProduct,
  getProduct,
  noCodeBar,
  searchProduct,
  toggleShortCut,
  updateProduct,
} from "../controllers/product.js";

const router = express.Router();

router.post("/", addProduct);
router.put("/", updateProduct);
router.get("/", getProduct);
router.put("/toggleShortCut",toggleShortCut)
router.get("/noCodeBar", noCodeBar);
router.get("/search/:query", searchProduct);

export default router;
