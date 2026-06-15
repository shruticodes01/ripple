"use client";
import React from "react";
import ThemeContainer from "@/layouts/ThemeContainer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeContainer>
      <main className="min-h-screen flex items-center justify-center">
        {children}
      </main>
    </ThemeContainer>
  );
}
