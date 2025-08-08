import { Route, Routes } from "react-router";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import { Dashboard } from "@/pages/Dashboard";
import { Layout } from "@/components/layout/Layout";
import { PageContainer } from "@/components/layout/PageContainer";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* @to-do: only auth users can access */}
        <Route element={<PageContainer />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route path=":lang">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          <Route element={<PageContainer />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
