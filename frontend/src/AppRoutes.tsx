import { useClerk } from "@clerk/clerk-react";
import { Route, Routes } from "react-router";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import { Dashboard } from "@/pages/Dashboard";
import { List } from "@/pages/List";
import { Layout } from "@/components/layout/Layout";
import { PageContainer } from "@/components/layout/PageContainer";
import { Spinner } from "@/components/ui/spinner";

export function AppRoutes() {
  const { loaded } = useClerk();

  if (!loaded)
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* @to-do: only auth users can access */}
        <Route element={<PageContainer />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/lists/:listId" element={<List />} />
        </Route>

        <Route path=":lang">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          {/* @to-do: only auth users can access */}
          <Route element={<PageContainer />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/lists/:listId" element={<List />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
