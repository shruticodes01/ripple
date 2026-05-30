import React, { createContext, useState } from "react";
import { ThemeContextProps, ThemeMode } from "@/types/types";

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  onThemeToggle: () => {},
});

const getInitialTheme = (): ThemeMode => {
  // Guard against SSR. if we are on the server, skip all browser APIs and return default.
  if (typeof window === "undefined") {
    return "light";
  }

  // If the user has toggled theme, get the selected theme from the localstorage so that it persists even after reload.
  const storedTheme = localStorage.getItem("theme") as ThemeMode;
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  // if the user hasn't toggled theme, set it to the user's system preference
  const systemPreference = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  return systemPreference === true ? "dark" : "light";
};

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

    // store the toggled theme in the local storage;
    localStorage.setItem("theme", theme);
  };

  const themeCtx = {
    theme,
    onThemeToggle: handleThemeToggle,
  };
  return (
    <ThemeContext.Provider value={themeCtx}>{children}</ThemeContext.Provider>
  );
}
