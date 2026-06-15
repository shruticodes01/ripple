"use client";
import React from "react";
import AuthProvider from "./authContext/AuthContext";
import ThemeContextProvider from "./themeContext/ThemeContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </AuthProvider>
  );
}
