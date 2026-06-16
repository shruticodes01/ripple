import { ContainerProps } from "@/types/types";

export default function Container({
  className,
  children,
  containerType = "default",
}: ContainerProps) {
  return (
    <div
      className={`w-full h-full mx-auto overflow-y-scroll ${containerType === "narrow" ? "max-w-300" : "max-w-400 px-4 md:px-10"} ${className}`}
    >
      {children}
    </div>
  );
}
