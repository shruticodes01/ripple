import { getUserByUsername } from "@/lib/getUsersByUsername";
import { notFound } from "next/navigation";
import PublicUserProfile from "@/components/publicUserProfile/PublicUserProfile";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await getUserByUsername(username);
  if (!user) {
    notFound();
  }

  return (
    <>
      <PublicUserProfile user={user} />
    </>
  );
}
