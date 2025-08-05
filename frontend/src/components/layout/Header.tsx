import { Link, useLocation } from "react-router";
import { Translator } from "@/lib/i18n/Translator";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

export function Header() {
  const { pathname } = useLocation();

  const isLoginPage = pathname.endsWith("/login");

  return (
    <header className="sticky top-0 border-b z-30 bg-background shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto h-16 px-4">
        <Link to="/">
          <Logo />
        </Link>

        {isLoginPage ? (
          <Button asChild>
            <Link to="/signup">{<Translator path="login.signup" />}</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link to="/login">Log in</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
