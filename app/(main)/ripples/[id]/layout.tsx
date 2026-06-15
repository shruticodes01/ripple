"use client";
import { useTheme } from "@/store/themeContext/useTheme";
import React from "react";

export default function RipplePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <div
      className={`w-full h-full flex flex-col items-center border px-1 py-1 rounded-t-lg ${theme === "light" ? "border-t-blue border-l-blue border-r-blue" : "border-t-powdered-blue-100 border-l-powdered-blue-100 border-r-powdered-blue-100"}`}
    >
      {children}
    </div>
  );
}
