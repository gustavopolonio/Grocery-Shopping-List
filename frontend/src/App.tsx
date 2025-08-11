import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/clerk-react";
import { ptBR, enUS } from "@clerk/localizations";
import type { AxiosError } from "axios";
import { Toaster } from "sonner";
import { BrowserRouter, useLocation } from "react-router";
import { localizedPath } from "@/utils";
import { AppRoutes } from "@/AppRoutes";
import "./lib/i18n";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const axiosError = error as AxiosError;
        return axiosError?.response?.status !== 401 && failureCount < 3;
      },
    },
  },
});

function ClerkWithLang() {
  const location = useLocation();
  const firstSegment = location.pathname.split("/")[1];
  const lang = firstSegment.toLocaleLowerCase() === "pt-br" ? "pt-BR" : "en-US";

  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      localization={lang === "pt-BR" ? ptBR : enUS}
      afterSignOutUrl={localizedPath("/", lang)}
    >
      <AppRoutes />
      <Toaster richColors position="top-right" closeButton />
    </ClerkProvider>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ClerkWithLang />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
