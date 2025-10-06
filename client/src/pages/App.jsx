import { Outlet } from "react-router-dom";
import Nav from "./Employee/com/Nav";

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Outlet />
    </div>
  );
}
