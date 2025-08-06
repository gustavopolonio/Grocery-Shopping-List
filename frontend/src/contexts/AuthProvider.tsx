import { createContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  user: User | null;
  isLoadingUser: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          throw error;
        }

        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setIsLoadingUser(false);
      }
    }

    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoadingUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
