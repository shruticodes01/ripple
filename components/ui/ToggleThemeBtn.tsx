import { useTheme } from "@/store/themeContext/useTheme";
import Button from "./Button";
import { LucideMoon, LucideSun } from "lucide-react";

export default function ToggleThemeBtn({
  onToggle,
  role,
  className,
  ...props
}: {
  onToggle?: () => void;
  role?: string;
  className?: string;
}) {
  const { theme, onThemeToggle } = useTheme();

  return (
    <Button
      className={`flex gap-2 ${className}`}
      type="button"
      role={role || "switch"}
      onClick={() => {
        onThemeToggle();
        onToggle?.();
      }}
      {...props}
    >
      {theme === "light" ? <LucideMoon /> : <LucideSun />}
      {theme === "light" ? (
        <span className="">Dark Mode</span>
      ) : (
        <span className="">Light Mode</span>
      )}
    </Button>
  );
}
