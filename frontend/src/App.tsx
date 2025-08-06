import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "@/AppRoutes";
import { AuthProvider } from "@/contexts/AuthProvider";
import "./lib/i18n";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster richColors position="top-right" closeButton />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
