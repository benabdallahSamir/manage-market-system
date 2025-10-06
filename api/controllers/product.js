import handleProduct from "../middlewars/product.js";
import product from "../models/Product.js";

export async function addProduct(req, res) {
  try {
    const { serialNumber, name } = req.body;
    if (typeof serialNumber !== "object")
      return res.status(400).send({ message: "we need array in serialNumber" });
    if (serialNumber.length === 0 || !name)
      res.status(400).send({ message: "all inputs are require" });
    const newProduct = await new product({ serialNumber, name }).save();
    res.status(200).send({ product: handleProduct(newProduct) });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}
