import { Route, Routes } from "react-router";
import { Login } from "./pages/Login";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>Homepage</h1>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
