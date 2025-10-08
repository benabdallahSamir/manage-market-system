import { useState, useEffect } from "react";
import Button from "../com/Button.jsx";
import AddProduct from "./com/AddProduct.jsx";
import { getProduct, searchProduct } from "../../api/admin/product.js";

function SearchBar({ fetchData, setProducts }) {
  const [value, setValue] = useState("");
  async function getProductBySearch() {
    if (value.trim() === "") {
      fetchData();
      return;
    }
    const { status, data } = await searchProduct(value);
    if (status === 200) {
      console.log(data.products);
      setProducts(data.products);
    }
  }
  function handleSearchChange(e) {
    if (e.key === "Enter") {
      getProductBySearch();
    }
  }

  return (
    <div className="p-4 border-b flex justify-center items-center gap-4">
      <input
        type="text"
        onKeyDown={handleSearchChange}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="px-2 outline-none border focus:border-blue-500 w-[600px] h-10 rounded-xl hover:rounded duration-300"
      />
      <Button
        onclick={getProductBySearch}
        text={"search"}
        className={"w-max hover:border border-blue-500 duration-300"}
        variant="no-bg-hover"
      />
    </div>
  );
}

export default function Product() {
  const [addProductVisibility, setAddProductVisibility] = useState(false);
  const [products, setProducts] = useState(null);
  const [productsSelected, setProductsSelected] = useState(null);

  const fetchData = async () => {
    const { status, data } = await getProduct();
    if (status === 200) setProducts(data.products);
  };
  useEffect(() => {
    fetchData();
  }, [productsSelected, addProductVisibility]);

  // update product
  if (productsSelected)
    return (
      <AddProduct
        goback={() => setProductsSelected(null)}
        product={productsSelected}
      />
    );
  // add product
  if (addProductVisibility)
    return <AddProduct goback={() => setAddProductVisibility(false)} />;
  // loading
  if (products === null) return <div className="p-4">Loading...</div>;
  // component
  return (
    <div className="w-full h-full">
      {/* search bar */}
      <SearchBar fetchData={fetchData} setProducts={setProducts} />
      {/* add product button */}
      <Button
        onclick={() => setAddProductVisibility(true)}
        text={"Add Product"}
        className={"m-4 ml-auto w-max hover:bg-gray-300/50 duration-300"}
        variant="no-bg-hover"
      />
      {/* table */}
      <table className="w-full text-left border border-l-0">
        <thead>
          <tr className=" flex *:flex-2 border-b text-center *:border-r *:py-2">
            <th>ID</th>
            <th>name</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {/* no product found case */}
          {products.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center">
                No product found
              </td>
            </tr>
          )}
          {/* product rows */}
          {products.map((product, index) => (
            <tr
              key={index}
              className="flex *:flex-2 border-b text-center *:border-r *:grid *:place-items-center"
            >
              <td>
                {product.serialNumber[0]
                  ? product.serialNumber[0].number
                  : "no serial number"}
              </td>
              <td>{product.name}</td>
              <td className="grid place-items-center">
                <Button
                  variant="no-bg-hover"
                  className="hover:bg-gray-300/50 duration-300 mx-auto !rounded-[0px]"
                  text={"Edit"}
                  onclick={() => {
                    setProductsSelected(product);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
