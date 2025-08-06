import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import { LogOut, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Translator } from "@/lib/i18n/Translator";
import { supabase } from "@/lib/supabase";
import { localizedPath } from "@/utils";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropDrawer,
  DropDrawerContent,
  DropDrawerItem,
  DropDrawerTrigger,
  DropDrawerGroup,
  DropDrawerLabel,
  DropDrawerSeparator,
} from "@/components/ui/dropdrawer";
import type { User } from "@supabase/supabase-js";

export function Header() {
  const { pathname } = useLocation();
  const { lang } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [isGettingUser, setIsGettingUser] = useState(true);

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(<Translator path="auth.logout.fail" />);
      return;
    }

    setUser(null);
  }

  useEffect(() => {
    async function getSession() {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          throw error;
        }

        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setIsGettingUser(false);
      }
    }

    getSession();
  }, []);

  const isLoginPage = pathname.endsWith("/login");

  return (
    <header className="sticky top-0 border-b z-30 bg-background shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto h-16 px-4">
        <Link to="/">
          <Logo />
        </Link>

        {isGettingUser ? (
          <Skeleton className="w-8 h-8 rounded-full" />
        ) : user ? (
          <DropDrawer>
            <DropDrawerTrigger asChild>
              <Button variant="ghost" className="p-0 rounded-full">
                <Avatar>
                  <AvatarImage
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata.name}
                  />
                  <AvatarFallback>
                    {user.user_metadata.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropDrawerTrigger>

            <DropDrawerContent>
              <DropDrawerLabel>
                <Typography variant="p" className="font-bold leading-6">
                  {user.user_metadata.full_name}
                </Typography>
                <Typography variant="p" className="leading-6">
                  {user.email}
                </Typography>
              </DropDrawerLabel>

              <DropDrawerGroup>
                <DropDrawerItem asChild className="p-0 min-h-9">
                  <Link
                    to={localizedPath("/account", lang)}
                    className="w-full px-2 py-1.5 cursor-pointer"
                  >
                    <Translator path="header.accountSettings" />
                  </Link>
                </DropDrawerItem>
              </DropDrawerGroup>

              <DropDrawerSeparator />

              <DropDrawerGroup>
                <DropDrawerItem asChild className="p-0 min-h-9">
                  <Link
                    to={localizedPath("/items", lang)}
                    className="w-full px-2 py-1.5 cursor-pointer"
                  >
                    <Translator path="header.allItems" />
                  </Link>
                </DropDrawerItem>
                <DropDrawerItem asChild className="p-0 min-h-9">
                  <Link
                    to={localizedPath("/dashboard/custom-items", lang)}
                    className="w-full px-2 py-1.5 cursor-pointer"
                  >
                    <Translator path="header.customItems" />
                  </Link>
                </DropDrawerItem>
              </DropDrawerGroup>

              <DropDrawerSeparator />

              {/* @to-do: just display this group if user is not PRO */}
              <DropDrawerGroup>
                <DropDrawerItem asChild className="p-0 min-h-9">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group cursor-pointer w-full justify-start focus-visible:border-none focus-visible:ring-0"
                    // onClick={} @to-do: open plan modal
                  >
                    <Translator path="header.becomePro" />
                    <TrendingUp className="group-hover:text-accent-foreground" />
                  </Button>
                </DropDrawerItem>
              </DropDrawerGroup>

              <DropDrawerSeparator />

              <DropDrawerGroup>
                <DropDrawerItem asChild className="p-0 min-h-9">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group cursor-pointer w-full justify-start focus-visible:border-none focus-visible:ring-0"
                    onClick={signOut}
                  >
                    <Translator path="auth.logout.title" />
                    <LogOut className="group-hover:text-accent-foreground" />
                  </Button>
                </DropDrawerItem>
              </DropDrawerGroup>
            </DropDrawerContent>
          </DropDrawer>
        ) : isLoginPage ? (
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
      </div>
    </header>
  );
}
