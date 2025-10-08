import { Outlet, Route, Routes } from "react-router-dom";
import MainContainer from "./pages/App.jsx";
import Login from "./pages/Login.jsx";
import Buy from "./pages/Employee/Buy.jsx";
import AdminContainer from "./pages/Admin/AdminContainer.jsx";
import Sales from "./pages/Admin/Sales.jsx";
import Product from "./pages/Admin/Product.jsx";
import Employee from "./pages/Admin/Employee.jsx";
import Contacts from "./pages/Admin/Contacts.jsx";
import AdminAccount from "./pages/Admin/AdminAccount.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { logoutAccount } from "./api/auth.js";
export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      await logoutAccount();
      setLoading(false);
    })();
  }, []);
  if (loading) return <div>loading</div>;
  return (
    <div className="min-h-screen">
      <Routes>
        {/* login */}
        <Route path="/" element={<Outlet />}>
          <Route index element={<Login />} />
          <Route path="/create-account" element={<>create account</>} />
        </Route>

        {/* app */}
        <Route path="/main" element={<MainContainer />}>
          <Route index element={<Buy />} />
        </Route>
        <Route path="Admin" element={<AdminContainer />}>
          <Route index element={<Sales />} />
          <Route path="product" element={<Product />} />
          <Route path="employee" element={<Employee />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="adminAccount" element={<AdminAccount />} />
        </Route>
      </Routes>
    </div>
  );
}
