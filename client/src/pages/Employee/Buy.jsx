import { Plus } from "lucide";
import { useState } from "react";
import AddItem from "./com/AddItem";
import Button from "../com/Button";

export default function Buy() {
  const [addItem, showAddItem] = useState(false);
  const totalPrice = 123;
  // ? for many customers you can add array of customer bon and set the current index when you add the logic
  const items = [
    {
      id: 1,
      name: "item",
    },
    {
      id: 2,
      name: "item2",
    },
    {
      id: 3,
      name: "item3",
    },
    {
      id: 4,
      name: "item4",
    },
    {
      id: 5,
      name: "item5",
    },
    {
      id: 6,
      name: "item6",
    },
  ];
  if (addItem) return <AddItem goback={() => showAddItem(false)} />;
  return (
    <div className="flex flex-col min-h-[88vh]">
      {/* price section */}
      <div className="h-20 flex items-center justify-center border-b border-gray-400 text-2xl">
        {totalPrice}
      </div>
      <div className="grow flex gap-2">
        <section className="flex-2 w-full ">
          <table className="w-full border border-t-0 min-h-full flex flex-col">
            <thead className="flex *:flex-2 border-b *:border-r">
              <th className="!flex-1">num</th>
              <th>id</th>
              <th>name</th>
              <th>unit price</th>
              <th>Quantity</th>
              <th className="!border-none">Total</th>
            </thead>
            <tbody className="*:text-center">
              <tr className="flex *:flex-2 *:border-r border-b">
                <td className="!flex-1">num</td>
                <td>id</td>
                <td>name</td>
                <td>unit price</td>
                <td>Quantity</td>
                <td className="!border-none">Total</td>
              </tr>
            </tbody>
          </table>
        </section>
        {/* items section */}
        <section className="flex-1 py-2 flex flex-wrap gap-2 px-2 relative">
          {items.map((item) => (
            // items
            <Button className="w-max" text={item.name} key={item.id} />
          ))}
          <Button
            text={"button"}
            className="absolute w-max z-10 bottom-2 right-2 "
            variant="no-bg-hover"
            onclick={() => showAddItem(true)}
          />
        </section>
      </div>
    </div>
  );
}
