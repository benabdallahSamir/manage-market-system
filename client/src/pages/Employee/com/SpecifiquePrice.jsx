import { useState } from "react";
import Button from "../../com/Button";

function SpecifiquePrice({ goback, addItem }) {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  function submit() {
    if (!price) return goback();
    const handlePrice = price.split(",")[0];
    if (isNaN(handlePrice)) return console.log("Enter a number");
    const newProduct = {
      id: price,
      name: name ? name : "no code",
      purchassPrice: price,
      serialNumber: [],
      isNotProduct: true,
    };
    addItem(newProduct);
    goback();
  }
  return (
    <div className="w-full h-full absolute bg-gray-400/40 grid place-items-center">
      <Button
        className={"absolute w-max text-3xl text-red-400 top-2 right-2"}
        onclick={goback}
        text={"X"}
        variant="no-bg-hover"
      />
      <div className="rounded-xl flex-col flex p-4 min-w-[300px] min-h-[200px] bg-white">
        <p className="text-center text-2xl capitalize font-semibold mb-2">
          Price
        </p>
        <label htmlFor="name">Enter Name :</label>
        <input
          id="name"
          type="text"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full outline-0 focus:border-blue-400 border border-gray-300 rounded py-0.5 px-2 mb-3"
        />

        <label htmlFor="price">Enter Price :</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full outline-0 focus:border-blue-400 border border-gray-300 rounded py-0.5 px-2 mb-3"
        />

        <Button
          text={"Enter"}
          className={"!py-1 !h-max mt-auto"}
          onclick={submit}
        />
      </div>
    </div>
  );
}

export default SpecifiquePrice;
