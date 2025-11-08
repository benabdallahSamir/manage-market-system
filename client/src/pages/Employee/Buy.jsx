import { useEffect, useRef, useState } from "react";
import Nav from "./com/Nav";
import { searchProduct, productList } from "../../api/admin/product";
import Button from "../com/Button";
import AddItem from "./com/AddItem";
import SearchPage from "../com/SearchPage";
import SpecifiquePrice from "./com/SpecifiquePrice";
import { newBon } from "../../api/bon";

function Buy() {
  const [allBon, setBons] = useState([
    {
      id: null,
      total: 0,
      products: [],
    },
  ]);

  const [mode, setMode] = useState("");
  const [index, setIndex] = useState(0);
  const [rowIndex, setRowIndex] = useState(0);
  const codeLabel = useRef(null);
  let code = "";
  const [pList, setpList] = useState({});
  const [pListVisibility, setpListVisibility] = useState(true);

  function addProduct(product) {
    setBons((prev) => {
      // create a shallow copy of the bons array and products to avoid mutating state
      const newBons = prev.map((b) => ({
        ...b,
        products: b.products ? [...b.products] : [],
      }));

      const bon = { ...newBons[index], products: [...newBons[index].products] };
      const products = bon.products;
      const isExist = products.findIndex((p) => p.id === product.id);

      if (isExist === -1) {
        products.unshift({ ...product, QTE: 1 });
      } else {
        // replace the item with a new object to preserve immutability
        const existing = products[isExist];
        products[isExist] = { ...existing, QTE: (existing.QTE || 0) + 1 };
      }

      // recalculate total for the bon
      bon.total = products.reduce(
        (sum, p) => sum + (p.QTE || 0) * (p.purchassPrice || 0),
        0
      );

      bon.products = products;
      newBons[index] = bon;
      return newBons;
    });
  }

  function changeQte(num) {
    if (allBon[index].products.length === 0) return;
    setBons((prev) => {
      const newBons = prev.map((b) => ({ ...b }));
      const bon = { ...newBons[index] };
      const products = bon.products.map((ele) => ({ ...ele }));
      const newQte = products[rowIndex].QTE + num;
      if (newQte <= 0) products.splice(rowIndex, 1);
      else products[rowIndex].QTE = newQte;
      bon.products = products.map((ele) => ele);
      bon.total = products.reduce(
        (sum, p) => sum + (p.QTE || 0) * (p.purchassPrice || 0),
        0
      );
      newBons[index] = bon;
      return newBons;
    });
  }

  async function getpList() {
    const res = await productList();
    if (res.status === 200) setpList(res.data);
  }

  function deleteItem(ind) {
    setBons((curr) => {
      const newBons = curr.map((ele) => ele);
      const bon = { ...newBons[index] };
      const product = [...bon.products];
      product.splice(ind, 1);
      bon.products = product;
      bon.total = product.reduce(
        (sum, p) => sum + (p.QTE || 0) * (p.purchassPrice || 0),
        0
      );
      newBons[index] = bon;
      return newBons;
    });
    setRowIndex(0);
  }

  function setSpecifiquePrice() {
    if (!code || isNaN(+code)) return;

    const price = +code;
    const product = {
      id: price,
      name: "no code",
      purchassPrice: price,
      serialNumber: [],
      isNotProduct: true,
    };
    addProduct(product);
    code = "";
    codeLabel.current.innerText = code;
  }

  async function submitBon() {
    const bon = { ...allBon[index] };
    if (bon.id) return;
    if (bon.products.length === 0) return;
    const res = await newBon(bon.products, bon.total, null);
    if (res.status === 200) {
      const { _id: newid } = res.data.bon;
      setBons((prev) => {
        const allBons = [...prev];
        const currBon = allBons[index];
        currBon.id = newid;
        if (prev.length - 1 === index) {
          allBons.push({ id: null, total: 0, products: [] });
          setIndex(allBons.length - 1);
        } else {
          setIndex(prev.length - 1);
        }

        return allBons;
      });
    }
  }
  function NewEmptyBon() {
    console.log(
      index === allBon.length - 1 && allBon[index].products.length > 0
    );
    console.log(index === allBon.length - 1);
    console.log(allBon[index].products.length > 0);
    if (index === allBon.length - 1 && allBon[index].products.length > 0) {
      setBons((prev) => {
        const bons = [...prev];
        bons.push({ id: null, total: 0, products: [] });
        return bons;
      });
      setIndex(allBon.length);
    } else {
      setIndex(allBon.length - 1);
    }
  }
  useEffect(() => {
    getpList();
  }, []);

  useEffect(() => {
    async function onkeydown(e) {
      if (mode !== "") return;
      const key = e.key;

      switch (key) {
        case "F7":
          NewEmptyBon();
          break;
        case "ArrowRight":
          setIndex((prev) => {
            const newIndex = prev + 1;
            if (newIndex >= allBon.length) return prev;
            return newIndex;
          });
          break;

        case "ArrowLeft":
          setIndex((prev) => {
            const newIndex = prev - 1;
            if (newIndex < 0) return prev;
            return newIndex;
          });
          break;
      }
      if (allBon[index].id !== null) return;
      if (!isNaN(+key)) {
        code += +key;
        codeLabel.current.innerText = code;
        return;
      }
      switch (key) {
        case "Backspace":
          code = code.slice(0, -1);
          codeLabel.current.innerText = code;
          break;
        case "Enter":
          const res = await searchProduct(code);
          code = "";
          if (res.status === 200) {
            if (res.data.products.length) {
              const p = res.data.products[0];
              addProduct(p);
            } else {
              console.log("no product found");
            }
          }
          break;
        case ".":
          setSpecifiquePrice();
          break;
        case ",":
          setSpecifiquePrice();
          break;
        case "ArrowUp":
          setRowIndex((prev) => {
            const newIndex = prev - 1;
            if (newIndex < 0) return prev;
            return newIndex;
          });
          break;
        case "F1":
          setMode("search");
          break;
        case "F4":
          submitBon();
          break;

        case "Delete":
          deleteItem(rowIndex);

          break;
        case "F6":
          setMode("specifiquePrice");
          break;
        case "ArrowDown":
          setRowIndex((prev) => {
            const newIndex = prev + 1;
            if (newIndex >= allBon[index].products.length) return prev;
            return newIndex;
          });
          break;
        case "+":
          console.log("first");
          changeQte(1);
          break;
        case "-":
          changeQte(-1);
          break;
      }
    }

    window.addEventListener("keydown", onkeydown);
    return () => {
      window.removeEventListener("keydown", onkeydown);
    };
  }, [
    index,
    allBon,
    mode,
    rowIndex,
    setBons,
    setIndex,
    NewEmptyBon,
    addProduct,
    submitBon,
    deleteItem,
  ]);

  if (mode === "search")
    return (
      <SearchPage
        goback={() => setMode("")}
        setValue={(value) => addProduct(value)}
      />
    );

  if (mode === "addProduct")
    return (
      <AddItem
        goback={async () => {
          await getpList();
          setMode("");
        }}
      />
    );
  if (mode === "specifiquePrice")
    return <SpecifiquePrice addItem={addProduct} goback={() => setMode("")} />;
  return (
    <div className="h-screen flex flex-col">
      <Nav
        ClearPage={() => {}}
        SpecifiquePrice={() => {
          setMode("specifiquePrice");
        }}
        SubmitAndPrintClick={() => {}}
        SubmitClick={submitBon}
        printPricesClick={() => {}}
        NewEmptyBon={NewEmptyBon}
        searchClick={() => {
          setMode("search");
        }}
      />
      <main className="grow flex flex-col">
        <div className="h-24 border-b border-gray-400 px-10 flex items-center">
          <p className="text-3xl">{allBon[index].products.length}</p>
          <p className="grow text-center text-4xl">{allBon[index].total}</p>
          <p
            ref={codeLabel}
            className="min-w-32 h-10 text-center rounded py-1 px-3 border border-gray-400"
          >
            {code}
          </p>
          {allBon[index].id && (
            <p
              ref={codeLabel}
              className="ml-2 text-red-500"
            >
              LOCKED
            </p>
          )}
        </div>
        <section className="flex grow">
          <table className="grow flex items-center flex-col border">
            <thead className="w-full border-b">
              <th className="w-full flex *:border-r ">
                <td className="flex-1">Num</td>
                <td className="flex-3">Id</td>
                <td className="flex-2">Name</td>
                <td className="flex-2">unit price</td>
                <td className="flex-1">QTE</td>
                <td className="flex-1">Total</td>
                <td className="flex-1"></td>
                <td className="!border-r-0 flex-1"></td>
              </th>
            </thead>
            <tbody className="w-full grow border-b">
              {allBon[index].products.map((ele, ind) => (
                <tr
                  className={`text-center w-full flex *:border-r ${
                    rowIndex === ind && "bg-gray-300"
                  }`}
                >
                  <td className="flex-1">{ind + 1}</td>
                  <td className="flex-3">
                    {ele.serialNumber[0]
                      ? ele.serialNumber[0].number
                      : "no code"}
                  </td>
                  <td className="flex-2">{`${ele.name} ${
                    ele.serialNumber.length !== 0
                      ? ele.serialNumber[0].name
                      : ""
                  }`}</td>
                  <td className="flex-2">{ele.purchassPrice}</td>
                  <td className="flex-1">{ele.QTE}</td>
                  <td className="flex-1">{ele.QTE * ele.purchassPrice}</td>
                  <td className="flex-1 cursor-pointer" onClick={() => {}}>
                    Edit
                  </td>
                  <td
                    onClick={() => {
                      deleteItem(ind);
                    }}
                    className="!border-r-0 flex-1 cursor-pointer"
                  >
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className={`${
              pListVisibility ? "w-[300px]" : "w-10"
            } h-full duration-300`}
          >
            <div
              className={`flex ${
                pListVisibility ? "justify-between" : "justify-center"
              }`}
            >
              <Button
                text={`${pListVisibility ? "X" : "O"}`}
                variant="no-bg-hover"
                className={"w-max"}
                onclick={() => setpListVisibility((curr) => !curr)}
              />
              <Button
                text={"addProduct"}
                variant="no-bg-hover"
                onclick={() => setMode("addProduct")}
                className={`${pListVisibility || "hidden"} w-max`}
              />
            </div>
            {pListVisibility && (
              <div className="flex flex-wrap gap-2 p-3">
                {pList.shortCut?.map((ele) => (
                  <Button
                    className="w-max"
                    text={ele.name}
                    onclick={(e) => {
                      addProduct(ele);
                      e.target.blur();
                    }}
                  />
                ))}
                <div className="w-full h-[1px] bg-gray-400/50"></div>
                {pList.noCodeBarProduct?.map((ele) => (
                  <Button
                    className="w-max"
                    text={ele.name}
                    onclick={(e) => {
                      addProduct(ele);
                      e.target.blur();
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Buy;
