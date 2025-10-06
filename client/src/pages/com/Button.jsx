import React from "react";

export default function Button({
  text,
  onclick,
  className,
  variant = "normal",
}) {
  const cln = () => {
    switch (variant) {
      case "no-hover":
        return "bg-blue-500";
      case "no-bg":
        return "hover:rounded hover:text-white";
      case "no-bg-hover":
        return "";
      default:
        return "hover:rounded hover:bg-blue-300 hover:text-black bg-blue-400";
    }
  };
  return (
    <button
      onClick={onclick}
      className={`w-full py-2 h-max px-2 text-gray-700 rounded-xl duration-300  cursor-pointer grid place-items-center font-semibold ${cln()} ${className}`}
    >
      {text}
    </button>
  );
}
