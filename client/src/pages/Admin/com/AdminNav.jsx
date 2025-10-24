import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../com/Button";

export default function AdminNav() {
  const [currentPage, setCurrentPage] = useState("");
  const router = useNavigate();
  useEffect(() => {
    router(`${currentPage}`);
  }, [currentPage]);
  function changePages(page) {
    setCurrentPage(page);
  }

  return (
    <div className="w-[300px] px-2 flex flex-col py-4 gap-3 border-r">
      <Button
        variant="no-bg-hover"
        className={"w-max"}
        text={"go back"}
        onclick={() => changePages("/main")}
      />
      <Button
        className={`justify-start hover:border border-gray-400 ${
          currentPage === "" && "border"
        }`}
        text={"sales"}
        onclick={() => changePages("")}
        variant="no-bg-hover"
      />
      <Button
        className={`justify-start hover:border border-gray-400 ${
          currentPage === "product" && "border"
        }`}
        text={"product"}
        onclick={() => changePages("product")}
        variant="no-bg-hover"
      />
      <Button
        className={`justify-start hover:border border-gray-400 ${
          currentPage === "employee" && "border"
        }`}
        text={"Employee"}
        onclick={() => changePages("employee")}
        variant="no-bg-hover"
      />
      <Button
        className={`justify-start hover:border border-gray-400 ${
          currentPage === "contacts" && "border"
        }`}
        text={"contacts"}
        onclick={() => changePages("contacts")}
        variant="no-bg-hover"
      />

      <Button
        className={`justify-start hover:border border-gray-400 ${
          currentPage === "adminAccount" && "border"
        }`}
        text={"My account"}
        onclick={() => changePages("adminAccount")}
        variant="no-bg-hover"
      />
    </div>
  );
}
