import { useRef, useState } from "react";
import Button from "../../com/Button";
import { addProduct } from "../../../api/admin/product";

export default function AddProduct({ product = null, goback }) {
  const [ProductData, setProductData] = useState({
    name: product ? product.name : "",
    serialNumber: product ? product.serialNumber : [],
  });
  const serialNumberRef = useRef();
  const onchange = (e) => {
    setProductData({ ...ProductData, [e.target.id]: e.target.value });
  };
  const removeSerialNumber = (index) => {
    try {
      const newSerials = ProductData.serialNumber.filter(
        (sn, i) => i !== index
      );
      setProductData((curr) => {
        return {
          ...curr,
          serialNumber: newSerials,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };
  const changeName = (e, index) => {
    const input = e.target.previousElementSibling;
    const getValue = input.value ? input.value : "";
    const allSerialNumber = ProductData.serialNumber;
    allSerialNumber[index].name = getValue;
    setProductData({ ...ProductData, serialNumber: allSerialNumber });
  };
  const changeNameContainer = (e) => {
    e.target.nextElementSibling.classList.remove("hidden");
    e.target.nextElementSibling.classList.add("flex");
  };
  const addSerialNumber = () => {
    try {
      if (serialNumberRef.current === null) return;
      const serial = serialNumberRef.current.value;
      if (!serial) return;
      if (!ProductData.serialNumber.includes(serial)) {
        const newSerials = ProductData.serialNumber;
        if (newSerials.includes(serial)) {
          alert("Serial number already exists.");
          return;
        }
        newSerials.push({ number: serial, name: "" });
        setProductData((curr) => {
          return {
            ...curr,
            serialNumber: newSerials,
          };
        });
      }
      serialNumberRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };
  async function submit() {
    // check data
    if (ProductData.serialNumber.length === 0 || !ProductData.name) {
      alert("all input are required");
      return;
    }
    // sende data to api
    const { status, data } = await addProduct(ProductData);
    if (status === 200) {
      return goback();
    }
    alert(data.data);
  }
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/20 grid place-items-center">
      <Button
        text={"X"}
        className={"absolute top-2 right-2 w-max text-3xl"}
        variant="no-bg-hover"
        onclick={goback}
      />
      <div className="w-2/5 h-max bg-white rounded-2xl p-4 flex flex-col gap-2">
        <main className="h-full flex flex-col gap-4">
          <div>
            <label htmlFor="serialNumber" className="cursor-pointer block">
              Serial Number
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="border p-2 rounded w-full outline-none focus:border-blue-500"
                id="serialNumber"
                ref={serialNumberRef}
              />
              <Button
                onclick={() => addSerialNumber()}
                className={"w-max border !py-0 !rounded ml-auto"}
                text={"Add"}
                variant="no-bg-hover"
              />
            </div>
          </div>
          <div>
            <label htmlFor="name" className="cursor-pointer">
              Name :
            </label>
            <input
              type="text"
              className="border p-2 rounded w-full outline-none focus:border-blue-500"
              id="name"
              value={ProductData.name}
              onChange={onchange}
            />
          </div>
          <Button
            text={product ? "Edit Product" : "Add Product"}
            onclick={submit}
            className={"mt-auto"}
          />
        </main>
        <aside className="h-full p-4  overflow-y-auto">
          <h2 className="font-bold text-lg">Serial Numbers</h2>
          <ul className="w-full">
            {ProductData.serialNumber.map((sn, index) => (
              <li
                className="flex items-center w-full"
                key={`serialNumber${index}`}
              >
                <span>{sn.number}</span>
                <span
                  className="ml-3 cursor-pointer"
                  onClick={(e) => changeNameContainer(e)}
                >
                  {sn.name || "with out name"}
                </span>
                <div className="items-center hiddend ml-3">
                  <input
                    type="text"
                    className="w-40 outline-none border rounded focus:border-blue-500 px-2"
                  />
                  <Button
                    className={"w-max"}
                    text={"submit"}
                    onclick={(e) => changeName(e, index)}
                    variant="no-bg-hover"
                  />
                </div>
                <Button
                  onclick={() => removeSerialNumber(index)}
                  className={"w-max text-2xl ml-auto"}
                  text={"X"}
                  variant="no-bg-hover"
                />
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
