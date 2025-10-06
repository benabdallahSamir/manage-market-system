import { Outlet, useNavigate } from "react-router-dom";
import AdminNav from "./com/AdminNav";

export default function AdminContainer() {
  const router = useNavigate();
  function gobackClick() {
    router("/main");
  }
  return (
    <div className="min-h-screen flex">
      <AdminNav />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
