function handleProduct(product) {
  const productForm = {
    id: product._id,
    name: product.name,
    serialNumber: product.serialNumber,
    purchassPrice: product.purchassPrice,
  };
  return productForm;
}
export default handleProduct;
