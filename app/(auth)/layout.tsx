"use client";
import React from "react";
import ThemeContextProvider from "@/store/themeContext/ThemeContext";
import ThemeContainer from "@/layouts/ThemeContainer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeContextProvider>
      <ThemeContainer>
        <main className="min-h-screen flex items-center justify-center">
          {children}
        </main>
      </ThemeContainer>
    </ThemeContextProvider>
  );
}
