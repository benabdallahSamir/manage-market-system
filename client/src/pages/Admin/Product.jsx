import { useState } from "react";
import Button from "../com/Button.jsx";
import AddProduct from "./com/AddProduct.jsx";
export default function Product() {
  const [value, setValue] = useState("");
  const [addProductVisibility, setAddProductVisibility] = useState(false);
  const products = [
    {
      id: 1,
      name: "Laptop",
      serialNumber: ["SN12345", "SN12346", "SN12347"],
      QTE: 15,
      purchassePrice: 500,
      sellPrice: 700,
    },
    {
      id: 2,
      name: "Smartphone",
      serialNumber: ["SN22345", "SN22346"],
      QTE: 30,
      purchassePrice: 200,
      sellPrice: 350,
    },
    {
      id: 3,
      name: "Tablet",
      serialNumber: ["SN32345", "SN32346", "SN32347", "SN32348"],
      QTE: 20,
      purchassePrice: 150,
      sellPrice: 250,
    },
    {
      id: 4,
      name: "Monitor",
      serialNumber: ["SN42345"],
      QTE: 10,
      purchassePrice: 100,
      sellPrice: 180,
    },
    {
      id: 5,
      name: "Keyboard",
      serialNumber: ["SN52345", "SN52346"],
      QTE: 50,
      purchassePrice: 20,
      sellPrice: 40,
    },
    {
      id: 6,
      name: "Mouse",
      serialNumber: ["SN62345", "SN62346", "SN62347"],
      QTE: 60,
      purchassePrice: 10,
      sellPrice: 25,
    },
    {
      id: 7,
      name: "Printer",
      serialNumber: ["SN72345"],
      QTE: 8,
      purchassePrice: 120,
      sellPrice: 200,
    },
    {
      id: 8,
      name: "Scanner",
      serialNumber: ["SN82345", "SN82346"],
      QTE: 12,
      purchassePrice: 80,
      sellPrice: 140,
    },
    {
      id: 9,
      name: "Webcam",
      serialNumber: ["SN92345"],
      QTE: 25,
      purchassePrice: 30,
      sellPrice: 60,
    },
    {
      id: 10,
      name: "Speaker",
      serialNumber: ["SN102345", "SN102346"],
      QTE: 18,
      purchassePrice: 35,
      sellPrice: 70,
    },
  ];
  function onclickSubmit() {}

  function AddprodcutClick() {
    setAddProductVisibility(true);
  }
  if (addProductVisibility)
    return <AddProduct goback={() => setAddProductVisibility(false)} />;

  return (
    <div className="w-full h-full">
      <div className="p-4 border-b flex justify-center items-center gap-4">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="px-2 outline-none border focus:border-blue-500 w-[600px] h-10 rounded-xl hover:rounded duration-300"
        />
        <Button
          onclick={onclickSubmit}
          text={"search"}
          className={"w-max hover:border border-blue-500 duration-300"}
          variant="no-bg-hover"
        />
      </div>
      {/* add product button */}
      <Button
        onclick={AddprodcutClick}
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
            <th>purchasse price</th>
            <th>sell Price</th>
            <th className="!flex-1">QTE</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={index}
              className="flex *:flex-2 border-b text-center *:border-r *:grid *:place-items-center"
            >
              <td>{product.serialNumber[0]}</td>
              <td>{product.name}</td>
              <td>{product.purchassePrice}</td>
              <td>{product.sellPrice}</td>
              <td className="!flex-1">{product.QTE}</td>
              <td className="grid place-items-center">
                <Button
                  variant="no-bg-hover"
                  className="hover:bg-gray-300/50 duration-300 mx-auto !rounded-[0px]"
                  text={"Edit"}
                  onclick={() => {}}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
