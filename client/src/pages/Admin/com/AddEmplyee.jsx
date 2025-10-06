import { useEffect, useState } from "react";
import Button from "../../com/Button";
import { addUsers } from "../../../api/admin/employee";

export default function AddEmplyee({ goBack, user }) {
  const [data, setData] = useState({ username: "", password: "" });
  useEffect(() => {
    if (user) setData({ username: user.username, password: "" });
  }, []);
  async function submit() {
    if (!data.username || !data.password) return alert("all input required");
    if (user) {
    } else {
      const res = await addUsers(data);
      if (res.status !== 200) return alert(res.message);
    }
    goBack();
  }
  function onchange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData((curr) => {
      return { ...curr, [name]: value };
    });
  }
  return (
    <div className="absolute w-screen h-screen top-0 left-0 bg-black/10 grid place-items-center">
      <Button
        onclick={goBack}
        text={"X"}
        className={"absolute top-3 right-3 w-max text-red-500 text-4xl"}
        variant="no-bg-hover"
      />
      <div className="w-[400px] min-h-[300px] gap-4 flex flex-col bg-white rounded-2xl p-4">
        <h1 className="text-center text-3xl">Add new employee</h1>
        <div className="flex flex-col">
          <label htmlFor="username" className="cursor-pointer">
            Username :
          </label>
          <input
            type="text"
            value={data.username}
            name="username"
            onChange={onchange}
            id="username"
            className="w-full border outline-none px-2 py-1 rounded-md focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="cursor-pointer">
            Password :
          </label>
          <input
            type="password"
            value={data.password}
            name="password"
            onChange={onchange}
            id="password"
            className="w-full border outline-none px-2 py-1 rounded-md focus:border-blue-500"
          />
        </div>
        <Button
          text={"submit"}
          className={"mx-auto !w-40 mt-auto"}
          onclick={submit}
        />
      </div>
    </div>
  );
}
