import { useRouter } from "next/navigation";
import Button from "./Button";
import { useAuth } from "@/store/authContext/useAuth";

export default function SignOutButton({ className }: { className?: string }) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await logout();
    router.push("/signin");
  };

  return (
    <Button
      className={` ${className}`}
      label="Sign Out"
      onClick={handleSignOut}
    ></Button>
  );
}
