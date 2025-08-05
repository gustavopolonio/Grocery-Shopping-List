import { Route, Routes } from "react-router";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import { Layout } from "@/components/layout/Layout";

export function AppRoutes() {
  return (
    <Routes>
      <Route path=":lang" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}
