import { useTheme } from "@/store/themeContext/useTheme";
import Button from "./Button";
import { LucideMoon, LucideSun, ToggleLeft, ToggleRight } from "lucide-react";

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
      {theme === "light" ? (
        <LucideSun />
      ) : (
        <LucideMoon className={``} color="#3C3CE8" />
      )}
      {theme === "light" ? (
        <span className="uppercase">Light mode</span>
      ) : (
        <span className="uppercase">Dark mode</span>
      )}
    </Button>
  );
}
