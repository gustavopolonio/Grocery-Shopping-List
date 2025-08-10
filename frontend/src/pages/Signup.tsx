import { SignUp } from "@clerk/clerk-react";
import { useParams } from "react-router";
import { localizedPath } from "@/utils";

export function Signup() {
  const { lang } = useParams();

  return (
    // 64.8px -> header height
    <div className="h-[calc(100vh-64.8px)] flex flex-col justify-center items-center max-w-lg w-full mx-auto space-y-10">
      <SignUp
        signInFallbackRedirectUrl={localizedPath("/dashboard", lang)}
        fallbackRedirectUrl={localizedPath("/dashboard", lang)}
        signInUrl={localizedPath("/login", lang)}
      />
    </div>
  );
}
