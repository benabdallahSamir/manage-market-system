import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useDispatch } from "react-redux";
import { initUser } from "../rtk/user";
export default function Login() {
  const [data, setdata] = useState({ username: "", password: "" });
  const [passwordVisibility, setpasswordVisibility] = useState(false);
  const router = useNavigate();
  const dispatch = useDispatch();
  async function handleSubmit() {
    const res = await login(data.username, data.password);
    if (res.status === 200) {
      console.log(res.data)
      dispatch(initUser(res.data.user));
      
      router("/main");
    } else {
      alert(res.message || "something went wrong");
    }
  }
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <main className="min-w-[300px] p-4 min-h-[400px] rounded-xl shadow border border-gray-700 flex flex-col gap-2">
        {/* heading */}
        <h1 className="uppercase text-center font-bold text-2xl">welcome</h1>
        {/* form */}
        <div className="my-auto flex flex-col gap-4">
          {/* username */}
          <div>
            <label htmlFor="username" className="font-semibold capitalize">
              username:
            </label>
            <input
              type="text"
              value={data.username}
              onChange={(e) =>
                setdata((curr) => ({ ...curr, username: e.target.value }))
              }
              className="border rounded-md border-gray-600 px-2 py-0.5 w-full outline-none"
            />
          </div>
          {/* password */}
          <div>
            <label htmlFor="username" className="font-semibold capitalize">
              password:
            </label>
            <div className="flex items-center gap-2">
              <input
                type={passwordVisibility ? "text" : "password"}
                value={data.password}
                onChange={(e) =>
                  setdata((curr) => ({ ...curr, password: e.target.value }))
                }
                className={`border rounded-md flex-1 border-gray-600 px-2 py-0.5 w-full outline-none`}
              />
              <button
                className="px-2 w-7 flex justify-center items-center cursor-pointer py-1"
                onClick={() => {
                  setpasswordVisibility((curr) => !curr);
                }}
              >
                p
              </button>
            </div>
          </div>
          {/* submit button */}
          <button
            onClick={handleSubmit}
            className="w-full py-2 roudned bg-blue-500 duration-300s rounded-md hover:text-white hover:bg-blue-600 font-semibold cursor-pointer text-gray-300 uppercase"
          >
            Enter
          </button>
        </div>
      </main>
    </div>
  );
}
