import { Route, Routes } from "react-router";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>Homepage</h1>} />
    </Routes>
  );
}
