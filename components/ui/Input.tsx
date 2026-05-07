import { InputProps } from "@/types/types";

export default function Input({ id, label, className, ...props }: InputProps) {
  return (
    <p>
      <label htmlFor={id}>{label}</label>
      <input className={` ${className}`} id={id} name={id} {...props}></input>
    </p>
  );
}
