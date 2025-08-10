import {
  SignedIn,
  SignedOut,
  UserButton,
  ClerkLoading,
} from "@clerk/clerk-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { ListCheck, Pencil, TrendingUp } from "lucide-react";
import { Translator } from "@/lib/i18n/Translator";
import { localizedPath } from "@/utils";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams();
  const { t } = useTranslation();

  const isLoginPage = pathname.endsWith("/login");

  return (
    <header className="sticky top-0 border-b z-30 bg-background shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto h-16 px-4">
        <Link to="/">
          <Logo />
        </Link>

        <ClerkLoading>
          <Skeleton className="w-8 h-8 rounded-full" />
        </ClerkLoading>

        <SignedIn>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label={t("header.allItems")}
                labelIcon={<ListCheck size={16} />}
                onClick={() => navigate(localizedPath("/items", lang))}
              />

              <UserButton.Action
                label={t("header.customItems")}
                labelIcon={<Pencil size={16} />}
                onClick={() =>
                  navigate(localizedPath("/dashboard/custom-items", lang))
                }
              />

              {/* @to-do: just display this group if user is not PRO */}
              <UserButton.Action
                label={t("header.becomePro")}
                labelIcon={<TrendingUp size={16} />}
                // onClick={} @to-do: open plan modal
                onClick={() => alert("Plan modal")}
              />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>

        <SignedOut>
          {isLoginPage ? (
            <Button asChild>
              <Link to={localizedPath("/signup", lang)}>
                {<Translator path="auth.signup.title" />}
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link to={localizedPath("/login", lang)}>
                {<Translator path="auth.login.title" />}
              </Link>
            </Button>
          )}
        </SignedOut>
      </div>
    </header>
  );
}
