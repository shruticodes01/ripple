import { useRouter } from "next/navigation";
import Button from "./Button";
import { useAuth } from "@/store/authContext/useAuth";
import { CirclePower } from "lucide-react";

export default function SignOutButton({ className }: { className?: string }) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await logout();
    router.push("/signin");
  };

  return (
    <Button
      className={`inline-flex gap-2 ${className}`}
      label=""
      onClick={handleSignOut}
    >
      <CirclePower />
      <span>Signout</span>
    </Button>
  );
}
