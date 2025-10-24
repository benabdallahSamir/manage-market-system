import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../com/Button";
import { useSelector } from "react-redux";

function NavButton({ keyName, className, title, onClick, ref }) {
  return (
    <button
      onClick={onClick}
      ref={ref}
      className={`border py-1 px-4 h-full justify-center max-w-20 items-center font-semibold leading-none text-sm flex flex-col gap-2 rounded-lg hover:rounded cursor-pointer duration-300 ${className}`}
    >
      <p className="capitalize">{title}</p>
      <p className="uppercase bg-gray-300 p-2 rounded-md mt-auto">{keyName}</p>
    </button>
  );
}

export default function Nav({
  SubmitClick,
  printPricesClick,
  SubmitAndPrintClick,
  ClearPage,
  searchClick,
}) {
  // vars
  const u = useSelector((s) => s.user);
  const isAdmin = u ? u.role : false;

  const router = useNavigate();
  // events

  function logout() {
    router("/");
  }

  // element
  return (
    <div className="h-20 shadow-lg flex items-center px-2 py-1 gap-2">
      <NavButton keyName={"f1"} onClick={searchClick} title={"Search"} />

      <NavButton
        keyName={"f2"}
        onClick={SubmitAndPrintClick}
        title={"submit & print"}
      />

      <NavButton
        keyName={"f3"}
        onClick={printPricesClick}
        title={"print prices"}
      />
      <NavButton keyName={"f4"} onClick={SubmitClick} title={"Submit"} />
      <NavButton keyName={"f5"} onClick={ClearPage} title={"clear"} />

      <Button
        text={"Logout"}
        onclick={logout}
        className="ml-auto w-max !text-gray-300 bg-red-500 hover:bg-red-400"
      />
      {isAdmin === "MNG" && <Link to={"/Admin"}>go to Admin Dashboard</Link>}
    </div>
  );
}
