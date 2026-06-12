import React from "react";
import { useTheme } from "@/store/themeContext/useTheme";

export default function ThemeContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <div
      className={`w-full min-h-screen ${theme === "light" ? "bg-white text-blueish-black" : "bg-blueish-black text-light-gray"} ${className}`}
    >
      {children}
    </div>
  );
}
