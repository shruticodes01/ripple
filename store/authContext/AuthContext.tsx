import { AuthContextProps, AuthUser } from "@/types/types";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await fetch("api/auth/signout", {
      method: "POST",
    });
    setUser(null);
  };

  const authCtx = {
    user,
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
