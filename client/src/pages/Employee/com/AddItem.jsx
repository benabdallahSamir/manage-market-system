import { useEffect, useState } from "react";
import Button from "../../com/Button";
import {
  getProduct,
  searchProduct,
  toggleListofProduct,
} from "../../../api/admin/product.js";
export default function AddItem({ goback }) {
  const [products, setProducts] = useState(null);
  const [selectedId, setSelectedId] = useState([]);
  async function fetchData() {
    try {
      const { status, data } = await getProduct();
      if (status === 200) setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  }
  async function submitResult() {
    selectedId.map(async (id) => {
      await toggleListofProduct(id);
    });
    goback();
  }

  async function search(value) {
    if (!value) {
      await fetchData();
    } else {
      const res = await searchProduct(value);
      if (res.status === 200) {
        setProducts(res.data.products);
      }
    }
  }
  function selecteId(id) {
    setSelectedId((curr) => {
      if (curr.includes(id)) {
        const newArr = curr.filter((ele) => ele !== id);
        return newArr;
      } else {
        const newArr = [...curr, id];
        return newArr;
      }
    });
  }
  useEffect(() => {
    fetchData();
  }, []);
  if (products === null)
    return <div className="h-[88vh] grid place-items-center">loading ...</div>;
  return (
    <div className="absolute grid place-items-center w-full h-[88vh]">
      <div className="min-w-[200px] rounded min-h-[400px] bg-white flex flex-col p-3 gap-3 border shadow-xl">
        <h1 className="text-center text-3xl font-semibold text-gray-800">
          Add Item
        </h1>
        {/* serch input */}
        <div className="flex flex-col">
          <label htmlFor="input" className="cursor-pointer">
            Enter name :
          </label>
          <input
            type="text"
            id="input"
            autoFocus
            className="py-1 text-md px-2 w-full rounded outline-none border focus:border-blue-500 border-gray-400"
            onChange={(e) => search(e.target.value)}
          />
        </div>
        {/* get just items by code bar or name */}
        <table className="w-[400px] h-max border border-b-0 rounded">
          <thead>
            <tr className="grid grid-cols-3 *:border-r border-b">
              <th>id</th>
              <th>name</th>
              <th className="border-none"></th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr className="text-3xl text-center border-b !py-3">
                <td>No product found</td>
              </tr>
            )}
            {products.map((product) => (
              <tr
                className={`grid grid-cols-3 *:border-r border-b text-center ${
                  selectedId.includes(product.id) && "bg-gray-300/50"
                }`}
              >
                <td>
                  {product.serialNumber[0]
                    ? product.serialNumber[0].number
                    : "no serial number"}
                </td>
                <td>{product.name}</td>
                <td
                  className="border-none cursor-pointer"
                  onClick={() => {
                    selecteId(product.id);
                  }}
                >
                  select
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button text={"Submit"} className={"mt-auto"} onclick={submitResult} />
        <Button
          onclick={goback}
          text={"Cancel"}
          className={"bg-red-500 hover:bg-red-400"}
        />
      </div>
    </div>
  );
}
