function handleProduct(product) {
  const productForm = {
    id: product._id,
    name: product.name,
    serialNumber: product.serialNumber,
    purchassPrice: product.sellPrice,
  };
  return productForm;
}
export default handleProduct;
