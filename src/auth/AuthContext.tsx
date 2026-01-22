import { createContext, useContext, useEffect, useState } from "react";
import { getUser, removeToken, removeUser } from "../helpers/localStorage";

export type Role = "ADMIN" | "MANAGER" | "STAFF";
export type Status = "ACTIVE" | "INACTIVE";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => getUser());
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) setUser(storedUser);
    setInitialized(true);
  }, []);

  if (!initialized) return null;

  const logout = () => {
    removeToken();
    removeUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
