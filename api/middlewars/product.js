
function handleProduct(product) {
  const productForm = {
    id: product._id,
    name: product.name,
    serialNumber: product.serialNumber,
  };
  return productForm;
}
export default handleProduct;
