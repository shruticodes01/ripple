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
  const variantClasses = {
    primary: "",
    outline: "",
    text: "",
    icon: "",
  };
  return (
    <button
      className={`cursor-pointer ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {label}
      {icon}
      {children}
    </button>
  );
}
