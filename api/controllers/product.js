import handleProduct from "../middlewars/product.js";
import product from "../models/Product.js";

export async function addProduct(req, res) {
  try {
    const { serialNumber, name } = req.body;
    if (typeof serialNumber !== "object")
      return res.status(400).send({ message: "we need array in serialNumber" });
    if (!name) res.status(400).send({ message: "name value is required" });
    const newProduct = await new product({ serialNumber, name }).save();
    res.status(200).send({ product: handleProduct(newProduct) });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}

export async function getProduct(req, res) {
  try {
    const products = await product.find();
    const allProducts = products.map((item) => handleProduct(item));
    res.status(200).send({ products: allProducts });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}

export async function searchProduct(req, res) {
  try {
    const { query } = req.params;
    if (!query)
      return res.status(400).send({ message: "query params is required" });
    const products = await product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { serialNumber: { $elemMatch: { number: query } } },
      ],
    });
    const allProducts = products.map((item) => handleProduct(item));
    res.status(200).send({ products: allProducts });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}

export async function updateProduct(req, res) {
  try {
    const { id, name, serialNumber } = req.body;
    if (!id) return res.status(400).send({ message: "id value is required" });
    const existingProduct = await product.findById(id); 
    if (!existingProduct)
      return res.status(400).send({ message: "Product not found" });
    if (name) existingProduct.name = name;
    if (typeof serialNumber === "object")
      existingProduct.serialNumber = serialNumber;
    const updatedProduct = await existingProduct.save();
    res.status(200).send({ product: handleProduct(updatedProduct) });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}

export async function noCodeBar(req, res) {
  try {
    const allProducts = await product.find({
      $or: [{ serialNumber: [] }, { hasShortCut: true }],
    });
    const shortCut = [];
    const noCodeBarProduct = allProducts
      .map((p) => {
        if (p.serialNumber.length === 0) return handleProduct(p);
        shortCut.push(handleProduct(p));
      })
      .filter((ele) => ele);
    console.log(noCodeBarProduct);
    res.status(200).send({ noCodeBarProduct, shortCut });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
}

export async function toggleShortCut(req, res) {
  try {
    const { productId } = req.body;
    if (!productId)
      return res.status(400).send({ message: "productId not found" });
    const isProductExist = await product.findById(productId);

    if (!isProductExist)
      return res.statsu(404).send({ message: "product not found" });

    if (isProductExist.serialNumber.length === 0)
      return res.status(400).send({ message: "product is exist by default" });
    isProductExist.hasShortCut = !isProductExist.hasShortCut;
    await isProductExist.save();
    res.status(200).send(isProductExist);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
}
