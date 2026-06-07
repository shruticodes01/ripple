import { InputProps } from "@/types/types";

export default function Input({
  id,
  label,
  inputDisplay = "row",
  error,
  className,
  complexityRule,
  ...props
}: InputProps) {
  return (
    <div
      className={`flex gap-1 ${inputDisplay === "col" ? "flex-col" : "items-end"}`}
    >
      <p className="flex items-baseline-last justify-between">
        <label htmlFor={id}>{label}</label>
        {error && <span className="text-red-800 text-sm">{error}</span>}
      </p>
      <input className={` ${className}`} id={id} name={id} {...props}></input>
      {complexityRule && (
        <span className="text-gray-700 text-xs">[{complexityRule}]</span>
      )}
    </div>
  );
}
