import { signOut } from "next-auth/react";
import Button from "./Button";

export default function SignOutButton({ className }: { className?: string }) {
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/signin",
      redirect: true,
    });
  };
  return (
    <Button
      className={` ${className}`}
      label="Sign Out"
      onClick={handleSignOut}
    ></Button>
  );
}
