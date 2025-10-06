import Button from "../../com/Button";

export default function AddItem({ goback }) {
  return (
    <div className="absolute grid place-items-center w-full h-[88vh] bg-black/10">
      <div className="w-[200px] rounded min-h-[200px] bg-white flex flex-col p-3 gap-3">
        <h1 className="text-center text-3xl font-semibold text-gray-800">
          Add Item
        </h1>
        {/* get just items by code bar or name */}
        <Button text={"Submit"} className={"mt-auto"} />
        <Button
          onclick={goback}
          text={"Cancel"}
          className={"bg-red-500 hover:bg-red-400"}
        />
      </div>
    </div>
  );
}
