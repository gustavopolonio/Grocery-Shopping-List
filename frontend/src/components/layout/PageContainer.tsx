import { Outlet } from "react-router";

export function PageContainer() {
  return (
    <div className="max-w-5xl flex flex-col justify-center mx-auto py-16 px-4 space-y-14">
      <Outlet />
    </div>
  );
}
