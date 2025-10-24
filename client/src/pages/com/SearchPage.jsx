import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { searchProduct } from "../../api/admin/product";
import product from "../../../../api/models/Product";

export default function SearchPage({ setValue, goback }) {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    if (!query) return setSearchResult([]);
    (async () => {
      const { status, data } = await searchProduct(query);
      console.log(data)
      if (status === 200) setSearchResult(data.products);
      
    })();
  }, [query]);
  function selectProduct(product) {
    setValue(product);
    goback();
  }
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-gray-400/30 grid place-items-center">
      <Button
        text={"X"}
        className={"absolute top-2 right-2 w-max text-4xl text-red-400"}
        variant="no-bg-hover"
        onclick={goback}
      />
      <div className="p-4 rounded-2xl bg-white flex flex-col gap-4">
        <h1 className="text-3xl text-center">Search Product</h1>
        <div>
          <label htmlFor="input">Enter product name</label>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full outline-none border mt-2 py-1 px-4 border-gray-400 rounded-2xl focus:border-blue-500"
          />
        </div>
        <table className="w-full border rounded">
          <thead>
            <rt className="flex *:border-r *:flex-1">
              <th>code</th>
              <th>name</th>
              <th className="border-none"></th>
            </rt>
          </thead>
          <tbody>
            {searchResult.length === 0 && (
              <tr className="border-t text-center">
                <td>no product found</td>
              </tr>
            )}
            {searchResult.map((product) => (
              <rt className="flex *:border-r *:flex-1 text-center border-t">
                <td>
                  {product.serialNumber[0]
                    ? product.serialNumber[0].number
                    : "no code"}
                </td>
                <td>{product.name}</td>
                <td
                  onClick={() => selectProduct(product)}
                  className={"border-none w-max text-center cursor-pointer"}
                >
                  select
                </td>
              </rt>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
