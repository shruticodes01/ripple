"use client";
import { useTheme } from "@/store/themeContext/useTheme";
import Button from "@/components/ui/Button";
import { UserIcon } from "lucide-react";
import { RippleData } from "@/types/types";
import { IUser } from "@/lib/models/User";
import RippleList from "../ripple/RippleList";
import { formatName } from "@/utils/formattedName";

export default function PublicUserProfile({
  user,
}: {
  user: Omit<IUser, "password"> & { ripples: RippleData[] };
}) {
  const { theme } = useTheme();
  const capitalizedName = formatName(user.fullName);
  return (
    <>
      <section
        className={`w-full pt-20 pb-10 border-b ${theme === "light" ? "border-blue" : "border-powdered-blue-100"}`}
      >
        <div className="relative mb-12">
          <div className={`w-full max-md:h-80 md:h-125 bg-blue-300 `}>
            <div className="w-full h-full flex justify-end p-4">
              <Button
                className={`self-end text-navy-blue`}
                label="+ Add Banner"
              />
            </div>
          </div>
          <div
            className={`max-md:w-30 max-md:h-30 md:w-50 md:h-50 border-2 rounded-full absolute max-md:-bottom-4 md:-bottom-12 ${theme === "light" ? "border-blueish-black" : "border-light-gray"}`}
          >
            <UserIcon
              className="w-24 h-24 md:w-32 md:h-32 absolute max-md:bottom-4 max-md:right-3 md:right-9 bottom-9"
              strokeWidth={0.5}
            />
          </div>
          <div className="w-full h-12 flex justify-end items-center pt-4 pr-3">
            <Button
              className={`max-md:px-2.5 max-md:py-1 md:px-4 md:py-2 rounded-full ${theme === "light" ? "bg-blueish-black text-light-gray" : "bg-light-gray text-blueish-black"}`}
              label="Follow"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-10 px-3">
          <div className="flex justify-between">
            <div className="flex flex-col gap-3 py-2">
              <h3 className="font-bold">Bio</h3>
              <ul>
                <li className="">{capitalizedName}</li>
                <li
                  className={`font-normal ${theme === "light" ? "text-blue" : "text-powdered-blue-100"}`}
                >{`@${user.userName}`}</li>
              </ul>
            </div>
            <div>
              <Button
                className={`max-md:px-2.5 max-md:py-1 md:px-4 md:py-2 rounded-full ${theme === "light" ? "bg-blueish-black text-light-gray" : "bg-light-gray text-blueish-black"}`}
                label="Edit Profile"
              />
            </div>
          </div>
          <div className="flex flex-wrap wrap-normal gap-4">
            <p>
              <strong>0</strong> Following
            </p>
            <p>
              <strong>0</strong> Followers
            </p>
          </div>
        </div>
      </section>

      <section className={`pt-10`}>
        <RippleList ripples={user.ripples} />
      </section>
    </>
  );
}
