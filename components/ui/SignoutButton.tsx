import { signOut } from "next-auth/react";
import Button from "./Button";

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/signin",
      redirect: true,
    });
  };
  return (
    <Button
      className="uppercase"
      label="Sign out"
      onClick={handleSignOut}
    ></Button>
  );
}
