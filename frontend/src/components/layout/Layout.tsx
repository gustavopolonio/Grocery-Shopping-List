import { useEffect } from "react";
import { Outlet, useParams } from "react-router";
import { i18n } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";

export function Layout() {
  const { lang } = useParams();

  useEffect(() => {
    i18n.changeLanguage(lang || "en-US");
  }, [lang]);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
