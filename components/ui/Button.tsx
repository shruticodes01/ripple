import { buttonVariant } from "@/styles/global";
import { ButtonProps } from "@/types/types";

export default function Button({
  variant = "primary",
  label,
  icon,
  children,
  className,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`cursor-pointer ${buttonVariant[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {label}
      {icon}
      {children}
    </button>
  );
}
