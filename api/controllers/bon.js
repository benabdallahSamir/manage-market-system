import Bon from "../models/Bon.js";
import product from "../models/Product.js";

export async function addNewBon(req, res) {
  try {
    const { products, totalPrice, clientID } = req.body;
    let allProductData = [];
    for (let ele of products) {
      if (ele.isNotProduct) {
        allProductData.push(ele);
        continue;
      }
      const getproductData = await product.findById(ele.id);
      if (!getproductData) continue;
      allProductData.push({
        ...ele,
        profit: ele.purchassPrice - getproductData.purchassPrice,
        totalProfit: (ele.purchassPrice - getproductData.purchassPrice) * 4,
      });
    }
    const newBon = await new Bon({
      products: allProductData,
      totalPrice,
      clientId: clientID ? clientID : "",
      clientName: clientID ? "" : "client",
    }).save();
    res.status(200).send({ bon: newBon });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
}
