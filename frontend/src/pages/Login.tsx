import { useState } from "react";
import { Link, useParams } from "react-router";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Translator } from "@/lib/i18n/Translator";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import GoogleIcon from "@/images/google.png";

export function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { lang } = useParams();

  async function handleLogin() {
    setIsLoggingIn(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) toast.error(<Translator path="auth.login.fail" />);
  }

  return (
    // 64.8px -> header height
    <div className="h-[calc(100vh-64.8px)] flex flex-col justify-center items-center max-w-lg w-full mx-auto space-y-10">
      <Typography variant="h1" className="text-center">
        <Translator path="auth.login.to" />
        <span className="block">
          <Translator path="appName" />
        </span>
      </Typography>

      <Button
        size="lg"
        className="w-80 max-w-full font-bold gap-4"
        onClick={handleLogin}
        loading={isLoggingIn}
        disabled={isLoggingIn}
      >
        <img className="w-5" src={GoogleIcon} alt="Google" />
        <Translator path="auth.google" />
      </Button>

      <Typography variant="p">
        <Translator path="auth.noAccount" />{" "}
        <Button asChild variant="link" className="p-0">
          <Link to={`/${lang}/signup`}>
            <Translator path="auth.signup.title" />
          </Link>
        </Button>
      </Typography>
    </div>
  );
}
