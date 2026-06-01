import Button from "@/components/ui/Button";
import Image from "next/image";

export default function UserProfile() {
  return (
    <>
      <section className={``}>
        <div className="relative mb-12">
          <div className={`w-full h-125 bg-blue-300 flex justify-end`}>
            <div className="w-full h-full p-4">
              <Image
                className=""
                src="/"
                alt="profile-banner"
                width={1500}
                height={500}
              />
              <Button className={``} label="+ Add Banner" />
            </div>
          </div>
          <div
            className={`w-50 h-50 border-2 border-black rounded-full absolute -bottom-12`}
          >
            <Button>
              <Image
                className="rounded-full text-center"
                src="/"
                width={200}
                height={200}
                alt="avatar"
              />
            </Button>
          </div>
          <div className="w-full h-12 flex justify-end items-center">
            <Button label="Follow" />
          </div>
        </div>
        <div className="py-4">
          <div>
            <p>Bio</p>
          </div>
          <div className="flex gap-4 relative left-60">
            <p>
              <strong>0</strong> Following
            </p>
            <p>
              <strong>0</strong> Followers
            </p>
          </div>
          <div>
            <Button label="Edit Profile" />
          </div>
        </div>
      </section>
      <section></section>
    </>
  );
}
